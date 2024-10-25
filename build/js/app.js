//

document.addEventListener('DOMContentLoaded', function () {
  makeGalery()
});

function makeGalery() {

  const amount_img = 16;
  const gelery = document.querySelector('.img-galery')

  for (let img = 1; img <= amount_img; img++) {

    const image = document.createElement('IMG');

    image.src = `src/img/gallery/full/${img}.jpg`
    image.alt = 'Image Galery'
    
    galery.appendChild(image)   

  }
};