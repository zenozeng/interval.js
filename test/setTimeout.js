// Paste this to your console
// Use Google Chrome's Profiles Tab to test CPU Usage

var timeout;
var i = 0;
setInterval(function() {
    console.log(i);
    timeout = setTimeout(function() {
        i++;
    }, 20);
    clearTimeout(timeout);
}, 4);
