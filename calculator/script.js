class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }


  sqrt() {
    this.previousOperand = this.currentOperand;
    if (parseFloat(this.currentOperand) < 0) {
      this.operation = '√ Sq root can\'t be extracted!';
    } else {
      this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
      this.operation = '√';
    }
  }

  plusMinus(number) {
    if (this.currentOperand === '') return;
    this.currentOperand = this.currentOperand * (-1);
  }


  compute() {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    const decimalPlaces = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));
    if (String(current).includes('.') && String(prev).includes('.')) {
      let maxDecimalPlaces = Math.max(decimalPlaces(current), decimalPlaces(prev));
      current = current * Math.pow(10, maxDecimalPlaces)
      prev = prev * Math.pow(10, maxDecimalPlaces)      
      switch (this.operation) {
        case '+':
          console.log(prev, current)
          computation = (prev + current) / Math.pow(10, maxDecimalPlaces);
          console.log(computation)
          break
        case '-':
          computation = (prev - current) / Math.pow(10, maxDecimalPlaces);
          break
        case '÷':
          computation = (prev / current) * Math.pow(1, maxDecimalPlaces);
          break
        case '*':
          computation = prev * current / Math.pow(100, maxDecimalPlaces);
          break
        case '+':
          computation = prev + current / Math.pow(10, maxDecimalPlaces);
          break
        case 'xn':
          computation = Math.pow(prev, current) / Math.pow(10, maxDecimalPlaces);
          break
        default:
          return;
      }
    } else if (isNaN(prev) || isNaN(current)) return;
    else {
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break
        case '-':
          computation = prev - current;
          break
        case '÷':
          computation = (prev / current);
          break
        case '*':
          computation = prev * current;
          break
        case '+':
          computation = prev + current;
          break
        case 'xn':
          computation = Math.pow(prev, current);
          break
        default:
          return;
      }
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    if (this.operation === '√ Sq root can\'t be extracted!') {      
      this.currentOperandTextElement.innerText ='ERROR';
    } else this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation === '√') {
      this.previousOperandTextElement.innerText =
        `${this.operation} ${this.getDisplayNumber(this.previousOperand)}`
    } else if (this.operation === 'xn') {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ^`      
    } else if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const squareRootButton = document.querySelector('[data-sq__root]');
const plusMinus = document.querySelector('[data-plus__minus]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

    if (calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

squareRootButton.addEventListener('click', button => {
  calculator.sqrt();
  calculator.updateDisplay();
})

plusMinus.addEventListener('click', button => {
  calculator.plusMinus();
  calculator.updateDisplay();
})



allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})