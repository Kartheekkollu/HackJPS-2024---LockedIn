const crazyGlueImage = document.getElementById("crazyGlue");
const stringsImage = document.getElementById("strings");
const morningBirdsImage = document.getElementById("morningBirds");
const windImage = document.getElementById("wind");
const stormImage = document.getElementById("storm");
const waterfallImage = document.getElementById("waterfall");

// Hide all bottom bars initially
document.querySelectorAll(".bottom-bar").forEach(bar => {
    bar.style.display = "none";
});

// Function to toggle bottom bar visibility
function toggleBottomBar(bottomBar) {
    // Get all bottom bars
    const allBottomBars = document.querySelectorAll(".bottom-bar");

    // Hide all bottom bars except the clicked one
    allBottomBars.forEach(bar => {
        if (bar !== bottomBar) {
            bar.style.display = "none";
            // Pause the audio playback
            const audioElement = bar.querySelector("audio");
            if (audioElement) {
                audioElement.pause();
            }
        }
    });

    // Toggle the display of the clicked bottom bar
    bottomBar.style.display = bottomBar.style.display === "none" ? "flex" : "none";

    // If the bottom bar is being displayed, set a high z-index
    if (bottomBar.style.display === "flex") {
        bottomBar.style.zIndex = "9999";
    }
}

// Event listeners for image clicks
crazyGlueImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("crazyGlueAudio");
    toggleBottomBar(bottomBar);
});

stringsImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("stringsAudio");
    toggleBottomBar(bottomBar);
});

morningBirdsImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("morningBirdsAudio");
    toggleBottomBar(bottomBar);
});

windImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("windAudio");
    toggleBottomBar(bottomBar);
});

stormImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("stormAudio");
    toggleBottomBar(bottomBar);
});

waterfallImage.addEventListener('click', () => {
    const bottomBar = document.getElementById("waterfallAudio");
    toggleBottomBar(bottomBar);
});

// Function to save uploaded audio files to Chrome storage
function saveUploadedAudioToChromeStorage(files) {
    const audioList = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        audioList.push(file.name); // Store the file name or any identifier you prefer
    }
    chrome.storage.local.set({ 'uploadedAudio': audioList }, () => {
        console.log('Uploaded audio saved to Chrome storage');
    });
}

// Function to retrieve uploaded audio files from Chrome storage
function getUploadedAudioFromChromeStorage(callback) {
    chrome.storage.local.get('uploadedAudio', (result) => {
        const audioList = result['uploadedAudio'] || [];
        callback(audioList);
    });
}

// Event listener for clicking the upload button
uploadBtn.addEventListener('click', () => {
    fileInput.click(); // Trigger click on file input
});


// Event listener for file input change
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    uploadedAudioContainer.innerHTML = '';
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (event) => {
                const audioSrc = event.target.result;
                const newAudio = document.createElement('audio');
                newAudio.controls = true;
                newAudio.src = audioSrc;
                uploadedAudioContainer.appendChild(newAudio);
            };
            reader.readAsDataURL(file);
        }
        uploadedAudioContainer.style.display = "flex";
        // Save uploaded audio to Chrome storage
        saveUploadedAudioToChromeStorage(files);
    }
});

// Retrieve uploaded audio from Chrome storage on page load
window.addEventListener('load', () => {
    getUploadedAudioFromChromeStorage((uploadedAudioList) => {
        // Do something with the retrieved audio list if needed
    });
});