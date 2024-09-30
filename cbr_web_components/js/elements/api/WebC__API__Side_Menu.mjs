import A                          from "../../core/A.mjs";
import Div                        from "../../core/Div.mjs";
import WebC__API_Markdown_To_Html from "./WebC__API_Markdown_To_Html.mjs";

export default class WebC__API__Side_Menu extends WebC__API_Markdown_To_Html {

    static url__api__data_file     = '/markdown/static_content/data-file?path='
    static data_file__default_menu = 'en/web-pages/dev/web-components/api/side-menu/side-menu-1.toml'

  // base class methods overrides
    async connectedCallback() {
        super.connectedCallback();
    }

    async load_attributes() {
        super.load_attributes();
        this.data_file = this.getAttribute('data_file') || WebC__API__Side_Menu.data_file__default_menu ;
    }

    async setup() {
        this.menu_data = null
        await super.setup()
        await this.load_menu_data()

        await this.load_material_icons()
    }

  // class methods

    async load_material_icons() {
         this.css_load_result = await this.load_libraries__css.load_material_design()
    }

    async build() {
        this.renderMenu();
    }

    static class__side_menu           = 'side_menu_section';
    static class__side_menu_item      = 'side_menu_item';
    static class__side_menu_link      = 'side_menu_link';
    static class__side_menu_icon      = 'side_menu_icon';
    static class__side_menu_text      = 'side_menu_text';

    renderMenu() {
        const currentPath   = window.location.pathname;
        const div_side_menu = new Div({class: WebC__API__Side_Menu.class__side_menu})
        for (const key in this.menu_data) {
            const item = this.menu_data[key];
            if (item.visibility !== true){
                continue
            }
            let class_icon            = `mdi me-2 ${item.icon} ${WebC__API__Side_Menu.class__side_menu_icon}`
            let class__side_menu_item = WebC__API__Side_Menu.class__side_menu_item
            let class__side_menu_link = WebC__API__Side_Menu.class__side_menu_link
            let class__side_menu_text = WebC__API__Side_Menu.class__side_menu_text

            if (currentPath.endsWith(item.href)) {
                class__side_menu_item += '_active'                  // todo: fix this '_active' hack to deal with current lack for support for nested css rules
                class__side_menu_link += '_active'
                class__side_menu_text += '_active'
            }
            const div_side_menu_item  = new Div({class: class__side_menu_item   })
            const a_side_menu_link    = new A  ({class: class__side_menu_link   , attributes: {href: item.href}})
            const i_side_menu_icon    = new Div({class: class_icon              })
            const div_side_menu_text  = new Div({class: class__side_menu_text   , value: item.text })
            a_side_menu_link  .add_elements(i_side_menu_icon, div_side_menu_text)
            div_side_menu_item.add_element (a_side_menu_link                    )
            div_side_menu     .add_element (div_side_menu_item                  )

        }
        this.set_inner_html(div_side_menu.html())
    }

    css_rules() {
        return {
            [`.${WebC__API__Side_Menu.class__side_menu}`]: {
                'width'             : '210px'           ,
                //'height'            : '100vh',
            },
            [`.${WebC__API__Side_Menu.class__side_menu_item}`]: {
                'display'        : 'flex',
                'align-items'    : 'center',
                'padding'        : '8px 0px 8px 5px',
                'margin'         : '0px 15px',
                'cursor'         : 'pointer',
                'border-radius'  : '4px',
            },
            [`.${WebC__API__Side_Menu.class__side_menu_item}_active`]: {
                'display'         : 'flex',
                'align-items'     : 'center',
                'padding'         : '4px 0px 4px 5px',
                'margin'          : '0px 15px',
                'cursor'          : 'pointer',
                'border-radius'   : '5px',
                'background-color': '#26c6da',
            },
            [`.${WebC__API__Side_Menu.class__side_menu_link}`]: {
                'display'        : 'flex',
                'align-items'    : 'center',
                'text-decoration': 'none',
                'color'          : '#96a5ac' ,
                'width'          : '100%',
                // '.active' : {                                            // todo: this need fix on Web_Component.create_stylesheet_from_css_rules()
                //     'background-color': 'red'
                // }
            },
            [`.${WebC__API__Side_Menu.class__side_menu_link}_active`]: {       // short term hack to deal with prob with nested css rules
                'display'         : 'flex'   ,
                'align-items'     : 'center' ,
                'text-decoration' : 'none'   ,
                'color'           : '#FFFFFF',
                'width'           : '100%'   ,
            },
            [`.${WebC__API__Side_Menu.class__side_menu_link}:hover`]: {
                'color': '#26c6da',
            },

            [`.${WebC__API__Side_Menu.class__side_menu_icon}`]: {
                'font-size'   : '20px', // Adjust icon size
                'margin-right': '12px',
            },

            [`.${WebC__API__Side_Menu.class__side_menu_text}`]: {
                'font-size'      : '15px',
                'font-weight'    : '100',
                'color'          : '#54667a',
            },
            [`.${WebC__API__Side_Menu.class__side_menu_text}_active`]: {
                'font-size'      : '15px',
                'font-weight'    : '400',
                'color'          : '#FFFFFF',
            },
            [`.${WebC__API__Side_Menu.class__side_menu_text}:hover`]: {
                'color'         : '#26c6da',
            },
        };
    }


    //todo: replace this with dynamic data

    async load_menu_data() {
        const url_data = WebC__API__Side_Menu.url__api__data_file + this.data_file
        const method   = 'GET'
        this.menu_data = await this.api_invoke.invoke_api(url_data, method)
    }
}

WebC__API__Side_Menu.define()
