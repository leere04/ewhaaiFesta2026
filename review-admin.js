(()=>{'use strict';
 const $=id=>document.getElementById(id),config=window.FESTIVAL_REVIEWS_CONFIG||{},catalog=window.FESTIVAL_FOOD_CATALOG||[];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let client,stop,cursor=null,last=null,busy=false,live=false;
 const ready=config.enabled&&config.firebase?.projectId&&config.recaptchaEnterpriseSiteKey;
 $('admin-login').disabled=true;
 if(ready){
  status('로그인 준비 중…');
  import('./reviews-firebase.js?v=4').then(m=>m.connect(config,true)).then(c=>{client=c;$('admin-login').disabled=false;status('등록된 운영진 계정으로 로그인해 주세요.');}).catch(()=>status('연결을 준비하지 못했어요. 설정을 확인하고 새로고침해 주세요.'));
 }else status('Firebase 설정을 먼저 완료해 주세요.');
 function status(s){$('admin-status').textContent=s;}
 function lock(){document.querySelectorAll('[data-moderate]').forEach(b=>b.disabled=busy||!live);}
 function watch(){
  stop?.();live=false;lock();status('신고를 불러오는 중…');
  stop=client.watchReports(cursor,s=>{
   live=!s.fromCache;last=s.last;$('admin-next').disabled=s.size<30||!live;
   $('admin-reports').innerHTML=s.rows.length?s.rows.map(r=>`<article class="review-admin-report"><h2>${esc(catalog.find(b=>b.id===r.boothId)?.name||r.boothId)} · ${esc(r.menuName)}</h2><p>${esc(r.text)}</p><p class="review-small">신고 ${Number(r.count)}건 · ${esc(Object.entries(r.reasons||{}).map(([name,n])=>`${name} ${n}건`).join(', '))}</p><div class="review-admin-actions"><button data-moderate="dismiss" data-id="${r.id}">문제없음 · 신고 닫기</button><button data-moderate="delete" data-id="${r.id}">후기 삭제</button><button data-moderate="delete-and-block" data-id="${r.id}">삭제 + 작성 제한</button></div></article>`).join(''):'<p>이 페이지에 확인할 신고가 없어요.</p>';
   status(live?'관리자 연결됨 · 신고 접수 시 자동 갱신':'연결 확인 중');lock();
  },()=>{live=false;lock();status('신고를 불러오지 못했어요. 관리자 권한, App Check, Firestore 인덱스를 확인해 주세요.');});
 }
 $('admin-login').addEventListener('click',async()=>{
  $('admin-login').disabled=true;
  try{
   if(!client)throw Error('로그인 연결을 먼저 준비해 주세요.');
   if(!await client.adminLogin()){await client.logout();throw Error('등록된 관리자 계정이 아니에요.');}
   $('admin-panel').hidden=false;$('admin-logout').hidden=false;$('admin-login').hidden=true;watch();
  }catch(e){status(e.code?'로그인하지 못했어요. 허용 도메인·팝업 차단·관리자 등록을 확인해 주세요.':e.message);}finally{$('admin-login').disabled=false;}
 });
 $('admin-logout').addEventListener('click',async()=>{stop?.();await client.logout();$('admin-panel').hidden=true;$('admin-logout').hidden=true;$('admin-login').hidden=false;$('admin-reports').textContent='';status('로그아웃했어요.');});
 $('admin-next').addEventListener('click',()=>{if(last){cursor=last;watch();}});
 $('admin-first').addEventListener('click',()=>{cursor=null;watch();});
 $('admin-reports').addEventListener('click',async e=>{
  const b=e.target.closest('[data-moderate]');if(!b||busy||!live)return;
  const action=b.dataset.moderate;
  if(!confirm(action==='dismiss'?'이 신고를 문제없음으로 닫을까요?':'이 후기를 삭제할까요? 삭제한 본문은 복구할 수 없어요.'))return;
  busy=true;lock();
  try{await client.call('moderateReview',{reportId:b.dataset.id,action});status('처리했어요.');}catch{status('처리하지 못했어요. 다시 로그인해 관리자 권한을 확인해 주세요.');}finally{busy=false;lock();}
 });
 document.addEventListener('visibilitychange',()=>{if($('admin-panel').hidden)return;if(document.hidden){stop?.();live=false;lock();}else watch();});
})();
