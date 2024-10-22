import { src, dest } from 'gulp' // 'src' defines the source files, 'dest' specifies where the output files will be saved
import * as darrSass from 'sass' // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass' // Import the Gulp plugin to compile Sass files

const sass = gulpSass(darrSass) // Use 'gulp-sass' and pass the Dart Sass implementation

export function css(done) {
  src('src/scss/app.scss')//where locate is
    .pipe( sass())// copiled sass
    .pipe( dest('build/css'))// Save the compiled CSS file in the 'build/css' folder
    
  done() // Callback function to signal Gulp that the task is complete

}