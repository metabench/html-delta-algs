const HTML_Indexer = require('./Util_Extended_HTML_Indexer');

// In-depth comparison.

// This would be the right place to include code that carries out xpath comparisons.

class HTML_Pair_Comparison {
    constructor(...a) {

        if (a.length === 2) {
            if (typeof a[0] === 'string' && typeof a[1] === 'string') {

                if (a[0] === a[1]) {
                    this.identical = true;
                } else {
                    this.identical = false;

                    this.indexed_a = new HTML_Indexer(a[0]);
                    this.indexed_b = new HTML_Indexer(a[1]);

                    // Then an object / objects to hold things that match / correspond between them...?

                    // This comparison in some cases will get very close to, or will, identify the full delta.
                    //  Not sure if this should provide the instructon to make the delta....
                    //  If it's easy and within the obvious remit / params here.


                    this.generate_comparison();

                }



                // Identifying (from the xpaths) whether the complement can be represented by the adding or removal of one node.
                //  Or even structurally, the adding or removal of multiple nodes.
                //  Assessing this for the full delta changes, rather than just structure?
                //  Xpaths will help check for changes involving structure, including keeping same structure and changing other things.

                // Using data about xpaths from the pair comparions would help a lot.
                //  Though possibly the comparison itself could generate the delta, or something very close to it / that can be used as
                //  a delta.

                // But mainly this needs to focus on producing the comparison.
                //  It may be another step to use that to make the delta.

                // Could have some getter properties to calculate some things....
                //  Such as whether / info on a single node (with children / depth) being added to document "a" to produce document "b".

                // As in identical, apart from the following differences....


                // Not sure about coding in too many special case checks here.
                //  Maybe in a subclass?








                


                // Then process the various things that can be compared between them.

                // Or do that later....
                //  this.generate_comparison();

            } else {
                console.trace();
                throw 'NYI';
            }
        } else {
            console.trace();
            throw 'NYI';
        }

    }

    get a() {
        return this.indexed_a;
    }
    get b() {
        return this.indexed_b;
    }

    generate_comparison() {


        const xpaths = () => {
            const sxpa = new Set(this.indexed_a.xpaths), sxpb = new Set(this.indexed_b.xpaths);

            const union = (setA, setB) => new Set([...setA, ...setB]);
            const intersection = (setA, setB) => new Set([...setA].filter(item => setB.has(item)));

            const setDifference = (setA, setB) => {
                const onlyInA = new Set([...setA].filter(item => !setB.has(item)));
                const onlyInB = new Set([...setB].filter(item => !setA.has(item)));
                return [onlyInA, onlyInB];
            };


            //console.log('sxpa', sxpa);

            const a_intersection_b = intersection(sxpa, sxpb);

            //console.log('a_intersection_b', a_intersection_b);

            // if it's the same length as set a (and set b?)...?
            //  There won't be any exclusive to either.


            this.xpaths = {};

            if (sxpa.size === a_intersection_b.size && sxpb.size === a_intersection_b.size) {
                // The xpaths are the same!
                //  That means that some types of delta encoding / reconciliation becomes possible.
                //  The same HTML structures (as well as text nodes)
                
                this.xpaths.identical = true;
                // That would be a way to encode the fact, but leave another part of the module to use it.


            } else {
                this.xpaths.intersection = a_intersection_b;
                this.xpaths.complements = setDifference(sxpa, sxpb);



            }
        }

        xpaths();

        // Hashes / direct matches.
        // Hashes / transformed matches.
        
        // Possibly do full doc hashes in some cases, such as < 4K size docs.
        //  Possibly not though...
        //  Working on resolutions that are fairly simple and work accross large docs would be better.


        // A Delta_Solution_Check could use the xpath comparison results here.

        // Then in some cases, maybe after a comparison, it offers the solution.

        // Or may be worth coding further comparisons into this class / a subclass of it.

        // Identifying a single node that's in the complements.
        //  Could detect multiple nodes being added to the structure.

        // easily calculate the depth of xpaths.

        // But when all xpaths start with the first... that means they are all within that first xpath.
        //  Could also look for other xpath groupings for other things.

        // Def is worth making some interchangable solution check objects.
        //  Could swap them for improved ones later.

        // Looking into xpaths to detect elements being added and removed in corresponding places will help.














        




    }
}


module.exports = HTML_Pair_Comparison;