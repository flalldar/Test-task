// Подключаем gulp
var gulp     = require('gulp');
// Подключаем конфиг из файла
var config   = require('../config');
var browserSync = require('browser-sync');

// Ватчеры +  стартуем browserSync
function watchFiles() {
	// Sass
	gulp.watch(config.sass.watch, {usePolling: true}, gulp.series('sass'));
	gulp.watch(config.images.watch, {usePolling: true}, gulp.series('images'));
	gulp.watch(config.js.watch, {usePolling: true},  gulp.series('js'));
}
// Следить за Sass и CSS
gulp.task('watch:sass', function () {
	gulp.watch(config.sass.watch, {usePolling: true}, gulp.series('sass'));
	browserSync.watch('./css/*.css', {usePolling: true}, function (event, file) {
		if (event === 'change') {
			setTimeout(function(){ browserSync.reload('*.css'); }, config.sass.delay);
		}
	});
});

// Следить за Js
gulp.task('watch:js', function () {
	gulp.watch(config.js.watch, {usePolling: true}, gulp.series('js'));
});

// Следить за images
gulp.task('watch:images', function () {
	gulp.watch(config.js.watch, {usePolling: true}, gulp.series('images'));
});


gulp.task('watch', gulp.parallel('browserSync', 'watch:sass', 'watch:js', 'watch:images'));