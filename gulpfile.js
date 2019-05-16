var gulp        = require('gulp')
var sass        = require('gulp-sass')
var nodemon     = require('gulp-nodemon')
var notify      = require('gulp-notify')
var browserSync = require('browser-sync')
var reload      = browserSync.reload


var src = {
    sass:   'sass/*.sass',
    css:    'css/'
}


gulp.task('sass', function() {
	return gulp.src(src.sass)
		.pipe(sass())
		.pipe(gulp.dest(src.css))
		.pipe(reload({stream: true}))
})


var port = 3000

gulp.task('serve', function() {
	// https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    browserSync({
        server: {
            baseDir: "./"
        },
        files: ['views/*.twig', 'routes/*.{js}'],
        online: false,
        open: false,
        port: port,
        //proxy: 'localhost:' + port,
        ui: false
    })

	gulp.watch(src.sass, ['sass'])
    gulp.watch('*.html').on('change', reload)
})

gulp.task('default', ['serve'])