const test = require('node:test');
const assert = require('node:assert/strict');

const HTML_Delta_Finder = require('../HTML_Delta_Finder');
// See about loading the fairly large JS sample???

const dp = new HTML_Delta_Finder();

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

// May consider a system that creates multiple encodings of nodes with different strategies, and uses the smallest (or otherwise best?) one.

// Conditionally_Applicable_Node_Encoding_Strategy perhaps.
//  Some very specific classes and instances of them could help a lot with the logic here.
//  For the moment, want to improve the logic structure, while making maybe a little bit more functionality.
//   But want to get the main algorithm find_delta much more concise, and calling into plugins in at least 2 parts of the algorithm.

// But maybe a very small number more instructions would help...?
//  Making the system able to creatively use instructions would help too.
//   Though it may work best by far to give it rules for when which instructions will work???

// For the moment, an instruction to create a 'div' and define its children would help a lot.
// And also for span.
// And maybe for the div, span, and define the children of the span.
//  That could be for a specific case. May be useful to do so long as its fast.

// Rebuilding the find_delta some more so that it uses solution check(s) may help a lot.




















const test_a_b = (a, b) => {

    console.log('');

    //console.log('pre create delta');

    const d = dp.create(a, b);
    console.log('doc a', a);
    console.log('doc a.length', a.length);
    console.log('doc b', b);
    console.log('doc b.length', b.length);
    console.log('delta', i, JSON.stringify(d, null, 0));


    //const jl = JSON.stringify(d).length;

    const packed = pack(d);

    const jsonl = JSON.stringify(d).length;
    //
    console.log('jsonl', jsonl);

    //console.log('packed', packed);
    const jl = packed.length;

    console.log('packed.length', llight_blue(packed.length));
    //console.log('');
    const b_saved = b.length - jl;
    console.log('b_saved', llight_magenta(b_saved));
    

    // So that JSON's decently smaller now.
    //  But may still want to look into algorithmic improvements with a plugin-like system.

    // Or modularise this more...???

    // Clearly copied the wrong thing here....
    //  Problem seems to be in the reconstruction...???

    // Looks like a problem building the insructions.
    //  Referencing the wrong canirc ani - maybe ref from wrong doc?
    //   always should be refs to what is in doc a.


    // Def looks somewhat wrong....
    //  Not sure which ref is wrong and how exactly.


    
    


    const b2 = dp.apply(a, d);
    //console.log('b2 === b', b2 === b); // does it work?
    //console.log('b2', b2);
    //console.log('b ', b);

    
    assert.equal(b2, b, 'Create delta, apply it');
    i++;
}

// Want more specific tests.
//  Testing for adding some text.
//  Adding an element
//  Removing an element
//  Moving an element (swap position of 2 siblings)
//  Remiving an element, adding another element in another place

// Some of these tasks could have tests that ensure that the encoded delta takes less space than doc "b".




