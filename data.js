// 부스와 프로그램 수정은 이 파일에서 하세요. UTF-8로 저장하세요.
// id: 항목마다 고유한 영문 ID (기존 ID를 유지하면 찜 목록도 유지됩니다)
// number: 제공받은 부스 번호 (5번은 요일별로 두 팀)
// categories: food=먹거리, goods=굿즈, experience=체험·이벤트
// days: wed=수요일, thu=목요일. 양일은 ['wed','thu']
// products: 판매 품목 / note: 미정 여부 등 참고 사항
// art, bg, accent: 일러스트 종류와 카드 색상
'use strict';

const booths = [
  {id:'commit',number:1,name:'CODE: OPEN HEART X알 정화 대작전!',org:'제43대 컴퓨터공학과 학생회 Commit',description:'🔥 작년 그 맛 그대로! 마라로제컴볶이 🔥\n얼얼한 마라 + 꾸덕한 로제 = 맛.없.없 조합\n인지상정에서 만나요😎',categories:['food','goods'],days:['wed','thu'],products:['마라로제떡볶이','티셔츠','리무버블 스티커','멀티 클리너'],note:'음식과 굿즈를 함께 판매해요.',art:'tteok',bg:'#fbe2d9',accent:'#d98c78'},
  {id:'click',number:2,name:'사보크크',org:'사이버보안학과 학생회 CLICK',description:'🥐 겉바속쫀! 소금빵 크로플 🥐\n소금빵 생지를 와플기에 꾹 눌러 구워낸 소금빵 크로플을 판매합니다!',categories:['food','goods'],days:['wed','thu'],products:['소금빵 크로플','스티커','핀 뱃지','키링'],note:'음식과 굿즈를 함께 판매해요.',art:'croffle',bg:'#fcf0cb',accent:'#cfa854'},
  {id:'steady',number:3,name:'스테디 셀러',org:'Steady',description:'호떡에 이어 어묵으로 돌아온 스테디 셀러입니다',categories:['food'],days:['wed','thu'],products:['물 오뎅','마라 오뎅'],note:'',art:'fishcake',bg:'#e1edde',accent:'#84a580'},
  {id:'ewhale',number:4,name:'네이버 웨일 캠퍼스 크루 | EWHALE',org:'네이버 웨일 캠퍼스 크루 EWHALE',description:'네이버 웨일 체험만 해도 키캡 키링·스트레스볼 증정!',categories:['experience'],days:['wed','thu'],products:['네이버 웨일 체험','키캡 키링·스트레스볼 증정'],note:'체험형 부스로 별도 판매는 없어요. 참여자를 대상으로 네이버 웨일 굿즈를 증정해요.',art:'whale',bg:'#dceef6',accent:'#78afc3'},
  {id:'animal-farm',number:5,name:'동물농장',org:'이세연(개인)',description:'별별 친구들이 모여 사는 작은 뜨개 동물농장에 놀러 오세요!',categories:['goods'],days:['wed'],products:['뜨개 키링'],note:'수요일에만 운영해요.',art:'yarn',bg:'#efe1f4',accent:'#b08bbd'},
  {id:'ludens',number:5,name:'우리동아리 정상영업합니다',org:'루덴스',description:'人예미 소속 동아리 루덴스 人지대 축제에 진출',categories:['goods'],days:['thu'],products:['스티커','자수 책갈피','티셔츠'],note:'목요일에만 운영해요.',art:'bookmark',bg:'#e3ecfb',accent:'#8c9ed0'},
  {id:'likelion',number:6,name:'이화여자대학교 멋쟁이사자처럼',org:'이화여자대학교 멋쟁이사자처럼',description:'대동제 웹사이트 개발하는 바로 그 동아리! 아기사자의 멋진 프로덕트를 소개합니다 🦁',categories:['goods'],days:['wed','thu'],products:['판매 품목 논의 중'],note:'판매 품목은 현재 논의 중이에요.',art:'lion',bg:'#fde8ca',accent:'#d9a164'},
  {id:'randomforest',number:7,name:'랜덤포레스트',org:'랜덤포레스트',description:'밴드가 밥 먹여주니? 넵 랜포는 먹여드립니다.',categories:['food'],days:['wed','thu'],products:['국밥','차'],note:'판매 품목은 변동 가능성이 있어요.',art:'soup',bg:'#e0ece4',accent:'#86aa95'},
  {id:'datascience',number:8,name:'데이터사이언스',org:'데이터사이언스',description:'불닭으로 일으킨 학생회?',categories:['food'],days:['wed','thu'],products:['불닭 샌드위치','아이스티'],note:'판매 품목은 미정이에요.',art:'sandwich',bg:'#f9e0e9',accent:'#cc8ba6'}
];

