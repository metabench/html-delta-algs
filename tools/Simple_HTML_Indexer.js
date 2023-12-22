const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;
const crypto = require('crypto');
const {arrayify, is_array, each} = require('lang-mini');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('./tools');

// May want to improve on this.
//  Maybe first improve the structure - more abstractions, shorter code, holding off on features.
//  Or maybe keeping this here as one implementation of it will make sense.

// Or more like an Indexed_HTML_Document once it's constructed.
//  More than indexed really. Data in an expanded-upon state.


// Further functionality such as single element removal...




class Simple_HTML_Indexer {
    constructor(html) {
        if (typeof html === 'string') {
            this.html = html;
            this.load_from_string(html)
        } else {
            console.trace();
            throw 'NYI';
        }
    }

    init_empty_this_dot_data() {
        this.data = {
            nodes: [],
            node_indexes_by_hash: new Map(),
            node_indexes_by_structure_hash: new Map(),
            node_indexes_by_nodes_with_removed_children_hash: new Map(),
            nodes_by_xpath: new Map(),
            node_indexes_by_xpath: new Map(),
            script_text_nodes_text: [],
            script_text_nodes_text_by_xpath: new Map(),
            script_text_nodes_text_indexes_by_hash: new Map(),
            style_text_nodes_text: [],
            style_text_nodes_text_indexes_by_hash: new Map(),
            element_text_nodes_text: [],
            element_text_nodes_text_indexes_by_hash: new Map(),
            element_structures: [],
            element_structure_indexes_by_hash: new Map(),
            element_attribute_sets: [],
            element_attribute_set_indexes_by_hash: new Map(),
            element_attribute_key_sets: [],
            element_attribute_key_set_indexes_by_hash: new Map(),
            element_attribute_keys: [],
            element_attribute_key_indexes_by_hash: new Map(),
            element_attribute_values: [],
            element_attribute_value_indexes_by_hash: new Map(),
            element_structures_with_empty_attrib_values: [],
            element_structures_with_empty_attrib_values_indexes_by_hash: new Map()
        }

        return this.data;

    }

    // Make a callback available for extensions?
    //  So that it can do further checks, and if things get found, it can save them as results...
    //   Or even immediately decide to encode it in a specific way.
    // Defining extra value hash maps (mapping to the indexes of the nodes), then checking them (could specify transformation to apply to check)
    
    // Eg remove specific element from doc b to get what's represented in doc a.
    // Checking what happens when deleting any element from doc b.
    //  Comparing it to the hash of doc a.
    //  So it's a few more things to check, can check in linear time if it's set up correctly.
    //  Would be interesting to make some thorough linear time algorithms.


    // Some plugins could handle some specific comparisons.
    //  Things such as finding that removing a specific element from doc b results in doc a.
    //   So compare against the doc a hash (or length first).
    //   That will mean for every element within doc b, making a copy of doc b with it removed, get its hash, then compare to the hash of doc a
    


    // find_representation...
    // get_representation_of_node_making_reference_to_anything_within_or_derived_from_doc_a











    // Running this on doc b in the diffing process (a, b) would help.
    // Add to this the hash of the entire doc / snippet with any specific element (and all children) removed.

    // So the hash of the document with a transformation dependent on that element.
    //  Removal of element being the transformation.
    //  Maybe could consider copying the element in place to be a transformation with the same param(s).

    // HTML_Transformation or Transformation.
    // Docs like nodes...?

    // Defining and then being able to apply transformations.
    //  Would help having definition of them in js code when it comes to encoding them efficiently as binary.

    // HTML_Transformation for the moment.
    //  function, 2 params on one level: , (html, param) - but the transformation function will have flexibility on the structure of 'param'.


    // HTML_Transformer class?
    //  Things such as 'remove element, return string of doc'.
    //  an apply(html) function.
    //   functionality to parse string then use that parsed format.
    //    or reference it when it's there already???

    // Have a domparser2 doc that we are using for reference, cloning parts of it???






