

class HTML_Transformer {
    constructor(spec) {
        // name and fn.

        this.name = spec.name;
        this.fn = spec.fn;
        this.type = spec.type || '(doc)';
        this.skip = spec.skip;

        this.perf_cost = spec.perf_cost;

    }
}

module.exports = HTML_Transformer;