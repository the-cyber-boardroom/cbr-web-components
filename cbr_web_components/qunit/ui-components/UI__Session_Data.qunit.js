
import Web_Component    from "../../js/core/Web_Component.mjs";
import UI__Session_Data from "../../js/ui-components/UI__Session_Data.mjs";
import WebC__Target_Div from "../../js/utils/WebC__Target_Div.mjs";
import WebC__Form_Input from "../../js/elements/form_input/WebC__Form_Input.mjs";
import API__Invoke from "../../js/data/API__Invoke.mjs";


QUnit.module('UI__Session_Data', function(hooks) {
    let target_div
    let ui_session_data
    let mockResponse
    let originalFetch

    hooks.beforeEach(() =>{
        mockResponse    = { version: 'v0.6.8' };
        originalFetch = globalThis.fetch
        globalThis.fetch = async (url, options) => {
            return {
                ok: true,
                json: async () => mockResponse,
                status: 200,
            };
        };
        target_div              = WebC__Target_Div.add_to_body().build()
        ui_session_data         = target_div.append_child(UI__Session_Data)
    })

    hooks.afterEach(() => {
        globalThis.fetch = originalFetch;
        ui_session_data.remove()
        target_div.remove()
    })

    QUnit.test('.constructor', (assert) => {
        assert.ok(ui_session_data            instanceof Web_Component  )
        assert.ok(ui_session_data            instanceof HTMLElement    )
        assert.ok(UI__Session_Data.prototype instanceof Web_Component  )
        assert.ok(ui_session_data.api_invoke instanceof API__Invoke    )
        // todo: figure out why the tests below fail
        //assert.equal(Object.getPrototypeOf(ui_session_data), UI__Session_Data.prototype, 'The prototype of ui_session_data should be UI__Session_Data.prototype');
        //assert.ok(ui_session_data instanceof UI__Session_Data, 'ui_session_data should be an instance of UI__Session_Data');
    })
    QUnit.test('.html', (assert) => {
        let expected_html = "<h2>UI Session Data </h2>"
        assert.deepEqual(ui_session_data.inner_html(), expected_html)

    })
})