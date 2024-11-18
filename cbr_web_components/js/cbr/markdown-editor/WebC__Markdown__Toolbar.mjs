// WebC__Markdown__Toolbar.mjs

import Web_Component from '../../core/Web_Component.mjs'
import CSS__Buttons  from '../../css/CSS__Buttons.mjs'
import CSS__Icons    from '../../css/icons/CSS__Icons.mjs'
import Div           from '../../core/Div.mjs'
import Button        from '../../core/Button.mjs'
import Icon          from '../../css/icons/Icon.mjs'
import CBR_Events from "../CBR_Events.mjs";

export default class WebC__Markdown__Toolbar extends Web_Component {

    event__toggle_versions = 'versions-toggle'

    apply_css() {
        new CSS__Buttons(this).apply_framework()
        new CSS__Icons  (this).apply_framework()
        this.add_css_rules(this.css_rules())
    }

    load_attributes() {

        this.file_id        = this.getAttribute('file-id')
        this.channel        = this.getAttribute('channel') || this.random_id('markdown_toolbar_')
        this.edit_mode      = this.getAttribute('edit-mode') === 'true'
        this.view_mode      = this.getAttribute('view-mode') || 'content'
    }

    // connectedCallback() {
    //     super.connectedCallback()
    //     this.add_event_listeners()
    //     this.add_event_handlers()
    // }

    add_event_listeners() {
        window.addEventListener('editor-state-change', (event) => {
            if (event.detail.file_id === this.file_id) {
                this.edit_mode = event.detail.edit_mode
                this.view_mode = event.detail.view_mode
                this.render()
            }
        })
    }

    add_event_handlers() {
        // // Edit mode buttons
        // if (this.edit_mode) {
        //     this.query_selector('.save-btn'  ).addEventListener('click', () => this.raise_toolbar_event('editor-save'  ))
        //     this.query_selector('.cancel-btn').addEventListener('click', () => this.raise_toolbar_event('editor-cancel'))
        // } else {
        //     this.query_selector('.edit-btn')?.addEventListener('click', () => this.raise_toolbar_event('editor-edit'  ))
        // }

        // Versions toggle
        //this.query_selector('.versions-btn').addEventListener('click', () => this.raise_toolbar_event(this.event__toggle_versions))
        //this.add_event_listener('.versions-btn', 'click', () => this.raise_toolbar_event(CBR_Events.CBR__FILE__SHOW_HISTORY))
        this.add_event__on_click('.edit-btn'    , this.raise_toolbar_event, {event_name: CBR_Events.CBR__FILE__EDIT         })
        this.add_event__on_click('.versions-btn', this.raise_toolbar_event, {event_name: CBR_Events.CBR__FILE__SHOW_HISTORY })
    }

    raise_toolbar_event({event_name}) {
        this.raise_event_global(event_name, { file_id  : this.file_id })
    }

    html() {
        const markdown_toolbar = new Div({ class: 'markdown-toolbar' })
        const left_group       = new Div({ class: 'left-group'       })
        const right_group      = new Div({ class: 'right-group'      })

        if (this.edit_mode) {
            const save_btn = new Button({
                class: 'btn btn-success save-btn',
                value: 'Save Changes'
            })
            save_btn.add_element(new Icon({
                icon   : 'save',
                size   : 'sm',
                spacing: 'right'
            }))

            const cancel_btn = new Button({
                class: 'btn btn-secondary cancel-btn',
                value: 'Cancel'
            })
            cancel_btn.add_element(new Icon({
                icon   : 'cross',
                size   : 'sm',
                spacing: 'right'
            }))

            left_group.add_elements(save_btn, cancel_btn)
        } else {
            const edit_btn = new Button({
                class: 'btn btn-primary edit-btn',
                value: 'Edit'
            })
            edit_btn.add_element(new Icon({
                icon   : 'edit',
                size   : 'sm',
                spacing: 'right'
            }))
            left_group.add_element(edit_btn)
        }

        const versions_btn = new Button({class: 'btn btn-outline-secondary versions-btn',
                                         value: this.view_mode === 'content' ? 'Show History' : 'Hide History'})
        versions_btn.add_element(new Icon({ icon   : 'history',  size   : 'sm',  spacing: 'right' }))
        right_group.add_element(versions_btn)

        markdown_toolbar.add_elements(left_group, right_group)
        return markdown_toolbar
    }

    css_rules() {
        return {
            ".markdown-toolbar"    : { display         : "flex"                      ,          // Main toolbar
                                       justifyContent  : "space-between"             , // Ensures the groups are at opposite ends
                                       padding         : "0.5rem 0"                  ,
                                       borderBottom    : "1px solid #dee2e6"         ,
            },

            // Button states
            ".btn-secondary:hover": { backgroundColor : "#6c757d"                   ,          // Hover states
                                    borderColor    : "#6c757d"                   },

            ".btn-primary:hover" : { backgroundColor : "#0b5ed7"                   ,
                                    borderColor    : "#0b5ed7"                   },

            ".btn-success:hover" : { backgroundColor : "#157347"                   ,
                                    borderColor    : "#157347"                   },

            // Active states for toggle buttons
            ".versions-btn.active": { backgroundColor : "#6c757d"                   ,          // Active state
                                    color           : "#fff"                      }
        }
    }
}

WebC__Markdown__Toolbar.define()