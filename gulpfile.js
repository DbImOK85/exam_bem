/**
 * Created by dbimok on 08.10.15.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


var path = {
    build:{
        css: './'
    }, //складываем собранные файлы
    src: {
        styleMobile: 'mobile.blocks/**/**/*.css',
        styleTablet: 'tablet.blocks/**/**/*.css',
        styleDesktop: 'desktop.blocks/**/**/*.css'
    }, //Берем все файлы с расширением css для сборки
    watch:{
            watchMobile:'/mobile.blocks/**/**/*.css',
            watchTablet:'/desktop.blocks/**/**/*.css',
            watchDesktop:'/tablet.blocks/**/**/*.css'
    }//Наблюдаем за изменениями файлов с расширением css

};

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 8080,
    logPrefix: "Frontend_DbImOK"
};

gulp.task('css:build',function(){
    gulp.src(path.src.styleMobile)
        .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
        }))
        .pipe(concat('mobile.css'))
        .pipe(gulp.dest(path.build.css));

    gulp.src(path.src.styleTablet)
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('tablet.css'))
        .pipe(gulp.dest(path.build.css));

    gulp.src(path.src.styleDesktop)
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('desktop.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});



gulp.task('watch', function(){
    watch([path.watch.watchMobile], function(event, cb){
        gulp.start('css:build');
    });
    watch([path.watch.watchTablet], function(event, cb){
        gulp.start('css:build');
    });
    watch([path.watch.watchDesktop], function(event, cb){
        gulp.start('css:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default',['css:build','webserver','watch']);




