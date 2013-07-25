// document.addEventListener("mousedown", function(event){

//   event.button == 2 && updateMenu();

// }, true);
var clickedEl = null;
var FORUM = [
"是好東西我就一定要收下。",
"試試看，我都不知道哪個能用了哦。",
"剛剛在網上看過介紹，居然就找到了，謝謝樓大。",
"多謝樓上的經驗分享，正需要這個。",
"看起來不錯，感謝無私分享。",
"我又來了，正需要這個，感謝樓主。",
"很好，多謝樓主分享了，先收藏起來。。",
"感謝分享，支持一下！感謝分享，支持一下！",
"感謝分享, LZ你太有才了! 地球的人飄過...",
"前排支持下  這個收藏了。",
"淚牛滿面 樓主太有才了。",
"不支持也要頂一下.",
"留個名,等下有空再回來看看。",
"等了半天終於有了啊.太感謝樓主了。",
"先收藏起來，有空再回來看看。",
"正需要這個，,多謝樓上的經驗分享。",
"收藏了，看看改進了什麼。",
"看起來不錯，更新速度也真快啊。",
"更新的實在是太快囉!!!感謝囉!!",
"這是一套非常好用的軟體..真的能豎起大拇指說 \"讚\"",
"感謝大大提供下載  小弟感激不盡唷~~",
"我是來看楼主頭像的",
"我就是來支持楼主一下的",
"感謝為我們分享這些內容",
"回复，然后下载！要下的东西太多，没办法，只能连续顶！",
"感動中。。。楼主這次的分享，確實很不錯",
"好東西,這次一定要收下。",
"收藏之 以備不時之需 期待樓下小白鼠測試效果",
"先留名.等有空才回來吧."
];

document.addEventListener("mousedown", function(event){
  //right click
  if(event.button == 2) { 
      clickedEl = event.target;
  }

}, true);

window.addEventListener("load", function() {
  console.log("window", "loaded");
}, false);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  if(request == "autoReply") {
      clickedEl.value = getReplyText();
  }
  
});

function getReplyText(){
  return FORUM.sort(function() {
    return Math.round(Math.random()) - 0.5
  })[0];
}

function getfullurl(){
  return 'http://www.poktsun.com/adplus?u=' + encodeURIComponent(location.href);
}

function isSkipAd() {
  return !localStorage.adplus;
}

function updateMenu(){
  chrome.extension.sendMessage({
    'message': 'updateContextMenu',
    'skipad': isSkipAd()});
}

function addStyle(element){
  var style = document.createElement('link')
  style.href = getfullurl();
  style.rel = 'stylesheet';
  style.type = 'text/css';

  //var element = document.head || document.documentElement;
  // var element = document.getElementsByTagName('head')[0];
  element.appendChild(style);
}

function browserAction(a) {
  chrome.extension.sendRequest({name:"updateBadge", host:gb.host, data:a})
}

// (function(){
//   isSkipAd() && addStyle();
// })();

var waitForDomInterval = setInterval(function () {
  var node;
  if (typeof document.head == "undefined")
      node = document.querySelector ("head, body");
  else
      node = document.head;

  if (node) {
      clearInterval (waitForDomInterval);
      isSkipAd() && addStyle(node);
  }
}, 10);