test('Minimal HTML Docs', () => {
    //const message = 'Hello'
    //assert.equal(message, 'Hello', 'checking the greeting')
    



    

    //const a = 'Sphinx in the quartz mirror, judge of vowels and verbs';
    //const b = 'Sphinx of black quartz, judge my vow';

    // This test shows how an 'insert_within' type instruction would help.
    // Or copy node from "a" and then replace its child node.

    // It could better figure out which part of it was removed from the first document.
    //  How to identify that it's been removed from doc a?
    //   Its removal from doc a means that it would show as the hash of a node from doc a without its children.
    //    The indexing should index that, and when queried to match childless versions ... ??????
    //  No, would need to after identifying that there is a childless match with the body, identifying that without that child in the body,
    //   we can extract the full data from doc a, and insert something into it.

    // Copy doc a, then insert "..." at position p would be a shorter way to encode this.
    //  Detecting single item removal.

    // May be best for the moment to split detection logic to different modules, bring together on overlap for efficiency.

    // The hash of the document with that element removed.
    //  Then if we detect any of those hashes, it covers single element removal.
    //  Single element removal hashes would still be O(N). Adding multiple things like this would still keep it O(N).
    //   Could make an API that keeps it O(N).

    



    // Seems like its encoding the wrong thing for the moment with the plugins-based encoder.



    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );

    test_a_b(
        `<!DOCTYPE html><html><head><title>A less modest change</title></head><body>Text to be removed</body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body>A modest change</body></html>`
    );

    test_a_b(
        `<html><head><title>A less modest change</title></head><body>Text to be removed</body></html>`,
        `<html><head><title></title></head><body>A modest change</body></html>`
    );


    /*
    test_a_b(
        `<!DOCTYPE html><html><head><title>A modest change</title></head><body><div></div></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body>A modest change</body></html>`
    );



    // Want to have it efficiently solving some specific cases.
    //  Then work on some more general efficiency.
    //  Encoding nodes using data from a.
        */


    const existing_tests = () => {

        test_a_b(
            `<html><head><title></title></head><body></body></html>`,
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

        
        // Seems more efficient on this one
        //  Though looking up the node content with references would work better....
        //  The full doc transform could then have further optimisations.
        // Could also see about further optimising each instruction.


        

        test_a_b(
            `<html><head><title>A simple test</title></head><body></body></html>`,
            `<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
            //`<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
        );

        

        // Somehow more complex....
        //  Does seem much like removing a child node though...?
        //  Need a parent_node_without_node transformation I think.
        //   Would not remove all children.

        // And maybe want more specific encode_node(indexed_a, node) functions???
        
        // So indexing the parent node with the node removed - seems like it would make for effective O(N) checking by hashes.
        //  So then could build instructions based on the matching transforms.
        
        // The parent node with specific child nodes removed would def be useful to hash.
        //  Seems like another specific thing to identify...
        


        







        // It reorders the script and the title in the head, changes them somewhat..., puts text from the title into a span in a div.

        
        // This one is overall somewhat more complex.
        //  Maybe make this work by reconsructing by placing nodes into the str_res.
        //  When rebuilding nodes, should make use of the transformed matches between nodes.






        test_a_b(
            `<html><head><script>console.log("hi");</script><title>A simple test</title></head><body></body></html>`,
            `<html><head><title>A simple test</title><script></script></head><body><div><span>A simple test</span></div></body></html>`,
            //`<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
        );

        
        

        // Then testing on some larger HTML documents would be useful.
        //  Could make a version that incorporates script diffing.
        //  A compressed JSON format could help.
        //  As in just an integer for each instruction name.
        //   The method itself could have a stringtable of instruction names.


        // A compressed type of delta would be really helpful for storage.
        //  Could even encode a few things at very low bit rates (eg 4 bit values for some things)
        //   Such as when there are only a small number of nodes, ie 16 or less.
        //   Small number of instructions.
        //    Small number of strings to write - can put them in a stringtable at the beginning of the delta.

        // A copy element from 'a', and change node name command?
        //  Again, could save some space when writing.

        // Maybe not needed in the reference implementation.
        //  May be worth making the Delta_Finder and Delta modules flexible, and allow some kinds of plugins or extensions.
        //  


    

    }

    //existing_tests();


        
    

        

})

// But then also will look into testing the compression proportion.


false && test('Spacing within minimal HTML Docs', () => {
    test_a_b(
        `<html><head><title>
        
          
         </title></head><body></body></html>`,
        `<html><head><title>   </title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );


    test_a_b(
        `<html><head><title>A simple test</title></head><body></body></html>`,
        //`<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );

    test_a_b(
        `<html><head><title>A simple test</title></head><body></body></html>`,
        `<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        //`<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );

    test_a_b(
        `<html><head><script>
        
        console.log("hi");
        </script>
        <title>A simple test</title></head><body></body></html>`,
        `<html><head><title>A simple test</title><script></script></head><body><div>
        <span>A simple test</span>
        </div></body></html>`,
        //`<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );

})