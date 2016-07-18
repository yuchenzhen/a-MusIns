var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserify = require('gulp-browserify'),
	less = require('gulp-less'),
	port = process.env.port || 5010;
	
gulp.task('connect',function () {
	connect.server({
		root:'./',
		port: port,
		livereload:true,
	})
})

gulp.task('browserify',function () {
	gulp.src('./app/js/main.js')
	.pipe(browserify({
	}))
})

gulp.task('testLess',function () {
	gulp.src('*.less')
	.pipe(less())
	.pipe(gulp.dest('css'))
	.pipe(connect.reload() )
})

gulp.task('js',function () {
	gulp.src('./dist/**/*.js')
	gulp.src('./js/**.js')
	.pipe(connect.reload() )
})

gulp.task('css',function () {
	gulp.src(' *.css')
	gulp.src('css/*.css')
	.pipe( connect.reload() )
})
gulp.task('html',function () {
	gulp.src('./app/**/*.html'),
	gulp.src('*.html')
	.pipe( connect.reload() )
})

gulp.task('watch',function () {
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('js/**.js',['js']);
	gulp.watch('*.less',['testLess']);
	gulp.watch('css/*.css',['css']);
	gulp.watch('*.html',['html']);	
	gulp.watch('./app/**/*.html',['html']);	
	gulp.watch('./app/js/**/*.js',['browserify'])

})

gulp.task('default',['browserify']);

gulp.task('serve',['browserify','connect','testLess','watch'])