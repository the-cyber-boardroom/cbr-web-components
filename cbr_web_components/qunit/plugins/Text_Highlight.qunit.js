import Text_Highlight from "../../js/plugins/Text_Highlight.mjs";
import WebC__Target_Div from "../../js/utils/WebC__Target_Div.mjs";
import Web_Component from "../../js/core/Web_Component.mjs";


QUnit.module('API_Invoke', function(hooks) {

    let text_highlight;
    let target_div

    hooks.beforeEach(() =>{
        target_div          = WebC__Target_Div.add_to_body().build()
        text_highlight      = new Text_Highlight(target_div)
    })

    QUnit.test('.constructor()', (assert)=> {
        assert.ok       (target_div     instanceof Web_Component )
        assert.ok       (text_highlight instanceof Text_Highlight)
        assert.deepEqual(text_highlight.css_loaded , false       )
        assert.deepEqual(text_highlight.js_loaded  , false       )
        assert.deepEqual(text_highlight.target_webc, target_div  )
    })

    QUnit.test('.load_css()', async (assert)=> {
        let css_signature = 'Description: Original highlight.js style'

        assert.deepEqual(text_highlight.css_loaded, false)
        assert.deepEqual(text_highlight.css_code  , '')
        assert.deepEqual(text_highlight.css_code.indexOf(css_signature), -1)

        await text_highlight.load_css()

        assert.deepEqual(text_highlight.css_loaded, true)
        assert.notDeepEqual(text_highlight.css_code, '')
        assert.deepEqual(text_highlight.css_code.indexOf(css_signature), 23)
    })

    QUnit.test('.fetch_js_code()', async (assert)=> {
        assert.deepEqual(typeof(hljs), 'undefined')
        assert.ok(text_highlight.js_loaded === false)
        await text_highlight.fetch_js_code()
        assert.ok(text_highlight.js_loaded === true)
        assert.deepEqual(typeof(hljs), 'object')
        console.log('hlj version:', hljs.versionString)
        assert.ok(1)
    })
})