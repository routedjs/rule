'use strict';


function unRegexpStr(str) {
    return str.replace(/([\^\&\(\)\+\[\]\|\$\*\?\/])/g, '\\$1');
}

module.exports = function(rule, next) {
    var pathReg = new RegExp('^' + unRegexpStr(rule).replace(/:[^(\\\/)]+/g, '([^/]+)') + '$')
    var pkeys = rule.match(/:[^\/]+/g)

    return function(ctx) {
        var pathname = (ctx.path || '').split('?')[0]
        var m = path.match(pathReg)
        var params = {}
        if (m) {
            m.shift()
            for (var i = 0; i < m.length; i++) {
                var kv = pkeys[i].replace(/^:/, '').split('=')
                params[kv[0]] = decodeURIComponent(kv[1])
            }
        }
        ctx.params = params
        m && next(ctx)
    }
}
