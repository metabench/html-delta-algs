const test = require('node:test');
const assert = require('node:assert/strict');

const HTML_Delta_Finder = require('../HTML_Delta_Finder');
// See about loading the fairly large JS sample???


const HTML_Pair_Comparison = require('../tools/HTML_Pair_Comparison');


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

    // Then what it expects as well???

    console.log('');

    //console.log('pre create delta');

    //const d = dp.create(a, b);
    console.log('doc a', a);
    console.log('doc a.length', a.length);
    console.log('doc b', b);
    console.log('doc b.length', b.length);

    const a_b_comparison = new HTML_Pair_Comparison(a, b);

    //console.log('a_b_comparison', a_b_comparison);

    // .xpaths.matching
    // .xpaths.all_match
    // .xpaths.only_in.a .b

    console.log('a_b_comparison.identical', a_b_comparison.identical);
    console.log('a_b_comparison.xpaths', a_b_comparison.xpaths);



    // comparison.matching_xpaths???

    // .matching.xpaths
    // .exclusive_to_a.xpaths
    // .a_only.xpaths

    // Xpath comparison looks like the way to go here - at least for identifying some things.
    // Checking for no xpath differences could be a faster way to check for a strucural match.

    // More extensive structure matching with xpaths should be quite helpful too.

    // set of xpaths in a, set of xpaths in b ....

    // Spotting things in the xpaths, or starting with the xpaths, should help a lot.

    // Definitely want to get a few (more) full deltas working very concisely.
    //  eg "a" but with nodes 10 and 12 swapped.
    //   That could concisely represent a very large "b" in some cases very concisely.












    // Number of corresponding xpaths...
    //  matching / non-matching xpaths in each doc / html.
    //  Could be used to more rapidly work out which nodes get added and removed.

    // See if the comparison can identify the (one? two?) changes between 'a' and 'b'?

    // Comparison should be able to identify identical documents / htmls.


    // May be different assertions to test here....
    
    
    //assert.equal(b2, b, 'Create delta, apply it');
    //assert.equal(b_saved > 0, true, 'At least 1 byte saved');


    i++;
}

// Want more specific tests.
//  Testing for adding some text.
//  Adding an element
//  Removing an element
//  Moving an element (swap position of 2 siblings)
//  Remiving an element, adding another element in another place

// Some of these tasks could have tests that ensure that the encoded delta takes less space than doc "b".




test('Identical very small HTML Docs', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body></body></html>`
    );
});

test('Added dtd to very small HTML doc', () => {
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );
});


test('Removed dtd from very small HTML doc', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body></body></html>`
    );
});

// But then also will look into testing the compression proportion.

// These 'insert content' tests would benefit a lot from improved detection of when content (any node?) has been removed from
// an HTML doc, and then doc "b" could be represented as doc "a" but with that node removed, and doc "a" represented as doc "b" with
// that node added.

// Examination of xpaths could be very helpful.
//  Identifying if all xpaths in "b" missing from "a" have got the same single node extending on from the xpaths in "a".

// Want some algorithmically efficient ways to identify (some) things.
// Does look like taking multiple approaches for small deltas will help - though not yet sure how using multiple
//  reconciliations in a chain will work.
// Identifying the docs / nodes match with trnasforms on both B and A will help.
//  This way, can basically reconcile two things at once, or maybe it's for a single and more powerful reconciliation.


// Trying removing the various pieces of nodes' html, then hashing the doc, seems to take too long.
//  The size of the op for each node depends on the size of the doc, therefore making it O(n^2).

// Recognising the docs are the same with a single node removed could be better done by looking at the xpaths.
// Then when potential nodes that meet that criteria (identified xpath difference) it can do the test.

// The xpath differences thing could be applied more widely when multiple nodes get added in places they don't appear in doc "a".

// Also, want more options for "copy and modify" type operations.






test('Insert content into body of very small HTML doc (no dtds)', () => {
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
});


test('Insert content into body of very small HTML doc (with dtds)', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
});

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