import fileInclue from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

export const copy = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fileInclue())
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(
      app.isBuild,
      webpHtmlNosvg()
    ))
    .pipe(app.plugins.if(
      app.isBuild,
      versionNumber({
        'value': '%TD%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [ 'css', 'js' ],
        },
        'output': {
          'file': 'gulp/version.json'
        }
      })
    ))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
}
