const Doc_And_Node_Transformer = require('./Doc_And_Node_Transformer');
const crypto = require('crypto');
const {arrayify, is_array, each} = require('lang-mini');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {
    remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths
} = require('../tools/tools');
const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;


// Want to move to a simplified core that uses plugin modules to represent changes / reconciliations that can be made between nodes
// Maybe ways to spot how to encode a node from b.
// Specific encoders.
//  Such as identifying its the text from a script (in b).
//  Identifying a corresponding script in a. (some kind of second check to see if it's worth or possible to proceed)
//  Working out the string diff. Using that string diff and a ref to represent that text in doc b.

// Infrastructure to try multiple different encodings for a node.

// Also want some better encoding of some relatively simple things that will allow more concise representation of the delta / of doc b.









// Not sure how effective the transformers are in the process right now....

// May be a lot better to connect transformers with specific checks / reconciliation strategies.

// Or more intelligent testing of transformers???
//  Being more careful that they are O(N)?
//  Widening this from transformers, ie things saved about nodes. Could be transformed. Other things, such as saving the
//   attributes, or the 0th or 1st attribute, may also be very useful in O(N).


const used_transformers = [

    // Perf cost is fairly low for this one.
    //  Temp removal of children and then rendering without them is fast / v fast.
    //  Would take longer if node has many / long attribs.

    new Doc_And_Node_Transformer({
        name: 'node without children',
        fn: (doc, node) => {

            // Maybe takes too long???


            // Could be optimised.
            //  Though render_as_childless is fairly quick.

            if (node.children) {
                return render_as_childless(node);
            } else {
                return false;
            }

            


        }
    }),

    // Seems like we need to fix the application of transformations when there is a dtd and html at the root.



    new Doc_And_Node_Transformer({
        name: 'doc without node',
        skip: true,
        perf_cost: "n",
        fn: (doc, node) => {
            // slightly trickier???

            //const {pos} = node;

            const pos = [node.startIndex, node.endIndex];

            //console.log('Object.keys(node)', Object.keys(node));
            //console.log('Object.keys(doc)', Object.keys(doc));
            //console.log('pos', pos);

            // 

            // Can't render the doc HTML the whole time!!!!

            // And when the doc starts with a doctype?
            //  Should easily have the rendered HTML of the doc.
            //  Seems like rendering to ensure its the same is important.

            if (!doc.html) {
                doc.html = render(doc);
            }


            // So the doc can be an array.


            const doc_html = doc.html;



            //console.log('doc_html', doc_html);
            //console.log('doc', doc);

            //console.log('Object.keys(doc)', Object.keys(doc));

            //console.log('doc.html?.length', doc.html?.length);

            //console.log('doc_html.length', doc_html.length);

            const str_res = doc_html.substring(0, pos[0]) + doc_html.substring(pos[1] + 1);


            //console.log('str_res', str_res);
            // Needs to remove substrings from it....

            // All sees OK here.

            return str_res;


            console.trace();
            throw 'stop';

            //return render_as_childless(node);
        }
    })
    
    

];

// Node without children looks essential for the 'copy node, replace children' instruction.
// Though maybe other instructions could better encode a node, or much of it.





const unused_transformers = [

    

    // This does seem tricky - may need to better consider doctypes and HTML elements.
    //  This is quite niche in some ways, but may be very helpful too.
    //  May be better using this as a reconciliation strategy / option.




    
    

    // Optimised transformers using string positions and properties would help a lot more.



];

module.exports = used_transformers;