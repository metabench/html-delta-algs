const test = require('node:test');
const assert = require('node:assert/strict');

//const HTML_Delta_Finder = require('../HTML_Delta_Finder');
// See about loading the fairly large JS sample???
//const dp = new HTML_Delta_Finder();

const HTML_Indexer = require('../tools/Util_Extended_HTML_Indexer');


const { unpack, pack } = require('msgpackr');


const lblue = num => '\x1b[34m' + num.toLocaleString() + '\x1b[0m'
const lorange = num => '\x1b[38;5;208m' + num.toLocaleString() + '\x1b[0m'
const lred = num => '\x1b[31m' + num.toLocaleString() + '\x1b[0m'

const lblack = num => '\x1b[30m' + num.toLocaleString() + '\x1b[0m';
//const lred = num => '\x1b[31m' + num.toLocaleString() + '\x1b[0m';
const lgreen = num => '\x1b[32m' + num.toLocaleString() + '\x1b[0m';
const lyellow = num => '\x1b[33m' + num.toLocaleString() + '\x1b[0m';
//const lblue = num => '\x1b[34m' + num.toLocaleString() + '\x1b[0m';
const lmagenta = num => '\x1b[35m' + num.toLocaleString() + '\x1b[0m';
const lcyan = num => '\x1b[36m' + num.toLocaleString() + '\x1b[0m';
const lwhite = num => '\x1b[37m' + num.toLocaleString() + '\x1b[0m';
const lgray = num => '\x1b[90m' + num.toLocaleString() + '\x1b[0m';
const llight_red = num => '\x1b[91m' + num.toLocaleString() + '\x1b[0m';
const llight_green = num => '\x1b[92m' + num.toLocaleString() + '\x1b[0m';
const llight_yellow = num => '\x1b[93m' + num.toLocaleString() + '\x1b[0m';
const llight_blue = num => '\x1b[94m' + num.toLocaleString() + '\x1b[0m';
const llight_magenta = num => '\x1b[95m' + num.toLocaleString() + '\x1b[0m';
const llight_cyan = num => '\x1b[96m' + num.toLocaleString() + '\x1b[0m';
const llight_white = num => '\x1b[97m' + num.toLocaleString() + '\x1b[0m';
const ldblue = num => '\x1b[38;5;33m' + num.toLocaleString() + '\x1b[0m';
//const lorange = num => '\x1b[38;5;208m' + num.toLocaleString() + '\x1b[0m';
const lpink = num => '\x1b[38;5;206m' + num.toLocaleString() + '\x1b[0m';
const lteal = num => '\x1b[38;5;51m' + num.toLocaleString() + '\x1b[0m';
const lpurple = num => '\x1b[38;5;129m' + num.toLocaleString() + '\x1b[0m';
const lbrown = num => '\x1b[38;5;130m' + num.toLocaleString() + '\x1b[0m';
const lmaroon = num => '\x1b[38;5;52m' + num.toLocaleString() + '\x1b[0m';
const lnavy = num => '\x1b[38;5;18m' + num.toLocaleString() + '\x1b[0m';
const lgold = num => '\x1b[38;5;220m' + num.toLocaleString() + '\x1b[0m';
const lcoral = num => '\x1b[38;5;210m' + num.toLocaleString() + '\x1b[0m';
const lindigo = num => '\x1b[38;5;54m' + num.toLocaleString() + '\x1b[0m';
const lsilver = num => '\x1b[38;5;145m' + num.toLocaleString() + '\x1b[0m';
const lbeige = num => '\x1b[38;5;230m' + num.toLocaleString() + '\x1b[0m';
const lkhaki = num => '\x1b[38;5;185m' + num.toLocaleString() + '\x1b[0m';
const lcrimson = num => '\x1b[38;5;196m' + num.toLocaleString() + '\x1b[0m';

let i = 0;


// Testing the details of the compression?
//  May be worth making a 2nd, maybe more extendable and plugin-based core, then various other things added in a more flexible way, such as
//  more programatic definitions of the commands, command sets, capability of the HTML VM(s), and also means to generate the deltas (ie
//  instructions to be processed in one or more VMs). It would need a kind of 'ecosystem' of different pieces. It may benefit from its own
//  reference implementation / core. Seems more like a core / extensions type system.

// Implementation 2 or I2 for the moment....





// xpaths seem broken!
const test_a = a => {
    const hi = new HTML_Indexer(a);

    const {data} = hi;
    const {nodes} = data;

    //console.log('Object.keys(data)', Object.keys(data));

    console.log('hi.xpaths', hi.xpaths);

    console.log('hi.has.dtd', hi.has.dtd);

    console.log('hi.nodes.length', hi.nodes.length);

    // then get the xpaths....
    //  Want an improved API indexer.





}

test('Minimal HTML Docs', () => {
    //const message = 'Hello'
    //assert.equal(message, 'Hello', 'checking the greeting')
    
    test_a(
        `<html><head><title></title></head><body></body></html>`
    );

    test_a(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );

    false && test_a(
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );


    // Should work by detecting a different match.
    // Then can solve it in 2 instructions
    //  Copy root of doc a without a specific node, then insert another node in place.

    // So this should (always?) be able to detect one node being added and one being removed.

    // So, things like removing a node from doc a.
    // Then knowing we need to add string??? to what we have to produce doc b.

    // Having various other simple cases covered well will help too.
    // May be some way to go to create deltas on large and complex docs.
    // Finding efficient ways to encode doc b nodes in terms of doc a will be important.

    // Does seem like a GA or GA-like search will be helpful for working out deltas of larger docs.
    //  Maybe not the best approach....
    // Anyway, more recognition of simpler deltas will help.
    // Being able to encode a node as a transformed version of a node in doc a will help.
    
    // It may be best that if this delta system fails, it calls a more general pupose delta finding alg.
    //  Anyway, want to keep this very simple for the moment.
    //  Want to make it so that transformers are easy to express and to then use when encoding nodes in the delta.

    // Much of the time we won't be able to do a whole document pattern match.











    /*
    
    test_a_b(

        // Like before, somewhat - but it also needs to recognise it must remove the title text from "a".



        `<html><head><title>A simple test</title></head><body></body></html>`,
        //`<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );

    test_a_b(

        // Like before, somewhat - but it also needs to recognise it must remove the title text from "a".



        `<!DOCTYPE html><html><head><title>A simple test</title></head><body></body></html>`,
        //`<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );


    test_a_b(

        // Like before, somewhat - but it also needs to recognise it must remove the title text from "a".



        `<html><head><title>A simple test</title></head><body></body></html>`,
        //`<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );

    */
    

        

})