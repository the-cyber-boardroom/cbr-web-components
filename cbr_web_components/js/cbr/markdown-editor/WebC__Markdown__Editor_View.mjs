// WebC__Markdown__Editor_View.mjs

import Web_Component from '../../core/Web_Component.mjs'
import CSS__Forms    from '../../css/CSS__Forms.mjs'
import CSS__Buttons  from '../../css/CSS__Buttons.mjs'
import CSS__Icons    from '../../css/icons/CSS__Icons.mjs'
import Div           from '../../core/Div.mjs'
import Button        from '../../core/Button.mjs'
import Raw_Html      from '../../core/Raw_Html.mjs'
import Textarea      from '../../core/Textarea.mjs'

export default class WebC__Markdown__Editor_View extends Web_Component {
    load_attributes() {
        new CSS__Forms  (this).apply_framework()
        new CSS__Buttons(this).apply_framework()
        new CSS__Icons  (this).apply_framework()

        this.file_id          = this.getAttribute('file-id'         )
        this.channel          = this.getAttribute('channel'         ) || this.random_id('markdown_editor_view_')
        this.content          = this.getAttribute('content'         ) || ''
        this.edit_mode        = this.getAttribute('edit-mode'       ) === 'true'
        this.viewing_version  = this.getAttribute('viewing-version' )
        this.temp_content     = null
    }

    connectedCallback() {
        super.connectedCallback()
        this.render()
        this.add_event_listeners()
    }

    add_event_listeners() {
        if (this.edit_mode) {
            const editor = this.query_selector('.markdown-editor')
            if (editor) {
                editor.addEventListener('input', (e) => {
                    const preview = this.query_selector('.markdown-preview')
                    preview.innerHTML = marked.marked(e.target.value)
                    this.raise_event_global('content-changed', { content: e.target.value })
                })
            }
        }

        // Version bar button handlers
        if (this.viewing_version) {
            this.query_selector('.restore-version-btn')?.addEventListener('click', () => {
                this.raise_event_global('restore-version', {
                    version_id: this.viewing_version
                })
            })

            this.query_selector('.return-current-btn')?.addEventListener('click', () => {
                this.raise_event_global('return-current')
            })
        }
    }

    render_editor() {
        return new Textarea({
            class: 'markdown-editor',
            value: this.content,
            attributes: {
                spellcheck   : false,
                'data-gramm': false
            }
        })
    }

    render_preview() {
        return new Raw_Html({
            class: 'markdown-preview',
            value: marked.marked(this.content || '')
        })
    }

    render_version_bar() {
        const version_bar = new Div({ class: 'version-bar' })
        version_bar.add_elements(
            new Div({
                class: 'version-message',
                value: 'Viewing previous version'
            }),
            new Button({
                class: 'btn btn-sm btn-success restore-version-btn',
                value: 'Restore This Version'
            }),
            new Button({
                class: 'btn btn-sm btn-secondary return-current-btn',
                value: 'Return to Current'
            })
        )
        return version_bar
    }

    render() {
        const container = new Div({ class: 'editor-view-container' })

        if (this.edit_mode) {
            const split_view = new Div({ class: 'split-view' })
            split_view.add_elements(
                this.render_editor(),
                this.render_preview()
            )
            container.add_element(split_view)
        } else {
            if (this.viewing_version) {
                container.add_element(this.render_version_bar())
            }
            container.add_element(this.render_preview())
        }

        this.set_inner_html(container.html())
        this.add_css_rules(this.css_rules())
    }

    css_rules() {
        return {
            ".editor-view-container": { display          : "flex"                      ,         // Main container
                                      flexDirection    : "column"                    ,
                                      height          : "100%"                      ,
                                      gap             : "1rem"                      },

            ".split-view"          : { display          : "grid"                      ,         // Edit mode view
                                      gridTemplateColumns: "1fr 1fr"                 ,
                                      gap              : "1rem"                      ,
                                      height           : "calc(100vh - 200px)"       ,
                                      minHeight        : "400px"                     },

            ".markdown-editor"     : { width            : "100%"                      ,         // Editor textarea
                                      padding          : "1rem"                      ,
                                      fontSize         : "0.875rem"                  ,
                                      fontFamily       : "monospace"                 ,
                                      lineHeight       : "1.5"                       ,
                                      border           : "1px solid #dee2e6"         ,
                                      borderRadius     : "0.375rem"                  ,
                                      resize           : "none"                      ,
                                      outline          : "none"                      ,
                                      backgroundColor  : "#f8f9fa"                   ,
                                      color            : "#212529"                   },

            ".markdown-preview"    : { padding          : "1rem"                      ,         // Preview pane
                                      overflow         : "auto"                      ,
                                      fontSize         : "0.875rem"                  ,
                                      lineHeight       : "1.6"                       ,
                                      backgroundColor  : "#f8f9fa"                   ,
                                      borderRadius     : "0.375rem"                  },

            ".version-bar"         : { padding          : "0.75rem"                   ,         // Version viewing bar
                                      backgroundColor  : "#fff3cd"                   ,
                                      borderRadius     : "0.375rem"                  ,
                                      display          : "flex"                      ,
                                      alignItems       : "center"                    ,
                                      justifyContent   : "space-between"             },

            ".version-message"     : { fontSize         : "0.875rem"                  ,         // Version message
                                      color            : "#856404"                   },

            // Markdown preview styling
            ".markdown-preview h1" : { fontSize         : "1.75rem"                   ,         // Heading 1
                                      marginBottom     : "1rem"                      ,
                                      borderBottom     : "1px solid #dee2e6"         ,
                                      paddingBottom    : "0.5rem"                    },

            ".markdown-preview h2" : { fontSize         : "1.5rem"                    ,         // Heading 2
                                      marginBottom     : "1rem"                      ,
                                      borderBottom     : "1px solid #dee2e6"         ,
                                      paddingBottom    : "0.5rem"                    },

            ".markdown-preview h3" : { fontSize         : "1.25rem"                   ,         // Heading 3
                                      marginBottom     : "0.75rem"                   },

            ".markdown-preview p"  : { marginBottom     : "1rem"                      },        // Paragraphs

            ".markdown-preview code": { fontFamily      : "monospace"                 ,         // Inline code
                                      backgroundColor  : "#f1f3f5"                   ,
                                      padding          : "0.2em 0.4em"               ,
                                      borderRadius     : "0.25rem"                   },

            ".markdown-preview pre": { backgroundColor  : "#f8f9fa"                   ,         // Code blocks
                                     padding          : "1rem"                      ,
                                     borderRadius     : "0.375rem"                  ,
                                     marginBottom     : "1rem"                      ,
                                     overflow         : "auto"                      }
        }
    }
}

WebC__Markdown__Editor_View.define()