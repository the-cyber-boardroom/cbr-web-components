import WebC__CBR__User_Session                     from '../../../js/cbr/session/WebC__CBR__User_Session.mjs'
import WebC__Target_Div                            from '../../../js/utils/WebC__Target_Div.mjs'
import Web_Component                               from '../../../js/core/Web_Component.mjs'
import {
    setup_mock_responses,
    set_mock_response,
    MOCK_USER_ID,
    MOCK_USER_NAME,
    MOCK_USER_SESSION_ID,
    MOCK_USER_SESSION,
    MOCK_PERSONA_1_USER_ID,
    MOCK_PERSONA_1_USER_NAME,
    MOCK_PERSONA_1_SESSION_ID,
    MOCK_PERSONA_1_SESSION,
    MOCK_PERSONA_2_USER_ID,
    MOCK_PERSONA_2_USER_NAME,
    MOCK_PERSONA_2_SESSION_ID,
    MOCK_PERSONA_2_SESSION,
    MOCK_PERSONA_BAD_SESSION_ID
} from '../../../js/testing/Mock_API__Data.mjs'
import CBR_Events from "../../../js/cbr/CBR_Events.mjs";

const { module, test , only, skip} = QUnit

module('WebC__CBR__User_Session', hooks => {
    let target_div
    let session_component
    let original_storage

    hooks.before(async (assert) => {
        assert.timeout(10)
        setup_mock_responses()

        // Save original storage
        original_storage = {
            getItem: window.localStorage.getItem,
            setItem: window.localStorage.setItem
        }

        // Mock storage
        const storage = {
            'cbr_user_session_id'    : MOCK_USER_SESSION.session_id,
            'cbr_active_session_id'  : MOCK_USER_SESSION.session_id
        }

        window.localStorage.getItem = (key) => storage[key]
        window.localStorage.setItem = (key, value) => storage[key] = value


        // Create component
        target_div = WebC__Target_Div.add_to_body()
        session_component = await target_div.append_child(WebC__CBR__User_Session)
        await session_component.wait_for__component_ready()
    })

    hooks.beforeEach(() => {
        session_component.api_handler.delete_cookie('CBR__SESSION_ID__USER'   )
        session_component.api_handler.delete_cookie('CBR__SESSION_ID__PERSONA')
        session_component.api_handler.delete_cookie('CBR__SESSION_ID__ACTIVE' )
        session_component.state_manager.reset_state()
    })

    hooks.after(() => {
        // Restore original storage
        window.localStorage.getItem = original_storage.getItem
        window.localStorage.setItem = original_storage.setItem

        session_component.remove()
        target_div.remove()
    })

    test('constructor and initialization', assert => {
        assert.ok(session_component instanceof WebC__CBR__User_Session           , 'Is correct component type'  )
        assert.ok(session_component instanceof Web_Component                     , 'Extends Web_Component'      )
        assert.ok(session_component.event_handler                                , 'Has event handler'          )
        assert.ok(session_component.api_handler                                  , 'Has API handler'            )
        assert.ok(session_component.state_manager                                , 'Has state manager'          )
        assert.ok(session_component.shadowRoot                                   , 'Has shadow root'            )
    })

    test('loads initial state correctly', async assert => {
        const state = session_component.state_manager.get_state()

        assert.deepEqual(state, { user_session   : null ,
                                  persona_session: null ,
                                  active_session : null ,
                                  is_initialized : false ,
                                  error          : null })
    })

    // only('renders user session UI element correctly', assert => {
    //     const user_element = session_component.query_selector('.session-item.user')
    //     const icon        = user_element.querySelector('.session-icon')
    //     const text        = user_element.querySelector('.session-text')
    //     const badge       = user_element.querySelector('.badge')
    //
    //     assert.ok   (user_element                                               , 'User element exists'        )
    //     assert.ok   (user_element.classList.contains('active')                  , 'User session is active'     )
    //     assert.ok   (icon                                                      , 'Has icon element'           )
    //     assert.equal(text.textContent            , 'Test User'                  , 'Shows correct username'     )
    //     assert.ok   (badge.classList.contains('badge-success')                  , 'Has success badge'          )
    // })
    //
    test('handles persona login', async assert => {

        assert.deepEqual(session_component.state_manager.state.user_session   ,  null)                                  // confirm we have no user session data at the start
        assert.deepEqual(session_component.state_manager.state.persona_session,  null)                                  //   or persona session
        assert.deepEqual(session_component.state_manager.state.active_session ,  null)                                  //   or active session

        await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_1_SESSION_ID } })         // login as persona 1
        assert.deepEqual(session_component.state_manager.state.persona_session,  MOCK_PERSONA_1_SESSION)                // confirm  we got persona 1 data
        assert.deepEqual(session_component.state_manager.state.user_session   ,  null)                                  //   and that the user_session
        assert.deepEqual(session_component.state_manager.state.active_session ,  null)                                  //   and active session did

        await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_2_SESSION_ID } })         // login as persona 2
        assert.deepEqual(session_component.state_manager.state.persona_session,  MOCK_PERSONA_2_SESSION)                // confirm we got persona 2 data

        await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_BAD_SESSION_ID } })       // login with an invalid persona id
        assert.deepEqual(session_component.state_manager.state.persona_session,  MOCK_PERSONA_2_SESSION)                // we should still have persona 2 data


    })

    //todo refactor with new AAA__Element_Event
    test('handles persona login - fires event CBR__SESSION__PERSONA__CHANGED', async assert => {
        assert.expect(2)

        let expected_persona_session = null

        const  on_persona_session_changed = () => {
            assert.deepEqual(session_component.state_manager.state.persona_session,  expected_persona_session)
        }
        session_component.addEventListener(CBR_Events.CBR__SESSION__PERSONA__CHANGED, on_persona_session_changed)

        expected_persona_session = MOCK_PERSONA_1_SESSION
        await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_1_SESSION_ID } })

        expected_persona_session = MOCK_PERSONA_2_SESSION
        await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_2_SESSION_ID } })

        session_component.removeEventListener(CBR_Events.CBR__SESSION__PERSONA__CHANGED, on_persona_session_changed)

    })

    // test('handle__persona_session_changed - respond to event and refreshes UI', async assert => {
    //     //assert.expect(4)
    //     const done = assert.async()
    //
    //     session_component.addEventListener(CBR_Events.CBR__SESSION__PERSONA__CHANGED, () => {
    //         assert.deepEqual(session_component.state_manager.state.persona_session,  MOCK_PERSONA_1_SESSION)
    //
    //         const persona_element = session_component.query_selector('.session-item.persona')
    //         //console.log(persona_element)
    //         // assert.ok   (persona_element                                        , 'Persona element exists'     )
    //         // assert.ok   (persona_element.querySelector('.revert-icon')          , 'Has revert icon'           )
    //         assert.ok(1)
    //         done()
    //     }, { once: true })
    //
    //     //session_component.api_handler.set_cookie('CBR__SESSION_ID__USER','persona-123')
    //     // session_component.api_handler.set_cookie('CBR__SESSION_ID__PERSONA','persona-123')
    //     // session_component.api_handler.set_cookie('CBR__SESSION_ID__ACTIVE' ,'persona-123')
    //
    //     await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_1_SESSION_ID } })
    //
    //     //container.event_handler.dispatch(CBR_Events.CBR__SESSION__PERSONA__CHANGED, { state })
    // })

    // skip('handles session switching', async assert => {
    //     // assert.expect(3)
    //     const done = assert.async()
    //
    //     // First login as persona 1
    //     await session_component.handle__login_as_persona({ detail: { persona_id: MOCK_PERSONA_1_SESSION_ID } })
    //
    //     console.log(session_component.state_manager.state)
    //
    //     const on_active_session_changed = (event) => {
    //         assert.equal(event.detail.session_id      , MOCK_PERSONA_1_SESSION, 'Correct session ID')
    //         //assert.equal(event.detail.user_name       , 'Test Persona'                 , 'Correct username'  )
    //
    //         const active = session_component.query_selector('.session-item.active')
    //         // assert.equal(active.querySelector('.session-text').textContent,
    //         //             'Test Persona'                                                 , 'UI updated'        )
    //         done()
    //     }
    //     session_component.addEventListener('active_session_changed', on_active_session_changed , {once: true})
    //
    //     //session_component.api_handler.set_cookie('CBR__SESSION_ID__PERSONA','persona-123')
    //     //session_component.api_handler.set_cookie('CBR__SESSION_ID__ACTIVE' ,'persona-123')
    //     await session_component.handle__switch_session({detail: { session_id: MOCK_PERSONA_SESSION_ID }})
    //     assert.ok(1)
    // })
    //
    // test('handles api errors gracefully', async assert => {
    //     assert.expect(3)
    //     const done = assert.async()
    //
    //     // Setup error response
    //     set_mock_response('/api/user-session/guest/login-as-persona', 'POST', null)
    //
    //     session_component.addEventListener('session_error', (event) => {
    //         const state = session_component.state_manager.get_state()
    //         assert.ok   (event.detail.error                                    , 'Error event dispatched' )
    //         assert.ok   (state.error                                          , 'Error state set'        )
    //         assert.equal(state.persona_session           , null                , 'No persona session set' )
    //         done()
    //     })
    //
    //     await session_component.handle__login_as_persona({
    //         detail: { persona_id: 'invalid-id' }
    //     })
    // })
    //
    // test('dom event handlers work correctly', assert => {
    //     assert.expect(2)
    //
    //     // Setup click event tracking
    //     let switch_clicked = false
    //     let logout_clicked = false
    //
    //     session_component.addEventListener('switch_session', () => switch_clicked = true)
    //     session_component.addEventListener('logout_persona', () => logout_clicked = true)
    //
    //     // Trigger clicks
    //     const user_element = session_component.query_selector('.session-item.user')
    //     user_element.click()
    //
    //     assert.ok(switch_clicked                                               , 'Switch event triggered' )
    //     assert.ok(logout_clicked === false                                     , 'No logout triggered'    )
    // })
    //
    // test('cleans up event listeners on disconnect', assert => {
    //     const original_remove = session_component.event_handler.unsubscribe_all
    //     let cleanup_called = false
    //
    //     session_component.event_handler.unsubscribe_all = () => {
    //         cleanup_called = true
    //         original_remove.call(session_component.event_handler)
    //     }
    //
    //     session_component.disconnectedCallback()
    //     assert.ok(cleanup_called                                               , 'Cleanup performed'      )
    //
    //     session_component.event_handler.unsubscribe_all = original_remove
    // })
});