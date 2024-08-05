import Events__Utils            from "../../js/events/Events__Utils.mjs";
import WebC__Target_Div         from "../../js/utils/WebC__Target_Div.mjs";
import Web_Component            from '../../js/core/Web_Component.mjs'
import WebC__Form_Input         from "../../js/elements/form_input/WebC__Form_Input.mjs";
import WebC__Form_Input__Events from "../../js/elements/form_input/WebC__Form_Input__Events.mjs";


QUnit.module('WebC__Form_Input', function(hooks) {

    let webc_form_input
    let webc_form_input_events
    let events_utils
    let target_div
    let target_div_setup
    let text_area

    hooks.beforeEach((assert) => {
        target_div_setup        = { right:"50px", top:"250px", width: "500px", height:"200px"}
        target_div              = WebC__Target_Div.add_to_body().build(target_div_setup)
        webc_form_input         = target_div.append_child(WebC__Form_Input)
        webc_form_input_events  = new WebC__Form_Input__Events()
        events_utils            = webc_form_input.events_utils
        text_area               = webc_form_input.text_area
        //target_div.shadow_root().querySelector('.target_div').style.border = '0px'
        //window.target_div = target_div
    });

    hooks.afterEach( (assert) => {
        target_div.remove()
    })

    QUnit.test('.constructor()', (assert) => {
        let expected_channels = [ 'Web_Component', 'WebC__Form_Input', webc_form_input.channel_id]
        assert.ok(WebC__Form_Input.prototype instanceof Web_Component,  ' WebC__Save_Chat.prototype is an instance of Web_Component');
        assert.ok       (webc_form_input instanceof Web_Component       , 'webc_save_chat is an instance of Web_Component')
        assert.ok       (events_utils    instanceof Events__Utils       , 'webc_save_chat is an instance of Events__Utils')
        assert.deepEqual(webc_form_input.channels, expected_channels    , 'webc_save_chat.channels == [ "Web_Component", "WebC__Form_Input ]')
    })


    QUnit.test('.build()', (assert) => {
        const expected_html = `\
<div id="form_input">
    <textarea id="text_area" rows="1"></textarea>
</div>
`
        assert.equal(webc_form_input.shadow_root().innerHTML, webc_form_input.inner_html())
        assert.equal(webc_form_input.inner_html() , expected_html)
    })


    QUnit.test('.text_area()', (assert) => {
        assert.ok(webc_form_input.text_area instanceof HTMLTextAreaElement)
        assert.equal(webc_form_input.text_area.outerHTML, "<textarea id=\"text_area\" rows=\"1\"></textarea>")
    })

    QUnit.test('.on_append_value()', (assert) => {
        // if (typeof window.wallaby !== 'undefined') {                // skip in wallaby since for some weird reason the height values were off by 1 pixed when running in Wallaby
        //     assert.ok(1)
        //     return
        // }
        let value      = 'This is a value with new lines\n.....\n'
        let event_name = 'append_value'
        let channel    = webc_form_input.channel_id
        let event_data = {'value': value}
        assert.deepEqual(text_area.scrollHeight, 39)
        assert.deepEqual(text_area.style.height, '')
        assert.deepEqual(text_area.value, '')
        events_utils.events_dispatch.send_to_channel(event_name, channel, event_data)
        assert.deepEqual(webc_form_input.text_area_new_height(), 77)
        assert.deepEqual(text_area.style.height, '77px')
        assert.deepEqual(text_area.scrollHeight, 77)
        assert.deepEqual(text_area.value, value)


        events_utils.events_dispatch.send_to_channel(event_name, channel, event_data)
        events_utils.events_dispatch.send_to_channel(event_name, channel, event_data)
        assert.deepEqual(webc_form_input.text_area_new_height(), 100)
        assert.deepEqual(text_area.value, value + value + value)
        assert.deepEqual(text_area.style.height, '100px')
        assert.deepEqual(text_area.scrollHeight, 153)
    })

    QUnit.test('.on_set_value()', (assert) => {
        let event_name = 'set_value'
        let channel    = webc_form_input.channel_id
        let event_data = {'value': 'new value'}
        assert.deepEqual(webc_form_input.text_area.value, '')
        events_utils.events_dispatch.send_to_channel(event_name, channel, event_data)
        assert.deepEqual(webc_form_input.text_area.value, event_data.value)
    })

    // workflow tests

    QUnit.test('check that height resizes with text', (assert) => {
        const done = assert.async(); // Async test
        let multiline_value = 'aaa\nbbbb\ncccc\nddddd';
        let text_area = webc_form_input.text_area;

        assert.ok(text_area instanceof HTMLTextAreaElement);
        assert.equal(text_area.value, '');
        assert.equal(text_area.style.height, '');
        assert.equal(text_area.scrollHeight > 0, true, "Initial scrollHeight should be greater than 0");

        text_area.value = multiline_value;

        // Trigger the input event manually
        text_area.dispatchEvent(new Event('input'));

        // Wait for the DOM to update
        setTimeout(() => {
            assert.equal(text_area.value, multiline_value);
            assert.equal(text_area.style.height, text_area.scrollHeight + 'px', "Height should be equal to scrollHeight after input");
            done();
        }, 0);

    });

    QUnit.test('check WebC__Form_Input__Events', (assert) => {
        webc_form_input_events.raise_event()
        assert.ok(1)
    })


})