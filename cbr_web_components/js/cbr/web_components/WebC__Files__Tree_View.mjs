// WebC__Files__Tree_View.mjs
import Web_Component    from '../../core/Web_Component.mjs'
import CSS__Tree_View  from '../../css/tree_view/CSS__Tree_View.mjs'
import CSS__Icons      from '../../css/icons/CSS__Icons.mjs'
import Icon            from '../../css/icons/Icon.mjs'
import API__Invoke     from '../../data/API__Invoke.mjs'
import Div             from '../../core/Div.mjs'
import Button          from '../../core/Button.mjs'

export default class WebC__Files__Tree_View extends Web_Component {
    load_attributes() {
        new CSS__Tree_View(this).apply_framework()
        new CSS__Icons    (this).apply_framework()
        this.api_invoke = new API__Invoke()
        this.data      = null
    }

    async connectedCallback() {
        super.connectedCallback()
        await this.load_data()
        this.render()
        this.add_event_listeners()
    }

    async load_data() {
        try {
            this.data = await this.api_invoke.invoke_api('/api/user-data/files/json-view')
        } catch (error) {
            console.error('Error loading file structure:', error)
            this.data = { node_type: 'folder', children: [], files: [] }
        }
    }

    create_tree_item(node, level = 0) {
        const item_div = new Div({ class: 'tree-item' })
        const content  = new Div({ class: 'tree-item-content' })

        if (node === null) {
            return item_div
        }

        // Create expand/collapse icon for folders
        if (node.node_type === 'folder') {
            const is_root = node.parent_id === null                   // Check if this is root node
            const chevron = new Icon({
                icon : 'chevron-right',
                class: `tree-item-icon ${node.children?.length ? '' : 'hidden'} ${is_root ? 'tree-item-expanded' : ''}`
            })
            content.add_element(chevron)

            const folder_icon = new Icon({
                icon : 'folder',
                class: 'tree-item-icon folder-icon'
            })
            content.add_element(folder_icon)

            // Add children container for folders
            const children = new Div({
                class: `tree-children ${is_root ? '' : 'tree-folder-closed'}`,  // Don't add closed class for root
                id   : `folder-${node.node_id}`
            })

            // Add child folders
            node.children?.forEach(child => {
                children.add_element(this.create_tree_item(child, level + 1))
            })

            // Add files
            node.files?.forEach(file => {
                children.add_element(this.create_tree_item(file, level + 1))
            })

            item_div.add_elements(content)
            item_div.add_element(children)

        } else {
            const file_icon = new Icon({
                icon : 'file',
                class: 'tree-item-icon file-icon'
            })
            content.add_element(file_icon)
            item_div.add_elements(content)
        }

        // Add text element
        const text = new Div({
            class: 'tree-item-text',
            value: node.name
        })
        content.add_element(text)

        // Add actions
        const actions = new Div({ class: 'tree-item-actions' })
        if (node.node_type === 'folder') {
            const add_button = new Button({class: 'tree-item-button'})
            const plus_icon  = new Icon({ icon: 'plus' })
            add_button.add_element(plus_icon)
            actions   .add_element(add_button)
        }

        const delete_button = new Button({class: 'tree-item-button',})
        const trash_icon    = new Icon({ icon: 'trash' })
        delete_button.add_element(trash_icon)
        actions      .add_element(delete_button)

        content.add_element(actions)

        return item_div
    }
    create_tree_item_2(node, level = 0) {
        const item_div = new Div({ class: 'tree-item' })
        const content  = new Div({ class: 'tree-item-content' })

        if (node === null) {
            return item_div
        }
        // Create expand/collapse icon for folders
        if (node.node_type === 'folder') {
            const chevron = new Icon({
                icon : 'chevron-right',
                class: `tree-item-icon ${node.children?.length ? '' : 'hidden'}`
            })
            content.add_element(chevron)

            const folder_icon = new Icon({icon : 'folder', class: 'tree-item-icon folder-icon'})
            content.add_element(folder_icon)
        } else {
            const file_icon = new Icon({icon : 'file',  class: 'tree-item-icon file-icon'})
            content.add_element(file_icon)
        }

        const text = new Div({
            class: 'tree-item-text',
            value: node.name
        })
        content.add_element(text)

        // Add actions
        // const actions = new Div({ class: 'tree-item-actions' })
        // if (node.node_type === 'folder') {
        //     const add_button = new Button({ class: 'tree-item-button'})
        //     const plus_icon  = new Icon({ icon: 'plus' })
        //     add_button.add_element(plus_icon)
        //     actions   .add_element(add_button)
        // }
        //
        // const delete_button = new Button({class: 'tree-item-button' })
        // const trash_icon  = new Icon({ icon: 'trash' })
        // delete_button.add_element(trash_icon   )
        // actions      .add_element(delete_button)

        //item_div.add_elements(content, actions)
        item_div.add_elements(content)

        // Add children container for folders
        if (node.node_type === 'folder') {
            const children = new Div({
                class: 'tree-children tree-folder-closed',
                id   : `folder-${node.node_id}`
            })

            // Add child folders
            node.children?.forEach(child => {
                children.add_element(this.create_tree_item(child, level + 1))
            })

            // Add files
            node.files?.forEach(file => {
                children.add_element(this.create_tree_item(file, level + 1))
            })

            item_div.add_element(children)
        }

        return item_div
    }

    add_event_listeners() {
        this.shadowRoot.querySelectorAll('.tree-item').forEach(item => {
            const chevron = item.querySelector('.tree-item-icon')
            if (chevron && !chevron.classList.contains('hidden')) {
                chevron.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const children = item.querySelector('.tree-children')
                    children.classList.toggle('tree-folder-closed')
                    chevron.classList.toggle('tree-item-expanded')
                })
            }
        })
    }

    render() {
        const tree = new Div({ class: 'tree-view' })
        tree.add_element(this.create_tree_item(this.data))
        this.set_inner_html(tree.html())
    }
}

WebC__Files__Tree_View.define()