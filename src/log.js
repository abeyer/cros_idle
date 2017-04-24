chrome.idle.onStateChanged.addListener(function (idleState) {
    var timestamp = (new Date()).toISOString();
    var msg = "[[ " + idleState + " ]]";
    var items = {};
    items[timestamp] = msg;

    chrome.storage.local.getBytesInUse(function(bytesInUse) {
        // limit to 4k of log data
        if (bytesInUse > 4096) {
            chrome.storage.local.clear(function() {
                chrome.storage.local.set(items, function() {});
            });
        } else {
            chrome.storage.local.set(items, function() {});
        }
    });
});
