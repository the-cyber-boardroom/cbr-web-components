export default class CSS__WebC__Chat_Bot {
    constructor(target_element) {
        this.target_element = target_element
    }

    apply_framework() {
        if (this.target_element) {
            this.target_element.add_css_rules(this.css_rules__standard())
        }
    }

    css_rules__standard() {
        return {    "*"              : { "font-family": "Verdana"},
                    ".chatbot-ui"    : { display        : "flex"                   ,
                                         flex           : 1                        ,
                                         flexDirection  : "column"                 ,
                                         maxWidth       : "100%"                   ,
                                         minHeight      : "350px"                  ,
                                         height         : "100%"                   ,
                                         backgroundColor: "#fff"                   ,
                                         borderRadius   : "10px"                   ,
                                         boxShadow      : "0 0 5px rgba(0,0,0,0.4)",
                                         overflow       : "auto"                   ,
                                         position       : "relative"

                    },
                    ".chat-input-ui" : { position: "absolute"      ,
                                         bottom  : '0'             ,
                                         left    : 0               ,
                                         right   : 0               },

                    ".chat-messages" : { //display      : "flex"  ,
                                         //flexDirection: "column",
                                         flexGrow     : "1"         ,
                                         padding      : "10px"      ,
                                         overflowY    : "auto"      ,
                                         position     : "absolute"  ,
                                         top            : "90px"   ,
                                         bottom         : "75px"       ,
                                         left           : "0"       ,
                                         right          : "0"       ,

                        },
                    ".chat-ids"      : { backgroundColor: "black"  ,
                                         color          : "white"  ,
                                         padding        : "10px"   },
                    ".chat-ids a"    : { color          : "white"   },
                    ".chat-header"   : { "background-color": "#5a4ad1",
                                         color: "#fff",
                                         padding: "10px",
                                         "text-align": "center",
                                         "font-size": "1.2em" },

                    ".chat-input"      : { padding: "10px",
                                           background: "#fff",
                                           "box-shadow": "0 -2px 10px rgba(0,0,0,0.1)" },
                    ".chat-input input": {  width: "90%",
                                            padding: "10px",
                                            "border-radius": "20px",
                                            border: "1px solid #ccc",
                                         } ,
                    ".save-chat:link"  : {  backgroundColor: '#007bff'  ,
                                            color          : '#fff'     ,
                                            padding        : '5px'      ,
                                            borderRadius   : "10px"     ,
                                            fontWeight     : '600'     }}
        }
}