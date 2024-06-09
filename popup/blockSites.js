// Get the variables
const websiteInput = document.getElementById("field");
const blockBtn = document.querySelector(".add-btn");
const websiteList = document.querySelector(".task-items");

// Load the blocked websites from storage
chrome.storage.local.get('blockedWebsites', function(data) {
    const blockedWebsites = data.blockedWebsites || [];
    // Populate the list of blocked websites
    blockedWebsites.forEach(function(websiteName) {
        const newLi = createWebsiteListItem(websiteName);
        websiteList.appendChild(newLi);
    });
});

// Function to create a list item for a blocked website
function createWebsiteListItem(websiteName) {
    const newLi = document.createElement("li");
    newLi.className = "task";
    const displayInput = document.createElement("input");
    displayInput.type = "text";
    displayInput.className = "displayInput";
    displayInput.disabled = true;
    displayInput.value = websiteName;
    newLi.appendChild(displayInput);
    const unblockBtn = document.createElement("button");
    unblockBtn.innerText = "Unblock";
    unblockBtn.className = "unblockBtn";
    newLi.appendChild(unblockBtn);
    return newLi;
}

// Check if button is clicked
blockBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (websiteInput.value !== "") {
        const websiteName = websiteInput.value.trim();
        const newLi = createWebsiteListItem(websiteName);
        websiteList.appendChild(newLi);
        websiteInput.value = "";
        // Save the updated list of blocked websites to storage
        chrome.storage.local.get('blockedWebsites', function(data) {
            const blockedWebsites = data.blockedWebsites || [];
            blockedWebsites.push(websiteName);
            chrome.storage.local.set({ 'blockedWebsites': blockedWebsites });
        });
    }
});

// Unblocking a website
websiteList.addEventListener('click', (e) => {
    if (e.target.classList.contains('unblockBtn')) {
        const listItem = e.target.closest('.task');
        const websiteName = listItem.querySelector('.displayInput').value;
        listItem.remove();
        chrome.storage.local.get('blockedWebsites', function(data) {
            const blockedWebsites = data.blockedWebsites || [];
            const updatedBlockedWebsites = blockedWebsites.filter(name => name !== websiteName);
            chrome.storage.local.set({ 'blockedWebsites': updatedBlockedWebsites });
        });
    }
});
