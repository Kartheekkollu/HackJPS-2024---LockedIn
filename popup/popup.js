document.addEventListener('DOMContentLoaded', function() {
    const hydrationToggle = document.getElementById('hydrationToggle');
    const postureToggle = document.getElementById('postureToggle');
    const eyesToggle = document.getElementById('eyesToggle');

    //Hydration
    chrome.storage.local.get('hydrationToggleChecked', function(data) {
        if (data.hydrationToggleChecked) {
            hydrationToggle.checked = true;
        }
    });

    hydrationToggle.addEventListener('click', function() {
        chrome.storage.local.set({ 'hydrationToggleChecked': this.checked });
        if (this.checked) {
            chrome.runtime.sendMessage({ action: "startHydrationNotifications"});
        } else {
            chrome.runtime.sendMessage({ action: "stopHydrationNotifications"});
        }
    });

    //Posture
    chrome.storage.local.get('postureToggleChecked', function(data) {
        if (data.postureToggleChecked) {
            postureToggle.checked = true;
        }
    });

    postureToggle.addEventListener('click', function() {
        chrome.storage.local.set({ 'postureToggleChecked': this.checked });
        if (this.checked) {
            chrome.runtime.sendMessage({ action: "startPostureNotifications"});
        } else {
            chrome.runtime.sendMessage({ action: "stopPostureNotifications"});
        }
    });

    //Eyes
    chrome.storage.local.get('eyesToggleChecked', function(data) {
        if (data.eyesToggleChecked) {
            eyesToggle.checked = true;
        }
    });

    eyesToggle.addEventListener('click', function() {
        chrome.storage.local.set({'eyesToggleChecked': this.checked });
        if (this.checked) {
            chrome.runtime.sendMessage({ action: "startEyesNotifications"});
        } else {
            chrome.runtime.sendMessage({ action: "stopEyesNotifications"});
        }
    });
});
