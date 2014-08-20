!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Interval=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
}

interval.once = function() {
    this.func();
}

interval.restart = interval.start;

module.exports = Interval;

},{}]},{},[1])(1)
});