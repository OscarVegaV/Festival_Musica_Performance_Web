import { src, dest, watch } from 'gulp' // 'src' defines the source files, 'dest' specifies where the output files will be saved
import * as darkSass from 'sass' // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass' // Import the Gulp plugin to compile Sass files

const sass = gulpSass(darkSass) // Use 'gulp-sass' and pass the Dart Sass implementation

// Compiling Sass files from the 'src/scss' directory and outputting the result as CSS to the 'build/css' directory

export function css(done) {
  src('src/scss/app.scss')//where locate is
    .pipe( sass())// copiled sass
    .pipe( dest('build/css'))// Save the compiled CSS file in the 'build/css' folder
    
  done() // Callback function to signal Gulp that the task is complete

}

// this is useful for 
export function dev() {
  watch('src/scss/app.scss', css)
}