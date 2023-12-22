const Base = require('./Base');
const Exact_Match_Node = require('./Exact_Match_Node');
const Symmetrical_Transformed_Node_Match = require('./Symmetrical_Transformed_Node_Match');

const Node_Match_To_Transformed_Node = require('./Node_Match_To_Transformed_Node');
// Node_Match_To_Transformed_Node

const arr_simple_default_transformers = require('../../../../tools/simple_default_transformers');


// An HTML_Pair_Comparison could maybe even itself identify instructions / transformations that represent deltas.
//  Or maybe 'delta states'.



class General extends Base {
    constructor(spec = {}) {
        super(spec);

        this.exact_match_node = new Exact_Match_Node({
            indexed_a: this.indexed_a,
            html_b: this.html_b
        });

        
        // And only the node without children transformation so far....




        const map_transformers_by_name = new Map(arr_simple_default_transformers.map(x => [x.name, x]));


        // node_without_children_match

        const tr_nwc = map_transformers_by_name.get('node without children');

        // (symmetrical, same transformation for both nodes) transformed_without_children_match_node
        // Symmetrical_Transformed_Node_Match
        //  what transform gets done on them.
        //  Provide it the HTML_Transformer object.

        // And the doc_b for the transforms too...?

        this.symt_node_without_children_match = new Symmetrical_Transformed_Node_Match({transformer: tr_nwc, indexed_a: this.indexed_a,
            html_b: this.html_b, doc_b: this.doc_b, node_encoder: this.node_encoder});



        
        // Don't need to specify transformet???
        this.node_match_to_transformed_node_without_children = new Node_Match_To_Transformed_Node({
            transformer: tr_nwc, indexed_a: this.indexed_a,
            html_b: this.html_b, doc_b: this.doc_b, node_encoder: this.node_encoder
        });


        // Want some other checks here.




        // Possibly need to match other things too.
        // Though this structure is maybe not so good.
        // Making it more like a unit of detecting a case and processing it together?
        //  That being a reconciliation.

        // Worth developing this class system a bit further at least - but the reconciliation (incl multi reconciliation) system could help.
        // Multiple measured reconciliations could be of use.

        // See about making the process and API(s) clearer overall.
        //  Also next need to see about encoding inner nodes rather than just writing them.

        // Need to try multiple delta solutions.







    }


    // Would like matching and resolution code defined together and run in a sequence (or even tree).
    //  Would be great to have the various different checks (incl transformations) to be arranged and set up in a way that makes it
    //  easy to add more of them.

    // Some specific kinds of document delta resolutions.
    //  Maybe have tests for those specific resolutions.


    // Could have multiple resolution lists?
    // Or a delta resolution decision tree?

    // A more OO way to compare the pairs of HTML may help a lot.
    //  Using instances of the classes, having plenty of them, and dense on the page.
    // A more functional way too possibly? Defining what they look for, and how to construct the deltas in terms of functions?

    // Main thing to aim for is easy integration of logic.
    // What can be checked to find a working / good / perfect delta encoding.
    // A specific class for doing these checks and comparisons could help.
    //   At least, doing them in a general-purpose way, with the transformations loaded in.

    // Being able to more directly use transformation results, directly using the transformations, having transformation use encoded
    //  as a delta (type?) or as an instruction.

    // Maybe concise representation of double transformation (inc non-symmetrical) as well.



















    check(node) {

        // so if this.match_node can solve it...

        // symt_node_without_children_match

        const res_enm = this.exact_match_node.check(node);
        //console.log('res_enm', res_enm);

        if (res_enm && res_enm.solved) {
            return res_enm
        } else {

                //const arr_check_results = [this.exact_match_node.check(node), this.symt_node_without_children_match.check(node)];

            // symm nwt would apply when node in "b" does not have children anyway.

            // But then after this, maybe there is a case where it's doing 'write' where it should do further recursion with an encode
            //  node function? Not always, not sure.

            // The symmetric NWC matches should work OK....
            

            const res_nwcm = this.symt_node_without_children_match.check(node);


            //console.log('res_nwcm', res_nwcm);

            if (res_nwcm) {
                //console.log('res_nwcm', res_nwcm);
                //throw 'stop';
                return res_nwcm;
            } else {


                const res_to_nwc = this.node_match_to_transformed_node_without_children.check(node);
                // So a node from doc "b" should be getting matched to a node without children from doc "a".
                //  Though maybe for reasons of encoding size it's not getting used??? Not sure it does the size comparison for smallest
                //  encoding size though.

                // Nice if an HTML_Pair_Comparison could itself identify that the nodes match in some way.
                //console.log('res_to_nwc', res_to_nwc);

                if (res_to_nwc) {
                    return res_to_nwc;
                } else {


                }
            }

            // Check the next one....
            // Symmetrical nodes without children matching.
            //  Seems easiest if they are not all done as classes, but as instances of classes.
            //  Want to be able to edit them easily in 1 file at least.

            // cre8 // del // upd8 // ins // 

            //console.log('arr_check_results', arr_check_results);

            //console.trace();
            //throw 'stop';

            //let res_subcheck = this.exact_match_node.check(node);


            /*

            if (res_subcheck) {
                //console.log('res_subcheck', res_subcheck);
                return res_subcheck;

                

                if (res_subcheck.perfect === true) {
                    //return res_subcheck;
                }
                
            }

            */

        }

        


    }

}

module.exports = General;