import WebC__Chat_Input     from '../../js/elements/WebC__Chat_Input.mjs'
import WebC__Target_Div     from '../../js/utils/WebC__Target_Div.mjs'
import Web_Component        from "../../js/core/Web_Component.mjs";


QUnit.module('WebC__Chat_Input', function(hooks) {

    let webc_chat_input
    let target_div
    let channel     = 'an_channel'

    hooks.beforeEach(() => {
        target_div = WebC__Target_Div.add_to_body().build({width: "50%"})
        webc_chat_input = target_div.append_child(WebC__Chat_Input, {channel:channel})
    });

    hooks.afterEach(() => {
        target_div.remove()
    })

    QUnit.test('constructor', (assert) => {
        assert.equal(WebC__Chat_Input.element_name, 'webc-chat-input'         , 'WebC__Chat_Message element name was correctly set'           )
        assert.ok   (WebC__Chat_Input.prototype instanceof Web_Component      , 'WebC__Chat_Message.prototype is an instance of Web_Component');
        assert.ok    (webc_chat_input instanceof WebC__Chat_Input)
        assert.ok    (webc_chat_input instanceof Web_Component   )
        assert.ok    (webc_chat_input instanceof Object          )
    })

    QUnit.test('connectedCallback', (assert) => {
        assert.deepEqual(webc_chat_input.channels, [ 'Web_Component', 'an_channel', 'WebC__Chat_Input' ]);
    })

    QUnit.test('.event_dispatch',     (assert) => {
        //const target_div        = WebC__Target_Div.add_to_body().build({width:"50%"})
        //const web_chat_input    = target_div.append_child(WebC__Chat_Input)
        const message_to_send   = 'an sent message'
        const expected_message  = {"channel": channel, "images": [], user_prompt: message_to_send }
        const keyevent           = new KeyboardEvent('keydown')
        keyevent._key ='Enter'          // todo: replace with proper event dispatch

        //web_chat_bot.messages.add_message_received(received_message)
        var message_received = null
        var on_new_input_message = (e)=>{
             message_received = e.detail
        }
        window.addEventListener('new_input_message', on_new_input_message);

        assert.equal(message_received, null)

        webc_chat_input.input.value = message_to_send
        webc_chat_input.input.dispatchEvent(keyevent)
        assert.propEqual(message_received, expected_message)
        assert.equal(webc_chat_input.input.value, '')

        target_div.remove()
        window.removeEventListener('new_input_message', on_new_input_message);
    })

    QUnit.test('render', (assert) => {
        // const div_setup = {top: "30%", width: "50%", bottom:"50%"}
        // const target_div = WebC__Target_Div.add_to_body().build(div_setup)
        // const web_chat_input = target_div.append_child(WebC__Chat_Input)
        const expected_html =
`
<div class="chat-images"></div>
<div class="chat-input">
    <!--<input id='file-input' type="file" />-->
    <!--<label for="file-input" class="file-input-label">+</label>-->
    <input id='user-prompt' type="text" placeholder="Enter a message..." autocomplete=\"off\"/>
    <button id=\"action-button\">send</button>
    <button id=\"clear-button\">clear</button>
</div>
`
        assert.equal(webc_chat_input.html(), expected_html)
        target_div.remove()
    })

    QUnit.test('Create test image', (assert) => {
        var base64Image      = create_test_img_base64(200,500);
        const div_setup      = {top: "200px"}
        //const target_div     = WebC__Target_Div.add_to_body().build(div_setup)
        //const web_chat_input = target_div.append_child(WebC__Chat_Input)
        assert.equal(webc_chat_input.images.children.length, 0)
        webc_chat_input.displayImage(base64Image)
        const img = webc_chat_input.images.children[0]
        const style = "width:auto; height:auto; margin:10px;max-width:150px;max-height:150px"
        assert.equal(img.outerHTML,`<img src="${base64Image}" style="${style}">`)
        assert.equal(webc_chat_input.images.children.length, 1)
        assert.equal(img.src,base64Image)


        // trigger an sendmessage event
        var on_new_input_message = (e)=>{}
        window.addEventListener('new_input_message', on_new_input_message);                     // todo add support for generic event listener to the beforeEach afterEach

        const keyevent           = new KeyboardEvent('keydown')
        keyevent._key            ='Enter'          // todo: replace with proper event dispatch
        webc_chat_input.input.value = 'now with an image'
        webc_chat_input.input.dispatchEvent(keyevent)
        assert.equal(webc_chat_input.images.children.length, 0)
        target_div.remove()
        window.removeEventListener('new_input_message', on_new_input_message);
    })

    //todo: this test is correctly triggering the change event, but inside it, the reader.onloadend is not being triggered
    QUnit.test('setup_upload_button', (assert) => {
        //var base64Image      = create_test_img_base64(200,500);
        assert.equal(webc_chat_input.query_selector('#file-input'), null)
        let div_file_input             = document.createElement('div');                // todo: find a better way to add this temp DIV
        div_file_input.id              = 'file-input';
        div_file_input.style.display   = 'none';
        div_file_input.type            = 'file'
        webc_chat_input.shadow_root_append(div_file_input);

        webc_chat_input.setup_upload_button()

        assert.equal(webc_chat_input.images.children.length,0)

        const blob          = new Blob(['file content'], { type: 'image/png' });
        const file          = new File([blob], 'image.png', { type: 'image/png' });      // Create a File from the Blob
        const dataTransfer  = new DataTransfer();
        dataTransfer.items.add(file);

        div_file_input.files = dataTransfer.files;

        const event = new Event('change');
        div_file_input.dispatchEvent(event);

        target_div.remove()
        div_file_input.remove()
    })
})

//todo: move to util class
function create_test_img_base64(width=50, height=30, color='#496D89') {
    var canvas    = document.createElement('canvas');       // Create a canvas element
    canvas.width  = width;
    canvas.height = height;
    var ctx       = canvas.getContext('2d');                // Get the context of the canvas
    ctx.fillStyle = color;                                  // Fill the canvas with the specified color
    ctx.fillRect(0, 0, width, height);
    return canvas.toDataURL();                              // Convert the canvas to a base64 encoded image
}