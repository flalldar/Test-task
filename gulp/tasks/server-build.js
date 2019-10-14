// Подключаем gulp
var gulp = require('gulp');

// Таск собирает однократно sass -> css и js
gulp.task(
		'build',
		gulp.series(
			gulp.parallel('sass', 'js')
		)
);