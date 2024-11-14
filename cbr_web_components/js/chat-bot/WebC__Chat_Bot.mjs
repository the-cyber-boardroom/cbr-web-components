import Web_Component       from "../core/Web_Component.mjs"        ;
import Data__Chat_Bot      from "../data/Data__Chat_Bot.mjs" ;
import WebC__Chat_Input    from "./WebC__Chat_Input.mjs"     ;
import WebC__Chat_Messages from "./WebC__Chat_Messages.mjs"  ;
import CSS__WebC__Chat_Bot from "./CSS__WebC__Chat_Bot.mjs"  ;
import A                   from "../core/A.mjs"              ;
import Div                 from "../core/Div.mjs"            ;
import Text                from "../core/Text.mjs"           ;
import Tag                 from "../core/Tag.mjs"            ;
import Icon__Mappings      from "../css/icons/Icon__Mappings.mjs";
import Icon                from "../css/icons/Icon.mjs";

export default class WebC__Chat_Bot extends Web_Component {

    static url_current_user_add_chat_id = '/api/user-data/chats/chat-add?chat_path='

    constructor() {
        super();
        this.is_maximized       = false;
        this.target_element     = null
        this.data_chat_bot      = new Data__Chat_Bot()
        this.bot_name           = 'ChatBot'
        this.show_sent_messages = this.getAttribute('show_sent_messages') || false
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

    get save_chat_link() {
        return this.query_selector('#save-chat')
    }

    get target_element_style() {
        return this.target_element?.style
    }

    get target_element_style_computed() {
        return getComputedStyle(this.target_element)
    }

    // connected events
    connectedCallback() {
        new CSS__WebC__Chat_Bot(this).apply_framework()
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
        window.addEventListener('clear_messages'   , (e)=>{ this.handle_clear_messages   (e.detail) })
        window.addEventListener('new_chat_ids'     , (e)=>{ this.handle_new_chat_ids     (e.detail) })

        this.add_event_listener('.maximize-button', 'click', () => this.toggle_maximize())
    }

    create_header() {
        const tag = new Tag()
        const div_chat_header = tag.clone({tag: 'div', class: 'chat-header'})
        const header_content  = new Div ({ class: 'header-content' })
        const header_text     = new Text({ class: 'chat-header-title', value: this.bot_name })
        const maximize_btn    = new Div ({class: 'maximize-button'                 })
        const maximize_icon   = new Icon({class: 'maximize-icon' , icon: 'maximize', })
        maximize_btn.add_element(maximize_icon)

        header_content .add_elements(header_text, maximize_btn)
        div_chat_header.add(header_content)

        return div_chat_header
    }

    div_chatbot_ui() {

        const tag = new Tag()
        const tag_chat_messages = WebC__Chat_Messages.element_name
        const tag_chat_input    = WebC__Chat_Input   .element_name
        const chat_messages__id = 'chat_messages'
        const chat_input__id    = 'chat_input'

        tag.html_config.include_id=false

        const div_chatbot_ui     = tag.clone({tag:'div'            , class:'chatbot-ui'                           })
        const div_chat_ids       = new Tag  ({tag:'div'            , class:'chat-ids'     , id: 'chat_ids'        })
        const webc_chat_messages = new Tag  ({tag:tag_chat_messages, class:'chat-messages', id: chat_messages__id })
        const webc_chat_input    = new Tag  ({tag:tag_chat_input   , class:'chat-input-ui', id: chat_input__id    })

        webc_chat_input   .attributes.channel            = this.channel
        webc_chat_messages.attributes.channel            = this.channel
        webc_chat_messages.attributes.show_sent_messages = this.show_sent_messages
        webc_chat_messages.attributes.edit_mode          = this.edit_mode

        div_chatbot_ui.add(this.create_header())
        div_chatbot_ui.add(div_chat_ids     )
        div_chatbot_ui.add(webc_chat_messages)
        div_chatbot_ui.add(webc_chat_input)

        div_chatbot_ui  .html_config.trim_final_html_code = true
        div_chat_ids.value ='...'
        return div_chatbot_ui
    }

    html_update_chat_ids_value(event_data) {
        if (!event_data) {
            return
        }
        if (event_data?.cbr_chat_id === '') {
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
        const a_save        = new A   ({value: 'save'       , attributes: { href: '#'              , id:'save-chat' , class:'save-chat'}})
        const a_chat        = new A   ({value: 'share chat' , attributes: { href: link__chat       , target:'_blank'}})
        const a_chat_pdf    = new A   ({value: 'share pdf'  , attributes: { href: link__chat_pdf   , target:'_blank'}})
        const a_chat_image  = new A   ({value: 'share image', attributes: { href: link__chat_image , target:'_blank'}})

        div_chat_ids.add_elements( a_save, text_pipe, a_chat, text_pipe, a_chat_pdf, text_pipe, a_chat_image)
        this.chat_ids.innerHTML = div_chat_ids.html()

        this.save_chat_link.addEventListener('click'         , async (event) => this.on_save_chat_click(event, cbr_chat_id))
    }


    build() {
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

    async on_save_chat_click(event, cbr_chat_id) {
        event.preventDefault()
        const url = WebC__Chat_Bot.url_current_user_add_chat_id + cbr_chat_id
        const response = await fetch(url, { method : 'POST'});
        const saved_chat = await response.json()
        if (saved_chat.chat_path === cbr_chat_id) {
            this.save_chat_link.innerHTML = 'saved'
            this.save_chat_link.style.backgroundColor = 'DarkGreen'
            this.save_chat_link.style.fontWeight      = '100'
        }
        else {
            this.save_chat_link.style.backgroundColor = 'DarkRed'
            this.save_chat_link.style.fontWeight      = '100'
            this.save_chat_link.innerHTML             = 'error'
        }
    }

    // Maximize button section

    toggle_maximize() {
        this.is_maximized = !this.is_maximized
        const container = this.query_selector('.chatbot-ui')
        const btn = this.query_selector('.maximize-button')
        const icon = btn.querySelector('.maximize-icon')

        if (this.is_maximized) {
            container.classList.add('maximized')
            icon.textContent = Icon__Mappings.getIcon('minimize')  // Use appropriate icon name
        } else {
            container.classList.remove('maximized')
            icon.textContent = Icon__Mappings.getIcon('maximize')  // Use appropriate icon name
        }
    }


}

WebC__Chat_Bot.define()