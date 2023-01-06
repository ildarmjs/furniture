// import { dest, src } from 'gulp'
// import { path } from '../config/path'

export const json = () => {
	return app.gulp
		.src(app.path.src.json)
		.pipe(app.plugins.plumber())
		.pipe(app.gulp.dest(app.path.build.json))
}
