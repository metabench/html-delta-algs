

const Base_Node_Encoder = require('./Base');
const {is_array} = require('lang-mini');

// Take referenced and indexed HTML (docs?) (full html fragments?) as input.
// Maybe array of referenced indexed html?

const Delta_Solution_Check = require('../Delta_Solution_Check/Node/General');

const red = str => '\x1b[31m' + str + '\x1b[0m';

// Provide it with reference doc(s).
//  Allowing multiple would help, especially as an encoder could contain a standard reference doc.
//  Could contain a few HTML structures, even very commonly occuring class names. May not be so important.
//   May be worth testing such a reference doc to enable multiple more applicable docs to be used.


// Will / should encode as instructions, do there is not exactly a corresponding decoder, but it will run in a VM or a pretend one.

// And the full html string of the doc that the node is from (doc b)

// This is still a very special purpose node encoder.
// It's for when we encode a node in terms of what is already available in another document.

class General_Node_Encoder extends Base_Node_Encoder {
    constructor(spec = {}) {
        super(spec);


        // Could make a bunch of specific encoders, for the general encoder.
        // Encoding nodes always from the same document?
        //  How to get access to the (indexed?) document it's from?

        // Doing a delta solution check on doc a by giving it the doc b node....

        // And the document of "b"? or the root node?
        // Some checks like removing a node from the doc and hashing the whole doc without that node could take too long to be
        // practical in large docs. Likely makes it O(N^2) or something like that.
        
        // Maybe code in limitations such as only do that if it's 2K or less, or something like that.
        //  Could have things that will solve small / very small diffs / deltas well.
        //  And in larger cases could see if it can be broken up into smaller cases, or what larger case algorithms are most suitable.

        // Want something to copy a node and its children but to then apply a specific delta to that.
        //  Making it recursive (at least in some situations) could help alongside with some delta encodings that
        //  can be spotted quickly in some smaller documents / documents with fewer changes.

        // Getting the full doc delta reconciliations done effectively will be really useful.
        //  Consulting the xpaths for some things would be a very fast initial check.

        // Which xpaths in "b" do not correspond to xpaths in "a" and vice-versa.
        // Which of them do correspond between the documents / htmls?

        // Would be nice to nicely implement one or two greatly improved checks for some things like these.

        // Offloading it to an HTML_Pair_Comparison may help a lot.
        //  Could have a lot of state properties. Nice if there was one main alg to check things (O(N)) and then a getters could
        //  check that data.

        










        this.ds_check = new Delta_Solution_Check({indexed_a: this.indexed_a, 
            html_b: this.html_b, doc_b: this.doc_b,
            node_encoder: this
        });



    }
    encode(node, full_html) {

        // More specific node encoders could be different to delta solution encoders.
        //  More focused on just putting together the nodes (html syntax) and then inside them it could look for delta solutions etc.


        // if the node is an array...?

        if (is_array(node)) {
            //console.log(red('node is an array.'));

            // Suppose we need to process the array here???
            //  or the superclass does that OK?

            // But the super encoder should call the encoder here or in deepest subclass???
            return super.encode(node, full_html);


        } else {
            //console.log('node is not an array.');

                // Could check up the chain for encodings first?
            //  May cover some basic checks / encodings well.
            //  May be worth identifying cases where it has a 'perfect encoding' such as matching an element / node, or matching a transformed
            //   element or node (applicable transformations apply)

            const super_res = super.encode(node, full_html);
            //console.log('1) full_html', full_html);

            //console.log('[node.startIndex, node.endIndex]', [node.startIndex, node.endIndex]);

            // Look at the size of the encoding...?
            //  Or if it is marked 'perfect'.

            if (super_res && super_res.perfect === true) {

                console.log('super_res', super_res);
                console.trace();
                throw 'stop';
                
                return super_res;
            } else {
                
                //console.log('super_res', super_res);
                //console.log('2) full_html', full_html);

                // This checks for delta solutions for that node...???
                // Though I did decide that delta solutions would be nice to work on a node, perhaps should
                // use that for full doc delta solutions being found.
                // Not sure.

                // Could attempt different ways to encode the node, see which works and which is shortest.





                // A delta solution for the node...
                //  The node against the document...?
                //  Should match against transformed versions of nodes in doc "a". Does it?


                const dsc_res = this.ds_check.check(node);

                // use the delta solution check.
                //  The general one will look for multiple delta solutions.
                //console.log('dsc_res', dsc_res);

                //console.trace();
                //throw 'stop';


                if (dsc_res && dsc_res.solved === true) {
                    // Something like matching a node directly.
                    return dsc_res.instruction || dsc_res.instructions; // Returning the delta solution check directly could be the right balance for node encoding.
                    // It's not always clear which file to write the functionality in.

                    // Definitely want to incorporate this into the current find_delta, and apply_delta later.
                    //  For the moment, it just needs to generate the same (or better) instructions from the same set to apply.

                    // Should just return the instruction(s)???






                } else {

                    if (super_res) {
                        //return super_res.instruction || super_res.instructions;
                        //return super_res; // if its an array???
                        return super_res;
                        /*

                        if (is_array(super_res)) {
                            return super_res.map(x => x.instruction);
                        } else {
                            return super_res.instruction;
                        }
                        */

                        
                    }

                    

                }




                // Looking up for a node match could help.
                //  Maybe the Node_Encoder should use the Delta_Solution_Check?
                //   Definitely looks like it.

                // It would have the condition built-in.
                //  The general one would check for node matches.








                // Some specific node encoders....
                //  May be very helpful to go the node encoder(s) route along with the doc / node reconciliation and renconcilers.


                // A specific node encoder...?
                //  Encoding a node that matches a node in doc a, copy it by reference.
                //   Does seem like it comes more under delta solution check...?








                // Do we have some other way to encode it???

                // General purpose encoding may involve checking for some things and using a 'topical'? 'situational'? 'niche'? 'specialised'?
                //  'specific'? encoder.

                // Depending on specifics...

                // things like encoding a span surrounding some text.

                // Specific / conditional encoders could be quite helpful.
                






            }



        }



        




        // is it a 'perfect encoding'?
        //  such as a reference to a node in doc a to copy exactly?
        //   otherwise it may encode it differently.
        //   not so sure about the base part of it trying many ways to encode it....
        //    writing the whole thing, or going in and encoding the children.
        //    Though that is one of the main questions to ask right now.
        //     About how much it will try different encoding methods.
        //     If it tries too many (ie not many), going into the tree, while trying every possibility in combinations,
        //      it would take far too long???? Though done recursively it would wind up finding and using the best encodings for the lead nodes.
        //     Maybe could actually work OK.


        // But looking at 4 different encodings per node?









        // Determine the encoding method...
        //  Maybe the 'Base' version could do this.
        


    }
}

module.exports = General_Node_Encoder;