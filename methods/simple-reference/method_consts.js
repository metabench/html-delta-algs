// Could be broken down into a kind of VM description.

// Want to further compact the format.

// This gets into the territory of defining the instruction set.


const method_name = "simple-reference";
const method_codename = 'sr';

// Defining the instructions as functions here (or elsewhere) could be helpful.
//  would have access to one or more indexed ref docs.



// While more instructions would help, it seems best to arrange and code the instructions in a more organised way.
// Maybe applying a reconciliation would be just one of the instructions.

// Reconciliations looks like a way to express what we already have in a more modular way.

// Instruction classes, subclasses and instances could help.





const arr_instruction_names = [
    'copy doc "a"',
    'copy node by "a" index',
    'copy node by "a" index, replace children',
    'write',
    'insert string',
    'remove string'
]

// shorter / much shorter codenames could help.
//  Maybe could assume it's always about doc a.

const arr_instruction_codenames = [
    'ca',
    'I',
    'i',
    'w',
    'is',
    'rs'
]

const map_instruction_names_by_codenames = new Map(arr_instruction_codenames.map((cn, i) => [cn, arr_instruction_names[i]]));
const map_instruction_codenames_by_names = new Map(arr_instruction_names.map((cn, i) => [cn, arr_instruction_codenames[i]]));
const arr_instruction_property_names = [
    'a_node_index',
    'children',
    'string',
    'position',
    'length'
    
]
const arr_instruction_property_codenames = [
    'ani',
    'c',
    's',
    'p',
    'l'
]
const map_instruction_property_names_by_codenames = new Map(arr_instruction_property_codenames.map((cn, i) => [cn, arr_instruction_property_names[i]]));
const map_instruction_property_codenames_by_names = new Map(arr_instruction_property_names.map((cn, i) => [cn, arr_instruction_property_codenames[i]]));
const method_description = `
A fast running, simple algorithm, looking to make some savings but not expecting very much from this simple reference implementation
Reference "a",
copy exact elements / nodes
provide the rest as HTML code to go at that place in the document.
can not insert inside any copied element.
just either copy an element (and everything inside it) or recreate the element as it appears in doc "b"
`


module.exports = {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 

    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 

    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,

    method_description,

    abbreviate_instruction_names: true,
    abbreviate_instruction_property_names: true
}