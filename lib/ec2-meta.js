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

var categories = null;
var meta = {};

var URL_META = 'http://169.254.169.254/latest/meta-data/';
var TIMEOUT = 1000;

ec2.loadCategory = function(cb) {
    if (categories === null) {
        return request({
            url: URL_META,
            timeout: TIMEOUT
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            categories = body.split("\n");

            cb(null, categories);
        });
    }

    return cb(null, categories);
};

ec2.loadMeta = function(key, cb) {
    if (typeof meta[key] !== 'undefined') {
        return cb(null, meta[key]);
    }

    if (categories === null) {
        return cb(new Error('Required init'));
    }

    if (typeof categories[key] === 'undefined') {
        return cb(new Error('Not Found'));
    }

    request({
        url: URL_META + key,
        timeout: TIMEOUT
    }, function(err, res, body) {
        if (err) {
            return cb(err);
        }

        meta[key] = body;

        cb(null, meta[key]);
    });
};

ec2.load = function(key, cb) {
    if (typeof key === 'function') {
        return ec2.loadCategory(key);
    }

    if (categories === null) {
        return ec2.loadCategory(function(err) {
            if (err) {
                return cb(err);
            }

            ec2.loadMeta(key, cb);
        });
    }

    ec2.loadMeta(key, cb);
};

module.exports = ec2;