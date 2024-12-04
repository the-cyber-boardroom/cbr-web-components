// // Svg.qunit.mjs
// import Svg from '../../js/core/Svg.mjs'
// import Tag from '../../js/core/Tag.mjs'
//
// const { module, test } = QUnit
//
// module('Svg', hooks => {
//     test('constructor creates svg element', assert => {
//         // Basic instantiation
//         const svg = new Svg({})
//         assert.equal(svg.tag                    , 'svg'            , 'Sets correct tag name')
//         assert.ok   (svg instanceof Tag                            , 'Inherits from Tag')
//
//         // With dimensions
//         const with_dims = new Svg({
//             width  : '100'                      ,
//             height : '200'                      ,
//             src    : 'test.svg'
//         })
//         assert.equal(with_dims.width            , '100'            , 'Sets width')
//         assert.equal(with_dims.height           , '200'            , 'Sets height')
//         assert.equal(with_dims.src              , 'test.svg'       , 'Sets src')
//
//         // With multiple attributes
//         const complex = new Svg({
//             width      : '100'                  ,
//             height     : '200'                  ,
//             src        : 'test.svg'             ,
//             class      : 'custom-svg'           ,
//             id         : 'svg-1'                ,
//             viewBox    : '0 0 100 200'
//         })
//         assert.equal(complex.width              , '100'            , 'Sets width')
//         assert.equal(complex.height             , '200'            , 'Sets height')
//         assert.equal(complex.src                , 'test.svg'       , 'Sets src')
//         assert.equal(complex.class              , 'custom-svg'     , 'Sets class')
//         assert.equal(complex.id                 , 'svg-1'          , 'Sets id')
//         assert.equal(complex.viewBox            , '0 0 100 200'    , 'Sets viewBox')
//     })
//
//     test('generates correct HTML', assert => {
//         const svg = new Svg({
//             width  : '100'                      ,
//             height : '200'                      ,
//             class  : 'test-svg'                 ,
//             src    : 'test.svg'
//         })
//         const expected = '<svg class="test-svg" src="test.svg" width="100" height="200">\n</svg>\n'
//         assert.equal(svg.html()                 , expected         , 'Generates correct HTML')
//     })
//
//     test('constructor handles no parameters', assert => {
//         const svg = new Svg()
//         assert.equal(svg.html()                 , '<svg src="" width="" height="">\n</svg>\n', 'Generates minimal HTML')
//     })
// })
//
// // Svg__Icons.qunit.mjs
// import Svg__Icons  from '../../js/core/Svg__Icons.mjs'
// import Raw_Html    from '../../js/core/Raw_Html.mjs'
//
// const { module, test } = QUnit
//
// module('Svg__Icons', hooks => {
//     let icons
//
//     hooks.beforeEach(() => {
//         icons = new Svg__Icons()
//     })
//
//     test('picture_as_pdf creates correct icon', assert => {
//         const result = icons.picture_as_pdf({ width: '32px' })
//         assert.ok   (result instanceof Raw_Html                               , 'Returns Raw_Html instance')
//         assert.equal(result.class               , 'icon-svg picture-as-pdf'   , 'Sets correct classes')
//         assert.ok   (result.raw_html.includes('width="32px"')                , 'Applies attributes')
//         assert.ok   (result.raw_html.includes('xmlns="http://www.w3.org/2000/svg"'), 'Includes SVG namespace')
//     })
//
//     test('screenshot_monitor creates correct icon', assert => {
//         const result = icons.screenshot_monitor({ height: '48px' })
//         assert.ok   (result instanceof Raw_Html                               , 'Returns Raw_Html instance')
//         assert.equal(result.class               , 'icon-svg screenshot-monitor', 'Sets correct classes')
//         assert.ok   (result.raw_html.includes('height="48px"')               , 'Applies attributes')
//     })
//
//     test('generic icon method handles valid icon name', assert => {
//         const result = icons.icon('picture_as_pdf', { width: '32px' })
//         assert.ok   (result instanceof Raw_Html                               , 'Returns Raw_Html instance')
//         assert.equal(result.class               , 'icon-svg picture-as-pdf'   , 'Sets correct classes')
//         assert.ok   (result.raw_html.includes('width="32px"')                , 'Applies attributes')
//     })
//
//     test('generic icon method handles invalid icon name', assert => {
//         const result = icons.icon('non_existent_icon')
//         assert.equal(result                     , undefined                   , 'Returns undefined for invalid icon')
//     })
//
//     test('icon class names are correctly formatted', assert => {
//         const result = icons.icon('user_profile')
//         assert.equal(result.class               , 'icon-svg user-profile'     , 'Formats class name correctly')
//     })
//
//     test('applies multiple attributes to SVG', assert => {
//         const attrs = {
//             width  : '32px'                     ,
//             height : '32px'                     ,
//             fill   : 'red'
//         }
//         const result = icons.picture_as_pdf(attrs)
//         assert.ok(result.raw_html.includes('width="32px"')                   , 'Sets width')
//         assert.ok(result.raw_html.includes('height="32px"')                  , 'Sets height')
//         assert.ok(result.raw_html.includes('fill="red"')                     , 'Sets fill')
//     })
// })