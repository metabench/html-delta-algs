
const HTML_Delta = require('./HTML_Delta');



const method_names = ['simple-reference', 'reference'];
const method_file_names = ['simple-reference', 'reference']

//const o_methods = {};
const a_methods = [];
//const map_methods_by_index = new Map();
const map_methods_by_name = new Map();


method_file_names.forEach((x, i) => {
    const method = require('./methods/' + x);
    //o_methods[method_names[i]] = method;
    a_methods.push(method);
    map_methods_by_name.set(method_names[i], method);
    map_methods_by_name.set(method.codename, method);
})

//console.log('map_methods_by_name', map_methods_by_name);


// Should the finder do the apply?
//  Not in implementation 2. Don't significantly change this for the moment.




class HTML_Delta_Finder {
    constructor(spec = {}) {

        // Options as well in create probably.



        this.method_name = 'simple-reference';
    }
    create(a, b) {
        const method = map_methods_by_name.get(this.method_name);
        console.log('Delta finding method name:', this.method_name);
        const res = method.create(a, b);
        //console.log('res', res);
        return res;
    }
    apply(a, delta) {
        //console.log('a', a);

        if (delta.unchanged === true) {
            return a;
        } else {

            //console.log('delta.method_name', delta.method_name);
            //console.log('delta.method', delta.method);
            //console.log('delta.m', delta.m);
            //console.log('delta', delta);
            const method = map_methods_by_name.get(delta.method_name || delta.m || delta.method);

            //console.log('method', method);

            //console.log('delta', delta);

            const res = method.apply(a, delta);
            return res;

        }

        
    }
}

if (require.main === module) {
    // Test the HTML_Delta_Finder

    // Want to build in the correct operations to handle a variety of delta tasks.
    //   Inserting text (within a text node only?) being one such operation.


    const finder = new HTML_Delta_Finder();
    const a = '<div>Hello</div>';
    const b = '<div>Hello World</div>';
    const delta = finder.create(a, b);
    console.log('Delta:', JSON.stringify(delta));
    const result = finder.apply(a, delta);
    console.log('Result:', result);

    const delta_json_length = JSON.stringify(delta).length;
    console.log('b.length', b.length);
    console.log('delta_json_length', delta_json_length);
}

module.exports = HTML_Delta_Finder;