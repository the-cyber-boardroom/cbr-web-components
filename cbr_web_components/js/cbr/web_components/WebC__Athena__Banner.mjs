import Web_Component        from '../../core/Web_Component.mjs';
import Layout               from '../../css/grid/Layout.mjs';
import CSS__Grid            from '../../css/grid/CSS__Grid.mjs';
import CSS__Typography      from '../../css/CSS__Typography.mjs';
import CSS__Cards           from '../../css/CSS__Cards.mjs';
import H                    from '../../core/H.mjs';
import Div                  from '../../core/Div.mjs';
import Raw_Html             from '../../core/Raw_Html.mjs';

export default class WebC__Athena__Banner extends Web_Component {
    load_attributes() {
        new CSS__Grid       (this).apply_framework()
        new CSS__Typography (this).apply_framework()
        new CSS__Cards      (this).apply_framework()
    }

    async render() {
        let content
        try {
            const response = await fetch('/markdown/render/markdown-file-to-html-and-metadata?path=en/site/athena/banner.md')
            if (!response.ok) throw new Error('Failed to load content')
            content = await response.json()
        } catch (error) {
            console.error('Error loading banner content:', error)
            content = {
                html: '<p>Welcome to Athena</p>',
                metadata: { title: 'Athena' }
            }
        }

        const content_card = new Div     ({ class: 'card'      })
        const content_body = new Div     ({ class: 'card-body' })
        const card_title   = new H       ({ level: 1,  class: 'card-title',  value: content?.metadata?.title})
        const card_text    = new Raw_Html({ class: 'card-text',  value: content?.html })
        content_card.add_element(content_body)
        content_body.add_elements(card_title , card_text)

        this.set_inner_html(content_card.html())
    }
}

WebC__Athena__Banner.define()