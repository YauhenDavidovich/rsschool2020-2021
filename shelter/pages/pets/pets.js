let pets = [];
let petsButtons = document.querySelectorAll('.pets__card');
fetch('../../assets/json/pets.json').then(res => res.json()).then(list => pets = list);

petsButtons.forEach(elem => elem.addEventListener('click', (event) => {
  popup(event);
}));

function popup(event) {
  document.querySelector("html").style.overflowY = 'hidden';
  let name = event.target.closest('.pets__card').querySelector(".card__title").innerText,
    i = pets.findIndex(elem => elem.name == name);
  document.querySelector("body").insertAdjacentHTML('afterbegin', `
  <div class='dark__page' id='dark__page'>
  <div class="dark__wrapper"></div>
    <div class="popup-box">
      <div class='popup-card' id='popupCard'>
        <div class="popup-image" id="popupImage">
          <img src=" ${pets[i].img} " alt="">
        </div>
        <div class="card card_place_popup">
          <h3 class="card__title card__title_place_popup">${pets[i].name}</h3>
          <h4 class="card__title card__subtitle_place_popup">${pets[i].type} - ${pets[i].breed}</h4>
          <h5 class="card__title card__text_place_popup">${pets[i].description}</h5>
          <ul class="card__title card__list_place_popup">
            <li class="card__list_item"><strong>Age:</strong> ${pets[i].age}</li>
            <li class="card__list_item"><strong>Inoculations:</strong> ${pets[i].inoculations}</li>
            <li class="card__list_item"><strong>Diseases:</strong> ${pets[i].diseases}</li>
            <li class="card__list_item"><strong>Parasites:</strong> ${pets[i].parasites}</li>
          </ul>
        </div>
      </div>
      <button class='button button_place_popup'>
      </button>
    </div>
  </div>
  `);

  document.querySelector('.dark__page').style.top = window.pageYOffset + 'px';
  document.querySelector('.popup-card').addEventListener('mouseout', () => {
    document.querySelector('.button_place_popup').classList.add('button_place_popup_active')
  });
  document.querySelector('.popup-card').addEventListener('mouseover', () => {
    document.querySelector('.button_place_popup').classList.remove('button_place_popup_active')
  });
  document.querySelectorAll('.dark__wrapper, .button_place_popup')

    .forEach(elem => elem.addEventListener('click', () => {
      document.querySelector("html").style.overflowY = '';
      dark__page.remove();
    }));
}

const burgerMenu = document.querySelector("input[name=burger-menu]");
burgerMenu.addEventListener('change', function () {
  if (this.checked) {
    document.querySelector("html").style.overflowY = 'hidden';
    document.querySelector("body").insertAdjacentHTML('afterbegin', `
  <div class="burger__blackout_active" id="burger__blackout_active"></div>`);
    document.querySelector('.header-wrapper').classList.add('header__wrapper_buger-active')
    document.querySelector('.header').classList.add('header__transparent')
  } else {
    document.querySelector("html").style.overflowY = '';
    document.querySelector('.burger__blackout_active').remove();
    document.querySelector('.header-wrapper').classList.remove('header__wrapper_buger-active')
    document.querySelector('.header').classList.remove('header__transparent')
  }
  document.querySelectorAll('.burger__blackout_active')

    .forEach(elem => elem.addEventListener('click', () => {
      document.querySelector("html").style.overflowY = '';  
      document.querySelector('.burger__blackout_active').remove();    
      document.querySelector('.header').classList.remove('header__transparent');
      document.querySelector('.header-wrapper').classList.remove('header__wrapper_buger-active')
      burgerMenu.checked = false;
    }));
});






// let jsonArray = [];

// for (let i = 0; i < 6; i++) {
// function makeRandomArr(a, b) {
//   return Math.random() - 0.5;
// }
// jsonObj.sort(makeRandomArr);
// for (j = 0; j < jsonObj.length; j++) {
//   jsonArray.push(jsonObj[j]);
// }
// }

