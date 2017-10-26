//Broswer identifying
let BrowserNameSpace;
let isChrome=false,isFF=false;

const DEBUG = true;


function UrlMessage() {
    this.url= '';
    this.cookies= '';
    this.useragent= '';
    this.filename= '';
    this.referrer= '';
    this.postdata= '';
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}



//let letItGo = []; //Let it go, let it gooo Can't hold it back anymore

//if str was encoded, return it. otherwise return encoded str
function denCode(str){
    //return encodeURIComponent(decodeURIComponent(str));
    return decodeURIComponent(str) !== str ? str : encodeURI(str);
}

if(typeof browser !== 'undefined' ){
    BrowserNameSpace = browser ;
    isFF=true;
}
else if(typeof chrome !== 'undefined' ){
    BrowserNameSpace = chrome;
    isChrome=true;
}


function L(msg) {
    if(DEBUG)
        console.log(msg);
}

let PDMNotFound = false;
let hostName = 'com.yooz.pdmchromewrapper';

SendInitMessage();

function getDomain(url){

    var TLDs = ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw"].join()

    url = url.replace(/.*?:\/\//g, "");
    url = url.replace(/www./g, "");
    var parts = url.split('/');
    url = parts[0];
    var parts = url.split('.');
    if (parts[0] === 'www' && parts[1] !== 'com'){
        parts.shift()
    }
    var ln = parts.length
        , i = ln
        , minLength = parts[parts.length-1].length
        , part

    // iterate backwards
    while(part = parts[--i]){
        // stop when we find a non-TLD part
        if (i === 0                    // 'asia.com' (last remaining must be the SLD)
            || i < ln-2                // TLDs only span 2 levels
            || part.length < minLength // 'www.cn.com' (valid TLD as second-level domain)
            || TLDs.indexOf(part) < 0  // officialy not a TLD
        ){
            var actual_domain = part;
            break;
            //return part
        }
    }
    //console.log(actual_domain);
    var tid ;
    if(typeof parts[ln-1] != 'undefined' && TLDs.indexOf(parts[ln-1]) >= 0)
    {
        tid = '.'+parts[ln-1];
    }
    if(typeof parts[ln-2] != 'undefined' && TLDs.indexOf(parts[ln-2]) >= 0)
    {
        tid = '.'+parts[ln-2]+tid;
    }
    if(typeof tid != 'undefined')
        actual_domain = actual_domain+tid;
    else
        actual_domain = actual_domain+'.com';
    return actual_domain;
}

function getCookies(url,callback) {
    let domain = getDomain(url);// This function was one of the best functions i've ever seen, but now it's uselss. I'll not delete it because i love it... I want to spread it to world using persepolis ... RIP my friend
    //let domainQuery= {domain:domain};
    let urlQuery = {url:url};

    let blacklistDecode = [
        "mycdn.me"
    ];

    if(isChrome){
        BrowserNameSpace.cookies.getAll(urlQuery,(urlcookies)=>{
            let cookieArray = [];
            if (blacklistDecode.indexOf(domain)  == -1)
                cookieArray = urlcookies.map((cookie)=>denCode(cookie.name)+ "=" + denCode(cookie.value));
            else
                cookieArray = urlcookies.map((cookie)=>cookie.name+ "=" + cookie.value);
            L("2:");
            L(cookieArray);
            callback(cookieArray);
        });
    }else if(isFF){
        BrowserNameSpace.cookies.getAll(urlQuery).then((urlcookies)=>{
            let cookieArray = [];
            if (blacklistDecode.indexOf(domain)  == -1)
                cookieArray = urlcookies.map((cookie)=>{return denCode(cookie.name)+ "=" + denCode(cookie.value);});
            else
                cookieArray = urlcookies.map((cookie)=>{return cookie.name+ "=" + cookie.value});
            L("2:");
            L(cookieArray);
            callback(cookieArray);
        });
    }
}


function setCookies(message,callback) {
    message.useragent = navigator.userAgent;
    getCookies(message.url,urlCookie=>{
        message.cookies = urlCookie;
        //I know it's always false, at first it looked good but not now. so i saved the code for future jobless source code viewers like you
        if(false && message.referrer != null && message.referrer !=""){
            getCookies(message.referrer,refererCookies=>{
                message.cookies = arrayUnique(message.cookies.concat(refererCookies)).join("; ");
                L("final cookies With referer:");
                L(message.cookies);
                callback(message);
            });
        }else{
            message.cookies = arrayUnique(message.cookies).join("; ");
            L("final cookies Without referer:");
            L(message.cookies);
            callback(message);
        }
    });
}

//Send URL to the pdm-chrome-wrapper
function SendURLMessage(message) {
    setCookies(message, (cookie_with_message) => {
        L("Cookies set...");
        SendCustomMessage(cookie_with_message);
    });
}


function SendInitMessage(){
    SendCustomMessage({ version: "0.5" });
}

//Crafter for sending message to PDM
function SendCustomMessage(data,callback){
    L(data);
    BrowserNameSpace.runtime.sendNativeMessage(hostName, data,(response) =>{
        L(response);
        callback && callback(response); //Call the callback with response if it's available
    });
}

//Add download with persepolis to context menu
BrowserNameSpace.contextMenus.create({
    title: 'Watch in Yooz',
    id: "watch_in_yooz",
    contexts: ['all']
});


BrowserNameSpace.contextMenus.onClicked.addListener(function(info, tab) {
        "use strict";
        if (info.menuItemId === "watch_in_yooz") {
            L(info['linkUrl']);
            let msg = new UrlMessage();
            msg.url = tab.url;
            SendURLMessage(msg);
        }
    }
);
