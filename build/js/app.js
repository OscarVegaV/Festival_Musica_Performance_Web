// Wait until the entire document is loaded before executing functions
document.addEventListener('DOMContentLoaded', function () {
  makeGalery(); // Call function to create and display the gallery images
});

// Function to dynamically create an image gallery
function makeGalery() {
  const amount_img = 16; // Total number of images to display
  const gallery = document.querySelector('.galery-img'); // Select the gallery container

  // Loop through each image and add it to the gallery
  for (let img = 1; img <= amount_img; img++) {
    const image = document.createElement('IMG'); // Create an IMG element

    image.src = `src/img/gallery/full/${img}.jpg`; // Set the source path for each image
    image.alt = 'Image Gallery'; // Alt text for accessibility

    // Event handler to display the image in a modal
    image.onclick = function () {
      displayImg(img);
    };

    
    gallery.appendChild(image); // Append the image to the gallery container
  }
};

// ** Function to display the clicked image in a modal **
function displayImg(img) {
  
  // Creating Modal
  const modal = document.createElement('DIV');
modal.classList.add('modal');// Add the modal class for styling
modal.onclick = killModal; // Set up the click event to close the modal


  // Add modal to the DOM
  const body = document.querySelector('body');
//
body.appendChild(modal)
}

// Function to remove the modal from the DOM
function killModal() {
  
  const modal = document.querySelector('.modal');// Select the modal element
  //
  modal?.remove();// Remove the modal if it exists
}
