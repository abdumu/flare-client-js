!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t(require('flare-client'), require('react')))
        : 'function' == typeof define && define.amd
        ? define(['flare-client', 'react'], t)
        : 'object' == typeof exports
        ? (exports['flare-react'] = t(require('flare-client'), require('react')))
        : (e['flare-react'] = t(e['flare-client'], e.react));
})(window, function(e, t) {
    return (function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var o = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function(e, t, n) {
                r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (r.t = function(e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
                    2 & t && 'string' != typeof e)
                )
                    for (var o in e)
                        r.d(
                            n,
                            o,
                            function(t) {
                                return e[t];
                            }.bind(null, o)
                        );
                return n;
            }),
            (r.n = function(e) {
                var t =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return r.d(t, 'a', t), t;
            }),
            (r.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ''),
            r((r.s = 2))
        );
    })([
        function(t, r) {
            t.exports = e;
        },
        function(e, r) {
            e.exports = t;
        },
        function(e, t, r) {
            'use strict';
            r.r(t),
                r.d(t, 'default', function() {
                    return s;
                });
            var n = r(1),
                o = r.n(n),
                u = r(0),
                i = r.n(u);
            function c(e) {
                return (c =
                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                        ? function(e) {
                              return typeof e;
                          }
                        : function(e) {
                              return e &&
                                  'function' == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof e;
                          })(e);
            }
            function f(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        'value' in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            function l(e, t) {
                return !t || ('object' !== c(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                          return e;
                      })(e)
                    : t;
            }
            function a(e) {
                return (a = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function p(e, t) {
                return (p =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var s = (function(e) {
                function t(e) {
                    var r;
                    return (
                        (function(e, t) {
                            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                        })(this, t),
                        (r = l(this, a(t).call(this, e))),
                        i.a ||
                            console.error(
                                'Flare React Plugin: the Flare Client could not be found.\n                Errors in your React components will not be reported.'
                            ),
                        r
                    );
                }
                var r, n, o;
                return (
                    (function(e, t) {
                        if ('function' != typeof t && null !== t)
                            throw new TypeError('Super expression must either be null or a function');
                        (e.prototype = Object.create(t && t.prototype, {
                            constructor: { value: e, writable: !0, configurable: !0 },
                        })),
                            t && p(e, t);
                    })(t, e),
                    (r = t),
                    (n = [
                        {
                            key: 'componentDidCatch',
                            value: function(e, t) {
                                if (i.a) {
                                    var r = {
                                        react: {
                                            componentStack:
                                                ((n = t.componentStack),
                                                n.split(/\s*\n\s*/g).filter(function(e) {
                                                    return e.length > 0;
                                                })),
                                        },
                                    };
                                    i.a.reportError(e, r);
                                }
                                var n;
                            },
                        },
                        {
                            key: 'render',
                            value: function() {
                                return this.props.children;
                            },
                        },
                    ]) && f(r.prototype, n),
                    o && f(r, o),
                    t
                );
            })(o.a.Component);
        },
    ]);
});
