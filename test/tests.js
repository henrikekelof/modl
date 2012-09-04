
// Helpers:

var objectSize = function(obj) {
    var size = 0, 
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size += 1;
        }
    }
    return size;
};

var fireEventOn = function (id, evt) {

    var event,
        elm = document.getElementById(id);

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(evt, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = evt;
    }

    if (document.createEvent) {
        elm.dispatchEvent(event);
    } else {
        elm.fireEvent("on" + event.eventType, event);
    }

};


(function () {

    module("Tests");


}());
