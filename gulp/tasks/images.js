// Подключаем changed - отслеживает только новые или измененые файлы
var changed  = require('gulp-changed');
// Подключаем gulp
var gulp     = require('gulp');
// Подключаем imagemin - сжатие изображение для всех платформ
var imagemin = require('gulp-imagemin');
// Размер файла
var fileSize = require('gulp-size');
// Подключаем конфиг из файла
var config   = require('../config').images;

function images() {
	return (
			gulp
				.src(config.src)
				.pipe(changed(config.dest)) // Проверяет изменения в финальной папке
				.pipe(imagemin([imagemin.gifsicle({interlaced: true}),
					imagemin.jpegtran({progressive: true, arithmetic: true}),
					imagemin.optipng({optimizationLevel: 5}),
					imagemin.svgo({
						plugins: [
							{removeViewBox: false},
							{cleanupIDs: true},
							{cleanupAttrs: true},
							{removeDoctype: true},
							{removeComments: true},
							{removeMetadata: true},
							{removeTitle: true},
							{removeDesc: true},
							{removeUselessDefs: true},
							{removeEmptyText: true},
							{minifyStyles: true},
							{minifyStyles: true},
							{cleanupIDs: true},
							{removeEditorsNSData: true},
						]
					})]))
				// Измеряем размер файла
				.pipe(fileSize({
					gzip     : false,
					showFiles: true
				}))
				// Выгружаем в папку назначения
				.pipe(gulp.dest(config.dest))
	);
}

// Таск сжатия изображений
gulp.task('images', gulp.series(images));