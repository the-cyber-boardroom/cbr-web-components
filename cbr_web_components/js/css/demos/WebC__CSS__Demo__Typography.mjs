import Web_Component from "../../core/Web_Component.mjs";
import Div           from '../../core/Div.mjs';
import H             from '../../core/H.mjs';
import HR            from '../../core/HR.mjs';
import P             from '../../core/P.mjs';
import Text          from '../../core/Text.mjs';


export default class WebC__CSS__Demo__Typography extends Web_Component {

    css_mappings = { 'bootstrap'       : 'css_rules__bootstrap',
                     'foundation'      : 'css_rules__foundation',
                     'tailwind'        : 'css_rules__tailwind',
                     'material-design' : 'css_rules__material_design' }
    framework = null

    load_attributes() {
        this.framework = this.getAttribute('framework')
    }

    apply_framework() {
        if (this.framework) {
            const css_method = this.css_mappings[this.framework]
            if (css_method && typeof this[css_method] === 'function') {
                this.add_css_rules(this[css_method]())
            }
        }
    }

    render() {
        let div_root = new Div({id: 'typography-demo'})

        // Headings Section
        let h_headings = new H({level: 2, value: 'Headings'})
        let headings = [
            new H({level: 1, value: 'h1. heading'}),
            new H({level: 2, value: 'h2. heading'}),
            new H({level: 3, value: 'h3. heading'}),
            new H({level: 4, value: 'h4. heading'}),
            new H({level: 5, value: 'h5. heading'}),
            new H({level: 6, value: 'h6. heading'})
        ]

        // Display Headings Section
        let h_display = new H({level: 2, value: 'Display Headings'})
        let displays = [
            new H({level: 1, value: 'Display 1', class: 'display-1'}),
            new H({level: 1, value: 'Display 2', class: 'display-2'}),
            new H({level: 1, value: 'Display 3', class: 'display-3'}),
            new H({level: 1, value: 'Display 4', class: 'display-4'}),
            new H({level: 1, value: 'Display 5', class: 'display-5'}),
            new H({level: 1, value: 'Display 6', class: 'display-6'})
        ]

        // Lead & Paragraphs Section
        let h_paragraphs = new H({level: 2, value: 'Paragraphs'})
        let p_lead = new P({
            value: 'This is a lead paragraph. It stands out from regular paragraphs.',
            class: 'lead'
        })
        let p_regular = new P({
            value: 'This is a regular paragraph with default text styling.'
        })
        let p_small = new P({
            value: 'This text is meant to be treated as fine print.',
            class: 'small'
        })

        // Text Utilities Section
        let h_text_utils = new H({level: 2, value: 'Text Utilities'})
        let text_utilities = [
            new P({value: 'Bold text',                class: 'fw-bold'}),
            new P({value: 'Regular weight text',      class: 'fw-normal'}),
            new P({value: 'Light weight text',        class: 'fw-light'}),
            new P({value: 'Italic text',              class: 'fst-italic'}),
            new P({value: 'Left aligned text',        class: 'text-start'}),
            new P({value: 'Center aligned text',      class: 'text-center'}),
            new P({value: 'Right aligned text',       class: 'text-end'}),
            new P({value: 'Lowercase text',           class: 'text-lowercase'}),
            new P({value: 'UPPERCASE TEXT',           class: 'text-uppercase'}),
            new P({value: 'Capitalized Text',         class: 'text-capitalize'})
        ]

        // Text Colors Section
        let h_colors = new H({level: 2, value: 'Text Colors'})
        let colors = [
            new P({value: 'Primary text',     class: 'text-primary'}),
            new P({value: 'Secondary text',   class: 'text-secondary'}),
            new P({value: 'Success text',     class: 'text-success'}),
            new P({value: 'Danger text',      class: 'text-danger'}),
            new P({value: 'Warning text',     class: 'text-warning'}),
            new P({value: 'Info text',        class: 'text-info'}),
            new P({value: 'Light text',       class: 'text-light'}),
            new P({value: 'Dark text',        class: 'text-dark'}),
            new P({value: 'Muted text',       class: 'text-muted'}),
            new P({value: 'White text',       class: 'text-white'})
        ]

        // Background Colors Section
        let h_bg_colors = new H({level: 2, value: 'Background Colors'})
        let bg_colors = [
            new P({value: 'Primary background',   class: 'bg-primary text-white'}),
            new P({value: 'Secondary background', class: 'bg-secondary text-white'}),
            new P({value: 'Success background',   class: 'bg-success text-white'}),
            new P({value: 'Danger background',    class: 'bg-danger text-white'}),
            new P({value: 'Warning background',   class: 'bg-warning text-dark'}),
            new P({value: 'Info background',      class: 'bg-info text-dark'}),
            new P({value: 'Light background',     class: 'bg-light text-dark'}),
            new P({value: 'Dark background',      class: 'bg-dark text-white'})
        ]

        const hr_separator      = new HR()
        const text_demo_title   = new Text()
        text_demo_title.value = `Typography Demo (${this.framework || 'Default'})`

        div_root.add_elements(hr_separator, text_demo_title, hr_separator)

        // Add all elements to root
        div_root.add_elements(
            h_headings, ...headings,
            h_display, ...displays,
            h_paragraphs, p_lead, p_regular, p_small,
            h_text_utils, ...text_utilities,
            h_colors, ...colors,
            h_bg_colors, ...bg_colors
        )

        this.apply_framework()
        this.set_inner_html(div_root.html())                    // assign the inner HTML
    }

