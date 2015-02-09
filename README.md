# rule
Route rule dispatcher.

## Usage

```js
// hash: #/index/home?

Routed.use(rule('/index/:type', function (ctx) {
    ctx.params // {type: "home"}
    // do something
}))

```