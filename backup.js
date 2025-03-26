function backupLocalStorage() {
  const localStorageData = {};
  let hasData = false;

  // Iterate through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      localStorageData[key] = JSON.parse(localStorage.getItem(key)); // Attempt to parse as JSON
    } catch (e) {
      localStorageData[key] = localStorage.getItem(key); // If not JSON, store as string
    }
    hasData = true; // Set flag to true if any data is found.
  }

  if (hasData) {
    const jsonData = JSON.stringify(localStorageData, null, 2); // Pretty-print the JSON

    // Create a download link for the JSON file
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorageBackup.json"; // Set the filename
    document.body.appendChild(a); // Append to the body (necessary for Firefox)
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the link after download
    URL.revokeObjectURL(url); // Release the object URL
  }
}

// Calculate milliseconds for 24 hours
const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

// Check localStorage every 24 hours
setInterval(backupLocalStorage, millisecondsIn24Hours);