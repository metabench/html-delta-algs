const test = require('node:test');
const assert = require('node:assert/strict');
const HTML_Delta_Finder = require('../HTML_Delta_Finder');
const df = new HTML_Delta_Finder();
const { unpack, pack } = require('msgpackr');
const zlib = require('zlib');
const lblue = num => '\x1b[34m' + num.toLocaleString() + '\x1b[0m'
const lorange = num => '\x1b[38;5;208m' + num.toLocaleString() + '\x1b[0m'
const lred = num => '\x1b[31m' + num.toLocaleString() + '\x1b[0m'
const lblack = num => '\x1b[30m' + num.toLocaleString() + '\x1b[0m';
const lgreen = num => '\x1b[32m' + num.toLocaleString() + '\x1b[0m';
const lyellow = num => '\x1b[33m' + num.toLocaleString() + '\x1b[0m';
const lmagenta = num => '\x1b[35m' + num.toLocaleString() + '\x1b[0m';
const lcyan = num => '\x1b[36m' + num.toLocaleString() + '\x1b[0m';
const lwhite = num => '\x1b[37m' + num.toLocaleString() + '\x1b[0m';
const lgray = num => '\x1b[90m' + num.toLocaleString() + '\x1b[0m';
const llight_red = num => '\x1b[91m' + num.toLocaleString() + '\x1b[0m';
const llight_green = num => '\x1b[92m' + num.toLocaleString() + '\x1b[0m';
const llight_yellow = num => '\x1b[93m' + num.toLocaleString() + '\x1b[0m';
const llight_blue = num => '\x1b[94m' + num.toLocaleString() + '\x1b[0m';
const llight_magenta = num => '\x1b[95m' + num.toLocaleString() + '\x1b[0m';
const llight_cyan = num => '\x1b[96m' + num.toLocaleString() + '\x1b[0m';
const llight_white = num => '\x1b[97m' + num.toLocaleString() + '\x1b[0m';
const ldblue = num => '\x1b[38;5;33m' + num.toLocaleString() + '\x1b[0m';
const lpink = num => '\x1b[38;5;206m' + num.toLocaleString() + '\x1b[0m';
const lteal = num => '\x1b[38;5;51m' + num.toLocaleString() + '\x1b[0m';
const lpurple = num => '\x1b[38;5;129m' + num.toLocaleString() + '\x1b[0m';
const lbrown = num => '\x1b[38;5;130m' + num.toLocaleString() + '\x1b[0m';
const lmaroon = num => '\x1b[38;5;52m' + num.toLocaleString() + '\x1b[0m';
const lnavy = num => '\x1b[38;5;18m' + num.toLocaleString() + '\x1b[0m';
const lgold = num => '\x1b[38;5;220m' + num.toLocaleString() + '\x1b[0m';
const lcoral = num => '\x1b[38;5;210m' + num.toLocaleString() + '\x1b[0m';
const lindigo = num => '\x1b[38;5;54m' + num.toLocaleString() + '\x1b[0m';
const lsilver = num => '\x1b[38;5;145m' + num.toLocaleString() + '\x1b[0m';
const lbeige = num => '\x1b[38;5;230m' + num.toLocaleString() + '\x1b[0m';
const lkhaki = num => '\x1b[38;5;185m' + num.toLocaleString() + '\x1b[0m';
const lcrimson = num => '\x1b[38;5;196m' + num.toLocaleString() + '\x1b[0m';
const red_or_green = num => num > 0 ? lgreen(num) : lred(num);
let i = 0;
const test_a_b = (a, b) => {
    console.log('');
    const d = df.create(a, b);
    console.log('doc a', a);
    console.log('doc a.length', a.length);
    console.log('doc b', b);
    console.log('doc b.length', b.length);
    console.log('delta', i, JSON.stringify(d, null, 0));
    const packed = pack(d);
    const jsonl = JSON.stringify(d).length;
    console.log('jsonl', jsonl);
    const bcompressed = zlib.brotliCompressSync(JSON.stringify(d), {
        params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 10
        }
});
    const jl = packed.length;
    console.log('packed.length', llight_blue(packed.length));
    console.log('bcompressed.length', llight_blue(bcompressed.length));
    const b_saved = b.length - jl;
    console.log('b_saved', red_or_green(b_saved));
    const b2 = df.apply(a, d);
    console.log('b2', b2);
    console.log('b ', b);
    assert.equal(b2, b, 'Create delta, apply it');
    i++;
}
test('Identical very small HTML Docs', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body></body></html>`
    );
});
test('Added dtd to very small HTML doc', () => {
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
    );
});
test('Removed dtd from very small HTML doc', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body></body></html>`
    );
});
test('Insert content into body of very small HTML doc (no dtds)', () => {
    test_a_b(
        `<html><head><title></title></head><body></body></html>`,
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
});
test('Insert content into body of very small HTML doc (with dtds)', () => {
    test_a_b(
        `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
});
test('Minimal HTML docs with extra spaceing', () => {
    test_a_b(
        `<html><head><title>
         </title></head><body></body></html>`,
        `<html><head><title>   </title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
});
false && test('Spacing within minimal HTML Docs', () => {
    test_a_b(
        `<html><head><title>A simple test</title></head><body></body></html>`,
        `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
    );
    test_a_b(
        `<html><head><title>A simple test</title></head><body></body></html>`,
        `<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
    );
    test_a_b(
        `<html><head><script>
        console.log("hi");
        </script>
        <title>A simple test</title></head><body></body></html>`,
        `<html><head><title>A simple test</title><script></script></head><body><div>
        <span>A simple test</span>
        </div></body></html>`,
    );
    test_a_b(
        `<!DOCTYPE html><html><head><title>A less modest change</title></head><body>Text to be removed</body></html>`,
        `<!DOCTYPE html><html><head><title></title></head><body>A modest change</body></html>`
    );
    test_a_b(
        `<html><head><title>A less modest change</title></head><body>Text to be removed</body></html>`,
        `<html><head><title></title></head><body>A modest change</body></html>`
    );
        const existing_tests = () => {
        test_a_b(
            `<html><head><title>A simple test</title></head><body></body></html>`,
            `<html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
        );
        test_a_b(
            `<!DOCTYPE html><html><head><title>A simple test</title></head><body></body></html>`,
            `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
        );
        test_a_b(
            `<html><head><title>A simple test</title></head><body></body></html>`,
            `<!DOCTYPE html><html><head><title></title></head><body><div><ul><li>li1</li><li>li2</li></ul></div></body></html>`
        );
        test_a_b(
            `<html><head><title>A simple test</title></head><body></body></html>`,
            `<html><head><title>A simple test</title></head><body><div><span>A simple test</span></div></body></html>`,
        );
        test_a_b(
            `<html><head><script>console.log("hi");</script><title>A simple test</title></head><body></body></html>`,
            `<html><head><title>A simple test</title><script></script></head><body><div><span>A simple test</span></div></body></html>`,
        );
    }
})