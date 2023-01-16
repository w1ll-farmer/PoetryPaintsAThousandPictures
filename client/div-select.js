function switchDiv(divClass) { //switches 'visible' divs
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) { //makes all divs hidden
        divs[i].classList.add("hidden");
    }
    
    var elements = document.getElementsByClassName(divClass);
    //unhides all divs within a specific class
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden");
}}
//makes it so intro-page is the only div shown when DOM content
//has loaded
window.addEventListener("DOMContentLoaded") = function() {
    switchDiv('intro-page');
};

