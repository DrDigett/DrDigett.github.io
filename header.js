const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () =>{
  navMenu.classList.toggle("nav-menu_visible");
}) 
if (navMenu.classList.contains("mav-,emi_visible")){
  navToggle.setAttribute("arial-label", "Cerrar menú");
}else{
  navToggle.setAttribute("arial-label", "Abrir menú")
}