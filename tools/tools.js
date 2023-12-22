const cheerio = require('cheerio');
const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;

const {is_array} = require('lang-mini');

function outerHTML (element) {
    var index = element.index();
    var parent = element.parent().clone();
    var child = parent.children()[index];
    parent.empty();
    parent.append(child);
    return parent.html();
}



const read_first_tag_name = str_html => {
    let pos1 = str_html.indexOf('<');

    if (pos1 > -1) {
        let pos2 = str_html.indexOf('>', pos1);

        let el_opening = str_html.substring(pos1 + 1, pos2);
        let pos3 = el_opening.indexOf(' ');
        if (pos3 === -1) return el_opening;

        return el_opening.substring(0, pos3);
    }

    

}

const remake_html_to_els_structure = str_html => {

    if (str_html.startsWith('<!doctype html>')) {

        return remake_html_to_els_structure(str_html.substring('<!doctype html>'.length));

    } else {

        const $ = cheerio.load(str_html);

        // see about iterating over the text nodes.

        // Could even remove svg.

        const iterate_nodes = (element) => {
            const to_remove = [];
            element.contents().each((_, el) => {
            if (el.type === 'text') {
                //console.log('text', el.data);
                to_remove.push(el);

                // 
                //el.data = el.data.trim();

            } else {
                if (el.type === 'comment' || el.name === 'comment') {
                    to_remove.push(el);
                } else if (el.type === 'script' || el.name === 'script') {
                    to_remove.push(el);
                } else if (el.type === 'svg' || el.name === 'svg') {
                    to_remove.push(el);
                } else if (el.type === 'style' || el.name === 'style') {
                    to_remove.push(el);
                } else {

                    //console.log('el.attribs', el.attribs);
                    if (el.attribs) {
                        if (Object.keys(el.attribs).length > 0) {

                            el.attribs = {};
                        }
                    }

                    iterate_nodes($(el));
                }

                
            }
            });
            for (const el_to_remove of to_remove) {
                //el_to_remove.parent.children.remove(el_to_remove);

                const index = el_to_remove.parent.children.indexOf(el_to_remove);
                el_to_remove.parent.children.splice(index, 1);

                //el_to_remove.parent.children = el_to_remove.parent.children.filter(item => item !== el_to_remove)
            }
        };
        
        // Start iterating from the root element
        iterate_nodes($.root());
        /*
        $.root().contents().each((_, el) => {
            if (el.type === 'text') {
            console.log('text el.data', el.data);
            } else if (el.type === 'tag') {
            iterateOverTextNodes($(el));
            }
        });

        */

        //const serializedHtml = $.html().split('<!DOCTYPE html>').join('');

        // see what the first element in str_html is???



        //const bodyHtml = $('body').html();
        //const serializedHtml = $.root().html({ xml: true });
        //console.log('serializedHtml', serializedHtml);
        //console.log('str_html', str_html);
        //return bodyHtml;

        //console.log('str_html.substring(0, 100)', str_html.substring(0, 100));
        // Depending on what the first tag of the str_html is...

        // read_first_tag_name

        const first_tag_name = read_first_tag_name(str_html);

        if (first_tag_name === undefined) {

        } else if (first_tag_name === 'html') {
            const serializedHtml = $.html();


            //console.log('serializedHtml.substring(0, 100)', serializedHtml.substring(0, 100));
            //console.log('\n\n');
            
            //console.trace();
            //throw 'nyi';
            return serializedHtml;
        } else {
            //console.log('first_tag_name', first_tag_name);

            if (first_tag_name === 'head') {
                //const serializedHtml = $($('head')[0]).html();
                const serializedHtml = outerHTML($('head'));
    
    
                //console.log('serializedHtml.substring(0, 100)', serializedHtml.substring(0, 100));
                //console.log('\n\n');
                
                //console.trace();
                //throw 'nyi';
                return serializedHtml;
            } else if (first_tag_name === 'body') {
                //const serializedHtml = $.html();

                const serializedHtml = outerHTML($('body'));
    
    
                //console.log('serializedHtml.substring(0, 100)', serializedHtml.substring(0, 100));
                //console.log('\n\n');
                
                //console.trace();
                //throw 'nyi';
                return serializedHtml;
            } else {
                const serializedHtml = $('body').html();

                //console.log('serializedHtml.substring(0, 100)', serializedHtml.substring(0, 100));
                
    
                //console.log('serializedHtml.substring(0, 100)', serializedHtml.substring(0, 100));
                //console.log('\n\n');
                
                //console.trace();
                //throw 'nyi';
                return serializedHtml;
            }


        }
        

    }

    
}


