document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const calculateBtn = document.getElementById('calculateBtn');
    const petrolCostInput = document.getElementById('petrolCost');
    const litersInput = document.getElementById('liters');
    const billsInput = document.getElementById('bills');
    const receipt = document.getElementById('receipt');
    const resultDisplay = document.getElementById('result');
    const billsInsertedDisplay = document.getElementById('billsInserted');
    const changeDisplay = document.getElementById('change');
    const errorDisplay = document.getElementById('errorDisplay');

    // Event listener for the calculate button
    calculateBtn.addEventListener('click', function() {
        // Parse input values to numbers
        const petrolCost = parseFloat(petrolCostInput.value);
        const liters = parseFloat(litersInput.value);
        const totalCost = petrolCost * liters;
        const billsInserted = parseFloat(billsInput.value);
        const change = billsInserted - totalCost;

        // Check if bills inserted are less than total cost
        if (billsInserted < totalCost) {
            // Display error message if not enough money inserted
            errorDisplay.textContent = "Invalid amount. Please insert enough money.";
            receipt.classList.add('hidden'); // Hide receipt display
        } else {
            // Calculate and display receipt
            errorDisplay.textContent = ""; // Clear error message
            resultDisplay.textContent = `AED ${totalCost.toFixed(2)}`; // Display total cost
            billsInsertedDisplay.textContent = `AED ${billsInserted.toFixed(2)}`; // Display bills inserted
            changeDisplay.textContent = `AED ${change.toFixed(2)}`; // Display change
            receipt.classList.remove('hidden'); // Show receipt display
        }
    });
});
