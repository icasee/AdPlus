var NEXTPT = [
	"li.next-page > a",
	"span.nav > a",	
	".pagebar>a:last-child",
	"#wp_page_numbers li:last-child > a",
	"a[class^=next]",
	"a:contains('\u4e0b\u4e00\u9875')",
	"a:contains('\u4e0b\u4e00\u9801')",
	"a:contains('>')"
];

var FILTER = [
	{a:'&page=([\\d]+)', b:'&page={num}', c:1},
	{a:'\/page([\\d]+)', b:'/page{num}', c:1},
	{a:'&start=([\\d]+)', b:'&start={num}', c:10},
	{a:'\/page\/([\\d]+)', b:'/page/{num}', c:1},
	{a:'p=([\\d]+)$', b:'p={num}', c:1}	
];

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {	
	switch (request.name) {	
		case 'updateBadge':
			chrome.browserAction.setBadgeText({text:"hello", tabId:sender.tab.id});
		break;
		case 'getURL':
			//callback
			sendResponse(chrome.extension.getURL(""));
		break;		
		default:
			//background log 
			console.log('onRequest addListener not found');
		break;
	}
});

chrome.contextMenus.create({title:"Google this image", contexts:["image"], onclick:function(a) {	
	chrome.tabs.create({url:"http://www.google.com/searchbyimage?sbisrc=cr_1_0_0&image_url=" + encodeURIComponent(a.srcUrl), selected:!1})
}});

chrome.contextMenus.create({title:"Auto Reply", contexts:["editable"], onclick:function(info, tab){
	chrome.tabs.sendRequest(tab.id, "autoReply");
}});