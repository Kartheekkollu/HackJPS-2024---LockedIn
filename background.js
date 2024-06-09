let hydrateIntervalId;
let postureIntervalId;
let eyesIntervalId;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "startHydrationNotifications") {
        // Start creating notifications every 5 minutes
        createHydrateNotification();
        hydrateIntervalId = setInterval(() => {
            createHydrateNotification();
        }, 900000); // 15 minutes in milliseconds
    } else if (message.action === "stopHydrationNotifications") {
        // If the message is to stop notifications, clear the interval
        clearInterval(hydrateIntervalId);
    } else if (message.action === "startPostureNotifications") {
        // Start creating notifications every 5 minutes
        createPostureNotification();
        postureIntervalId = setInterval(() => {
            createPostureNotification();
        }, 2700000); // 45 minutes in milliseconds
    } else if (message.action === "stopPostureNotifications") {
        // If the message is to stop notifications, clear the interval
        clearInterval(postureIntervalId);
    } else if (message.action === "startEyesNotifications") {
        // Start creating notifications every 5 minutes
        createEyesNotification();
        eyesIntervalId = setInterval(() => {
            createEyesNotification();
        }, 1200000); // 20 minutes in milliseconds
    } else if (message.action === "stopEyesNotifications") {
        // If the message is to stop notifications, clear the interval
        clearInterval(eyesIntervalId);
  }
});

function createHydrateNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'Images/LockedIn - Icon.png',
        title: 'Stay Hydrated!',
        message: 'Remember to drink some water.',
        requireInteraction: true
    });
}

function createPostureNotification() {
  chrome.notifications.create({
      type: 'basic',
      iconUrl: 'Images/LockedIn - Icon.png',
      title: 'Check your posture!',
      message: 'Sit up straight for better comfort and health.',
      requireInteraction: true
  });
}

function createEyesNotification() {
  chrome.notifications.create({
      type: 'basic',
      iconUrl: 'Images/LockedIn - Icon.png',
      title: 'Refresh your eyes!',
      message: 'Look away from your screen and blink a few times to give your eyes a rest.',
      requireInteraction: true
  });
}