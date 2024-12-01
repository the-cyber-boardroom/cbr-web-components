// import WebC__Target_Div      from '../../../js/utils/WebC__Target_Div.mjs'
// import Web_Component         from '../../../js/core/Web_Component.mjs'
// import WebC__Document__Chat  from '../../../js/cbr/web-components/WebC__Document__Chat.mjs'
// import { setup_mock_responses, set_mock_response } from '../../../js/testing/Mock_API__Data.mjs'
//
// const { module, test } = QUnit
//
// const MOCK_FILE_ID = 'test-file-123'
// const MOCK_CONTENT = '# Test Document Content'
// const MOCK_RESPONSE = {
//     status: 'ok',
//     data: {
//         response_json: {
//             document: {
//                 summary: 'Test summary',
//                 changes: [
//                     {
//                         type: 'addition',
//                         reason: 'Added new section'
//                     }
//                 ]
//             }
//         }
//     }
// }
//
// module('WebC__Document__Chat', hooks => {
//     let target_div
//     let chat
//     let original_marked
//
//     hooks.beforeEach(async () => {
//         setup_mock_responses()
//         set_mock_response('https://osbot-llms.dev.aws.cyber-boardroom.com/json-prompt/improve-document', 'POST', MOCK_RESPONSE)
//
//         original_marked = window.marked
//         window.marked = { marked: (text) => text }
//
//         target_div = WebC__Target_Div.add_to_body()
//         chat = await target_div.append_child(WebC__Document__Chat, {
//             'file-id': MOCK_FILE_ID,
//             'content': MOCK_CONTENT
//         })
//         await chat.wait_for__component_ready()
//     })
//
//     hooks.afterEach(() => {
//         window.marked = original_marked
//         chat.remove()
//         target_div.remove()
//     })
//
//     test('constructor and inheritance', assert => {
//         assert.equal(chat.tagName.toLowerCase()        , 'webc-document-chat'     , 'Has correct tag name')
//         assert.equal(chat.constructor.element_name     , 'webc-document-chat'     , 'Has correct element name')
//         assert.equal(chat.constructor.name             , 'WebC__Document__Chat'   , 'Has correct class name')
//         assert.equal(chat.file_id                     , MOCK_FILE_ID              , 'Sets file ID')
//         assert.equal(chat.content                     , MOCK_CONTENT              , 'Sets content')
//
//         assert.ok(chat.shadowRoot                                                 , 'Has shadow root')
//         assert.ok(chat.api_invoke                                                 , 'Has API__Invoke')
//         assert.ok(chat instanceof Web_Component                                   , 'Extends Web_Component')
//         assert.ok(chat instanceof HTMLElement                                     , 'Is HTML Element')
//     })
//
//     test('loads and applies CSS frameworks', assert => {
//         const css_rules = chat.all_css_rules()
//
//         assert.ok(Object.keys(css_rules).length > 0                              , 'Has CSS rules')
//         assert.ok(css_rules['.chat-container']                                   , 'Has container styles')
//         assert.ok(css_rules['.chat-messages']                                    , 'Has messages styles')
//         assert.ok(css_rules['.message']                                          , 'Has message styles')
//         assert.ok(css_rules['.chat-input']                                       , 'Has input styles')
//     })
//
//     test('renders initial UI correctly', assert => {
//         const container = chat.query_selector('.chat-container')
//         assert.ok(container                                                      , 'Container exists')
//
//         const header = chat.query_selector('.chat-header')
//         assert.ok(header                                                         , 'Header exists')
//         assert.ok(header.textContent.includes('Document Assistant')              , 'Shows title')
//
//         const messages = chat.query_selector('.chat-messages')
//         assert.ok(messages                                                       , 'Messages container exists')
//
//         const input = chat.query_selector('.chat-input')
//         assert.ok(input                                                          , 'Input exists')
//         assert.equal(input.tagName.toLowerCase()       , 'textarea'              , 'Input is textarea')
//
//         const send_btn = chat.query_selector('.send-button')
//         assert.ok(send_btn                                                       , 'Send button exists')
//     })
//
//     test('adds initial messages', assert => {
//         const messages = chat.query_selector_all('.message-system')
//         assert.ok(messages.length >= 2                                           , 'Shows initial messages')
//         assert.ok(messages[0].textContent.includes('Hello!')                     , 'Shows welcome message')
//         assert.ok(messages[1].textContent.includes('💡')                         , 'Shows suggestions')
//     })
//
//     test('handles message sending', async assert => {
//         const input = chat.query_selector('.chat-input')
//         const send_btn = chat.query_selector('.send-button')
//         const test_message = 'Improve document structure'
//
//         input.value = test_message
//         send_btn.click()
//
//         const user_msg = chat.query_selector('.message-user')
//         assert.equal(user_msg.textContent             , test_message             , 'Shows user message')
//
//         await chat.wait_for(100)
//         const assistant_msg = chat.query_selector('.message-assistant')
//         assert.ok(assistant_msg.textContent.includes('Changes Summary')          , 'Shows response')
//     })
//
//     test('handles document updates', assert => {
//         const new_content = '# Updated Content'
//         window.dispatchEvent(new CustomEvent('document-updated', {
//             detail: {
//                 file_id: MOCK_FILE_ID,
//                 content: new_content
//             }
//         }))
//
//         assert.equal(chat.content                     , new_content              , 'Updates content')
//         const update_msg = chat.query_selector('.message-system:last-child')
//         assert.ok(update_msg.textContent.includes('Document updated')            , 'Shows update message')
//     })
//
//     test('prevents concurrent streaming', async assert => {
//         chat.streaming = true
//         const input = chat.query_selector('.chat-input')
//         const send_btn = chat.query_selector('.send-button')
//
//         input.value = 'Test message'
//         send_btn.click()
//
//         const messages = chat.query_selector_all('.message')
//         const initial_count = messages.length
//
//         assert.equal(chat.query_selector_all('.message').length, initial_count   , 'No new messages during streaming')
//     })
//
//     test('handles API errors', async assert => {
//         set_mock_response('https://osbot-llms.dev.aws.cyber-boardroom.com/json-prompt/improve-document', 'POST', null, 500)
//
//         const input = chat.query_selector('.chat-input')
//         const send_btn = chat.query_selector('.send-button')
//
//         input.value = 'Test message'
//         send_btn.click()
//
//         await chat.wait_for(100)
//         const error_msg = chat.query_selector('.message-assistant')
//         assert.ok(error_msg.textContent.includes('Error')                        , 'Shows error message')
//     })
//
//     test('handles enter key', async assert => {
//         const input = chat.query_selector('.chat-input')
//         input.value = 'Test message'
//
//         input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
//         await chat.wait_for(100)
//
//         const message = chat.query_selector('.message-user')
//         assert.ok(message                                                        , 'Sends on enter')
//         assert.equal(message.textContent              , 'Test message'           , 'Shows correct message')
//     })
// })