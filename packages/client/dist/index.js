!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports['flare-client'] = t())
        : (e['flare-client'] = t());
})(window, function() {
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
        function(e, t, r) {
            var n, o, i;
            !(function(a, s) {
                'use strict';
                (o = [r(1)]),
                    void 0 ===
                        (i =
                            'function' ==
                            typeof (n = function(e) {
                                var t = /(^|@)\S+\:\d+/,
                                    r = /^\s*at .*(\S+\:\d+|\(native\))/m,
                                    n = /^(eval@)?(\[native code\])?$/;
                                return {
                                    parse: function(e) {
                                        if (void 0 !== e.stacktrace || void 0 !== e['opera#sourceloc'])
                                            return this.parseOpera(e);
                                        if (e.stack && e.stack.match(r)) return this.parseV8OrIE(e);
                                        if (e.stack) return this.parseFFOrSafari(e);
                                        throw new Error('Cannot parse given Error object');
                                    },
                                    extractLocation: function(e) {
                                        if (-1 === e.indexOf(':')) return [e];
                                        var t = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/.exec(e.replace(/[\(\)]/g, ''));
                                        return [t[1], t[2] || void 0, t[3] || void 0];
                                    },
                                    parseV8OrIE: function(t) {
                                        return t.stack
                                            .split('\n')
                                            .filter(function(e) {
                                                return !!e.match(r);
                                            }, this)
                                            .map(function(t) {
                                                t.indexOf('(eval ') > -1 &&
                                                    (t = t
                                                        .replace(/eval code/g, 'eval')
                                                        .replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, ''));
                                                var r = t
                                                        .replace(/^\s+/, '')
                                                        .replace(/\(eval code/g, '(')
                                                        .split(/\s+/)
                                                        .slice(1),
                                                    n = this.extractLocation(r.pop()),
                                                    o = r.join(' ') || void 0,
                                                    i = ['eval', '<anonymous>'].indexOf(n[0]) > -1 ? void 0 : n[0];
                                                return new e({
                                                    functionName: o,
                                                    fileName: i,
                                                    lineNumber: n[1],
                                                    columnNumber: n[2],
                                                    source: t,
                                                });
                                            }, this);
                                    },
                                    parseFFOrSafari: function(t) {
                                        return t.stack
                                            .split('\n')
                                            .filter(function(e) {
                                                return !e.match(n);
                                            }, this)
                                            .map(function(t) {
                                                if (
                                                    (t.indexOf(' > eval') > -1 &&
                                                        (t = t.replace(
                                                            / line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,
                                                            ':$1'
                                                        )),
                                                    -1 === t.indexOf('@') && -1 === t.indexOf(':'))
                                                )
                                                    return new e({ functionName: t });
                                                var r = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                                                    n = t.match(r),
                                                    o = n && n[1] ? n[1] : void 0,
                                                    i = this.extractLocation(t.replace(r, ''));
                                                return new e({
                                                    functionName: o,
                                                    fileName: i[0],
                                                    lineNumber: i[1],
                                                    columnNumber: i[2],
                                                    source: t,
                                                });
                                            }, this);
                                    },
                                    parseOpera: function(e) {
                                        return !e.stacktrace ||
                                            (e.message.indexOf('\n') > -1 &&
                                                e.message.split('\n').length > e.stacktrace.split('\n').length)
                                            ? this.parseOpera9(e)
                                            : e.stack
                                            ? this.parseOpera11(e)
                                            : this.parseOpera10(e);
                                    },
                                    parseOpera9: function(t) {
                                        for (
                                            var r = /Line (\d+).*script (?:in )?(\S+)/i,
                                                n = t.message.split('\n'),
                                                o = [],
                                                i = 2,
                                                a = n.length;
                                            i < a;
                                            i += 2
                                        ) {
                                            var s = r.exec(n[i]);
                                            s && o.push(new e({ fileName: s[2], lineNumber: s[1], source: n[i] }));
                                        }
                                        return o;
                                    },
                                    parseOpera10: function(t) {
                                        for (
                                            var r = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                                                n = t.stacktrace.split('\n'),
                                                o = [],
                                                i = 0,
                                                a = n.length;
                                            i < a;
                                            i += 2
                                        ) {
                                            var s = r.exec(n[i]);
                                            s &&
                                                o.push(
                                                    new e({
                                                        functionName: s[3] || void 0,
                                                        fileName: s[2],
                                                        lineNumber: s[1],
                                                        source: n[i],
                                                    })
                                                );
                                        }
                                        return o;
                                    },
                                    parseOpera11: function(r) {
                                        return r.stack
                                            .split('\n')
                                            .filter(function(e) {
                                                return !!e.match(t) && !e.match(/^Error created at/);
                                            }, this)
                                            .map(function(t) {
                                                var r,
                                                    n = t.split('@'),
                                                    o = this.extractLocation(n.pop()),
                                                    i = n.shift() || '',
                                                    a =
                                                        i
                                                            .replace(/<anonymous function(: (\w+))?>/, '$2')
                                                            .replace(/\([^\)]*\)/g, '') || void 0;
                                                i.match(/\(([^\)]*)\)/) &&
                                                    (r = i.replace(/^[^\(]+\(([^\)]*)\)$/, '$1'));
                                                var s =
                                                    void 0 === r || '[arguments not available]' === r
                                                        ? void 0
                                                        : r.split(',');
                                                return new e({
                                                    functionName: a,
                                                    args: s,
                                                    fileName: o[0],
                                                    lineNumber: o[1],
                                                    columnNumber: o[2],
                                                    source: t,
                                                });
                                            }, this);
                                    },
                                };
                            })
                                ? n.apply(t, o)
                                : n) || (e.exports = i);
            })();
        },
        function(e, t, r) {
            var n, o, i;
            !(function(r, a) {
                'use strict';
                (o = []),
                    void 0 ===
                        (i =
                            'function' ==
                            typeof (n = function() {
                                function e(e) {
                                    return !isNaN(parseFloat(e)) && isFinite(e);
                                }
                                function t(e) {
                                    return e.charAt(0).toUpperCase() + e.substring(1);
                                }
                                function r(e) {
                                    return function() {
                                        return this[e];
                                    };
                                }
                                var n = ['isConstructor', 'isEval', 'isNative', 'isToplevel'],
                                    o = ['columnNumber', 'lineNumber'],
                                    i = ['fileName', 'functionName', 'source'],
                                    a = n.concat(o, i, ['args']);
                                function s(e) {
                                    if (e instanceof Object)
                                        for (var r = 0; r < a.length; r++)
                                            e.hasOwnProperty(a[r]) &&
                                                void 0 !== e[a[r]] &&
                                                this['set' + t(a[r])](e[a[r]]);
                                }
                                s.prototype = {
                                    getArgs: function() {
                                        return this.args;
                                    },
                                    setArgs: function(e) {
                                        if ('[object Array]' !== Object.prototype.toString.call(e))
                                            throw new TypeError('Args must be an Array');
                                        this.args = e;
                                    },
                                    getEvalOrigin: function() {
                                        return this.evalOrigin;
                                    },
                                    setEvalOrigin: function(e) {
                                        if (e instanceof s) this.evalOrigin = e;
                                        else {
                                            if (!(e instanceof Object))
                                                throw new TypeError('Eval Origin must be an Object or StackFrame');
                                            this.evalOrigin = new s(e);
                                        }
                                    },
                                    toString: function() {
                                        return (
                                            (this.getFunctionName() || '{anonymous}') +
                                            ('(' + (this.getArgs() || []).join(',') + ')') +
                                            (this.getFileName() ? '@' + this.getFileName() : '') +
                                            (e(this.getLineNumber()) ? ':' + this.getLineNumber() : '') +
                                            (e(this.getColumnNumber()) ? ':' + this.getColumnNumber() : '')
                                        );
                                    },
                                };
                                for (var u = 0; u < n.length; u++)
                                    (s.prototype['get' + t(n[u])] = r(n[u])),
                                        (s.prototype['set' + t(n[u])] = (function(e) {
                                            return function(t) {
                                                this[e] = Boolean(t);
                                            };
                                        })(n[u]));
                                for (var c = 0; c < o.length; c++)
                                    (s.prototype['get' + t(o[c])] = r(o[c])),
                                        (s.prototype['set' + t(o[c])] = (function(t) {
                                            return function(r) {
                                                if (!e(r)) throw new TypeError(t + ' must be a Number');
                                                this[t] = Number(r);
                                            };
                                        })(o[c]));
                                for (var f = 0; f < i.length; f++)
                                    (s.prototype['get' + t(i[f])] = r(i[f])),
                                        (s.prototype['set' + t(i[f])] = (function(e) {
                                            return function(t) {
                                                this[e] = String(t);
                                            };
                                        })(i[f]));
                                return s;
                            })
                                ? n.apply(t, o)
                                : n) || (e.exports = i);
            })();
        },
        function(e, t, r) {
            'use strict';
            r.r(t);
            var n = r(0),
                o = r.n(n);
            function i(e) {
                return (i =
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
            var a = '1.0.0';
            function s(e) {
                var t;
                return (
                    ((t = e) &&
                        (t.stack || t.stacktrace || t['opera#sourceloc']) &&
                        'string' == typeof (t.stack || t.stacktrace || t['opera#sourceloc']) &&
                        t.stack !== ''.concat(t.name, ': ').concat(t.message)) ||
                        l('No error stack was found, not reporting the error.'),
                    o.a.parse(e).map(function(e) {
                        return {
                            line_number: e.lineNumber || 1,
                            column_number: e.columnNumber || 1,
                            method: e.functionName || 'Anonymous or unknown function',
                            file: e.fileName || 'Unknown file',
                            code_snippet: [],
                        };
                    })
                );
            }
            function u() {
                return Math.round(Date.now() / 1e3);
            }
            function c(e) {
                return (
                    (e.request = {
                        url: document.location.href,
                        useragent: navigator.userAgent,
                        referrer: document.referrer,
                        readyState: document.readyState,
                    }),
                    document.cookie &&
                        (e.cookies = document.cookie.split('; ').map(function(e) {
                            var t,
                                r,
                                n,
                                o = e.split(/=/);
                            return (
                                (t = {}),
                                (r = o[0]),
                                (n = o[1]),
                                r in t
                                    ? Object.defineProperty(t, r, {
                                          value: n,
                                          enumerable: !0,
                                          configurable: !0,
                                          writable: !0,
                                      })
                                    : (t[r] = n),
                                t
                            );
                        })),
                    e
                );
            }
            function f(e) {
                var t = [],
                    r = JSON.stringify(e, function(e, r) {
                        if ('object' === i(r) && null !== r) {
                            if (-1 !== t.indexOf(r))
                                try {
                                    return JSON.parse(JSON.stringify(r));
                                } catch (e) {
                                    return;
                                }
                            t.push(r);
                        }
                        return r;
                    });
                return (t = null), r;
            }
            function l(e) {
                console.error('Flare JS Client V'.concat(a, ': ').concat(e));
            }
            function p(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t &&
                        (n = n.filter(function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable;
                        })),
                        r.push.apply(r, n);
                }
                return r;
            }
            function m(e, t, r) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
                        : (e[t] = r),
                    e
                );
            }
            function h(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        'value' in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            t.default = new ((function() {
                function e() {
                    !(function(e, t) {
                        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                    })(this, e),
                        (this.key = ''),
                        (this.reportingUrl = ''),
                        (this.glows = []),
                        (this.beforeSubmit = function(e) {
                            return e;
                        }),
                        (this.reportedErrorsTimestamps = []),
                        (this.config = { maxGlows: 30, maxReportsPerMinute: 500 });
                }
                var t, r, n;
                return (
                    (t = e),
                    (r = [
                        {
                            key: 'setBeforeSubmit',
                            value: function(e) {
                                'function' == typeof e && (this.beforeSubmit = e);
                            },
                        },
                        {
                            key: 'setConfig',
                            value: function(e) {
                                this.config = (function(e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var r = null != arguments[t] ? arguments[t] : {};
                                        t % 2
                                            ? p(r, !0).forEach(function(t) {
                                                  m(e, t, r[t]);
                                              })
                                            : Object.getOwnPropertyDescriptors
                                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                                            : p(r).forEach(function(t) {
                                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                                              });
                                    }
                                    return e;
                                })({}, this.config, {}, e);
                            },
                        },
                        {
                            key: 'light',
                            value: function(e, t) {
                                e || l('No Flare key was passed, shutting down.'),
                                    t || l('No reportingUrl was passed, shutting down.'),
                                    (this.key = e),
                                    (this.reportingUrl = t);
                            },
                        },
                        {
                            key: 'glow',
                            value: function(e) {
                                var t = e.name,
                                    r = e.messageLevel,
                                    n = void 0 === r ? 'info' : r,
                                    o = e.metaData,
                                    i = void 0 === o ? [] : o,
                                    a = e.time,
                                    s = void 0 === a ? u() : a;
                                this.glows.push({ time: s, name: t, messageLevel: n, metaData: i }),
                                    this.glows.length > this.config.maxGlows &&
                                        (this.glows = this.glows.slice(this.glows.length - this.config.maxGlows));
                            },
                        },
                        {
                            key: 'reportError',
                            value: function(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                if (
                                    ((this.key && this.reportingUrl) ||
                                        l(
                                            "The client was not yet initialised with an API key.\n                Run client.light('api-token-goes-here') when you initialise your app.\n                If you are running in dev mode and didn't run the light command on purpose, you can ignore this error."
                                        ),
                                    e || l('No error was provided, not reporting.'),
                                    this.reportedErrorsTimestamps.length >= this.config.maxReportsPerMinute)
                                ) {
                                    var r = this.reportedErrorsTimestamps[
                                        this.reportedErrorsTimestamps.length - this.config.maxReportsPerMinute
                                    ];
                                    if (r > Date.now() - 6e4) return;
                                }
                                var n = {
                                        key: this.key,
                                        notifier: 'Flare JavaScript Client V1.0.0',
                                        exception_class: e.constructor ? e.constructor.name : void 0,
                                        seen_at: u(),
                                        message: e.message,
                                        language: 'javascript',
                                        glows: this.glows,
                                        context: this.beforeSubmit(c(t)),
                                        stacktrace: s(e),
                                    },
                                    o = new XMLHttpRequest();
                                o.open('POST', this.reportingUrl),
                                    o.setRequestHeader('Content-Type', 'application/json'),
                                    o.setRequestHeader('X-Requested-With', 'XMLHttpRequest'),
                                    o.setRequestHeader('x-api-key', this.key),
                                    o.setRequestHeader(
                                        'Access-Control-Request-Headers',
                                        'Origin, X-Requested-With, Content-Type, Accept'
                                    ),
                                    o.send(f(n)),
                                    this.reportedErrorsTimestamps.push(Date.now());
                            },
                        },
                    ]) && h(t.prototype, r),
                    n && h(t, n),
                    e
                );
            })())();
        },
    ]);
});
