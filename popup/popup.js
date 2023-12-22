document.addEventListener('DOMContentLoaded', function() {
    const accountNumberInput = document.querySelector('#accountNumber');
    const enterButton = document.querySelector('#enterButton');
    const checkBox = document.querySelector('.toggle-input');
    const checkBoxLabel = document.querySelector('#enabledLabel');

    // Automatically focus on the input box when the popup opens
    accountNumberInput.focus();

    // Set the toggle to whatever the enabledStatus is
    chrome.storage.local.get({'enabledStatus': false}, function(result) {
      checkBox.checked = result.enabledStatus;
      if (result.enabledStatus === false) {
        checkBoxLabel.textContent = 'Disabled';
      }
    });

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

    function saveEnabledStatus() {
        const enabledStatus = checkBox.checked; // Assuming 'checkBox' is the checkbox element

        // Store the enabled status in chrome storage
        chrome.storage.local.set({'enabledStatus': enabledStatus}, function() {
            console.log('Enabled status saved:', enabledStatus);
        });
    }

    // Handle Toggle for App Functionality
    checkBox.addEventListener('change', function () {
        if (checkBox.checked) {
            saveEnabledStatus();
            checkBoxLabel.textContent = 'Enabled';
        } else {
            saveEnabledStatus();
            checkBoxLabel.textContent = 'Disabled';
        }
    });

    // Add click event listener to the button
    enterButton.addEventListener('click', saveAccountNumber);

    // Add keypress event listener to the input field
    accountNumberInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveAccountNumber();
        }
    });
});
