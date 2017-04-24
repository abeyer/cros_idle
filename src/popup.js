function renderLog() {
    var l = document.getElementById('status-list');

    // just clear the log for now rather than try to diff against any
    // previously loaded data
    while (l.firstChild) {
        l.removeChild(l.firstChild);
    }
    
    chrome.storage.local.get(null, function(items) {
        var s1;
        
        // should force this to ordered by timestamp
        Object.keys(items).forEach(function(item) {
            s1 = document.createElement('li');
            s1.textContent = String(items[item]) + " : " + String(item);
            l.appendChild(s1);
        });
    });
}

function clearLog() {
    var that=this;
    that.setAttribute("disabled", true);

    chrome.storage.local.clear(function() {
        that.removeAttribute("disabled");
        renderLog();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderLog();

    document.getElementById('clear-button').addEventListener('click', clearLog);
});
