export default class Events__Receive {

    constructor() {
        this.document_callbacks       = {}
        this.channel_callbacks        = {}
        this.logs_enabled            = false
        this.logs_events_received    = []
        this.logs_callbacks_invoked  = []
    }

    add_event_listener(type, channel, callback, options) {
        if (type && channel && callback) {

            if (!this.channel_callbacks[type]) {                                     // Ensure the event type is initialized in the callbacks object
                this.channel_callbacks[type] = {};
                document.addEventListener(type, this.on_event, options);    // Register the wrapped callback as an event listener
                this.document_callbacks[type] = this.on_event
            }

            if (!this.channel_callbacks[type][channel]) {                            // Ensure the channel is initialized under the event type
                this.channel_callbacks[type][channel] = [];
            }

            this.channel_callbacks[type][channel].push(callback);                    // Add the callback to the list for the specific event type and channel
        }
    }

    clear_logs() {
        this.logs_events_received   = []
        this.logs_callbacks_invoked = []
    }
    on_event = (event) => {
        this.log_event(this.logs_events_received, event)
        let event_type = event.type
        let event_data = event.detail
        let channel    = event_data?.channel
        if (this.channel_callbacks[event_type]) {
            if (channel && this.channel_callbacks[event_type][channel]) {
                let callbacks = this.channel_callbacks[event_type][channel]
                callbacks.forEach(callback => {
                    this.raise_event(callback, event)
                })
            }
        }
    }

    log_event(target, event) {
        if (this.logs_enabled) {
            let log_event = {event_type: event.type, event_data: event.detail}
            target.push(log_event)
        }
    }

    raise_event(callback, event) {
        if (callback) {
            this.log_event(this.logs_callbacks_invoked, event)
            callback(event);
        }
    }

    remove_all_event_listeners() {
        for (const type in this.document_callbacks) {                             // Iterate over registered document_callbacks
            let callback = this.document_callbacks[type]                          // Get the callback for the event type
            document.removeEventListener(type, callback)                          // Remove the callback from the event listener
        }
        this.document_callbacks = {};                                             // Clear the callbacks object
    }
}