function switchDiv(divClass) {
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.add("hidden");
    }
    
    var elements = document.getElementsByClassName(divClass);

    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden");
}}

window.addEventListener("DOMContentLoaded") = function() {
    switchDiv('intro-page');
};

