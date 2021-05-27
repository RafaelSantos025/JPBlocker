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