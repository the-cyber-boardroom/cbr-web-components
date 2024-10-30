export default class CBR__Session__State__Manager {
    constructor() {
        this.state = {
            user_session    : null ,
            persona_session : null ,
            is_initialized  : false,
            error          : null
        }
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState }
        return this.state
    }

    set_user_session(session) {
        return this.updateState({ user_session: session })
    }

    set_persona_session(session) {
        return this.updateState({ persona_session: session })
    }

    clear_persona_session() {
        return this.updateState({ persona_session: null })
    }

    setError(error) {
        return this.updateState({ error })
    }

    setInitialized(is_initialized = true) {
        return this.updateState({ is_initialized })
    }

    get_state() {
        return { ...this.state }
    }

    hasActivePersona() {
        return !!this.state.persona_session
    }

    isInitialized() {
        return this.state.is_initialized
    }

    getCurrentSession() {
        return this.state.persona_session || this.state.user_session
    }
}