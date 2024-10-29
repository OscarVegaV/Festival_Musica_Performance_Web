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

  //Creating Image for modal
  const image = document.createElement('IMG'); // Create an IMG element
  image.src = `src/img/gallery/full/${img}.jpg`; // Set the source path for each image
  image.alt = 'Image Gallery'; // Alt text for accessibility
  
  
  // Creating Modal
  const modal = document.createElement('DIV');
  modal.classList.add('modal');// Add the modal class for styling
  modal.onclick = killModal; // Set up the click event to close the modal

   //button
   const killModalButton = document.createElement('BUTTON')
   killModalButton.textContent = 'X'; // Add text 'X' for closing the modal
   killModalButton.classList.add('button-kill') // Add class for button styling
   killModalButton.onclick = killModalButton; // Set up button click event to close modal


  modal.appendChild(image); // Add image to the modal
  modal.appendChild(killModalButton); // Add close button to the modal



  // Add modal to the DOM
  const body = document.querySelector('body');  
  body.classList.add('overflow-hidden');// Prevent background scrolling
  body.appendChild(modal);
  
}

// Function to remove the modal from the DOM
function killModal() {
  
  const modal = document.querySelector('.modal');// Select the modal element

  modal.classList.add('fade-out'); // Add fade-out animation class
  //
  setTimeout(() => {
    
    modal?.remove();// Remove the modal if it exists

    const body = document.querySelector('body');    
    body.classList.remove('overflow-hidden'); // Re-enable background scrolling
  }, 500);
}
