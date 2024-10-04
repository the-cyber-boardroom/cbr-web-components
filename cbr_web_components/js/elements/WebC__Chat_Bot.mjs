import Web_Component       from "../core/Web_Component.mjs"        ;
import Data__Chat_Bot      from "../data/Data__Chat_Bot.mjs" ;
import WebC__Chat_Input    from "./WebC__Chat_Input.mjs"     ;
import WebC__Chat_Messages from "./WebC__Chat_Messages.mjs"  ;
import A                   from "../core/A.mjs"              ;
import B                   from "../core/B.mjs"              ;
import Div                 from "../core/Div.mjs"            ;
import Text                from "../core/Text.mjs"           ;
import Tag                 from "../core/Tag.mjs"            ;

export default class WebC__Chat_Bot extends Web_Component {
    constructor() {
        super();
        this.target_element     = null
        //this.div_chat_messages  = null
        this.data_chat_bot      = new Data__Chat_Bot()
        this.bot_name           = 'ChatBot'
        //this.channel            = this.getAttribute('channel')       || null
        this.show_sent_messages = this.getAttribute('show_sent_messages') || false
        //this.channels.push(this.channel)
        this.channels.push('WebC__Chat_Bot')

        if (this.getAttribute('edit_mode')  === null) {
            this.edit_mode = 'true' }
        else { this.edit_mode = this.getAttribute('edit_mode')}

        if (this.getAttribute('show_sent_messages')  === null) {
            this.show_sent_messages = 'true' }
        else { this.show_sent_messages = this.getAttribute('show_sent_messages') }
    }

    // properties

    get chat_ids() {
        return this.query_selector('#chat_ids')
    }

    get input() {
        return this.query_selector('#chat_input').input
    }

    get messages() {
        return this.query_selector('#chat_messages')        //todo: refactor chat_messages
    }

    get target_element_style() {
        return this.target_element?.style
    }

    get target_element_style_computed() {
        return getComputedStyle(this.target_element)
    }

    // connected events
    connectedCallback() {
        super.connectedCallback()
        this.build()
    }
    // instance methods
    handle_new_input_message(event_data) {
        if (event_data?.channel === this.channel) {
            this.messages.add_message_sent(event_data) }
        if (this.channel?.startsWith('shared-llm')) {
            this.messages.add_message_sent(event_data) }

    }
    handle_clear_messages(event_data) {
        if (event_data?.channel === this.channel) {
            this.clear_messages()
        }
    }
    handle_new_chat_ids(event_data) {
        if (event_data?.channel === this.channel) {
            this.html_update_chat_ids_value(event_data)
        }
    }
    clear_messages() {
        $(this.messages.childNodes).remove()
    }

    add_event_hooks() {
        window.addEventListener('new_input_message', (e)=>{ this.handle_new_input_message(e.detail) });
        //window.addEventListener('channel_message'  , (e)=>{ })
        window.addEventListener('clear_messages'   , (e)=>{ this.handle_clear_messages   (e.detail) })
        window.addEventListener('new_chat_ids'     , (e)=>{ this.handle_new_chat_ids     (e.detail) })
    }

    css_rules__chat_bot() {
        return {    "*"              : { "font-family": "Verdana"},
                    ".chatbot-ui"    : { display: "flex",
                                         flex: 1,
                                         "flex-direction": "column",
                                         "max-width": "100%",
                                         //"max-height": "calc(100vh - 320px)",  // todo find a better way to do this, since this had a number of side effects (like loosing the help buttons in mobile)
                                         "height": "100%"                   , // Adjust to the height of the content-center div
                                         "background-color": "#fff",
                                         "border-radius": "10px",
                                         "box-shadow": "0 0 10px rgba(0,0,0,0.1)",
                                         overflow: "hidden"},
                    ".chat-ids"      : { backgroundColor: "black"  ,
                                         color          : "white"  ,
                                         padding        : "10px"   },
                    ".chat-ids a"    : { color          : "white"   },
                    ".chat-header"   : { "background-color": "#5a4ad1",
                                         color: "#fff",
                                         padding: "10px",
                                         "text-align": "center",
                                         "font-size": "1.2em" },
                    ".chat-messages" : { display: "flex",
                                        "flex-direction": "column",
                                         "flex-grow": "1",
                                         padding: "10px",
                                         "overflow-y": "auto" },
                    // todo: refactor to chat-input WebC
                    ".chat-input"    : { padding: "10px",
                                         background: "#fff",
                                         "box-shadow": "0 -2px 10px rgba(0,0,0,0.1)" },
                    ".chat-input input": {  width: "90%",
                                            padding: "10px",
                                            "border-radius": "20px",
                                            border: "1px solid #ccc",
                                        }};}

