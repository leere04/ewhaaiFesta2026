/* 음식 후기만 담당합니다. 기존 찜하기·캐릭터·부스 기능과 상태를 공유하지 않습니다. */
(()=>{'use strict';
const catalog=window.FESTIVAL_FOOD_CATALOG||[],config=window.FESTIVAL_REVIEWS_CONFIG||{};
const $=id=>document.getElementById(id),escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const configured=config.enabled&&config.firebase?.apiKey&&config.firebase?.projectId&&config.firebase?.appId&&config.recaptchaEnterpriseSiteKey;
let clientPromise,client,selected,unsubs=[],pageStops=[],pageCursor=null,last=null,pageSize=0,live=false,statsReady=false,votesReady=false,generation=0,pending=false,reportTarget=null,requestId=null;
let counts={},votes={};
const detail=$('food-review-dialog'),reportDialog=$('review-report-dialog');
const formatTime=t=>t?.toDate?new Intl.DateTimeFormat('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Seoul'}).format(t.toDate()):'시간 확인 중';
function message(text){$('review-feedback').textContent=text;}
function errorMessage(e){const code=(e.code||'').replace('functions/','');if(['resource-exhausted','invalid-argument','already-exists','failed-precondition','not-found'].includes(code))return e.message;return code==='permission-denied'?'참여 권한을 확인하지 못했어요. 운영진에게 문의해 주세요.':'연결하지 못했어요. 인터넷 연결을 확인하고 다시 연결해 주세요.';}
function online(){return navigator.onLine&&live&&statsReady&&votesReady&&!pending;}
function controls(){
 $('review-submit').disabled=!online();
 ['review-text','review-menu-select','review-ate','review-reconnect'].forEach(id=>$(id).disabled=pending);
 detail.querySelectorAll('[data-heart]').forEach(b=>b.disabled=!online());
 detail.querySelectorAll('[data-report-review]').forEach(b=>b.disabled=!live||!navigator.onLine||pending);
 $('review-older').disabled=!live||pageSize<30||pending;
 $('review-latest').disabled=!pageCursor||pending;
}
function stop(){unsubs.forEach(fn=>fn());unsubs=[];pageStops.forEach(fn=>fn());pageStops=[];live=false;pending=false;generation++;}
function renderMenus(){
 $('review-menus').innerHTML=selected.menus.map(m=>`<div class="review-menu"><span>${escape(m.name)}</span><button type="button" data-heart="${m.id}" aria-pressed="${!!votes[m.id]}" aria-label="${escape(m.name)} 추천 ${votes[m.id]?'취소':'하기'}" disabled><span aria-hidden="true">${votes[m.id]?'♥':'♡'}</span> <b>${statsReady?Number(counts[m.id]||0):'—'}</b><span class="heart-action"> ${votes[m.id]?'추천했어요':'추천'}</span></button></div>`).join('');controls();
}
function listenPage(){
 pageStops.forEach(fn=>fn());pageStops=[];live=false;$('review-feed').textContent='친구들의 후기를 불러오고 있어요…';controls();
 const token=generation;
 pageStops.push(client.watchReviews(selected.id,pageCursor,s=>{
  if(token!==generation)return;
  live=!s.fromCache;last=s.last;pageSize=s.size;
  $('review-feed').innerHTML=s.rows.length?s.rows.map(r=>`<article class="student-review"><div class="student-review-meta"><span>익명의 축제 친구</span><time>${escape(formatTime(r.createdAt))}</time></div><strong class="review-menu-label">먹어본 메뉴 · ${escape(r.menuName)}</strong><p>${escape(r.text)}</p><button type="button" class="review-report" data-report-review="${r.id}">신고</button></article>`).join(''):`<p class="review-empty">${s.fromCache?'후기를 확인하고 있어요…':pageCursor?'이전 후기가 없어요.':'아직 후기가 없어요. 첫 번째 맛있는 이야기를 남겨 주세요 ♡'}</p>`;
  $('review-connection').textContent=s.fromCache?'연결 확인 중 · 표시 내용이 최신이 아닐 수 있어요':pageCursor?'이전 후기 · 이 페이지의 변경 사항을 실시간으로 받아요':'실시간 연결됨 · 최신 후기부터 보여드려요';controls();
 },e=>{if(token!==generation)return;live=false;message(errorMessage(e));$('review-connection').textContent='실시간 연결이 끊겼어요';controls();}));
}
async function start(){
 stop();statsReady=false;votesReady=false;counts={};votes={};renderMenus();
 if(!configured){$('review-connection').textContent='후기 기능을 준비하고 있어요';$('review-feed').textContent='연결 준비가 끝나면 친구들의 후기와 추천을 여기에서 볼 수 있어요.';return;}
 const token=generation;$('review-connection').textContent='익명으로 연결하는 중…';
 try{
  clientPromise ||= import('./reviews-firebase.js?v=4').then(m=>m.connect(config)).catch(e=>{clientPromise=null;throw e;});
  client=await clientPromise;if(token!==generation||!detail.open)return;
  const failed=e=>{if(token!==generation)return;message(errorMessage(e));live=false;controls();};
  unsubs.push(client.watchStats(selected.id,s=>{if(token!==generation)return;counts=Object.fromEntries(s.rows.map(r=>[r.id,r.count]));statsReady=!s.fromCache;renderMenus();},e=>{statsReady=false;failed(e);}));
  unsubs.push(client.watchVotes(selected.id,s=>{if(token!==generation)return;votes=Object.fromEntries(s.rows.map(r=>[r.menuId,r.liked]));votesReady=!s.fromCache;renderMenus();},e=>{votesReady=false;failed(e);}));
  listenPage();
 }catch(e){if(token===generation){message(errorMessage(e));$('review-connection').textContent='연결을 완료하지 못했어요';controls();}}
}
function open(id){
 selected=catalog.find(b=>b.id===id);if(!selected)return;
 const old=document.getElementById('detail-dialog');if(old?.open)old.close();
 $('review-booth-title').textContent=selected.name;
 $('review-booth-org').textContent=selected.org;
 $('review-booth-art').innerHTML=typeof art==='function'?art(selected.art):'';
 $('review-booth-art').style.background=selected.bg;
 $('review-menu-select').innerHTML=selected.menus.map(m=>`<option value="${m.id}">${escape(m.name)}</option>`).join('');
 $('review-form').reset();$('review-char-count').textContent='0';message('');requestId=null;pageCursor=null;pending=false;
 if(!detail.open)detail.showModal();start();
}
window.openFoodReviews=open;
$('review-booth-grid').innerHTML=catalog.map(b=>`<button class="review-booth-card" data-review-booth="${b.id}" type="button" aria-haspopup="dialog"><span class="review-booth-art" style="background:${b.bg}">${typeof art==='function'?art(b.art):''}</span><span class="review-booth-card-copy"><strong>${escape(b.name)}</strong><small>${b.menus.map(m=>escape(m.name)).join(' · ')}</small><span>메뉴 추천과 후기 보기 ↗</span></span></button>`).join('');
$('reviews-status').textContent=configured?'직접 먹어본 메뉴에 하트를 남기고, 맛있는 경험을 나눠요.':'후기 기능 연결 준비 중이에요. 메뉴는 지금도 둘러볼 수 있어요.';
document.addEventListener('click',e=>{const b=e.target.closest('[data-review-booth]');if(b)open(b.dataset.reviewBooth);});
$('review-close').addEventListener('click',()=>detail.close());
detail.addEventListener('close',()=>{stop();if(reportDialog.open)reportDialog.close();});
$('review-reconnect').addEventListener('click',()=>{pageCursor=null;message('');start();});
$('review-latest').addEventListener('click',()=>{pageCursor=null;listenPage();});
$('review-older').addEventListener('click',()=>{if(last){pageCursor=last;listenPage();}});
$('review-text').addEventListener('input',()=>{
 const input=$('review-text');input.value=[...input.value].slice(0,100).join('');$('review-char-count').textContent=[...input.value].length;requestId=null;
});
$('review-menu-select').addEventListener('change',()=>{requestId=null;});
$('review-form').addEventListener('submit',async e=>{
 e.preventDefault();if(!online())return;
 if(!$('review-ate').checked){message('직접 먹어본 메뉴인지 체크해 주세요.');$('review-ate').focus();return;}
 const text=$('review-text').value.trim();if(!text){message('한 줄 후기를 입력해 주세요.');return;}
 const token=generation;
 requestId ||= crypto.randomUUID();pending=true;controls();message('후기를 등록하고 있어요…');
 try{await client.call('submitReview',{boothId:selected.id,menuId:$('review-menu-select').value,text,requestId,ate:true});if(token!==generation)return;$('review-text').value='';$('review-char-count').textContent='0';requestId=null;message('후기를 남겼어요 ♡ 다음 후기는 60초 뒤에 작성할 수 있어요.');if(pageCursor){pageCursor=null;listenPage();}}
 catch(e){if(token===generation)message(errorMessage(e));}finally{if(token===generation){pending=false;controls();}}
});
detail.addEventListener('click',async e=>{
 const heart=e.target.closest('[data-heart]');
 if(heart&&online()){
  const menuId=heart.dataset.heart,liked=!votes[menuId];
  if(liked&&!$('review-ate').checked){message('아래의 ‘직접 먹어본 메뉴’ 확인란을 체크한 뒤 추천해 주세요.');$('review-ate').focus();return;}
  const token=generation;pending=true;controls();message('추천을 반영하고 있어요…');
  try{await client.call('setRecommendation',{boothId:selected.id,menuId,liked,ate:true});if(token===generation)message(liked?'추천했어요 ♥':'추천을 취소했어요.');}catch(e){if(token===generation)message(errorMessage(e));}finally{if(token===generation){pending=false;controls();}}
 }
 const report=e.target.closest('[data-report-review]');if(report){reportTarget={boothId:selected.id,reviewId:report.dataset.reportReview};$('report-feedback').textContent='';reportDialog.showModal();}
});
$('report-cancel').addEventListener('click',()=>reportDialog.close());
$('review-report-form').addEventListener('submit',async e=>{
 e.preventDefault();if(!reportTarget||!client)return;const b=$('report-submit');b.disabled=true;
 try{await client.call('reportReview',{...reportTarget,reason:$('report-reason').value});reportDialog.close();message('신고를 접수했어요. 운영진이 확인할게요.');}catch(e){$('report-feedback').textContent=errorMessage(e);}finally{b.disabled=false;}
});
window.addEventListener('offline',()=>{if(detail.open){$('review-connection').textContent='오프라인 · 인터넷 연결 후 다시 연결해 주세요';controls();}});
window.addEventListener('online',()=>{if(detail.open)start();});
document.addEventListener('visibilitychange',()=>{if(!detail.open)return;if(document.hidden){stop();controls();}else start();});
})();
