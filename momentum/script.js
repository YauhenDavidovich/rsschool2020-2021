// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  day = today.getDay();
  data = today.getDate();
  month = today.getMonth();
  day = today.toLocaleDateString("en-US", options);





  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}<br>${day}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Type your name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {

  if (e.type === 'keypress') {
    if (e.which == 13 && e.target.innerText == "" || (e.keyCode == 13 || e.type === 'mouseleave') && e.target.innerText == "") {
      e.preventDefault();
      name.innerHTML = '[Type your name]';
    } else if (e.which == 13 || e.keyCode == 13 && e.target.innerText !== "") {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function outsideNameClickListener(e) {
  if (!e.target.matches('.name') && name.innerText == "") {
    name.innerText = '[Type your name]';
  }
}


// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Type your focus for today]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {

  if (e.type === 'keypress') {
    if (e.which == 13 && e.target.innerText == "" || (e.keyCode == 13 || e.type === 'mouseleave') && e.target.innerText == "") {
      e.preventDefault();
      name.innerHTML = '[Type your focus for today]';
    } else if (e.which == 13 || e.keyCode == 13 && e.target.innerText !== "") {
      localStorage.setItem('focus', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function outsideFocusClickListener(e) {
  if (!e.target.matches('.focus') && focus.innerText == "") {
    focus.innerText = '[Type your focus for today]';
  }
}


//Quotes

const blockquote = document.querySelector('blockquote');

const btnBlockquote = document.querySelector('.quote__btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://api.chucknorris.io/jokes/random`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.value;
  
}

document.addEventListener('DOMContentLoaded', getQuote);
btnBlockquote.addEventListener('click', getQuote);


document.querySelector('#reload').addEventListener('click',   function(event) {
  
  
  document.querySelector('#reload').classList.add('spin');
  setTimeout(function(){    
    document.querySelector('#reload').classList.remove('spin');
  },400);
});





name.addEventListener('keypress', setName);
document.addEventListener('click', outsideNameClickListener)
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
document.addEventListener('click', outsideFocusClickListener)
focus.addEventListener('blur', setFocus);





localStorage.clear()
showTime();
getName();
getFocus();