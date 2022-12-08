import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'Fonts',
        message: '<%= error.message %>',
      })
    ))
    // конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // ищем файлы .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'Fonts',
        message: '<%= error.message %>',
      })
    ))
    // конвертируем в woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // ищем файлы .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // конвертируем в woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  // файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // проверяем, существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
    if (fontsFiles) {
      // проверяем, существует ли файл стилей подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // если нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // записываем подключения шрифтов в файл стилей
          let fontsFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontsFileName) {
            let fontName = fontsFileName.split('-')[0] ? fontsFileName.split('-')[0] : fontsFileName;
            let fontWeight = fontsFileName.split('-')[1] ? fontsFileName.split('-')[1] : fontsFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontsFileName}.woff2") format("woff2"), url("../fonts/${fontsFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\t}\r\n`, cb);
            newFileOnly = fontsFileName;
          }
        }
      } else {
        // если файл есть => сообщение
        console.log('Файл уже существует. Для обновления нужно перезапустить gulp')
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { };
}
