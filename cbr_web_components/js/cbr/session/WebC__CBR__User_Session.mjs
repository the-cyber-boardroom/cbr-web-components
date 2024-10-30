import Web_Component                from "../../core/Web_Component.mjs"
import CBR__Session__Event__Handler from "./CBR__Session__Event__Handler.mjs"
import CBR__Session__API__Handler   from "./CBR__Session__API__Handler.mjs"
import CBR__Session__State__Manager from "./CBR__Session__State__Manager.mjs"
import Div                          from "../../core/Div.mjs"
import Icon                         from "../../css/icons/Icon.mjs"
import CSS__Session                 from "./CSS__Session.mjs";

export default class WebC__CBR__User_Session extends Web_Component {
    constructor() {
        super()
        this.event_handler = new CBR__Session__Event__Handler()
        this.api_handler   = new CBR__Session__API__Handler()
        this.state_manager = new CBR__Session__State__Manager()
        new CSS__Session(this).apply_framework()
    }

    async connectedCallback() {
        await this.load_initial_state()
        super.connectedCallback()
        this.setup_event_listeners()
        this.state_manager.setInitialized()
        this.event_handler.dispatch(this.event_handler.events.SESSION_INITIALIZED,
                                    { state: this.state_manager.get_state() })
    }

    async load_initial_state() {
        try {
            const user_session_id    = this.api_handler.get_user_session_id   ()
            const persona_session_id = this.api_handler.get_persona_session_id()

            if (user_session_id) {
                const user_session = await this.api_handler.get_session_details(user_session_id)
                this.state_manager.set_user_session(user_session)
            }

            if (persona_session_id) {
                const persona_session = await this.api_handler.get_session_details(persona_session_id)
                this.state_manager.set_persona_session(persona_session)
            }
        } catch (error) {
            this.state_manager.setError(error)
            this.event_handler.dispatch(
                this.event_handler.events.SESSION_ERROR,
                { error }
            )
        }
    }

    handle__login_as_persona = async (event) => {
        try {
            await this.api_handler.loginAsPersona(event.detail.persona_id)
            await this.loadInitialState()
            this.event_handler.dispatch(
                this.event_handler.events.PERSONA_SESSION_CHANGED,
                { state: this.state_manager.get_state() }
            )
        } catch (error) {
            this.state_manager.setError(error)
            this.event_handler.dispatch(
                this.event_handler.events.SESSION_ERROR,
                { error }
            )
        }
    }
    setup_event_listeners() {
        this.event_handler.subscribe(this.event_handler.events.LOGIN_AS_PERSONA,this.handle__login_as_persona)

        this.event_handler.subscribe(
            this.event_handler.events.LOGOUT_PERSONA,
            async () => {
                try {
                    await this.api_handler.logoutPersona()
                    this.state_manager.clear_persona_session()
                    this.event_handler.dispatch(
                        this.event_handler.events.PERSONA_SESSION_CHANGED,
                        { state: this.state_manager.get_state() }
                    )
                } catch (error) {
                    this.state_manager.setError(error)
                    this.event_handler.dispatch(
                        this.event_handler.events.SESSION_ERROR,
                        { error }
                    )
                }
            }
        )
        // todo add click events

        // revert_icon.addEventListener('click', () => {
        //         this.event_handler.dispatch(this.event_handler.events.LOGOUT_PERSONA)
        //     })
    }

    disconnectedCallback() {
        this.event_handler.unsubscribeAll()
    }

    render() {
        const state = this.state_manager.get_state()
        const session_indicator = new Div({ class: 'session-indicator'})

        // User session element
        const user_session  = new Div ({ class: 'session-item user'                                          })
        const user_icon     = new Icon({ class: 'session-icon',  icon: 'user'                                })
        const user_text     = new Div ({ value: state.user_session?.user_name || 'Not logged in'             })
        const user_badge    = new Div ({ class: `session-badge ${state.user_session ? 'active' : 'inactive'}`,
                                         value: state.user_session ? 'Active' : 'Inactive'                   })

        user_session     .add_elements(user_icon, user_text, user_badge)
        session_indicator.add_element(user_session)

        // Persona session element (if active)
        if (state.persona_session) {
            const persona_session  = new Div({ class: 'session-item persona active'})
            const persona_icon     = new Icon({ class: 'session-icon',  icon: 'person' })
            const persona_text     = new Div({ value: state.persona_session.user_name })
            const persona_badge    = new Div({ class: 'session-badge active', value: 'Persona'})
            const revert_icon      = new Icon({ class: 'revert-icon',  icon: 'undo' })

            persona_session  .add_elements(persona_icon, persona_text, persona_badge, revert_icon)
            session_indicator.add_elements(persona_session)
        }

        this.set_inner_html(session_indicator.html())

    }
}

WebC__CBR__User_Session.define()
