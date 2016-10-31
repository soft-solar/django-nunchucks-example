const fs = require('fs');
const gulp = require('gulp');
const es = require('event-stream');
const gulpNunjucks = require('gulp-nunjucks');
const nunjucks = require('nunjucks');
const Gettext = require('node-gettext');
const django_compat = require('./nunjucks/templatetags/django-compat');
const i18n = require('./nunjucks/templatetags/i18n');

const locales = [
  "en",
  "uk"
];

let nunjucksEnv = new nunjucks.Environment();
nunjucksEnv.addExtension('LoadExtension', new django_compat.LoadExtension());

let gt = new Gettext();
for ( const locale of locales ) {
  try {
    let fileContents = fs.readFileSync(`locale/${locale}/LC_MESSAGES/django.po`);
    gt.addTextdomain(locale, fileContents);
  } catch (e) {
    gt.addTextdomain(locale);
  }
}

gulp.task('default', () => {
    let streams = [];

    for ( const locale of locales ) {
      let nunjucksEnv = new nunjucks.Environment();
      nunjucksEnv.addExtension('LoadExtension', new django_compat.LoadExtension());
      nunjucksEnv.addExtension('I18nExtension', new i18n.I18nExtension(gt, locale));
      streams.push(
        gulp.src('app/templates/app/note_detail.html')
          .pipe(gulpNunjucks.precompile(
            options={
              env: nunjucksEnv
            }
          ))
          .pipe(gulp.dest(`app/static/jsi18n/${locale}/templates/`))
      )
    }
    return es.concat(streams);
});
