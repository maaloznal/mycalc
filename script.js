function addToInput(value) {
    document.getElementById('inputField').value += value;
}

function clearInput() {
    document.getElementById('inputField').value = '';
}

function calculateResult() {
    const input = document.getElementById('inputField').value;
    try {
        const result = calculate(input);
        document.getElementById('inputField').value = result;
    } catch (error) {
        document.getElementById('inputField').value = 'Error';
    }
}

function calculate(input) {
    const [operand1, operator, operand2] = input.split(' ');

    const isRoman = /^[IVXLCDM]+$/.test(operand1) && /^[IVXLCDM]+$/.test(operand2);
    const isArabic = /^[1-9]$|10/.test(operand1) && /^[1-9]$|10/.test(operand2);

    if (!isRoman && !isArabic) {
        throw new Error('Операнды должны быть либо арабскими, либо римскими числами');
    }

    let result;
    if (isRoman) {
        const num1 = romanToArabic(operand1);
        const num2 = romanToArabic(operand2);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = Math.floor(num1 / num2);
                break;
            default:
                throw new Error('Неправильный оператор');
        }
        result = arabicToRoman(result);
    } else {
        switch (operator) {
            case '+':
                result = parseInt(operand1) + parseInt(operand2);
                break;
            case '-':
                result = parseInt(operand1) - parseInt(operand2);
                break;
            case '*':
                result = parseInt(operand1) * parseInt(operand2);
                break;
            case '/':
                result = Math.floor(parseInt(operand1) / parseInt(operand2));
                break;
            default:
                throw new Error('Неправильный оператор');
        }
    }

    return result.toString();
}

function romanToArabic(roman) {
    const romanNumerals = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    let arabic = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanNumerals[roman[i]];
        const next = romanNumerals[roman[i + 1]];
        if (next && current < next) {
            arabic -= current;
        } else {
            arabic += current;
        }
    }
    return arabic;
}

function arabicToRoman(num) {
    if (num <= 0) return '';
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];
    let roman = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            roman += romanNumerals[i].numeral;
            num -= romanNumerals[i].value;
        }
    }
    return roman;
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        calculateResult();
    }
}