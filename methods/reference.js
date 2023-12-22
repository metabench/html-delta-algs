
/*

Want to generate some deltas and apply them using a simple algorithm which should offer some savings, but does not need to offer a great amount
of saving, and can be a simple reference implementation that is reliable and shows that the API is working.

Should get a bunch of hashes from doc a, then see about reconstructing doc b using them (and what else would need to be used).
Could also see about repeated HTML structures here with changes to them?
Best to keep the implementation details simple and concise.





*/

// Or don't insist it's the same structure?
// Want a (simple) reference implementation.
//  Could make direct reference to some nodes.
//   (no transformers?)
//  Then also define entirely new nodes when needed.
//   But can those new nodes match a structure from doc a?
//    Maybe not needed in the reference implementation.
//     Could maybe have a 'reference-transform' implementation that can transform what is referred to.
//      Could even be recursive?
//      Or implement its own stack.
//     Devising those transforms are basically a same structure special case.
//      Writing algorithms that solve only special cases could be quite helpful overall, as a more general algo could use the special case
//      one as part of its recursion.









// References, then same structure deltas too.
//  So when it finds the same HTML structure, it runs the function recursively on that.
//  See about it accepting HTML nodes (classes) or text.
//   Maybe accept different DOM object formats too.
//   htmlparser2 dom seems like a decent one for the moment.



// reference-transform-similar-structures (-provide-all-else)
//  Direct copy of parts of b?


// Maybe have a longer description for the method.

// reference-a-copy-same-transform-same-structures-copy-remining-from-b



const method_name = "reference";





const method_description = `
A fast running, relatively simple algorithm, not trying to get the very best delta sizes
Reference "a",
copy exact elements,
transform structures that appear in "a" but with different data (attribs, text nodes)
provide the parts of "b" that are needed to fill in the blanks in a way that shows where they are needed
  (could provide it all as one string, with indexes to places, or as array of strings)
  Array of strings seems much nicer here
So filling in blanks will be about inserting strings into particular positions of "b".
  Consider intermediate states of "b" as it is being (re)built.
  Instructions such as insert this content within node index i.
Maybe having it produce an algorithm to produce "b" from "a" is too advanced.
  Could see about it just providing a simpler compressed version of "a" making reference to "a".
  Maybe it would be best to make a "simple-reference" implementation that will make the delta using simple references to what is
  in "a" wherever possible.
Want to make a "simple-reference" implementation first, so that an improved or new version could be compared against it
This implementation maybe should have text / script deltaing where it's identified to work.
  Same xpath, for example.









`

// Then will make the improved version, using the array maps.
//  

const create = (a, b) => {

  

        


    // Check if they have the same structure.
    //  Then if they do, run the special case.
    //   Could run a same-structure special case.
    //    Maybe the 





    // Seems like maybe we should load doc 'a' into a very comprehensive data structure?
    //  Or some single object that holds a lot of references to doc a.
    //  Also does seem very worth making use of the positions within the strings rather than xpaths in many cases.
    //   May be harder to obtain in some cases.
    //   Lower level peeking into the tokeniser and parser could help with this.

    // Though if using xpath is easier in this case (or maybe hashes of el html, they would be easy to get from a single scan)
    //  then use that.
    // Though indexes of the elements / nodes seem easiest still.

    // Could give it transformation function in order to change one node to another.
    //  So it could refer to a node in doc a, but with some changes.

    console.trace();
    throw 'NYI';







    //const r1 = create(a, b);


    // Maybe an HTML_Delta object.


    return {
        method_name,
        value: r1
    }
}

const res = {
    create,
    apply: (a, o_delta) => {

      

      //console.log('o_delta', o_delta);

      console.log('o_delta', JSON.stringify(o_delta, null, 4));

      console.trace();
      throw 'NYI';
        

    }
}

module.exports = res;