    // Tranformers, and being specific about white space removal and encoding exactly what was done will be helpful here.
    //  Saving the hashes of documents that we then delete, to prove we had them??? Blockchain security there.













    load_from_string(str_el) {

        // Have a callback, but also expose the .data object?

        const data = this.init_empty_this_dot_data();
       
        let i_node = 0;
        let i_element_text_data = 0;
        let i_script_text_data = 0;
        let i_style_text_data = 0;
        let i_attr_key = 0;
        let i_attr_value = 0;
        let i_attr_set = 0;
        let i_attr_key_set = 0;
        let i_element_structures = 0;
        const ensure_attr_key = arrayify(key => {
            const hash = calc_hash_256bit(key).toString('hex');
            if (!data.element_attribute_key_indexes_by_hash.has(hash)) {
                data.element_attribute_keys.push(key);
                data.element_attribute_key_indexes_by_hash.set(hash, i_attr_key++);
            }
        })


        const ensure_attr_value = arrayify(value => {
            const hash = calc_hash_256bit(value).toString('hex');
            if (!data.element_attribute_value_indexes_by_hash.has(hash)) {
                data.element_attribute_values.push(value);
                data.element_attribute_value_indexes_by_hash.set(hash, i_attr_value++);
            }
        });
        const load_script_node = (node) => {
            if (node.children && node.children.length === 1) {
                const child = node.children[0];
                if (child.type === 'text') {
                    child.xpath = node.xpath + '/text()[1]';
                    const {data} = child;
                    const h = calc_hash_256bit(data).toString('hex');
                    const [hmap, tarr] = [data.script_text_nodes_text_indexes_by_hash, data.script_text_nodes_text];
                    if (!hmap.has(h)) {
                        tarr.push(data);
                        hmap.set(h, i_script_text_data++);
                    }
                }
                data.node_indexes_by_xpath.set(child.xpath, child.idx);
                data.nodes_by_xpath.set(child.xpath, child);
            }
        }
        const load_style_node = (node) => {
            if (node.children && node.children.length === 1) {
                const child = node.children[0];
                if (child.type === 'text') {
                    child.xpath = node.xpath + '/text()[1]';
                    const {data} = child;
                    const h = calc_hash_256bit(data).toString('hex');
                    const [hmap, tarr] = [data.style_text_nodes_text_indexes_by_hash, data.style_text_nodes_text];
                    if (!hmap.has(h)) {
                        tarr.push(data);
                        hmap.set(h, i_style_text_data++);
                    }
                    if (child.idx !== undefined) {
                        data.node_indexes_by_xpath.set(child.xpath, child.idx);
                    } 
                    data.nodes_by_xpath.set(child.xpath, child);
                }
            }
        }

        // The hash of the document / full HTML, with that element removed. Not so sure it's O(N)???
        //  Should be when we have the [start, end] positions of the element / node.

        // A callback on each node in the doc seems simple enough.
        // The hash of the whole doc / full html in the indexer (doc from the indexer's perspective) without every specific node.

        // That seems like it would be good to have organised separately in a file or file(s), very precise about responsibilities.
        //  The check - being part of the diffing / delta finding process for docs (a, b), producing the delta d to then be able to do
        //  f(a, d) ==> b

        // So be able to check for things depending on an iteration in doc b.
        //  Advise not to have loops in here that depend on the absolute size of anything.




        // Function to quickly determine node categories...?
        //  

        // Awareness that the hashes store references to particular things.
        // But lets incorportate saving the hash of the doc when the element has been removed.
        //  Better to use positions and string ops.




        iterate_node(str_el, (node, idx, depth, stop, dont_descend) => {

            // Call a node handler, even this.handle_node ???
            //  Then there can be plugin node handlers on iteration.
            //  Realistically the node handler could have much more concise logic.
            //   Or less.

            // Could it maybe get a bunch of objects / hashes as results of a function (maybe interchangable / upgradable)
            //  and then indicate that some things, such as element attribute sets, can be extracted from nodes
            //   (some but not all nodes).

            // Something with a much more extensive collection of function calls to index and check for specific things will help.
            //  That way, observations of the coder in terms of what it should do can be encapsulated into single files / objects.


            // Checking for representaions by transformations...
            //  See about moving some of the current checks to a new infrastructure.
            
            
            // So, indexing the hash of the document itself, and being able to use it when answering 'what is' queries.
            // So to find a delta (or part of it), when we are looking for doc b or something within it, we can then ask the
            //  HTML_Indexer of doc "a" what that hash means to it - and it could then answer that it's the hash of doc "a" even.

            // If the indexer of doc "b" creates hashes that include doc b but with any specific doc b element removed, then we could spot a
            // direct match.

            // Spotting a direct match of things which have got a deterministically derivable transformation from doc "b" or something within it.
            // Seems like we need a single map of hashes per indexer...?
            //  Would be easier to find matches.

            // hash_html function.... renders if html, returns hex hash.
            //  

            // All the different hash maps would make comparisons more difficult.

            // Be able to look up matches in a single hash map of a node that has been transformed.
            //  So each transformer could have its own hash that then gets hashed with the hash of the transformed node.
            //   Multiple transformations could hash in turn on the results.

            // And not just transformations on the node itself - transformations on the whole document (or parts of it) by removing a
            //  specific node.

            // May be able to have iterative search function that keeps generating and then improving deltas, first getting working ones,
            //  then improving them. A GA could be appropriate, with it being able to (sometimes) copy transformations over from other
            //  deltas in the candidate population.

            // Anyway, to the coding...


            // Want to include the transformed docs in the current main hash set.

            // Basically computing and hashing transformed encodings either of the document or the node itself.
            //  (or something else???)

            // An encoding of how to get to the value (from doc a), then hash of the value itself.

            // So an encoding such as 'Copy node i, insert the following inside node i2'?
            //  Or insert the following within a specific string position.

            // The value of some transformed result hashed, with the transformation itself (hashed???)

            // Could have a bunch of (doc_a, node) transformation functions, that produces a result from both the
            //  "a" doc or snippet and the node itself within "a". Meaning removing that specific node, or all instances of it, from doc
            //  "a" would be a valid transformation. It does not just need to transform the node itself, but it's really taking doc "a"
            //  and the node as input.
















            






            



            


            if (is_array(node)) {
                console.trace();
                throw 'node should not be an array here.';
            }
            data.nodes.push(node);
            node.idx = data.nodes.length - 1;

            // Seems like a case of saving a transformed version of the node to a hash index.

            if (node.children) { 
                const childless_hash = calc_hash_256bit(render_as_childless(node)).toString('hex');
                if (!data.node_indexes_by_nodes_with_removed_children_hash.has(childless_hash)) {
                    data.node_indexes_by_nodes_with_removed_children_hash.set(childless_hash, data.nodes.length - 1);
                }
            }
            if (node.xpath) {
                data.nodes_by_xpath.set(node.xpath, node);
                data.node_indexes_by_xpath.set(node.xpath, data.nodes.length - 1);
            }
            if (node.type === 'tag') {
                const node_html = render(node);
                const node_html_hash = calc_hash_256bit(node_html).toString('hex');
                if (!data.node_indexes_by_hash.has(node_html_hash)) {
                    data.node_indexes_by_hash.set(node_html_hash, data.nodes.length - 1);
                }
                const node_structure_html = (remake_html_to_els_structure(node_html));
                if (node_structure_html) {
                    const node_structure_html_hash = calc_hash_256bit(node_structure_html).toString('hex');
                    if (!data.element_structure_indexes_by_hash.has(node_structure_html_hash)) {
                        data.element_structures.push(node_structure_html);
                        data.element_structure_indexes_by_hash.set(node_structure_html_hash, i_element_structures++);
                    }
                    if (!data.node_indexes_by_structure_hash.has(node_structure_html_hash)) {
                        data.node_indexes_by_structure_hash.set(node_structure_html_hash, i_node);
                    }
                }
                const atrs = Object.entries(node.attribs);
                if (atrs.length > 0) {
                    const json_atrs = JSON.stringify(atrs);
                    const json_atrs_hash = calc_hash_256bit(json_atrs).toString('hex');
                    const attr_keys = Array.from(Object.keys(node.attribs));
                    if (attr_keys.length > 1) {
                        const json_attr_keys = JSON.stringify(attr_keys);
                        const json_attrs_keys_hash = calc_hash_256bit(json_attr_keys).toString('hex');
                        if (!data.element_attribute_key_set_indexes_by_hash.has(json_attrs_keys_hash)) {
                            data.element_attribute_key_sets.push(attr_keys);
                            data.element_attribute_key_set_indexes_by_hash.set(json_attrs_keys_hash, i_attr_key_set++);
                        }
                    }
                    if (!data.element_attribute_value_indexes_by_hash.has(json_atrs_hash)) {
                        data.element_attribute_sets.push(atrs);
                        data.element_attribute_value_indexes_by_hash.set(json_atrs_hash, i_attr_set++);
                    }
                    each(atrs, (item) => {
                        const [key, value] = item;
                        ensure_attr_key(key);
                        ensure_attr_value(value);
                    });
                }
            } else if (node.type === 'directive') {

            } else if (node.type === 'text') {
                const {data} = node;
                if (data.length > 0) {
                    const text_data_hash = calc_hash_256bit(data).toString('hex');
                    if (!data.element_text_nodes_text_indexes_by_hash.has(text_data_hash)) {
                        data.element_text_nodes_text_indexes_by_hash.set(text_data_hash, i_element_text_data++);
                        data.element_text_nodes_text.push(data);
                    }
                }
            } else if (node.type === 'comment') {
                // Would be best to index comments, to make lossless HTML deltas and compression.

            } else if (node.type === 'script') {
                load_script_node(node);
                dont_descend();
            } else if (node.type === 'style') {
                load_style_node(node);
                dont_descend();
            } else {
                console.log('node.type', node.type);
                console.log('depth', depth);
                if (is_array(node)) {
                    console.trace();
                    throw 'Node should not be an array here.';
                    console.log('node.length', node.length);
                    console.log('node', node);
                    console.log('node', node + '');
                    console.log('Object.keys(node)', Object.keys(node));
                }
                console.trace();
                throw 'NYI';
            }
            i_node++;
        });
    }

