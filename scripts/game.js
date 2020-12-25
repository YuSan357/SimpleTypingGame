const words = [
  [
    "愛","網","鮎","案","イカ","石","犬","居間",
    "海老","貝","亀","象","鹿","島","舌","鯛",
    "鷹","なす","猫","灰","鳩","花","浜","富士",
    "赤","青","白","黒","桃","肌","虹","色",
    "ねぎ","塩","空","陸","海","雲","雪","雨",
    "棒","板","弓","矢","家","塀","部屋","蓋",
    "牛","馬","鳥","人","鷹","鳩","犬","猫","熊"
  ],
  [
    "あさり","ごはん","きのこ","昆布","たけのこ","おかゆ","野菜","キャベツ",
    "レタス","大根","人参","もやし","トマト","玉ねぎ","大豆","納豆",
    "パソコン","水筒","マウス","カステラ","電池","メモリ","縄跳び","豚カツ",
    "青森","岩手","宮城","秋田","山形","福島","茨城","栃木","群馬",
    "埼玉","神奈川","新潟","富山","石川","福井","山梨","長野",
    "静岡","愛知","京都","大阪","兵庫","和歌山","鳥取","島根",
    "スピーカー","毛布","枕","和室","洋室","麦茶","唐揚げ","マカロニ",
    "おでん","シチュー","餃子","枝豆","たこ焼き","パン","菓子パン","プリン"
  ],
  [
    "東京","じゃがいも","キーボード","スクリーン","炊飯器","ドライヤー","フライパン","紙袋",
    "カレンダー","コンセント","洗濯機","洗面台","シャンプー","インターホン","洗面器","食器棚",
    "ティッシュ","アルコール","消毒","クッション","チューリップ","スパゲッティ","ピッツァ","カルボナーラ",
    "オムライス","明石焼き","タコライス","ガパオライス","味噌ラーメン","シャンパン","ハンバーガー","ハンバーグ",
    "チョコレート","プリンター","マヨネーズ","ガムテープ","電子レンジ","ペットボトル","エコバッグ","カーペット",
    "フローリング","ガスコンロ","かつお節","牛乳","お好み焼き","フランクフルト","イチゴジャム","ヨーグルト",
    "ビスケット","エビフライ","牛丼","親子丼","食パン","メロンパン","肉じゃが","ゆで卵"
  ],
  [
    "電動ドライバー","電気ストーブ","無線マウス","無線キーボード","ノートパソコン","リュックサック","クローゼット","パソコンケース",
    "コンセントプラグ","電気自動車","アルコールランプ","カーネーション","フロントエンド","バックエンド","バランスボール","豚骨ラーメン",
    "スマートフォン","ガソリンスタンド","正面玄関","高速道路","洗濯ばさみ","発泡スチロール","オレンジジュース","アップルジュース",
    "スマートスピーカー","風林火山","貨物コンテナ","貨物列車","大阪城公園","非常階段","緊急事態","地方公共団体",
    "スマートデバイス","味噌ラーメン","障害物","醤油ラーメン","家系ラーメン","クリスマスケーキ","アクセス修飾子","クリームチーズ",
    "スライスチーズ","チョコレートケーキ","キャンプファイヤー","ホットプレート","ポテトチップス","グレープフルーツ","グレープジュース","虫取り網",
    "体重計","ポケットティッシュ","オイスターソース","オリーブソース","マカロニグラタン","バナナジュース","ブルーベリージャム","フランスパン"
  ]
];


//gameBoardの要素のid取得
const timerPara = document.getElementById("timerPara");
const typedCountPara = document.getElementById("typedCountPara");
const instructionPara = document.getElementById("instructionPara");
const wrongIcon = document.getElementById("wrongIcon");
const textbox = document.getElementById("textbox");
const startButton = document.getElementById("startButton");
//reportの要素のid取得
const trigger = document.getElementById("trigger");
const report = document.getElementById("report");
const resultSpan = document.getElementById("resultSpan");
const playedTimeSpan = document.getElementById("playedTimeSpan");
const typedCountSpan = document.getElementById("typedCountSpan");
const averageTypingTimeSpan = document.getElementById("averageTypingTimeSpan");


