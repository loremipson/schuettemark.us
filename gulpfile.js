var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var sync = require('browser-sync');

var sources = {
    html: './_src/markup/**/*.html',
    sass: './_src/scss/**/*.scss'
};

var dest = './build/';


gulp.task('html', function(){
    return gulp.src(sources.html)
      .pipe($.frontMatter({
        property: 'data'
      }))
      .pipe($.hb({
        bustCache: true,
        debug: true,
        data: './_src/markup/_data/**/*.{js,json}',
        helpers: './node_modules/handlebars-layouts',
        partials: [
            './_src/markup/_layouts/**/*.hbs',
            './_src/markup/_partials/**/*.hbs',
        ],
        parseDataName: function(file){
            return path.basename(file.shortpath)
        },
        parsePartialName: function(file){
            return path.basename(file.shortpath)
        },
        parseHelperName: function(file){
            return path.basename(file.shortpath)
        },
      }))
      // Write error function
      .on('error', console.log(err))
      .pipe(gulp.dest(dest))
      .pipe(sync.reload({stream: true}));
});

gulp.task('sass', function() {
    return gulp.src(sources.sass)
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.cssnano())
        .pipe($.concat('custom.css'))
        .pipe(gulp.dest(dest))
        .pipe(sync.reload({stream: true}));
});

