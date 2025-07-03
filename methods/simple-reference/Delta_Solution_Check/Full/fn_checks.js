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
    console.log('select_xpaths_roots xpaths:', xpaths);
}

// Check text added within text node?
// Check text added at end of text node?


// Checking for a single text insert.
//   Checking for text added to the end of a text node.


/*

const check_text_node_text_appended = (html_pair_comparison) => {


    const cxp = html_pair_comparison.xpaths;
    console.log('html_pair_comparison', html_pair_comparison);

    console.log('html_pair_comparison.indexed_a.doc.name', html_pair_comparison.indexed_a.doc.name);
    console.log('html_pair_comparison.indexed_b.doc.name', html_pair_comparison.indexed_b.doc.name);

    console.log('html_pair_comparison.indexed_a.data.nodes.length', html_pair_comparison.indexed_a.data.nodes.length);
    console.log('html_pair_comparison.indexed_b.data.nodes.length', html_pair_comparison.indexed_b.data.nodes.length);


    console.log('html_pair_comparison.indexed_a.data.nodes', html_pair_comparison.indexed_a.data.nodes);
    console.trace();
    //throw 'stop'

    return false;
    if (cxp.complements) {
        const a_complements = cxp.complements[0];
        const b_complements = cxp.complements[1];
        if (a_complements.size === 0) {
            const abc = [...b_complements].sort();
            if (isFirstStringPrefixOfAll(abc)) {
                const node_to_add_xpath = abc[0];
                const i_b_node = html_pair_comparison.indexed_b.data.node_indexes_by_xpath.get(node_to_add_xpath);
                const b_node = html_pair_comparison.indexed_b.nodes[i_b_node];
                const pos_b_node = [b_node.startIndex, b_node.endIndex + 1];
                const l_b_node_html = pos_b_node[1] - pos_b_node[0];
                if (l_b_node_html + html_pair_comparison.indexed_a.html.length === html_pair_comparison.indexed_b.html.length) {
                    const a_html = html_pair_comparison.indexed_a.html;
                    const b_html = html_pair_comparison.indexed_b.html;
                    const b_node_html = b_html.substring(...pos_b_node);
                    const part1 = a_html.substring(0, pos_b_node[0]);
                    const part2 = a_html.substring(pos_b_node[0]);
                    const rec_str_res = part1 + b_node_html + part2;
                    if (rec_str_res === b_html) {
                        const res = new HTML_Delta();
                        res.method_name = 'simple-reference';
                        res.instructions = ['copy doc "a"', ['insert string', [b_node_html, pos_b_node[0]]]];
                        return res;
                    }
                }
            }
        }
    }
}

*/

const check_node_added = (html_pair_comparison) => {
    const cxp = html_pair_comparison.xpaths;
    if (cxp.complements) {
        const a_complements = cxp.complements[0];
        const b_complements = cxp.complements[1];
        if (a_complements.size === 0) {
            const abc = [...b_complements].sort();
            if (isFirstStringPrefixOfAll(abc)) {
                const node_to_add_xpath = abc[0];
                const i_b_node = html_pair_comparison.indexed_b.data.node_indexes_by_xpath.get(node_to_add_xpath);
                const b_node = html_pair_comparison.indexed_b.nodes[i_b_node];
                const pos_b_node = [b_node.startIndex, b_node.endIndex + 1];
                const l_b_node_html = pos_b_node[1] - pos_b_node[0];
                if (l_b_node_html + html_pair_comparison.indexed_a.html.length === html_pair_comparison.indexed_b.html.length) {
                    const a_html = html_pair_comparison.indexed_a.html;
                    const b_html = html_pair_comparison.indexed_b.html;
                    const b_node_html = b_html.substring(...pos_b_node);
                    const part1 = a_html.substring(0, pos_b_node[0]);
                    const part2 = a_html.substring(pos_b_node[0]);
                    const rec_str_res = part1 + b_node_html + part2;
                    if (rec_str_res === b_html) {
                        const res = new HTML_Delta();
                        res.method_name = 'simple-reference';
                        res.instructions = ['copy doc "a"', ['insert string', [b_node_html, pos_b_node[0]]]];
                        return res;
                    }
                }
            }
        }
    }
}
const check_nodes_added_removed_changed = (html_pair_comparison) => {
    const c_xpaths = html_pair_comparison.xpaths;
    //console.log('c_xpaths', c_xpaths);
    const {intersection, complements} = c_xpaths;
    let comp_a, comp_b;
    if (complements) [comp_a, comp_b] = complements;
    const a_nodes = html_pair_comparison.a.nodes, b_nodes = html_pair_comparison.b.nodes;
    //console.log('a_nodes.length', a_nodes.length);
    const arr_a_index_unchanged_nodes = [], arr_a_index_matching_both_without_children = [];
    for (const a_node of a_nodes) {
        //console.log('a_node.xpath', a_node.xpath);
        if (intersection) {
            if (intersection.has(a_node.xpath)) {
                const do_corresponding_xpaths_nodes_comparisons = () => {
                    const b_node_index = html_pair_comparison.b.data.node_indexes_by_xpath.get(a_node.xpath);
                    const b_node = b_nodes[b_node_index];
                    const indexed_a_node_further_info = html_pair_comparison.a.data.by_node_index[a_node.idx];
                    const indexed_b_node_further_info = html_pair_comparison.b.data.by_node_index[b_node.idx];
                    if (indexed_a_node_further_info.hashes.untransformed === 
                        indexed_b_node_further_info.hashes.untransformed) {
                            arr_a_index_unchanged_nodes.push(a_node.idx);
                    } else if (indexed_a_node_further_info.hashes.transformed &&
                               indexed_b_node_further_info.hashes.transformed) {
                        if (indexed_a_node_further_info.hashes.transformed['node without children'] ===
                            indexed_b_node_further_info.hashes.transformed['node without children']
                        ) {
                            arr_a_index_matching_both_without_children.push(a_node.idx);
                        }
                    }
                }
                const res_cxpsncs = do_corresponding_xpaths_nodes_comparisons();
            } else {
            }
        }
    }
    //console.log('[arr_a_index_unchanged_nodes, arr_a_index_matching_both_without_children]', [arr_a_index_unchanged_nodes, arr_a_index_matching_both_without_children])
}
const checks = (html_pair_comparison) => { 
    let res = false;

    // check_text_node_text_appended
    //res = check_text_node_text_appended(html_pair_comparison);
    //if (res) return res;
    res = check_node_added(html_pair_comparison);
    if (res) return res;
    res = check_nodes_added_removed_changed(html_pair_comparison);
    if (res) return res;
    return res;
}
module.exports = checks;