//どのステージなのか取得して難易度や制限時間を決定
let gameType; //0 = timeAttack, 1 = scoreAttack, 2 = survival
let difficultyLevel;
let defaultRemaingTime;
let goalCount;
switch(stageName){
  case "level1":
  gameType = 0;
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
  goalCount = 5;
  break;

  case "level2":
  gameType = 0;
  difficultyLevel = 1;
  defaultRemaingTime = 30.00;
  goalCount = 7;
  break;

  case "level3":
  gameType = 0;
  difficultyLevel = 2;
  defaultRemaingTime = 30.00;
  goalCount = 7;
  break;

  case "level4":
  gameType = 0;
  difficultyLevel = 3;
  defaultRemaingTime = 30.00;
  goalCount = 10;
  break;

  case "scoreAttack":
  gameType = 1;
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
  break;

  case "survival":
  gameType = 2;
  difficultyLevel = 0;
  defaultRemaingTime = 30.00;
}


//その他の変数を宣言
let targetText;
let lastRandomNum = 0;
let typedCount = 0;
let remaingTime = defaultRemaingTime;
let playedTime = 0.00;
let isGamePlaying = false;
// let result;

//ゲーム開始準備
timerPara.innerHTML = defaultRemaingTime.toFixed(2);
updateTypedCountPara();
textbox.addEventListener("keypress",enterKeyListener);


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
  wrongIcon.style.display = "none";
  textbox.disabled = false;
  textbox.value = "";
  textbox.focus();
  startButton.innerHTML = "リタイア";

  
  updateInstructionPara();
  updateTypedCountPara();
  scaleup(typedCountPara, 1.05);
  timerStart();
}


function timerStart(){
  //countupメソッド
  let countup = function(){
    if(remaingTime > 0.00){
      remaingTime -= 0.01;
      playedTime += 0.01;
      timerPara.innerHTML = remaingTime.toFixed(2);
    }else{
      clearInterval(timer);
      gameTimeUp();
    }
  }

  remaingTime = defaultRemaingTime;
  timer = setInterval(countup,10);
}


//リタイア
function gameRetired(){
  clearInterval(timer);
  gameStop();
  openReport("リタイア");
}
//時間切れ
function gameTimeUp(){
  timerPara.innerHTML = "0.00";
  gameStop();
  openReport("タイムアップ!");
}
//ゲームクリア
function gameCleared(){
  clearInterval(timer);
  gameStop();
  openReport("ステージクリア!");
}


function gameStop(){
  isGamePlaying = false;
  textbox.disabled = true;
  startButton.innerHTML = "もう一度プレイ";
}


function enterKeyListener(event){
  if(event.key == "Enter"){
    textboxCheck();
    // textbox.value = "";
  }
}

function textboxCheck(){
  if(textbox.value == targetText){
    textbox.value = "";
    typedCount++;
    updateTypedCountPara();
    scaleup(typedCountPara, 1.05);

    if(gameType == 2){
      remaingTime += 2;
      scaleup(timerPara, 1.1);
    }else if(gameType == 0){
      if(typedCount >= goalCount){
        gameCleared();
      }
    }
    updateInstructionPara();
    wrongIcon.style.display = "none";

  }else if(textbox.value != targetText){
    wrongIcon.style.display = "block";
    scaleup(wrongIcon, 1.2);
    scaleup(instructionPara, 1.1);
  }
}


function updateInstructionPara(){
  //survivalなら徐々に難易度UP
  if(gameType == 2){
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
  //scoraAttackなら難易度ランダム
  if(gameType == 1){
    difficultyLevel = Math.floor(Math.random() * words.length);
  }

  targetText = words[difficultyLevel][getRandomNum()];
  instructionPara.innerHTML = "「" + targetText + "」 と入力してください。";
  scaleup(instructionPara, 1.05);
}


function updateTypedCountPara(){
  switch(gameType){
    case 0:
    typedCountPara.innerHTML = typedCount + " / " + goalCount;
    break;

    case 1:
    case 2:
    typedCountPara.innerHTML = typedCount;
  }
}


function openReport(result){

  
  resultSpan.innerHTML = result;
  playedTimeSpan.innerHTML = playedTime.toFixed(2) + "秒";
  typedCountSpan.innerHTML = typedCount;
  if(typedCount == 0){
    averageTypingTimeSpan.innerHTML = "0.00秒";
  }else{
    averageTypingTimeSpan.innerHTML = (playedTime.toFixed(2) / typedCount).toFixed(2) + "秒";
  }

  trigger.checked = true;
}


function scaleup(para, expansionRate){
  para.style.transition = "0.2s";
  para.style.transform = "scale(" + expansionRate + ")";
  setTimeout(() => {
    para.style.transform = "scale(1)";
  }, 200);
}


function getRandomNum(){
  let newRandomNum = Math.floor(Math.random() * words[difficultyLevel].length);
  while(newRandomNum == lastRandomNum){
    newRandomNum = Math.floor(Math.random() * words[difficultyLevel].length);
  }
  lastRandomNum = newRandomNum;
  return newRandomNum;
}
