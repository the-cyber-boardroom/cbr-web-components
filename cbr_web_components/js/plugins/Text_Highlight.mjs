export default class Text_Highlight {

    constructor(target_webc) {
        this.css_loaded  = false
        this.js_loaded   = false
        this.target_webc = target_webc
        this.css_code    = ''
    }

    async fetch_css_code() {
        try {
            const path        = '/assets/plugins/highlight/default.min.css'
            const cssResponse = await fetch(path);
            this.css_code     = await cssResponse.text();
        } catch (error) {
            console.error('[Text_Highlight] Error in fetch_css_code:', error);
            return ''
        }
    }
    async load_css() {
        await this.fetch_css_code()
        if (this.css_code) {
            const sheet       = new CSSStyleSheet();
            sheet.replaceSync(this.css_code);
            this.target_webc.add_adopted_stylesheet(sheet);
            this.css_loaded = true
            this.target_webc.raise_event('css-loaded')              // todo: see if we still need this
            //this.target_webc.dispatchEvent(new CustomEvent('css-loaded', { bubbles: false }));
        }
    }
}