const programs = [
  {id:'photo',name:'포토부스',description:'우리의 반짝이는 축제 순간을 한 장에.',detail:'인지상정에서 함께한 순간을 사진으로 남겨보세요.',art:'camera',bg:'#fffdf9'},
  {id:'fishing',name:'낚시부스',description:'내 마음을 언록! 나의 수호알을 낚아라!',detail:'내 마음을 언록! 나의 수호알을 낚아라!',art:'fishing',bg:'#f0f8f6'},
  {id:'egg',name:'수호알 꾸미기',description:'되고 싶은 나의 모습, 험프티 록 수호알 공방',detail:'되고 싶은 나의 모습, 험프티 록 수호알 공방',art:'egg',bg:'#fff5f8'},
  {id:'fortune',name:'운세부스',description:'빛나라, 나의 다이아! 오늘의 럭키 컬러 & 운세',detail:'빛나라, 나의 다이아! 오늘의 럭키 컬러 & 운세',art:'fortune',bg:'#f2effb'},
  {id:'cotton',name:'솜사탕부스',description:'축제의 설렘을 달콤한 한 입에.',detail:'달콤한 솜사탕과 함께 인지상정의 즐거움을 만나보세요.',art:'cotton',bg:'#fffdf9'},
  {id:'stamp',name:'도장판 이벤트',description:'축제를 즐기며 도장판 이벤트도 함께해요!',detail:'축제를 즐기는 또 하나의 방법, 도장판 이벤트가 준비되어 있어요.',art:'stamp',bg:'#fff2c8'}
];


