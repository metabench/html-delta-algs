const HTML_Delta = require('../../HTML_Delta');

const {tof} = require('lang-mini');

const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 
    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 
    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,
    method_description,
    abbreviate_instruction_names,
    abbreviate_instruction_property_names
} = require('./method_consts');

// Maybe recursive...

const abbreviate_instruction = instruction => {
    const t_i = tof(instruction);

    if (t_i === 'string') {
        const instuction_name = instruction;
        if (map_instruction_codenames_by_names.has(instuction_name)) {
            const abbreviated_instruction_name = map_instruction_codenames_by_names.get(instuction_name);
            return abbreviated_instruction_name;

        }

    } else if (t_i === 'array') {
        if (instruction.length === 2) {
            const [instuction_name, instruction_param] = instruction;
            const abbreviated_instruction_name = map_instruction_codenames_by_names.get(instuction_name);

            // In some cases the param will need further compression.

            return [abbreviated_instruction_name, instruction_param];

            //console.log('instruction_param', instruction_param);
            //console.trace();
            //throw 'stop';


        } else {
            console.trace();
            throw 'stop';
        }
    }

}

const abbreviate_instrictions = instructions => {

    const res = instructions.map(abbreviate_instruction);
    return res;

}

const abbreviate_delta = (delta) => {
    //const {abbreviate_instruction_names, abbreviate_instruction_property_names} = o_settings;

    // Need to rebuild the delta 

    const res = new HTML_Delta();

    //console.log('delta', delta);

    if (abbreviate_instruction_names) {
        res.m = 'sr';
        res.i = abbreviate_instrictions(delta.instructions || delta.i);

        return res;

        //res.m = delta.method_name || 
    } else {
        console.trace();
        throw 'stop';
    }






}

module.exports = abbreviate_delta;