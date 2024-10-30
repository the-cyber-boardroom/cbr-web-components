export default class CBR__Session__Event__Handler {
    constructor() {
        this.callbacks = {}
        this.setupEvents()
    }

    setupEvents() {
        this.events = {
            USER_SESSION_CHANGED    : 'user_session_changed'    ,
            PERSONA_SESSION_CHANGED : 'persona_session_changed' ,
            SESSION_ERROR          : 'session_error'           ,
            LOGIN_AS_PERSONA       : 'login_as_persona'        ,
            LOGOUT_PERSONA         : 'logout_persona'          ,
            SESSION_INITIALIZED    : 'session_initialized'
        }
    }

    dispatch(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            bubbles   : true    ,
            composed  : true    ,
            detail    : detail
        })
        document.dispatchEvent(event)
    }

    subscribe(eventName, callback) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = []
        }
        this.callbacks[eventName].push(callback)
        document.addEventListener(eventName, callback)
    }

    unsubscribe(eventName, callback) {
        if (this.callbacks[eventName]) {
            this.callbacks[eventName] = this.callbacks[eventName].filter(cb => cb !== callback)
            document.removeEventListener(eventName, callback)
        }
    }

    unsubscribeAll() {
        Object.keys(this.callbacks).forEach(eventName => {
            this.callbacks[eventName].forEach(callback => {
                document.removeEventListener(eventName, callback)
            })
        })
        this.callbacks = {}
    }
}