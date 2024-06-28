document.addEventListener('DOMContentLoaded', () => {
    const fieldsContainer = document.getElementById('fields-container');
    const addFieldButton = document.getElementById('add-field');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    addFieldButton.addEventListener('click', addField);
    calculateButton.addEventListener('click', calculateValues);

    fieldsContainer.addEventListener('input', calculateValues);

    function addField() {
        const newField = document.createElement('input');
        newField.type = 'text';
        newField.classList.add('number-input');
        fieldsContainer.appendChild(newField);
    }

    function calculateValues() {
        const inputs = document.querySelectorAll('.number-input');
        let values = [];

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                values.push(value);
            }
        });

        if (values.length > 0) {
            const sum = values.reduce((acc, val) => acc + val, 0);
            const avg = sum / values.length;
            const min = Math.min(...values);
            const max = Math.max(...values);

            resultDiv.innerHTML = `
                <p>Suma: ${sum}</p>
                <p>Średnia: ${avg}</p>
                <p>Min: ${min}</p>
                <p>Max: ${max}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>Wprowadź poprawne liczby.</p>';
        }
    }
});
