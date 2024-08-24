import WebC__Target_Div     from "../../../js/utils/WebC__Target_Div.mjs";
import WebC__API_To_Table   from "../../../js/elements/api/WebC__API_To_Table.mjs";
import Web_Component        from "../../../js/core/Web_Component.mjs";
import API__Invoke          from "../../../js/data/API__Invoke.mjs";

QUnit.module('WebC__API_To_Json', function(hooks) {
    let target_div
    let webc_api_to_table
    let mock_responses
    let api_path
    let api_data

    hooks.beforeEach(async (assert) => {
        api_path            = '/an/path/to/load'
        api_data            = {'headers': ['requests_ids'], 'rows': [['a'], ['b'], ['c']], 'title':'an table'}
        mock_responses      = JSON.stringify({[api_path]: api_data})
        target_div          = WebC__Target_Div.add_to_body().build()
        let attributes      = { mock_responses: mock_responses, api_path: api_path}
        webc_api_to_table   = await target_div.append_child(WebC__API_To_Table, attributes)
        await webc_api_to_table.wait_for_event('build-complete')
    })

    hooks.afterEach(() => {
        webc_api_to_table.remove()
        target_div.remove()
    })

    QUnit.test('.constructor', (assert) => {
        assert.deepEqual(WebC__API_To_Table.name, 'WebC__API_To_Table')
        assert.ok(WebC__API_To_Table.prototype instanceof Web_Component)
        assert.ok(webc_api_to_table instanceof Web_Component)
        assert.ok(webc_api_to_table instanceof HTMLElement)
        assert.ok(webc_api_to_table.api_invoke instanceof API__Invoke)
        assert.deepEqual(webc_api_to_table.getAttributeNames(), ['mock_responses', 'api_path'])

        assert.deepEqual(webc_api_to_table.api_invoke.mock_responses, JSON.parse(mock_responses))
        assert.deepEqual(webc_api_to_table.api_path, api_path)
    })
})