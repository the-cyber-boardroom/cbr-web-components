import Web_Component        from '../../core/Web_Component.mjs'
import CSS__Alerts          from "../../css/CSS__Alerts.mjs";
import CSS__Side_Menu       from "../../css/menus/CSS__Side_Menu.mjs"
import CSS__Typography      from '../../css/CSS__Typography.mjs'
import Left_Menu            from "../../css/menus/Left_Menu.mjs"
import Div                  from "../../core/Div.mjs"
import Button               from "../../core/Button.mjs"
import CBR__Left_Logo       from "./CBR__Left_Logo.mjs"
import CBR__Important_Alert from "./CBR__Important_Alert.mjs"



export default class WebC__CBR__Left_Menu extends Web_Component {
    load_attributes() {
        new CSS__Alerts    (this).apply_framework()
        new CSS__Side_Menu (this).apply_framework()
        new CSS__Typography(this).apply_framework()

        this.add_css_rules(CBR__Left_Logo      .css_rules())
        this.add_css_rules(CBR__Important_Alert.css_rules())
        this.add_css_rules(this.css_rules())
        this.minimized          = window.innerWidth < 768                       // Initialize based on window width
        this.mobile_breakpoint  = 768
    }

    add_event_listeners() {
        this.add_event_listener('.toggle-button', 'click', () => this.toggle_menu())
        window.addEventListener('resize'                 , () => this.handle_resize())
    }

    handle_resize() {
        if (window.innerWidth < this.mobile_breakpoint && !this.minimized) {
            this.minimize_menu()
        } else if (window.innerWidth >= this.mobile_breakpoint && this.minimized) {
            this.expand_menu()
        }
    }

    minimize_menu() {
        this.minimized = true
        const menu     = this.query_selector('.left-menu-main')
        const button   = this.query_selector('.toggle-button')
        menu.classList.add('left-menu-minimized')
        button.innerHTML = '→'
        this.dispatch_menu_event()
    }

    expand_menu() {
        this.minimized = false
        const menu = this.query_selector('.left-menu-main')
        const button = this.query_selector('.toggle-button')
        menu.classList.remove('left-menu-minimized')
        button.innerHTML = '←'
        this.dispatch_menu_event()
    }

    toggle_menu() {
        if (this.minimized) {
            this.expand_menu()
        } else {
            this.minimize_menu()
        }
    }

    dispatch_menu_event() {
        const event = new CustomEvent('left-menu-toggle', {
            bubbles  : true                          ,
            composed : true                          ,
            detail   : { minimized: this.minimized }
        })
        this.dispatchEvent(event)
    }
    html() {
        const div_left_menu       = new Div       ({ class: 'left-menu-main'})
        const toggle_button       = new Button    ({class: 'toggle-button', value: '←'})
        const cbr_left_menu       = new Left_Menu ({ menu_items: this.menu_items() })
        const cbr_left_logo       = new CBR__Left_Logo()
        const cbr_important_alert = new CBR__Important_Alert()

        div_left_menu.add_elements(toggle_button, cbr_left_logo, cbr_left_menu, cbr_important_alert)
        return div_left_menu
    }

    menu_items() {
        return [
            { icon: 'home'    , label: 'Home'          , href: '/webc/cbr-webc-dev/home/index'       },
            { icon: 'robot'   , label: 'Athena'        , href: '/webc/cbr-webc-dev/athena/index'     },
            { icon: 'profile' , label: 'Profile'       , href: '/webc/cbr-webc-dev/profile/index'    },
            { icon: 'history' , label: 'Past Chats'    , href: '/webc/cbr-webc-dev/past-chats/index' },
            { icon: 'file'    , label: 'Files'         , href: '/webc/cbr-webc-dev/files/index'      },
            { icon: 'person'  , label: 'Personas'      , href: '/webc/cbr-webc-dev/personas/index'   },
            { icon: 'chat'    , label: 'Chat with LLMs', href: '/webc/cbr-webc-dev/chat/index'       },
            { icon: 'docs'    , label: 'Docs'          , href: '/webc/cbr-webc-dev/docs/index'       }
        ]
    }

    // toggle_menu() {
    //     const menu   = this.query_selector('.left-menu-main')
    //     const button = this.query_selector('.toggle-button')
    //
    //     this.minimized = !this.minimized
    //     menu.classList.toggle('left-menu-minimized')
    //     button.innerHTML = this.minimized ? '→' : '←'
    //
    //     const event = new CustomEvent('left-menu-toggle', {bubbles: true, composed: true,  detail: { minimized: this.minimized }
    // })
    // this.dispatchEvent(event)
    // }

    css_rules() {
        return {
            ".left-menu-main"                       : { transition  : "width 0.3s ease-in-out"    ,
                                                        position      : "relative"                    },

            ".left-menu-minimized"                  : { width           : "60px"                      ,
                                                        paddingTop      : "10px"                      ,
                                                        overflow        : "hidden"                    },

            ".left-menu-minimized .logo-container"  : { display         : "none"                      },
            ".left-menu-minimized .important-alert" : { display         : "none"                      },


            ".toggle-button"                        : { position        : "absolute"                  ,
                                                        right           : "10px"                      ,
                                                        top             : "0px"                       ,
                                                        padding         : "5px"                       ,
                                                        cursor          : "pointer"                   ,
                                                        backgroundColor : "transparent"               ,
                                                        border          : "none"                      ,
                                                        color           : "#666"                       },

            ".toggle-button:hover"                  : { color           : "#000"                      }
        }
    }
}

WebC__CBR__Left_Menu.define()