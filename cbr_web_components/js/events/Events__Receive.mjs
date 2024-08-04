export default class Events__Receive {

    constructor() {
        this.events_callbacks  = {}
    }

    add_event_listener(type, channel, callback, options) {
        if (!this.events_callbacks[type]) {                         // Ensure the event type is initialized in the callbacks object
            this.events_callbacks[type] = {};
        }

        if (!this.events_callbacks[type][channel]) {                // Ensure the channel is initialized under the event type
            this.events_callbacks[type][channel] = [];
        }

        this.events_callbacks[type][channel].push(callback);        // Add the callback to the list for the specific event type and channel

        const channel_specific_callback = (event) => {              // Wrap the callback to check the event channel before executing
            if (event.detail?.channel === channel) {
                callback(event);
            }
        };

        // Register the wrapped callback as an event listener
        document.addEventListener(type, channel_specific_callback, options);
    }
}