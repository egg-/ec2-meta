# ec2-meta

[![version](https://img.shields.io/npm/v/ec2-meta.svg) ![download](https://img.shields.io/npm/dm/ec2-meta.svg)](https://www.npmjs.com/package/ec2-meta)

Retrieving Instance Metadata.

## Warning: normal operation only ec2.

## Usage

```javascript
var ec2meta = require('ec2-meta');

// load meta categories
ec2meta.load(function(err, categories) {
    // console.log(categories);
});

// load instance-id
ec2meta.load('instance-id', function(err, value) {
    // console.log(value);
});
```


## References

* [instancedata data categories](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-categories)


## LICENSE

ec2-meta is licensed under the MIT license.