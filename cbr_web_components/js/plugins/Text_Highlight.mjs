export default class Text_Highlight {

    constructor(target_webc) {
        this.css_loaded  = false
        this.js_loaded   = false
        this.target_webc = target_webc
    }
    async fetch_css_code() {
        try {
            // Fetch and apply the highlight.js CSS
            let path = '/assets/plugins/highlight/default.min.css'
            const cssResponse = await fetch(path);
            const css = await cssResponse.text();
            return css
        } catch (error) {
            console.error('Error applying highlighting:', error);
            console.log(error)
            return ''
        }
    }
    async load_css() {
        let css_code = await this.fetch_css_code()
        if (css_code) {
            const sheet       = new CSSStyleSheet();
            sheet.replaceSync(css_code);
            this.target_webc.add_adopted_stylesheet(sheet);
            this.css_loaded = true
        }
    }
}