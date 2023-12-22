// And do individual checks.

// Can have them in a simple sequence here.
// check_one_node_moved perhaps.

// check_node_added
//  meaning a node gets added somewhere within "a" to turn it into "b".
//   that node would need to be provided / encoded.
const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 
    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 
    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,
    method_description,
    abbreviate_instruction_names,
    abbreviate_instruction_property_names
} = require('../../method_consts');

const HTML_Delta = require('../../../../HTML_Delta');

const isFirstStringPrefixOfAll = arr => arr.every((str, index) => (index === 0 ? true : str.startsWith(arr[0])));


const select_xpaths_roots = xpaths => {
    // need to go through each of them.
    //  do any of them stare with any previously identified roots?

    // The roots of the complements...?


    console.log('select_xpaths_roots xpaths:', xpaths);

    // And will do that on the complements.
    //  Though maybe should make more use of some 'without children' comparisons.
    //  Maybe should make some 'without attribs' comparisions, and 'without attribs or children' even.

    // Think it would only be used in the 'complements'.

    // Where all the nodes below any node would then be covered by that top node.
    //  Could sort by length first.








}


// An 'abbreviate' functon could be helpful...
// The check(s) to do with xpaths.

// Multiple nodes added, removed, modified?
// Using xpaths.
const check_node_added = (html_pair_comparison) => {
    // Determination best made by looking at the xpaths.
    const cxp = html_pair_comparison.xpaths;
    //console.log('cxp', cxp);
    //console.log('html_pair_comparison', html_pair_comparison);
    // then do all of the nodes in b complement start with / descend from the first one there?
    if (cxp.complements) {
        const a_complements = cxp.complements[0];
        const b_complements = cxp.complements[1];

        if (a_complements.size === 0) {
            //console.log('b_complements', b_complements);
            const abc = [...b_complements].sort();
            //console.log('abc', abc);

            if (isFirstStringPrefixOfAll(abc)) {
                //console.log('all are desc from one node in "b"');

                // OK, in this case, we have identified a node which was added to "a" to make "b".
                //  Then retrieve that node from "b" by its xpath.

                // May need to consider a few complications??? Node should always be appendable to the parent node in "a" / "b".
                //  Not sure.

                // Look up that "b" node by xpath.
                //  Should be able to place it in exactly its same position as in "b".

                const node_to_add_xpath = abc[0];
                const i_b_node = html_pair_comparison.indexed_b.data.node_indexes_by_xpath.get(node_to_add_xpath);
                const b_node = html_pair_comparison.indexed_b.nodes[i_b_node];
                //console.log('b_node', b_node);
                const pos_b_node = [b_node.startIndex, b_node.endIndex + 1];
                // then the length of that b node...
                const l_b_node_html = pos_b_node[1] - pos_b_node[0];
                //console.log('pos_b_node', pos_b_node);

                if (l_b_node_html + html_pair_comparison.indexed_a.html.length === html_pair_comparison.indexed_b.html.length) {

                    // Then can we get it from the original HTML???
                    //  Or encode that "b" node?

                    const a_html = html_pair_comparison.indexed_a.html;
                    const b_html = html_pair_comparison.indexed_b.html;
                    const b_node_html = b_html.substring(...pos_b_node);
                    //console.log('b_node_html', b_node_html);

                    // Then need to actually work it out to test if it's actually the same...

                    const part1 = a_html.substring(0, pos_b_node[0]);
                    const part2 = a_html.substring(pos_b_node[0]);

                    //console.log('part1', part1);

                    const rec_str_res = part1 + b_node_html + part2;

                    if (rec_str_res === b_html) {
                        const res = new HTML_Delta();

                        // Maybe some simple low level functionality in the Delta itself saying more exactly what the delta is...
                        //  Ie node was added, in position p / xpath xp, etc.
                        // Then the delta would be encodable in a vary compact way.
                        // Multiple levels of encoding / compression could help when there are many different things that could take place on
                        // one level, independent of other levels.

                        // Need to encode this using the simple instructions currently in the set.
                        // Maybe 'copy doc "a" to the results (overwrite)' would be a good instruction - and only to use it as the very
                        //  first instruction.
                        // Could have specially encoded first instructions.
                        // Then once that instruction has completed, can do another instruction to insert string within it.

                        // Or see about encoding whatever node is to be added....
                        // Could compare that with size of direct string representation.




                        res.method_name = 'simple-reference';
                        // Then the instructions...

                        // or the abbreviation 'if' here?

                        // Would be neater to have a separate abbreviate or abbreviate if necessary phase.
                        //  Could use string replacements...?





                        res.instructions = ['copy doc "a"', ['insert string', [b_node_html, pos_b_node[0]]]];

                        // Then can see about abbreviating instructions.

                        // Could have 'abbreviate' and 'unabbreviate' functions.







                        return res;


                    }
                }


                // maybe option to return the delta here or not...
                //   We at least have something which can be expressed very simply - but if no longer referring to anything in
                //   "b", we would need to write out the HTML.


                // so, it will be:
                //  copy "a" and then insert the string... at the position...

                // Simpler than encoding the node - but remember these can be upgraded and swapped, so don't worry about
                //  making them all perfect for the moment.

                // Maybe it could actually return an HTML_Delta object.

            }
        }
    }
}




