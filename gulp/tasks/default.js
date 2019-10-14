// Подключаем gulp
var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');
gulp.registry(FwdRef());

// Стандартный таск
// Сначала тестируем что бы не упали с ошибкой, собираем sass, затем сжимает картинки и js, после этого запускает ватчеры
gulp.task(
		'default',
		gulp.series(
				gulp.parallel('sass', 'images', 'js', 'watch')
		)
);