// let oneRight = document.querySelector('.oneRight');
// let twoRight = document.querySelector('.twoRight');
// let oneLeft = document.querySelector('.oneLeft');
// let twoLeft = document.querySelector('.twoLeft');
// let countSlide = [];




// // PAGINATION

// let quantityPages = 0;
// let currentPage = document.querySelector('.currentPage');


// if (window.innerWidth < 768) {
// quantityPages = 16;
// } else if (window.innerWidth < 1280) {
// quantityPages = 8;
// } else {
// quantityPages = 6;
// }

// const changePage = function(event) {
// if (event.currentTarget === oneRight) {
//   +(currentPage.textContent) ++;
// } else if (event.currentTarget === oneLeft) {
//   +(currentPage.textContent) --;
// } else if (event.currentTarget === twoRight) {
//   currentPage.innerText = `${quantityPages}`;
// } else if (event.currentTarget === twoLeft) {
//   currentPage.innerText = 1;
// }

// if (+(currentPage.textContent) === 1) {
//   oneLeft.setAttribute("disabled", "disabled");
//   twoLeft.setAttribute("disabled", "disabled");
//   oneRight.removeAttribute("disabled");
//   twoRight.removeAttribute("disabled");
// } else if (+(currentPage.textContent) === quantityPages) {
//   oneRight.setAttribute("disabled", "disabled");
//   twoRight.setAttribute("disabled", "disabled");
//   oneLeft.removeAttribute("disabled");
//   twoLeft.removeAttribute("disabled");
// } else if (+(currentPage.textContent) > 1) {
//   oneLeft.removeAttribute("disabled");
//   twoLeft.removeAttribute("disabled");
//   oneRight.removeAttribute("disabled");
//   twoRight.removeAttribute("disabled");
// }

// generetionPage();
// }

// let arrElem = [];

// const createArrElem = function(e) {
// for (let j = 0; j < quantityPages; j++) {
//   let i = 0;
//   let countSlide = [];

//   while (i < (48 / quantityPages)) {
//       item = jsonObj[Math.floor(Math.random() * jsonObj.length)];
//       if (!(countSlide.includes(item))) {
//           countSlide.push(item);
//           i++;
//       }
//   }

//   arrElem.push(countSlide);

//   countSlide = [];
// }
// }

// let slideBlock = document.getElementsByClassName('pets-info');

// let page;

// function listenerPage() {
// page = +(currentPage.textContent);
// setInterval(listenerPage, 1000);
// }

// const generetionPage = function() {
// for (let i = 0; i < arrElem[+(currentPage.textContent) - 1].length; i++) {
//   slideBlock[i].innerHTML = `<img src=${arrElem[+(currentPage.textContent)-1][i].img}>
//   <span class="name-pets">${arrElem[+(currentPage.textContent)-1][i].name}</span>
//   <button class="name-pets-btn">Learn more</button>`;
// }
// }


// const goMain = function() {
// document.location.href = "../main/main.html";
// }

// const resize = function() {
// if (window.innerWidth < 768) {
//   quantityPages = 16;
// } else if (window.innerWidth < 1280) {
//   quantityPages = 8;
// } else {
//   quantityPages = 6;
// }
// }
// document.addEventListener('DOMContentLoaded', generetionPage);
// navBtn.addEventListener("click", activeNav);
// wr.addEventListener("click", activeNav);


// for (let i = 0; i < petsBlock.length; i++) {
// petsBlock[i].addEventListener("click", createPopup);
// }


// wrBlockPopup.addEventListener("click", createPopup);
// document.querySelector(".btnPopup").addEventListener("click", createPopup);
// wrBlockPopup.addEventListener("mouseover", changeStyleBtnPopup);

// oneRight.addEventListener("click", changePage);
// twoRight.addEventListener("click", changePage);
// oneLeft.addEventListener("click", changePage);
// twoLeft.addEventListener("click", changePage);
// logo.addEventListener("click", goMain);

// window.addEventListener('resize', resize);

// createArrElem();
// listenerPage();