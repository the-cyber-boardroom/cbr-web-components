import CBR_Events                  from '../CBR_Events.mjs'
import Web_Component               from '../../core/Web_Component.mjs'
import CSS__Forms                  from '../../css/CSS__Forms.mjs'
import CSS__Buttons                from '../../css/CSS__Buttons.mjs'
import CSS__Icons                  from '../../css/icons/CSS__Icons.mjs'
import API__User_Data__Files       from '../api/API__User_Data__Files.mjs'
import Div                         from '../../core/Div.mjs'
import Button                      from '../../core/Button.mjs'
import Raw_Html                    from '../../core/Raw_Html.mjs'
import Textarea                    from '../../core/Textarea.mjs'
import Icon                        from '../../css/icons/Icon.mjs'
import CSS__Markdown__Editor       from "./CSS__Markdown__Editor.mjs";
import WebC__Versions__Panel       from "./WebC__Versions__Panel.mjs";
import WebC__Markdown__Toolbar     from "./WebC__Markdown__Toolbar.mjs";
import WebC__Markdown__Editor_View from "./WebC__Markdown__Editor_View.mjs";

export default class WebC__User_Files__Markdown__Editor extends Web_Component {

    load_attributes() {
        new CSS__Forms           (this).apply_framework()
        new CSS__Buttons         (this).apply_framework()
        new CSS__Icons           (this).apply_framework()
        new CSS__Markdown__Editor(this).apply_framework()
        
        this.api         = new API__User_Data__Files()
        this.file_id     = this.getAttribute('file_id') || '970804a2-88d8-41d6-881e-e1c5910b80f8'
        this.edit_mode   = false
        this.view_mode   = 'content'  // 'content' or 'versions'
    }

    async connectedCallback() {
        this.load_attributes()
        await this.build()
        this.add_event_listeners()
    }

    add_event_listeners() {
        this.add_window_event_listener(CBR_Events.CBR__FILE__SHOW_HISTORY, this.toggle_view_mode)
        this.add_window_event_listener(CBR_Events.CBR__FILE__CANCEL      , this.on_file_cancel)

    }

    async build() {
        this.render()
        this.add_web_components()
        this.update_ui()
        this.raise_file_load_event()
    }

    add_web_components() {
        const params_versions = { file_id: this.file_id }
        const params_editor   = { file_id: this.file_id }
        this.add_web_component_to('.versions-container', WebC__Versions__Panel      , params_versions)
        this.add_web_component_to('.editor-toolbar'    , WebC__Markdown__Toolbar    , {}             )
        this.add_web_component_to('.viewer-and-editor' , WebC__Markdown__Editor_View, params_editor  )
    }
    // event handlers

    on_file_cancel() {
        this.raise_event_global(CBR_Events.CBR__FILE__VIEW_MODE)
    }

    raise_file_load_event() {
        if (this.file_id) {
            this.raise_event_global(CBR_Events.CBR__FILE__LOAD, {file_id: this.file_id})
        }
    }

    // API Calls

    // todo: refactor to data file
    async view_version(version_id) {
        try {
            const version_content = await this.api.get_version_content(this.file_id, version_id)
            this.temp_content = this.markdown_content  // Store current content
            this.markdown_content = version_content
            this.viewing_version = version_id
            this.edit_mode = true
            this.view_mode = 'content'  // Switch to content view
            this.render()
        } catch (error) {
            console.error('Error viewing version:', error)
            //this.show_error('Failed to load version')
        }
    }

    async restore_version(version_id) {
        try {
            const version_content = await this.api.get_version_content(this.file_id, version_id)
            this.markdown_content = version_content
            await this.save_content()
            this.viewing_version = null
            this.view_mode = 'content'  // Switch to content view
            this.render()
            //this.show_success('Version restored successfully')
        } catch (error) {
            console.error('Error restoring version:', error)
            //this.show_error('Failed to restore version')
        }
    }

    // UI Methods

    toggle_view_mode() {
        this.view_mode = this.view_mode === 'content' ? 'versions' : 'content'
        this.update_ui()
    }

    update_ui() {
        if (this.view_mode === 'versions') {
            this.query_selector('.versions-container').show()
        }
        else {
            this.query_selector('.versions-container').hide()
        }
    }

    render() {
        const container            = new Div({ class: 'markdown-container' })
        const editor_container     = new Div({ class: 'editor-container' })
        const editor_toolbar       = new Div({ class: 'editor-toolbar' })
        const preview_and_versions = new Div({ class: 'preview-and-versions' })
        const viewer_and_editor    = new Div({ class: 'viewer-and-editor' })
        const versions_container   = new Div({ class: 'versions-container' })

        preview_and_versions.add_elements(viewer_and_editor, versions_container)
        editor_container    .add_elements(preview_and_versions                 )
        container           .add_elements(editor_toolbar,  editor_container    )

        this.set_inner_html(container.html())
    }
}

WebC__User_Files__Markdown__Editor.define()