    // Want to be able to look up a match for a node as a transformed node (or main doc or snippet) for any node / html.
    //  So if we are asking it for the whole document but with something removed, we should be able to look that up.

    // Maybe an Extendable_HTML_Indexer would be a better one to work on.
    //  A very simple core implementation, well complex enough to enable the plugins that do the work.

    // Will allow multiple indexing handlers to run per node.
    // Node_Feature_Indexer ???
    //  things like indexing the node's html, it's html without children, the doc minus that node (and all its children)
    //  These values would be stored as hashes, so that direct matches can be found.
    //   The direct matches will be useful for reconstructing doc b.


    // So it can lookup a node, and then lookup the node transformed against the hashes of something or other, involving the or a node,
    //  transformed.

    




    find_identical_node(node) {
        if (node === undefined) {
            return undefined;
        } else {
            if (typeof node === 'string') {
                const html = node;
                const hash = calc_hash_256bit(html).toString('hex');
                const node_idx = this.data.node_indexes_by_hash.get(hash);
                if (typeof node_idx === 'number') {
                    return node_idx;
                }
            } else {
                const html = render(node);
                return this.find_identical_node(html);
            }
        }
    }
    find_node_matching_as_childless = (node) => {
        if (node && node.children && node.children.length > 0) {
            const ch_html = render_as_childless(node);
            const hash = calc_hash_256bit(ch_html).toString('hex');
            const node_idx = this.data.node_indexes_by_nodes_with_removed_children_hash.get(hash);
            return node_idx;
        }
    }
}
module.exports = Simple_HTML_Indexer;