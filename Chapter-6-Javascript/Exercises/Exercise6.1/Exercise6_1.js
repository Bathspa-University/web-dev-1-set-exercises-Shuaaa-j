document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const petrolCostInput = document.getElementById('petrolCost');
    const litersInput = document.getElementById('liters');
    const totalCostDisplay = document.getElementById('totalCost');
    const resultDisplay = document.getElementById('result');

    calculateBtn.addEventListener('click', function() {
        const petrolCost = parseFloat(petrolCostInput.value);
        const liters = parseFloat(litersInput.value);
        const totalCost = petrolCost * liters;

        resultDisplay.textContent = `AED${totalCost.toFixed(2)}`;

        totalCostDisplay.classList.remove('hidden');
    });
});