const render_as_childless = (node) => {
    //if (typeof node === 'stri')


    if (typeof node === 'string') {
        return render_as_childless(parse_str_html_node(node));

    } else {
        const _ch = node.children;
        node.children = [];
        const res = render(node);
        node.children = _ch;
        return res;
    }

    
}


const parse_str_html_node = str_html_node => {
    if (typeof str_html_node === 'string') {
        let _dom;
        const handler = new DomHandler((error, dom) => {
            if (error) {
                console.error(error);
            } else {
                _dom = dom;
            }
        }, {
            withStartIndices: true,
            withEndIndices: true
        });
        const parser = new Parser(handler);
        parser.write(str_html_node);
        parser.end();

        if (is_array(_dom)) {
            if (_dom.length === 1) {
                return _dom[0];
            }
        }

        return _dom;
    } else if (is_array(str_html_node)) {
        console.trace();
        throw 'should not be array';
    } else {

        // maybe an array???
        console.log('str_html_node', str_html_node);
        console.trace();
        throw 'stoop';


        //throw 'parse_str_html_node - Expected string';
        return str_html_node;
    }
}


// Looks loads simpler without the xpath and sibling index stuff.
const mini_updn_iterate_node = (node, callback) => {
    if (typeof node === 'string') {
        return mini_iterate_node((parse_str_html_node(node)), callback);
    } else {
        let idx = -1, ctu = true;
        const stop = () => ctu = false;
        const traverse = (nodes, depth = 0, parentStartIndex = 0) => {
            if (ctu) {
                idx++;
                for (const node of nodes) {
                    let traverse_children = true;
                    const cb_idx = idx;

                    // But if the node itself is an array???

                    callback(node, cb_idx, depth, stop, () => traverse_children = false);
                    if (ctu && traverse_children && node.children) {
                        traverse(node.children, depth + 1, node.startIndex);
                        callback(node, cb_idx, depth, stop);
                    }
                }
            }
        }
        traverse([node]);
    }
}

const mini_iterate_node = (node, callback) => {
    if (typeof node === 'string') {
        return mini_iterate_node((parse_str_html_node(node)), callback);
    } else {

        // If the node is an array...
        //  Not very sure about cases of directives and other nodes.
        //  Or even if there is a very general way to handle it.

        // Could treat that as depth 0.
        
        // 



        let idx = -1, ctu = true;
        const stop = () => ctu = false;
        const traverse = (nodes, depth = 0, parentStartIndex = 0) => {
            if (ctu) {
                idx++;
                for (const node of nodes) {
                    let traverse_children = true;
                    //console.log('node', node);
                    if (is_array(node)) {
                        // Traverse that array....
                        traverse(node, depth + 1, parentStartIndex);
                        //console.trace();
                        //throw 'node should not be an array here.';
                    } else {
                        callback(node, idx, depth, stop, () => traverse_children = false);
                        if (ctu && traverse_children && node.children) {
                            traverse(node.children, depth + 1, node.startIndex);
                            //callback(node, idx, depth, stop);
                        }
                    }

                    
                }
            }
        }
        //traverse([node]);

        if (is_array(node)) {
            traverse(node);
        } else {
            traverse([node]);
        }
        
    }
}

// Callbacks providing a relation with the previous node?
//  such as 'parent'? 'grandparent'? ['up', 3] ???

// Tree traversal primitaves in this kind of system could help.



// And a specific assign xpaths function...?
//  Itself could use the mini iterate node function.

// This mini_iterate calls back once on a node.
//  Depth-first I think.
//  Seems we want a version that calls the callback 'on the way back up as well', if there are child nodes.
const _chat_gpt_failed_assign_xpaths = (node) => {
    const root = node;

    // Initialize the sibling index information for the root node
    let last_depth = -1;
    const arr_sibling_index_infos = [];
    let current_sibling_index_infos;

    // Traverse the tree using mini_updn_iterate_node



    mini_updn_iterate_node(root, (node, index, depth, stop, dont_descend) => {
        // If node.index is not defined, set it to the current index
        if (node.index === undefined) node.index = index;

        console.log('Processing node:', node.tag || node.name, 'Depth:', depth, 'Parent XPath:', node.parent.xpath);

        let depth_change = depth - last_depth;

        //let str_direction_moved = ''; // down, next, up. 1, 0, -1??
        //   or it's the depth change.

        // positive, negitive, how much.




        // Handle depth transitions
        if (depth_change < 0) {
            // Moving back up the depth, remove the last sibling index info


            arr_sibling_index_infos.pop();


            current_sibling_index_infos = arr_sibling_index_infos[arr_sibling_index_infos.length - 1];
        } else if (depth === last_depth + 1) {
            // At a new depth, create new sibling index info
            current_sibling_index_infos = [{}, { text: 1 }];
            arr_sibling_index_infos.push(current_sibling_index_infos);
        }

        // Check if the node is a text node or has a name (regular node)
        if (node.type === 'text') {
            // Increment text node sibling index and assign XPath
            current_sibling_index_infos[1]['text']++;
            node.xpath = `${node.parent.xpath}/text()[${current_sibling_index_infos[1]['text']}]`;
            console.log('Text node XPath:', node.xpath);
        } else if (node.name) {
            // Increment regular node sibling index and assign XPath
            if (current_sibling_index_infos[0][node.name]) {
                current_sibling_index_infos[0][node.name]++;
            } else {
                current_sibling_index_infos[0][node.name] = 1;
            }
            node.xpath = `${node.parent.xpath}/${node.name}[${current_sibling_index_infos[0][node.name]}]`;
            console.log('Regular node XPath:', node.xpath);
        } else {
            // Unhandled node type
            console.log('Unhandled node type:', node.type);
            console.trace();
            throw 'stop';
        }

        // Update the last depth for the next iteration
        last_depth = depth;
    });

    return root;
};


