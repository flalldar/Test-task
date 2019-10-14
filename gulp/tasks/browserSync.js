// Подключаем плагин browserSync
var browserSync = require('browser-sync');
// Подключаем gulp
var gulp        = require('gulp');
// Подключаем конфиг из файла
var config      = require('../config').browserSync;

function browserSyncTask(done) {
	browserSync.init(config);
	done();
}

// BrowserSync Reload (callback)
function browserSyncReload(done) {
	browserSync.reload();
	done();
}

gulp.task('browserSync', gulp.series(browserSyncTask));

