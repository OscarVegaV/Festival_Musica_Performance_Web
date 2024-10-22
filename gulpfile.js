import { src, dest, watch } from 'gulp'; // 'src' defines the source files, 'dest' specifies the output
import * as dartSass from 'sass'; // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass'; // Import Gulp plugin to compile Sass files

const sass = gulpSass(dartSass); // Use 'gulp-sass' and pass Dart Sass

// Compile Sass files from 'src/scss' and output them to 'build/css'
export function css(done) {
  src('src/scss/app.scss') // Source location of Sass file
    .pipe(sass().on('error', sass.logError)) // Compile Sass and log errors
    .pipe(dest('build/css')); // Output to 'build/css'
  
  done(); // Signal that the task is done
}

// Watch all Sass files in 'src/scss' for changes and recompile
export function dev() {
  watch('src/scss/**/*.scss', css); // Watch all .scss files
}
