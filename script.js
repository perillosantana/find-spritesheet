function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("No file selected!");
    return;
  }

  if (file.type === "application/json") {
    const reader = new FileReader();

    reader.onload = function (event) {
      const jsonData = event.target.result;

      displayJsonData(jsonData);
    };

    reader.readAsText(file);
  }

  if (file.type === "image/png") {
    const formData = new FormData();
    formData.append("file", file);

    displayImage(file);
  }
}

function displayJsonData(jsonData) {
  try {
    const json = JSON.parse(jsonData);

    // Display JSON data
    const jsonContent = document.getElementById("jsonContent");
    jsonContent.innerText = JSON.stringify(json, null, 2); // Pretty print JSON
  } catch (error) {
    document.getElementById("status").innerText =
      "Error parsing JSON: " + error.message;
  }
}

function displayImage(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    console.log(event.target.result);
    const imageUrl = event.target.result;

    // Create an <img> element and set its src to the uploaded image URL
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.style.width = "auto";

    // Append the image element to the image container
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear previous image, if any
    imageContainer.appendChild(imgElement);
  };

  reader.readAsDataURL(file);
}
