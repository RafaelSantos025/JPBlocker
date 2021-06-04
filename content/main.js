
sleepTime = 3000;
blockServersUrlsList = ["https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_adservers.txt", "https://raw.githubusercontent.com/easylistbrasil/easylistbrasil/master/easylistbrasil/adservers.txt"];
htmlTagsList = ["img", "video", "iframe", "embed", "object", "source"];
bypassServers = ["github", window.location.hostname.toString()]
listsReady = 0;
listsNumber = blockServersUrlsList.length;
loops = 0;
maxLoops = 5;
serverList = [];
jpOn = true;

function main(){
    getBlockedServers(blockServersUrlsList);

    startJP();
    setInterval(() => {
        if (loops < maxLoops){
            startJP();
        }
    }, sleepTime);
}

function startJP(){
    loops += 1;
    console.log("JP: " + loops.toString());
    if(listsReady == listsNumber){
        htmlTagsList.forEach((tag) => {
            if (jpOn){
                blockAds(serverList, tag);
            }
        });
    }
}

function switchButton(){
    if (jpOn){
        jpOn = false;
    }else{
        jpOn = true;
        loops = 0;
    }
}

function checkServer(server){
    server = server.replace(" ", "").replace("\n", "").replace("\r", "").replace("\t", "");

    if(server==""){
        return false;
    }
    if(!server.includes(".")){
        return false;
    }

    return true;
}

function checkUrl(url){
    if (url == ""){
        return false;
    }

    for (i=0; i<bypassServers.length; i++){
        s =  bypassServers[i];
        if (url.includes(s)){
            console.log("BYPASSED: " + url);
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
            if (checkServer(server)){
                strServerList += server + ","
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

function blockAds(bannedAdsServers, htmlTag){
    imgTags = document.querySelectorAll(htmlTag);

    imgTags.forEach((tag) => {
        if (htmlTag == "object" && tag.data != undefined){
            if (checkUrl(tag.data.toString())){
                for (i=0; i<bannedAdsServers.length; i++){
                    server = bannedAdsServers[i];
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
                for (i=0; i<bannedAdsServers.length; i++){
                    server = bannedAdsServers[i];
                    if (tag.src.toString().includes(server)){
                        console.log("BLOCKED: " + tag.src.toString());
                        tag.src = "";
                        break;
                    }
                }
            }
        }
    });
}

main();
