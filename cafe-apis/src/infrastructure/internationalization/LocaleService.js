
const i18nProvider = require('config/i18n');


module.exports = class LocaleService {
    constructor ({ locale }) {
        this.locale = locale;
    }

    translate (string, args = {}) {
        if (this.locale) {
            if (i18nProvider.getLocales().indexOf(this.locale) !== -1) {
                for (const [ key, value ] of Object.entries(args)) {
                    args[key] = this.translateKey(value);
                }

                return i18nProvider.__({ phrase: string, locale: this.locale }, args);
            }
        }

        return i18nProvider.__(string, args);
    }

    translateKey (string) {
        return i18nProvider.__({ phrase: string, locale: this.locale });
    }
};
