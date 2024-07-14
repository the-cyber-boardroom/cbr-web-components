import Web_Component    from '../../js/core/Web_Component.mjs'
import WebC__Target_Div from "../../js/utils/WebC__Target_Div.mjs";
import WebC__Chat_Input from "../../js/elements/WebC__Chat_Input.mjs";

QUnit.module('WebC__Chat_Input.mjs', function(hooks) {

    let webc_chat_bot
    let target_div
    let channel     = 'an_channel'
    hooks.before(() => {
        target_div = WebC__Target_Div.add_to_body().build({width: "50%"})
        webc_chat_bot = target_div.append_child(WebC__Chat_Input, {channel:channel})
    });

    hooks.after(() => {
        target_div.remove()
    })

    QUnit.test('constructor', (assert) => {
        assert.ok(WebC__Target_Div.prototype instanceof Web_Component);
        assert.ok(webc_chat_bot instanceof Web_Component);
    })

    QUnit.test('connectedCallback', (assert) => {
        assert.deepEqual(webc_chat_bot.channels, [ 'Web_Component', 'an_channel', 'WebC__Chat_Input' ]);

    })

    QUnit.test('html', (assert) => {
        const expected_html = `
<div class="chat-images"></div>
<div class="chat-input">
    <!--<input id='file-input' type="file" />-->
    <!--<label for="file-input" class="file-input-label">+</label>-->
    <input id='user-prompt' type="text" placeholder="Enter a message..." autocomplete="off"/>
    <button id="action-button">send</button>
    <button id="clear-button">clear</button>
</div>
`;
        assert.deepEqual(webc_chat_bot.html(), expected_html)
    })

    QUnit.test('setup_upload_button', (assert) => {
        assert.equal(webc_chat_bot.query_selector('#file-input'), null)
        let div_file_input             = document.createElement('div');                // todo: find a better way to add this temp DIV
        div_file_input.id              = 'file-input';
        div_file_input.style.display   = 'none';
        webc_chat_bot.shadow_root_append(div_file_input);
        assert.equal(webc_chat_bot.query_selector('#file-input'), div_file_input)
        webc_chat_bot.setup_upload_button()
    })
})