    css_rules__bootstrap() {
        return {
            ":host"                  : { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" },
            ".display-1"             : { fontSize: "5rem",    fontWeight: "300", lineHeight: "1.2" },
            ".display-2"             : { fontSize: "4.5rem",  fontWeight: "300", lineHeight: "1.2" },
            ".display-3"             : { fontSize: "4rem",    fontWeight: "300", lineHeight: "1.2" },
            ".display-4"             : { fontSize: "3.5rem",  fontWeight: "300", lineHeight: "1.2" },
            ".display-5"             : { fontSize: "3rem",    fontWeight: "300", lineHeight: "1.2" },
            ".display-6"             : { fontSize: "2.5rem",  fontWeight: "300", lineHeight: "1.2" },
            ".lead"                  : { fontSize: "1.25rem", fontWeight: "300" },
            ".small"                 : { fontSize: "0.875em" },
            ".text-muted"            : { color: "#6c757d" },
            ".fw-light"              : { fontWeight: "300" },
            ".fw-normal"             : { fontWeight: "400" },
            ".fw-bold"               : { fontWeight: "700" },
            ".fst-italic"            : { fontStyle: "italic" },
            ".text-start"            : { textAlign: "left" },
            ".text-center"           : { textAlign: "center" },
            ".text-end"              : { textAlign: "right" },
            ".text-lowercase"        : { textTransform: "lowercase" },
            ".text-uppercase"        : { textTransform: "uppercase" },
            ".text-capitalize"       : { textTransform: "capitalize" },
            ".text-primary"          : { color: "#0d6efd" },
            ".text-secondary"        : { color: "#6c757d" },
            ".text-success"          : { color: "#198754" },
            ".text-danger"           : { color: "#dc3545" },
            ".text-warning"          : { color: "#ffc107" },
            ".text-info"             : { color: "#0dcaf0" },
            ".text-light"            : { color: "#f8f9fa" },
            ".text-dark"             : { color: "#212529" },
            ".text-white"            : { color: "#fff" },
            ".bg-primary"            : { backgroundColor: "#0d6efd" },
            ".bg-secondary"          : { backgroundColor: "#6c757d" },
            ".bg-success"            : { backgroundColor: "#198754" },
            ".bg-danger"             : { backgroundColor: "#dc3545" },
            ".bg-warning"            : { backgroundColor: "#ffc107" },
            ".bg-info"               : { backgroundColor: "#0dcaf0" },
            ".bg-light"              : { backgroundColor: "#f8f9fa" },
            ".bg-dark"               : { backgroundColor: "#212529" },
            "p"                      : { marginBottom: "1rem" },
            "h1, h2, h3, h4, h5, h6" : { marginBottom: "0.5rem", fontWeight: "500", lineHeight: "1.2" },
            "h1"                     : { fontSize: "2.5rem" },
            "h2"                     : { fontSize: "2rem" },
            "h3"                     : { fontSize: "1.75rem" },
            "h4"                     : { fontSize: "1.5rem" },
            "h5"                     : { fontSize: "1.25rem" },
            "h6"                     : { fontSize: "1rem" }
        }
    }

    css_rules__foundation() {
        return {
            ":host"                    : { fontFamily: "Helvetica Neue, Helvetica, Roboto, Arial, sans-serif" },
            ".display-1"               : { fontSize: "3.75rem", fontWeight: "300", lineHeight: "1.4" },
            ".display-2"               : { fontSize: "3.375rem", fontWeight: "300", lineHeight: "1.4" },
            ".display-3"               : { fontSize: "3rem", fontWeight: "300", lineHeight: "1.4" },
            ".display-4"               : { fontSize: "2.625rem", fontWeight: "300", lineHeight: "1.4" },
            ".display-5"               : { fontSize: "2.25rem", fontWeight: "300", lineHeight: "1.4" },
            ".display-6"               : { fontSize: "1.875rem", fontWeight: "300", lineHeight: "1.4" },
            ".lead"                    : { fontSize: "125%", lineHeight: "1.6" },
            ".small"                   : { fontSize: "80%", lineHeight: "inherit" },
            ".text-muted"             : { color: "#8a8a8a" },
            ".fw-light"               : { fontWeight: "300" },
            ".fw-normal"              : { fontWeight: "400" },
            ".fw-bold"                : { fontWeight: "700" },
            ".fst-italic"             : { fontStyle: "italic" },
            ".text-start"             : { textAlign: "left" },
            ".text-center"            : { textAlign: "center" },
            ".text-end"               : { textAlign: "right" },
            ".text-lowercase"         : { textTransform: "lowercase" },
            ".text-uppercase"         : { textTransform: "uppercase" },
            ".text-capitalize"        : { textTransform: "capitalize" },
            ".text-primary"           : { color: "#1779ba" },     // Foundation primary
            ".text-secondary"         : { color: "#767676" },     // Foundation secondary
            ".text-success"           : { color: "#3adb76" },     // Foundation success
            ".text-danger"            : { color: "#cc4b37" },     // Foundation alert
            ".text-warning"           : { color: "#ffae00" },     // Foundation warning
            ".text-info"              : { color: "#17a2b8" },     // Foundation info
            ".text-light"             : { color: "#e6e6e6" },     // Foundation light gray
            ".text-dark"              : { color: "#0a0a0a" },     // Foundation black
            ".text-white"             : { color: "#fefefe" },     // Foundation white
            ".bg-primary"             : { backgroundColor: "#1779ba" },
            ".bg-secondary"           : { backgroundColor: "#767676" },
            ".bg-success"             : { backgroundColor: "#3adb76" },
            ".bg-danger"              : { backgroundColor: "#cc4b37" },
            ".bg-warning"             : { backgroundColor: "#ffae00" },
            ".bg-info"                : { backgroundColor: "#17a2b8" },
            ".bg-light"               : { backgroundColor: "#e6e6e6" },
            ".bg-dark"                : { backgroundColor: "#0a0a0a" },
            "p"                       : { marginBottom: "1rem", fontSize: "1rem", lineHeight: "1.6", textRendering: "optimizeLegibility" },
            "h1, h2, h3, h4, h5, h6"  : { marginTop: "0", marginBottom: "0.5rem", fontWeight: "500", lineHeight: "1.4" },
            "h1"                      : { fontSize: "3rem" },      // Foundation h1
            "h2"                      : { fontSize: "2.5rem" },    // Foundation h2
            "h3"                      : { fontSize: "1.9375rem" }, // Foundation h3
            "h4"                      : { fontSize: "1.5625rem" }, // Foundation h4
            "h5"                      : { fontSize: "1.25rem" },   // Foundation h5
            "h6"                      : { fontSize: "1rem" }       // Foundation h6
        }

    }
    css_rules__tailwind() {
        return {
            ":host"                    : { fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif" },
            ".display-1"               : { fontSize: "8rem",     lineHeight: "1",    fontWeight: "800" },    // text-8xl
            ".display-2"               : { fontSize: "6rem",     lineHeight: "1",    fontWeight: "800" },    // text-7xl
            ".display-3"               : { fontSize: "4.5rem",   lineHeight: "1",    fontWeight: "800" },    // text-6xl
            ".display-4"               : { fontSize: "3.75rem",  lineHeight: "1",    fontWeight: "800" },    // text-5xl
            ".display-5"               : { fontSize: "3rem",     lineHeight: "1",    fontWeight: "700" },    // text-4xl
            ".display-6"               : { fontSize: "2.25rem",  lineHeight: "2.5",  fontWeight: "700" },    // text-3xl
            ".lead"                    : { fontSize: "1.125rem", lineHeight: "1.75", fontWeight: "500" },    // text-lg
            ".small"                   : { fontSize: "0.875rem", lineHeight: "1.25" },                       // text-sm
            ".text-muted"             : { color: "#6b7280" },                                               // text-gray-500
            ".fw-light"               : { fontWeight: "300" },                                              // font-light
            ".fw-normal"              : { fontWeight: "400" },                                              // font-normal
            ".fw-bold"                : { fontWeight: "700" },                                              // font-bold
            ".fst-italic"             : { fontStyle: "italic" },                                            // italic
            ".text-start"             : { textAlign: "left" },                                              // text-left
            ".text-center"            : { textAlign: "center" },                                            // text-center
            ".text-end"               : { textAlign: "right" },                                             // text-right
            ".text-lowercase"         : { textTransform: "lowercase" },                                     // lowercase
            ".text-uppercase"         : { textTransform: "uppercase" },                                     // uppercase
            ".text-capitalize"        : { textTransform: "capitalize" },                                    // capitalize
            ".text-primary"           : { color: "#3b82f6" },                                              // text-blue-500
            ".text-secondary"         : { color: "#6b7280" },                                              // text-gray-500
            ".text-success"           : { color: "#10b981" },                                              // text-green-500
            ".text-danger"            : { color: "#ef4444" },                                              // text-red-500
            ".text-warning"           : { color: "#f59e0b" },                                              // text-amber-500
            ".text-info"              : { color: "#3b82f6" },                                              // text-blue-500
            ".text-light"             : { color: "#f3f4f6" },                                              // text-gray-100
            ".text-dark"              : { color: "#111827" },                                              // text-gray-900
            ".text-white"             : { color: "#ffffff" },                                              // text-white
            ".bg-primary"             : { backgroundColor: "#3b82f6" },                                    // bg-blue-500
            ".bg-secondary"           : { backgroundColor: "#6b7280" },                                    // bg-gray-500
            ".bg-success"             : { backgroundColor: "#10b981" },                                    // bg-green-500
            ".bg-danger"              : { backgroundColor: "#ef4444" },                                    // bg-red-500
            ".bg-warning"             : { backgroundColor: "#f59e0b" },                                    // bg-amber-500
            ".bg-info"                : { backgroundColor: "#3b82f6" },                                    // bg-blue-500
            ".bg-light"               : { backgroundColor: "#f3f4f6" },                                    // bg-gray-100
            ".bg-dark"                : { backgroundColor: "#111827" },                                    // bg-gray-900
            "p"                       : { marginBottom: "1rem", fontSize: "1rem", lineHeight: "1.5" },     // text-base
            "h1, h2, h3, h4, h5, h6"  : { marginBottom: "0.5rem", fontWeight: "600", lineHeight: "1.25" },// leading-tight
            "h1"                      : { fontSize: "3rem",     lineHeight: "1" },                         // text-4xl
            "h2"                      : { fontSize: "2.25rem",  lineHeight: "2.5" },                       // text-3xl
            "h3"                      : { fontSize: "1.875rem", lineHeight: "2.25" },                      // text-2xl
            "h4"                      : { fontSize: "1.5rem",   lineHeight: "2" },                         // text-xl
            "h5"                      : { fontSize: "1.25rem",  lineHeight: "1.75" },                      // text-lg
            "h6"                      : { fontSize: "1.125rem", lineHeight: "1.75" }                       // text-base
        }
    }

    css_rules__material_design() {
        return {
            ":host"                    : { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
            ".display-1"               : { fontSize: "6rem",     letterSpacing: "-0.015625em", fontWeight: "300", lineHeight: "1.167" },  // d1
            ".display-2"               : { fontSize: "3.75rem",  letterSpacing: "-0.00833em",  fontWeight: "300", lineHeight: "1.2" },    // d2
            ".display-3"               : { fontSize: "3rem",     letterSpacing: "0em",         fontWeight: "400", lineHeight: "1.167" },  // d3
            ".display-4"               : { fontSize: "2.125rem", letterSpacing: "0.00735em",   fontWeight: "400", lineHeight: "1.235" },  // d4
            ".display-5"               : { fontSize: "1.5rem",   letterSpacing: "0em",         fontWeight: "400", lineHeight: "1.334" },  // h5
            ".display-6"               : { fontSize: "1.25rem",  letterSpacing: "0.0075em",    fontWeight: "500", lineHeight: "1.6" },    // h6
            ".lead"                    : { fontSize: "1.25rem",  letterSpacing: "0.0075em",    fontWeight: "400", lineHeight: "1.6" },    // subtitle1
            ".small"                   : { fontSize: "0.875rem", letterSpacing: "0.01071em",   fontWeight: "400", lineHeight: "1.43" },   // body2
            ".text-muted"             : { color: "rgba(0, 0, 0, 0.6)" },
            ".fw-light"               : { fontWeight: "300" },
            ".fw-normal"              : { fontWeight: "400" },
            ".fw-bold"                : { fontWeight: "500" },  // Material uses 500 as bold
            ".fst-italic"             : { fontStyle: "italic" },
            ".text-start"             : { textAlign: "left" },
            ".text-center"            : { textAlign: "center" },
            ".text-end"               : { textAlign: "right" },
            ".text-lowercase"         : { textTransform: "lowercase" },
            ".text-uppercase"         : { textTransform: "uppercase", letterSpacing: "0.08333em" },  // Material specific
            ".text-capitalize"        : { textTransform: "capitalize" },
            ".text-primary"           : { color: "#1976d2" },          // Material Blue 700
            ".text-secondary"         : { color: "#9c27b0" },          // Material Purple 500
            ".text-success"           : { color: "#2e7d32" },          // Material Green 800
            ".text-danger"            : { color: "#d32f2f" },          // Material Red 700
            ".text-warning"           : { color: "#ed6c02" },          // Material Orange 800
            ".text-info"              : { color: "#0288d1" },          // Material Light Blue 700
            ".text-light"             : { color: "#fafafa" },          // Material Grey 50
            ".text-dark"              : { color: "#212121" },          // Material Grey 900
            ".text-white"             : { color: "#ffffff" },
            ".bg-primary"             : { backgroundColor: "#1976d2" },
            ".bg-secondary"           : { backgroundColor: "#9c27b0" },
            ".bg-success"             : { backgroundColor: "#2e7d32" },
            ".bg-danger"              : { backgroundColor: "#d32f2f" },
            ".bg-warning"             : { backgroundColor: "#ed6c02" },
            ".bg-info"                : { backgroundColor: "#0288d1" },
            ".bg-light"               : { backgroundColor: "#fafafa" },
            ".bg-dark"                : { backgroundColor: "#212121" },
            "p"                       : { marginBottom: "1rem", fontSize: "1rem", letterSpacing: "0.00938em", lineHeight: "1.5" },    // body1
            "h1, h2, h3, h4, h5, h6"  : { marginBottom: "0.5rem", fontWeight: "400", lineHeight: "1.167" },
            "h1"                      : { fontSize: "6rem",      letterSpacing: "-0.015625em" }, // d1
            "h2"                      : { fontSize: "3.75rem",   letterSpacing: "-0.00833em" },  // d2
            "h3"                      : { fontSize: "3rem",      letterSpacing: "0em" },         // d3
            "h4"                      : { fontSize: "2.125rem",  letterSpacing: "0.00735em" },   // d4
            "h5"                      : { fontSize: "1.5rem",    letterSpacing: "0em" },         // h5
            "h6"                      : { fontSize: "1.25rem",   letterSpacing: "0.0075em" }     // h6
        }
    }
}

WebC__CSS__Demo__Typography.define()