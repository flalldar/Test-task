var dest              = './app';
var src               = './source';
// Время перезагрузки барузера
var serverReloadDelay = 0;

module.exports = {
	// Конфиг для browserSync
	browserSync: {
		// Адрес сайта на который нужно кинуть прокси
		server         : dest,
		// IP в локальной сети используется для открытия на других устройствах например
		// http://192.168.1.101:3000 - сам сайт,
		// http://localhost:3001 - UI где все настраивается
		// Если у вас несколько сетевых карт то имеет смыл указать нужный вам ip ниже, автоматически не всегда верно определятеся
		// host : '192.168.1.101',
		// Запрещаем открывать браузер автоматически
		open           : false,
		// Клики, Скрол и Ввод в поля форм отзеркаливаются на всех устройствах подключенных к серверу
		ghostMode      : false,
		// Перезагружаем сервер при рестарте задачи
		reloadOnRestart: true,
		'ui'           : {
			// Кастомный порт для webkit инспектора, можно использовать любой не занятый
			'weinre': {
				'port': 9090
			}
		}
	},

	// Конфиг для Sass
	sass: {
		// Путь до исходника
		src     : src + '/sass/*.scss',
		// Путь до отслеживаемых файлов где могут происходить изменения
		watch   : src + '/sass/**/*',
		// Путь куда положить сгенерированный файл
		dest    : dest + '/css',
		settings: {
			// Стиль выдаваемого файла
			outputStyle    : 'compressed',
			// Писать логи, но не падать
			errLogToConsole: true
		},
		// Путь к карте css
		map     : dest + '/map',
		// Время перезагрузки страницы это важно когда файл не моментально загружается на сервер
		delay   : serverReloadDelay
	},

	// Конфиг для autoprefixer
	prefix: {
		// Не поддерживаем flexbox 2009 года (IE9)
		flexbox: 'no-2009',
		// Удалять устаревшие префaиксы
		remove : false,
		// Выстраивать преффиксы каскадом - нет
		cascade: false
	},

	// Конфиг для обработки и сжатия картинки
	images            : {
		// Следить за этой папкой
		src : src + '/images/assets/*.{jpg,png,gif,svg}',
		// Выгружать при обнаружении сюда
		dest: dest + '/images'
	},
	imagesOptimization: {
		// Следить за этой папкой
		src : src + '/images/assets/*.{jpg,png,gif,svg}',
		// Выгружать при обнаружении сюда
		dest: dest + '/images'
	},

	// Конфиг для сборки SVG спрайта
	spriteSvg: {
		// Следить за этой папкой
		src   : src + '/images/sprite/svg/*.svg',
		// Выгружать при обнаружении сюда
		dest  : './',
		config: {
			dest     : '.',
			log      : 'verbose',
			shape    : {
				spacing  : { // Добавляем отступы (нужно менять значения в зависимости от css иногда там не целые числа получаются)
					padding: 1
				},
				transform: ['svgo']
			},
			dimension: {
				precision: 0 // Плавающая точка
			},
			mode     : {
				css: {
					dest  : '.',
					prefix: '@mixin svg-%s()', // Префикс класса
					sprite: dest + '/images/sprite.svg',  // Путь до svg который подставляется в scss
					bust  : false, // убираем кешбустре в адресе изображения
					render: {
						scss: {
							template: src + '/sprite.scss.handlebars', // путь до шаблона
							dest    : 'source/sass/helpers/_sprite-svg.scss' // куда сохраниять файл scss
						}
					}
				}
			}
		}
	},
	// Конфиг для сборки js
	js       : {
		// Следить за этой папкой
		src  : src + '/js/*.js',
		watch: [src + '/js/main.js', src + '/js/components/*.js', src + '/js/components/**/*.js'],
		// Выгружать при обнаружении сюда
		dest : dest + '/js'
	},
	// Конфиг усиленной углификации js
	uglify   : {
		settings: {
			compress: {
				sequences   : true,
				dead_code   : true,
				conditionals: true,
				booleans    : true,
				unused      : true,
				if_return   : true,
				join_vars   : true,
				drop_console: true
			}
		}
	}
};
