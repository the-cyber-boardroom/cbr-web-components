export default class CSS__Badges {
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
            // Base badge styling
            ".badge": {
                display: "inline-flex",
                alignItems: "center",
                padding: "0.35em 0.65em",
                fontSize: "0.75em",
                fontWeight: "700",
                lineHeight: "1",
                color: "#fff",
                textAlign: "center",
                whiteSpace: "nowrap",
                verticalAlign: "baseline",
                borderRadius: "0.25rem"
            },

            // Pill variation
            ".badge-pill": {
                borderRadius: "50rem"
            },

            // Colors
            ".badge-primary": {
                backgroundColor: "#0d6efd"
            },

            ".badge-secondary": {
                backgroundColor: "#6c757d"
            },

            ".badge-success": {
                backgroundColor: "#198754"
            },

            ".badge-danger": {
                backgroundColor: "#dc3545"
            },

            ".badge-warning": {
                backgroundColor: "#ffc107",
                color: "#000"
            },

            ".badge-info": {
                backgroundColor: "#0dcaf0",
                color: "#000"
            },

            ".badge-light": {
                backgroundColor: "#f8f9fa",
                color: "#000"
            },

            ".badge-dark": {
                backgroundColor: "#212529"
            },

            // Position adjustments for inline text
            "button .badge": {
                position: "relative",
                top: "-1px"
            }
        }
    }
}