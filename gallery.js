(()=>{'use strict';
const $=id=>document.getElementById(id),cfg=window.FESTIVAL_GALLERY_CONFIG||{},adminPage=document.body.dataset.galleryAdmin==='true';
const enabled=cfg.enabled&&/^https:\/\//.test(cfg.url||'')&&cfg.key;
let client,admin=false,channel,rows=[],cursor=null,last=null,busy=false,photo=null,previewUrl=null,reportId=null,viewId=null,loadVersion=0,fileVersion=0,challengePromise;
const cache=new Map(),deleted=new Set(),tokens={},widgets={};
const imageObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;imageObserver.unobserve(entry.target);const r=rows.find(x=>x.id===entry.target.closest("[data-photo-id]").dataset.photoId);if(r)imageUrl(r).then(url=>{if(entry.target.isConnected&&!deleted.has(r.id))entry.target.src=url;}).catch(()=>{entry.target.alt="사진을 불러오지 못했어요. 새로고침해 주세요.";});}},{rootMargin:"180px"});
const status=s=>$('gallery-status').textContent=s;
const check=r=>{if(r.error)throw r.error;return r.data;};
const date=s=>new Intl.DateTimeFormat('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Seoul'}).format(new Date(s));
function err(e){return /[가-힣]/.test(e.message||'')?e.message:'연결하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.';}
async function init(){
 if(!enabled){status('사진첩 연결 준비 중이에요. 업로드 화면은 미리 살펴볼 수 있어요.');$('gallery-more').disabled=true;return;}
 try{const {createClient}=await import('./gallery-client.js?v=5');client=createClient(cfg.url,cfg.key,{auth:{storageKey:adminPage?'festival-gallery-admin':'festival-gallery-guest'}});
 if(adminPage){const s=check(await client.auth.getSession());if(s.session)await adminReady();else{status('운영진 로그인 후 관리할 수 있어요.');captcha('admin-captcha');}}
 else{await load();subscribe();}
 }catch(e){status(err(e));}
}
function subscribe(){
 if(channel)client.removeChannel(channel);
 channel=client.channel('gallery-'+crypto.randomUUID()).on('postgres_changes',{event:'DELETE',schema:'public',table:'gallery_photos'},payload=>removeLocal(payload.old.id)).on('postgres_changes',{event:'INSERT',schema:'public',table:'gallery_photos'},()=>{if(!cursor)load();else status('새 사진이 도착했어요. 최신 사진을 눌러 확인하세요.');}).subscribe(s=>{
  if(s==='SUBSCRIBED')status('사진첩 연결됨 · 새 사진과 삭제를 자동으로 반영해요.');
  if(['CHANNEL_ERROR','TIMED_OUT','CLOSED'].includes(s))status('실시간 연결이 끊겼어요. 주기적으로 다시 확인하거나 사진 새로고침을 눌러 주세요.');
 });
}
function removeLocal(id){
 if(!id)return;deleted.add(id);rows=rows.filter(r=>r.id!==id);document.querySelector(`[data-photo-id="${id}"]`)?.remove();
 if(viewId===id){$('gallery-view').close();$('gallery-large').removeAttribute('src');viewId=null;}
 if(reportId===id){$('gallery-report').close();reportId=null;}
 const url=cache.get(id);if(url)URL.revokeObjectURL(url);cache.delete(id);$('gallery-empty').hidden=rows.length>0;
}
async function imageUrl(r){
 if(cache.has(r.id))return cache.get(r.id);
 const blob=check(await client.storage.from('festival-gallery').download(r.path));
 if(deleted.has(r.id))throw Error('삭제된 사진이에요.');
 const url=URL.createObjectURL(blob);if(cache.has(r.id))URL.revokeObjectURL(cache.get(r.id));cache.set(r.id,url);return url;
}
async function load(){
 if(!client||adminPage&&!admin)return;const version=++loadVersion;status('사진을 불러오고 있어요…');
 try{let query=client.from('gallery_photos').select('id,path,caption,created_at').order('created_at',{ascending:false}).order('id',{ascending:false}).limit(24);
 if(cursor)query=query.or(`created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`);
 const next=check(await query);if(version!==loadVersion)return;if(viewId){const seen=check(await client.from('gallery_photos').select('id').eq('id',viewId).maybeSingle());if(!seen)removeLocal(viewId);}if(version!==loadVersion)return;rows=next.filter(r=>!deleted.has(r.id));last=next.at(-1);$('gallery-more').disabled=next.length<24;$('gallery-empty').hidden=rows.length>0;
 const current=new Set(rows.map(r=>r.id));for(const [id,url] of cache){if(!current.has(id)&&id!==viewId){URL.revokeObjectURL(url);cache.delete(id);}}
 imageObserver.disconnect();$('gallery-grid').replaceChildren();
 let reports=[];if(admin)reports=check(await client.from('gallery_reports').select('photo_id,reason').limit(1000));if(version!==loadVersion)return;
 for(const r of rows){
 const card=document.createElement('article');card.className='photo-card';card.dataset.photoId=r.id;
 const open=document.createElement('button');open.className='photo-open';open.setAttribute('aria-label','사진 크게 보기');
 const img=document.createElement('img');img.alt=r.caption||'친구가 남긴 축제 사진';img.loading='lazy';open.append(img);
 open.onclick=async()=>{try{const exists=check(await client.from('gallery_photos').select('id').eq('id',r.id).maybeSingle());if(!exists){removeLocal(r.id);return;}const url=await imageUrl(r);if(deleted.has(r.id))return;viewId=r.id;$('gallery-large').src=url;$('gallery-large-caption').textContent=r.caption;$('gallery-view').showModal();}catch(e){status(err(e));}};
 const caption=document.createElement('p');caption.textContent=r.caption||'인지상정에서 남긴 순간 ♡';
 const foot=document.createElement('div');foot.className='photo-foot';const time=document.createElement('time');time.dateTime=r.created_at;time.textContent=date(r.created_at);foot.append(time);
 const action=document.createElement('button');action.textContent=admin?'사진 삭제':'신고';
 action.onclick=async()=>{if(admin){if(!confirm('이 사진을 전체 사진첩에서 삭제할까요? 삭제는 되돌릴 수 없어요.'))return;action.disabled=true;try{const path=check(await client.rpc('gallery_remove',{p_id:r.id}));removeLocal(r.id);const result=await client.storage.from('festival-gallery').remove([path]);if(result.error)status('공개 목록에서 삭제했어요. 저장 파일 정리는 운영진 콘솔에서 다시 확인해 주세요.');else status('사진을 삭제했어요. 연결된 사진첩에도 반영됩니다.');}catch(e){status(err(e));action.disabled=false;}}
 else{reportId=r.id;$('gallery-report-status').textContent='';$('gallery-report').showModal();captcha('report-captcha');}};
 foot.append(action);card.append(open,caption);
 const matching=reports.filter(p=>p.photo_id===r.id);if(matching.length){const badge=document.createElement('span');badge.className='gallery-report-badge';badge.textContent='신고 '+matching.length+'건 · '+[...new Set(matching.map(p=>p.reason))].join(', ');card.append(badge);}card.append(foot);$('gallery-grid').append(card);
 imageObserver.observe(img);
 }
 status(rows.length?'모두의 축제 순간 · 최신순으로 보여드려요.':'아직 사진이 없어요. 첫 번째 순간을 남겨 주세요 ♡');
 }catch(e){status(err(e));}
}
async function challengeScript(){if(window.turnstile)return;challengePromise ||= new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.onload=resolve;s.onerror=reject;document.head.append(s);}).catch(e=>{challengePromise=null;throw e;});await challengePromise;}
async function captcha(target){
 if(!client||!cfg.turnstileSiteKey)return;
 const s=check(await client.auth.getSession());if(s.session)return;
 try{await challengeScript();if(widgets[target]!==undefined){window.turnstile.reset(widgets[target]);return;}widgets[target]=window.turnstile.render('#'+target,{sitekey:cfg.turnstileSiteKey,callback:t=>{tokens[target]=t;},'expired-callback':()=>{tokens[target]=null;},'error-callback':()=>{tokens[target]=null;}});}catch{status('업로드 확인 기능을 불러오지 못했어요. 다시 시도해 주세요.');}
}
async function guest(target){
 if(!client)throw Error('사진첩 연결 준비 중이에요.');const s=check(await client.auth.getSession());if(s.session)return;
 if(!tokens[target])throw Error('사람 확인을 마친 뒤 다시 눌러 주세요.');
 try{check(await client.auth.signInAnonymously({options:{captchaToken:tokens[target]}}));}finally{tokens[target]=null;if(widgets[target]!==undefined)window.turnstile.reset(widgets[target]);}
}
$('gallery-upload-open').onclick=()=>{$('gallery-upload').showModal();captcha('gallery-captcha');};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
$('gallery-view').addEventListener('close',()=>{viewId=null;$('gallery-large').removeAttribute('src');});
$('gallery-file').addEventListener('change',async()=>{
 const fileToken=++fileVersion;photo=null;$('gallery-submit').disabled=true;const file=$('gallery-file').files[0];if(previewUrl)URL.revokeObjectURL(previewUrl);$('gallery-preview').hidden=true;if(!file)return;
 try{if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>15*1024*1024)throw Error('JPG·PNG·WebP, 15MB 이하 사진을 골라 주세요.');
 const bitmap=await createImageBitmap(file);if(fileToken!==fileVersion){bitmap.close();return;}if(bitmap.width*bitmap.height>50000000){bitmap.close();throw Error('사진 해상도가 너무 커요. 크기를 줄인 뒤 다시 선택해 주세요.');}
 const scale=Math.min(1,1200/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 for(const quality of [.82,.68,.5,.35]){const compressed=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));if(fileToken!==fileVersion)return;photo=compressed;if(photo&&photo.size<=245760)break;}
 if(!photo||photo.size>245760){photo=null;throw Error('사진이 너무 복잡하거나 커요. 크기를 줄여 다시 선택해 주세요.');}
 previewUrl=URL.createObjectURL(photo);$('gallery-preview').src=previewUrl;$('gallery-preview').hidden=false;$('upload-status').textContent=client?'사진을 준비했어요. 공개 동의를 확인하고 올려 주세요.':'미리보기예요. 저장소 연결 후 실제로 올릴 수 있어요.';$('gallery-submit').disabled=!client||!cfg.turnstileSiteKey;
 }catch(e){$('upload-status').textContent=err(e);}
});
let reservation=null;
$('gallery-form').onsubmit=async e=>{
 e.preventDefault();if(busy||!photo||!$('gallery-consent').checked)return;busy=true;$('gallery-submit').disabled=true;$('gallery-file').disabled=true;$('gallery-caption').disabled=true;
 try{await guest('gallery-captcha');$('upload-status').textContent='사진을 올리고 있어요…';
 if(!reservation)reservation=check(await client.rpc('gallery_reserve',{p_caption:$('gallery-caption').value.trim(),p_consent:true}));
 if(!reservation.uploaded){const result=await client.storage.from('festival-gallery').upload(reservation.path,photo,{contentType:'image/jpeg',upsert:false,cacheControl:'60'});if(result.error){const recovered=await client.rpc('gallery_finish',{p_id:reservation.id});if(recovered.error)throw result.error;}reservation.uploaded=true;}
 check(await client.rpc('gallery_finish',{p_id:reservation.id}));reservation=null;photo=null;$('gallery-form').reset();$('gallery-preview').hidden=true;$('gallery-upload').close();cursor=null;await load();status('사진을 공개했어요 ♡ 친구들도 함께 볼 수 있어요.');
 }catch(e){$('upload-status').textContent=err(e);}finally{busy=false;$('gallery-file').disabled=false;$('gallery-caption').disabled=false;$('gallery-submit').disabled=!photo;}
};
$('gallery-file').addEventListener('change',()=>{reservation=null;});$('gallery-caption').addEventListener('input',()=>{reservation=null;});
$('gallery-report-form').onsubmit=async e=>{e.preventDefault();if(!reportId)return;$('gallery-report-submit').disabled=true;try{await guest('report-captcha');check(await client.rpc('gallery_report',{p_id:reportId,p_reason:$('gallery-reason').value}));$('gallery-report').close();status('신고를 보냈어요. 운영진이 확인할게요.');}catch(e){$('gallery-report-status').textContent=err(e);}finally{$('gallery-report-submit').disabled=false;}};
$('gallery-refresh').onclick=()=>load();$('gallery-first').onclick=()=>{cursor=null;load();};$('gallery-more').onclick=()=>{if(last){cursor=last;load();}};
async function adminReady(){admin=check(await client.rpc('gallery_is_admin'));if(!admin){await client.auth.signOut();throw Error('등록된 운영진 계정이 아니에요.');}$('gallery-login').hidden=true;$('gallery-logout').hidden=false;await load();subscribe();}
if(adminPage){$('gallery-login').onsubmit=async e=>{e.preventDefault();if(!client){status('사진첩 연결을 먼저 설정해 주세요.');return;}const b=e.target.querySelector('button');b.disabled=true;try{check(await client.auth.signInWithPassword({email:$('admin-email').value,password:$('admin-password').value,options:{captchaToken:tokens['admin-captcha']}}));$('admin-password').value='';await adminReady();}catch(e){status(err(e));}finally{b.disabled=false;tokens['admin-captcha']=null;if(widgets['admin-captcha']!==undefined)window.turnstile.reset(widgets['admin-captcha']);}};$('gallery-logout').onclick=async()=>{admin=false;loadVersion++;if(channel)await client.removeChannel(channel);await client.auth.signOut();location.reload();};}
document.addEventListener('visibilitychange',()=>{if(!client||adminPage&&!admin)return;if(document.hidden){if(channel)client.removeChannel(channel);channel=null;}else{load();subscribe();}});
// 연결 누락이나 재연결 중 삭제를 놓친 경우 최대 30초 뒤 현재 페이지를 재확인합니다.
setInterval(()=>{if(client&&!document.hidden&&(!adminPage||admin)){load();}},30000);
window.addEventListener('online',()=>{if(client&&(!adminPage||admin)){load();subscribe();}});
init();
})();
