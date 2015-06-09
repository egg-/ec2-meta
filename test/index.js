'use strict';

var ec2meta = require('..');

// load meta data categories
ec2meta.load(function(err, categories) {
    console.log(err, categories);
});

// // load meta data
// ec2meta.load('instance-id', function(err, value) {
//     console.log(value);
// });

// // load invalid meta data
// ec2meta.load('instance-id-', function(err, value) {
//     console.log(value);
// });