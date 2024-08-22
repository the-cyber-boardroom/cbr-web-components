import Web_Component  from "../core/Web_Component.mjs";
import API__Invoke    from "../data/API__Invoke.mjs";
import Text_Highlight from "../plugins/Text_Highlight.mjs";


export default class UI__Session_Data extends Web_Component {
    constructor() {
        super();
        this.api_invoke     = new API__Invoke()
        this.text_highlight = new Text_Highlight(this)
    }

    async connectedCallback() {
        super.connectedCallback()
        //this.load_highlight_css()
        await this.text_highlight.load_css()
        this.build()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    // load_highlight_css() {
    //     fetch('/assets/plugins/highlight/default.min.css')
    //       .then(response => response.text())
    //       .then(css => {
    //         const sheet = new CSSStyleSheet();
    //         sheet.replaceSync(css);
    //         this.shadowRoot.adoptedStyleSheets = [sheet];
    //       });
    // }

    build() {
        let raw_html = this.html()
        this.set_inner_html(raw_html)
        window.session_data = this
    }

    html () {
        let events_dispatch = this.api_invoke.events_utils.events_dispatch
        let channel    = this.api_invoke.channel
        let event_name = 'api_invoke'
        //let path = '/config/version'
        //let path = '/api/openapi.json'
        let path = '/api/user/user-session/session-data'
        let event_data = { method:'GET', 'path':  path, 'data': null}
        let on_api_response = (data) => {
            let raw_html = `${JSON.stringify(data, null, ' ')}`
            if (typeof hljs !== 'undefined' && hljs.highlight) {
                let html_code = hljs.highlight("javascript", raw_html).value
                html_code = `<pre>${html_code}</pre>`
                this.set_inner_html(html_code)
            }
            else {
                this.set_inner_html(raw_html)
            }
        }

        events_dispatch.send_to_channel(event_name, channel, event_data, null, on_api_response)
        let html = "<h2>UI Session Data </h2>"
        return html
    }
}

UI__Session_Data.define()