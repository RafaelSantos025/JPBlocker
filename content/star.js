var blockedAds = 0;
var lastRatedStars = 0;

function rate(star) {
    lastRatedStars = star;
    changeStartsCollor(star);  
}

function changeStartsCollor(star){
    
    for (i = 0; i < 5; i++) {
        elementNumber = i+1
        elementId = "s" + elementNumber.toString();
        if (i < star){
            document.getElementById(elementId).src = "images/star1.png";
        }else{
            document.getElementById(elementId).src = "images/star0.png";
        }
    }
}

function getBlockedAds(){
    chrome.storage.local.get(['blockAds'], function(result) {
        blockedAds = result.blockAds;
    });
}

function printBlockedAds(){
    try{
        getBlockedAds();
        document.getElementById("reportText").innerText = blockedAds;
    }catch{
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById("sendBtn");
    sendButton.addEventListener('click', function() {
        var comment = document.getElementById('comment').value.toString();
        if (lastRatedStars != "0"){
            db.collection("rate").add({
                stars:lastRatedStars,
                comment:comment
            }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
            document.getElementById('comment').value = "";
            changeStartsCollor(0);
            alert("Obrigado por nos avaliar."); 
        }else{
            alert("Por favor selecione um numero de estrelas."); 
        }
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("btn1");
    starButton.addEventListener('click', function() {
        rate(1);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("btn2");
    starButton.addEventListener('click', function() {
        rate(2);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("btn3");
    starButton.addEventListener('click', function() {
        rate(3);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("btn4");
    starButton.addEventListener('click', function() {
        rate(4);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("btn5");
    starButton.addEventListener('click', function() {
        rate(5);
    }, false);
}, false);

printBlockedAds();
setInterval(() => {
    printBlockedAds();
}, 500);
