import Events__Utils from "../../js/events/Events__Utils.mjs";
import Events__Dispatch from "../../js/events/Events__Dispatch.mjs";
import Events__Receive from "../../js/events/Events__Receive.mjs";

QUnit.module('Events__Utils.qunit', function(hooks) {

    let events_utils


    hooks.before(async (assert) => {
        events_utils = new Events__Utils()
    })

    QUnit.test('.constructor()', (assert) => {
        assert.ok       (events_utils                 instanceof Events__Utils   )
        assert.ok       (events_utils.events_dispatch instanceof Events__Dispatch)
        assert.ok       (events_utils.events_receive  instanceof Events__Receive )
        assert.deepEqual(events_utils.events_send      , [])
        assert.deepEqual(events_utils.events_received  , [])
        assert.deepEqual(events_utils.events_handled   , [])
        assert.ok(1)
    })

    QUnit.test('test event dispatch workflow', (assert) => {
        let done = assert.async()
        let channel    = 'an_channel'
        let event_name = 'test_event'
        let event_data = { test_data: 'test_data' , channel: channel}

        let event_received = (event) => {
            assert.equal(event.type  , event_name)
            assert.equal(event.detail, event_data)
            assert.deepEqual(events_utils.events_receive.events_callbacks, { [event_name] : {[channel] : [event_received]}})
            done()
        }
        assert.deepEqual(events_utils.events_receive.events_callbacks, {})

        events_utils.events_receive .add_event_listener(event_name, channel, event_received)
        events_utils.events_dispatch.send_event        (event_name, event_data)

    })
})