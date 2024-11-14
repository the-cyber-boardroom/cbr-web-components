import Web_Component        from '../../core/Web_Component.mjs'
import CSS__Side_Menu       from "../../css/menus/CSS__Side_Menu.mjs"
import CSS__Typography      from '../../css/CSS__Typography.mjs'
import Left_Menu            from "../../css/menus/Left_Menu.mjs"
import Div                  from "../../core/Div.mjs"
import CBR__Left_Logo       from "../elements/CBR__Left_Logo.mjs"
import CBR__Left_Footer     from "../elements/CBR__Left_Footer.mjs"
import CBR__Important_Alert from "../elements/CBR__Important_Alert.mjs"

export default class WebC__CBR__Left_Menu extends Web_Component {
    load_attributes() {
        new CSS__Side_Menu (this).apply_framework()
        new CSS__Typography(this).apply_framework()

        this.add_css_rules(CBR__Left_Logo      .css_rules())
        this.add_css_rules(CBR__Left_Footer    .css_rules())
        this.add_css_rules(CBR__Important_Alert.css_rules())
        this.add_css_rules(this.css_rules())
    }

    render() {
        const div_left_menu = new Div({ class: 'left-menu-main'})
        div_left_menu.value = 'Menu will go here'
        // this.add_element(new CBR__Left_Logo())
        // this.add_element(new Left_Menu({ menu_items: this.menu_items() }))
        // this.add_element(new CBR__Important_Alert())
        // this.add_element(new CBR__Left_Footer())
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

    css_rules() {
        return {
            ":host"             : { display         : "flex"                      ,
                                  flexDirection    : "column"                    ,
                                  height          : "100%"                      ,
                                  width           : "100%"                      ,
                                  backgroundColor : "#ffffff"                   },

            ":host > *"         : { flexShrink      : "0"                        }  // Prevent children from shrinking
        }
    }
}

WebC__CBR__Left_Menu.define()