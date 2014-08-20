/**
 * Interval.js
 *
 * @constructor
 * @param {function} func - The function you want to be called repeatly
 * @param {int} delay - milliseconds that should wait before each call
 * @param {int} lifetime - if set, clearInterval will be called after `lifetime` milliseconds
 */
function Interval(func, delay, lifetime) {
    this.func = func;
    this.delay = delay;
    this.lifetime = lifetime;
    this.interval = null;
    this.gcTimeout = null;
}

var interval = Interval.prototype;

/**
 * Pause Interval - clearInterval without touching lifetime
 */
interval.pause = function() {
    clearInterval(this.interval);
    this.interval = null;
}

/**
 * Resume Interval - setInterval if not set
 */
interval.resume = function() {
    if(this.interval === null) {
        this.start();
    }
}

/**
 * Start Interval
 *
 * @param {int} delay - milliseconds that should wait before each call, defaults to this.delay
 * @param {int} lifetime - if set, clearInterval will be called after `lifetime` milliseconds, defaults to this.lifetime
 */
interval.start = function(delay, lifetime) {
    this.stop();
    delay = delay || this.delay;
    lifetime = lifetime || this.lifetime;
    this.interval = setInterval(this.func, this.delay);
    if(lifetime) {
        var that = this;
        this.gcTimeout = setTimeout(function() {
            that.gcTimeout = null;
            that.stop();
        }, lifetime);
    }
}

/**
 * Stop Interval - clearInterval and clearTimeout for lifetime
 */
interval.stop = function() {
    if(this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
    if(this.gcTimeout) {
        clearTimeout(this.gcTimeout);
        this.gcTimeout = null;
    }
}

/**
 * Run func once
 */
interval.once = function() {
    this.func();
}

interval.restart = interval.start;

module.exports = Interval;
