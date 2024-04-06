const downloadBtn = document.getElementById("download");
const upload = document.getElementById("upload");

// Sample user data to export
let user = {
    name: "Aditya",
    age: 24,
    rollno: 52,
};

// Event listener for download button click
downloadBtn.addEventListener("click", () => {
    // Convert user data to JSON format
    const data = JSON.stringify(user);

    // Create a blob containing the data
    let blob = new Blob([data], {type: "text/plain"});

    // Generate a URL for the blob
    let downloadURL =  URL.createObjectURL(blob);

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.download = "temp.txt"; // Set filename for download
    link.href = downloadURL; // Set URL for download
    link.click(); // Trigger click event on the link to start download
});

// Event listener for file upload
upload.addEventListener("change", () => {
    let file = upload.files[0];

    // Check if uploaded file is a text/plain type
    if (file.type === "text/plain") {
        let fileReader = new FileReader();

        // Event listener for when the file is loaded
        fileReader.onload = function(event) {
            console.log("Loaded the file");
            console.log(event);
            // Process the loaded file data here
        };

        // Read the uploaded file as text
        fileReader.readAsText(file);
    } else {
        alert("Please upload a txt file");
    }
});
