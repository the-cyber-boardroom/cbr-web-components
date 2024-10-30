export default class Icon__Mappings {
    static ARROWS = {
        'arrow-left'    : '←',
        'arrow-right'   : '→',
        'arrow-up'      : '↑',
        'arrow-down'    : '↓',
        'arrow-refresh' : '↻',
        'arrow-repeat'  : '↺',
        'arrow-forward' : '⟶',
        'arrow-back'    : '⟵',
        'chevron-left'  : '‹',
        'chevron-right' : '›',
        'chevron-up'    : '∧',
        'chevron-down'  : '∨'
    }

    static UI_ELEMENTS = {
        'close'         : '×',
        'plus'          : '+',
        'minus'         : '−',
        'check'         : '✓',
        'cross'         : '✕',
        'menu'          : '☰',
        'edit'          : '✎',
        'search'        : '🔍',
        'settings'      : '⚙',
        'more'          : '…'
    }

    static SHAPES = {
        'star'          : '★',
        'star-empty'    : '☆',
        'heart'         : '♥',
        'heart-empty'   : '♡',
        'circle'        : '●',
        'circle-empty'  : '○',
        'square'        : '■',
        'square-empty'  : '□',
        'triangle'      : '▲',
        'triangle-down' : '▼'
    }

    static STATUS = {
        'info'          : 'ℹ',
        'warning'       : '⚠',
        'error'         : '✖',
        'success'       : '✔',
        'lock'          : '🔒',
        'unlock'        : '🔓',
        'flag'          : '⚑'
    }

    static MEDIA = {
        'play'          : '▶',
        'pause'         : '⏸',
        'stop'          : '⏹',
        'skip-forward'  : '⏭',
        'skip-back'     : '⏮',
        'volume'        : '🔊',
        'mute'          : '🔇'
    }

    static WEATHER = {
        'sun'           : '☀',
        'moon'          : '☽',
        'cloud'         : '☁',
        'umbrella'      : '☂',
        'temperature'   : '🌡'
    }

    static COMMUNICATION = {
        'mail'          : '✉',
        'phone'         : '📞',
        'comment'       : '💬',
        'notification'  : '🔔'
    }

    static FILES = {
        'folder'        : '📁',
        'file'          : '📄',
        'save'          : '💾',
        'trash'         : '🗑',
        'attachment'    : '📎',
        'bookmark'      : '🔖'
    }

    static TIME = {
        'clock'         : '🕐',
        'calendar'      : '📅',
        'hourglass'     : '⌛',
        'alarm'         : '⏰'
    }

    static MISC = {
        'link'          : '🔗',
        'infinity'      : '∞',
        'wifi'          : '📶',
        'bluetooth'     : '⌘',
        'battery'       : '🔋',
        'location'      : '📍',
        'logout'        : '⏏️',
        'home'          : '🏠',
        'robot'         : '🤖',
        'person'        : '👤',
        'history'       : '↻',
        'profile'       : '👤',
        'chat'          : '💬',
        'docs'          : '📄',
        'undo'          : '↩️',
        'user'          : '👤',
    }

    // Combine all categories into a single map
    static get ALL() {
        return {
            ...this.ARROWS,
            ...this.UI_ELEMENTS,
            ...this.SHAPES,
            ...this.STATUS,
            ...this.MEDIA,
            ...this.WEATHER,
            ...this.COMMUNICATION,
            ...this.FILES,
            ...this.TIME,
            ...this.MISC,
        }
    }

    // Helper method to get icon by name
    static getIcon(name) {
        return this.ALL[name] || name
    }

    // Helper method to get all icons in a category
    static getCategory(category) {
        return this[category] || {}
    }

    // Helper method to get available categories
    static getCategories() {
        return ['ARROWS'        ,
                'UI_ELEMENTS'   ,
                'SHAPES'        ,
                'STATUS'        ,
                'MEDIA'         ,
                'WEATHER'       ,
                'COMMUNICATION' ,
                'FILES'         ,
                'TIME'          ,
                'MISC'          ]
    }
}