document.addEventListener('DOMContentLoaded', function() {
    const accountNumberInput = document.querySelector('#accountNumber');
    const enterButton = document.querySelector('#enterButton');

    // Automatically focus on the input box when the popup opens
    accountNumberInput.focus();

    // Function to handle saving the account number
    function saveAccountNumber() {
        const selectedAccountNumber = accountNumberInput.value;
        console.log('Selected Account Number:', selectedAccountNumber);

        // Store the selected account number in chrome storage
        chrome.storage.local.set({'accountNumber': selectedAccountNumber}, function() {
            console.log('Account number saved:', selectedAccountNumber);
        });

        // Send message to content script to reload the page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "reloadPage"});
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
