'use strict';

module.exports = test2;

function test2() {
    require('test1')()
    // TODO
    console.log('test2');
}
test2()
