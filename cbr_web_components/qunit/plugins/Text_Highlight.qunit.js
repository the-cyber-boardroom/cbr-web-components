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
        var done = assert.async()
        assert.deepEqual(text_highlight.css_loaded, false)
        await text_highlight.load_css()
        assert.deepEqual(text_highlight.css_loaded, true)
        assert.ok(1)
        done()
    })
})