class Calculator {
    constructor(currentOp, prevOp) {
        this.currentOp = currentOp;
        this.prevOp = prevOp;
        this.allClear()
    }
    allClear() {
        this.curentNum = '';
        this.prevNum = '';
        this.operator = '';
    }
    stackNumbers(digit) {
        if (digit === '.' && this.curentNum.includes('.')) return
        if (this.curentNum === '' && digit === '0') {
            return this.curentNum += '0.'
        } else if (this.curentNum === '' && digit === '.') {
            return this.curentNum += '0.'
        }
        this.curentNum += digit.toString();

    }
    del() {
        this.curentNum = this.curentNum.toString().slice(0, -1)
    }
    updateDisplay() {
        this.currentOp.innerText = this.curentNum;
        this.prevOp.innerText = this.prevNum;
    }
    calculate() {
        if (this.curentNum === '' || this.prevNum === '') return
        let calc;
        let curentNum = parseFloat(this.curentNum);
        let prevNum = parseFloat(this.prevNum);

        switch (this.operator) {
            case '+':
                calc = curentNum + prevNum;
                break;
            case '-':
                calc = prevNum - curentNum;
                break;
            case '*':
                calc = curentNum * prevNum;
                break;
            case '÷':
                calc = curentNum / prevNum;
                break;
        }
        this.curentNum = calc;
        this.prevNum = '';
        this.operator = undefined;
    }
    chosenOperator(operator) {
        if (this.curentNum === '') return
        if (this.prevNum !== '') {
            this.calculate()
        }
        this.operator = operator;
        this.prevNum = this.curentNum;
        this.curentNum = '';
    }

}
const num = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const del = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-allClear]');
const equals = document.querySelector('[data-equals]');
const prevOp = document.querySelector('[data-prevOp]');
const currentOp = document.querySelector('[data-currentOp]');

const calculator = new Calculator(currentOp, prevOp);

num.forEach(number => {
    number.addEventListener('click', () => {
        calculator.stackNumbers(number.innerText)
        calculator.updateDisplay()
    })
})
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.chosenOperator(operator.innerText)
        calculator.updateDisplay()
    })
})

del.addEventListener('click', () => {
    calculator.del()
    calculator.updateDisplay()
})
allClear.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})
equals.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})
