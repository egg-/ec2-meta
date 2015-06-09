/**
 * ec2-meta.js
 */

'use strict';

var request = require('request');

/**
 * ec2
 * @namespace ec2
 */
var ec2 = {};

var cache = {
    categories: null,
    meta: {}
};

var URL_META = 'http://169.254.169.254/latest/meta-data/';
var TIMEOUT = 1000;

ec2.loadCategory = function(cb) {
    if (cache.categories !== null) {
        return cb(null, cache.categories);
    }

    request({
        url: URL_META,
        timeout: TIMEOUT
    }, function(err, res, body) {
        if (err) {
            return cb(err);
        }
        
        var categories = body.split("\n");
        cache.categories = {};

        for (var i = 0; i < categories.length; i++) {
            cache.categories[categories[i]] = true;
        }

        cb(null, cache.categories);
    });
};

ec2.load = function(key, cb) {
    if (typeof key === 'function') {
        return ec2.loadCategory(key);
    }

    return ec2.loadCategory(function(err, categories) {
        if (err) {
            return cb(err);
        }

        if (typeof categories[key] === 'undefined') {
            return cb(new Error('Not Found'));
        }

        if (typeof cache.meta[key] !== 'undefined') {
            return cb(null, cache.meta[key]);
        }

        request({
            url: URL_META + key,
            timeout: TIMEOUT
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }

            cache.meta[key] = body;

            cb(null, cache.meta[key]);
        });
    });
};

module.exports = ec2;