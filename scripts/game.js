const words = [
  [
    "愛","網","鮎","案","イカ","石","犬","居間",
    "海老","貝","亀","ゴミ","鹿","島","舌","鯛",
    "鷹","なす","猫","灰","鳩","花","浜","富士",
    "赤","青","白","黒","桃","肌","虹","色",
    "ねぎ","塩","空","陸","海","雲","雪","雨",
    "棒","板","弓","矢","家","塀","部屋","蓋",
    "牛","馬","鳥","豚","鷹","鳩","犬","猫"
  ],
  [
    "あさり","ごはん","きのこ","昆布","たけのこ","おかゆ","野菜","キャベツ",
    "レタス","大根","人参","もやし","トマト","玉ねぎ","大豆","納豆",
    "パソコン","水筒","マウス","モニター","電池","メモリ","CPU","HDD",
    "青森","岩手","宮城","秋田","山形","福島","茨城","栃木","群馬",
    "埼玉","神奈川","新潟","富山","石川","福井","山梨","長野",
    "静岡","愛知","京都","大阪","兵庫","和歌山","鳥取","島根"
  ],
  [
    "東京","じゃがいも","キーボード","スクリーン","炊飯器","ドライヤー","フライパン","紙袋",
    "カレンダー","コンセント","洗濯機","洗面台","シャンプー","インターホン","洗面器","食器棚",
    "ティッシュ","アルコール","消毒","ユーチューブ","チューリップ","スパゲッティ","ピッツァ","カルボナーラ",
    "オムライス","明石焼き","タコライス","ガパオライス","味噌ラーメン","マシンガン","ハンバーガー","ハンバーグ"
  ],
  [
    "電動ドライバー","電気ストーブ","無線マウス","無線キーボード","ノートパソコン","リュックサック","クローゼット","パソコンケース",
    "コンセントプラグ","電気自動車","アルコールランプ","ウェブブラウザ","フロントエンド","バックエンド","オブジェクト指向","フレームワーク",
    "スマートフォン","ガソリンスタンド","正面玄関","高速道路","洗濯ばさみ","発泡スチロール","オレンジジュース","アップルジュース"
  ]
];

//bodyタグのid取得
const body = document.body;
//gameController部の各要素のid取得
const timerPara = document.getElementById("timerPara");
const instructionPara = document.getElementById("instructionPara");
const textbox = document.getElementById("textbox");
const typedCountPara = document.getElementById("typedCountPara");
const startButton = document.getElementById("startButton");
//resultReport部の各要素のid取得
const resultReport = document.getElementById("resultReport");
const reportTitlePara = document.getElementById("reportTitlePara");
const playedTimePara = document.getElementById("playedTimePara");
const reportMessagePara = document.getElementById("reportMessagePara");


//どのステージなのか取得して難易度や制限時間を決定
let difficultyLevel;
let defaultRemaingTime;
let goalCount;
switch(stageName){
  case "level1":
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
  goalCount = 10;
  break;

  case "level2":
  difficultyLevel = 1;
  defaultRemaingTime = 30.00;
  goalCount = 10;
  break;

  case "level3":
  difficultyLevel = 2;
  defaultRemaingTime = 30.00;
  goalCount = 10;
  break;

  case "level4":
  difficultyLevel = 3;
  defaultRemaingTime = 30.00;
  goalCount = 10;
  break;

  case "scoreAttack":
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
  break;

  case "survival":
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
}


//その他の変数宣言
let targetText;
let typedCount = 0;
let remaingTime = defaultRemaingTime;
let playedTime = 0.00;
let isGamePlaying = false;


//ゲーム開始準備
timerPara.innerHTML = defaultRemaingTime.toFixed(2);
instructionPara.innerHTML = "startボタンをクリックしてください。";
textbox.value = "";
textbox.addEventListener("keypress",enterKeyListener);
updateTypedCountPara();
startButton.innerHTML = "ゲームスタート";


function startButtonClick(){
  if(!isGamePlaying){
    gameStart();
  }else{
    gameRetired();
  }
}


function gameStart(){
  isGamePlaying = true;
  typedCount = 0;
  playedTime = 0.00;
  textbox.disabled = false;
  textbox.value = "";
  textbox.focus();

  timerStart();
  updateInstructionPara();

  timerPara.innerHTML = defaultRemaingTime;
  updateTypedCountPara();
  scaleup(typedCountPara, 1.05);
  startButton.innerHTML = "リタイアする";
  resultReport.style.transform = "scale(0)";
}


