// Wait until the entire document is loaded before executing functions
document.addEventListener('DOMContentLoaded', function () {
  stickyNavigation();
  makeGalery(); // Call function to create and display the gallery images
  highlightLink();

});

//doesn't work
function stickyNavigation() {
  const header = document.querySelector('.header')
  const aboutFestival = document.querySelector('.about-festival')

  ///doesn't work
  document.addEventListener('scroll', function () {
    // Check if the bottom of the aboutFestival element is less than 1 pixel from the top of the viewport
    if (aboutFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add('fixed')
    } else {
      header.classList.remove('fixed')
    }  
  })
}

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

// Function to highlight the current navigation link based on scroll position
function highlightLink() {

  // Add scroll event listener to the document to detect scrolling
  document.addEventListener ('scroll', function() {

    // Select all sections in the document and all navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    let current = ''; // Variable to store the id of the section currently in view

    // Loop through each section to check if it's currently in view
    sections.forEach(section => {

      const sectionTop = section.offsetTop; // Distance of section from top of the page
      const sectionHeight = section.clientHeight; // Height of the section

      
      // Check if the section is in the viewport (with a threshold of one-third of its height)
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.id;// Set the current section's id
      } 

    })

    // Loop through all navigation links
    navLinks.forEach(link => {
      link.classList.remove('active'); // Remove 'active' class from all links

      // Add 'active' class to the link that corresponds to the current section in view
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active')
      }
    })

  })

}
