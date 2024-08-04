import Web_Component from "../../core/Web_Component.mjs";
import Tag           from "../../core/Tag.mjs";

export default class WebC__Form_Input extends Web_Component {

    constructor() {
        super();
    }

    add_event_listeners() {
        this.text_area.addEventListener("input", this.auto_resize);

    }

    auto_resize() {
        this.style.height = 'auto';               // Reset height to auto to shrink when needed
        this.style.height = this.scrollHeight + 'px'; // Set height to scrollHeight
    }

    connectedCallback() {
        this.build()
    }

    build() {
        this.add_css_rules(this.css_rules__chat_input())
        this.set_inner_html(this.html())
        this.add_event_listeners()
    }

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

    get text_area() {
        return this.query_selector('#text_area')
    }
}

WebC__Form_Input.define()