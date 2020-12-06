let burger = document.getElementById("burger-button");
let area = document.get

burger.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("open");
  burger.classList.toggle("open");
});

// Detect all clicks on the document
document.addEventListener("click", function (event) {
  
  if (event.target.closest(".burger")) return;
  if (event.target.closest(".burger__menu")) return;
  if (document.body.classList.contains("open")){
      document.body.classList.toggle("open");
      burger.classList.toggle("open");
    } 
});

// When the user clicks anywhere outside of the modal, close it