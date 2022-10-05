const clickMsgs = [
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

function startGame(sec) {
  setTimeout(() => {
    console.log('게임 끝');
  }, sec * 1000);
  setTimer(sec);
}
startGame(TIME_LIMIT);

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
