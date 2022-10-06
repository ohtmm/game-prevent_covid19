const msgs = [
  '참 잘했어요 :)',
  '코로나 바이러스가 금방 사라질 것 같아요!',
  '함께 하는 시민 멋져요 !',
  '손까지 깨끗해요 :)',
  '턱스크는 안돼요!',
  '코만 가리다니 No No',
  '코까지 잘 가려주세요!',
  '바이러스가 손에 남아 있을지도 몰라요',
];

const imgSrcs = [
  './images/mask_o_1.png',
  './images/mask_o_2.png',
  './images/mask_o_3.png',
  './images/hands_clean.png',
  './images/mask_x_1.png',
  './images/mask_x_2.png',
  './images/mask_x_3.png',
  './images/hands_dirty.png',
];

const timerNum = document.querySelector('.timer');
const icons = document.querySelectorAll('.playBox>img');
const playBox = document.querySelector('.playBox');
const startBtn = document.querySelector('.start');
const playBtn = document.querySelector('.play');
const virusIcon = document.querySelector('.virusIcon');
const cleanIcon = document.querySelector('.cleanIcon');
const count = document.querySelector('.count');
const gauge = document.querySelector('.gaugeBar_full');

const TIME_LIMIT = 5;
let COUNT_NUM = 0;
let GAUGE_NUM = 0;

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
  pickedIcons = [];
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * 7);
    const randomIcon = document.createElement('img');
    randomIcon.setAttribute('src', imgSrcs[randomNum]);
    if (randomNum < 3) {
      randomIcon.setAttribute('class', 'onMask');
    } else if (randomNum === 3) {
      randomIcon.setAttribute('class', 'cleanHands');
    }
    playBox.appendChild(randomIcon);
    pickedIcons.push({
      img: randomIcon,
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

let pickedCoords = [];
function randomCoords() {
  pickedCoords = [];
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

function handleClick(targetObj) {
  const { img, text, idx } = targetObj;
  console.log(targetObj);
  img.addEventListener('click', (evt) => {
    hide(img);
    if (
      img.classList.contains('onMask') ||
      img.classList.contains('cleanHands')
    ) {
      COUNT_NUM++;
      count.textContent = COUNT_NUM;
      setTimeout(() => {
        hide(cleanIcon);
      }, 300);
      show(cleanIcon);
    } else {
      GAUGE_NUM++;
      gauge.style.transform = `scaleX(${1 - 0.1 * GAUGE_NUM})`;
      gauge.style.left = `${-12 * GAUGE_NUM}px`;
      if (GAUGE_NUM === 11) {
      }
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
  pickedIcons.forEach((iconObj, index) => {
    const $iconImg = iconObj.img;
    const $iconX = pickedCoords[index].left;
    const $iconY = pickedCoords[index].top;
    $iconImg.style.left = `${$iconX}px`;
    $iconImg.style.top = `${$iconY}px`;
    show($iconImg);
    handleClick(iconObj);
    setTimeout(() => {
      hide($iconImg);
    }, 2100);
  });
}

function startGame(sec) {
  hide(startBtn);
  show(playBtn);
  scatterIcons();
  setTimer(sec);
}

function endGame() {}

startBtn.addEventListener('click', () => {
  startGame(TIME_LIMIT);
  const scatterInterval = setInterval(() => {
    scatterIcons();
  }, 2500);
  setTimeout(() => {
    clearInterval(scatterInterval);
  }, TIME_LIMIT * 1000);
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
