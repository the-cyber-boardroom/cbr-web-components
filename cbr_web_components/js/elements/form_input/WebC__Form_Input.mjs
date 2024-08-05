import Events__Utils from "../../events/Events__Utils.mjs";
import Web_Component from "../../core/Web_Component.mjs";
import Tag           from "../../core/Tag.mjs";

export default class WebC__Form_Input extends Web_Component {

    constructor() {
        super();
        this.events_utils = new Events__Utils()
        this.channel_id = this.random_id('channel')
        this.channels.push('WebC__Form_Input'     )
        this.channels.push(this.channel_id        )
    }

    // properties
    get text_area() {
        return this.query_selector('#text_area')
    }

    // connection methods
    add_event_listeners() {
        this.text_area.addEventListener                    ('input'       , this.on_auto_resize);
        this.events_utils.events_receive.add_event_listener('set_value'   , this.channel_id, this.on_set_value   )
        this.events_utils.events_receive.add_event_listener('append_value', this.channel_id, this.on_append_value)
    }

    build() {
        this.add_css_rules(this.css_rules__chat_input())
        this.set_inner_html(this.html())
        this.add_event_listeners()
    }

    connectedCallback() {
        this.build()
    }

    disconnectedCallback() {
        this.remove_event_listeners()
    }

    remove_event_listeners() {
        this.text_area.removeEventListener('input' , this.auto_resize)
        this.events_utils.events_receive.remove_all_event_listeners()
    }

    // methods

    css_rules__chat_input() {
        return { "#form_input": { "display"        : "flex"              ,
                                  "align-items"    : "center"            ,
                                  "border"         : "2px solid #9c27b0" ,      // purple border
                                  "border-radius"  : "10px"              ,
                                  "padding"        : "5px"               ,
                                  "margin"         : "10px"              ,
                                  "width"          : "100%"              ,
                                  "box-sizing"     : "border-box"        },     // ensures padding is included in the width

                 "#text_area" : { "width"          : "100%"              ,
                                  "border"         : "none"              ,
                                  "outline"        : "none"              ,
                                  "resize"         : "none"              ,      // removes the bottom right corner resize handle
                                  "font-size"      : "16px"              ,
                                  "padding"        : "10px"              ,
                                  "border-radius"  : "10px"              ,      // same border radius as parent for a uniform look
                                  "box-sizing"     : "border-box"        },

                "#text_area::placeholder": { "color"          : "#9e9e9e",      // grey placeholder text
                                             "font-size"      : "16px"   }}
    }
    html() {
        const div__form_input    = new Tag({tag: 'div'    , id: 'form_input'})
        const text_area          = new Tag({tag:'textarea', id: 'text_area', value:'', attributes:{rows: '1'}})
        div__form_input.add(text_area)
        return div__form_input.html()
    }

    text_area_trigger_input_event() {
        const input_event = new InputEvent('input', { bubbles: true,  cancelable: true, });
        this.text_area.dispatchEvent(input_event)
    }

    text_area_new_height() {
        const line_height  = 20
        const max_height = line_height * 5;
        const new_height = Math.min(this.text_area.scrollHeight, max_height)
        return new_height
    }

    // events
    on_auto_resize = () =>{
        this.text_area.style.height = 'auto';               // Reset height to auto to shrink when needed
        const new_height = this.text_area_new_height()
        this.text_area.style.height = new_height + 'px'; // Set height to scrollHeight
    }

    on_append_value = (event) => {
        let value = event.event_data.value
        this.text_area.value += value
        this.text_area_trigger_input_event()
    }

    on_set_value = (event) => {
        let value = event.event_data.value
        this.text_area.value = value
        this.on_auto_resize()
    }

}

WebC__Form_Input.define()