// Подключаем gulp
var gulp         = require('gulp');
// Подключаем генератор SVG Спрайт
var svgSprite    = require('gulp-svg-sprite');
// Конфиг основного спрайта
var configSvg    = require('../config').spriteSvg;
// Подключаем svgo
var svgo         = require('gulp-svgmin');
// Не падаем при ошибки
var handleErrors = require('../util/handleErrors');
// Размер файла
var fileSize     = require('gulp-size');

function sprite() {
	return gulp.src(configSvg.src)
	// Обработка svg через SVGO
			.pipe(svgo())
			// Обработка спрайта
			.pipe(svgSprite(configSvg.config))
			// Измеряем размер файла
			.pipe(fileSize({
				gzip     : false,
				showFiles: true
			}))
			// Лог ошибок
			.on('error', handleErrors)
			// Выдача файла
			.pipe(gulp.dest(configSvg.dest));
}

gulp.task('sprite', gulp.series(sprite));
