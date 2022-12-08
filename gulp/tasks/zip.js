import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
  deleteAsync(`./${app.path.rootfolder}.zip`);
  return app.gulp.src(`${app.path.builsFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'ZIP',
        message: 'Error: <%= error.message %>',
      })
    ))
    .pipe(zipPlugin(`${app.path.rootFolder}`.zip))
    .pipe(app.gulp.dest('./'));
}
