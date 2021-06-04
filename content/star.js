function rate(star) {
    changeStartsCollor(star);
    document.getElementById('rating').innerHTML = star.toString();   
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

document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById("sendBtn");
    sendButton.addEventListener('click', function() {
        var stars = document.getElementById('rating').innerHTML.toString();
        var comment = document.getElementById('comment').value.toString();
        if (stars != "0"){
            db.collection("rate").add({
                stars:stars,
                comment:comment
            }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
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


document.addEventListener('DOMContentLoaded', function() {
    var starButton = document.getElementById("switchButton");
    starButton.addEventListener('click', function() {
        switchButton();
    }, false);
}, false);
