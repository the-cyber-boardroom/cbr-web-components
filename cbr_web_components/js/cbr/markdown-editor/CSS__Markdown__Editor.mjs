export default class CSS__Markdown__Editor {
    constructor(target_element) {
        this.target_element = target_element
    }

    apply_framework() {
        if (this.target_element) {
            this.target_element.add_css_rules(this.css_rules__standard())
        }
    }

    css_rules__standard() {
        return {
            ".markdown-container"   : { height          : "100%"                      ,         // Main container
                                        display         : "flex"                      ,
                                        flexDirection   : "column"                    ,
                                        backgroundColor : "#fff"                      ,
                                        borderRadius    : "0.375rem"                  ,
                                        boxShadow       : "0 2px 4px rgba(0,0,0,0.1)" },

            ".editor-container"     : { flex            : "1"                         ,         // Editor wrapper
                                        display         : "flex"                      ,
                                        flexDirection   : "column"                    ,
                                        padding         : "1rem"                      ,
                                        gap             : "1rem"                      },

            ".editor-toolbar"       : { display         : "flex"                      ,         // Toolbar
                                        justifyContent  : "space-between"             ,
                                        alignItems      : "center"                    ,
                                        padding         : "0.5rem 0"                  ,
                                        borderBottom    : "1px solid #dee2e6"         ,
                                        marginBottom    : "1rem"                      },

            ".toolbar-group"        : { display         : "flex"                      ,         // Button groups
                                        gap             : "0.5rem"                    },

            ".split-view"          : { display         : "grid"                      ,         // Edit mode view
                                        gridTemplateColumns: "1fr 1fr"                ,
                                        gap             : "1rem"                      ,
                                        height          : "calc(100vh - 200px)"       ,
                                        minHeight       : "400px"                     },

            ".markdown-editor"      : { width           : "100%"                      ,         // Editor textarea
                                        padding         : "1rem"                      ,
                                        fontSize        : "0.875rem"                  ,
                                        fontFamily      : "monospace"                 ,
                                        lineHeight      : "1.5"                       ,
                                        border          : "1px solid #dee2e6"         ,
                                        borderRadius    : "0.375rem"                  ,
                                        resize          : "none"                      },

            ".markdown-preview"     : { padding         : "1rem"                      ,         // Preview pane
                                        overflow        : "auto"                      ,
                                        fontSize        : "0.875rem"                  ,
                                        lineHeight      : "1.6"                       ,
                                        backgroundColor : "#f8f9fa"                   ,
                                        borderRadius    : "0.375rem"                  },

            ".error-message"        : { display         : "none"                      ,         // Error alerts
                                        color           : "#dc3545"                   ,
                                        padding         : "0.75rem"                   ,
                                        marginBottom    : "1rem"                      ,
                                        backgroundColor : "#f8d7da"                   ,
                                        borderRadius    : "0.375rem"                  ,
                                        fontSize        : "0.875rem"                  },

            ".success-message"      : { color           : "#155724"                   ,         // Success alerts
                                        backgroundColor : "#d4edda"                   ,
                                        padding         : "0.75rem"                   ,
                                        marginBottom    : "1rem"                      ,
                                        borderRadius    : "0.375rem"                  ,
                                        fontSize        : "0.875rem"                  },

            ".versions-list"        : { display         : "flex"                      ,         // Version list
                                        flexDirection   : "column"                    ,
                                        gap             : "0.75rem"                   },

            ".version-item"         : { padding         : "1rem"                      ,         // Version items
                                        backgroundColor : "#f8f9fa"                   ,
                                        borderRadius    : "0.375rem"                  ,
                                        border          : "1px solid #dee2e6"         ,
                                        display         : "flex"                      ,
                                        justifyContent  : "space-between"             ,
                                        alignItems      : "center"                    },

            ".version-item.current" : { borderColor     : "#0d6efd"                   ,         // Current version
                                        borderWidth     : "2px"                       },

            ".version-header"       : { display         : "flex"                      ,         // Version header
                                        alignItems      : "center"                    ,
                                        gap             : "0.5rem"                    ,
                                        marginBottom    : "0.25rem"                   },

            ".version-number"       : { fontWeight      : "600"                       ,         // Version number
                                        color           : "#212529"                   },

            ".version-status"       : { fontSize        : "0.75rem"                   ,         // Version status
                                        color           : "#198754"                   ,
                                        fontWeight      : "500"                       },

            ".version-datetime"     : { display         : "flex"                      ,         // Date/time info
                                        gap             : "0.5rem"                    ,
                                        fontSize        : "0.875rem"                  ,
                                        color           : "#6c757d"                   ,
                                        marginBottom    : "0.25rem"                   },

            ".version-size"         : { fontSize        : "0.75rem"                   ,         // File size
                                       color           : "#6c757d"                   },

            ".version-actions"      : { display         : "flex"                      ,         // Version actions
                                        gap             : "0.5rem"                    ,
                                        alignItems      : "center"                    },

            ".version-bar"          : { padding         : "0.75rem"                   ,         // Version viewing bar
                                        backgroundColor : "#fff3cd"                   ,
                                        borderRadius    : "0.375rem"                  ,
                                        display         : "flex"                      ,
                                        alignItems      : "center"                    ,
                                        justifyContent  : "space-between"             ,
                                        marginTop       : "1rem"                      },

            ".version-message"      : { fontSize        : "0.875rem"                  ,         // Version messages
                                        color           : "#856404"                   },

            ".preview-and-versions" : { display         : "flex"                      ,         // Layout structure
                                        flexDirection   : "row"                       ,
                                        padding         : "10px"                      },

            ".versions-container"   : { flex            : "1"                         ,         // Versions panel
                                        overflow        : "auto"                      ,
                                        maxWidth        : "250px"                     ,
                                        padding         : "10px"                      },

            ".viewer-and-editor"    : { flex            : "1"                         ,         // Main content area
                                        padding         : "10px"                      },

            // Markdown preview styling
            ".markdown-preview h1"  : { fontSize        : "1.75rem"                   ,         // Heading 1
                                        marginBottom    : "1rem"                      ,
                                        borderBottom    : "1px solid #dee2e6"         ,
                                        paddingBottom   : "0.5rem"                    },

            ".markdown-preview h2"  : { fontSize        : "1.5rem"                    ,         // Heading 2
                                        marginBottom    : "1rem"                      ,
                                        borderBottom    : "1px solid #dee2e6"         ,
                                        paddingBottom   : "0.5rem"                    },

            ".markdown-preview h3"  : { fontSize        : "1.25rem"                   ,         // Heading 3
                                        marginBottom    : "0.75rem"                   },

            ".markdown-preview p"   : { marginBottom    : "1rem"                      },        // Paragraphs

            ".markdown-preview code": { fontFamily      : "monospace"                 ,         // Inline code
                                        backgroundColor : "#f1f3f5"                   ,
                                        padding         : "0.2em 0.4em"               ,
                                        borderRadius    : "0.25rem"                   },

            ".markdown-preview pre" : { backgroundColor : "#f8f9fa"                   ,         // Code blocks
                                        padding         : "1rem"                      ,
                                        borderRadius    : "0.375rem"                  ,
                                        marginBottom    : "1rem"                      ,
                                        overflow        : "auto"                      }
        }
    }
}