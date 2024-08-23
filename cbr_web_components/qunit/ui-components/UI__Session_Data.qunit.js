
import Web_Component    from "../../js/core/Web_Component.mjs";
import UI__Session_Data from "../../js/ui-components/UI__Session_Data.mjs";
import WebC__Target_Div from "../../js/utils/WebC__Target_Div.mjs";
import WebC__Form_Input from "../../js/elements/form_input/WebC__Form_Input.mjs";
import API__Invoke from "../../js/data/API__Invoke.mjs";
import Text_Highlight from "../../js/plugins/Text_Highlight.mjs";


QUnit.module('UI__Session_Data', function(hooks) {
    let target_div
    let ui_session_data
    let mockResponse
    //let skip_tests;

    hooks.beforeEach(async (assert) =>{
        //skip_tests   = false//(typeof wallaby === 'undefined')                               // todo: figure out why these tests don't work in KarmaJS. There was a problem fetching the css (which weirdly worked sometimes)
        mockResponse = { version: 'v0.6.8' };

        // if (skip_tests) {
        //     assert.ok(1);
        //     return
        // }
        target_div              = WebC__Target_Div.add_to_body().build()
        ui_session_data         = await target_div.append_child(UI__Session_Data)
        ui_session_data.api_invoke.mock_responses = true                                    // todo: need to give mockResponse to the api_invoke
        await new Promise((resolve, reject) => {
             const timeout = setTimeout(() => {
                reject(new Error('css-loaded event did not fire within the expected time.'));
                }, 100);
             ui_session_data.addEventListener('css-loaded', () => {
                clearTimeout(timeout);                                      // Clear the timeout if the event fires
                resolve();                                                  // Resolve the promise if the event fires
             }, { once: true });
        });
    })

    hooks.afterEach(() => {
        //if (skip_tests) { return }
        ui_session_data.remove()
        target_div.remove()
    })

    QUnit.test('.constructor', (assert) => {
        //if (skip_tests) { return }
        assert.ok(ui_session_data                instanceof Web_Component  )
        assert.ok(ui_session_data                instanceof HTMLElement    )
        assert.ok(UI__Session_Data.prototype     instanceof Web_Component  )
        assert.ok(ui_session_data.api_invoke     instanceof API__Invoke    )
        assert.ok(ui_session_data.text_highlight instanceof Text_Highlight )
        assert.ok(ui_session_data.text_highlight.css_loaded     )
        assert.ok(ui_session_data.text_highlight.css_code !== '')
        // todo: figure out why the tests below fail
        //assert.equal(Object.getPrototypeOf(ui_session_data), UI__Session_Data.prototype, 'The prototype of ui_session_data should be UI__Session_Data.prototype');
        //assert.ok(ui_session_data instanceof UI__Session_Data, 'ui_session_data should be an instance of UI__Session_Data');
    })

    QUnit.test('.html', (assert) => {
        //if (skip_tests) { return }
        let expected_html = JSON.stringify(mockResponse,null, 1)
        assert.deepEqual(ui_session_data.inner_html(), expected_html)

        //console.log(ui_session_data.inner_html())
        //console.log(expected_html)
        //console.log(ui_session_data.inner_html() === expected_html)
        //assert.ok(1)
    })
})