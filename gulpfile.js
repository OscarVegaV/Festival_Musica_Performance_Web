// Importing necessary modules
import path from 'path'; // Module for handling and transforming file paths
import fs from 'fs'; // File system module to interact with the file system
import { glob } from 'glob'; // Module for matching files using glob patterns 


import { src, dest, watch, series } from 'gulp'; // 'src' defines the source files, 'dest' specifies the output 'series' take diferents exports 
import * as dartSass from 'sass'; // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass'; // Import Gulp plugin to compile Sass files

const sass = gulpSass(dartSass); // Use 'gulp-sass' and pass Dart Sass

// Import terser dependency for JavaScript minification
import terser from 'gulp-terser'; 
import sharp from 'sharp';// Importing Sharp library for image processing

// Define a task to copy and minify JavaScript files from 'src/js' to 'build/js'
export function js(done) {

  src( 'src/js/app.js') // Define the source location of the JavaScript file
    .pipe (terser()) // Minify the JavaScript file using terser**********     
    .pipe ( dest('build/js')) // Output the JavaScript file to 'build/js'

  done(); // Signal that the task is complete
}

// Compile Sass files from 'src/scss' and output them to 'build/css'
export function css(done) {
  src('src/scss/app.scss', {sourcemaps: true} ) // Define the source location of the main Sass file
    .pipe(sass({
      outputStyle: 'compressed'  // Set the output style to compressed for smaller file size
    }).on('error', sass.logError)) // Compile Sass and log any errors that occur
    .pipe(dest('build/css', {sourcemaps: true} )); // Output the compiled CSS to 'build/css' and generate sourcemaps
  
  done(); // Signal that the task is complete
}

// Function to crop images for thumbnail creation
export async function crop(done) {
  const inputFolder = 'src/img/gallery/full'; // Directory of original images
  const outputFolder = 'src/img/gallery/thumb'; //  Directory to save thumbnails
  const width = 250;// Width of the thumbnail
  const height = 180; // Height of the thumbnail

  // Check if output folder exists, if not, create it
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });  // Create output folder
  }

    // Read files from the input folder and filter for jpg images
  const images = fs.readdirSync(inputFolder).filter(file => {
      return /\.(jpg)$/i.test(path.extname(file)); // Only include .jpg files
  });
  try {
      // Process each image to create a thumbnail
      images.forEach(file => {
          const inputFile = path.join(inputFolder, file); // Full path of the input file
          const outputFile = path.join(outputFolder, file); // Full path of the output file
          
          // Use Sharp to resize the image and save it as a thumbnail
          sharp(inputFile) 
              .resize(width, height, {
                  position: 'centre' 
              })// Center the image when resizing
              .toFile(outputFile)
      });// Save the resized image

      done();// Signal that the task is complete
  } catch (error) {
      console.log(error);// Log any errors that occur during processing
  }
}

// Function to process and copy images to the build directory
export async function images(done) {
  const srcDir = './src/img'; // Source directory for images
  const buildDir = './build/img'; // Build directory for processed images
  const img = await glob('./src/img/**/*{jpg,png}'); // Get all jpg and png images

    // Loop through each image file to process
  img.forEach(file => {
      const relativePath = path.relative(srcDir, path.dirname(file));// Get the relative path
      const outputSubDir = path.join(buildDir, relativePath); // Determine the output directory for the image
      processImages(file, outputSubDir);// Call the function to process the image
  });
  done();// Signal that the task is complete
}
// Function to process individual image files
function processImages(file, outputSubDir) {
    // Check if output subdirectory exists, if not, create it
  if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true });// Create the subdirectory
  }
  const baseName = path.basename(file, path.extname(file)); // Get the base name without the extension
  const extName = path.extname(file)
  const outputFile = path.join(outputSubDir, `${baseName}${extName}`);// Full path for output file
  const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`); // Full path for WebP output
  const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);// Full path for AVIF output

  const options = { quality: 80 }; // Set image quality for conversion
  // Use Sharp to process images in different formats
  sharp(file).jpeg(options).toFile(outputFile);// Convert to JPEG
  sharp(file).webp(options).toFile(outputFileWebp); // Convert to WebP
  sharp(file).avif().toFile(outputFileAvif); // Convert to AVIF
}


// Watch all Sass files in 'src/scss' for changes and recompile them when modified
export function dev() {
  watch('src/scss/**/*.scss', css); // Monitor all .scss files in the src/scss directory
  watch('src/js/**/*.js', js); // Monitor all .scss files in the src/scss directory
  watch('src/img/**/*.{png,jpg}', images); // Monitor all .
}

// Define the default task to run the JavaScript and Sass tasks, and start the watcher
export default series( crop, js, css, images, dev);// Initialize these tasks in series