    div_chatbot_ui() {

        const tag = new Tag()
        const tag_chat_messages = WebC__Chat_Messages.element_name
        const tag_chat_input    = WebC__Chat_Input   .element_name
        const chat_messages__id = 'chat_messages'
        const chat_input__id    = 'chat_input'

        tag.html_config.include_id=false

        const div_chatbot_ui     = tag.clone({tag:'div'            , class:'chatbot-ui'                           })
        const div_chat_header    = tag.clone({tag:'div'            , class:'chat-header'  , value:this.bot_name   })
        const div_chat_ids       = new Tag  ({tag:'div'            , class:'chat-ids'     , id: 'chat_ids'        })
        const webc_chat_messages = new Tag  ({tag:tag_chat_messages, class:'chat-messages', id: chat_messages__id })
        const webc_chat_input    = new Tag  ({tag:tag_chat_input   ,                        id: chat_input__id    })
        //const div_chat_input     = tag.clone({tag:'div'            , class:'chat-input'                           })
        //const input_chat_input   = tag.clone({tag:'input'          , attributes:{type:'text', placeholder:'Enter a message...'}})

        webc_chat_input   .attributes.channel            = this.channel
        webc_chat_messages.attributes.channel            = this.channel
        webc_chat_messages.attributes.show_sent_messages = this.show_sent_messages
        webc_chat_messages.attributes.edit_mode          = this.edit_mode

        div_chatbot_ui.add(div_chat_header  )
        div_chatbot_ui.add(div_chat_ids     )
        div_chatbot_ui.add(webc_chat_messages)
        div_chatbot_ui.add(webc_chat_input)

        //div_chatbot_ui.add(div_chat_input)
        //div_chat_input.add(input_chat_input)

        div_chatbot_ui  .html_config.trim_final_html_code = true
        //input_chat_input.html_config.include_end_tag    = false

        div_chat_ids.value ='...'
        return div_chatbot_ui
    }

    html_update_chat_ids_value(event_data) {
        if (!event_data) {
            return
        }

        const cbr_chat_id        = event_data?.cbr_chat_id          || ''
        //const cbr_chat_thread_id = event_data?.cbr_chat_thread_id   || ''
        const link__chat         = `/web/chat/view/${cbr_chat_id}`
        const link__chat_pdf     = `${link__chat}/pdf`
        const link__chat_image   = `${link__chat}/image`

        //const link__thread       = `chat/view/${cbr_chat_thread_id}`

        const div_chat_ids = new Div()
        const text_pipe     = new Text({value: '|'})
        //const a_chat_thread = new A   ({value: 'view thread', attributes: { href: link__thread, target:'_blank'}})
        const a_chat        = new A   ({value: 'share chat' , attributes: { href: link__chat       , target:'_blank'}})
        const a_chat_pdf    = new A   ({value: 'share pdf'  , attributes: { href: link__chat_pdf   , target:'_blank'}})
        const a_chat_image  = new A   ({value: 'share image', attributes: { href: link__chat_image , target:'_blank'}})
        //div_chat_ids.add_elements(a_chat_thread,  text_pipe , a_chat)
        div_chat_ids.add_elements( a_chat, text_pipe, a_chat_pdf, text_pipe, a_chat_image)
        this.chat_ids.innerHTML = div_chat_ids.html()
    }


    build() {
        this.add_css_rules(this.css_rules__chat_bot())
        const html = this.div_chatbot_ui().html()
        this.set_inner_html(html)
        this.add_event_hooks()
    }

    hide() {
        this.hidden = true
        return this
    }

    set_input_value(value)  {
        let event_data = {'value': value }
        this.events_utils.events_dispatch.send_to_channel('set_value', this.channel, event_data)
    }


    show() {
        this.hidden = false
        return this
    }

    // todo: re-add this capability to load messages from saved data
    //
    // load_messages(user_messages) {
    //     user_messages.forEach((item) => {
    //         if (item.type === 'sent') {
    //             this.messages__add_sent(item.message)
    //         }
    //         if (item.type === 'received') {
    //             this.messages__add_received(item.message)
    //         }
    //     });
    //     return this
    // }
    //
    // set_user_messages(user_messages) {
    //     //this.data_chat_bot.user_messages = user_messages            // set data_chat_bot.user_messages value
    //     this.reset_user_messages()
    //     this.load_messages(user_messages)                           // reload messages in UI
    //     return this
    // }
    //
    // reset_user_messages() {
    //     this.data_chat_bot.user_messages = []
    //     webc_chat_bot.div_chat_messages.innerHTML =''
    //     return this
    // }
    // store_message(message, type) {
    //     this.data_chat_bot.add_user_message(message, type)
    //     return this
    // }
    //
    // messages__add(template, message) {
    //     const formatted_message = message.replace(/\n/g, '<br>');
    //     const new_message = template.content.cloneNode(true)
    //     new_message.querySelector('.message').innerHTML = formatted_message;
    //     const document_fragment = this.div_chat_messages.appendChild(new_message);
    //     this.div_chat_messages.scrollTop = this.div_chat_messages.scrollHeight;      // todo: add check if we should do this
    //     return document_fragment
    // }
    //
    // messages__add_sent (message) {
    //     const template = this.target_element.querySelector('#template_sent') //.content.cloneNode(true);
    //     this.messages__add(template, message)
    //     this.data_chat_bot.add_user_message(message, 'sent')
    // }
    //
    // messages__add_received (message) {
    //     const template = this.target_element.querySelector('#template_received') //.content.cloneNode(true);
    //     this.messages__add(template, message)
    //     this.data_chat_bot.add_user_message(message, 'received')
    // }
}

WebC__Chat_Bot.define()