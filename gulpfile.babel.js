import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { plugins } from './gulp/config/plugins.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// наблюдатель за изменениями
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); // gulp.watch(path.watch.html, gulp.series.(html, ftp));
  gulp.watch(path.watch.scss, scss); // gulp.watch(path.watch.scss, gulp.series.(scss, ftp));
  gulp.watch(path.watch.js, js); // gulp.watch(path.watch.js, gulp.series.(js, ftp));
  gulp.watch(path.watch.images, images); // gulp.watch(path.watch.images, gulp.series.(images, ftp));
}

// последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// основные задачи
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask, zip);
const deployFTP = gulp.series(reset, mainTask, ftp);

// выполнение сценариев по умолчанию
gulp.task('default', dev);

// экспорт сценариев
export { svgSprite, dev, build, deployZip, deployFTP }
