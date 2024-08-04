export default class Events__Dispatch {

    raise_event(){
        //console.log('raising event.......')
    }

    send_to_channel(event_name, channel, event_data) {
        event_data.channel = channel
        this.send_event(event_name, event_data)
    }

    send_message_to_channel(channel, message_data){
        let event_name = 'channel_message'
        let event_data = {'channel'     : channel     ,
                          'message_data': message_data}
        this.send_event(event_name, event_data)
    }

    send_event(event_name, event_data) {
        let event = new CustomEvent(event_name, {
            detail    : event_data ,
            bubbles   : true,                       // Whether the event bubbles up through the DOM
            cancelable: true,                       // Whether the event can be canceled
            composed  : false   ,                   // Whether the event will trigger listeners outside of a shadow root
        });
        document.dispatchEvent(event)
    }

}