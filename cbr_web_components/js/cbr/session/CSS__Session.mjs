export default class CSS__Session {
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
            // Session indicator container
            ".session-indicator": {

                //top: "4px",
                //right: "4px",
                padding: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "4px",
                color: "#ffffff",
                //fontSize: "12px",
                zIndex: "1000",
                display: "flex",
                flexDirection: "row-reverse",
                gap: "10px",
                minWidth: "200px"
            },

            // Session items
            ".session-item": {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.2s ease"
            },

            ".session-item.user": {
                backgroundColor: "rgba(255, 152, 0, 0.2)",       // Orange tint
                borderLeft: "3px solid #ff9800"
            },

            ".session-item.persona": {
                backgroundColor: "rgba(76, 175, 80, 0.2)",       // Green tint
                borderLeft: "3px solid #4caf50"
            },

            // Control elements
            ".session-controls": {
                display: "flex",
                gap: "8px",
                marginTop: "4px",
                padding: "4px 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            },

            // Icons
            ".session-icon": {
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },

            ".revert-icon": {
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                marginLeft: "auto",
                transition: "all 0.2s ease"
            },

            ".revert-icon:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.1)"
            }
        }
    }
}