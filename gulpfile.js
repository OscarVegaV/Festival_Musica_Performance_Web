import { src, dest, watch } from 'gulp'; // 'src' defines the source files, 'dest' specifies the output
import * as dartSass from 'sass'; // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass'; // Import Gulp plugin to compile Sass files

const sass = gulpSass(dartSass); // Use 'gulp-sass' and pass Dart Sass

// Compile Sass files from 'src/scss' and output them to 'build/css'
export function css(done) {
  src('src/scss/app.scss', {sourcemaps: true} ) // Define the source location of the main Sass file
    .pipe(sass().on('error', sass.logError)) // Compile Sass and log any errors that occur
    .pipe(dest('build/css', {sourcemaps: true} )); // Output the compiled CSS to 'build/css' and generate sourcemaps
  
  done(); // Signal that the task is complete
}

// Watch all Sass files in 'src/scss' for changes and recompile them when modified
export function dev() {
  watch('src/scss/**/*.scss', css); // Monitor all .scss files in the src/scss directory
}
