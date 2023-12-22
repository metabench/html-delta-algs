
// But will also include something saying what delta algorithm is being used.
//  Or what delta format, really.

// formats such as:
//  https://github.com/icflorescu/textdiff version 1
//  format name, and version string as well?
//   or version int. The major version should be the only one that matters?
//   Or minor and middle if it's less than 1.0.0 I suppose.
//    Version could be string or int.

// Would be left there by default.

// Could me make an object extend 'string' even?
//  Being the JSON string representation of the encoded delta.

// Need consistent, performant, easy to use difference finding patch system for compression of similar documents and strings.
//  Likely newer versions of downloaded docs.

// And will have delta alg names, versions too. Always include name, optionally include version.
//  Though could have a default encoding???

// The icflorescu/textdiff/+issue-4-enchanced algorithm seems like a good one to use.
//  Would produce a JS array.
//  Should make for relatively concise diff strings, which can then be compressed alongside other (similar?) diff strings in an
//  array of compressed objects.

// Should work on the compressed objects array storage.
//  Storing a sequence of diffs / delta patches (used for compression) in such an array of compressed objects should be efficient.

// An easy to use delta / diff API looks like it would be useful, and also want to allow for improved non-backwards compatible diffing methods,
//  and being able to identify which specific diffing method is used. Different versions of a module that use a different method could have a different
//  diffing method name string.

const method_names = ['reference', 'simple-reference'];
const method_file_names = ['reference', 'simple-reference']

const o_methods = {};
const a_methods = [];
//const map_methods_by_index = new Map();
const map_methods_by_name = new Map();


method_file_names.forEach((x, i) => {
    const method = require('./methods/' + x);
    o_methods[method_names[i]] = method;
    a_methods.push(method);
    map_methods_by_name.set(method_names[i], method);
})

//console.log('map_methods_by_name', map_methods_by_name);

// Worth using a class - so being able to set and modify the method.





const Delta_Processor = require('./HTML_Delta_Finder');

if (require.main === module) {
    const dp = new Delta_Processor();

    const test_a_b = (a, b) => {
        const d = dp.create(a, b);
        //console.log('d', d);

        const b2 = dp.apply(a, d);
        console.log('b2 === b', b2 === b); // does it work?
    }

    //const a = 'Sphinx in the quartz mirror, judge of vowels and verbs';
    //const b = 'Sphinx of black quartz, judge my vow';

    test_a_b(
        'Sphinx in the quartz mirror, judge of vowels and verbs',
        'Sphinx of black quartz, judge my vow'
    );

    // A test of a fairly short HTML doc...?
    


    // Then the value size itself...
    //  Size of the delta when encoded in JSON?
    
    // Need to see about saving these appropriately to compressed arrays in the system.
    

}


const get_delta = (a, b) => {

}

const apply_delta = (a, b) => {

}

module.exports = Delta_Processor;
