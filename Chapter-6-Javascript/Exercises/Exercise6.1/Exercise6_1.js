document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const petrolCostInput = document.getElementById('petrolCost');
    const litersInput = document.getElementById('liters');
    const billsInput = document.getElementById('bills');
    const receipt = document.getElementById('receipt');
    const resultDisplay = document.getElementById('result');
    const billsInsertedDisplay = document.getElementById('billsInserted');
    const changeDisplay = document.getElementById('change');

    calculateBtn.addEventListener('click', function() {
        const petrolCost = parseFloat(petrolCostInput.value);
        const liters = parseFloat(litersInput.value);
        const totalCost = petrolCost * liters;
        const billsInserted = parseFloat(billsInput.value);
        const change = billsInserted - totalCost;

        resultDisplay.textContent = `AED ${totalCost.toFixed(2)}`;
        billsInsertedDisplay.textContent = `AED ${billsInserted.toFixed(2)}`;
        changeDisplay.textContent = `AED ${change.toFixed(2)}`;

        receipt.classList.remove('hidden');
    });
});
