

const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 

    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 

    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,

    method_description
} = require('./simple-reference/method_consts');

const find_delta = require('./simple-reference/find_delta');
const apply_delta = require('./simple-reference/apply_delta');

const res = {
    name: method_name,
    codename: method_codename,
    create: find_delta,
    find_delta,
    apply: apply_delta,
    apply_delta
}
module.exports = res;