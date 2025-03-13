document.addEventListener('DOMContentLoaded', () => {
    const inputs = Array.from({length: 5}, (_, i) => document.getElementById(`digit${i+1}`));
    const result = document.getElementById('result');
    const resultThree = document.getElementById('result-three');
    const resultFour = document.getElementById('result-four');

    let numbers = generateNumbers();
    result.textContent = numbers.join(' ');

    function generateNumbers() {
        const numbers = [];
        for (let i = 0; i <= 99999; i++) {
            numbers.push(i.toString().padStart(5, '0'));
        }
        return numbers;
    }

    function filterNumbers(exclude = false) {
        const inputValues = inputs.map(input => {
            // 将输入值分割成数组并去重
            const values = [...new Set(input.value.split('').map(v => v.trim()).filter(v => v !== '' && !isNaN(v)))];
            return values;
        });
        
        numbers = generateNumbers().filter(num => {
            let match = true;
            for (let i = 0; i < 5; i++) {
                if (inputValues[i].length > 0 && !inputValues[i].includes(num[i])) {
                    match = false;
                    break;
                }
            }
            return exclude ? !match : match;
        });

        result.textContent = numbers.join(' ');
    }

    // 输入验证
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, ''); // 只允许数字
            const uniqueDigits = [...new Set(value.split(''))].join(''); // 去重
            e.target.value = uniqueDigits;
        });
    });

    document.getElementById('filterBtn').addEventListener('click', () => filterNumbers(false));
    document.getElementById('excludeBtn').addEventListener('click', () => filterNumbers(true));
    
    document.getElementById('clearBtn').addEventListener('click', () => {
        inputs.forEach(input => input.value = '');
        result.textContent = '';
    });

    document.getElementById('copyThreeBtn').addEventListener('click', () => {
        // 保持原有复制功能
        const values = inputs.slice(0, 3).map(input => input.value).filter(val => val !== '');
        inputs.slice(0, 3).forEach((input, index) => {
            if (values[index] !== undefined) {
                input.value = values[index];
            }
        });

        // 在新的div中显示前三位列表
        const uniqueFirstThree = [...new Set(numbers.map(num => num.slice(0, 3)))];
        result.textContent = numbers.join(' ');
        resultThree.textContent = uniqueFirstThree.sort().join(' ');
    });

    document.getElementById('copyFourBtn').addEventListener('click', () => {
        // 保持原有复制功能
        const values = inputs.slice(0, 4).map(input => input.value).filter(val => val !== '');
        inputs.slice(0, 4).forEach((input, index) => {
            if (values[index] !== undefined) {
                input.value = values[index];
            }
        });

        // 在新的div中显示前四位列表
        const uniqueFirstFour = [...new Set(numbers.map(num => num.slice(0, 4)))];
        result.textContent = numbers.join(' ');
        resultThree.textContent = uniqueFirstFour.sort().join(' ');
    });

});