// リタイアボタンを押した
function gameRetired(){
  gameStop();
  updateResultReport("retired");
}


// 時間切れ
function gameTimeUp(){
  gameStop();
  updateResultReport("timeUped");
}


// ゲームクリア
function gameCleared(){
  gameStop();
  updateResultReport("cleared");
}


function gameStop(){
  isGamePlaying = false;
  textbox.disabled = true;
  startButton.innerHTML = "もう一度プレイ";
  clearInterval(timer);
}


function updateResultReport(gameResult){
  resultReport.style.transform = "scale(1.2)";
  //リタイア
  if(gameResult == "retired"){
    reportTitlePara.innerHTML = "リタイア";
    if(stageName == "survival"){
      reportMessagePara.innerHTML = "生き残った時間：" + playedTime.toFixed(2) + "秒";
    }else if(stageName == "scoreAttack"){
      reportMessagePara.innerHTML = "スコア：" + typedCount;
    }else{
      reportMessagePara.innerHTML = "プレイ時間：" + playedTime.toFixed(2) + "秒";
    }
  }
  //時間切れ
  if(gameResult == "timeUped"){
    reportTitlePara.innerHTML = "時間切れ";
    if(stageName == "survival"){
      reportMessagePara.innerHTML = "生き残った時間：" + playedTime.toFixed(2) + "秒";
    }else if(stageName == "scoreAttack"){
      reportMessagePara.innerHTML = "スコア：" + typedCount;
    }else{
      reportMessagePara.innerHTML = "プレイ時間：" + playedTime.toFixed(2) + "秒";
    }
  }
  //クリア
  if(gameResult == "cleared"){
    reportTitlePara.innerHTML = "クリア";
    reportMessagePara.innerHTML = "プレイ時間：" + playedTime.toFixed(2) + "秒";
  }
}


function timerStart(){
  let countup = function(){
    remaingTime -= 0.01;
    playedTime += 0.01;
    timerPara.innerHTML = remaingTime.toFixed(2);
    if(remaingTime <= 0){
      clearInterval(timer);
      timerPara.innerHTML = "00.00";
      gameTimeUp();
    }
  }
  remaingTime = defaultRemaingTime;
  timer = setInterval(countup,10); //countup開始
}


function enterKeyListener(event){
  if(event.key == "Enter"){
    textboxCheck();
    textbox.value = "";
  }
}


function textboxCheck(){
  if(textbox.value == targetText){
    typedCount++;
    if(stageName == "survival"){
      updateTypedCountPara();
      scaleup(typedCountPara, 1.05);
      updateInstructionPara();
      remaingTime += 2;
      scaleup(timerPara, 1.1);
    }else if(stageName == "scoreAttack"){
      updateTypedCountPara();
      updateInstructionPara();
    }else{
      updateTypedCountPara();
      if(typedCount >= goalCount){
        gameCleared();
      }
      updateInstructionPara();
    }
  }else if(textbox.value != targetText){
    instructionPara.innerHTML = "<span style='color: red;'>✕</span>「" + targetText + "」と入力してください。";
    scaleup(instructionPara, 1.2);
  }
}


function updateInstructionPara(){
  if(stageName == "survival"){
    if(typedCount < 10){
      difficultyLevel = 0;
    }else if(typedCount < 20){
      difficultyLevel = 1;
    }else if(typedCount < 30){
      difficultyLevel = 2;
    }else{
      difficultyLevel = 3;
    }
  }
  if(stageName == "scoreAttack"){
    difficultyLevel = Math.floor(Math.random() * words.length);
  }
  
  let randomNum = Math.floor(Math.random() * words[difficultyLevel].length);
  targetText = words[difficultyLevel][randomNum];
  instructionPara.innerHTML = "「" + targetText + "」 と入力してください。";
  scaleup(instructionPara, 1.05);
}


function updateTypedCountPara(){
  if(stageName == "scoreAttack" || stageName == "survival"){
    typedCountPara.innerHTML = "入力できた単語数：" + typedCount;
  }else{
    typedCountPara.innerHTML = "入力できた単語数：" + typedCount + " / " + goalCount;
  }
}


function scaleup(para, expansionRate){
  para.style.transition = "0.2s";
  para.style.transform = "scale(" + expansionRate + ")";
  setTimeout(() => {
    para.style.transform = "scale(1)";
  }, 200);
}
