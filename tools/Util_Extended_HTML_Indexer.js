const Simple_Extended_HTML_Indexer = require('./Simple_Extended_HTML_Indexer');

// On the way to better dtd handling.
// May want a different test structure to test has.dtd.

// And work on the dual indexer and comparison system...?



class Util_Extended_HTML_Indexer extends Simple_Extended_HTML_Indexer {

    // arr_arr_child_node_indexes[] - [i] refers the array of the indexes of the child nodes of node i, if it has any.
    //  Could make for faster traversal (in some cases?)
    //  May be useful when iterating and comparing two trees.

    // Storing the structures of the nodes could be very helpful.
    // So could the depths (an int)
    //  both depth as in how deep it is from the root
    //  and how deep that node extends
    // content_depth I suppose. maybe inner_depth.

    // assign_inner_depths(root_node) elsewhere I suppose.

    // Probably want some separate testing for dealing with DTDs.

    


    constructor(...a) {
        super(...a);
        const that = this;
        this.has = {
            get dtd() {
                // only at node 0???

                // hashed_lookup???
                //  so it will hash the string and then compare....

                // find / lookup_node_index_by_html(str_html)
                //  has_node_with_html

                // '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'
                //  Would be best to check against multiple possible DTDs (efficiently).
                //   May mean a few hash lookups, should be fine.


                return that.has_node_with_html('<!DOCTYPE html>')
                || that.has_node_with_html('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">')
                || that.has_node_with_html('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">')
                ;
            }
        }
    }

    // get hashes

    // data.hashes???
    //   different types of hashes as well, eg the node itself, the node under transformations.
    // data.hashes.untransformed ??
    // data.hashes.transformed[transformer_name]

    // all arrays?

    // data.arrays_of_node_hashes?
    // data.arrs_of_node_hashes.untransformed ???  /by node index?
    //   .transformed

    // data.by_node_index.hashes.untransformed
    


    // needs to 




    get xpaths() {
        return Array.from(this.data.node_indexes_by_xpath.keys());
    }

    get nodes() {
        return this.data.nodes;
    }
}

module.exports = Util_Extended_HTML_Indexer;