document.addEventListener('DOMContentLoaded', function() {
    const accountNumberInput = document.getElementById('accountNumber');
    const enterButton = document.querySelector('#enterButton');

    // Function to handle saving the account number
    function saveAccountNumber() {
        const selectedAccountNumber = accountNumberInput.value;
        console.log('Selected Account Number:', selectedAccountNumber);

        // Store the selected account number in chrome storage
        chrome.storage.local.set({'accountNumber': selectedAccountNumber}, function() {
            console.log('Account number saved:', selectedAccountNumber);
        });

        window.close();
    }

    // Add click event listener to the button
    enterButton.addEventListener('click', saveAccountNumber);

    // Add keypress event listener to the input field
    accountNumberInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveAccountNumber();
        }
    });
});