// 학과별 수호캐릭터. 제공받은 설정을 기반으로 작성했습니다.
// character가 null이면 수호알을 대신 표시합니다. 새 파일을 받으면 경로만 바꾸세요.
const guardians = [
 {id:'sei',dept:'컴퓨터공학과',short:'컴공',name:'SEI · 세이',color:'#7450b1',egg:'assets/sei-egg.png',character:null,tagline:'코드로 세상을 이롭게 연결하는 마음',keywords:['개발자','호기심','실행','가능성'],intro:'상상하는 데서 그치지 않고, 내가 생각한 것을 직접 만들어 보고 싶다는 마음에서 태어난 수호캐릭터.',quote:null,story:[
 ['이름에 담긴 마음','SEI(세이/世以)는 세상 세(世), 써 이(以). 코드로 세상을 이롭게 연결한다는 컴퓨터공학의 본질적인 비전을 담은 이름이에요.'],
 ['수호알에서 태어난 개발자','머릿속으로 상상하는 데서 그치지 않고, 내가 생각한 것을 직접 만들어 보고 싶다는 마음이 커서가 그려진 수호알을 만들었어요. 꿈의 모티브는 개발자예요.'],
 ['호기심 많은 고양이','궁금한 것은 직접 확인해야 직성이 풀려요. 컴퓨터의 마우스(Mouse)를 진짜 쥐처럼 생각해서 쫓아다니는 버릇도 있어요.'],
 ['클릭하고, 실행하고, 고쳐 나가고','꼬리 끝의 커서는 호기심을 행동으로 옮기는 특별한 능력이에요. 새로운 것을 발견하면 반응하고, 궁금한 것을 직접 클릭하고 실행해 봐요. 예상하지 못한 오류에 당황하기도 하지만 원인을 하나씩 찾아 해결해요.'],
 ['아직 쓰이지 않은 이야기','수호알의 회로는 연결되며 확장되는 생각과 가능성, 커서는 스스로 선택하고 실행하는 마음을 나타내요. 따옴표(“ ”)는 앞으로 자신의 손으로 만들어 갈 수많은 가능성을 상징해요.'],
 ['캐릭터 체인지!','평소의 망설임이 사라지고 머릿속에 떠오른 아이디어를 곧바로 행동으로 옮길 수 있게 돼요.']
 ],items:[['커서 꼬리','궁금한 것을 직접 클릭하고 실행하는 힘'],['회로','연결되며 확장되는 생각과 가능성'],['따옴표 “ ”','앞으로 직접 써 내려갈 이야기']]},
 {id:'roke',dept:'사이버보안학과',short:'사보',name:'로크',color:'#52722d',egg:'assets/roke-egg.png',character:'assets/roke.png',tagline:'지켜야 할 것은 지키고, 열어야 할 길은 여는 꼬마 수호기사!',keywords:['보호','신뢰','용기','열쇠','방패'],intro:'밝고 씩씩하며 정의감이 강한 꼬마 기사. 누군가 곤란해하면 먼저 나서고, 두려워도 앞으로 나아가는 것이 진짜 용기라고 믿어요.',quote:'걱정 마! 내가 지켜줄게!',story:[
 ['수호기사 + 열쇠','책임감이 강하고 소중한 것을 지키려는 마음을 가진 수호캐릭터예요. 겁이 날 때도 있지만 두려움 앞에서 한 걸음 더 나아가요.'],
 ['올바른 길을 열고, 소중한 것을 보호하고','열쇠구멍은 접근과 보안을, 방패는 보호를 상징해요. 네잎클로버 문양도 함께하고 있어요.']
 ],items:[['마스터 키','로크의 키만 한 커다란 열쇠. 닫힌 길에 올바른 접근 권한을 부여하고 새로운 길을 여는 힘을 상징해요.'],['가디언 실드','열쇠구멍과 날개 문양이 새겨진 방패. 위험과 침입으로부터 소중한 것을 보호해요.']]},
 {id:'jini',dept:'인공지능전공',short:'인지',name:'지니',color:'#2678b7',egg:'assets/jini-egg.png',character:'assets/jini.png',tagline:'함께 배우고 연결하며, 모두의 가능성을 더 밝은 미래로!',keywords:['인공지능','데이터','호기심','배움','연결','가능성','미래'],intro:'호기심이 많고 새로운 것을 배우는 걸 좋아하는 인공지능전공의 수호자. 밝고 긍정적인 마음으로 친구들의 새로운 도전과 꿈을 응원해요.',quote:'같이 배우고, 같이 꿈꾸자!',story:[
 ['사람과 함께 배우는 AI','궁금한 것이 생기면 직접 알아보고 배우며, 새로운 기술과 아이디어를 만나는 것을 좋아해요. 인공지능은 사람과 함께 배우고 연결되며 더 나은 미래를 만드는 기술이라고 믿어요.'],
 ['성장하는 가능성을 품은 수호알','푸른색과 흰색을 중심으로 AI와 데이터의 흐름을 표현해요. 중앙의 AI 문양과 주변의 궤도는 학습과 연결을 상징해요. 아직 깨어나지 않은 알에는 배움과 경험을 통해 계속 성장할 미래가 담겨 있어요.'],
 ['지니의 상징','AI와 뇌는 인공지능과 학습, 데이터 픽셀은 정보, 궤도는 사람·데이터·아이디어의 연결, 별빛은 새로운 발견과 가능성을 나타내요.']
 ],items:[['AI 헤드셋','수많은 데이터와 정보를 주고받으며 새로운 것을 배우고 세상과 연결돼요. AI 문양은 인공지능전공 수호자의 표식이에요.'],['홀로그램 패널','푸른빛 패널의 뇌 문양은 학습과 사고를 상징해요. 흩어진 데이터 속에서 새로운 지식과 가능성을 발견해요.'],['데이터 오비트','서로 다른 사람·데이터·아이디어가 연결되어 새로운 가능성을 만드는 푸른빛의 궤도예요.']]},
 {id:'data',dept:'데이터사이언스전공',short:'데사',name:'데이터사이언스 수호캐릭터',color:'#b54b8d',egg:'assets/data-egg.png',character:'assets/data-guardian.png',tagline:'데이터사이언스의 수호알과 캐릭터를 만나보세요.',keywords:[],intro:'분홍빛 수호알과 수호캐릭터. 이미지 속 그래프와 연결된 점들을 찾아보세요.',quote:null,story:[],items:[]},
 {id:'lumi',dept:'인공지능데이터사이언스학부',short:'인데부',name:'루미',color:'#956b12',egg:'assets/lumi-egg.png',character:'assets/lumi.png',tagline:'수많은 가능성 속에서, 나만의 길을 함께 찾는 꼬마 길잡이!',keywords:['가능성','선택','방향','길','성장'],intro:'호기심 많고 긍정적인 꼬마 길잡이. 정답을 대신 정해주기보다, 스스로 원하는 방향을 찾을 수 있도록 곁에서 응원해요.',quote:null,story:[
 ['나만의 길을 선택하는 마음','인공지능데이터사이언스학부에서 시작해 인공지능전공과 데이터사이언스전공 중 자신의 길을 선택하는 특징에서 착안했어요.'],
 ['어떤 선택이든 새로운 시작','새로운 길을 두려워하기보다, 어떤 선택이든 새로운 가능성의 시작이라고 생각해요. 친구가 길을 고민하면 곁에서 도와주는 수호캐릭터예요.'],
 ['밝은 노란색의 의미','노란색은 인공지능데이터사이언스학부의 축제 대표 색상으로, 밝고 새로운 시작을 앞둔 모습을 표현해요.']
 ],items:[['지도','여러 가능성과 앞으로 선택할 길. 관심에 따라 전공을 선택하는 과정을 표현해요.'],['나침반','수많은 가능성 가운데 자신에게 맞는 방향을 찾아가는 과정이에요.'],['별','아직 정해지지 않은 꿈과 가능성을 나타내는 메인 심볼이에요.']]}
];
