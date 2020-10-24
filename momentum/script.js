// DOM Elements
const greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  bgChangeNext = document.querySelector('.bg__change_next'),
  bgChangePrev = document.querySelector('.bg__change_prev');


showClock = () =>{
  let date = new Date();

  let dayOfMonth = date.getDate();
  
  // Days of week
  let days = date.getDay();
  const weekdays = new Array(7);
  weekdays[0] = "SUN";
  weekdays[1] = "MON";
  weekdays[2] = "TUE";
  weekdays[3] = "WED";
  weekdays[4] = "THR";
  weekdays[5] = "FRI";
  weekdays[6] = "SAT";

  let showDays = weekdays[days];

  // Month of year
  let month = date.getMonth();
  const yearMonth = new Array(12);
  yearMonth[0] = "JAN";
  yearMonth[1] = "FEB";
  yearMonth[2] = "MAR";
  yearMonth[3] = "APR";
  yearMonth[4] = "MAY";
  yearMonth[5] = "JUN";
  yearMonth[6] = "JUL";
  yearMonth[7] = "AUG";
  yearMonth[8] = "SEP";
  yearMonth[9] = "OCT";
  yearMonth[10] = "NOV";
  yearMonth[11] = "DEC";

  let showMonth = yearMonth[month];

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
   

  hr = (hr < 10) ? "0" + hr : hr;
  min = (min < 10) ? "0" + min : min;
  sec = (sec < 10) ? "0" + sec : sec;

  let time = hr + ':' + min + ':' + sec;

  document.querySelector('.clock-display-days').innerHTML = showDays + ',' + ' ' + showMonth + ' ' + dayOfMonth;
  document.querySelector('.clock-display-time').innerHTML = time;

  setTimeout(showClock, 1000);
}


// Set Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning    
    greeting.innerText = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon    
    greeting.innerText = 'Good Afternoon, ';
  } else {
    // Evening    
    greeting.innerText = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Set Background
const base = './assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
let n= 0;
const timeOfADayy = ['morning/', 'day/','evening/', 'night/']

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}


function getImage() {
  let shuffledArr = images.sort(function(){

    return Math.random() - 0.5;
  });
  localStorage.setItem('image', JSON.stringify(shuffledArr));
  let today = new Date(),
    hour = today.getHours();
  const index = i % shuffledArr.length;
  
  const imageSrc = base + timeOfADayy[n] + shuffledArr[index];
  if (hour < 12) {
    // Morning    
    n = 0;
  } else if (hour < 18) {
    n=1;
  } else if (hour < 24) {
    n=2;
  } else {
    n=3;
  }
  viewBgImage(imageSrc);
  i++;
  localStorage.setItem('image_index', JSON.stringify(i));
  localStorage.setItem('hour', JSON.stringify(hour));
} 


// Next background image
function nextImage() {  
  const shuffledArr = JSON.parse(localStorage.getItem('image'));  
  let hour = JSON.parse(localStorage.getItem('hour'));
  let index = JSON.parse(localStorage.getItem('image_index'));;
  console.log(hour, index)
  const imageSrc = base + timeOfADayy[n] + shuffledArr[index];
  if (hour < 12) {
    // Morning    
    n = 0;
  } else if (hour < 18) {
    n=1;
  } else if (hour < 24) {
    n=2;
  } else {
    n=3;
  }
  viewBgImage(imageSrc);
  i++;
  hour++;
  if (hour > 23) {hour = 0;};
  if (i > 19) {i = 0;};
  localStorage.setItem('image_index', JSON.stringify(i));
  localStorage.setItem('hour', JSON.stringify(hour));
  bgChangeNext.disabled = true;
  setTimeout(function() { bgChangeNext.disabled = false }, 1000);
}


function prevImage() {  
  storedImageRow = localStorage.getItem('image');
  let today = new Date(),
    hour = today.getHours();
  const index = i;
  
  const imageSrc = base + timeOfADayy[n] + storedImageRow[index];
  if (hour < 12) {
    // Morning    
    n = 0;
  } else if (hour < 18) {
    n=1;
  } else if (hour < 24) {
    n=2;
  } else {
    n=3;
  }
  viewBgImage(imageSrc);
  index++;
  hour++;
  bgChangePrev.disabled = true;
  setTimeout(function() { bgChangePrev.disabled = false }, 1000);
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

bgChangeNext.addEventListener('click', nextImage);
bgChangePrev.addEventListener('click', prevImage);




showClock();
setBgGreet();
getImage();
getName();
getFocus();
// localStorage.clear()