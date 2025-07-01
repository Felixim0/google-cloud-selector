chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "reloadPage") {
        window.location.reload();
    }
});

function checkStopConditionsMet(enabled, urlBeforeParameters, selectedAccountNumber) {
    let stopConditionMet = false;

    // Stop if disabled
    if (!enabled) { stopConditionMet = true; }

    // Stop if not on a Google Cloud URL (h)
    const isCorrectURL = urlBeforeParameters.includes('cloud.google.com');
    if (!isCorrectURL) { stopConditionMet = true; }
 
    // Check if an account number has been set
    if (!selectedAccountNumber) { stopConditionMet = true; }

    // If the current url includes "authuser={selectedAccountNumber}" then stop
    if (window.location.href.includes(`authuser=${selectedAccountNumber}`)) { stopConditionMet = true; }

    return stopConditionMet;
}

chrome.storage.local.get(['accountNumber', 'enabledStatus'], function(data) {
    const currentURL = window.location.href;
    const selectedAccountNumber = data.accountNumber;
    const enabled = data.enabledStatus;

    // Split the URL to get the part before query parameters
    const urlBeforeParameters = currentURL.split('?')[0]; // console.cloud.google.com/xyz

    // Check if the stop conditions are met and stop here if they are
    const stopConditionMet = checkStopConditionsMet(enabled, urlBeforeParameters, selectedAccountNumber);
    if (stopConditionMet) { return; } else {
        console.log('Stop conditions not met, continuing...');

        // If no parameters, add a new one specifying current user
        const hasParameters = currentURL.includes('?');
        if (!hasParameters) {
            const newURL = `${currentURL}?authuser=${selectedAccountNumber}`;
            window.location.href = newURL;
        } else {
            // Parameters exist, but might not include the authuser parameter.
            if (currentURL.includes('authuser')) {
                // Authuser is param, change it
                const urlWithUpdatedUser = currentURL.replace(/authuser=\d+/, `authuser=${selectedAccountNumber}`);
                window.location.href = urlWithUpdatedUser;
            } else {
                // Authuser is not a param, but other params exist, so add it
                const urlWithNewParameter = `${currentURL}&authuser=${selectedAccountNumber}`;
                window.location.href = urlWithNewParameter;
            }
        }
    }
});


