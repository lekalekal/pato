var Burger = document.querySelector(".btn-show-sidebar");
var Main_nav = document.querySelector(".menu-bar");

Burger.addEventListener("click",function(){
Burger.classList.toggle("active");
Main_nav.classList.toggle("active");
});