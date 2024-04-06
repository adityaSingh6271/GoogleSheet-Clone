const download = document.getElementById("download");
const upload = document.getElementById("upload");

// Event listener for download button click
download.addEventListener("click", () => {
    // Convert state object to JSON format and create a blob
    const blob = new Blob([JSON.stringify(state)], {type: "application/json"});
    // Create a URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a link element to trigger download
    let link = document.createElement("a");
    link.href = url; // Set URL for download
    link.download = "spreadsheet.json"; // Set filename for download
    link.click(); // Trigger click event on the link to start download
});

// Event listener for file upload
upload.addEventListener("change", (e) => {
    let file = e.target.files[0];
    // Check if uploaded file is of type application/json
    if (file.type !== "application/json") {
        alert("Please upload JSON files only");
        return;
    }
    let fileReader = new FileReader();

    // Event listener for when the file is loaded
    fileReader.onload = function(e) {
        let fileData = JSON.parse(e.target.result);
        console.log(fileData);
        // Process the loaded file data here
    };

    // Read the uploaded file as text
    fileReader.readAsText(file);
});