// Lets fix this...
//  The iterator function could work better without the callbacks on moving back upwards.
//  As the xpaths don't need to be assigned then.
//   Could see that the xpath has already been assigned, and move to the next child.
//   Some extra info provided in the callback could help.
//    Though maybe depth should be enough.
//   'up', 'down', 'next_sibling'.
//   or ['up', 4] even.

// Breaking the logic into even more explicit parts may be very helpful with this.






rpt = (fn, n) => {
    for (let i = 0; i < n; i++) {
        fn(); // Call the function
    }
}



// Or some kind of recursive function that does the iteration itself???
//  Using a separate function to iterate seems good at first, would be nice to have more concise code that way.

// Could keep the siblings indexes as a local variable, in a scope???
//  May work better that way when traversing the doc with traversal code inline in that fn?

// Or the traversal function could itself callback with the sibling index of type.
//  typed sibling index value.

// Def looks like an improved iteration pattern could help.



const assign_xpaths = (node) => {


    // Maybe a separate traversal to assign overall indexes???

    //console.log('assign_xpaths\n\n');

    // Other iterators will need to handle arrays too.
    //  Maybe use util iterators that ignore the directives.

    let idx = 0;

    const handleNode = (node, parentXPath = '', depth = 0, siblingIndex = {}) => {
        const { type, name, children } = node;

        if (is_array(node)) {
            // length 2?
            if (node.length === 2) {
                if (node[0].type === 'directive' && node[1].type === 'tag') {
                    // Ignore the directive.
                    return handleNode(node[1]);
                } else {
                    console.trace();
                    throw 'NYI';
                }
            } else if (node.length === 3) {
                if (node[0].type === 'directive' && node[1].type === 'text' && node[2].type === 'tag') {
                    // Ignore the directive.
                    return handleNode(node[2]);
                } else {
                    console.trace();
                    throw 'NYI';
                }
            } else {

                // directive, then text node (empty space, check that...?, then element)

                console.log('node', node);
                console.trace();
                throw 'NYI';
            }

        } else {

            //console.log('handleNode node.type', node.type);
            node.idx = idx++;

            const updateIndex = (indexInfo, nodeName) => {
                indexInfo[nodeName] = (indexInfo[nodeName] || 0) + 1;
                return indexInfo[nodeName];
            };

            const assignXPath = (nodeName, index) => {
                return `${parentXPath}/${nodeName}[${index}]`;
            };

            const assignTextXPath = (index) => {
                return `${parentXPath}/text()[${index}]`;
            };

            if (type === 'text') {
                const textIndex = updateIndex(siblingIndex, 'text');
                node.xpath = assignTextXPath(textIndex);
            } else if (name) {
                const nodeIndex = updateIndex(siblingIndex, name);
                node.xpath = assignXPath(name, nodeIndex);
            }

            if (children) {
                children.reduce((acc, child) => handleNode(child, node.xpath, depth + 1, acc), {});
            }

            return siblingIndex;

        }

        //console.log('node', node);

        // so if the node is an array...
        //  and the first is a processing instruction...
        //  and its the root...?

        
    };

    handleNode(node);

    return node;
};



// A simplified version that assigns all the xpaths to start with may work better.
// 

const simplified_iterate_node = (node, callback) => {
    // need to parse it if it's a string...
    //  just parse_str_html_node

    // The parsed node should not include doctype directive?

    node = typeof node === 'string' ? parse_str_html_node(node) : node;

    //console.log('node', node);

    assign_xpaths(node);

    // not mini_iterate_node should handle (and skip) directives?
    //  or even the directive is the first node (node 0).
    //  makes sense to make the handling comprehensive.



    mini_iterate_node(node, callback);

}

const iterate_node = simplified_iterate_node;



module.exports = {
    remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths,

    rpt
};