// A simple interval manager

function Interval(func, delay, lifetime) {
    this.func = func;
    this.delay = delay;
    this.lifetime = lifetime;
    this.interval = null;
}

var interval = Interval.prototype;

interval.pause = function() {
    clearInterval(this.interval);
    this.interval = null;
}

interval.resume = function() {
    if(this.interval === null) {
        this.start();
    }
}

interval.start = function(delay, lifetime) {
    this.stop();
    delay = delay || this.delay;
    lifetime = lifetime || this.lifetime;
    this.interval = setInterval(this.func, this.delay);
    if(lifetime) {
        var that = this;
        setTimeout(function() {
            that.stop();
        }, lifetime);
    }
}

interval.stop = function() {
    if(this.interval) {
        clearInterval(this.interval);
    }
    this.interval = null;
    this.gcTimeout = null;
}

interval.restart = interval.start;

module.exports = Interval;
