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

  document.querySelectorAll('.dark__wrapper, .button_place_popup')
  .forEach(elem => elem.addEventListener('click', () => {
    document.querySelector("html").style.overflowY = '';    
    dark__page.remove();
  }));
}


