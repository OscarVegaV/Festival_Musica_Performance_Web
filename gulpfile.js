import { src, dest, watch, series } from 'gulp'; // 'src' defines the source files, 'dest' specifies the output 'series' take diferents exports 
import * as dartSass from 'sass'; // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass'; // Import Gulp plugin to compile Sass files

const sass = gulpSass(dartSass); // Use 'gulp-sass' and pass Dart Sass

// Import terser dependency for JavaScript minification
import terser from 'gulp-terser';

// Define a task to copy and minify JavaScript files from 'src/js' to 'build/js'
export function js(done) {

  src( 'src/js/app.js') // Define the source location of the JavaScript file
    .pipe (terser()) // Minify the JavaScript file using terser
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

// Watch all Sass files in 'src/scss' for changes and recompile them when modified
export function dev() {
  watch('src/scss/**/*.scss', css); // Monitor all .scss files in the src/scss directory
  watch('src/js/**/*.js', js); // Monitor all .scss files in the src/scss directory
}

// Define the default task to run the JavaScript and Sass tasks, and start the watcher
export default series( js, css, dev);// Initialize these tasks in series