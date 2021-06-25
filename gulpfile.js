//Тут буду писать все задача для Галпа (сжимать, унифицировать, деплоить и др)

let gulp = require('gulp'); //Создаю экземпляр Gulp. Запрашиваю локальный модуль Gulp.
let sass = require('gulp-sass'); // Подключаю Sass пакет
let imagemin = require('gulp-imagemin'); //Подключаю пакет минимизации картинок

//Создаю task sass
gulp.task('sass', function () { 
	return gulp.src('sass/main.scss') // Берем источник
		.pipe(sass()) //Преобразуем sass в css посредством gulp-sass
		.pipe(gulp.dest('css')) //Выгружаем результаты в папку app/css
});

// Compress Task
gulp.task('compress', function() {
	gulp.src('img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
  });

/* 
  gulp.task('styles', function () {
	return gulp.src('src/sass/*.sass')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(rename({sufflix: '.min', prefix: ''}))
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/css'));

});

export.default = () => (
	gulp.src('src/img/**')
		.pipe(imagemin({
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 2}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
				{cleanupIDs: false}
]
})	
}))
.pipe(gulp.dest('dist/img'))
);

exports.view = () => {
	gulp.src('src/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'));
}; */