// Load the blocked websites from storage
chrome.storage.local.get('blockedWebsites', function(data) {
    const blockedWebsites = data.blockedWebsites || [];
    // Check if current website is blocked
    const isBlocked = blockedWebsites.some(website => window.location.href.includes(website));
    if (isBlocked) {
        // Insert block message
        document.body.innerHTML = generateHTML(blockedWebsites);
    }
});

const generateHTML = (blockedWebsites) => {
    // Generate block message for each blocked website
    const blockMessages = blockedWebsites.map(website => `
        <div style="background-color: #f44336; color: #fff; padding: 10px; border-radius: 5px; margin-top: 20%; margin-left: 5%; margin-right: 5%; text-align: center; font-size: 5vw">
            <strong>${website}</strong> has been blocked.
        </div>
    `);
    // Concatenate block messages
    return blockMessages.join('');
};