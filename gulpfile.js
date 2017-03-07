/**
 * Created by k186 on 2016/6/24.
 * install gulp command
 *
 * npm install --save-dev gulp gulp-minify-html gulp-processhtml gulp-htmlhint gulp-concat gulp-uglify gulp-rename gulp-minify-css path gulp-clean gulp-rev gulp-imagemin
 * 
 * gulp
 * gulp-processhtml        html构建的时候替换压缩后的css和js
 * gulp-htmlhint           html校验
 * gulp-minify-html        html压缩
 * gulp-concat             文件合并
 * gulp-uglify             混淆
 * gulp-rename             重命名
 * gulp-sass               sass文件
 * gulp-less               less文件
 * gulp-minify-css /gulp-clean-css         css压缩
 * path                    必须安装
 * gulp-clean              删除目录(构建前自动删除以前构建结果)
 * gulp-rev                自动版本
 * gulp-imagemin           图片压缩
 * gulp-jshint             JS校验
 *
 * npm init
 * 
 * run gulp command
 *
 * gulp
 */
var gulp = require('gulp'),
    processHtml = require('gulp-processhtml'),
    htmlhint = require('gulp-htmlhint'),
    htmlmin = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    path = require('path'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    imgmin = require('gulp-imagemin');

//default task
gulp.task('default',['clean'],function () {
   gulp.run('minimainJS');
});

//clean dist file
gulp.task('clean',function () {
   return gulp.src('./dist/',{read:false})
       .pipe(clean({force:true}))
});

//minify main public Js
gulp.task('minimainJS',['minifyJS'],function () {
    return gulp.src(['./js/**/*.js','!./js/core/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/pokemonGo/js/'))
});
//minify core Js
gulp.task('minifyJS',['intHtml'],function () {
    return gulp.src('./dist/pokemonGo/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/pokemonGo/js/'))
});

//min Html
gulp.task('minHtml',['intHtml'],function () {
    return gulp.src('./templates/**/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist/pokemonGo/templates/'))
});
//int Html
gulp.task('intHtml',['processHtml'],function () {
    return gulp.src('./templates/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
});
//process Html
gulp.task('processHtml',['minifyAndConcatJs'],function () {
    return gulp.src('./templates/**/*.html')
        .pipe(processHtml())
        .pipe(gulp.dest('./dist/pokemonGo/templates/'))
});
//1 assets

//mininfy JS
gulp.task('minifyAndConcatJs',['minImage'],function () {
    return gulp.src('./js/core/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/pokemonGo/js/core/'))
});
//min Image
gulp.task('minImage',['mokecopy'],function () {
    return gulp.src('./images/*')
        .pipe(imgmin())
        .pipe(gulp.dest('./dist/pokemonGo/images/'))
});
//mokedata
gulp.task('mokecopy',['fontcopy'],function () {
    return gulp.src(['./php/pokemon.json'])
        .pipe(gulp.dest('./dist/pokemonGo/php/'))
});
//font
gulp.task('fontcopy',['minifycss'],function () {
    return gulp.src(['./style/font/*','!./style/font/*.css'])
        .pipe(gulp.dest('./dist/pokemonGo/style/font/'))
});
//min css
gulp.task('minifycss',function () {
    return gulp.src('./style/mobile.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/pokemonGo/style/'))
});

