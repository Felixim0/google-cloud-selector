chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "reloadPage") {
        window.location.reload();
    }
});

chrome.storage.local.get(['accountNumber', 'enabledStatus'], function(data) {
    const currentURL = window.location.href;
    const selectedAccountNumber = data.accountNumber;
    const enabled = data.enabledStatus;

    // Split the URL to get the part before query parameters
    const urlBeforeParameters = currentURL.split('?')[0];

    // Check if the URL contains 'google' and 'cloud' before the query parameters
    const isCorrectURL = urlBeforeParameters.includes('google') && urlBeforeParameters.includes('cloud');

    // Only if toggled on and the URL contains 'google' and 'cloud'
    if (enabled && isCorrectURL) {
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
    }
});


