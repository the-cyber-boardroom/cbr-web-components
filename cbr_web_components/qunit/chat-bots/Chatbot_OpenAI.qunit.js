import Chatbot_OpenAI   from '../../js/chat-bots/Chatbot_OpenAI.mjs'
import Web_Component    from '../../js/core/Web_Component.mjs'
import WebC__Target_Div from "../../js/utils/WebC__Target_Div.mjs";

QUnit.module('Chatbot_OpenAI', function(hooks) {

    let chatbot_openai
    let target_div
    let div_system_prompt

    hooks.before((assert) => {
        target_div                      = WebC__Target_Div.add_to_body().build({width: "50%"})
        chatbot_openai                  = target_div.append_child(Chatbot_OpenAI)

        div_system_prompt                 = document.createElement('div');                // todo: find a better way to add this temp DIV
        div_system_prompt.id              = 'system_prompt';
        div_system_prompt.style.display   = 'none';
        document.body.appendChild(div_system_prompt);
        chatbot_openai.messages.messages_clear()
        assert.equal(document.body.querySelector('#system_prompt').outerHTML, '<div id="system_prompt" style="display: none;"></div>')
    });

    hooks.after(() => {
        //console.log(document.querySelector('#system_prompt'))
        target_div.remove()
        div_system_prompt.remove()
    })

    QUnit.test('constructor', (assert) => {
        assert.ok(true)
        assert.ok(Chatbot_OpenAI.prototype instanceof Web_Component);
        assert.deepEqual(chatbot_openai.stop_fetch, false)
    })

    QUnit.test('add_thread_id_ui_link', (assert) => {
        assert.equal(chatbot_openai.messages.messages().length,0)

        chatbot_openai.add_thread_id_ui_link()

        assert.equal(chatbot_openai.messages.messages().length,1)
        let last_message = chatbot_openai.messages.messages()[0]
        let chat_thread_id = chatbot_openai.chat_thread_id
        let last_message_inner_html = `<a style="padding:0px" href="chat/view/${chat_thread_id}" target="_blank">view saved chat</a>`
        assert.deepEqual(last_message.innerHTML, last_message_inner_html)
    })

    QUnit.test('all_system_prompts', (assert) => {

        assert.deepEqual(chatbot_openai.all_system_prompts(), [])

        chatbot_openai.system_prompt = 'an system_prompt'
        assert.deepEqual(chatbot_openai.all_system_prompts(), ['an system_prompt'])

        chatbot_openai.system_prompt = ''

        div_system_prompt.innerHTML = 'this is another system prompt'
        assert.deepEqual(chatbot_openai.all_system_prompts(), ['this is another system prompt'])
        div_system_prompt.innerHTML = ''
        assert.deepEqual(chatbot_openai.all_system_prompts(), [])
    })
})