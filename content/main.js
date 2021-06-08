
sleepTime = 2300;
blockServersUrlsList = ["https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_adservers.txt", "https://raw.githubusercontent.com/easylistbrasil/easylistbrasil/master/easylistbrasil/adservers.txt"];
htmlTagsList = ["img", "video", "iframe", "embed", "object", "source"];
bypassServers = ["github", window.location.hostname.toString()]
listsReady = 0;
listsNumber = blockServersUrlsList.length;
loops = 0;
maxLoops = 15;
serverList = [];
jpOn = null;

function main(){
    firstRun();
    getBlockedServers(blockServersUrlsList);

    startJP();
    setInterval(() => {
        changeDesign();
    }, 300);

    setInterval(() => {
        if (loops < maxLoops){
            startJP();
        }
    }, sleepTime);
}

function firstRun(){
    getPower();
    if (jpOn === undefined){
        jpOn = true;
    }
}

function changeDesign(){
    getPower();
    try{
        if (jpOn === false){
            document.getElementById("buttonText").innerText = "OFF";
        }else{
            document.getElementById("buttonText").innerText = "ON";
        }
    }catch{}
}

function powerButton(){
    getPower();
    if (jpOn === true){
        changePower(false);
    }else{
        changePower(true);
        loops = 0;
    }
}

function changePower(energy){
    chrome.storage.local.set({"jpOn": energy}, function() {});
}

function getPower(){
    chrome.storage.local.get(['jpOn'], function(result) {
        jpOn = result.jpOn;
    });
}

function startJP(){
    if (jpOn === true){
        console.log("JP: " + loops.toString());
        loops += 1;
        if(listsReady == listsNumber){
            htmlTagsList.forEach((tag) => {
                blockAds(tag);
            });
        }
    }
}

function checkUrl(url){
    if (url == ""){
        return false;
    }

    for (i=0; i<bypassServers.length; i++){
        s =  bypassServers[i];
        if (url.includes(s)){
            return false;
        }
    }

    return true;
}

function parseResponse(response){
    var splited = response.split("\n");
    strServerList = ""

    splited.forEach((s) => {
        if (s.includes("||")){
            server = s.replace("||", "").split("^")[0].split("/")[0];
            if (server != ""){
                strServerList += server + ",";
            }
        }
    });

    serverList = serverList.concat(strServerList.replace(" ", "").replace(window.location.hostname.toString(), "").split(","));
    listsReady += 1;
}

function getBlockedServers(urls){

    urls.forEach((url) => {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                rawResponse = xhttp.responseText;
                parseResponse(rawResponse);
            }
        }

        xhttp.open("GET", url, true);
        xhttp.send();
    });
}

function blockAds(htmlTag){
    imgTags = document.querySelectorAll(htmlTag);

    imgTags.forEach((tag) => {
        if (htmlTag == "object" && tag.data != undefined){
            if (checkUrl(tag.data.toString())){
                for (i=0; i<serverList.length; i++){
                    server = serverList[i];
                    if (tag.data.toString().includes(server)){
                        console.log("BLOCKED: " + tag.data.toString());
                        tag.data = "";
                        break;
                    }
                }
            }
        }
        else if (tag.src != undefined){
            url = tag.src.toString();
            
            if (checkUrl(tag.src.toString())){
                for (i=0; i<serverList.length; i++){
                    server = serverList[i];
                    if (server === "" || server === null){
                        continue;
                    }
                    else if (tag.src.toString().includes(server)){
                        console.log("BLOCKED: " + tag.src.toString());
                        tag.src = "";
                        break;
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var switchButton = document.getElementById("switchButton");
    switchButton.addEventListener('click', function() {
        powerButton();
        changeDesign();
    }, false);
}, false);

main();