const check_nodes_added_removed_changed = (html_pair_comparison) => {

    // A possibly more extensive comparison system between the xpaths.
    //  May need to first check if there is enough overlap between the xpaths.
    //  Could have a fairly simple heuristic for that.


    // This is more specifically seeing what gets changed to produce a delta specifying that.
    //  Will be a better way to express changes than rebuilding "b" in some cases.

    // Could list the nodes added, changed, and removed all as groups.
    //  As in 3 separate sections with different info on nodes.



    // And determination for every node in "a", was it changed or removed?
    //  Or moved even...?
    //   Then can approach it like 'copy doc "a" and make some changes'.

    // this delta system should be smaller in some / many cases.

    // Probably can do a few things with complement (b) xpath roots.
    //  They are (essentially?) the nodes that would need to be inserted.
    //  Not sure about very significant different structures...
    //   Other delta encoding methods would be more effective.


    // removed, nodes modified, nodes added.

    // insertions in string or html doc positions?
    
    // want really fast processing.
    //  reconstructing using strings from "a" would likely be better, direct string references.
    // could create an array of strings to represent doc b as it gets built.

    // Maybe start with the node comparisons and changes.


    // Root nodes removed
    // Root nodes added
    // Changes to any nodes

    














    // Compare the two xpathss.

    // Everything the same
    // Everything added
    // Everything removed

    // Which elements are the same apart from children (sharing same xpaths)
    // Then which elements are the same apart from attribues and children (sharing xpaths)

    // Will need to do multiple comparisons, ie what has been added, removed, changed, left the same.

    // Xpath similarities.


    const c_xpaths = html_pair_comparison.xpaths;
    console.log('c_xpaths', c_xpaths);

    // Then which of the intersecting xpaths have identical elements?
    //  but not necessarily identical content.

    const {intersection, complements} = c_xpaths;

    let comp_a, comp_b;
    
    if (complements) [comp_a, comp_b] = complements;

    // Go through everything in the intersection?
    // Maybe better to go through everything in doc a.


    // So iterating doc a seems like the way to go.
    //  Is there an iterator that can compare the docs as well?

    const a_nodes = html_pair_comparison.a.nodes, b_nodes = html_pair_comparison.b.nodes;

    console.log('a_nodes.length', a_nodes.length);

    // An array (for the moment?) of what the changes to be made to the nodes of "a" are?
    
    // Or also build arrays / sets of which nodes require which changes to be represented in doc b.

    const arr_a_index_unchanged_nodes = [], arr_a_index_matching_both_without_children = [];


    // Need to go somewhat more into identifying the specefic changes to the nodes.
    //  Identifying if attributes change (and then if it would be the same children as "a")...

    //  Need to identify a few things that will indicate how a node from "a" gets represented in "b"
    //   (and then also to add in new nodes from "b" that don't have corresponding nodes in "a")
    //   Or identify other ways that nodes from "b" could correspond with nodes from "a".

    // The hashes of node structures could really help a lot here too.

    // Identifying changes to the children of nodes....
    // But for the moment work with the xpath intersection set and complement sets.
    //  They should / will cover every node in both documents.

    // The non-intersecting nodes???

    // Nodes deleted from "a"
    //  And we have their node indexes from "a".
    //  Nodes that are (fully) the same (incl descendents)
    //  Nodes that have the same attrs but different children.















    for (const a_node of a_nodes) {

        console.log('a_node.xpath', a_node.xpath);
        //console.log('a_node', a_node);

        // But is it in the set of intersections of xpaths?
        // If so, is it the same in terms of attributes?
        // Then are the child nodes the same?

        // May need to see about if it has child nodes that are in the complements of/for b.
        //  If so, somehow encode those child nodes.
        
        // Maybe also worth determining the structure being the same.
        //  So all child nodes, without attribs, (without text as well?)
        //  Structure is textless, for the moment.
        //  TextlessAttriblessStructure may be the better name to use for this overall.

        // (Xpath)MatchingTextlessAttriblessStructure

        // But want to go more into how the nodes correspond / are associated with each other.

        if (intersection) {
            if (intersection.has(a_node.xpath)) {

                // Check if the nodes are (fully) identical.
                // Would need different logic for nodes which can have children???
                //  Want really simple logic that covers it all where poss.

                // Want some really fast comparisons.
                //  The HTML pair comparison should identify the matching nodes by id.
                //   Possibly with matching xpaths nodes.
                //   Each entry in the map could even include another map or a set?
                //  Do not want to only refer to the first instance of the hash of a node when multiple nodes of the same node by hash exist.

                // Maybe have a system to identify the duplicate nodes in docs a and b.
                //  Then could simply refer back to the initial index.

                // Do want to do (a bit?) more identifying the indexes of nodes that match?


                // Corresponding (xpath?) node comparisons.
                // Nodes could correspond for other reasons too.

                const do_corresponding_xpaths_nodes_comparisons = () => {
                    // the node from docs a and b
                    const b_node_index = html_pair_comparison.b.data.node_indexes_by_xpath.get(a_node.xpath);
                    const b_node = b_nodes[b_node_index];

                    // then what comparisons???

                    // could look at the hashes???

                    //console.log('Object.keys(a_node)', Object.keys(a_node));
                    //console.log('Object.keys(b_node)', Object.keys(b_node));

                    // Do we have some kind of array of the hashes as well?
                    //  Definitely would help.
                    //  Maybe arrays of some other hashes too.
                    //   All by index.

                    // access the transformed indexes array....

                    const indexed_a_node_further_info = html_pair_comparison.a.data.by_node_index[a_node.idx];
                    const indexed_b_node_further_info = html_pair_comparison.b.data.by_node_index[b_node.idx];

                    //console.log('indexed_a_node_further_info', indexed_a_node_further_info);
                    //console.log('indexed_b_node_further_info', indexed_b_node_further_info);

                    // are they identical matches?

                    if (indexed_a_node_further_info.hashes.untransformed === 
                        indexed_b_node_further_info.hashes.untransformed) {

                            arr_a_index_unchanged_nodes.push(a_node.idx);

                        // Identical match.

                    } else if (indexed_a_node_further_info.hashes.transformed &&
                               indexed_b_node_further_info.hashes.transformed) {
                        
                        // A without children is hash of B
                        // B without children is hash of A

                        // Also the structures? We don't get hashes of them at the moment I think.
                        // May be more efficient to get them from a parallel document.

                        // As in the node is the same but the children change.

                        
                        if (indexed_a_node_further_info.hashes.transformed['node without children'] ===
                            indexed_b_node_further_info.hashes.transformed['node without children']
                        ) {

                            // At least the attributes match here.
                            //  But a node without children (double without children?)

                            arr_a_index_matching_both_without_children.push(a_node.idx);


                        }
                    }
                    // 
                }

                const res_cxpsncs = do_corresponding_xpaths_nodes_comparisons();

                //console.log('res_cxpsncs', res_cxpsncs);











            } else {
                // Probably would need to remove that xpath - have some kind of notation in the delta for removing nodes.
                //  May want to efficiently specify the removal of multiple nodes, perhaps the indexes of all root removal nodes in doc "a".
                //  They would be easy to process quickly to start with, using string positions as well.





            }
        }
    }

    console.log('[arr_a_index_unchanged_nodes, arr_a_index_matching_both_without_children]', [arr_a_index_unchanged_nodes, arr_a_index_matching_both_without_children])

    // But which nodes from "b" would then need to be included...?
    //  See about getting the root nodes from the b xpaths complements.

    // Maybe a function to get the root nodes from a set or array of xpaths.
    // Or root xpaths at least.

    // Need to see which are the root nodes in "b" that get added to what gets copied over directly from "a".

    // determine xpaths roots


















    // then go through the intersecting xpaths.
    // see which of them have and have not changed

    // Elements self_unchanged (not descendent nodes)
    // Elements fully unchanged (inc desc nodes)
    // Non-element nodes???
    // Or text and non-text nodes?

    // Or all about nodes here....
    //  Nodes seems more pragmatic.

    // Nodes that can have children.

    // changes by xpaths....



    

    // Basically starting with doc "a" what changes need to take place?





    //const unchanged_intersecting




















}
// see if it can calculate the delta of everything between the docs.
// could see what overlap, if any/much there is between the xpaths.







const checks = (html_pair_comparison) => { 

    let res = false;

    res = check_node_added(html_pair_comparison);
    if (res) return res;

    res = check_nodes_added_removed_changed(html_pair_comparison);
    if (res) return res;


    return res;
}


module.exports = checks;