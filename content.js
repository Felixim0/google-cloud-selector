chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "reloadPage") {
        window.location.reload();
    }
});

chrome.storage.local.get('accountNumber', function(data) {
    const currentURL = window.location.href;
    const selectedAccountNumber = data.accountNumber;

    // Check if an account number has been set
    if (!selectedAccountNumber) {
        console.log('No account number set. Doing nothing.');
        return; // Exit the function if no account number is set
    }

    if (currentURL.includes("authuser=") && !currentURL.includes(`authuser=${selectedAccountNumber}`)) {
        // Replace "authuser=XX" with the selected account number
        const urlWithUpdatedUser = currentURL.replace(/authuser=\d+/, `authuser=${selectedAccountNumber}`);
        window.location.href = urlWithUpdatedUser; 
    }
});


