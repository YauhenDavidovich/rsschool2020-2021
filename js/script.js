const inputSelector = document.querySelector('.selector__input');
const inputButton = document.querySelector('.selector__button')

function compareSelector(s1, s2) {
    let a = document.querySelectorAll(s1);
    let b = document.querySelectorAll(s2);
    console.log(a,b)
    if (a.length !== b.length) {
        console.log('false');
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                console.log('false');
            }
        }
        {
            console.log('true');
        }
    } 

}

    inputButton.addEventListener('click', () => {
        compareSelector(inputSelector.value, "#fancy")
    })