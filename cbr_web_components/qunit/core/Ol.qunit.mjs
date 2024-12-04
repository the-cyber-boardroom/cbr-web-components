// // Ol.qunit.mjs
// import Ol  from '../../js/core/Ol.mjs'
// import Tag from '../../js/core/Tag.mjs'
//
// const { module, test } = QUnit
//
// module('Ol', hooks => {
//     test('constructor creates ol element', assert => {
//         // Basic instantiation
//         const ol = new Ol({})
//         assert.equal(ol.tag                     , 'ol'             , 'Sets correct tag name')
//         assert.ok   (ol instanceof Tag                             , 'Inherits from Tag')
//
//         // With multiple attributes
//         const complex = new Ol({
//             class : 'custom-list'               ,
//             id    : 'list-1'                    ,
//             type  : 'A'                         ,
//             start : '3'
//         })
//         assert.equal(complex.class              , 'custom-list'    , 'Sets class')
//         assert.equal(complex.id                 , 'list-1'         , 'Sets id')
//         assert.equal(complex.type               , 'A'              , 'Sets type')
//         assert.equal(complex.start              , '3'              , 'Sets start')
//     })
//
//     test('generates correct HTML', assert => {
//         const ol = new Ol({
//             class : 'test-list'                 ,
//             type  : '1'
//         })
//         const expected = '<ol class="test-list" type="1">\n</ol>\n'
//         assert.equal(ol.html()                  , expected         , 'Generates correct HTML')
//     })
//
//     test('constructor handles no parameters', assert => {
//         const ol = new Ol()
//         assert.equal(ol.html()                  , '<ol>\n</ol>\n'  , 'Generates minimal HTML')
//     })
// })
//
// // Option.qunit.mjs
// import Option from '../../js/core/Option.mjs'
// import Tag    from '../../js/core/Tag.mjs'
//
// const { module, test } = QUnit
//
// module('Option', hooks => {
//     test('constructor creates option element', assert => {
//         // Basic instantiation
//         const option = new Option({})
//         assert.equal(option.tag                 , 'option'         , 'Sets correct tag name')
//         assert.ok   (option instanceof Tag                         , 'Inherits from Tag')
//
//         // With value and text
//         const with_values = new Option({
//             value : 'option_value'              ,
//             text  : 'Option Text'
//         })
//         assert.equal(with_values.attributes.value, 'option_value'  , 'Sets value attribute')
//         assert.equal(with_values.value          , 'Option Text'    , 'Sets display text')
//
//         // With multiple attributes
//         const complex = new Option({
//             value    : 'complex_value'          ,
//             text     : 'Complex Option'         ,
//             class    : 'custom-option'          ,
//             id       : 'option-1'               ,
//             selected : true
//         })
//         assert.equal(complex.attributes.value   , 'complex_value'  , 'Sets value')
//         assert.equal(complex.value              , 'Complex Option' , 'Sets text')
//         assert.equal(complex.class              , 'custom-option'  , 'Sets class')
//         assert.equal(complex.id                 , 'option-1'       , 'Sets id')
//         assert.equal(complex.selected           , true             , 'Sets selected')
//     })
//
//     test('generates correct HTML', assert => {
//         const option = new Option({
//             value : 'test_value'                ,
//             text  : 'Test Option'               ,
//             class : 'test-option'
//         })
//         const expected = '<option class="test-option" value="test_value">Test Option</option>\n'
//         assert.equal(option.html()              , expected         , 'Generates correct HTML')
//     })
//
//     test('constructor handles no parameters', assert => {
//         const option = new Option()
//         assert.equal(option.html()              , '<option>\n</option>\n', 'Generates minimal HTML')
//     })
// })