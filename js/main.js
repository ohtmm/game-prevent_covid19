const msgs = [
  '참 잘했어요 :)',
  '코로나 바이러스가 금방 사라질 것 같아요!',
  '함께 하는 시민 멋져요 !',
  '턱스크는 안돼요!',
  '코만 가리다니 No No',
  '코까지 잘 가려주세요!',
  '손까지 깨끗해요 :)',
  '바이러스가 손에 남아 있을지도 몰라요',
];

const timerNum = document.querySelector('.timer');
const icons = document.querySelectorAll('.playBox>img');
const playBox = document.querySelector('.playBox');
const startBtn = document.querySelector('.start');
const playBtn = document.querySelector('.play');
const virusIcon = document.querySelector('.virusIcon');
const cleanIcon = document.querySelector('.cleanIcon');

const TIME_LIMIT = 20;

function setTimer(sec) {
  timerNum.textContent = `0 : ${sec}`;
  const intervalKey = setInterval(() => {
    sec--;
    timerNum.textContent = `0 : ${sec}`;
    if (sec === 0) {
      clearInterval(intervalKey);
      return;
    }
  }, 1000);
}

let pickedIcons = [];
function randomIcons() {
  if (pickedIcons.length === 4) {
    pickedIcons = [];
  }
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * 7);
    pickedIcons.push({
      img: icons[randomNum],
      text: msgs[randomNum],
      idx: randomNum,
    });
  }
}

console.log(playBox.getBoundingClientRect());
// playBox 내 아이콘 배치 정보
// (left: 0, top: 0) (right: 800-137=663, bottom: 440-150=290)
// x좌표 : 0~763
// y좌표 : 0~612

const pickedCoords = [];
function randomCoords() {
  for (i = 0; i < 4; i++) {
    const x = Math.floor(Math.random() * 663);
    const y = Math.floor(Math.random() * 290);
    pickedCoords.push({
      left: x,
      top: y,
    });
  }
}

function hide(item) {
  item.style.visibility = 'hidden';
}
function show(item) {
  item.style.visibility = 'visible';
}

function handleClick(target) {
  target.addEventListener('click', (evt) => {
    target.style.visibility = 'hidden';
    if (
      target.classList.contains('onMask') ||
      target.classList.contains('cleanHands')
    ) {
      setTimeout(() => {
        hide(cleanIcon);
      }, 300);
      show(cleanIcon);
    } else {
      setTimeout(() => {
        hide(virusIcon);
      }, 300);
      show(virusIcon);
    }
  });
}

function scatterIcons() {
  randomIcons();
  randomCoords();
  pickedIcons.forEach((icon, idx) => {
    const $iconImg = icon.img;
    const $iconX = pickedCoords[idx].left;
    const $iconY = pickedCoords[idx].top;
    $iconImg.style.transform = `translate(${$iconX}px, ${$iconY}px)`;
    show($iconImg);
    handleClick($iconImg);
    setTimeout(() => {
      hide($iconImg);
    }, 2200);
  });
}

function startGame(sec) {
  hide(startBtn);
  show(playBtn);
  setTimeout(() => {
    console.log('게임 끝');
  }, sec * 1000);
  setTimer(sec);
}

startBtn.addEventListener('click', () => {
  startGame(TIME_LIMIT);
  scatterIcons();
  setInterval(() => {
    scatterIcons();
  }, 2500);
});

/*
 시작 세팅 
 1. start btn을 [click]한다 
 2. [timer]가 작동한다 
 3. 이미지들이 4개씩 랜덤 배치된다 
 4. start가 사라지고 play 버튼 팝업 

 유저 선택 
 1) onMask, cleanHands 선택 
  -> score +1
  -> 게이지 + 10 / clean 팝업

2) offMask, dirtyHands 선택
    -> 게이지 -20 / virus 팝업

3) play 클릭 시 
    -> 팝업 창 "Don't give up"
    + 멈춘 시간에서 재시작 

타임 아웃
1) 게이지가 0이 아니면 
    -> 팝업  - score 표시
2) 게이지가 0 이하 이면
    -> pop - retry 표시 
*/
