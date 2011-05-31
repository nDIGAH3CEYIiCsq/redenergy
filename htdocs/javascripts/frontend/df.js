var a,viewport = {getWinWidth:function() {
	this.width = 0;
	if (window.innerWidth)this.width = window.innerWidth - 18; else if (document.documentElement && document.documentElement.clientWidth)this.width = document.documentElement.clientWidth; else if (document.body && document.body.clientWidth)this.width = document.body.clientWidth
},getWinHeight:function() {
	this.height = 0;
	if (window.innerHeight)this.height = window.innerHeight - 18; else if (document.documentElement && document.documentElement.clientHeight)this.height = document.documentElement.clientHeight;
	else if (document.body && document.body.clientHeight)this.height = document.body.clientHeight
},getScrollX:function() {
	this.scrollX = 0;
	if (typeof window.pageXOffset == "number")this.scrollX = window.pageXOffset; else if (document.documentElement && document.documentElement.scrollLeft)this.scrollX = document.documentElement.scrollLeft; else if (document.body && document.body.scrollLeft)this.scrollX = document.body.scrollLeft; else if (window.scrollX)this.scrollX = window.scrollX
},getScrollY:function() {
	this.scrollY = 0;
	if (typeof window.pageYOffset ==
	"number")this.scrollY = window.pageYOffset; else if (document.documentElement && document.documentElement.scrollTop)this.scrollY = document.documentElement.scrollTop; else if (document.body && document.body.scrollTop)this.scrollY = document.body.scrollTop; else if (window.scrollY)this.scrollY = window.scrollY
},getAll:function() {
	this.getWinWidth();
	this.getWinHeight();
	this.getScrollX();
	this.getScrollY()
}},Prototype = {Version:"1.6.1",Browser:function() {
	var b = navigator.userAgent,c = Object.prototype.toString.call(window.opera) ==
	"[object Opera]";
	return{IE:!!window.attachEvent && !c,Opera:c,WebKit:b.indexOf("AppleWebKit/") > -1,Gecko:b.indexOf("Gecko") > -1 && b.indexOf("KHTML") === -1,MobileSafari:/Apple.*Mobile.*Safari/.test(b)}
}(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:function() {
	var b = window.Element || window.HTMLElement;
	return!!(b && b.prototype)
}(),SpecificElementExtensions:function() {
	if (typeof window.HTMLDivElement !== "undefined")return true;
	var b = document.createElement("div"),
	c = document.createElement("form"),d = false;
	if (b.__proto__ && b.__proto__ !== c.__proto__)d = true;
	return d
}()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function() {
},K:function(b) {
	return b
}};
if (Prototype.Browser.MobileSafari)Prototype.BrowserFeatures.SpecificElementExtensions = false;
var Abstract = {},Try = {these:function() {
	for (var b,c = 0,d = arguments.length; c < d; c++) {
		var e = arguments[c];
		try {
			b = e();
			break
		} catch(f) {
		}
	}
	return b
}},Class = function() {
	function b() {
	}

	function c() {
		function e() {
			this.initialize.apply(this, arguments)
		}

		var f = null,g = $A(arguments);
		if (Object.isFunction(g[0]))f = g.shift();
		Object.extend(e, Class.Methods);
		e.superclass = f;
		e.subclasses = [];
		if (f) {
			b.prototype = f.prototype;
			e.prototype = new b;
			f.subclasses.push(e)
		}
		for (f = 0; f < g.length; f++)e.addMethods(g[f]);
		if (!e.prototype.initialize)e.prototype.initialize =
		Prototype.emptyFunction;
		return e.prototype.constructor = e
	}

	function d(e) {
		var f = this.superclass && this.superclass.prototype,g = Object.keys(e);
		if (!Object.keys({toString:true}).length) {
			e.toString != Object.prototype.toString && g.push("toString");
			e.valueOf != Object.prototype.valueOf && g.push("valueOf")
		}
		for (var h = 0,j = g.length; h < j; h++) {
			var m = g[h],q = e[m];
			if (f && Object.isFunction(q) && q.argumentNames().first() == "$super") {
				var s = q;
				q = function(v) {
					return function() {
						return f[v].apply(this, arguments)
					}
				}(m).wrap(s);
				q.valueOf =
				s.valueOf.bind(s);
				q.toString = s.toString.bind(s)
			}
			this.prototype[m] = q
		}
		return this
	}

	return{create:c,Methods:{addMethods:d}}
}();
(function() {
	function b(n, r) {
		for (var C in r)n[C] = r[C];
		return n
	}

	function c(n) {
		try {
			if (x(n))return"undefined";
			if (n === null)return"null";
			return n.inspect ? n.inspect() : String(n)
		} catch(r) {
			if (r instanceof RangeError)return"...";
			throw r;
		}
	}

	function d(n) {
		switch (typeof n) {case "undefined":case "function":case "unknown":return;case "boolean":return n.toString()
		}
		if (n === null)return"null";
		if (n.toJSON)return n.toJSON();
		if (!m(n)) {
			var r = [];
			for (var C in n) {
				var G = d(n[C]);
				x(G) || r.push(C.toJSON() + ": " + G)
			}
			return"{" + r.join(", ") +
			"}"
		}
	}

	function e(n) {
		return $H(n).toQueryString()
	}

	function f(n) {
		return n && n.toHTML ? n.toHTML() : String.interpret(n)
	}

	function g(n) {
		var r = [];
		for (var C in n)r.push(C);
		return r
	}

	function h(n) {
		var r = [];
		for (var C in n)r.push(n[C]);
		return r
	}

	function j(n) {
		return b({}, n)
	}

	function m(n) {
		return!!(n && n.nodeType == 1)
	}

	function q(n) {
		return K.call(n) == "[object Array]"
	}

	function s(n) {
		return n instanceof Hash
	}

	function v(n) {
		return typeof n === "function"
	}

	function z(n) {
		return K.call(n) == "[object String]"
	}

	function F(n) {
		return K.call(n) ==
		"[object Number]"
	}

	function x(n) {
		return typeof n === "undefined"
	}

	var K = Object.prototype.toString;
	b(Object, {extend:b,inspect:c,toJSON:d,toQueryString:e,toHTML:f,keys:g,values:h,clone:j,isElement:m,isArray:q,isHash:s,isFunction:v,isString:z,isNumber:F,isUndefined:x})
})();
Object.extend(Function.prototype, function() {
	function b(v, z) {
		for (var F = v.length,x = z.length; x--;)v[F + x] = z[x];
		return v
	}

	function c(v, z) {
		v = s.call(v, 0);
		return b(v, z)
	}

	function d() {
		var v = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
		return v.length == 1 && !v[0] ? [] : v
	}

	function e(v) {
		if (arguments.length < 2 && Object.isUndefined(arguments[0]))return this;
		var z = this,F = s.call(arguments, 1);
		return function() {
			var x = c(F, arguments);
			return z.apply(v, x)
		}
	}

	function f(v) {
		var z = this,F = s.call(arguments, 1);
		return function(x) {
			x = b([x || window.event], F);
			return z.apply(v, x)
		}
	}

	function g() {
		if (!arguments.length)return this;
		var v = this,z = s.call(arguments, 0);
		return function() {
			var F = c(z, arguments);
			return v.apply(this, F)
		}
	}

	function h(v) {
		var z = this,F = s.call(arguments, 1);
		v *= 1E3;
		return window.setTimeout(function() {
			return z.apply(z, F)
		}, v)
	}

	function j() {
		return this.delay.apply(this, b([0.01], arguments))
	}

	function m(v) {
		var z = this;
		return function() {
			var F =
			b([z.bind(this)], arguments);
			return v.apply(this, F)
		}
	}

	function q() {
		if (this._methodized)return this._methodized;
		var v = this;
		return this._methodized = function() {
			var z = b([this], arguments);
			return v.apply(null, z)
		}
	}

	var s = Array.prototype.slice;
	return{argumentNames:d,bind:e,bindAsEventListener:f,curry:g,delay:h,defer:j,wrap:m,methodize:q}
}());
Date.prototype.toJSON = function() {
	return'"' + this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + 'Z"'
};
RegExp.prototype.match = RegExp.prototype.test;
RegExp.escape = function(b) {
	return String(b).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
};
var PeriodicalExecuter = Class.create({initialize:function(b, c) {
	this.callback = b;
	this.frequency = c;
	this.currentlyExecuting = false;
	this.registerCallback()
},registerCallback:function() {
	this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1E3)
},execute:function() {
	this.callback(this)
},stop:function() {
	if (this.timer) {
		clearInterval(this.timer);
		this.timer = null
	}
},onTimerEvent:function() {
	if (!this.currentlyExecuting)try {
		this.currentlyExecuting = true;
		this.execute();
		this.currentlyExecuting = false
	} catch(b) {
		this.currentlyExecuting =
		false;
		throw b;
	}
}});
Object.extend(String, {interpret:function(b) {
	return b == null ? "" : String(b)
},specialChar:{"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r","\\":"\\\\"}});
Object.extend(String.prototype, function() {
	function b(t) {
		if (Object.isFunction(t))return t;
		var y = new Template(t);
		return function(D) {
			return y.evaluate(D)
		}
	}

	function c(t, y) {
		var D = "",E = this,L;
		y = b(y);
		if (Object.isString(t))t = RegExp.escape(t);
		if (!(t.length || t.source)) {
			y = y("");
			return y + E.split("").join(y) + y
		}
		for (; E.length > 0;)if (L = E.match(t)) {
			D += E.slice(0, L.index);
			D += String.interpret(y(L));
			E = E.slice(L.index + L[0].length)
		} else {
			D += E;
			E = ""
		}
		return D
	}

	function d(t, y, D) {
		y = b(y);
		D = Object.isUndefined(D) ? 1 : D;
		return this.gsub(t,
				function(E) {
					if (--D < 0)return E[0];
					return y(E)
				})
	}

	function e(t, y) {
		this.gsub(t, y);
		return String(this)
	}

	function f(t, y) {
		t = t || 30;
		y = Object.isUndefined(y) ? "..." : y;
		return this.length > t ? this.slice(0, t - y.length) + y : String(this)
	}

	function g() {
		return this.replace(/^\s+/, "").replace(/\s+$/, "")
	}

	function h() {
		return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
	}

	function j() {
		return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
	}

	function m() {
		var t = new RegExp(Prototype.ScriptFragment, "img"),
		y = new RegExp(Prototype.ScriptFragment, "im");
		return(this.match(t) || []).map(function(D) {
			return(D.match(y) || ["",""])[1]
		})
	}

	function q() {
		return this.extractScripts().map(function(t) {
			return eval(t)
		})
	}

	function s() {
		return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}

	function v() {
		return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
	}

	function z(t) {
		var y = this.strip().match(/([^?#]*)(#.*)?$/);
		if (!y)return{};
		return y[1].split(t || "&").inject({}, function(D, E) {
			if ((E = E.split("="))[0]) {
				var L = decodeURIComponent(E.shift());
				E = E.length > 1 ? E.join("=") : E[0];
				if (E != undefined)E = decodeURIComponent(E);
				if (L in D) {
					Object.isArray(D[L]) || (D[L] = [D[L]]);
					D[L].push(E)
				} else D[L] = E
			}
			return D
		})
	}

	function F() {
		return this.split("")
	}

	function x() {
		return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
	}

	function K(t) {
		return t < 1 ? "" : (new Array(t + 1)).join(this)
	}

	function n() {
		var t = this.split("-"),y = t.length;
		if (y == 1)return t[0];
		for (var D = this.charAt(0) ==
		"-" ? t[0].charAt(0).toUpperCase() + t[0].substring(1) : t[0],E = 1; E < y; E++)D += t[E].charAt(0).toUpperCase() + t[E].substring(1);
		return D
	}

	function r() {
		return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
	}

	function C() {
		return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
	}

	function G() {
		return this.replace(/_/g, "-")
	}

	function A(t) {
		var y = this.replace(/[\x00-\x1f\\]/g, function(D) {
			if (D in String.specialChar)return String.specialChar[D];
			return"\\u00" + D.charCodeAt().toPaddedString(2, 16)
		});
		if (t)return'"' + y.replace(/"/g, '\\"') + '"';
		return"'" + y.replace(/'/g, "\\'") + "'"
	}

	function u() {
		return this.inspect(true)
	}

	function p(t) {
		return this.replace(t || Prototype.JSONFilter, "$1")
	}

	function k() {
		var t = this;
		if (t.blank())return false;
		t = this.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, "");
		return/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(t)
	}

	function l(t) {
		var y = this.unfilterJSON();
		try {
			if (!t || y.isJSON())return eval("(" + y + ")")
		} catch(D) {
		}
		throw new SyntaxError("Badly formed JSON string: " +
		this.inspect());
	}

	function o(t) {
		return this.indexOf(t) > -1
	}

	function w(t) {
		return this.indexOf(t) === 0
	}

	function B(t) {
		var y = this.length - t.length;
		return y >= 0 && this.lastIndexOf(t) === y
	}

	function H() {
		return this == ""
	}

	function I() {
		return/^\s*$/.test(this)
	}

	function J(t, y) {
		return(new Template(this, y)).evaluate(t)
	}

	return{gsub:c,sub:d,scan:e,truncate:f,strip:String.prototype.trim ? String.prototype.trim : g,stripTags:h,stripScripts:j,extractScripts:m,evalScripts:q,escapeHTML:s,unescapeHTML:v,toQueryParams:z,parseQuery:z,
		toArray:F,succ:x,times:K,camelize:n,capitalize:r,underscore:C,dasherize:G,inspect:A,toJSON:u,unfilterJSON:p,isJSON:k,evalJSON:l,include:o,startsWith:w,endsWith:B,empty:H,blank:I,interpolate:J}
}());
var Template = Class.create({initialize:function(b, c) {
	this.template = b.toString();
	this.pattern = c || Template.Pattern
},evaluate:function(b) {
	if (b && Object.isFunction(b.toTemplateReplacements))b = b.toTemplateReplacements();
	return this.template.gsub(this.pattern, function(c) {
		if (b == null)return c[1] + "";
		var d = c[1] || "";
		if (d == "\\")return c[2];
		var e = b,f = c[3],g = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
		c = g.exec(f);
		if (c == null)return d;
		for (; c != null;) {
			var h = c[1].startsWith("[") ? c[2].replace(/\\\\]/g, "]") : c[1];
			e = e[h];
			if (null ==
			e || "" == c[3])break;
			f = f.substring("[" == c[3] ? c[1].length : c[0].length);
			c = g.exec(f)
		}
		return d + String.interpret(e)
	})
}});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {},Enumerable = function() {
	function b(p, k) {
		var l = 0;
		try {
			this._each(function(w) {
				p.call(k, w, l++)
			})
		} catch(o) {
			if (o != $break)throw o;
		}
		return this
	}

	function c(p, k, l) {
		var o = -p,w = [],B = this.toArray();
		if (p < 1)return B;
		for (; (o += p) < B.length;)w.push(B.slice(o, o + p));
		return w.collect(k, l)
	}

	function d(p, k) {
		p = p || Prototype.K;
		var l = true;
		this.each(function(o, w) {
			l = l && !!p.call(k, o, w);
			if (!l)throw $break;
		});
		return l
	}

	function e(p, k) {
		p = p || Prototype.K;
		var l = false;
		this.each(function(o, w) {
			if (l = !!p.call(k, o, w))throw $break;
		});
		return l
	}

	function f(p, k) {
		p = p || Prototype.K;
		var l = [];
		this.each(function(o, w) {
			l.push(p.call(k, o, w))
		});
		return l
	}

	function g(p, k) {
		var l;
		this.each(function(o, w) {
			if (p.call(k, o, w)) {
				l = o;
				throw $break;
			}
		});
		return l
	}

	function h(p, k) {
		var l = [];
		this.each(function(o, w) {
			p.call(k, o, w) && l.push(o)
		});
		return l
	}

	function j(p, k, l) {
		k = k || Prototype.K;
		var o = [];
		if (Object.isString(p))p = new RegExp(RegExp.escape(p));
		this.each(function(w, B) {
			p.match(w) && o.push(k.call(l, w, B))
		});
		return o
	}

	function m(p) {
		if (Object.isFunction(this.indexOf))if (this.indexOf(p) !=
		-1)return true;
		var k = false;
		this.each(function(l) {
			if (l == p) {
				k = true;
				throw $break;
			}
		});
		return k
	}

	function q(p, k) {
		k = Object.isUndefined(k) ? null : k;
		return this.eachSlice(p, function(l) {
			for (; l.length < p;)l.push(k);
			return l
		})
	}

	function s(p, k, l) {
		this.each(function(o, w) {
			p = k.call(l, p, o, w)
		});
		return p
	}

	function v(p) {
		var k = $A(arguments).slice(1);
		return this.map(function(l) {
			return l[p].apply(l, k)
		})
	}

	function z(p, k) {
		p = p || Prototype.K;
		var l;
		this.each(function(o, w) {
			o = p.call(k, o, w);
			if (l == null || o >= l)l = o
		});
		return l
	}

	function F(p, k) {
		p = p || Prototype.K;
		var l;
		this.each(function(o, w) {
			o = p.call(k, o, w);
			if (l == null || o < l)l = o
		});
		return l
	}

	function x(p, k) {
		p = p || Prototype.K;
		var l = [],o = [];
		this.each(function(w, B) {
			(p.call(k, w, B) ? l : o).push(w)
		});
		return[l,o]
	}

	function K(p) {
		var k = [];
		this.each(function(l) {
			k.push(l[p])
		});
		return k
	}

	function n(p, k) {
		var l = [];
		this.each(function(o, w) {
			p.call(k, o, w) || l.push(o)
		});
		return l
	}

	function r(p, k) {
		return this.map(
			       function(l, o) {
				       return{value:l,criteria:p.call(k, l, o)}
			       }).sort(
				      function(l, o) {
					      l = l.criteria;
					      o = o.criteria;
					      return l <
					      o ? -1 : l > o ? 1 : 0
				      }).pluck("value")
	}

	function C() {
		return this.map()
	}

	function G() {
		var p = Prototype.K,k = $A(arguments);
		if (Object.isFunction(k.last()))p = k.pop();
		var l = [this].concat(k).map($A);
		return this.map(function(o, w) {
			return p(l.pluck(w))
		})
	}

	function A() {
		return this.toArray().length
	}

	function u() {
		return"#<Enumerable:" + this.toArray().inspect() + ">"
	}

	return{each:b,eachSlice:c,all:d,every:d,any:e,some:e,collect:f,map:f,detect:g,findAll:h,select:h,filter:h,grep:j,include:m,member:m,inGroupsOf:q,inject:s,invoke:v,
		max:z,min:F,partition:x,pluck:K,reject:n,sortBy:r,toArray:C,entries:C,zip:G,size:A,inspect:u,find:g}
}();
function $A(b) {
	if (!b)return[];
	if ("toArray"in Object(b))return b.toArray();
	for (var c = b.length || 0,d = new Array(c); c--;)d[c] = b[c];
	return d
}
function $w(b) {
	if (!Object.isString(b))return[];
	return(b = b.strip()) ? b.split(/\s+/) : []
}
Array.from = $A;
(function() {
	function b(A) {
		for (var u = 0,p = this.length; u < p; u++)A(this[u])
	}

	function c() {
		this.length = 0;
		return this
	}

	function d() {
		return this[0]
	}

	function e() {
		return this[this.length - 1]
	}

	function f() {
		return this.select(function(A) {
			return A != null
		})
	}

	function g() {
		return this.inject([], function(A, u) {
			if (Object.isArray(u))return A.concat(u.flatten());
			A.push(u);
			return A
		})
	}

	function h() {
		var A = C.call(arguments, 0);
		return this.select(function(u) {
			return!A.include(u)
		})
	}

	function j(A) {
		return(A !== false ? this : this.toArray())._reverse()
	}

	function m(A) {
		return this.inject([], function(u, p, k) {
			if (0 == k || (A ? u.last() != p : !u.include(p)))u.push(p);
			return u
		})
	}

	function q(A) {
		return this.uniq().findAll(function(u) {
			return A.detect(function(p) {
				return u === p
			})
		})
	}

	function s() {
		return C.call(this, 0)
	}

	function v() {
		return this.length
	}

	function z() {
		return"[" + this.map(Object.inspect).join(", ") + "]"
	}

	function F() {
		var A = [];
		this.each(function(u) {
			u = Object.toJSON(u);
			Object.isUndefined(u) || A.push(u)
		});
		return"[" + A.join(", ") + "]"
	}

	function x(A, u) {
		u || (u = 0);
		var p = this.length;
		if (u < 0)u = p + u;
		for (; u < p; u++)if (this[u] === A)return u;
		return-1
	}

	function K(A, u) {
		u = isNaN(u) ? this.length : (u < 0 ? this.length + u : u) + 1;
		A = this.slice(0, u).reverse().indexOf(A);
		return A < 0 ? A : u - A - 1
	}

	function n() {
		for (var A = C.call(this, 0),u,p = 0,k = arguments.length; p < k; p++) {
			u = arguments[p];
			if (Object.isArray(u) && !("callee"in u))for (var l = 0,o = u.length; l < o; l++)A.push(u[l]); else A.push(u)
		}
		return A
	}

	var r = Array.prototype,C = r.slice,G = r.forEach;
	G || (G = b);
	Object.extend(r, Enumerable);
	if (!r._reverse)r._reverse = r.reverse;
	Object.extend(r,
	{_each:G,clear:c,first:d,last:e,compact:f,flatten:g,without:h,reverse:j,uniq:m,intersect:q,clone:s,toArray:s,size:v,inspect:z,toJSON:F});
	if (function() {
		return[].concat(arguments)[0][0] !== 1
	}(1, 2))r.concat = n;
	if (!r.indexOf)r.indexOf = x;
	if (!r.lastIndexOf)r.lastIndexOf = K
})();
function $H(b) {
	return new Hash(b)
}
var Hash = Class.create(Enumerable, function() {
	function b(n) {
		this._object = Object.isHash(n) ? n.toObject() : Object.clone(n)
	}

	function c(n) {
		for (var r in this._object) {
			var C = this._object[r],G = [r,C];
			G.key = r;
			G.value = C;
			n(G)
		}
	}

	function d(n, r) {
		return this._object[n] = r
	}

	function e(n) {
		if (this._object[n] !== Object.prototype[n])return this._object[n]
	}

	function f(n) {
		var r = this._object[n];
		delete this._object[n];
		return r
	}

	function g() {
		return Object.clone(this._object)
	}

	function h() {
		return this.pluck("key")
	}

	function j() {
		return this.pluck("value")
	}

	function m(n) {
		var r = this.detect(function(C) {
			return C.value === n
		});
		return r && r.key
	}

	function q(n) {
		return this.clone().update(n)
	}

	function s(n) {
		return(new Hash(n)).inject(this, function(r, C) {
			r.set(C.key, C.value);
			return r
		})
	}

	function v(n, r) {
		if (Object.isUndefined(r))return n;
		return n + "=" + encodeURIComponent(String.interpret(r))
	}

	function z() {
		return this.inject([],
				  function(n, r) {
					  var C = encodeURIComponent(r.key);
					  if ((r = r.value) && typeof r == "object") {
						  if (Object.isArray(r))return n.concat(r.map(v.curry(C)))
					  } else n.push(v(C,
					  r));
					  return n
				  }).join("&")
	}

	function F() {
		return"#<Hash:{" + this.map(
					   function(n) {
						   return n.map(Object.inspect).join(": ")
					   }).join(", ") + "}>"
	}

	function x() {
		return Object.toJSON(this.toObject())
	}

	function K() {
		return new Hash(this)
	}

	return{initialize:b,_each:c,set:d,get:e,unset:f,toObject:g,toTemplateReplacements:g,keys:h,values:j,index:m,merge:q,update:s,toQueryString:z,inspect:F,toJSON:x,clone:K}
}());
Hash.from = $H;
Object.extend(Number.prototype, function() {
	function b() {
		return this.toPaddedString(2, 16)
	}

	function c() {
		return this + 1
	}

	function d(q, s) {
		$R(0, this, true).each(q, s);
		return this
	}

	function e(q, s) {
		s = this.toString(s || 10);
		return"0".times(q - s.length) + s
	}

	function f() {
		return isFinite(this) ? this.toString() : "null"
	}

	function g() {
		return Math.abs(this)
	}

	function h() {
		return Math.round(this)
	}

	function j() {
		return Math.ceil(this)
	}

	function m() {
		return Math.floor(this)
	}

	return {toColorPart:b,succ:c,times:d,toPaddedString:e,toJSON:f,
		abs:g,round:h,ceil:j,floor:m}
}());
function $R(b, c, d) {
	return new ObjectRange(b, c, d)
}
var ObjectRange = Class.create(Enumerable, function() {
	function b(e, f, g) {
		this.start = e;
		this.end = f;
		this.exclusive = g
	}

	function c(e) {
		for (var f = this.start; this.include(f);) {
			e(f);
			f = f.succ()
		}
	}

	function d(e) {
		if (e < this.start)return false;
		if (this.exclusive)return e < this.end;
		return e <= this.end
	}

	return{initialize:b,_each:c,include:d}
}()),Ajax = {getTransport:function() {
	return Try.these(function() {
		return new XMLHttpRequest
	}, function() {
		return new ActiveXObject("Msxml2.XMLHTTP")
	}, function() {
		return new ActiveXObject("Microsoft.XMLHTTP")
	}) ||
	false
},activeRequestCount:0};
Ajax.Responders = {responders:[],_each:function(b) {
	this.responders._each(b)
},register:function(b) {
	this.include(b) || this.responders.push(b)
},unregister:function(b) {
	this.responders = this.responders.without(b)
},dispatch:function(b, c, d, e) {
	this.each(function(f) {
		if (Object.isFunction(f[b]))try {
			f[b].apply(f, [c,d,e])
		} catch(g) {
		}
	})
}};
Object.extend(Ajax.Responders, Enumerable);
Ajax.Responders.register({onCreate:function() {
	Ajax.activeRequestCount++
},onComplete:function() {
	Ajax.activeRequestCount--
}});
Ajax.Base = Class.create({initialize:function(b) {
	this.options = {method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:true,evalJS:true};
	Object.extend(this.options, b || {});
	this.options.method = this.options.method.toLowerCase();
	if (Object.isString(this.options.parameters))this.options.parameters = this.options.parameters.toQueryParams(); else if (Object.isHash(this.options.parameters))this.options.parameters = this.options.parameters.toObject()
}});
Ajax.Request = Class.create(Ajax.Base, {_complete:false,initialize:function($super, c, d) {
	$super(d);
	this.transport = Ajax.getTransport();
	this.request(c)
},request:function(b) {
	this.url = b;
	this.method = this.options.method;
	b = Object.clone(this.options.parameters);
	if (!["get","post"].include(this.method)) {
		b._method = this.method;
		this.method = "post"
	}
	this.parameters = b;
	if (b = Object.toQueryString(b))if (this.method == "get")this.url += (this.url.include("?") ? "&" : "?") + b; else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))b +=
	"&_=";
	try {
		var c = new Ajax.Response(this);
		this.options.onCreate && this.options.onCreate(c);
		Ajax.Responders.dispatch("onCreate", this, c);
		this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
		this.options.asynchronous && this.respondToReadyState.bind(this).defer(1);
		this.transport.onreadystatechange = this.onStateChange.bind(this);
		this.setRequestHeaders();
		this.body = this.method == "post" ? this.options.postBody || b : null;
		this.transport.send(this.body);
		!this.options.asynchronous && this.transport.overrideMimeType &&
		this.onStateChange()
	} catch(d) {
		this.dispatchException(d)
	}
},onStateChange:function() {
	var b = this.transport.readyState;
	b > 1 && !(b == 4 && this._complete) && this.respondToReadyState(this.transport.readyState)
},setRequestHeaders:function() {
	var b = {"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,Accept:"text/javascript, text/html, application/xml, text/xml, */*"};
	if (this.method == "post") {
		b["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding :
		"");
		if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)b.Connection = "close"
	}
	if (typeof this.options.requestHeaders == "object") {
		var c = this.options.requestHeaders;
		if (Object.isFunction(c.push))for (var d = 0,e = c.length; d < e; d += 2)b[c[d]] = c[d + 1]; else $H(c).each(function(g) {
			b[g.key] = g.value
		})
	}
	for (var f in b)this.transport.setRequestHeader(f, b[f])
},success:function() {
	var b = this.getStatus();
	return!b || b >= 200 && b < 300
},getStatus:function() {
	try {
		return this.transport.status ||
		0
	} catch(b) {
		return 0
	}
},respondToReadyState:function(b) {
	b = Ajax.Request.Events[b];
	var c = new Ajax.Response(this);
	if (b == "Complete") {
		try {
			this._complete = true;
			(this.options["on" + c.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(c, c.headerJSON)
		} catch(d) {
			this.dispatchException(d)
		}
		var e = c.getHeader("Content-type");
		if (this.options.evalJS == "force" || this.options.evalJS && this.isSameOrigin() && e && e.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))this.evalResponse()
	}
	try {
		(this.options["on" +
		b] || Prototype.emptyFunction)(c, c.headerJSON);
		Ajax.Responders.dispatch("on" + b, this, c, c.headerJSON)
	} catch(f) {
		this.dispatchException(f)
	}
	if (b == "Complete")this.transport.onreadystatechange = Prototype.emptyFunction
},isSameOrigin:function() {
	var b = this.url.match(/^\s*https?:\/\/[^\/]*/);
	return!b || b[0] == "#{protocol}//#{domain}#{port}".interpolate({protocol:location.protocol,domain:document.domain,port:location.port ? ":" + location.port : ""})
},getHeader:function(b) {
	try {
		return this.transport.getResponseHeader(b) ||
		null
	} catch(c) {
		return null
	}
},evalResponse:function() {
	try {
		return eval((this.transport.responseText || "").unfilterJSON())
	} catch(b) {
		this.dispatchException(b)
	}
},dispatchException:function(b) {
	(this.options.onException || Prototype.emptyFunction)(this, b);
	Ajax.Responders.dispatch("onException", this, b)
}});
Ajax.Request.Events = ["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Response = Class.create({initialize:function(b) {
	this.request = b;
	b = this.transport = b.transport;
	var c = this.readyState = b.readyState;
	if (c > 2 && !Prototype.Browser.IE || c == 4) {
		this.status = this.getStatus();
		this.statusText = this.getStatusText();
		this.responseText = String.interpret(b.responseText);
		this.headerJSON = this._getHeaderJSON()
	}
	if (c == 4) {
		b = b.responseXML;
		this.responseXML = Object.isUndefined(b) ? null : b;
		this.responseJSON = this._getResponseJSON()
	}
},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,
	getStatusText:function() {
		try {
			return this.transport.statusText || ""
		} catch(b) {
			return""
		}
	},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function() {
		try {
			return this.getAllResponseHeaders()
		} catch(b) {
			return null
		}
	},getResponseHeader:function(b) {
		return this.transport.getResponseHeader(b)
	},getAllResponseHeaders:function() {
		return this.transport.getAllResponseHeaders()
	},_getHeaderJSON:function() {
		var b = this.getHeader("X-JSON");
		if (!b)return null;
		b = decodeURIComponent(escape(b));
		try {
			return b.evalJSON(this.request.options.sanitizeJSON ||
			!this.request.isSameOrigin())
		} catch(c) {
			this.request.dispatchException(c)
		}
	},_getResponseJSON:function() {
		var b = this.request.options;
		if (!b.evalJSON || b.evalJSON != "force" && !(this.getHeader("Content-type") || "").include("application/json") || this.responseText.blank())return null;
		try {
			return this.responseText.evalJSON(b.sanitizeJSON || !this.request.isSameOrigin())
		} catch(c) {
			this.request.dispatchException(c)
		}
	}});
Ajax.Updater = Class.create(Ajax.Request, {initialize:function($super, c, d, e) {
	this.container = {success:c.success || c,failure:c.failure || (c.success ? null : c)};
	e = Object.clone(e);
	var f = e.onComplete;
	e.onComplete = function(g, h) {
		this.updateContent(g.responseText);
		Object.isFunction(f) && f(g, h)
	}.bind(this);
	$super(d, e)
},updateContent:function(b) {
	var c = this.container[this.success() ? "success" : "failure"],d = this.options;
	d.evalScripts || (b = b.stripScripts());
	if (c = $(c))if (d.insertion)if (Object.isString(d.insertion)) {
		var e =
		{};
		e[d.insertion] = b;
		c.insert(e)
	} else d.insertion(c, b); else c.update(b)
}});
Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {initialize:function($super, c, d, e) {
	$super(e);
	this.onComplete = this.options.onComplete;
	this.frequency = this.options.frequency || 2;
	this.decay = this.options.decay || 1;
	this.updater = {};
	this.container = c;
	this.url = d;
	this.start()
},start:function() {
	this.options.onComplete = this.updateComplete.bind(this);
	this.onTimerEvent()
},stop:function() {
	this.updater.options.onComplete = undefined;
	clearTimeout(this.timer);
	(this.onComplete || Prototype.emptyFunction).apply(this, arguments)
},
	updateComplete:function(b) {
		if (this.options.decay) {
			this.decay = b.responseText == this.lastText ? this.decay * this.options.decay : 1;
			this.lastText = b.responseText
		}
		this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency)
	},onTimerEvent:function() {
		this.updater = new Ajax.Updater(this.container, this.url, this.options)
	}});
function $(b) {
	if (arguments.length > 1) {
		for (var c = 0,d = [],e = arguments.length; c < e; c++)d.push($(arguments[c]));
		return d
	}
	if (Object.isString(b))b = document.getElementById(b);
	return Element.extend(b)
}
if (Prototype.BrowserFeatures.XPath)document._getElementsByXPath = function(b, c) {
	var d = [];
	b = document.evaluate(b, $(c) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	c = 0;
	for (var e = b.snapshotLength; c < e; c++)d.push(Element.extend(b.snapshotItem(c)));
	return d
};
if (!window.Node)var Node = {};
Node.ELEMENT_NODE || Object.extend(Node, {ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12});
(function(b) {
	var c = function() {
		var e = document.createElement("form"),f = document.createElement("input"),g = document.documentElement;
		f.setAttribute("name", "test");
		e.appendChild(f);
		g.appendChild(e);
		f = e.elements ? typeof e.elements.test == "undefined" : null;
		g.removeChild(e);
		return f
	}(),d = b.Element;
	b.Element = function(e, f) {
		f = f || {};
		e = e.toLowerCase();
		var g = Element.cache;
		if (c && f.name) {
			e = "<" + e + ' name="' + f.name + '">';
			delete f.name;
			return Element.writeAttribute(document.createElement(e), f)
		}
		g[e] || (g[e] = Element.extend(document.createElement(e)));
		return Element.writeAttribute(g[e].cloneNode(false), f)
	};
	Object.extend(b.Element, d || {});
	if (d)b.Element.prototype = d.prototype
})(this);
Element.cache = {};
Element.idCounter = 1;
Element.Methods = {visible:function(b) {
	return $(b).style.display != "none"
},toggle:function(b) {
	b = $(b);
	Element[Element.visible(b) ? "hide" : "show"](b);
	return b
},hide:function(b) {
	b = $(b);
	b.style.display = "none";
	return b
},show:function(b) {
	b = $(b);
	b.style.display = "";
	return b
},remove:function(b) {
	b = $(b);
	b.parentNode.removeChild(b);
	return b
},update:function() {
	function b(f, g) {
		f = $(f);
		if (g && g.toElement)g = g.toElement();
		if (Object.isElement(g))return f.update().insert(g);
		g = Object.toHTML(g);
		var h = f.tagName.toUpperCase();
		if (h === "SCRIPT" && e) {
			f.text = g;
			return f
		}
		if (c || d)if (h in Element._insertionTranslations.tags) {
			for (; f.firstChild;)f.removeChild(f.firstChild);
			Element._getContentFromAnonymousElement(h, g.stripScripts()).each(function(j) {
				f.appendChild(j)
			})
		} else f.innerHTML = g.stripScripts(); else f.innerHTML = g.stripScripts();
		g.evalScripts.bind(g).defer();
		return f
	}

	var c = function() {
		var f = document.createElement("select"),g = true;
		f.innerHTML = '<option value="test">test</option>';
		if (f.options && f.options[0])g = f.options[0].nodeName.toUpperCase() !==
		"OPTION";
		return g
	}(),d = function() {
		try {
			var f = document.createElement("table");
			if (f && f.tBodies) {
				f.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
				return typeof f.tBodies[0] == "undefined"
			}
		} catch(g) {
			return true
		}
	}(),e = function() {
		var f = document.createElement("script"),g = false;
		try {
			f.appendChild(document.createTextNode(""));
			g = !f.firstChild || f.firstChild && f.firstChild.nodeType !== 3
		} catch(h) {
			g = true
		}
		return g
	}();
	return b
}(),replace:function(b, c) {
	b = $(b);
	if (c && c.toElement)c = c.toElement(); else if (!Object.isElement(c)) {
		c =
		Object.toHTML(c);
		var d = b.ownerDocument.createRange();
		d.selectNode(b);
		c.evalScripts.bind(c).defer();
		c = d.createContextualFragment(c.stripScripts())
	}
	b.parentNode.replaceChild(c, b);
	return b
},insert:function(b, c) {
	b = $(b);
	if (Object.isString(c) || Object.isNumber(c) || Object.isElement(c) || c && (c.toElement || c.toHTML))c = {bottom:c};
	var d,e,f;
	for (var g in c) {
		d = c[g];
		g = g.toLowerCase();
		e = Element._insertionTranslations[g];
		if (d && d.toElement)d = d.toElement();
		if (Object.isElement(d))e(b, d); else {
			d = Object.toHTML(d);
			f = (g == "before" ||
			g == "after" ? b.parentNode : b).tagName.toUpperCase();
			f = Element._getContentFromAnonymousElement(f, d.stripScripts());
			if (g == "top" || g == "after")f.reverse();
			f.each(e.curry(b));
			d.evalScripts.bind(d).defer()
		}
	}
	return b
},wrap:function(b, c, d) {
	b = $(b);
	if (Object.isElement(c))$(c).writeAttribute(d || {}); else c = Object.isString(c) ? new Element(c, d) : new Element("div", c);
	b.parentNode && b.parentNode.replaceChild(c, b);
	c.appendChild(b);
	return c
},inspect:function(b) {
	b = $(b);
	var c = "<" + b.tagName.toLowerCase();
	$H({id:"id",className:"class"}).each(function(d) {
		var e =
		d.first();
		d = d.last();
		if (e = (b[e] || "").toString())c += " " + d + "=" + e.inspect(true)
	});
	return c + ">"
},recursivelyCollect:function(b, c) {
	b = $(b);
	for (var d = []; b = b[c];)b.nodeType == 1 && d.push(Element.extend(b));
	return d
},ancestors:function(b) {
	return Element.recursivelyCollect(b, "parentNode")
},descendants:function(b) {
	return Element.select(b, "*")
},firstDescendant:function(b) {
	for (b = $(b).firstChild; b && b.nodeType != 1;)b = b.nextSibling;
	return $(b)
},immediateDescendants:function(b) {
	if (!(b = $(b).firstChild))return[];
	for (; b &&
	       b.nodeType != 1;)b = b.nextSibling;
	if (b)return[b].concat($(b).nextSiblings());
	return[]
},previousSiblings:function(b) {
	return Element.recursivelyCollect(b, "previousSibling")
},nextSiblings:function(b) {
	return Element.recursivelyCollect(b, "nextSibling")
},siblings:function(b) {
	b = $(b);
	return Element.previousSiblings(b).reverse().concat(Element.nextSiblings(b))
},match:function(b, c) {
	if (Object.isString(c))c = new Selector(c);
	return c.match($(b))
},up:function(b, c, d) {
	b = $(b);
	if (arguments.length == 1)return $(b.parentNode);
	var e = Element.ancestors(b);
	return Object.isNumber(c) ? e[c] : Selector.findElement(e, c, d)
},down:function(b, c, d) {
	b = $(b);
	if (arguments.length == 1)return Element.firstDescendant(b);
	return Object.isNumber(c) ? Element.descendants(b)[c] : Element.select(b, c)[d || 0]
},previous:function(b, c, d) {
	b = $(b);
	if (arguments.length == 1)return $(Selector.handlers.previousElementSibling(b));
	var e = Element.previousSiblings(b);
	return Object.isNumber(c) ? e[c] : Selector.findElement(e, c, d)
},next:function(b, c, d) {
	b = $(b);
	if (arguments.length ==
	1)return $(Selector.handlers.nextElementSibling(b));
	var e = Element.nextSiblings(b);
	return Object.isNumber(c) ? e[c] : Selector.findElement(e, c, d)
},select:function(b) {
	var c = Array.prototype.slice.call(arguments, 1);
	return Selector.findChildElements(b, c)
},adjacent:function(b) {
	var c = Array.prototype.slice.call(arguments, 1);
	return Selector.findChildElements(b.parentNode, c).without(b)
},identify:function(b) {
	b = $(b);
	var c = Element.readAttribute(b, "id");
	if (c)return c;
	do c = "anonymous_element_" + Element.idCounter++; while ($(c));
	Element.writeAttribute(b, "id", c);
	return c
},readAttribute:function(b, c) {
	b = $(b);
	if (Prototype.Browser.IE) {
		var d = Element._attributeTranslations.read;
		if (d.values[c])return d.values[c](b, c);
		if (d.names[c])c = d.names[c];
		if (c.include(":"))return!b.attributes || !b.attributes[c] ? null : b.attributes[c].value
	}
	return b.getAttribute(c)
},writeAttribute:function(b, c, d) {
	b = $(b);
	var e = {},f = Element._attributeTranslations.write;
	if (typeof c == "object")e = c; else e[c] = Object.isUndefined(d) ? true : d;
	for (var g in e) {
		c = f.names[g] ||
		g;
		d = e[g];
		if (f.values[g])c = f.values[g](b, d);
		if (d === false || d === null)b.removeAttribute(c); else d === true ? b.setAttribute(c, c) : b.setAttribute(c, d)
	}
	return b
},getHeight:function(b) {
	return Element.getDimensions(b).height
},getWidth:function(b) {
	return Element.getDimensions(b).width
},classNames:function(b) {
	return new Element.ClassNames(b)
},hasClassName:function(b, c) {
	if (b = $(b)) {
		b = b.className;
		return b.length > 0 && (b == c || (new RegExp("(^|\\s)" + c + "(\\s|$)")).test(b))
	}
},addClassName:function(b, c) {
	if (b = $(b)) {
		Element.hasClassName(b,
		c) || (b.className += (b.className ? " " : "") + c);
		return b
	}
},removeClassName:function(b, c) {
	if (b = $(b)) {
		b.className = b.className.replace(new RegExp("(^|\\s+)" + c + "(\\s+|$)"), " ").strip();
		return b
	}
},toggleClassName:function(b, c) {
	if (b = $(b))return Element[Element.hasClassName(b, c) ? "removeClassName" : "addClassName"](b, c)
},cleanWhitespace:function(b) {
	b = $(b);
	for (var c = b.firstChild; c;) {
		var d = c.nextSibling;
		c.nodeType == 3 && !/\S/.test(c.nodeValue) && b.removeChild(c);
		c = d
	}
	return b
},empty:function(b) {
	return $(b).innerHTML.blank()
},
	descendantOf:function(b, c) {
		b = $(b);
		c = $(c);
		if (b.compareDocumentPosition)return(b.compareDocumentPosition(c) & 8) === 8;
		if (c.contains)return c.contains(b) && c !== b;
		for (; b = b.parentNode;)if (b == c)return true;
		return false
	},scrollTo:function(b) {
		b = $(b);
		var c = Element.cumulativeOffset(b);
		window.scrollTo(c[0], c[1]);
		return b
	},getStyle:function(b, c) {
		b = $(b);
		c = c == "float" ? "cssFloat" : c.camelize();
		var d = b.style[c];
		if (!d || d == "auto")d = (b = document.defaultView.getComputedStyle(b, null)) ? b[c] : null;
		if (c == "opacity")return d ? parseFloat(d) :
		1;
		return d == "auto" ? null : d
	},getOpacity:function(b) {
		return $(b).getStyle("opacity")
	},setStyle:function(b, c) {
		b = $(b);
		var d = b.style;
		if (Object.isString(c)) {
			b.style.cssText += ";" + c;
			return c.include("opacity") ? b.setOpacity(c.match(/opacity:\s*(\d?\.?\d*)/)[1]) : b
		}
		for (var e in c)if (e == "opacity")b.setOpacity(c[e]); else d[e == "float" || e == "cssFloat" ? Object.isUndefined(d.styleFloat) ? "cssFloat" : "styleFloat" : e] = c[e];
		return b
	},setOpacity:function(b, c) {
		b = $(b);
		b.style.opacity = c == 1 || c === "" ? "" : c < 1.0E-5 ? 0 : c;
		return b
	},getDimensions:function(b) {
		b =
		$(b);
		var c = Element.getStyle(b, "display");
		if (c != "none" && c != null)return{width:b.offsetWidth,height:b.offsetHeight};
		c = b.style;
		var d = c.visibility,e = c.position,f = c.display;
		c.visibility = "hidden";
		if (e != "fixed")c.position = "absolute";
		c.display = "block";
		var g = b.clientWidth;
		b = b.clientHeight;
		c.display = f;
		c.position = e;
		c.visibility = d;
		return{width:g,height:b}
	},makePositioned:function(b) {
		b = $(b);
		var c = Element.getStyle(b, "position");
		if (c == "static" || !c) {
			b._madePositioned = true;
			b.style.position = "relative";
			if (Prototype.Browser.Opera) {
				b.style.top =
				0;
				b.style.left = 0
			}
		}
		return b
	},undoPositioned:function(b) {
		b = $(b);
		if (b._madePositioned) {
			b._madePositioned = undefined;
			b.style.position = b.style.top = b.style.left = b.style.bottom = b.style.right = ""
		}
		return b
	},makeClipping:function(b) {
		b = $(b);
		if (b._overflow)return b;
		b._overflow = Element.getStyle(b, "overflow") || "auto";
		if (b._overflow !== "hidden")b.style.overflow = "hidden";
		return b
	},undoClipping:function(b) {
		b = $(b);
		if (!b._overflow)return b;
		b.style.overflow = b._overflow == "auto" ? "" : b._overflow;
		b._overflow = null;
		return b
	},
	cumulativeOffset:function(b) {
		var c = 0,d = 0;
		do{
			c += b.offsetTop || 0;
			d += b.offsetLeft || 0;
			b = b.offsetParent
		} while (b);
		return Element._returnOffset(d, c)
	},positionedOffset:function(b) {
		var c = 0,d = 0;
		do{
			c += b.offsetTop || 0;
			d += b.offsetLeft || 0;
			if (b = b.offsetParent) {
				if (b.tagName.toUpperCase() == "BODY")break;
				if (Element.getStyle(b, "position") !== "static")break
			}
		} while (b);
		return Element._returnOffset(d, c)
	},absolutize:function(b) {
		b = $(b);
		if (Element.getStyle(b, "position") == "absolute")return b;
		var c = Element.positionedOffset(b),d =
		c[1];
		c = c[0];
		var e = b.clientWidth,f = b.clientHeight;
		b._originalLeft = c - parseFloat(b.style.left || 0);
		b._originalTop = d - parseFloat(b.style.top || 0);
		b._originalWidth = b.style.width;
		b._originalHeight = b.style.height;
		b.style.position = "absolute";
		b.style.top = d + "px";
		b.style.left = c + "px";
		b.style.width = e + "px";
		b.style.height = f + "px";
		return b
	},relativize:function(b) {
		b = $(b);
		if (Element.getStyle(b, "position") == "relative")return b;
		b.style.position = "relative";
		var c = parseFloat(b.style.top || 0) - (b._originalTop || 0),d = parseFloat(b.style.left ||
		0) - (b._originalLeft || 0);
		b.style.top = c + "px";
		b.style.left = d + "px";
		b.style.height = b._originalHeight;
		b.style.width = b._originalWidth;
		return b
	},cumulativeScrollOffset:function(b) {
		var c = 0,d = 0;
		do{
			c += b.scrollTop || 0;
			d += b.scrollLeft || 0;
			b = b.parentNode
		} while (b);
		return Element._returnOffset(d, c)
	},getOffsetParent:function(b) {
		if (b.offsetParent)return $(b.offsetParent);
		if (b == document.body)return $(b);
		for (; (b = b.parentNode) && b != document.body;)if (Element.getStyle(b, "position") != "static")return $(b);
		return $(document.body)
	},
	viewportOffset:function(b) {
		var c = 0,d = 0,e = b;
		do{
			c += e.offsetTop || 0;
			d += e.offsetLeft || 0;
			if (e.offsetParent == document.body && Element.getStyle(e, "position") == "absolute")break
		} while (e = e.offsetParent);
		e = b;
		do if (!Prototype.Browser.Opera || e.tagName && e.tagName.toUpperCase() == "BODY") {
			c -= e.scrollTop || 0;
			d -= e.scrollLeft || 0
		} while (e = e.parentNode);
		return Element._returnOffset(d, c)
	},clonePosition:function(b, c, d) {
		d = Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0}, d || {});
		c = $(c);
		var e = Element.viewportOffset(c);
		b = $(b);
		var f = [0,0],g = null;
		if (Element.getStyle(b, "position") == "absolute") {
			g = Element.getOffsetParent(b);
			f = Element.viewportOffset(g)
		}
		if (g == document.body) {
			f[0] -= document.body.offsetLeft;
			f[1] -= document.body.offsetTop
		}
		if (d.setLeft)b.style.left = e[0] - f[0] + d.offsetLeft + "px";
		if (d.setTop)b.style.top = e[1] - f[1] + d.offsetTop + "px";
		if (d.setWidth)b.style.width = c.offsetWidth + "px";
		if (d.setHeight)b.style.height = c.offsetHeight + "px";
		return b
	}};
Object.extend(Element.Methods, {getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});
Element._attributeTranslations = {write:{names:{className:"class",htmlFor:"for"},values:{}}};
if (Prototype.Browser.Opera) {
	Element.Methods.getStyle = Element.Methods.getStyle.wrap(function(b, c, d) {
		switch (d) {case "left":case "top":case "right":case "bottom":if (b(c, "position") === "static")return null;case "height":case "width":if (!Element.visible(c))return null;var e = parseInt(b(c, d), 10);if (e !== c["offset" + d.capitalize()])return e + "px";return(d === "height" ? ["border-top-width","padding-top","padding-bottom","border-bottom-width"] : ["border-left-width","padding-left","padding-right","border-right-width"]).inject(e,
																																																								     function(f, g) {
																																																									     g = b(c, g);
																																																									     return g === null ? f : f - parseInt(g, 10)
																																																								     }) + "px";default:return b(c, d)
		}
	});
	Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(function(b, c, d) {
		if (d === "title")return c.title;
		return b(c, d)
	})
} else if (Prototype.Browser.IE) {
	Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(function(b, c) {
		c = $(c);
		var d = c.getStyle("position");
		if (d !== "static")return b(c);
		c.setStyle({position:"relative"});
		b = b(c);
		c.setStyle({position:d});
		return b
	});
	$w("positionedOffset viewportOffset").each(function(b) {
		Element.Methods[b] =
		Element.Methods[b].wrap(function(c, d) {
			d = $(d);
			var e = d.getStyle("position");
			if (e !== "static")return c(d);
			var f = d.getOffsetParent();
			f && f.getStyle("position") === "fixed" && f.setStyle({zoom:1});
			d.setStyle({position:"relative"});
			c = c(d);
			d.setStyle({position:e});
			return c
		})
	});
	Element.Methods.cumulativeOffset = Element.Methods.cumulativeOffset.wrap(function(b, c) {
		return b(c)
	});
	Element.Methods.getStyle = function(b, c) {
		b = $(b);
		c = c == "float" || c == "cssFloat" ? "styleFloat" : c.camelize();
		var d = b.style[c];
		if (!d && b.currentStyle)d =
		b.currentStyle[c];
		if (c == "opacity") {
			if (d = (b.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/))if (d[1])return parseFloat(d[1]) / 100;
			return 1
		}
		if (d == "auto") {
			if ((c == "width" || c == "height") && b.getStyle("display") != "none")return b["offset" + c.capitalize()] + "px";
			return null
		}
		return d
	};
	Element.Methods.setOpacity = function(b, c) {
		function d(g) {
			return g.replace(/alpha\([^\)]*\)/gi, "")
		}

		b = $(b);
		var e = b.currentStyle;
		if (e && !e.hasLayout || !e && b.style.zoom == "normal")b.style.zoom = 1;
		e = b.getStyle("filter");
		var f = b.style;
		if (c == 1 || c === "") {
			(e = d(e)) ? (f.filter = e) : f.removeAttribute("filter");
			return b
		} else if (c < 1.0E-5)c = 0;
		f.filter = d(e) + "alpha(opacity=" + c * 100 + ")";
		return b
	};
	Element._attributeTranslations = function() {
		var b = "className",c = "for",d = document.createElement("div");
		d.setAttribute(b, "x");
		if (d.className !== "x") {
			d.setAttribute("class", "x");
			if (d.className === "x")b = "class"
		}
		d = null;
		d = document.createElement("label");
		d.setAttribute(c, "x");
		if (d.htmlFor !== "x") {
			d.setAttribute("htmlFor", "x");
			if (d.htmlFor === "x")c = "htmlFor"
		}
		d = null;
		return{read:{names:{"class":b,className:b,"for":c,htmlFor:c},values:{_getAttr:function(e, f) {
			return e.getAttribute(f)
		},_getAttr2:function(e, f) {
			return e.getAttribute(f, 2)
		},_getAttrNode:function(e, f) {
			return(e = e.getAttributeNode(f)) ? e.value : ""
		},_getEv:function() {
			var e = document.createElement("div");
			e.onclick = Prototype.emptyFunction;
			e = e.getAttribute("onclick");
			var f;
			if (String(e).indexOf("{") > -1)f = function(g, h) {
				h = g.getAttribute(h);
				if (!h)return null;
				h = h.toString();
				h = h.split("{")[1];
				h = h.split("}")[0];
				return h.strip()
			};
			else if (e === "")f = function(g, h) {
				h = g.getAttribute(h);
				if (!h)return null;
				return h.strip()
			};
			e = null;
			return f
		}(),_flag:function(e, f) {
			return $(e).hasAttribute(f) ? f : null
		},style:function(e) {
			return e.style.cssText.toLowerCase()
		},title:function(e) {
			return e.title
		}}}}
	}();
	Element._attributeTranslations.write = {names:Object.extend({cellpadding:"cellPadding",cellspacing:"cellSpacing"}, Element._attributeTranslations.read.names),values:{checked:function(b, c) {
		b.checked = !!c
	},style:function(b, c) {
		b.style.cssText = c ? c : ""
	}}};
	Element._attributeTranslations.has = {};
	$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(b) {
		Element._attributeTranslations.write.names[b.toLowerCase()] = b;
		Element._attributeTranslations.has[b.toLowerCase()] = b
	});
	(function(b) {
		Object.extend(b, {href:b._getAttr2,src:b._getAttr2,type:b._getAttr,action:b._getAttrNode,disabled:b._flag,checked:b._flag,readonly:b._flag,multiple:b._flag,onload:b._getEv,onunload:b._getEv,onclick:b._getEv,ondblclick:b._getEv,
			onmousedown:b._getEv,onmouseup:b._getEv,onmouseover:b._getEv,onmousemove:b._getEv,onmouseout:b._getEv,onfocus:b._getEv,onblur:b._getEv,onkeypress:b._getEv,onkeydown:b._getEv,onkeyup:b._getEv,onsubmit:b._getEv,onreset:b._getEv,onselect:b._getEv,onchange:b._getEv})
	})(Element._attributeTranslations.read.values);
	Prototype.BrowserFeatures.ElementExtensions && function() {
		function b(c) {
			c = c.getElementsByTagName("*");
			for (var d = [],e = 0,f; f = c[e]; e++)f.tagName !== "!" && d.push(f);
			return d
		}

		Element.Methods.down = function(c, d, e) {
			c = $(c);
			if (arguments.length == 1)return c.firstDescendant();
			return Object.isNumber(d) ? b(c)[d] : Element.select(c, d)[e || 0]
		}
	}()
} else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent))Element.Methods.setOpacity = function(b, c) {
	b = $(b);
	b.style.opacity = c == 1 ? 0.999999 : c === "" ? "" : c < 1.0E-5 ? 0 : c;
	return b
}; else if (Prototype.Browser.WebKit) {
	Element.Methods.setOpacity = function(b, c) {
		b = $(b);
		b.style.opacity = c == 1 || c === "" ? "" : c < 1.0E-5 ? 0 : c;
		if (c == 1)if (b.tagName.toUpperCase() == "IMG" && b.width) {
			b.width++;
			b.width--
		} else try {
			var d =
			document.createTextNode(" ");
			b.appendChild(d);
			b.removeChild(d)
		} catch(e) {
		}
		return b
	};
	Element.Methods.cumulativeOffset = function(b) {
		var c = 0,d = 0;
		do{
			c += b.offsetTop || 0;
			d += b.offsetLeft || 0;
			if (b.offsetParent == document.body)if (Element.getStyle(b, "position") == "absolute")break;
			b = b.offsetParent
		} while (b);
		return Element._returnOffset(d, c)
	}
}
if ("outerHTML"in document.documentElement)Element.Methods.replace = function(b, c) {
	b = $(b);
	if (c && c.toElement)c = c.toElement();
	if (Object.isElement(c)) {
		b.parentNode.replaceChild(c, b);
		return b
	}
	c = Object.toHTML(c);
	var d = b.parentNode,e = d.tagName.toUpperCase();
	if (Element._insertionTranslations.tags[e]) {
		var f = b.next();
		e = Element._getContentFromAnonymousElement(e, c.stripScripts());
		d.removeChild(b);
		f ? e.each(function(g) {
			d.insertBefore(g, f)
		}) : e.each(function(g) {
			d.appendChild(g)
		})
	} else b.outerHTML = c.stripScripts();
	c.evalScripts.bind(c).defer();
	return b
};
Element._returnOffset = function(b, c) {
	var d = [b,c];
	d.left = b;
	d.top = c;
	return d
};
Element._getContentFromAnonymousElement = function(b, c) {
	var d = new Element("div");
	if (b = Element._insertionTranslations.tags[b]) {
		d.innerHTML = b[0] + c + b[1];
		b[2].times(function() {
			d = d.firstChild
		})
	} else d.innerHTML = c;
	return $A(d.childNodes)
};
Element._insertionTranslations = {before:function(b, c) {
	b.parentNode.insertBefore(c, b)
},top:function(b, c) {
	b.insertBefore(c, b.firstChild)
},bottom:function(b, c) {
	b.appendChild(c)
},after:function(b, c) {
	b.parentNode.insertBefore(c, b.nextSibling)
},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};
(function() {
	var b = Element._insertionTranslations.tags;
	Object.extend(b, {THEAD:b.TBODY,TFOOT:b.TBODY,TH:b.TD})
})();
Element.Methods.Simulated = {hasAttribute:function(b, c) {
	c = Element._attributeTranslations.has[c] || c;
	b = $(b).getAttributeNode(c);
	return!!(b && b.specified)
}};
Element.Methods.ByTag = {};
Object.extend(Element, Element.Methods);
(function(b) {
	if (!Prototype.BrowserFeatures.ElementExtensions && b.__proto__) {
		window.HTMLElement = {};
		window.HTMLElement.prototype = b.__proto__;
		Prototype.BrowserFeatures.ElementExtensions = true
	}
})(document.createElement("div"));
Element.extend = function() {
	function b(g) {
		if (typeof window.Element != "undefined") {
			var h = window.Element.prototype;
			if (h) {
				var j = "_" + (Math.random() + "").slice(2);
				g = document.createElement(g);
				h[j] = "x";
				g = g[j] !== "x";
				delete h[j];
				return g
			}
		}
		return false
	}

	function c(g, h) {
		for (var j in h) {
			var m = h[j];
			if (Object.isFunction(m) && !(j in g))g[j] = m.methodize()
		}
	}

	var d = b("object");
	if (Prototype.BrowserFeatures.SpecificElementExtensions) {
		if (d)return function(g) {
			if (g && typeof g._extendedByPrototype == "undefined") {
				var h = g.tagName;
				if (h && /^(?:object|applet|embed)$/i.test(h)) {
					c(g, Element.Methods);
					c(g, Element.Methods.Simulated);
					c(g, Element.Methods.ByTag[h.toUpperCase()])
				}
			}
			return g
		};
		return Prototype.K
	}
	var e = {},f = Element.Methods.ByTag;
	d = Object.extend(function(g) {
		if (!g || typeof g._extendedByPrototype != "undefined" || g.nodeType != 1 || g == window)return g;
		var h = Object.clone(e),j = g.tagName.toUpperCase();
		f[j] && Object.extend(h, f[j]);
		c(g, h);
		g._extendedByPrototype = Prototype.emptyFunction;
		return g
	}, {refresh:function() {
		if (!Prototype.BrowserFeatures.ElementExtensions) {
			Object.extend(e,
			Element.Methods);
			Object.extend(e, Element.Methods.Simulated)
		}
	}});
	d.refresh();
	return d
}();
Element.hasAttribute = function(b, c) {
	if (b.hasAttribute)return b.hasAttribute(c);
	return Element.Methods.Simulated.hasAttribute(b, c)
};
Element.addMethods = function(b) {
	function c(m) {
		m = m.toUpperCase();
		Element.Methods.ByTag[m] || (Element.Methods.ByTag[m] = {});
		Object.extend(Element.Methods.ByTag[m], b)
	}

	function d(m, q, s) {
		s = s || false;
		for (var v in m) {
			var z = m[v];
			if (Object.isFunction(z))if (!s || !(v in q))q[v] = z.methodize()
		}
	}

	function e(m) {
		var q,s = {OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",
			Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};
		if (s[m])q = "HTML" + s[m] + "Element";
		if (window[q])return window[q];
		q = "HTML" + m + "Element";
		if (window[q])return window[q];
		q = "HTML" + m.capitalize() + "Element";
		if (window[q])return window[q];
		m = document.createElement(m);
		return m.__proto__ || m.constructor.prototype
	}

	var f = Prototype.BrowserFeatures,g = Element.Methods.ByTag;
	if (!b) {
		Object.extend(Form, Form.Methods);
		Object.extend(Form.Element, Form.Element.Methods);
		Object.extend(Element.Methods.ByTag, {FORM:Object.clone(Form.Methods),INPUT:Object.clone(Form.Element.Methods),SELECT:Object.clone(Form.Element.Methods),TEXTAREA:Object.clone(Form.Element.Methods)})
	}
	if (arguments.length == 2) {
		var h = b;
		b = arguments[1]
	}
	if (h)Object.isArray(h) ? h.each(c) : c(h); else Object.extend(Element.Methods, b || {});
	h = window.HTMLElement ? HTMLElement.prototype :
	Element.prototype;
	if (f.ElementExtensions) {
		d(Element.Methods, h);
		d(Element.Methods.Simulated, h, true)
	}
	if (f.SpecificElementExtensions)for (var j in Element.Methods.ByTag) {
		f = e(j);
		Object.isUndefined(f) || d(g[j], f.prototype)
	}
	Object.extend(Element, Element.Methods);
	delete Element.ByTag;
	Element.extend.refresh && Element.extend.refresh();
	Element.cache = {}
};
document.viewport = {getDimensions:function() {
	return{width:this.getWidth(),height:this.getHeight()}
},getScrollOffsets:function() {
	return Element._returnOffset(window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
}};
(function(b) {
	function c() {
		if (e.WebKit && !f.evaluate)return document;
		if (e.Opera && window.parseFloat(window.opera.version()) < 9.5)return document.body;
		return document.documentElement
	}

	function d(j) {
		g || (g = c());
		h[j] = "client" + j;
		b["get" + j] = function() {
			return g[h[j]]
		};
		return b["get" + j]()
	}

	var e = Prototype.Browser,f = document,g,h = {};
	b.getWidth = d.curry("Width");
	b.getHeight = d.curry("Height")
})(document.viewport);
Element.Storage = {UID:1};
Element.addMethods({getStorage:function(b) {
	if (b = $(b)) {
		if (b === window)b = 0; else {
			if (typeof b._prototypeUID === "undefined")b._prototypeUID = [Element.Storage.UID++];
			b = b._prototypeUID[0]
		}
		Element.Storage[b] || (Element.Storage[b] = $H());
		return Element.Storage[b]
	}
},store:function(b, c, d) {
	if (b = $(b)) {
		arguments.length === 2 ? Element.getStorage(b).update(c) : Element.getStorage(b).set(c, d);
		return b
	}
},retrieve:function(b, c, d) {
	if (b = $(b)) {
		b = Element.getStorage(b);
		var e = b.get(c);
		if (Object.isUndefined(e)) {
			b.set(c, d);
			e = d
		}
		return e
	}
},
	clone:function(b, c) {
		if (b = $(b)) {
			b = b.cloneNode(c);
			b._prototypeUID = void 0;
			if (c) {
				c = Element.select(b, "*");
				for (var d = c.length; d--;)c[d]._prototypeUID = void 0
			}
			return Element.extend(b)
		}
	}});
var Selector = Class.create({initialize:function(b) {
	this.expression = b.strip();
	if (this.shouldUseSelectorsAPI())this.mode = "selectorsAPI"; else if (this.shouldUseXPath()) {
		this.mode = "xpath";
		this.compileXPathMatcher()
	} else {
		this.mode = "normal";
		this.compileMatcher()
	}
},shouldUseXPath:function() {
	var b = function() {
		var c = false;
		if (document.evaluate && window.XPathResult) {
			c = document.createElement("div");
			c.innerHTML = "<ul><li></li></ul><div><ul><li></li></ul></div>";
			c = document.evaluate(".//*[local-name()='ul' or local-name()='UL']//*[local-name()='li' or local-name()='LI']",
			c, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength !== 2
		}
		return c
	}();
	return function() {
		if (!Prototype.BrowserFeatures.XPath)return false;
		var c = this.expression;
		if (Prototype.Browser.WebKit && (c.include("-of-type") || c.include(":empty")))return false;
		if (/(\[[\w-]*?:|:checked)/.test(c))return false;
		if (b)return false;
		return true
	}
}(),shouldUseSelectorsAPI:function() {
	if (!Prototype.BrowserFeatures.SelectorsAPI)return false;
	if (Selector.CASE_INSENSITIVE_CLASS_NAMES)return false;
	if (!Selector._div)Selector._div =
	new Element("div");
	try {
		Selector._div.querySelector(this.expression)
	} catch(b) {
		return false
	}
	return true
},compileMatcher:function() {
	var b = this.expression,c = Selector.patterns,d = Selector.criteria,e,f,g = c.length,h;
	if (Selector._cache[b])this.matcher = Selector._cache[b]; else {
		for (this.matcher = ["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"]; b && e != b && /\S/.test(b);) {
			e = b;
			for (var j = 0; j < g; j++) {
				f = c[j].re;
				h = c[j].name;
				if (f = b.match(f)) {
					this.matcher.push(Object.isFunction(d[h]) ?
					d[h](f) : (new Template(d[h])).evaluate(f));
					b = b.replace(f[0], "");
					break
				}
			}
		}
		this.matcher.push("return h.unique(n);\n}");
		eval(this.matcher.join("\n"));
		Selector._cache[this.expression] = this.matcher
	}
},compileXPathMatcher:function() {
	var b = this.expression,c = Selector.patterns,d = Selector.xpath,e,f,g = c.length,h;
	if (Selector._cache[b])this.xpath = Selector._cache[b]; else {
		for (this.matcher = [".//*"]; b && e != b && /\S/.test(b);) {
			e = b;
			for (var j = 0; j < g; j++) {
				h = c[j].name;
				if (f = b.match(c[j].re)) {
					this.matcher.push(Object.isFunction(d[h]) ?
					d[h](f) : (new Template(d[h])).evaluate(f));
					b = b.replace(f[0], "");
					break
				}
			}
		}
		this.xpath = this.matcher.join("");
		Selector._cache[this.expression] = this.xpath
	}
},findElements:function(b) {
	b = b || document;
	var c = this.expression;
	switch (this.mode) {case "selectorsAPI":if (b !== document) {
		var d = b.id,e = $(b).identify();
		e = e.replace(/([\.:])/g, "\\$1");
		c = "#" + e + " " + c
	}c = $A(b.querySelectorAll(c)).map(Element.extend);b.id = d;return c;case "xpath":return document._getElementsByXPath(this.xpath, b);default:return this.matcher(b)
	}
},match:function(b) {
	this.tokens =
	[];
	for (var c = this.expression,d = Selector.patterns,e = Selector.assertions,f,g,h = d.length,j; c && f !== c && /\S/.test(c);) {
		f = c;
		for (var m = 0; m < h; m++) {
			g = d[m].re;
			j = d[m].name;
			if (g = c.match(g))if (e[j]) {
				this.tokens.push([j,Object.clone(g)]);
				c = c.replace(g[0], "")
			} else return this.findElements(document).include(b)
		}
	}
	c = true;
	for (m = 0; d = this.tokens[m]; m++) {
		j = d[0];
		d = d[1];
		if (!Selector.assertions[j](b, d)) {
			c = false;
			break
		}
	}
	return c
},toString:function() {
	return this.expression
},inspect:function() {
	return"#<Selector:" + this.expression.inspect() +
	">"
}});
if (Prototype.BrowserFeatures.SelectorsAPI && document.compatMode === "BackCompat")Selector.CASE_INSENSITIVE_CLASS_NAMES = function() {
	var b = document.createElement("div"),c = document.createElement("span");
	b.id = "prototype_test_id";
	c.className = "Test";
	b.appendChild(c);
	return b.querySelector("#prototype_test_id .test") !== null
}();
Object.extend(Selector, {_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(b) {
	if (b[1] == "*")return"";
	return"[local-name()='" + b[1].toLowerCase() + "' or local-name()='" + b[1].toUpperCase() + "']"
},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:function(b) {
	b[1] = b[1].toLowerCase();
	return(new Template("[@#{1}]")).evaluate(b)
},attr:function(b) {
	b[1] = b[1].toLowerCase();
	b[3] = b[5] || b[6];
	return(new Template(Selector.xpath.operators[b[2]])).evaluate(b)
},pseudo:function(b) {
	var c = Selector.xpath.pseudos[b[1]];
	if (!c)return"";
	if (Object.isFunction(c))return c(b);
	return(new Template(Selector.xpath.pseudos[b[1]])).evaluate(b)
},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},
	pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]",empty:"[count(*) = 0 and (count(text()) = 0)]",checked:"[@checked]",disabled:"[(@disabled) and (@type!='hidden')]",enabled:"[not(@disabled) and (@type!='hidden')]",not:function(b) {
		for (var c = b[6],d = Selector.patterns,e = Selector.xpath,f,g,h = d.length,j = []; c && f != c && /\S/.test(c);) {
			f = c;
			for (var m = 0; m < h; m++) {
				g = d[m].name;
				if (b = c.match(d[m].re)) {
					g =
					Object.isFunction(e[g]) ? e[g](b) : (new Template(e[g])).evaluate(b);
					j.push("(" + g.substring(1, g.length - 1) + ")");
					c = c.replace(b[0], "");
					break
				}
			}
		}
		return"[not(" + j.join(" and ") + ")]"
	},"nth-child":function(b) {
		return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", b)
	},"nth-last-child":function(b) {
		return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", b)
	},"nth-of-type":function(b) {
		return Selector.xpath.pseudos.nth("position() ", b)
	},"nth-last-of-type":function(b) {
		return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",
		b)
	},"first-of-type":function(b) {
		b[6] = "1";
		return Selector.xpath.pseudos["nth-of-type"](b)
	},"last-of-type":function(b) {
		b[6] = "1";
		return Selector.xpath.pseudos["nth-last-of-type"](b)
	},"only-of-type":function(b) {
		var c = Selector.xpath.pseudos;
		return c["first-of-type"](b) + c["last-of-type"](b)
	},nth:function(b, c) {
		var d = c[6];
		if (d == "even")d = "2n+0";
		if (d == "odd")d = "2n+1";
		if (c = d.match(/^(\d+)$/))return"[" + b + "= " + c[1] + "]";
		if (c = d.match(/^(-?\d*)?n(([+-])(\d+))?/)) {
			if (c[1] == "-")c[1] = -1;
			d = c[1] ? Number(c[1]) : 1;
			c = c[2] ?
			Number(c[2]) : 0;
			return(new Template("[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]")).evaluate({fragment:b,a:d,b:c})
		}
	}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);      c = false;',className:'n = h.className(n, r, "#{1}", c);    c = false;',id:'n = h.id(n, r, "#{1}", c);           c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}", c); c = false;',attr:function(b) {
	b[3] = b[5] || b[6];
	return(new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;')).evaluate(b)
},
	pseudo:function(b) {
		if (b[6])b[6] = b[6].replace(/"/g, '\\"');
		return(new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;')).evaluate(b)
	},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:[
	{name:"laterSibling",re:/^\s*~\s*/},
	{name:"child",re:/^\s*>\s*/},
	{name:"adjacent",re:/^\s*\+\s*/},
	{name:"descendant",re:/^\s/},
	{name:"tagName",re:/^\s*(\*|[\w\-]+)(\b|$)?/},
	{name:"id",re:/^#([\w\-\*]+)(\b|$)/},
	{name:"className",re:/^\.([\w\-\*]+)(\b|$)/},
	{name:"pseudo",re:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/},
	{name:"attrPresence",re:/^\[((?:[\w-]+:)?[\w-]+)\]/},
	{name:"attr",re:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/}
],assertions:{tagName:function(b, c) {
	return c[1].toUpperCase() == b.tagName.toUpperCase()
},className:function(b, c) {
	return Element.hasClassName(b, c[1])
},id:function(b, c) {
	return b.id === c[1]
},attrPresence:function(b, c) {
	return Element.hasAttribute(b,
	c[1])
},attr:function(b, c) {
	return(b = Element.readAttribute(b, c[1])) && Selector.operators[c[2]](b, c[5] || c[6])
}},handlers:{concat:function(b, c) {
	for (var d = 0,e; e = c[d]; d++)b.push(e);
	return b
},mark:function(b) {
	for (var c = Prototype.emptyFunction,d = 0,e; e = b[d]; d++)e._countedByPrototype = c;
	return b
},unmark:function() {
	return function() {
		var b = document.createElement("div"),c = false;
		b._countedByPrototype = "x";
		return c = b.getAttribute("_countedByPrototype") === "x"
	}() ? function(b) {
		for (var c = 0,d; d = b[c]; c++)d.removeAttribute("_countedByPrototype");
		return b
	} : function(b) {
		for (var c = 0,d; d = b[c]; c++)d._countedByPrototype = void 0;
		return b
	}
}(),index:function(b, c, d) {
	b._countedByPrototype = Prototype.emptyFunction;
	if (c) {
		b = b.childNodes;
		c = b.length - 1;
		for (var e = 1; c >= 0; c--) {
			var f = b[c];
			if (f.nodeType == 1 && (!d || f._countedByPrototype))f.nodeIndex = e++
		}
	} else {
		c = 0;
		e = 1;
		for (b = b.childNodes; f = b[c]; c++)if (f.nodeType == 1 && (!d || f._countedByPrototype))f.nodeIndex = e++
	}
},unique:function(b) {
	if (b.length == 0)return b;
	for (var c = [],d,e = 0,f = b.length; e < f; e++)if (typeof(d = b[e])._countedByPrototype ==
	"undefined") {
		d._countedByPrototype = Prototype.emptyFunction;
		c.push(Element.extend(d))
	}
	return Selector.handlers.unmark(c)
},descendant:function(b) {
	for (var c = Selector.handlers,d = 0,e = [],f; f = b[d]; d++)c.concat(e, f.getElementsByTagName("*"));
	return e
},child:function(b) {
	for (var c = 0,d = [],e; e = b[c]; c++)for (var f = 0,g; g = e.childNodes[f]; f++)g.nodeType == 1 && g.tagName != "!" && d.push(g);
	return d
},adjacent:function(b) {
	for (var c = 0,d = [],e; e = b[c]; c++)(e = this.nextElementSibling(e)) && d.push(e);
	return d
},laterSibling:function(b) {
	for (var c =
	Selector.handlers,d = 0,e = [],f; f = b[d]; d++)c.concat(e, Element.nextSiblings(f));
	return e
},nextElementSibling:function(b) {
	for (; b = b.nextSibling;)if (b.nodeType == 1)return b;
	return null
},previousElementSibling:function(b) {
	for (; b = b.previousSibling;)if (b.nodeType == 1)return b;
	return null
},tagName:function(b, c, d, e) {
	var f = d.toUpperCase(),g = [],h = Selector.handlers;
	if (b) {
		if (e) {
			if (e == "descendant") {
				for (c = 0; e = b[c]; c++)h.concat(g, e.getElementsByTagName(d));
				return g
			} else b = this[e](b);
			if (d == "*")return b
		}
		for (c = 0; e = b[c]; c++)e.tagName.toUpperCase() ===
		f && g.push(e);
		return g
	} else return c.getElementsByTagName(d)
},id:function(b, c, d, e) {
	var f = $(d),g = Selector.handlers;
	if (c == document) {
		if (!f)return[];
		if (!b)return[f]
	} else if (!c.sourceIndex || c.sourceIndex < 1) {
		b = c.getElementsByTagName("*");
		for (var h = 0,j; j = b[h]; h++)if (j.id === d)return[j]
	}
	if (b) {
		if (e)if (e == "child")for (c = 0; j = b[c]; c++) {
			if (f.parentNode == j)return[f]
		} else if (e == "descendant")for (c = 0; j = b[c]; c++) {
			if (Element.descendantOf(f, j))return[f]
		} else if (e == "adjacent")for (c = 0; j = b[c]; c++) {
			if (Selector.handlers.previousElementSibling(f) ==
			j)return[f]
		} else b = g[e](b);
		for (c = 0; j = b[c]; c++)if (j == f)return[f];
		return[]
	}
	return f && Element.descendantOf(f, c) ? [f] : []
},className:function(b, c, d, e) {
	if (b && e)b = this[e](b);
	return Selector.handlers.byClassName(b, c, d)
},byClassName:function(b, c, d) {
	b || (b = Selector.handlers.descendant([c]));
	c = " " + d + " ";
	for (var e = 0,f = [],g,h; g = b[e]; e++) {
		h = g.className;
		if (h.length != 0)if (h == d || (" " + h + " ").include(c))f.push(g)
	}
	return f
},attrPresence:function(b, c, d, e) {
	b || (b = c.getElementsByTagName("*"));
	if (b && e)b = this[e](b);
	c = [];
	e = 0;
	for (var f; f = b[e]; e++)Element.hasAttribute(f, d) && c.push(f);
	return c
},attr:function(b, c, d, e, f, g) {
	b || (b = c.getElementsByTagName("*"));
	if (b && g)b = this[g](b);
	c = Selector.operators[f];
	f = [];
	g = 0;
	for (var h; h = b[g]; g++) {
		var j = Element.readAttribute(h, d);
		j !== null && c(j, e) && f.push(h)
	}
	return f
},pseudo:function(b, c, d, e, f) {
	if (b && f)b = this[f](b);
	b || (b = e.getElementsByTagName("*"));
	return Selector.pseudos[c](b, d, e)
}},pseudos:{"first-child":function(b) {
	for (var c = 0,d = [],e; e = b[c]; c++)Selector.handlers.previousElementSibling(e) ||
	d.push(e);
	return d
},"last-child":function(b) {
	for (var c = 0,d = [],e; e = b[c]; c++)Selector.handlers.nextElementSibling(e) || d.push(e);
	return d
},"only-child":function(b) {
	for (var c = Selector.handlers,d = 0,e = [],f; f = b[d]; d++)!c.previousElementSibling(f) && !c.nextElementSibling(f) && e.push(f);
	return e
},"nth-child":function(b, c, d) {
	return Selector.pseudos.nth(b, c, d)
},"nth-last-child":function(b, c, d) {
	return Selector.pseudos.nth(b, c, d, true)
},"nth-of-type":function(b, c, d) {
	return Selector.pseudos.nth(b, c, d, false, true)
},
	"nth-last-of-type":function(b, c, d) {
		return Selector.pseudos.nth(b, c, d, true, true)
	},"first-of-type":function(b, c, d) {
		return Selector.pseudos.nth(b, "1", d, false, true)
	},"last-of-type":function(b, c, d) {
		return Selector.pseudos.nth(b, "1", d, true, true)
	},"only-of-type":function(b, c, d) {
		var e = Selector.pseudos;
		return e["last-of-type"](e["first-of-type"](b, c, d), c, d)
	},getIndices:function(b, c, d) {
		if (b == 0)return c > 0 ? [c] : [];
		return $R(1, d).inject([], function(e, f) {
			0 == (f - c) % b && (f - c) / b >= 0 && e.push(f);
			return e
		})
	},nth:function(b, c, d, e, f) {
		if (b.length == 0)return[];
		if (c == "even")c = "2n+0";
		if (c == "odd")c = "2n+1";
		d = Selector.handlers;
		var g = [],h = [],j;
		d.mark(b);
		for (var m = 0; j = b[m]; m++)if (!j.parentNode._countedByPrototype) {
			d.index(j.parentNode, e, f);
			h.push(j.parentNode)
		}
		if (c.match(/^\d+$/)) {
			c = Number(c);
			for (m = 0; j = b[m]; m++)j.nodeIndex == c && g.push(j)
		} else if (j = c.match(/^(-?\d*)?n(([+-])(\d+))?/)) {
			if (j[1] == "-")j[1] = -1;
			m = j[1] ? Number(j[1]) : 1;
			j = j[2] ? Number(j[2]) : 0;
			c = Selector.pseudos.getIndices(m, j, b.length);
			m = 0;
			for (e = c.length; j = b[m]; m++)for (f = 0; f <
			e; f++)j.nodeIndex == c[f] && g.push(j)
		}
		d.unmark(b);
		d.unmark(h);
		return g
	},empty:function(b) {
		for (var c = 0,d = [],e; e = b[c]; c++)e.tagName == "!" || e.firstChild || d.push(e);
		return d
	},not:function(b, c, d) {
		var e = Selector.handlers;
		c = (new Selector(c)).findElements(d);
		e.mark(c);
		d = 0;
		for (var f = [],g; g = b[d]; d++)g._countedByPrototype || f.push(g);
		e.unmark(c);
		return f
	},enabled:function(b) {
		for (var c = 0,d = [],e; e = b[c]; c++)if (!e.disabled && (!e.type || e.type !== "hidden"))d.push(e);
		return d
	},disabled:function(b) {
		for (var c = 0,d = [],e; e = b[c]; c++)e.disabled &&
		d.push(e);
		return d
	},checked:function(b) {
		for (var c = 0,d = [],e; e = b[c]; c++)e.checked && d.push(e);
		return d
	}},operators:{"=":function(b, c) {
	return b == c
},"!=":function(b, c) {
	return b != c
},"^=":function(b, c) {
	return b == c || b && b.startsWith(c)
},"$=":function(b, c) {
	return b == c || b && b.endsWith(c)
},"*=":function(b, c) {
	return b == c || b && b.include(c)
},"~=":function(b, c) {
	return(" " + b + " ").include(" " + c + " ")
},"|=":function(b, c) {
	return("-" + (b || "").toUpperCase() + "-").include("-" + (c || "").toUpperCase() + "-")
}},split:function(b) {
	var c =
	[];
	b.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(d) {
		c.push(d[1].strip())
	});
	return c
},matchElements:function(b, c) {
	c = $$(c);
	var d = Selector.handlers;
	d.mark(c);
	for (var e = 0,f = [],g; g = b[e]; e++)g._countedByPrototype && f.push(g);
	d.unmark(c);
	return f
},findElement:function(b, c, d) {
	if (Object.isNumber(c)) {
		d = c;
		c = false
	}
	return Selector.matchElements(b, c || "*")[d || 0]
},findChildElements:function(b, c) {
	c = Selector.split(c.join(","));
	for (var d = [],e = Selector.handlers,f = 0,g = c.length,h; f < g; f++) {
		h = new Selector(c[f].strip());
		e.concat(d, h.findElements(b))
	}
	return g > 1 ? e.unique(d) : d
}});
Prototype.Browser.IE && Object.extend(Selector.handlers, {concat:function(b, c) {
	for (var d = 0,e; e = c[d]; d++)e.tagName !== "!" && b.push(e);
	return b
}});
function $$() {
	return Selector.findChildElements(document, $A(arguments))
}
var Form = {reset:function(b) {
	b = $(b);
	b.reset();
	return b
},serializeElements:function(b, c) {
	if (typeof c != "object")c = {hash:!!c}; else if (Object.isUndefined(c.hash))c.hash = true;
	var d,e,f = false,g = c.submit;
	b = b.inject({}, function(h, j) {
		if (!j.disabled && j.name) {
			d = j.name;
			e = $(j).getValue();
			if (e != null && j.type != "file" && (j.type != "submit" || !f && g !== false && (!g || d == g) && (f = true)))if (d in h) {
				Object.isArray(h[d]) || (h[d] = [h[d]]);
				h[d].push(e)
			} else h[d] = e
		}
		return h
	});
	return c.hash ? b : Object.toQueryString(b)
}};
Form.Methods = {serialize:function(b, c) {
	return Form.serializeElements(Form.getElements(b), c)
},getElements:function(b) {
	b = $(b).getElementsByTagName("*");
	for (var c,d = [],e = Form.Element.Serializers,f = 0; c = b[f]; f++)d.push(c);
	return d.inject([], function(g, h) {
		e[h.tagName.toLowerCase()] && g.push(Element.extend(h));
		return g
	})
},getInputs:function(b, c, d) {
	b = $(b);
	b = b.getElementsByTagName("input");
	if (!c && !d)return $A(b).map(Element.extend);
	for (var e = 0,f = [],g = b.length; e < g; e++) {
		var h = b[e];
		c && h.type != c || d && h.name != d ||
		f.push(Element.extend(h))
	}
	return f
},disable:function(b) {
	b = $(b);
	Form.getElements(b).invoke("disable");
	return b
},enable:function(b) {
	b = $(b);
	Form.getElements(b).invoke("enable");
	return b
},findFirstElement:function(b) {
	b = $(b).getElements().findAll(function(d) {
		return"hidden" != d.type && !d.disabled
	});
	var c = b.findAll(
			 function(d) {
				 return d.hasAttribute("tabIndex") && d.tabIndex >= 0
			 }).sortBy(
				  function(d) {
					  return d.tabIndex
				  }).first();
	return c ? c : b.find(function(d) {
		return/^(?:input|select|textarea)$/i.test(d.tagName)
	})
},
	focusFirstElement:function(b) {
		b = $(b);
		b.findFirstElement().activate();
		return b
	},request:function(b, c) {
		b = $(b);
		c = Object.clone(c || {});
		var d = c.parameters,e = b.readAttribute("action") || "";
		if (e.blank())e = window.location.href;
		c.parameters = b.serialize(true);
		if (d) {
			if (Object.isString(d))d = d.toQueryParams();
			Object.extend(c.parameters, d)
		}
		if (b.hasAttribute("method") && !c.method)c.method = b.method;
		return new Ajax.Request(e, c)
	}};
Form.Element = {focus:function(b) {
	$(b).focus();
	return b
},select:function(b) {
	$(b).select();
	return b
}};
Form.Element.Methods = {serialize:function(b) {
	b = $(b);
	if (!b.disabled && b.name) {
		var c = b.getValue();
		if (c != undefined) {
			var d = {};
			d[b.name] = c;
			return Object.toQueryString(d)
		}
	}
	return""
},getValue:function(b) {
	b = $(b);
	var c = b.tagName.toLowerCase();
	return Form.Element.Serializers[c](b)
},setValue:function(b, c) {
	b = $(b);
	var d = b.tagName.toLowerCase();
	Form.Element.Serializers[d](b, c);
	return b
},clear:function(b) {
	$(b).value = "";
	return b
},present:function(b) {
	return $(b).value != ""
},activate:function(b) {
	b = $(b);
	try {
		b.focus();
		if (b.select && (b.tagName.toLowerCase() != "input" || !/^(?:button|reset|submit)$/i.test(b.type)))b.select()
	} catch(c) {
	}
	return b
},disable:function(b) {
	b = $(b);
	b.disabled = true;
	return b
},enable:function(b) {
	b = $(b);
	b.disabled = false;
	return b
}};
var Field = Form.Element,$F = Form.Element.Methods.getValue;
Form.Element.Serializers = {input:function(b, c) {
	switch (b.type.toLowerCase()) {case "checkbox":case "radio":return Form.Element.Serializers.inputSelector(b, c);default:return Form.Element.Serializers.textarea(b, c)
	}
},inputSelector:function(b, c) {
	if (Object.isUndefined(c))return b.checked ? b.value : null; else b.checked = !!c
},textarea:function(b, c) {
	if (Object.isUndefined(c))return b.value; else b.value = c
},select:function(b, c) {
	if (Object.isUndefined(c))return this[b.type == "select-one" ? "selectOne" : "selectMany"](b);
	else for (var d,e,f = !Object.isArray(c),g = 0,h = b.length; g < h; g++) {
		d = b.options[g];
		e = this.optionValue(d);
		if (f) {
			if (e == c) {
				d.selected = true;
				return
			}
		} else d.selected = c.include(e)
	}
},selectOne:function(b) {
	var c = b.selectedIndex;
	return c >= 0 ? this.optionValue(b.options[c]) : null
},selectMany:function(b) {
	var c,d = b.length;
	if (!d)return null;
	var e = 0;
	for (c = []; e < d; e++) {
		var f = b.options[e];
		f.selected && c.push(this.optionValue(f))
	}
	return c
},optionValue:function(b) {
	return Element.extend(b).hasAttribute("value") ? b.value : b.text
}};
Abstract.TimedObserver = Class.create(PeriodicalExecuter, {initialize:function($super, c, d, e) {
	$super(e, d);
	this.element = $(c);
	this.lastValue = this.getValue()
},execute:function() {
	var b = this.getValue();
	if (Object.isString(this.lastValue) && Object.isString(b) ? this.lastValue != b : String(this.lastValue) != String(b)) {
		this.callback(this.element, b);
		this.lastValue = b
	}
}});
Form.Element.Observer = Class.create(Abstract.TimedObserver, {getValue:function() {
	return Form.Element.getValue(this.element)
}});
Form.Observer = Class.create(Abstract.TimedObserver, {getValue:function() {
	return Form.serialize(this.element)
}});
Abstract.EventObserver = Class.create({initialize:function(b, c) {
	this.element = $(b);
	this.callback = c;
	this.lastValue = this.getValue();
	this.element.tagName.toLowerCase() == "form" ? this.registerFormCallbacks() : this.registerCallback(this.element)
},onElementEvent:function() {
	var b = this.getValue();
	if (this.lastValue != b) {
		this.callback(this.element, b);
		this.lastValue = b
	}
},registerFormCallbacks:function() {
	Form.getElements(this.element).each(this.registerCallback, this)
},registerCallback:function(b) {
	if (b.type)switch (b.type.toLowerCase()) {case "checkbox":case "radio":Event.observe(b,
	"click", this.onElementEvent.bind(this));break;default:Event.observe(b, "change", this.onElementEvent.bind(this));break
	}
}});
Form.Element.EventObserver = Class.create(Abstract.EventObserver, {getValue:function() {
	return Form.Element.getValue(this.element)
}});
Form.EventObserver = Class.create(Abstract.EventObserver, {getValue:function() {
	return Form.serialize(this.element)
}});
(function() {
	function b(k) {
		return r(k, 0)
	}

	function c(k) {
		return r(k, 1)
	}

	function d(k) {
		return r(k, 2)
	}

	function e(k) {
		k = x.extend(k);
		var l = k.target,o = k.type;
		if ((k = k.currentTarget) && k.tagName)if (o === "load" || o === "error" || o === "click" && k.tagName.toLowerCase() === "input" && k.type === "radio")l = k;
		if (l.nodeType == Node.TEXT_NODE)l = l.parentNode;
		return Element.extend(l)
	}

	function f(k, l) {
		k = x.element(k);
		if (!l)return k;
		k = [k].concat(k.ancestors());
		return Selector.findElement(k, l, 0)
	}

	function g(k) {
		return{x:h(k),y:j(k)}
	}

	function h(k) {
		var l =
		document.documentElement,o = document.body || {scrollLeft:0};
		return k.pageX || k.clientX + (l.scrollLeft || o.scrollLeft) - (l.clientLeft || 0)
	}

	function j(k) {
		var l = document.documentElement,o = document.body || {scrollTop:0};
		return k.pageY || k.clientY + (l.scrollTop || o.scrollTop) - (l.clientTop || 0)
	}

	function m(k) {
		x.extend(k);
		k.preventDefault();
		k.stopPropagation();
		k.stopped = true
	}

	function q(k, l, o) {
		var w = Element.retrieve(k, "prototype_event_registry");
		if (Object.isUndefined(w)) {
			u.push(k);
			w = Element.retrieve(k, "prototype_event_registry",
			$H())
		}
		var B = w.get(l);
		if (Object.isUndefined(B)) {
			B = [];
			w.set(l, B)
		}
		if (B.pluck("handler").include(o))return false;
		var H;
		if (l.include(":"))H = function(I) {
			if (Object.isUndefined(I.eventName))return false;
			if (I.eventName !== l)return false;
			x.extend(I, k);
			o.call(k, I)
		}; else if (!n && (l === "mouseenter" || l === "mouseleave")) {
			if (l === "mouseenter" || l === "mouseleave")H = function(I) {
				x.extend(I, k);
				for (var J = I.relatedTarget; J && J !== k;)try {
					J = J.parentNode
				} catch(t) {
					J = k
				}
				J !== k && o.call(k, I)
			}
		} else H = function(I) {
			x.extend(I, k);
			o.call(k, I)
		};
		H.handler = o;
		B.push(H);
		return H
	}

	function s() {
		for (var k = 0,l = u.length; k < l; k++) {
			x.stopObserving(u[k]);
			u[k] = null
		}
	}

	function v(k, l, o) {
		k = $(k);
		o = q(k, l, o);
		if (!o)return k;
		if (l.include(":"))if (k.addEventListener)k.addEventListener("dataavailable", o, false); else {
			k.attachEvent("ondataavailable", o);
			k.attachEvent("onfilterchange", o)
		} else {
			l = p(l);
			k.addEventListener ? k.addEventListener(l, o, false) : k.attachEvent("on" + l, o)
		}
		return k
	}

	function z(k, l, o) {
		k = $(k);
		var w = Element.retrieve(k, "prototype_event_registry");
		if (Object.isUndefined(w))return k;
		if (l && !o) {
			var B = w.get(l);
			if (Object.isUndefined(B))return k;
			B.each(function(J) {
				Element.stopObserving(k, l, J.handler)
			});
			return k
		} else if (!l) {
			w.each(function(J) {
				var t = J.key;
				J.value.each(function(y) {
					Element.stopObserving(k, t, y.handler)
				})
			});
			return k
		}
		if (B = w.get(l)) {
			var H = B.find(function(J) {
				return J.handler === o
			});
			if (!H)return k;
			var I = p(l);
			if (l.include(":"))if (k.removeEventListener)k.removeEventListener("dataavailable", H, false); else {
				k.detachEvent("ondataavailable", H);
				k.detachEvent("onfilterchange", H)
			} else k.removeEventListener ?
			k.removeEventListener(I, H, false) : k.detachEvent("on" + I, H);
			w.set(l, B.without(H));
			return k
		}
	}

	function F(k, l, o, w) {
		k = $(k);
		if (Object.isUndefined(w))w = true;
		if (k == document && document.createEvent && !k.dispatchEvent)k = document.documentElement;
		var B;
		if (document.createEvent) {
			B = document.createEvent("HTMLEvents");
			B.initEvent("dataavailable", true, true)
		} else {
			B = document.createEventObject();
			B.eventType = w ? "ondataavailable" : "onfilterchange"
		}
		B.eventName = l;
		B.memo = o || {};
		document.createEvent ? k.dispatchEvent(B) : k.fireEvent(B.eventType,
		B);
		return x.extend(B)
	}

	var x = {KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{}},K = document.documentElement,n = "onmouseenter"in K && "onmouseleave"in K,r;
	if (Prototype.Browser.IE) {
		var C = {0:1,1:4,2:2};
		r = function(k, l) {
			return k.button === C[l]
		}
	} else r = Prototype.Browser.WebKit ? function(k, l) {
		switch (l) {case 0:return k.which == 1 && !k.metaKey;case 1:return k.which == 1 && k.metaKey;
			default:return false
		}
	} : function(k, l) {
		return k.which ? k.which === l + 1 : k.button === l
	};
	x.Methods = {isLeftClick:b,isMiddleClick:c,isRightClick:d,element:e,findElement:f,pointer:g,pointerX:h,pointerY:j,stop:m};
	var G = Object.keys(x.Methods).inject({}, function(k, l) {
		k[l] = x.Methods[l].methodize();
		return k
	});
	if (Prototype.Browser.IE) {
		var A = function(k) {
			switch (k.type) {case "mouseover":k = k.fromElement;break;case "mouseout":k = k.toElement;break;default:return null
			}
			return Element.extend(k)
		};
		Object.extend(G, {stopPropagation:function() {
			this.cancelBubble =
			true
		},preventDefault:function() {
			this.returnValue = false
		},inspect:function() {
			return"[object Event]"
		}});
		x.extend = function(k, l) {
			if (!k)return false;
			if (k._extendedByPrototype)return k;
			k._extendedByPrototype = Prototype.emptyFunction;
			var o = x.pointer(k);
			Object.extend(k, {target:k.srcElement || l,relatedTarget:A(k),pageX:o.x,pageY:o.y});
			return Object.extend(k, G)
		}
	} else {
		x.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__;
		Object.extend(x.prototype, G);
		x.extend = Prototype.K
	}
	var u = [];
	Prototype.Browser.IE &&
	window.attachEvent("onunload", s);
	Prototype.Browser.WebKit && window.addEventListener("unload", Prototype.emptyFunction, false);
	var p = Prototype.K;
	n || (p = function(k) {
		var l = {mouseenter:"mouseover",mouseleave:"mouseout"};
		return k in l ? l[k] : k
	});
	Object.extend(x, x.Methods);
	Object.extend(x, {fire:F,observe:v,stopObserving:z});
	Element.addMethods({fire:F,observe:v,stopObserving:z});
	Object.extend(document, {fire:F.methodize(),observe:v.methodize(),stopObserving:z.methodize(),loaded:false});
	if (window.Event)Object.extend(window.Event,
	x); else window.Event = x
})();
(function() {
	function b() {
		if (!document.loaded) {
			e && window.clearTimeout(e);
			document.loaded = true;
			document.fire("dom:loaded")
		}
	}

	function c() {
		if (document.readyState === "complete") {
			document.stopObserving("readystatechange", c);
			b()
		}
	}

	function d() {
		try {
			document.documentElement.doScroll("left")
		} catch(f) {
			e = d.defer();
			return
		}
		b()
	}

	var e;
	if (document.addEventListener)document.addEventListener("DOMContentLoaded", b, false); else {
		document.observe("readystatechange", c);
		if (window == top)e = d.defer()
	}
	Event.observe(window, "load",
	b)
})();
Element.addMethods();
Hash.toQueryString = Object.toQueryString;
var Toggle = {display:Element.toggle};
Element.Methods.childOf = Element.Methods.descendantOf;
var Insertion = {Before:function(b, c) {
	return Element.insert(b, {before:c})
},Top:function(b, c) {
	return Element.insert(b, {top:c})
},Bottom:function(b, c) {
	return Element.insert(b, {bottom:c})
},After:function(b, c) {
	return Element.insert(b, {after:c})
}},$continue = new Error('"throw $continue" is deprecated, use "return" instead'),Position = {includeScrollOffsets:false,prepare:function() {
	this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	this.deltaY = window.pageYOffset ||
	document.documentElement.scrollTop || document.body.scrollTop || 0
},within:function(b, c, d) {
	if (this.includeScrollOffsets)return this.withinIncludingScrolloffsets(b, c, d);
	this.xcomp = c;
	this.ycomp = d;
	this.offset = Element.cumulativeOffset(b);
	return d >= this.offset[1] && d < this.offset[1] + b.offsetHeight && c >= this.offset[0] && c < this.offset[0] + b.offsetWidth
},withinIncludingScrolloffsets:function(b, c, d) {
	var e = Element.cumulativeScrollOffset(b);
	this.xcomp = c + e[0] - this.deltaX;
	this.ycomp = d + e[1] - this.deltaY;
	this.offset = Element.cumulativeOffset(b);
	return this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + b.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + b.offsetWidth
},overlap:function(b, c) {
	if (!b)return 0;
	if (b == "vertical")return(this.offset[1] + c.offsetHeight - this.ycomp) / c.offsetHeight;
	if (b == "horizontal")return(this.offset[0] + c.offsetWidth - this.xcomp) / c.offsetWidth
},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(b) {
	Position.prepare();
	return Element.absolutize(b)
},
	relativize:function(b) {
		Position.prepare();
		return Element.relativize(b)
	},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(b, c, d) {
		d = d || {};
		return Element.clonePosition(c, b, d)
	}};
if (!document.getElementsByClassName)document.getElementsByClassName = function(b) {
	function c(d) {
		return d.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + d + " ')]"
	}

	b.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(d, e) {
		e = e.toString().strip();
		return(e = /\s/.test(e) ? $w(e).map(c).join("") : c(e)) ? document._getElementsByXPath(".//*" + e, d) : []
	} : function(d, e) {
		e = e.toString().strip();
		var f = [],g = /\s/.test(e) ? $w(e) : null;
		if (!g && !e)return f;
		d = $(d).getElementsByTagName("*");
		e = " " + e + " ";
		for (var h =
		0,j,m; j = d[h]; h++)if (j.className && (m = " " + j.className + " ") && (m.include(e) || g && g.all(function(q) {
			return!q.toString().blank() && m.include(" " + q + " ")
		})))f.push(Element.extend(j));
		return f
	};
	return function(d, e) {
		return $(e || document.body).getElementsByClassName(d)
	}
}(Element.Methods);
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {initialize:function(b) {
	this.element = $(b)
},_each:function(b) {
	this.element.className.split(/\s+/).select(
						  function(c) {
							  return c.length > 0
						  })._each(b)
},set:function(b) {
	this.element.className = b
},add:function(b) {
	this.include(b) || this.set($A(this).concat(b).join(" "))
},remove:function(b) {
	this.include(b) && this.set($A(this).without(b).join(" "))
},toString:function() {
	return $A(this).join(" ")
}};
Object.extend(Element.ClassNames.prototype, Enumerable);
var Scriptaculous = {Version:"1.8.3",require:function(b) {
	try {
		document.write('<script type="text/javascript" src="' + b + '"><\/script>')
	} catch(c) {
		var d = document.createElement("script");
		d.type = "text/javascript";
		d.src = b;
		document.getElementsByTagName("head")[0].appendChild(d)
	}
},REQUIRED_PROTOTYPE:"1.6.0.3",load:function() {
	function b(d) {
		var e = d.replace(/_.*|\./g, "");
		e = parseInt(e + "0".times(4 - e.length));
		return d.indexOf("_") > -1 ? e - 1 : e
	}

	if (typeof Prototype == "undefined" || typeof Element == "undefined" || typeof Element.Methods ==
	"undefined" || b(Prototype.Version) < b(Scriptaculous.REQUIRED_PROTOTYPE))throw"script.aculo.us requires the Prototype JavaScript framework >= " + Scriptaculous.REQUIRED_PROTOTYPE;
	var c = /scriptaculous\.js(\?.*)?$/;
	$$("head script[src]").findAll(
				      function(d) {
					      return d.src.match(c)
				      }).each(function(d) {
		var e = d.src.replace(c, "");
		d = d.src.match(/\?.*load=([a-z,]*)/);
		(d ? d[1] : "builder,effects,dragdrop,controls,slider,sound").split(",").each(function(f) {
			Scriptaculous.require(e + f + ".js")
		})
	})
}};
Scriptaculous.load();
var Builder = {NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(b, c, d) {
	b = b.toUpperCase();
	var e = document.createElement(this.NODEMAP[b] || "div");
	try {
		e.innerHTML = "<" + b + "></" + b + ">"
	} catch(f) {
	}
	var g = e.firstChild || null;
	if (g && g.tagName.toUpperCase() != b)g = g.getElementsByTagName(b)[0];
	g || (g = document.createElement(b));
	if (g) {
		if (c)if (this._isStringOrNumber(c) ||
		c instanceof Array || c.tagName)this._children(g, c); else {
			var h = this._attributes(c);
			if (h.length) {
				try {
					e.innerHTML = "<" + b + " " + h + "></" + b + ">"
				} catch(j) {
				}
				g = e.firstChild || null;
				if (!g) {
					g = document.createElement(b);
					for (attr in c)g[attr == "class" ? "className" : attr] = c[attr]
				}
				if (g.tagName.toUpperCase() != b)g = e.getElementsByTagName(b)[0]
			}
		}
		d && this._children(g, d);
		return $(g)
	}
},_text:function(b) {
	return document.createTextNode(b)
},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(b) {
	var c = [];
	for (attribute in b)c.push((attribute in
	this.ATTR_MAP ? this.ATTR_MAP[attribute] : attribute) + '="' + b[attribute].toString().escapeHTML().gsub(/"/, "&quot;") + '"');
	return c.join(" ")
},_children:function(b, c) {
	if (c.tagName)b.appendChild(c); else if (typeof c == "object")c.flatten().each(function(d) {
		if (typeof d == "object")b.appendChild(d); else Builder._isStringOrNumber(d) && b.appendChild(Builder._text(d))
	}); else Builder._isStringOrNumber(c) && b.appendChild(Builder._text(c))
},_isStringOrNumber:function(b) {
	return typeof b == "string" || typeof b == "number"
},build:function(b) {
	var c =
	this.node("div");
	$(c).update(b.strip());
	return c.down()
},dump:function(b) {
	if (typeof b != "object" && typeof b != "function")b = window;
	"A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/).each(function(c) {
		b[c] =
		function() {
			return Builder.node.apply(Builder, [c].concat($A(arguments)))
		}
	})
}};
String.prototype.parseColor = function(b) {
	var c = "#";
	if (this.slice(0, 4) == "rgb(") {
		var d = this.slice(4, this.length - 1).split(","),e = 0;
		do c += parseInt(d[e]).toColorPart(); while (++e < 3)
	} else if (this.slice(0, 1) == "#") {
		if (this.length == 4)for (e = 1; e < 4; e++)c += (this.charAt(e) + this.charAt(e)).toLowerCase();
		if (this.length == 7)c = this.toLowerCase()
	}
	return c.length == 7 ? c : b || this
};
Element.collectTextNodes = function(b) {
	return $A($(b).childNodes).collect(
					  function(c) {
						  return c.nodeType == 3 ? c.nodeValue : c.hasChildNodes() ? Element.collectTextNodes(c) : ""
					  }).flatten().join("")
};
Element.collectTextNodesIgnoreClass = function(b, c) {
	return $A($(b).childNodes).collect(
					  function(d) {
						  return d.nodeType == 3 ? d.nodeValue : d.hasChildNodes() && !Element.hasClassName(d, c) ? Element.collectTextNodesIgnoreClass(d, c) : ""
					  }).flatten().join("")
};
Element.setContentZoom = function(b, c) {
	b = $(b);
	b.setStyle({fontSize:c / 100 + "em"});
	Prototype.Browser.WebKit && window.scrollBy(0, 0);
	return b
};
Element.getInlineOpacity = function(b) {
	return $(b).style.opacity || ""
};
Element.forceRerendering = function(b) {
	try {
		b = $(b);
		var c = document.createTextNode(" ");
		b.appendChild(c);
		b.removeChild(c)
	} catch(d) {
	}
};
var Effect = {_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(b) {
	return-Math.cos(b * Math.PI) / 2 + 0.5
},reverse:function(b) {
	return 1 - b
},flicker:function(b) {
	b = -Math.cos(b * Math.PI) / 4 + 0.75 + Math.random() / 4;
	return b > 1 ? 1 : b
},wobble:function(b) {
	return-Math.cos(b * Math.PI * 9 * b) / 2 + 0.5
},pulse:function(b, c) {
	return-Math.cos(b * ((c || 5) - 0.5) * 2 * Math.PI) / 2 + 0.5
},spring:function(b) {
	return 1 -
	Math.cos(b * 4.5 * Math.PI) * Math.exp(-b * 6)
},none:function() {
	return 0
},full:function() {
	return 1
}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(b) {
	var c = "position:relative";
	if (Prototype.Browser.IE)c += ";zoom:1";
	b = $(b);
	$A(b.childNodes).each(function(d) {
		if (d.nodeType == 3) {
			d.nodeValue.toArray().each(function(e) {
				b.insertBefore((new Element("span", {style:c})).update(e == " " ? String.fromCharCode(160) : e), d)
			});
			Element.remove(d)
		}
	})
},multiple:function(b, c, d) {
	b =
	(typeof b == "object" || Object.isFunction(b)) && b.length ? b : $(b).childNodes;
	var e = Object.extend({speed:0.1,delay:0}, d || {}),f = e.delay;
	$A(b).each(function(g, h) {
		new c(g, Object.extend(e, {delay:h * e.speed + f}))
	})
},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(b, c, d) {
	b = $(b);
	c = (c || "appear").toLowerCase();
	return Effect[Effect.PAIRS[c][b.visible() ? 1 : 0]](b, Object.extend({queue:{position:"end",scope:b.id || "global",limit:1}}, d || {}))
}};
Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;
Effect.ScopedQueue = Class.create(Enumerable, {initialize:function() {
	this.effects = [];
	this.interval = null
},_each:function(b) {
	this.effects._each(b)
},add:function(b) {
	var c = (new Date).getTime();
	switch (Object.isString(b.options.queue) ? b.options.queue : b.options.queue.position) {case "front":this.effects.findAll(
																 function(d) {
																	 return d.state == "idle"
																 }).each(function(d) {
		d.startOn += b.finishOn;
		d.finishOn += b.finishOn
	});break;case "with-last":c = this.effects.pluck("startOn").max() || c;break;case "end":c = this.effects.pluck("finishOn").max() ||
	c;break
	}
	b.startOn += c;
	b.finishOn += c;
	if (!b.options.queue.limit || this.effects.length < b.options.queue.limit)this.effects.push(b);
	if (!this.interval)this.interval = setInterval(this.loop.bind(this), 15)
},remove:function(b) {
	this.effects = this.effects.reject(function(c) {
		return c == b
	});
	if (this.effects.length == 0) {
		clearInterval(this.interval);
		this.interval = null
	}
},loop:function() {
	for (var b = (new Date).getTime(),c = 0,d = this.effects.length; c < d; c++)this.effects[c] && this.effects[c].loop(b)
}});
Effect.Queues = {instances:$H(),get:function(b) {
	if (!Object.isString(b))return b;
	return this.instances.get(b) || this.instances.set(b, new Effect.ScopedQueue)
}};
Effect.Queue = Effect.Queues.get("global");
Effect.Base = Class.create({position:null,start:function(b) {
	if (b && b.transition === false)b.transition = Effect.Transitions.linear;
	this.options = Object.extend(Object.extend({}, Effect.DefaultOptions), b || {});
	this.currentFrame = 0;
	this.state = "idle";
	this.startOn = this.options.delay * 1E3;
	this.finishOn = this.startOn + this.options.duration * 1E3;
	this.fromToDelta = this.options.to - this.options.from;
	this.totalTime = this.finishOn - this.startOn;
	this.totalFrames = this.options.fps * this.options.duration;
	this.render = function() {
		function c(d, e) {
			d.options[e + "Internal"] && d.options[e + "Internal"](d);
			d.options[e] && d.options[e](d)
		}

		return function(d) {
			if (this.state === "idle") {
				this.state = "running";
				c(this, "beforeSetup");
				this.setup && this.setup();
				c(this, "afterSetup")
			}
			if (this.state === "running") {
				this.position = d = this.options.transition(d) * this.fromToDelta + this.options.from;
				c(this, "beforeUpdate");
				this.update && this.update(d);
				c(this, "afterUpdate")
			}
		}
	}();
	this.event("beforeStart");
	this.options.sync || Effect.Queues.get(Object.isString(this.options.queue) ? "global" :
	this.options.queue.scope).add(this)
},loop:function(b) {
	if (b >= this.startOn)if (b >= this.finishOn) {
		this.render(1);
		this.cancel();
		this.event("beforeFinish");
		this.finish && this.finish();
		this.event("afterFinish")
	} else {
		b = (b - this.startOn) / this.totalTime;
		var c = (b * this.totalFrames).round();
		if (c > this.currentFrame) {
			this.render(b);
			this.currentFrame = c
		}
	}
},cancel:function() {
	this.options.sync || Effect.Queues.get(Object.isString(this.options.queue) ? "global" : this.options.queue.scope).remove(this);
	this.state = "finished"
},
	event:function(b) {
		this.options[b + "Internal"] && this.options[b + "Internal"](this);
		this.options[b] && this.options[b](this)
	},inspect:function() {
		var b = $H();
		for (property in this)Object.isFunction(this[property]) || b.set(property, this[property]);
		return"#<Effect:" + b.inspect() + ",options:" + $H(this.options).inspect() + ">"
	}});
Effect.Parallel = Class.create(Effect.Base, {initialize:function(b, c) {
	this.effects = b || [];
	this.start(c)
},update:function(b) {
	this.effects.invoke("render", b)
},finish:function(b) {
	this.effects.each(function(c) {
		c.render(1);
		c.cancel();
		c.event("beforeFinish");
		c.finish && c.finish(b);
		c.event("afterFinish")
	})
}});
Effect.Tween = Class.create(Effect.Base, {initialize:function(b, c, d) {
	b = Object.isString(b) ? $(b) : b;
	var e = $A(arguments),f = e.last();
	e = e.length == 5 ? e[3] : null;
	this.method = Object.isFunction(f) ? f.bind(b) : Object.isFunction(b[f]) ? b[f].bind(b) : function(g) {
		b[f] = g
	};
	this.start(Object.extend({from:c,to:d}, e || {}))
},update:function(b) {
	this.method(b)
}});
Effect.Event = Class.create(Effect.Base, {initialize:function(b) {
	this.start(Object.extend({duration:0}, b || {}))
},update:Prototype.emptyFunction});
Effect.Opacity = Class.create(Effect.Base, {initialize:function(b, c) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	Prototype.Browser.IE && !this.element.currentStyle.hasLayout && this.element.setStyle({zoom:1});
	this.start(Object.extend({from:this.element.getOpacity() || 0,to:1}, c || {}))
},update:function(b) {
	this.element.setOpacity(b)
}});
Effect.Move = Class.create(Effect.Base, {initialize:function(b, c) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	this.start(Object.extend({x:0,y:0,mode:"relative"}, c || {}))
},setup:function() {
	this.element.makePositioned();
	this.originalLeft = parseFloat(this.element.getStyle("left") || "0");
	this.originalTop = parseFloat(this.element.getStyle("top") || "0");
	if (this.options.mode == "absolute") {
		this.options.x -= this.originalLeft;
		this.options.y -= this.originalTop
	}
},update:function(b) {
	this.element.setStyle({left:(this.options.x *
	b + this.originalLeft).round() + "px",top:(this.options.y * b + this.originalTop).round() + "px"})
}});
Effect.MoveBy = function(b, c, d, e) {
	return new Effect.Move(b, Object.extend({x:d,y:c}, e || {}))
};
Effect.Scale = Class.create(Effect.Base, {initialize:function(b, c, d) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	this.start(Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:c}, d || {}))
},setup:function() {
	this.restoreAfterFinish = this.options.restoreAfterFinish || false;
	this.elementPositioning = this.element.getStyle("position");
	this.originalStyle = {};
	["top","left","width","height","fontSize"].each(function(c) {
		this.originalStyle[c] =
		this.element.style[c]
	}.bind(this));
	this.originalTop = this.element.offsetTop;
	this.originalLeft = this.element.offsetLeft;
	var b = this.element.getStyle("font-size") || "100%";
	["em","px","%","pt"].each(function(c) {
		if (b.indexOf(c) > 0) {
			this.fontSize = parseFloat(b);
			this.fontSizeType = c
		}
	}.bind(this));
	this.factor = (this.options.scaleTo - this.options.scaleFrom) / 100;
	this.dims = null;
	if (this.options.scaleMode == "box")this.dims = [this.element.offsetHeight,this.element.offsetWidth];
	if (/^content/.test(this.options.scaleMode))this.dims =
	[this.element.scrollHeight,this.element.scrollWidth];
	if (!this.dims)this.dims = [this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]
},update:function(b) {
	b = this.options.scaleFrom / 100 + this.factor * b;
	this.options.scaleContent && this.fontSize && this.element.setStyle({fontSize:this.fontSize * b + this.fontSizeType});
	this.setDimensions(this.dims[0] * b, this.dims[1] * b)
},finish:function() {
	this.restoreAfterFinish && this.element.setStyle(this.originalStyle)
},setDimensions:function(b, c) {
	var d = {};
	if (this.options.scaleX)d.width = c.round() + "px";
	if (this.options.scaleY)d.height = b.round() + "px";
	if (this.options.scaleFromCenter) {
		b = (b - this.dims[0]) / 2;
		c = (c - this.dims[1]) / 2;
		if (this.elementPositioning == "absolute") {
			if (this.options.scaleY)d.top = this.originalTop - b + "px";
			if (this.options.scaleX)d.left = this.originalLeft - c + "px"
		} else {
			if (this.options.scaleY)d.top = -b + "px";
			if (this.options.scaleX)d.left = -c + "px"
		}
	}
	this.element.setStyle(d)
}});
Effect.Highlight = Class.create(Effect.Base, {initialize:function(b, c) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	this.start(Object.extend({startcolor:"#ffff99"}, c || {}))
},setup:function() {
	if (this.element.getStyle("display") == "none")this.cancel(); else {
		this.oldStyle = {};
		if (!this.options.keepBackgroundImage) {
			this.oldStyle.backgroundImage = this.element.getStyle("background-image");
			this.element.setStyle({backgroundImage:"none"})
		}
		if (!this.options.endcolor)this.options.endcolor =
		this.element.getStyle("background-color").parseColor("#ffffff");
		if (!this.options.restorecolor)this.options.restorecolor = this.element.getStyle("background-color");
		this._base = $R(0, 2).map(function(b) {
			return parseInt(this.options.startcolor.slice(b * 2 + 1, b * 2 + 3), 16)
		}.bind(this));
		this._delta = $R(0, 2).map(function(b) {
			return parseInt(this.options.endcolor.slice(b * 2 + 1, b * 2 + 3), 16) - this._base[b]
		}.bind(this))
	}
},update:function(b) {
	this.element.setStyle({backgroundColor:$R(0, 2).inject("#", function(c, d, e) {
		return c +
		(this._base[e] + this._delta[e] * b).round().toColorPart()
	}.bind(this))})
},finish:function() {
	this.element.setStyle(Object.extend(this.oldStyle, {backgroundColor:this.options.restorecolor}))
}});
Effect.ScrollTo = function(b, c) {
	c = c || {};
	var d = document.viewport.getScrollOffsets();
	b = $(b).cumulativeOffset();
	if (c.offset)b[1] += c.offset;
	return new Effect.Tween(null, d.top, b[1], c, function(e) {
		scrollTo(d.left, e.round())
	})
};
Effect.Fade = function(b, c) {
	b = $(b);
	var d = b.getInlineOpacity();
	c = Object.extend({from:b.getOpacity() || 1,to:0,afterFinishInternal:function(e) {
		e.options.to == 0 && e.element.hide().setStyle({opacity:d})
	}}, c || {});
	return new Effect.Opacity(b, c)
};
Effect.Appear = function(b, c) {
	b = $(b);
	c = Object.extend({from:b.getStyle("display") == "none" ? 0 : b.getOpacity() || 0,to:1,afterFinishInternal:function(d) {
		d.element.forceRerendering()
	},beforeSetup:function(d) {
		d.element.setOpacity(d.options.from).show()
	}}, c || {});
	return new Effect.Opacity(b, c)
};
Effect.Puff = function(b, c) {
	b = $(b);
	var d = {opacity:b.getInlineOpacity(),position:b.getStyle("position"),top:b.style.top,left:b.style.left,width:b.style.width,height:b.style.height};
	return new Effect.Parallel([new Effect.Scale(b, 200, {sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(b, {sync:true,to:0})], Object.extend({duration:1,beforeSetupInternal:function(e) {
		Position.absolutize(e.effects[0].element)
	},afterFinishInternal:function(e) {
		e.effects[0].element.hide().setStyle(d)
	}},
	c || {}))
};
Effect.BlindUp = function(b, c) {
	b = $(b);
	b.makeClipping();
	return new Effect.Scale(b, 0, Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(d) {
		d.element.hide().undoClipping()
	}}, c || {}))
};
Effect.BlindDown = function(b, c) {
	b = $(b);
	var d = b.getDimensions();
	return new Effect.Scale(b, 100, Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:d.height,originalWidth:d.width},restoreAfterFinish:true,afterSetup:function(e) {
		e.element.makeClipping().setStyle({height:"0px"}).show()
	},afterFinishInternal:function(e) {
		e.element.undoClipping()
	}}, c || {}))
};
Effect.SwitchOff = function(b, c) {
	b = $(b);
	var d = b.getInlineOpacity();
	return new Effect.Appear(b, Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(e) {
		new Effect.Scale(e.element, 1, {duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(f) {
			f.element.makePositioned().makeClipping()
		},afterFinishInternal:function(f) {
			f.element.hide().undoClipping().undoPositioned().setStyle({opacity:d})
		}})
	}}, c || {}))
};
Effect.DropOut = function(b, c) {
	b = $(b);
	var d = {top:b.getStyle("top"),left:b.getStyle("left"),opacity:b.getInlineOpacity()};
	return new Effect.Parallel([new Effect.Move(b, {x:0,y:100,sync:true}),new Effect.Opacity(b, {sync:true,to:0})], Object.extend({duration:0.5,beforeSetup:function(e) {
		e.effects[0].element.makePositioned()
	},afterFinishInternal:function(e) {
		e.effects[0].element.hide().undoPositioned().setStyle(d)
	}}, c || {}))
};
Effect.Shake = function(b, c) {
	b = $(b);
	c = Object.extend({distance:20,duration:0.5}, c || {});
	var d = parseFloat(c.distance),e = parseFloat(c.duration) / 10,f = {top:b.getStyle("top"),left:b.getStyle("left")};
	return new Effect.Move(b, {x:d,y:0,duration:e,afterFinishInternal:function(g) {
		new Effect.Move(g.element, {x:-d * 2,y:0,duration:e * 2,afterFinishInternal:function(h) {
			new Effect.Move(h.element, {x:d * 2,y:0,duration:e * 2,afterFinishInternal:function(j) {
				new Effect.Move(j.element, {x:-d * 2,y:0,duration:e * 2,afterFinishInternal:function(m) {
					new Effect.Move(m.element,
					{x:d * 2,y:0,duration:e * 2,afterFinishInternal:function(q) {
						new Effect.Move(q.element, {x:-d,y:0,duration:e,afterFinishInternal:function(s) {
							s.element.undoPositioned().setStyle(f)
						}})
					}})
				}})
			}})
		}})
	}})
};
Effect.SlideDown = function(b, c) {
	b = $(b).cleanWhitespace();
	var d = b.down().getStyle("bottom"),e = b.getDimensions();
	return new Effect.Scale(b, 100, Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera ? 0 : 1,scaleMode:{originalHeight:e.height,originalWidth:e.width},restoreAfterFinish:true,afterSetup:function(f) {
		f.element.makePositioned();
		f.element.down().makePositioned();
		window.opera && f.element.setStyle({top:""});
		f.element.makeClipping().setStyle({height:"0px"}).show()
	},afterUpdateInternal:function(f) {
		f.element.down().setStyle({bottom:f.dims[0] -
		f.element.clientHeight + "px"})
	},afterFinishInternal:function(f) {
		f.element.undoClipping().undoPositioned();
		f.element.down().undoPositioned().setStyle({bottom:d})
	}}, c || {}))
};
Effect.SlideUp = function(b, c) {
	b = $(b).cleanWhitespace();
	var d = b.down().getStyle("bottom"),e = b.getDimensions();
	return new Effect.Scale(b, window.opera ? 0 : 1, Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:e.height,originalWidth:e.width},restoreAfterFinish:true,afterSetup:function(f) {
		f.element.makePositioned();
		f.element.down().makePositioned();
		window.opera && f.element.setStyle({top:""});
		f.element.makeClipping().show()
	},afterUpdateInternal:function(f) {
		f.element.down().setStyle({bottom:f.dims[0] -
		f.element.clientHeight + "px"})
	},afterFinishInternal:function(f) {
		f.element.hide().undoClipping().undoPositioned();
		f.element.down().undoPositioned().setStyle({bottom:d})
	}}, c || {}))
};
Effect.Squish = function(b) {
	return new Effect.Scale(b, window.opera ? 1 : 0, {restoreAfterFinish:true,beforeSetup:function(c) {
		c.element.makeClipping()
	},afterFinishInternal:function(c) {
		c.element.hide().undoClipping()
	}})
};
Effect.Grow = function(b, c) {
	b = $(b);
	var d = Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full}, c || {}),e = {top:b.style.top,left:b.style.left,height:b.style.height,width:b.style.width,opacity:b.getInlineOpacity()},f = b.getDimensions(),g,h,j,m;
	switch (d.direction) {case "top-left":g = h = j = m = 0;break;case "top-right":g = f.width;h = m = 0;j = -f.width;break;case "bottom-left":g = j = 0;h = f.height;m = -f.height;break;
		case "bottom-right":g = f.width;h = f.height;j = -f.width;m = -f.height;break;case "center":g = f.width / 2;h = f.height / 2;j = -f.width / 2;m = -f.height / 2;break
	}
	return new Effect.Move(b, {x:g,y:h,duration:0.01,beforeSetup:function(q) {
		q.element.hide().makeClipping().makePositioned()
	},afterFinishInternal:function(q) {
		new Effect.Parallel([new Effect.Opacity(q.element, {sync:true,to:1,from:0,transition:d.opacityTransition}),new Effect.Move(q.element, {x:j,y:m,sync:true,transition:d.moveTransition}),new Effect.Scale(q.element,
		100, {scaleMode:{originalHeight:f.height,originalWidth:f.width},sync:true,scaleFrom:window.opera ? 1 : 0,transition:d.scaleTransition,restoreAfterFinish:true})], Object.extend({beforeSetup:function(s) {
			s.effects[0].element.setStyle({height:"0px"}).show()
		},afterFinishInternal:function(s) {
			s.effects[0].element.undoClipping().undoPositioned().setStyle(e)
		}}, d))
	}})
};
Effect.Shrink = function(b, c) {
	b = $(b);
	c = Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none}, c || {});
	var d = {top:b.style.top,left:b.style.left,height:b.style.height,width:b.style.width,opacity:b.getInlineOpacity()},e = b.getDimensions(),f,g;
	switch (c.direction) {case "top-left":f = g = 0;break;case "top-right":f = e.width;g = 0;break;case "bottom-left":f = 0;g = e.height;break;case "bottom-right":f = e.width;g =
	e.height;break;case "center":f = e.width / 2;g = e.height / 2;break
	}
	return new Effect.Parallel([new Effect.Opacity(b, {sync:true,to:0,from:1,transition:c.opacityTransition}),new Effect.Scale(b, window.opera ? 1 : 0, {sync:true,transition:c.scaleTransition,restoreAfterFinish:true}),new Effect.Move(b, {x:f,y:g,sync:true,transition:c.moveTransition})], Object.extend({beforeStartInternal:function(h) {
		h.effects[0].element.makePositioned().makeClipping()
	},afterFinishInternal:function(h) {
		h.effects[0].element.hide().undoClipping().undoPositioned().setStyle(d)
	}},
	c))
};
Effect.Pulsate = function(b, c) {
	b = $(b);
	var d = c || {},e = b.getInlineOpacity(),f = d.transition || Effect.Transitions.linear;
	return new Effect.Opacity(b, Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(g) {
		g.element.setStyle({opacity:e})
	}}, d), {transition:function(g) {
		return 1 - f(-Math.cos(g * (d.pulses || 5) * 2 * Math.PI) / 2 + 0.5)
	}}))
};
Effect.Fold = function(b, c) {
	b = $(b);
	var d = {top:b.style.top,left:b.style.left,width:b.style.width,height:b.style.height};
	b.makeClipping();
	return new Effect.Scale(b, 5, Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function() {
		new Effect.Scale(b, 1, {scaleContent:false,scaleY:false,afterFinishInternal:function(e) {
			e.element.hide().undoClipping().setStyle(d)
		}})
	}}, c || {}))
};
Effect.Morph = Class.create(Effect.Base, {initialize:function(b, c) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	b = Object.extend({style:{}}, c || {});
	if (Object.isString(b.style))if (b.style.include(":"))this.style = b.style.parseStyle(); else {
		this.element.addClassName(b.style);
		this.style = $H(this.element.getStyles());
		this.element.removeClassName(b.style);
		var d = this.element.getStyles();
		this.style = this.style.reject(function(e) {
			return e.value == d[e.key]
		});
		b.afterFinishInternal = function(e) {
			e.element.addClassName(e.options.style);
			e.transforms.each(function(f) {
				e.element.style[f.style] = ""
			})
		}
	} else this.style = $H(b.style);
	this.start(b)
},setup:function() {
	function b(c) {
		if (!c || ["rgba(0, 0, 0, 0)","transparent"].include(c))c = "#ffffff";
		c = c.parseColor();
		return $R(0, 2).map(function(d) {
			return parseInt(c.slice(d * 2 + 1, d * 2 + 3), 16)
		})
	}

	this.transforms = this.style.map(function(c) {
		var d = c[0];
		c = c[1];
		var e = null;
		if (c.parseColor("#zzzzzz") != "#zzzzzz") {
			c = c.parseColor();
			e = "color"
		} else if (d == "opacity") {
			c = parseFloat(c);
			Prototype.Browser.IE && !this.element.currentStyle.hasLayout &&
			this.element.setStyle({zoom:1})
		} else if (Element.CSS_LENGTH.test(c)) {
			e = c.match(/^([\+\-]?[0-9\.]+)(.*)$/);
			c = parseFloat(e[1]);
			e = e.length == 3 ? e[2] : null
		}
		var f = this.element.getStyle(d);
		return{style:d.camelize(),originalValue:e == "color" ? b(f) : parseFloat(f || 0),targetValue:e == "color" ? b(c) : c,unit:e}
	}.bind(this)).reject(function(c) {
		return c.originalValue == c.targetValue || c.unit != "color" && (isNaN(c.originalValue) || isNaN(c.targetValue))
	})
},update:function(b) {
	for (var c = {},d,e = this.transforms.length; e--;)c[(d = this.transforms[e]).style] =
	d.unit == "color" ? "#" + Math.round(d.originalValue[0] + (d.targetValue[0] - d.originalValue[0]) * b).toColorPart() + Math.round(d.originalValue[1] + (d.targetValue[1] - d.originalValue[1]) * b).toColorPart() + Math.round(d.originalValue[2] + (d.targetValue[2] - d.originalValue[2]) * b).toColorPart() : (d.originalValue + (d.targetValue - d.originalValue) * b).toFixed(3) + (d.unit === null ? "" : d.unit);
	this.element.setStyle(c, true)
}});
Effect.Transform = Class.create({initialize:function(b, c) {
	this.tracks = [];
	this.options = c || {};
	this.addTracks(b)
},addTracks:function(b) {
	b.each(function(c) {
		c = $H(c);
		var d = c.values().first();
		this.tracks.push($H({ids:c.keys().first(),effect:Effect.Morph,options:{style:d}}))
	}.bind(this));
	return this
},play:function() {
	return new Effect.Parallel(this.tracks.map(
						  function(b) {
							  var c = b.get("ids"),d = b.get("effect"),e = b.get("options");
							  return[$(c) || $$(c)].flatten().map(function(f) {
								  return new d(f, Object.extend({sync:true},
								  e))
							  })
						  }).flatten(), this.options)
}});
Element.CSS_PROPERTIES = $w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.__parseStyleElement = document.createElement("div");
String.prototype.parseStyle = function() {
	var b,c = $H();
	if (Prototype.Browser.WebKit)b = (new Element("div", {style:this})).style; else {
		String.__parseStyleElement.innerHTML = '<div style="' + this + '"></div>';
		b = String.__parseStyleElement.childNodes[0].style
	}
	Element.CSS_PROPERTIES.each(function(d) {
		b[d] && c.set(d, b[d])
	});
	Prototype.Browser.IE && this.include("opacity") && c.set("opacity", this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);
	return c
};
Element.getStyles = document.defaultView && document.defaultView.getComputedStyle ? function(b) {
	var c = document.defaultView.getComputedStyle($(b), null);
	return Element.CSS_PROPERTIES.inject({}, function(d, e) {
		d[e] = c[e];
		return d
	})
} : function(b) {
	b = $(b);
	var c = b.currentStyle,d;
	d = Element.CSS_PROPERTIES.inject({}, function(e, f) {
		e[f] = c[f];
		return e
	});
	if (!d.opacity)d.opacity = b.getOpacity();
	return d
};
Effect.Methods = {morph:function(b, c, d) {
	b = $(b);
	new Effect.Morph(b, Object.extend({style:c}, d || {}));
	return b
},visualEffect:function(b, c, d) {
	b = $(b);
	c = c.dasherize().camelize();
	c = c.charAt(0).toUpperCase() + c.substring(1);
	new Effect[c](b, d);
	return b
},highlight:function(b, c) {
	b = $(b);
	new Effect.Highlight(b, c);
	return b
}};
$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(b) {
	Effect.Methods[b] = function(c, d) {
		c = $(c);
		Effect[b.charAt(0).toUpperCase() + b.substring(1)](c, d);
		return c
	}
});
$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(b) {
	Effect.Methods[b] = Element[b]
});
Element.addMethods(Effect.Methods);
if (Object.isUndefined(Effect))throw"dragdrop.js requires including script.aculo.us' effects.js library";
var Droppables = {drops:[],remove:function(b) {
	this.drops = this.drops.reject(function(c) {
		return c.element == $(b)
	})
},add:function(b, c) {
	b = $(b);
	var d = Object.extend({greedy:true,hoverclass:null,tree:false}, c || {});
	if (d.containment) {
		d._containers = [];
		c = d.containment;
		Object.isArray(c) ? c.each(function(e) {
			d._containers.push($(e))
		}) : d._containers.push($(c))
	}
	if (d.accept)d.accept = [d.accept].flatten();
	Element.makePositioned(b);
	d.element = b;
	this.drops.push(d)
},findDeepestChild:function(b) {
	deepest = b[0];
	for (i = 1; i < b.length; ++i)if (Element.isParent(b[i].element,
	deepest.element))deepest = b[i];
	return deepest
},isContained:function(b, c) {
	var d;
	d = c.tree ? b.treeNode : b.parentNode;
	return c._containers.detect(function(e) {
		return d == e
	})
},isAffected:function(b, c, d) {
	return d.element != c && (!d._containers || this.isContained(c, d)) && (!d.accept || Element.classNames(c).detect(function(e) {
		return d.accept.include(e)
	})) && Position.within(d.element, b[0], b[1])
},deactivate:function(b) {
	b.hoverclass && Element.removeClassName(b.element, b.hoverclass);
	this.last_active = null
},activate:function(b) {
	b.hoverclass &&
	Element.addClassName(b.element, b.hoverclass);
	this.last_active = b
},show:function(b, c) {
	if (this.drops.length) {
		var d,e = [];
		this.drops.each(function(f) {
			Droppables.isAffected(b, c, f) && e.push(f)
		});
		if (e.length > 0)d = Droppables.findDeepestChild(e);
		this.last_active && this.last_active != d && this.deactivate(this.last_active);
		if (d) {
			Position.within(d.element, b[0], b[1]);
			d.onHover && d.onHover(c, d.element, Position.overlap(d.overlap, d.element));
			d != this.last_active && Droppables.activate(d)
		}
	}
},fire:function(b, c) {
	if (this.last_active) {
		Position.prepare();
		if (this.isAffected([Event.pointerX(b),Event.pointerY(b)], c, this.last_active))if (this.last_active.onDrop) {
			this.last_active.onDrop(c, this.last_active.element, b);
			return true
		}
	}
},reset:function() {
	this.last_active && this.deactivate(this.last_active)
}},Draggables = {drags:[],observers:[],register:function(b) {
	if (this.drags.length == 0) {
		this.eventMouseUp = this.endDrag.bindAsEventListener(this);
		this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
		this.eventKeypress = this.keyPress.bindAsEventListener(this);
		Event.observe(document, "mouseup", this.eventMouseUp);
		Event.observe(document, "mousemove", this.eventMouseMove);
		Event.observe(document, "keypress", this.eventKeypress)
	}
	this.drags.push(b)
},unregister:function(b) {
	this.drags = this.drags.reject(function(c) {
		return c == b
	});
	if (this.drags.length == 0) {
		Event.stopObserving(document, "mouseup", this.eventMouseUp);
		Event.stopObserving(document, "mousemove", this.eventMouseMove);
		Event.stopObserving(document, "keypress", this.eventKeypress)
	}
},activate:function(b) {
	if (b.options.delay)this._timeout =
	setTimeout(function() {
		Draggables._timeout = null;
		window.focus();
		Draggables.activeDraggable = b
	}.bind(this), b.options.delay); else {
		window.focus();
		this.activeDraggable = b
	}
},deactivate:function() {
	this.activeDraggable = null
},updateDrag:function(b) {
	if (this.activeDraggable) {
		var c = [Event.pointerX(b),Event.pointerY(b)];
		if (!(this._lastPointer && this._lastPointer.inspect() == c.inspect())) {
			this._lastPointer = c;
			this.activeDraggable.updateDrag(b, c)
		}
	}
},endDrag:function(b) {
	if (this._timeout) {
		clearTimeout(this._timeout);
		this._timeout =
		null
	}
	if (this.activeDraggable) {
		this._lastPointer = null;
		this.activeDraggable.endDrag(b);
		this.activeDraggable = null
	}
},keyPress:function(b) {
	this.activeDraggable && this.activeDraggable.keyPress(b)
},addObserver:function(b) {
	this.observers.push(b);
	this._cacheObserverCallbacks()
},removeObserver:function(b) {
	this.observers = this.observers.reject(function(c) {
		return c.element == b
	});
	this._cacheObserverCallbacks()
},notify:function(b, c, d) {
	this[b + "Count"] > 0 && this.observers.each(function(e) {
		e[b] && e[b](b, c, d)
	});
	c.options[b] &&
	c.options[b](c, d)
},_cacheObserverCallbacks:function() {
	["onStart","onEnd","onDrag"].each(function(b) {
		Draggables[b + "Count"] = Draggables.observers.select(
								     function(c) {
									     return c[b]
								     }).length
	})
}},Draggable = Class.create({initialize:function(b, c) {
	var d = {handle:false,reverteffect:function(e, f, g) {
		var h = Math.sqrt(Math.abs(f ^ 2) + Math.abs(g ^ 2)) * 0.02;
		new Effect.Move(e, {x:-g,y:-f,duration:h,queue:{scope:"_draggable",position:"end"}})
	},endeffect:function(e) {
		var f = Object.isNumber(e._opacity) ? e._opacity : 1;
		new Effect.Opacity(e,
		{duration:0.2,from:0.7,to:f,queue:{scope:"_draggable",position:"end"},afterFinish:function() {
			Draggable._dragging[e] = false
		}})
	},zindex:1E3,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};
	if (!c || Object.isUndefined(c.endeffect))Object.extend(d, {starteffect:function(e) {
		e._opacity = Element.getOpacity(e);
		Draggable._dragging[e] = true;
		new Effect.Opacity(e, {duration:0.2,from:e._opacity,to:0.7})
	}});
	c = Object.extend(d, c || {});
	this.element = $(b);
	if (c.handle && Object.isString(c.handle))this.handle =
	this.element.down("." + c.handle, 0);
	if (!this.handle)this.handle = $(c.handle);
	if (!this.handle)this.handle = this.element;
	if (c.scroll && !c.scroll.scrollTo && !c.scroll.outerHTML) {
		c.scroll = $(c.scroll);
		this._isScrollChild = Element.childOf(this.element, c.scroll)
	}
	Element.makePositioned(this.element);
	this.options = c;
	this.dragging = false;
	this.eventMouseDown = this.initDrag.bindAsEventListener(this);
	Event.observe(this.handle, "mousedown", this.eventMouseDown);
	Draggables.register(this)
},destroy:function() {
	Event.stopObserving(this.handle,
	"mousedown", this.eventMouseDown);
	Draggables.unregister(this)
},currentDelta:function() {
	return[parseInt(Element.getStyle(this.element, "left") || "0"),parseInt(Element.getStyle(this.element, "top") || "0")]
},initDrag:function(b) {
	if (!(!Object.isUndefined(Draggable._dragging[this.element]) && Draggable._dragging[this.element]))if (Event.isLeftClick(b))if (!((tag_name = Event.element(b).tagName.toUpperCase()) && (tag_name == "INPUT" || tag_name == "SELECT" || tag_name == "OPTION" || tag_name == "BUTTON" || tag_name == "TEXTAREA"))) {
		var c =
		[Event.pointerX(b),Event.pointerY(b)],d = this.element.cumulativeOffset();
		this.offset = [0,1].map(function(e) {
			return c[e] - d[e]
		});
		Draggables.activate(this);
		Event.stop(b)
	}
},startDrag:function(b) {
	this.dragging = true;
	if (!this.delta)this.delta = this.currentDelta();
	if (this.options.zindex) {
		this.originalZ = parseInt(Element.getStyle(this.element, "z-index") || 0);
		this.element.style.zIndex = this.options.zindex
	}
	if (this.options.ghosting) {
		this._clone = this.element.cloneNode(true);
		(this._originallyAbsolute = this.element.getStyle("position") ==
		"absolute") || Position.absolutize(this.element);
		this.element.parentNode.insertBefore(this._clone, this.element)
	}
	if (this.options.scroll)if (this.options.scroll == window) {
		var c = this._getWindowScroll(this.options.scroll);
		this.originalScrollLeft = c.left;
		this.originalScrollTop = c.top
	} else {
		this.originalScrollLeft = this.options.scroll.scrollLeft;
		this.originalScrollTop = this.options.scroll.scrollTop
	}
	Draggables.notify("onStart", this, b);
	this.options.starteffect && this.options.starteffect(this.element)
},updateDrag:function(b, c) {
	this.dragging || this.startDrag(b);
	if (!this.options.quiet) {
		Position.prepare();
		Droppables.show(c, this.element)
	}
	Draggables.notify("onDrag", this, b);
	this.draw(c);
	this.options.change && this.options.change(this);
	if (this.options.scroll) {
		this.stopScrolling();
		var d;
		if (this.options.scroll == window)with (this._getWindowScroll(this.options.scroll))d = [left,top,left + width,top + height]; else {
			d = Position.page(this.options.scroll);
			d[0] += this.options.scroll.scrollLeft + Position.deltaX;
			d[1] += this.options.scroll.scrollTop +
			Position.deltaY;
			d.push(d[0] + this.options.scroll.offsetWidth);
			d.push(d[1] + this.options.scroll.offsetHeight)
		}
		var e = [0,0];
		if (c[0] < d[0] + this.options.scrollSensitivity)e[0] = c[0] - (d[0] + this.options.scrollSensitivity);
		if (c[1] < d[1] + this.options.scrollSensitivity)e[1] = c[1] - (d[1] + this.options.scrollSensitivity);
		if (c[0] > d[2] - this.options.scrollSensitivity)e[0] = c[0] - (d[2] - this.options.scrollSensitivity);
		if (c[1] > d[3] - this.options.scrollSensitivity)e[1] = c[1] - (d[3] - this.options.scrollSensitivity);
		this.startScrolling(e)
	}
	Prototype.Browser.WebKit &&
	window.scrollBy(0, 0);
	Event.stop(b)
},finishDrag:function(b, c) {
	this.dragging = false;
	if (this.options.quiet) {
		Position.prepare();
		var d = [Event.pointerX(b),Event.pointerY(b)];
		Droppables.show(d, this.element)
	}
	if (this.options.ghosting) {
		this._originallyAbsolute || Position.relativize(this.element);
		delete this._originallyAbsolute;
		Element.remove(this._clone);
		this._clone = null
	}
	d = false;
	if (c)(d = Droppables.fire(b, this.element)) || (d = false);
	d && this.options.onDropped && this.options.onDropped(this.element);
	Draggables.notify("onEnd",
	this, b);
	if ((b = this.options.revert) && Object.isFunction(b))b = b(this.element);
	c = this.currentDelta();
	if (b && this.options.reverteffect) {
		if (d == 0 || b != "failure")this.options.reverteffect(this.element, c[1] - this.delta[1], c[0] - this.delta[0])
	} else this.delta = c;
	if (this.options.zindex)this.element.style.zIndex = this.originalZ;
	this.options.endeffect && this.options.endeffect(this.element);
	Draggables.deactivate(this);
	Droppables.reset()
},keyPress:function(b) {
	if (b.keyCode == Event.KEY_ESC) {
		this.finishDrag(b, false);
		Event.stop(b)
	}
},
	endDrag:function(b) {
		if (this.dragging) {
			this.stopScrolling();
			this.finishDrag(b, true);
			Event.stop(b)
		}
	},draw:function(b) {
		var c = this.element.cumulativeOffset();
		if (this.options.ghosting) {
			var d = Position.realOffset(this.element);
			c[0] += d[0] - Position.deltaX;
			c[1] += d[1] - Position.deltaY
		}
		d = this.currentDelta();
		c[0] -= d[0];
		c[1] -= d[1];
		if (this.options.scroll && this.options.scroll != window && this._isScrollChild) {
			c[0] -= this.options.scroll.scrollLeft - this.originalScrollLeft;
			c[1] -= this.options.scroll.scrollTop - this.originalScrollTop
		}
		d =
		[0,1].map(function(f) {
			return b[f] - c[f] - this.offset[f]
		}.bind(this));
		if (this.options.snap)d = Object.isFunction(this.options.snap) ? this.options.snap(d[0], d[1], this) : Object.isArray(this.options.snap) ? d.map(function(f, g) {
			return(f / this.options.snap[g]).round() * this.options.snap[g]
		}.bind(this)) : d.map(function(f) {
			return(f / this.options.snap).round() * this.options.snap
		}.bind(this));
		var e = this.element.style;
		if (!this.options.constraint || this.options.constraint == "horizontal")e.left = d[0] + "px";
		if (!this.options.constraint ||
		this.options.constraint == "vertical")e.top = d[1] + "px";
		if (e.visibility == "hidden")e.visibility = ""
	},stopScrolling:function() {
		if (this.scrollInterval) {
			clearInterval(this.scrollInterval);
			this.scrollInterval = null;
			Draggables._lastScrollPointer = null
		}
	},startScrolling:function(b) {
		if (b[0] || b[1]) {
			this.scrollSpeed = [b[0] * this.options.scrollSpeed,b[1] * this.options.scrollSpeed];
			this.lastScrolled = new Date;
			this.scrollInterval = setInterval(this.scroll.bind(this), 10)
		}
	},scroll:function() {
		var b = new Date,c = b - this.lastScrolled;
		this.lastScrolled = b;
		if (this.options.scroll == window)with (this._getWindowScroll(this.options.scroll)) {
			if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
				b = c / 1E3;
				this.options.scroll.scrollTo(left + b * this.scrollSpeed[0], top + b * this.scrollSpeed[1])
			}
		} else {
			this.options.scroll.scrollLeft += this.scrollSpeed[0] * c / 1E3;
			this.options.scroll.scrollTop += this.scrollSpeed[1] * c / 1E3
		}
		Position.prepare();
		Droppables.show(Draggables._lastPointer, this.element);
		Draggables.notify("onDrag", this);
		if (this._isScrollChild) {
			Draggables._lastScrollPointer =
			Draggables._lastScrollPointer || $A(Draggables._lastPointer);
			Draggables._lastScrollPointer[0] += this.scrollSpeed[0] * c / 1E3;
			Draggables._lastScrollPointer[1] += this.scrollSpeed[1] * c / 1E3;
			if (Draggables._lastScrollPointer[0] < 0)Draggables._lastScrollPointer[0] = 0;
			if (Draggables._lastScrollPointer[1] < 0)Draggables._lastScrollPointer[1] = 0;
			this.draw(Draggables._lastScrollPointer)
		}
		this.options.change && this.options.change(this)
	},_getWindowScroll:function(b) {
		var c,d,e;
		with (b.document) {
			if (b.document.documentElement &&
			documentElement.scrollTop) {
				c = documentElement.scrollTop;
				d = documentElement.scrollLeft
			} else if (b.document.body) {
				c = body.scrollTop;
				d = body.scrollLeft
			}
			if (b.innerWidth) {
				e = b.innerWidth;
				b = b.innerHeight
			} else if (b.document.documentElement && documentElement.clientWidth) {
				e = documentElement.clientWidth;
				b = documentElement.clientHeight
			} else {
				e = body.offsetWidth;
				b = body.offsetHeight
			}
		}
		return{top:c,left:d,width:e,height:b}
	}});
Draggable._dragging = {};
var SortableObserver = Class.create({initialize:function(b, c) {
	this.element = $(b);
	this.observer = c;
	this.lastValue = Sortable.serialize(this.element)
},onStart:function() {
	this.lastValue = Sortable.serialize(this.element)
},onEnd:function() {
	Sortable.unmark();
	this.lastValue != Sortable.serialize(this.element) && this.observer(this.element)
}}),Sortable = {SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(b) {
	for (; b.tagName.toUpperCase() != "BODY";) {
		if (b.id && Sortable.sortables[b.id])return b;
		b = b.parentNode
	}
},options:function(b) {
	if (b = Sortable._findRootElement($(b)))return Sortable.sortables[b.id]
},destroy:function(b) {
	b = $(b);
	if (b = Sortable.sortables[b.id]) {
		Draggables.removeObserver(b.element);
		b.droppables.each(function(c) {
			Droppables.remove(c)
		});
		b.draggables.invoke("destroy");
		delete Sortable.sortables[b.element.id]
	}
},create:function(b, c) {
	b = $(b);
	var d = Object.extend({element:b,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:b,handle:false,
		only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction}, c || {});
	this.destroy(b);
	var e = {revert:true,quiet:d.quiet,scroll:d.scroll,scrollSpeed:d.scrollSpeed,scrollSensitivity:d.scrollSensitivity,delay:d.delay,ghosting:d.ghosting,constraint:d.constraint,handle:d.handle};
	if (d.starteffect)e.starteffect = d.starteffect;
	if (d.reverteffect)e.reverteffect =
	d.reverteffect; else if (d.ghosting)e.reverteffect = function(h) {
		h.style.top = 0;
		h.style.left = 0
	};
	if (d.endeffect)e.endeffect = d.endeffect;
	if (d.zindex)e.zindex = d.zindex;
	var f = {overlap:d.overlap,containment:d.containment,tree:d.tree,hoverclass:d.hoverclass,onHover:Sortable.onHover},g = {onHover:Sortable.onEmptyHover,overlap:d.overlap,containment:d.containment,hoverclass:d.hoverclass};
	Element.cleanWhitespace(b);
	d.draggables = [];
	d.droppables = [];
	if (d.dropOnEmpty || d.tree) {
		Droppables.add(b, g);
		d.droppables.push(b)
	}
	(d.elements ||
	this.findElements(b, d) || []).each(function(h, j) {
		j = d.handles ? $(d.handles[j]) : d.handle ? $(h).select("." + d.handle)[0] : h;
		d.draggables.push(new Draggable(h, Object.extend(e, {handle:j})));
		Droppables.add(h, f);
		if (d.tree)h.treeNode = b;
		d.droppables.push(h)
	});
	if (d.tree)(Sortable.findTreeElements(b, d) || []).each(function(h) {
		Droppables.add(h, g);
		h.treeNode = b;
		d.droppables.push(h)
	});
	this.sortables[b.identify()] = d;
	Draggables.addObserver(new SortableObserver(b, d.onUpdate))
},findElements:function(b, c) {
	return Element.findChildren(b,
	c.only, c.tree ? true : false, c.tag)
},findTreeElements:function(b, c) {
	return Element.findChildren(b, c.only, c.tree ? true : false, c.treeTag)
},onHover:function(b, c, d) {
	if (!Element.isParent(c, b))if (!(d > 0.33 && d < 0.66 && Sortable.options(c).tree))if (d > 0.5) {
		Sortable.mark(c, "before");
		if (c.previousSibling != b) {
			d = b.parentNode;
			b.style.visibility = "hidden";
			c.parentNode.insertBefore(b, c);
			c.parentNode != d && Sortable.options(d).onChange(b);
			Sortable.options(c.parentNode).onChange(b)
		}
	} else {
		Sortable.mark(c, "after");
		var e = c.nextSibling ||
		null;
		if (e != b) {
			d = b.parentNode;
			b.style.visibility = "hidden";
			c.parentNode.insertBefore(b, e);
			c.parentNode != d && Sortable.options(d).onChange(b);
			Sortable.options(c.parentNode).onChange(b)
		}
	}
},onEmptyHover:function(b, c, d) {
	var e = b.parentNode,f = Sortable.options(c);
	if (!Element.isParent(c, b)) {
		var g = Sortable.findElements(c, {tag:f.tag,only:f.only}),h = null;
		if (g) {
			var j = Element.offsetSize(c, f.overlap) * (1 - d);
			for (d = 0; d < g.length; d += 1)if (j - Element.offsetSize(g[d], f.overlap) >= 0)j -= Element.offsetSize(g[d], f.overlap); else {
				h =
				j - Element.offsetSize(g[d], f.overlap) / 2 >= 0 ? d + 1 < g.length ? g[d + 1] : null : g[d];
				break
			}
		}
		c.insertBefore(b, h);
		Sortable.options(e).onChange(b);
		f.onChange(b)
	}
},unmark:function() {
	Sortable._marker && Sortable._marker.hide()
},mark:function(b, c) {
	var d = Sortable.options(b.parentNode);
	if (!(d && !d.ghosting)) {
		if (!Sortable._marker) {
			Sortable._marker = ($("dropmarker") || Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});
			document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)
		}
		var e =
		b.cumulativeOffset();
		Sortable._marker.setStyle({left:e[0] + "px",top:e[1] + "px"});
		if (c == "after")d.overlap == "horizontal" ? Sortable._marker.setStyle({left:e[0] + b.clientWidth + "px"}) : Sortable._marker.setStyle({top:e[1] + b.clientHeight + "px"});
		Sortable._marker.show()
	}
},_tree:function(b, c, d) {
	for (var e = Sortable.findElements(b, c) || [],f = 0; f < e.length; ++f) {
		var g = e[f].id.match(c.format);
		if (g) {
			g = {id:encodeURIComponent(g ? g[1] : null),element:b,parent:d,children:[],position:d.children.length,container:$(e[f]).down(c.treeTag)};
			g.container && this._tree(g.container, c, g);
			d.children.push(g)
		}
	}
	return d
},tree:function(b, c) {
	b = $(b);
	var d = this.options(b);
	c = Object.extend({tag:d.tag,treeTag:d.treeTag,only:d.only,name:b.id,format:d.format}, c || {});
	return Sortable._tree(b, c, {id:null,parent:null,children:[],container:b,position:0})
},_constructIndex:function(b) {
	var c = "";
	do if (b.id)c = "[" + b.position + "]" + c; while ((b = b.parent) != null);
	return c
},sequence:function(b, c) {
	b = $(b);
	var d = Object.extend(this.options(b), c || {});
	return $(this.findElements(b,
	d) || []).map(function(e) {
		return e.id.match(d.format) ? e.id.match(d.format)[1] : ""
	})
},setSequence:function(b, c, d) {
	b = $(b);
	var e = Object.extend(this.options(b), d || {}),f = {};
	this.findElements(b, e).each(function(g) {
		if (g.id.match(e.format))f[g.id.match(e.format)[1]] = [g,g.parentNode];
		g.parentNode.removeChild(g)
	});
	c.each(function(g) {
		var h = f[g];
		if (h) {
			h[1].appendChild(h[0]);
			delete f[g]
		}
	})
},serialize:function(b, c) {
	b = $(b);
	var d = Object.extend(Sortable.options(b), c || {}),e = encodeURIComponent(c && c.name ? c.name : b.id);
	return d.tree ?
	Sortable.tree(b, c).children.map(
					function(f) {
						return[e + Sortable._constructIndex(f) + "[id]=" + encodeURIComponent(f.id)].concat(f.children.map(arguments.callee))
					}).flatten().join("&") : Sortable.sequence(b, c).map(
											    function(f) {
												    return e + "[]=" + encodeURIComponent(f)
											    }).join("&")
}};
Element.isParent = function(b, c) {
	if (!b.parentNode || b == c)return false;
	if (b.parentNode == c)return true;
	return Element.isParent(b.parentNode, c)
};
Element.findChildren = function(b, c, d, e) {
	if (!b.hasChildNodes())return null;
	e = e.toUpperCase();
	if (c)c = [c].flatten();
	var f = [];
	$A(b.childNodes).each(function(g) {
		if (g.tagName && g.tagName.toUpperCase() == e && (!c || Element.classNames(g).detect(function(h) {
			return c.include(h)
		})))f.push(g);
		if (d)(g = Element.findChildren(g, c, d, e)) && f.push(g)
	});
	return f.length > 0 ? f.flatten() : []
};
Element.offsetSize = function(b, c) {
	return b["offset" + (c == "vertical" || c == "height" ? "Height" : "Width")]
};
if (typeof Effect == "undefined")throw"controls.js requires including script.aculo.us' effects.js library";
var Autocompleter = {};
Autocompleter.Base = Class.create({baseInitialize:function(b, c, d) {
	this.element = b = $(b);
	this.update = $(c);
	this.active = this.changed = this.hasFocus = false;
	this.index = -1;
	this.entryCount = 0;
	this.oldElementValue = this.element.value;
	if (this.setOptions)this.setOptions(d); else this.options = d || {};
	this.options.paramName = this.options.paramName || this.element.name;
	this.options.tokens = this.options.tokens || [];
	this.options.frequency = this.options.frequency || 0.4;
	this.options.minChars = this.options.minChars || 1;
	this.options.onShow =
	this.options.onShow || function(e, f) {
		if (!f.style.position || f.style.position == "absolute") {
			f.style.position = "absolute";
			Position.clone(e, f, {setHeight:false,offsetTop:e.offsetHeight})
		}
		Effect.Appear(f, {duration:0.15})
	};
	this.options.onHide = this.options.onHide || function(e, f) {
		new Effect.Fade(f, {duration:0.15})
	};
	if (typeof this.options.tokens == "string")this.options.tokens = new Array(this.options.tokens);
	this.options.tokens.include("\n") || this.options.tokens.push("\n");
	this.observer = null;
	this.element.setAttribute("autocomplete",
	"off");
	Element.hide(this.update);
	Event.observe(this.element, "blur", this.onBlur.bindAsEventListener(this));
	Event.observe(this.element, "keydown", this.onKeyPress.bindAsEventListener(this))
},show:function() {
	Element.getStyle(this.update, "display") == "none" && this.options.onShow(this.element, this.update);
	if (!this.iefix && Prototype.Browser.IE && Element.getStyle(this.update, "position") == "absolute") {
		new Insertion.After(this.update, '<iframe id="' + this.update.id + '_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
		this.iefix = $(this.update.id + "_iefix")
	}
	this.iefix && setTimeout(this.fixIEOverlapping.bind(this), 50)
},fixIEOverlapping:function() {
	Position.clone(this.update, this.iefix, {setTop:!this.update.style.height});
	this.iefix.style.zIndex = 1;
	this.update.style.zIndex = 2;
	Element.show(this.iefix)
},hide:function() {
	this.stopIndicator();
	Element.getStyle(this.update, "display") != "none" && this.options.onHide(this.element, this.update);
	this.iefix && Element.hide(this.iefix)
},startIndicator:function() {
	this.options.indicator && Element.show(this.options.indicator)
},
	stopIndicator:function() {
		this.options.indicator && Element.hide(this.options.indicator)
	},onKeyPress:function(b) {
		if (this.active)switch (b.keyCode) {case Event.KEY_TAB:case Event.KEY_RETURN:if (this.index < 0) {
			this.hide();
			this.active = false;
			return
		}this.selectEntry(b.keyCode == Event.KEY_RETURN);Event.stop(b);case Event.KEY_ESC:this.hide();this.active = false;Event.stop(b);return;case Event.KEY_LEFT:case Event.KEY_RIGHT:return;case Event.KEY_UP:this.markPrevious();this.render();Event.stop(b);return;case Event.KEY_DOWN:this.markNext();
			this.render();Event.stop(b);return
		} else if (b.keyCode == Event.KEY_TAB || b.keyCode == Event.KEY_RETURN || Prototype.Browser.WebKit > 0 && b.keyCode == 0)return;
		this.hasFocus = this.changed = true;
		this.observer && clearTimeout(this.observer);
		this.observer = setTimeout(this.onObserverEvent.bind(this), this.options.frequency * 1E3)
	},activate:function() {
		this.changed = false;
		this.hasFocus = true;
		this.getUpdatedChoices()
	},onHover:function(b) {
		var c = Event.findElement(b, "LI");
		if (this.index != c.autocompleteIndex) {
			this.index = c.autocompleteIndex;
			this.render()
		}
		Event.stop(b)
	},onClick:function(b) {
		this.index = Event.findElement(b, "LI").autocompleteIndex;
		this.selectEntry(true);
		this.hide()
	},onBlur:function() {
		setTimeout(this.hide.bind(this), 250);
		this.active = this.hasFocus = false
	},render:function() {
		if (this.entryCount > 0) {
			for (var b = 0; b < this.entryCount; b++)this.index == b ? Element.addClassName(this.getEntry(b), "selected") : Element.removeClassName(this.getEntry(b), "selected");
			if (this.hasFocus) {
				this.show();
				this.active = true
			}
		} else {
			this.active = false;
			this.hide()
		}
	},
	markPrevious:function() {
		if (this.index > 0)this.index--; else this.index = this.entryCount - 1
	},markNext:function() {
		if (this.index < this.entryCount - 1)this.index++; else this.index = 0
	},getEntry:function(b) {
		return b >= 0 ? this.update.firstChild.childNodes[b] : ""
	},getCurrentEntry:function() {
		return this.getEntry(this.index)
	},selectEntry:function() {
		this.active = false;
		this.updateElement(this.getCurrentEntry())
	},updateElement:function(b) {
		if (this.options.updateElement)this.options.updateElement(b); else {
			var c = "";
			if (this.options.select) {
				var d =
				$(b).select("." + this.options.select) || [];
				if (d.length > 0)c = Element.collectTextNodes(d[0], this.options.select)
			} else c = Element.collectTextNodesIgnoreClass(b, "informal");
			d = this.getTokenBounds();
			if (d[0] != -1) {
				var e = this.element.value.substr(0, d[0]),f = this.element.value.substr(d[0]).match(/^\s+/);
				if (f)e += f[0];
				this.element.value = e + c + this.element.value.substr(d[1])
			} else this.element.value = c;
			this.oldElementValue = this.element.value;
			this.element.focus();
			this.options.afterUpdateElement && this.options.afterUpdateElement(this.element,
			b)
		}
	},updateChoices:function(b) {
		if (!this.changed && this.hasFocus) {
			this.update.innerHTML = b;
			Element.cleanWhitespace(this.update);
			Element.cleanWhitespace(this.update.down());
			if (this.update.firstChild && this.update.down().childNodes) {
				this.entryCount = this.update.down().childNodes.length;
				for (b = 0; b < this.entryCount; b++) {
					var c = this.getEntry(b);
					c.autocompleteIndex = b;
					this.addObservers(c)
				}
			} else this.entryCount = 0;
			this.stopIndicator();
			this.index = -1;
			if (this.entryCount == 1 && this.options.autoSelect) {
				this.selectEntry();
				this.hide()
			} else this.render()
		}
	},addObservers:function(b) {
		Event.observe(b, "mouseover", this.onHover.bindAsEventListener(this));
		Event.observe(b, "click", this.onClick.bindAsEventListener(this))
	},onObserverEvent:function() {
		this.changed = false;
		this.tokenBounds = null;
		if (this.getToken().length >= this.options.minChars)this.getUpdatedChoices(); else {
			this.active = false;
			this.hide()
		}
		this.oldElementValue = this.element.value
	},getToken:function() {
		var b = this.getTokenBounds();
		return this.element.value.substring(b[0], b[1]).strip()
	},
	getTokenBounds:function() {
		if (null != this.tokenBounds)return this.tokenBounds;
		var b = this.element.value;
		if (b.strip().empty())return[-1,0];
		for (var c = arguments.callee.getFirstDifferencePos(b, this.oldElementValue),d = c == this.oldElementValue.length ? 1 : 0,e = -1,f = b.length,g,h = 0,j = this.options.tokens.length; h < j; ++h) {
			g = b.lastIndexOf(this.options.tokens[h], c + d - 1);
			if (g > e)e = g;
			g = b.indexOf(this.options.tokens[h], c + d);
			if (-1 != g && g < f)f = g
		}
		return this.tokenBounds = [e + 1,f]
	}});
Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos = function(b, c) {
	for (var d = Math.min(b.length, c.length),e = 0; e < d; ++e)if (b[e] != c[e])return e;
	return d
};
Ajax.Autocompleter = Class.create(Autocompleter.Base, {initialize:function(b, c, d, e) {
	this.baseInitialize(b, c, e);
	this.options.asynchronous = true;
	this.options.onComplete = this.onComplete.bind(this);
	this.options.defaultParams = this.options.parameters || null;
	this.url = d
},getUpdatedChoices:function() {
	this.startIndicator();
	var b = encodeURIComponent(this.options.paramName) + "=" + encodeURIComponent(this.getToken());
	this.options.parameters = this.options.callback ? this.options.callback(this.element, b) : b;
	if (this.options.defaultParams)this.options.parameters +=
	"&" + this.options.defaultParams;
	new Ajax.Request(this.url, this.options)
},onComplete:function(b) {
	this.updateChoices(b.responseText)
}});
Autocompleter.Local = Class.create(Autocompleter.Base, {initialize:function(b, c, d, e) {
	this.baseInitialize(b, c, e);
	this.options.array = d
},getUpdatedChoices:function() {
	this.updateChoices(this.options.selector(this))
},setOptions:function(b) {
	this.options = Object.extend({choices:10,partialSearch:true,partialChars:2,ignoreCase:true,fullSearch:false,selector:function(c) {
		for (var d = [],e = [],f = c.getToken(),g = 0; g < c.options.array.length && d.length < c.options.choices; g++)for (var h = c.options.array[g],j = c.options.ignoreCase ?
		h.toLowerCase().indexOf(f.toLowerCase()) : h.indexOf(f); j != -1;) {
			if (j == 0 && h.length != f.length) {
				d.push("<li><strong>" + h.substr(0, f.length) + "</strong>" + h.substr(f.length) + "</li>");
				break
			} else if (f.length >= c.options.partialChars && c.options.partialSearch && j != -1)if (c.options.fullSearch || /\s/.test(h.substr(j - 1, 1))) {
				e.push("<li>" + h.substr(0, j) + "<strong>" + h.substr(j, f.length) + "</strong>" + h.substr(j + f.length) + "</li>");
				break
			}
			j = c.options.ignoreCase ? h.toLowerCase().indexOf(f.toLowerCase(), j + 1) : h.indexOf(f, j + 1)
		}
		if (e.length)d =
		d.concat(e.slice(0, c.options.choices - d.length));
		return"<ul>" + d.join("") + "</ul>"
	}}, b || {})
}});
Field.scrollFreeActivate = function(b) {
	setTimeout(function() {
		Field.activate(b)
	}, 1)
};
Ajax.InPlaceEditor = Class.create({initialize:function(b, c, d) {
	this.url = c;
	this.element = b = $(b);
	this.prepareOptions();
	this._controls = {};
	arguments.callee.dealWithDeprecatedOptions(d);
	Object.extend(this.options, d || {});
	if (!this.options.formId && this.element.id) {
		this.options.formId = this.element.id + "-inplaceeditor";
		if ($(this.options.formId))this.options.formId = ""
	}
	if (this.options.externalControl)this.options.externalControl = $(this.options.externalControl);
	if (!this.options.externalControl)this.options.externalControlOnly =
	false;
	this._originalBackground = this.element.getStyle("background-color") || "transparent";
	this.element.title = this.options.clickToEditText;
	this._boundCancelHandler = this.handleFormCancellation.bind(this);
	this._boundComplete = (this.options.onComplete || Prototype.emptyFunction).bind(this);
	this._boundFailureHandler = this.handleAJAXFailure.bind(this);
	this._boundSubmitHandler = this.handleFormSubmission.bind(this);
	this._boundWrapperHandler = this.wrapUp.bind(this);
	this.registerListeners()
},checkForEscapeOrReturn:function(b) {
	if (!(!this._editing ||
	b.ctrlKey || b.altKey || b.shiftKey))if (Event.KEY_ESC == b.keyCode)this.handleFormCancellation(b); else Event.KEY_RETURN == b.keyCode && this.handleFormSubmission(b)
},createControl:function(b, c, d) {
	var e = this.options[b + "Control"];
	c = this.options[b + "Text"];
	if ("button" == e) {
		d = document.createElement("input");
		d.type = "submit";
		d.value = c;
		d.className = "editor_" + b + "_button";
		if ("cancel" == b)d.onclick = this._boundCancelHandler;
		this._form.appendChild(d);
		this._controls[b] = d
	} else if ("link" == e) {
		e = document.createElement("a");
		e.href =
		"#";
		e.appendChild(document.createTextNode(c));
		e.onclick = "cancel" == b ? this._boundCancelHandler : this._boundSubmitHandler;
		e.className = "editor_" + b + "_link";
		if (d)e.className += " " + d;
		this._form.appendChild(e);
		this._controls[b] = e
	}
},createEditField:function() {
	var b = this.options.loadTextURL ? this.options.loadingText : this.getText(),c;
	if (1 >= this.options.rows && !/\r|\n/.test(this.getText())) {
		c = document.createElement("input");
		c.type = "text";
		var d = this.options.size || this.options.cols || 0;
		if (0 < d)c.size = d
	} else {
		c = document.createElement("textarea");
		c.rows = 1 >= this.options.rows ? this.options.autoRows : this.options.rows;
		c.cols = this.options.cols || 40
	}
	c.name = this.options.paramName;
	c.value = b;
	c.className = "editor_field";
	if (this.options.submitOnBlur)c.onblur = this._boundSubmitHandler;
	this._controls.editor = c;
	this.options.loadTextURL && this.loadExternalText();
	this._form.appendChild(this._controls.editor)
},createForm:function() {
	function b(d, e) {
		d = c.options["text" + d + "Controls"];
		!d || e === false || c._form.appendChild(document.createTextNode(d))
	}

	var c = this;
	this._form =
	$(document.createElement("form"));
	this._form.id = this.options.formId;
	this._form.addClassName(this.options.formClassName);
	this._form.onsubmit = this._boundSubmitHandler;
	this.createEditField();
	"textarea" == this._controls.editor.tagName.toLowerCase() && this._form.appendChild(document.createElement("br"));
	this.options.onFormCustomization && this.options.onFormCustomization(this, this._form);
	b("Before", this.options.okControl || this.options.cancelControl);
	this.createControl("ok", this._boundSubmitHandler);
	b("Between",
	this.options.okControl && this.options.cancelControl);
	this.createControl("cancel", this._boundCancelHandler, "editor_cancel");
	b("After", this.options.okControl || this.options.cancelControl)
},destroy:function() {
	if (this._oldInnerHTML)this.element.innerHTML = this._oldInnerHTML;
	this.leaveEditMode();
	this.unregisterListeners()
},enterEditMode:function(b) {
	if (!(this._saving || this._editing)) {
		this._editing = true;
		this.triggerCallback("onEnterEditMode");
		this.options.externalControl && this.options.externalControl.hide();
		this.element.hide();
		this.createForm();
		this.element.parentNode.insertBefore(this._form, this.element);
		this.options.loadTextURL || this.postProcessEditField();
		b && Event.stop(b)
	}
},enterHover:function() {
	this.options.hoverClassName && this.element.addClassName(this.options.hoverClassName);
	this._saving || this.triggerCallback("onEnterHover")
},getText:function() {
	return this.element.innerHTML.unescapeHTML()
},handleAJAXFailure:function(b) {
	this.triggerCallback("onFailure", b);
	if (this._oldInnerHTML) {
		this.element.innerHTML =
		this._oldInnerHTML;
		this._oldInnerHTML = null
	}
},handleFormCancellation:function(b) {
	this.wrapUp();
	b && Event.stop(b)
},handleFormSubmission:function(b) {
	var c = this._form,d = $F(this._controls.editor);
	this.prepareSubmission();
	c = this.options.callback(c, d) || "";
	if (Object.isString(c))c = c.toQueryParams();
	c.editorId = this.element.id;
	if (this.options.htmlResponse) {
		d = Object.extend({evalScripts:true}, this.options.ajaxOptions);
		Object.extend(d, {parameters:c,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
		new Ajax.Updater({success:this.element}, this.url, d)
	} else {
		d = Object.extend({method:"get"}, this.options.ajaxOptions);
		Object.extend(d, {parameters:c,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
		new Ajax.Request(this.url, d)
	}
	b && Event.stop(b)
},leaveEditMode:function() {
	this.element.removeClassName(this.options.savingClassName);
	this.removeForm();
	this.leaveHover();
	this.element.style.backgroundColor = this._originalBackground;
	this.element.show();
	this.options.externalControl && this.options.externalControl.show();
	this._editing = this._saving = false;
	this._oldInnerHTML = null;
	this.triggerCallback("onLeaveEditMode")
},leaveHover:function() {
	this.options.hoverClassName && this.element.removeClassName(this.options.hoverClassName);
	this._saving || this.triggerCallback("onLeaveHover")
},loadExternalText:function() {
	this._form.addClassName(this.options.loadingClassName);
	this._controls.editor.disabled = true;
	var b = Object.extend({method:"get"}, this.options.ajaxOptions);
	Object.extend(b, {parameters:"editorId=" + encodeURIComponent(this.element.id),
		onComplete:Prototype.emptyFunction,onSuccess:function(c) {
			this._form.removeClassName(this.options.loadingClassName);
			c = c.responseText;
			if (this.options.stripLoadedTextTags)c = c.stripTags();
			this._controls.editor.value = c;
			this._controls.editor.disabled = false;
			this.postProcessEditField()
		}.bind(this),onFailure:this._boundFailureHandler});
	new Ajax.Request(this.options.loadTextURL, b)
},postProcessEditField:function() {
	var b = this.options.fieldPostCreation;
	if (b)$(this._controls.editor)["focus" == b ? "focus" : "activate"]()
},
	prepareOptions:function() {
		this.options = Object.clone(Ajax.InPlaceEditor.DefaultOptions);
		Object.extend(this.options, Ajax.InPlaceEditor.DefaultCallbacks);
		[this._extraDefaultOptions].flatten().compact().each(function(b) {
			Object.extend(this.options, b)
		}.bind(this))
	},prepareSubmission:function() {
		this._saving = true;
		this.removeForm();
		this.leaveHover();
		this.showSaving()
	},registerListeners:function() {
		this._listeners = {};
		var b;
		$H(Ajax.InPlaceEditor.Listeners).each(function(c) {
			b = this[c.value].bind(this);
			this._listeners[c.key] =
			b;
			this.options.externalControlOnly || this.element.observe(c.key, b);
			this.options.externalControl && this.options.externalControl.observe(c.key, b)
		}.bind(this))
	},removeForm:function() {
		if (this._form) {
			this._form.remove();
			this._form = null;
			this._controls = {}
		}
	},showSaving:function() {
		this._oldInnerHTML = this.element.innerHTML;
		this.element.innerHTML = this.options.savingText;
		this.element.addClassName(this.options.savingClassName);
		this.element.style.backgroundColor = this._originalBackground;
		this.element.show()
	},triggerCallback:function(b, c) {
		"function" == typeof this.options[b] && this.options[b](this, c)
	},unregisterListeners:function() {
		$H(this._listeners).each(function(b) {
			this.options.externalControlOnly || this.element.stopObserving(b.key, b.value);
			this.options.externalControl && this.options.externalControl.stopObserving(b.key, b.value)
		}.bind(this))
	},wrapUp:function(b) {
		this.leaveEditMode();
		this._boundComplete(b, this.element)
	}});
Object.extend(Ajax.InPlaceEditor.prototype, {dispose:Ajax.InPlaceEditor.prototype.destroy});
Ajax.InPlaceCollectionEditor = Class.create(Ajax.InPlaceEditor, {initialize:function($super, c, d, e) {
	this._extraDefaultOptions = Ajax.InPlaceCollectionEditor.DefaultOptions;
	$super(c, d, e)
},createEditField:function() {
	var b = document.createElement("select");
	b.name = this.options.paramName;
	b.size = 1;
	this._controls.editor = b;
	this._collection = this.options.collection || [];
	this.options.loadCollectionURL ? this.loadCollection() : this.checkForExternalText();
	this._form.appendChild(this._controls.editor)
},loadCollection:function() {
	this._form.addClassName(this.options.loadingClassName);
	this.showLoadingText(this.options.loadingCollectionText);
	var b = Object.extend({method:"get"}, this.options.ajaxOptions);
	Object.extend(b, {parameters:"editorId=" + encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(c) {
		c = c.responseText.strip();
		if (!/^\[.*\]$/.test(c))throw"Server returned an invalid collection representation.";
		this._collection = eval(c);
		this.checkForExternalText()
	}.bind(this),onFailure:this.onFailure});
	new Ajax.Request(this.options.loadCollectionURL, b)
},
	showLoadingText:function(b) {
		this._controls.editor.disabled = true;
		var c = this._controls.editor.firstChild;
		if (!c) {
			c = document.createElement("option");
			c.value = "";
			this._controls.editor.appendChild(c);
			c.selected = true
		}
		c.update((b || "").stripScripts().stripTags())
	},checkForExternalText:function() {
		this._text = this.getText();
		this.options.loadTextURL ? this.loadExternalText() : this.buildOptionList()
	},loadExternalText:function() {
		this.showLoadingText(this.options.loadingText);
		var b = Object.extend({method:"get"}, this.options.ajaxOptions);
		Object.extend(b, {parameters:"editorId=" + encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(c) {
			this._text = c.responseText.strip();
			this.buildOptionList()
		}.bind(this),onFailure:this.onFailure});
		new Ajax.Request(this.options.loadTextURL, b)
	},buildOptionList:function() {
		this._form.removeClassName(this.options.loadingClassName);
		this._collection = this._collection.map(function(e) {
			return 2 === e.length ? e : [e,e].flatten()
		});
		var b = "value"in this.options ? this.options.value : this._text,
		c = this._collection.any(function(e) {
			return e[0] == b
		}.bind(this));
		this._controls.editor.update("");
		var d;
		this._collection.each(function(e, f) {
			d = document.createElement("option");
			d.value = e[0];
			d.selected = c ? e[0] == b : 0 == f;
			d.appendChild(document.createTextNode(e[1]));
			this._controls.editor.appendChild(d)
		}.bind(this));
		this._controls.editor.disabled = false;
		Field.scrollFreeActivate(this._controls.editor)
	}});
Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions = function(b) {
	function c(d, e) {
		d in b || e === undefined || (b[d] = e)
	}

	if (b) {
		c("cancelControl", b.cancelLink ? "link" : b.cancelButton ? "button" : b.cancelLink == b.cancelButton == false ? false : undefined);
		c("okControl", b.okLink ? "link" : b.okButton ? "button" : b.okLink == b.okButton == false ? false : undefined);
		c("highlightColor", b.highlightcolor);
		c("highlightEndColor", b.highlightendcolor)
	}
};
Object.extend(Ajax.InPlaceEditor, {DefaultOptions:{ajaxOptions:{},autoRows:3,cancelControl:"link",cancelText:"cancel",clickToEditText:"Click to edit",externalControl:null,externalControlOnly:false,fieldPostCreation:"activate",formClassName:"inplaceeditor-form",formId:null,highlightColor:"#ffff99",highlightEndColor:"#ffffff",hoverClassName:"",htmlResponse:true,loadingClassName:"inplaceeditor-loading",loadingText:"Loading...",okControl:"button",okText:"ok",paramName:"value",rows:1,savingClassName:"inplaceeditor-saving",
	savingText:"Saving...",size:0,stripLoadedTextTags:false,submitOnBlur:false,textAfterControls:"",textBeforeControls:"",textBetweenControls:""},DefaultCallbacks:{callback:function(b) {
	return Form.serialize(b)
},onComplete:function(b, c) {
	new Effect.Highlight(c, {startcolor:this.options.highlightColor,keepBackgroundImage:true})
},onEnterEditMode:null,onEnterHover:function(b) {
	b.element.style.backgroundColor = b.options.highlightColor;
	b._effect && b._effect.cancel()
},onFailure:function(b) {
	alert("Error communication with the server: " +
	b.responseText.stripTags())
},onFormCustomization:null,onLeaveEditMode:null,onLeaveHover:function(b) {
	b._effect = new Effect.Highlight(b.element, {startcolor:b.options.highlightColor,endcolor:b.options.highlightEndColor,restorecolor:b._originalBackground,keepBackgroundImage:true})
}},Listeners:{click:"enterEditMode",keydown:"checkForEscapeOrReturn",mouseover:"enterHover",mouseout:"leaveHover"}});
Ajax.InPlaceCollectionEditor.DefaultOptions = {loadingCollectionText:"Loading options..."};
Form.Element.DelayedObserver = Class.create({initialize:function(b, c, d) {
	this.delay = c || 0.5;
	this.element = $(b);
	this.callback = d;
	this.timer = null;
	this.lastValue = $F(this.element);
	Event.observe(this.element, "keyup", this.delayedListener.bindAsEventListener(this))
},delayedListener:function() {
	if (this.lastValue != $F(this.element)) {
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(this.onTimerEvent.bind(this), this.delay * 1E3);
		this.lastValue = $F(this.element)
	}
},onTimerEvent:function() {
	this.timer = null;
	this.callback(this.element,
	$F(this.element))
}});
if (!Control)var Control = {};
Control.Slider = Class.create({initialize:function(b, c, d) {
	var e = this;
	this.handles = Object.isArray(b) ? b.collect(function(f) {
		return $(f)
	}) : [$(b)];
	this.track = $(c);
	this.options = d || {};
	this.axis = this.options.axis || "horizontal";
	this.increment = this.options.increment || 1;
	this.step = parseInt(this.options.step || "1");
	this.range = this.options.range || $R(0, 1);
	this.value = 0;
	this.values = this.handles.map(function() {
		return 0
	});
	this.spans = this.options.spans ? this.options.spans.map(function(f) {
		return $(f)
	}) : false;
	this.options.startSpan =
	$(this.options.startSpan || null);
	this.options.endSpan = $(this.options.endSpan || null);
	this.restricted = this.options.restricted || false;
	this.maximum = this.options.maximum || this.range.end;
	this.minimum = this.options.minimum || this.range.start;
	this.alignX = parseInt(this.options.alignX || "0");
	this.alignY = parseInt(this.options.alignY || "0");
	this.trackLength = this.maximumOffset() - this.minimumOffset();
	this.handleLength = this.isVertical() ? this.handles[0].offsetHeight != 0 ? this.handles[0].offsetHeight : this.handles[0].style.height.replace(/px$/,
	"") : this.handles[0].offsetWidth != 0 ? this.handles[0].offsetWidth : this.handles[0].style.width.replace(/px$/, "");
	this.disabled = this.dragging = this.active = false;
	this.options.disabled && this.setDisabled();
	if (this.allowedValues = this.options.values ? this.options.values.sortBy(Prototype.K) : false) {
		this.minimum = this.allowedValues.min();
		this.maximum = this.allowedValues.max()
	}
	this.eventMouseDown = this.startDrag.bindAsEventListener(this);
	this.eventMouseUp = this.endDrag.bindAsEventListener(this);
	this.eventMouseMove = this.update.bindAsEventListener(this);
	this.handles.each(function(f, g) {
		g = e.handles.length - 1 - g;
		e.setValue(parseFloat((Object.isArray(e.options.sliderValue) ? e.options.sliderValue[g] : e.options.sliderValue) || e.range.start), g);
		f.makePositioned().observe("mousedown", e.eventMouseDown)
	});
	this.track.observe("mousedown", this.eventMouseDown);
	document.observe("mouseup", this.eventMouseUp);
	document.observe("mousemove", this.eventMouseMove);
	this.initialized = true
},dispose:function() {
	var b = this;
	Event.stopObserving(this.track, "mousedown", this.eventMouseDown);
	Event.stopObserving(document, "mouseup", this.eventMouseUp);
	Event.stopObserving(document, "mousemove", this.eventMouseMove);
	this.handles.each(function(c) {
		Event.stopObserving(c, "mousedown", b.eventMouseDown)
	})
},setDisabled:function() {
	this.disabled = true
},setEnabled:function() {
	this.disabled = false
},getNearestValue:function(b) {
	if (this.allowedValues) {
		if (b >= this.allowedValues.max())return this.allowedValues.max();
		if (b <= this.allowedValues.min())return this.allowedValues.min();
		var c = Math.abs(this.allowedValues[0] -
		b),d = this.allowedValues[0];
		this.allowedValues.each(function(e) {
			var f = Math.abs(e - b);
			if (f <= c) {
				d = e;
				c = f
			}
		});
		return d
	}
	if (b > this.range.end)return this.range.end;
	if (b < this.range.start)return this.range.start;
	return b
},setValue:function(b, c) {
	if (!this.active) {
		this.activeHandleIdx = c || 0;
		this.activeHandle = this.handles[this.activeHandleIdx];
		this.updateStyles()
	}
	c = c || this.activeHandleIdx || 0;
	if (this.initialized && this.restricted) {
		if (c > 0 && b < this.values[c - 1])b = this.values[c - 1];
		if (c < this.handles.length - 1 && b > this.values[c +
		1])b = this.values[c + 1]
	}
	b = this.getNearestValue(b);
	this.values[c] = b;
	this.value = this.values[0];
	this.handles[c].style[this.isVertical() ? "top" : "left"] = this.translateToPx(b);
	this.drawSpans();
	if (!this.dragging || !this.event)this.updateFinished()
},setValueBy:function(b, c) {
	this.setValue(this.values[c || this.activeHandleIdx || 0] + b, c || this.activeHandleIdx || 0)
},translateToPx:function(b) {
	return Math.round((this.trackLength - this.handleLength) / (this.range.end - this.range.start) * (b - this.range.start)) + "px"
},translateToValue:function(b) {
	return b /
	(this.trackLength - this.handleLength) * (this.range.end - this.range.start) + this.range.start
},getRange:function(b) {
	var c = this.values.sortBy(Prototype.K);
	b = b || 0;
	return $R(c[b], c[b + 1])
},minimumOffset:function() {
	return this.isVertical() ? this.alignY : this.alignX
},maximumOffset:function() {
	return this.isVertical() ? (this.track.offsetHeight != 0 ? this.track.offsetHeight : this.track.style.height.replace(/px$/, "")) - this.alignY : (this.track.offsetWidth != 0 ? this.track.offsetWidth : this.track.style.width.replace(/px$/, "")) -
	this.alignX
},isVertical:function() {
	return this.axis == "vertical"
},drawSpans:function() {
	var b = this;
	this.spans && $R(0, this.spans.length - 1).each(function(c) {
		b.setSpan(b.spans[c], b.getRange(c))
	});
	if (this.options.startSpan)this.setSpan(this.options.startSpan, $R(0, this.values.length > 1 ? this.getRange(0).min() : this.value));
	if (this.options.endSpan)this.setSpan(this.options.endSpan, $R(this.values.length > 1 ? this.getRange(this.spans.length - 1).max() : this.value, this.maximum))
},setSpan:function(b, c) {
	if (this.isVertical()) {
		b.style.top =
		this.translateToPx(c.start);
		b.style.height = this.translateToPx(c.end - c.start + this.range.start)
	} else {
		b.style.left = this.translateToPx(c.start);
		b.style.width = this.translateToPx(c.end - c.start + this.range.start)
	}
},updateStyles:function() {
	this.handles.each(function(b) {
		Element.removeClassName(b, "selected")
	});
	Element.addClassName(this.activeHandle, "selected")
},startDrag:function(b) {
	if (Event.isLeftClick(b)) {
		if (!this.disabled) {
			this.active = true;
			var c = Event.element(b),d = [Event.pointerX(b),Event.pointerY(b)];
			if (c ==
			this.track) {
				c = this.track.cumulativeOffset();
				this.event = b;
				this.setValue(this.translateToValue((this.isVertical() ? d[1] - c[1] : d[0] - c[0]) - this.handleLength / 2));
				c = this.activeHandle.cumulativeOffset();
				this.offsetX = d[0] - c[0];
				this.offsetY = d[1] - c[1]
			} else {
				for (; this.handles.indexOf(c) == -1 && c.parentNode;)c = c.parentNode;
				if (this.handles.indexOf(c) != -1) {
					this.activeHandle = c;
					this.activeHandleIdx = this.handles.indexOf(this.activeHandle);
					this.updateStyles();
					c = this.activeHandle.cumulativeOffset();
					this.offsetX = d[0] - c[0];
					this.offsetY = d[1] - c[1]
				}
			}
		}
		Event.stop(b)
	}
},update:function(b) {
	if (this.active) {
		if (!this.dragging)this.dragging = true;
		this.draw(b);
		Prototype.Browser.WebKit && window.scrollBy(0, 0);
		Event.stop(b)
	}
},draw:function(b) {
	var c = [Event.pointerX(b),Event.pointerY(b)],d = this.track.cumulativeOffset();
	c[0] -= this.offsetX + d[0];
	c[1] -= this.offsetY + d[1];
	this.event = b;
	this.setValue(this.translateToValue(this.isVertical() ? c[1] : c[0]));
	if (this.initialized && this.options.onSlide)this.options.onSlide(this.values.length > 1 ? this.values :
	this.value, this)
},endDrag:function(b) {
	if (this.active && this.dragging) {
		this.finishDrag(b, true);
		Event.stop(b)
	}
	this.dragging = this.active = false
},finishDrag:function() {
	this.dragging = this.active = false;
	this.updateFinished()
},updateFinished:function() {
	if (this.initialized && this.options.onChange)this.options.onChange(this.values.length > 1 ? this.values : this.value, this);
	this.event = null
}});
Sound = {tracks:{},_enabled:true,template:new Template('<embed style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'),enable:function() {
	Sound._enabled = true
},disable:function() {
	Sound._enabled = false
},play:function(b, c) {
	if (Sound._enabled) {
		var d = Object.extend({track:"global",url:b,replace:false}, c || {});
		if (d.replace && this.tracks[d.track]) {
			$R(0, this.tracks[d.track].id).each(function(e) {
				e = $("sound_" + d.track + "_" + e);
				e.Stop && e.Stop();
				e.remove()
			});
			this.tracks[d.track] =
			null
		}
		if (this.tracks[d.track])this.tracks[d.track].id++; else this.tracks[d.track] = {id:0};
		d.id = this.tracks[d.track].id;
		$$("body")[0].insert(Prototype.Browser.IE ? new Element("bgsound", {id:"sound_" + d.track + "_" + d.id,src:d.url,loop:1,autostart:true}) : Sound.template.evaluate(d))
	}
}};
if (Prototype.Browser.Gecko && navigator.userAgent.indexOf("Win") > 0)if (navigator.plugins && $A(navigator.plugins).detect(function(b) {
	return b.name.indexOf("QuickTime") != -1
}))Sound.template = new Template('<object id="sound_#{track}_#{id}" width="0" height="0" type="audio/mpeg" data="#{url}"/>'); else if (navigator.plugins && $A(navigator.plugins).detect(function(b) {
	return b.name.indexOf("Windows Media") != -1
}))Sound.template = new Template('<object id="sound_#{track}_#{id}" type="application/x-mplayer2" data="#{url}"></object>');
else if (navigator.plugins && $A(navigator.plugins).detect(function(b) {
	return b.name.indexOf("RealPlayer") != -1
}))Sound.template = new Template('<embed type="audio/x-pn-realaudio-plugin" style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'); else Sound.play = function() {
};
Effect.Scroll = Class.create();
Object.extend(Object.extend(Effect.Scroll.prototype, Effect.Base.prototype), {initialize:function(b, c) {
	this.element = $(b);
	if (!this.element)throw Effect._elementDoesNotExistError;
	this.start(Object.extend({x:0,y:0}, c || {}))
},setup:function() {
	var b = this.element == window ? document.viewport.getScrollOffsets() : Element._returnOffset(this.element.scrollLeft, this.element.scrollTop);
	this.originalScrollLeft = b.left;
	this.originalScrollTop = b.top;
	if (this.options.mode == "absolute") {
		this.options.x -= this.originalScrollLeft;
		this.options.y -= this.originalScrollTop
	}
},update:function(b) {
	this.element.scrollTo(Math.round(this.options.x * b + this.originalScrollLeft), Math.round(this.options.y * b + this.originalScrollTop))
}});
var BEHAVIOUR_WIDGET = null,BehaviourLog = $A(),Behaviour = {debug:window.location.search.indexOf("debug") >= 0,RUN_EVERY_TIME:$A(),_ruleIndex:{},_ruleCount:0,_startTime:null,_documentLoaded:false,_windowLoaded:false,_running:false,_currentRule:null,_currentFunc:null,_currentRunEveryTime:false,domloaded_list:$H(),onload_list:$H(),setDomLoaded:function() {
	this._documentLoaded = true;
	this.log("dom loaded");
	this.apply()
},setWindowLoaded:function() {
	this._windowLoaded = true;
	this.log("window loaded");
	this._running =
	true;
	this.onload_list.each(this._runThisOnRuleset.bind(this));
	this._running = false
},_getCurrentTime:function() {
	return(new Date).getTime()
},log:function(b, c) {
	if (this.debug) {
		c || (c = this._getCurrentTime());
		var d = Math.round(c - this._startTime);
		c = Math.round(this._getCurrentTime() - c);
		BehaviourLog.push({start:d,duration:c,rule:this._currentRule,element:b})
	}
},_cssRuleHash:function(b) {
	this._ruleIndex[b] || (this._ruleIndex[b] = ++this._ruleCount);
	return"bhvr_" + window.BEHAVIOUR_WIDGET + "_" + this._ruleIndex[b]
},_functionWrapper:function(b) {
	if (this._currentRule &&
	this._currentFunc) {
		var c = 0;
		if (this.debug)c = this._getCurrentTime();
		var d = (b.id ? "#" + b.id : "") + (b.className ? "." + b.className : "");
		this.debug ? this._currentFunc(b) : this._currentFunc.defer(b);
		this.debug && this.log(d, c);
		this._currentRunEveryTime || b.addClassName(this._cssRuleHash(this._currentRule))
	}
},_runThisOnIndividualRules:function(b) {
	this._currentRule = b.key;
	this._currentFunc = b.value;
	this._currentRunEveryTime = this.RUN_EVERY_TIME.include(this._currentRule);
	b = this._currentRule.strip();
	this._currentRunEveryTime ||
	(b += ":not(." + this._cssRuleHash(this._currentRule) + ")");
	$$(b).each(this._functionWrapper.bind(this));
	this._currentFunc = this._currentRule = null
},_runThisOnRuleset:function(b) {
	window.BEHAVIOUR_WIDGET = b.key;
	b.value.each(this._runThisOnIndividualRules.bind(this));
	window.BEHAVIOUR_WIDGET = null
},apply:function(b) {
	if (!b && !this._documentLoaded)return false;
	if (this._running)return false;
	this.log("apply: " + b);
	this._running = true;
	if (b) {
		var c;
		if (c = this.domloaded_list.get(b))this._runThisOnRuleset({key:b,value:c});
		if (this._windowLoaded && (c = this.onload_list.get(b)))this._runThisOnRuleset({key:b,value:c})
	} else {
		this.domloaded_list.each(this._runThisOnRuleset.bind(this));
		this._windowLoaded && this.onload_list.each(this._runThisOnRuleset.bind(this));
		this.RUN_EVERY_TIME = this.RUN_EVERY_TIME.uniq()
	}
	this._running = false
},register:function(b, c, d) {
	d || (d = window.BEHAVIOUR_WIDGET ? window.BEHAVIOUR_WIDGET : "behaviour_ruleset_" + Math.random());
	c = c ? this.onload_list : this.domloaded_list;
	var e = c.get(d);
	e ? c.set(d, e.merge(b)) : c.set(d,
	$H(b))
}};
Behaviour._startTime = Behaviour._getCurrentTime();
Event.observe(document, "dom:loaded", Behaviour.setDomLoaded.bind(Behaviour));
Event.observe(window, "load", Behaviour.setWindowLoaded.bind(Behaviour));
if (Prototype.Browser.IE) {
	var ieVersion = null,ieBadPNG = null,IE7 = null;
	ieVersion = parseFloat(/MSIE ([\d\.]+)/.exec(navigator.appVersion)[1]);
	ieBadPNG = ieVersion >= 5.5 && ieVersion < 7;
	IE7 = ieVersion >= 7;
	var ieBehaviour = {"div.autobox-with-tabs div.autobox":function(b) {
		b.style.marginTop = ieVersion < 7 ? "1px" : "6px";
		Event.observe(window, "load", function() {
			autobox_assign_dimensions(b)
		})
	}};
	Behaviour.register(ieBehaviour);
	var ieFixZindex = function(b, c) {
		if (b && b.childElements) {
			var d = b.childElements();
			if (d.length)return d.each(function(e) {
				ieFixZindex(e,
				c)
			});
			if (b.getStyle("position") != "absolute" && (!b.getStyle("z-index") || b.getStyle("z-index") < c))b.style.zIndex = c
		}
	};
	if (ieVersion < 7) {
		var ieUnderlayHack = function(b) {
			if (window.ieTempUnderlay)return $(window.ieTempUnderlay).show();
			if (Element.extend(b)) {
				var c = b.getStyle("left"),d = b.getStyle("top"),e = b.getDimensions(),f = b.getStyle("z-index"),g = new Element("iframe", {frameborder:0,src:""});
				g.setStyle({position:"absolute",left:c,top:d,width:e.width + "px",height:e.height + "px","z-index":f - 1,filter:"alpha(opacity=0)"});
				window.ieTempUnderlay = b.parentNode.insertBefore(g, b)
			}
		},listOfTransparentPNGs = ["#testdrive_controls #size_slider_ball"];
		if (ieBadPNG) {
			var iePNGFix = function(b) {
				if (b.tagName == "IMG") {
					if (b.src.indexOf("/images/layout/spacer.gif") >= 0)return;
					var c = b.getDimensions();
					b.style.width = (c.width || 1200) + "px";
					b.style.height = (c.height || 1200) + "px";
					b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b.src + "', sizingMethod='crop')";
					b.src = "/images/layout/spacer.gif"
				} else {
					c = b.getStyle("background-image");
					if (!c || c.search(/\.png/i) < 0 || c.indexOf("/images/layout/spacer.gif") < 0)return;
					c = c.substring(5, c.length - 2);
					var d = b.getStyle("background-position");
					b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "', sizingMethod='crop')";
					b.setStyle({"background-image":"url(/images/layout/spacer.gif)"});
					b.setStyle({"background-position":d})
				}
				Event.observe(b, "propertychange", iePNGPropChange.bindAsEventListener(b))
			},iePNGPropChange = function(b) {
				switch (b.propertyName) {case "src":case "style.backgroundImage":return iePNGFix(this)
				}
			},
			transparentPNGBehaviour = {};
			for (i = 0; i < listOfTransparentPNGs.length; i++) {
				transparentPNGBehaviour[listOfTransparentPNGs[i]] = iePNGFix;
				Behaviour.RUN_EVERY_TIME.push(listOfTransparentPNGs[i])
			}
			Behaviour.register(transparentPNGBehaviour)
		}
	}
}
window.BEHAVIOUR_WIDGET = "header";
function doSearchBoxSubmit(b) {
	b && b.stop && b.stop();
	var c = $("header_search_form"),d = c.down("input[name=q]"),e = d.value,f = window;
	if (b && b.metaKey || d.cmdKeyDown)f = window.open();
	if (!e || c.down(".search_box_blank")) {
		f.location.href = "http://" + window.location.host + "/random/" + Math.random();
		return false
	}
	b = "http://" + window.location.host + "/search/" + encodeURIComponent(e).replace(/%20/g, "+").replace(/%2F/g, "%252F") + "/fonts/";
	createCookie("search_source", "form");
	f.location.href = b
}
function myfontsShowMenuReal() {
	this.header_menu_shower = undefined;
	if (!this.menu_shown_before) {
		this.insert({before:"<div class='menu_shadow' style='display:none'>&nbsp;</div>"});
		this.menu_shown_before = true
	}
	$$("#myfonts_header .header_tab").invoke("removeClassName", "menu_open");
	$$("#myfonts_header .menu_shadow").invoke("hide");
	this.addClassName("menu_open");
	if (!Prototype.Browser.WebKit || window.window_loaded)this.previous(".menu_shadow").show().clonePosition(this, {offsetLeft:2,offsetTop:2});
	Event.observe(document,
	"click", function(b) {
		if (!b.element().up(".menu_open")) {
			$$("#myfonts_header .header_tab").invoke("removeClassName", "menu_open");
			$$("#myfonts_header .menu_shadow").invoke("hide");
			Event.stopObserving(document, "click")
		}
	})
}
function myfontsShowMenu() {
	if (this.header_menu_hider) {
		clearTimeout(this.header_menu_hider);
		this.header_menu_hider = undefined
	}
	if (!this.header_menu_shower)if (!this.hasClassName("menu_open"))this.header_menu_shower = myfontsShowMenuReal.bind(this).delay(0.25)
}
function myfontsHideMenuReal() {
	this.removeClassName("menu_open");
	this.previous(".menu_shadow").hide();
	this.header_menu_hider = undefined
}
function myfontsHideMenu(b) {
	if (this.header_menu_shower) {
		clearTimeout(this.header_menu_shower);
		this.header_menu_shower = undefined
	} else if (!this.header_menu_hider)if (!(b.relatedTarget && b.relatedTarget.up && (b.relatedTarget.hasClassName("menu_open") || b.relatedTarget.up(".menu_open"))))this.header_menu_hider = myfontsHideMenuReal.bind(this).delay(0.25)
}
Behaviour.register({"#sitewide_announcement a.close":function(b) {
	b.observe("click", function(c) {
		c.stop();
		createCookie("announcement_acknowledged", 1);
		$("sitewide_announcement").remove()
	})
},"#header_login_username":function(b) {
	Event.observe(document, "myfonts:loggedin", function() {
		new Ajax.Request("/ajax-server/userinfo.php", {onSuccess:function(c) {
			b.update(c.headerJSON.name);
			Behaviour.apply()
		}})
	})
},"#myfonts_header div.header_tab":function(b) {
	if (b.down("ul")) {
		b.observe("mouseover", myfontsShowMenu.bind(b));
		b.observe("mouseout", myfontsHideMenu.bindAsEventListener(b))
	}
},"#search_tab #search_button":function(b) {
	b.observe("mouseover", function() {
		b.src = b.src.replace("-roll", "-over")
	});
	b.observe("mouseout", function() {
		b.src = b.src.replace("-over", "-roll")
	})
},"#search_tab .search_box_blank":function(b) {
	b.observe("focus", function() {
		if (b.hasClassName("search_box_blank")) {
			b.removeClassName("search_box_blank");
			b.value = "";
			b.focus()
		}
	})
},"#header_search_form":function(b) {
	var c = b.down("input[name=q]");
	Event.observe(window,
	"load", function() {
		var d = $(new Element("div", {"class":"auto_complete"}));
		$("pagebody").appendChild(d);
		new Ajax.Autocompleter($("header_search_form").down("input[name=q]").identify(), d.identify(), "/ajax-server/search_suggest.php", {frequency:0.2,afterUpdateElement:doSearchBoxSubmit})
	});
	c.cmdKeyDown = false;
	c.observe("keydown", function(d) {
		if (d.keyCode == 91 || d.keyCode == 224)c.cmdKeyDown = true
	});
	c.observe("keyup", function(d) {
		if (d.keyCode == 91 || d.keyCode == 224)c.cmdKeyDown = false
	});
	b.observe("submit", doSearchBoxSubmit)
},
	"a.help_popup, input.help_popup":function(b) {
		b.observe("click", function(c) {
			popupBox("<p>Thanks for using the new MyFonts! You can <a href='/feedback/'>post public feedback</a>, or e-mail <a href='mailto:helpnew@myfonts.com'>helpnew@myfonts.com</a> for personal support.</p>");
			c.stop();
			return false
		})
	}});
window.BEHAVIOUR_WIDGET = null;
var superuser = false,lastClickLocation,anchor_string = location.href.substring(location.href.indexOf("#"), location.href.length),SAFARI2 = /AppleWebKit\/(\d+)/.test(navigator.userAgent) && parseInt(RegExp.$1) < 500;
function getCurrentTime() {
	return(new Date).getTime() / 1E3
}
function htmlspecialchars(b) {
	return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}
function makemoney(b) {
	var c = Number(b);
	if (isNaN(c) || !isFinite(c))return b;
	b = c < 0;
	var d = Math.floor(Math.abs(c));
	c = Math.round(Math.abs(c) * 100 % 100);
	return(b ? "-" : "") + "$" + d.toString() + "." + c.toPaddedString(2)
}
var Utf8 = {encode:function(b) {
	b = b.replace(/\r\n/g, "\n");
	for (var c = "",d = 0; d < b.length; d++) {
		var e = b.charCodeAt(d);
		if (e < 128)c += String.fromCharCode(e); else {
			if (e > 127 && e < 2048)c += String.fromCharCode(e >> 6 | 192); else {
				c += String.fromCharCode(e >> 12 | 224);
				c += String.fromCharCode(e >> 6 & 63 | 128)
			}
			c += String.fromCharCode(e & 63 | 128)
		}
	}
	return c
},decode:function(b) {
	for (var c = "",d = 0,e = c1 = c2 = 0; d < b.length;) {
		e = b.charCodeAt(d);
		if (e < 128) {
			c += String.fromCharCode(e);
			d++
		} else if (e > 191 && e < 224) {
			c2 = b.charCodeAt(d + 1);
			c += String.fromCharCode((e &
			31) << 6 | c2 & 63);
			d += 2
		} else {
			c2 = b.charCodeAt(d + 1);
			c3 = b.charCodeAt(d + 2);
			c += String.fromCharCode((e & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			d += 3
		}
	}
	return c
}};
function createCookie(b, c, d, e) {
	if (d) {
		var f = new Date;
		f.setTime(f.getTime() + d * 24 * 60 * 60 * 1E3);
		d = "; expires=" + f.toGMTString()
	} else d = "";
	document.cookie = b + "=" + encodeURIComponent(c) + d + "; path=" + (e ? e : "/")
}
function readCookie(b) {
	b = b + "=";
	for (var c = document.cookie.split(";"),d = 0; d < c.length; d++) {
		for (var e = c[d]; e.charAt(0) == " ";)e = e.substring(1, e.length);
		if (e.indexOf(b) == 0)return decodeURIComponent(e.substring(b.length, e.length))
	}
	return null
}
function eraseCookie(b) {
	createCookie(b, "", -1)
}
function myfontsWidget(b, c) {
	this.element = b;
	this.url = c;
	this.refresh = function(d) {
		if (!this.element)return true;
		if (!this.url)return true;
		var e = $(this.element);
		new Ajax.Request(this.url, {method:"post",parameters:d,onSuccess:function(f) {
			e.replace(f.responseText);
			Behaviour.apply()
		}})
	}
}
function safariBrokenHash() {
	return SAFARI2
}
function popupBox(b, c) {
	var d = $("pagebody"),e = document.viewport.getDimensions(),f = document.viewport.getScrollOffsets(),g = d.getDimensions(),h = e.width * 0.8,j = e.height * 0.8,m = $("popup_box_bg");
	if (!m) {
		m = new Element("div", {id:"popup_box_bg"});
		m.style.display = "none";
		d.appendChild(m);
		m = $("popup_box_bg");
		m.observe("click", hidePopupBox)
	}
	Prototype.Browser.IE && window.ieVersion < 7 && m.setStyle({position:"absolute",width:Math.max(e.width, g.width) + "px",height:Math.max(e.height, g.height) + "px"});
	if (temp = $("popup_box"))if (temp.down("iframe"))temp.remove();
	else {
		$("pagebody").appendChild(temp.hide());
		temp.id = ""
	}
	var q = $(b);
	if (!q) {
		q = new Element("div");
		q.update(b);
		if (q.childNodes.length == 1 && q.childNodes[0].nodeType == 1)q = q.down();
		q.addClassName("plain_text_popup")
	}
	b = new Element("div", {id:"popup_box","class":"autobox autobox-with-shadow"});
	d.appendChild(b);
	b = $("popup_box");
	d = $(new Element("div"));
	d.setStyle({width:"100%",height:"100%",overflow:"auto"});
	d.appendChild(q.show());
	b.appendChild(d);
	if (typeof c != "object")c = {};
	try {
		var s = q.getDimensions();
		if (!c ||
		!c.width)if (s.width > 0 && s.width < 100)c.width = 100; else if (s.width >= 100 && s.width <= h)c.width = s.width + (s.height > j ? 36 : 0) + 8; else if (s.width > 0)c.width = h;
		if (!c || !c.height)if (s.height > 0 && s.height < 50)c.height = 50; else if (s.height >= 50 && s.height <= j)c.height = s.height + (s.width > h ? 36 : 4) + 8; else if (s.height > 0)c.height = j;
		c.width = Math.max(100, Math.min(h, parseInt(c.width))) + "px";
		c.height = Math.max(50, Math.min(j, parseInt(c.height))) + "px"
	} catch(v) {
	}
	c && b.setStyle(c);
	c = b.getDimensions();
	if (Prototype.Browser.IE && window.ieVersion <
	7) {
		b.style.position = "absolute";
		b.style.left = Math.ceil((e.width - c.width) / 2 + f.left) + "px";
		b.style.top = Math.floor((Math.min(g.height, e.height) - c.height) / 2 + f.top) + "px"
	} else {
		b.style.left = Math.ceil((e.width - c.width) / 2) + "px";
		b.style.top = Math.floor((e.height - c.height) / 2) + "px"
	}
	autobox_init(b);
	b.appendChild($(new Element("div", {"class":"close_x"})).update("<a href='#'>&times;</a>"));
	window.ieUnderlayHack && window.ieUnderlayHack(m);
	m.show();
	Behaviour.apply();
	window.popupBoxIsShowing = true
}
function hidePopupBox(b) {
	var c = $("popup_box"),d = $("popup_box_bg");
	if (c || d) {
		c && c.hide();
		d && d.hide();
		c && c.down(".plain_text_popup") && c.remove();
		if (temp = $(window.ieTempUnderlay))temp.hide();
		if (window.popupBoxIsShowing) {
			window.popupBoxIsShowing = false;
			window.document.fire("myfonts:popupclosed");
			typeof b == "boolean" && b && document.fire("myfonts:loggedin");
			Event.stopObserving.delay(1, document, "myfonts:loggedin")
		}
	}
}
function showPopupLogin(b) {
	if (!window.logged_in) {
		$("popup_login_frame") && $("popup_login_frame").remove();
		var c = 0;
		if (window.location.protocol.charAt(4) == "s")c = 1;
		b = encodeURIComponent(b);
		popupBox("<iframe id='popup_login_frame' frameborder='0' scrolling='no' src='https://" + window.location.host + "/widgets/popup_login/popup_login.php?https=" + c + "&message=" + b + "'>", {width:"560px",height:"165px"})
	}
}
function resizePopupBox() {
	if (window.popupBoxIsShowing) {
		var b = $("popup_box");
		if (b) {
			var c = b.getDimensions(),d = b.positionedOffset(),e = b.down().down().getDimensions();
			if (!(!d || !c || !e)) {
				var f = e.width - c.width;
				c = e.height - c.height;
				b.style.width = e.width + "px";
				b.style.height = e.height + "px";
				b.style.top = Math.round(d.top - c / 2) + "px";
				b.style.left = Math.round(d.left - f / 2) + "px"
			}
		}
	}
}
function showRelatedSitesBox(b) {
	new Ajax.Request("/ajax-server/notforsale.php", {method:"post",parameters:{id:b},onSuccess:function(c) {
		popupBox(c.responseText)
	}})
}
var mfModalElement;
function checkModalElementClick(b) {
	if (!mfModalElement || !mfModalElement.visible())return hideModalElement();
	b = b.element();
	if (b != mfModalElement)b.hasClassName("opener") || b.up("#" + mfModalElement.identify()) || hideModalElement()
}
function hideModalElement() {
	Event.stopObserving(document, "click", checkModalElementClick);
	mfModalElement && mfModalElement.hide && mfModalElement.hide();
	mfModalElement = null
}
function hideOnClickOutside(b) {
	mfModalElement != b && hideModalElement();
	mfModalElement = b;
	Event.observe(document, "click", checkModalElementClick)
}
function getFirstElementInViewport(b, c) {
	if (typeof b != "object")return $("pagebody");
	if (!b.length)return $("pagebody");
	var d = document.viewport.getScrollOffsets().top;
	if (d <= (b[0] ? b[0].cumulativeOffset().top : 0))return c ? b[0] : $("pagebody");
	var e = document.viewport.getHeight(),f = $("pagebody").getHeight(),g = 0,h = b.length - 1;
	if (g >= h)return c ? b[0] : $("pagebody");
	f = Math.floor(d / (f - e) * h);
	for (c = c ? b[0] : $("pagebody"); ;) {
		var j = b[f];
		if (!j)break;
		var m = j.cumulativeOffset().top;
		if (m > d && m < d + e) {
			c = j;
			if (f == 0)break;
			h = f--
		} else {
			if (m <
			d) {
				if (c)break;
				g = f + 1
			} else h = f - 1;
			if (g >= h)break;
			f = Math.floor(g + (h - g) / 2)
		}
	}
	return c
}
function doTooltip(b, c) {
	typeof Tooltip == "undefined" || !Tooltip.ready || Tooltip.show(b, c)
}
function hideTip() {
	typeof Tooltip == "undefined" || !Tooltip.ready || Tooltip.hide()
}
function autobox_assign_dimensions() {
}
var autoboxBorders = ["autobox-cap autobox-edge-top","autobox-cap autobox-edge-bottom","autobox-side autobox-edge-left","autobox-side autobox-edge-right","autobox-cap autobox-corner autobox-corner-topleft","autobox-cap autobox-corner autobox-corner-topright","autobox-cap autobox-corner autobox-corner-bottomright","autobox-cap autobox-corner autobox-corner-bottomleft"],autoboxTabBorders = ["autobox-tab-left","autobox-tab-right"];
function autobox_init() {
}
var behaviourRules = {".unloaded":function(b) {
	Behaviour.RUN_EVERY_TIME.push(".unloaded");
	$(b).removeClassName("unloaded")
},"img.rollover":function(b) {
	if (!(b.src.lastIndexOf("-roll.") < 0)) {
		b.observe("mouseenter", function() {
			b.src = b.src.replace("-roll.", "-over.")
		});
		b.observe("mouseleave", function() {
			b.src = b.src.replace("-over.", "-roll.")
		})
	}
},"#popup_box .close_x":function(b) {
	b.observe("click", hidePopupBox)
},"#popup_box form input[type=reset]":function(b) {
	b.onclick = function() {
		hidePopupBox();
		return false
	}
},
	"a.fixme, input.fixme":function(b) {
		b.stopObserving("click");
		b.observe("click", function(c) {
			c.stop();
			popupBox("<p>Sorry, this isn&rsquo;t implemented yet.  We&rsquo;re working on it!</p><p style='text-align:center'><input type='button' onclick='hidePopupBox();' value='Reluctantly acknowledge'></p>")
		})
	},"img.ie_alpha_hack":function(b) {
		if (!(!Prototype.Browser.IE || window.ieVersion >= 7)) {
			var c = b.getDimensions();
			b.style.width = c.width + "px";
			b.style.height = c.height + "px";
			b.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
			b.src + "')";
			b.src = "/s/js/ie7/blank.gif"
		}
	},"#chris_debug":function(b) {
		b.style.maxHeight = document.viewport.getHeight() + "px"
	},"img.web_badge":function(b) {
		Behaviour.RUN_EVERY_TIME.push("img.web_badge");
		b.stopObserving("click");
		b.observe("click", function(c) {
			c.stop();
			popupBox("Loading&hellip;");
			new Ajax.Request("http://" + location.hostname + "/widgets/webfont_info/webfont_info.php", {onSuccess:function(d) {
				var e = document.viewport.getDimensions(),f = Math.round(Math.min(e.width * 0.8, 640));
				e = Math.round(e.height * 0.75);
				popupBox("<div style='height:" + (e - 40) + "px;overflow:auto'>" + d.responseText + "</div><div style='text-align:center'><input type='reset' value='Close' onclick='hidePopupBox();'></div>", {width:f + "px",height:e + "px"})
			}})
		})
	},"#footer_short_url":function(b) {
		b.observe("click", function(c) {
			c.stop();
			new Ajax.Request("/ajax-server/shorturl.xml", {parameters:{url:window.location.href,length:6},onSuccess:function(d) {
				if (d.responseXML) {
					var e = d.responseXML.getElementsByTagName("url");
					if (e && e.length) {
						e = e[0].childNodes[0].nodeValue;
						d = Math.random();
						popupBox("<form style='width:360px;'><p>Here&rsquo;s your URL: <input type='text' style='width:" + e.length * 1.2 + "ex;' value='" + e + "' id='shorturl_" + d + "'></p><p style='text-align:center;'><input type='reset' value='Thanks' onclick='hidePopupBox(); return false;'></p></form><script type='text/javascript'>$('shorturl_" + d + "').activate();<\/script>")
					} else {
						e = d.responseXML.getElementsByTagName("error");
						e.length && alert(e[0].childNodes[0].nodeValue)
					}
				} else alert("Hmm, something went wrong. We're investigating.")
			}})
		})
	}};
Behaviour.register(behaviourRules);
Behaviour.RUN_EVERY_TIME.push("a.more_elipse");
Behaviour.RUN_EVERY_TIME.push("a.fixme, input.fixme");
Event.observe(document, "dom:loaded", function() {
	typeof Tooltip != "undefined" && Tooltip.init();
	window.DOM_loaded = true
});
Event.observe(window, "load", function() {
	window.window_loaded = true
});
function showLogin() {
	Dialog.confirm($("login").innerHTML, {className:"alphacube",width:400,okLabel:"login",cancelLabel:"cancel",onOk:function(b) {
		$("login_error_msg").innerHTML = "Login or password inccorect";
		$("login_error_msg").show();
		Windows.focusedWindow.updateHeight();
		new Effect.Shake(Windows.focusedWindow.getId());
		return false
	}})
}
function protoLogin() {
	var b = new Window({className:"mac_os_x",width:500,height:500,zIndex:100,resizable:true,title:"Login to MyFonts",showEffect:Effect.Appear,hideEffect:Effect.Fade,draggable:true,wiredDrag:true});
	b.setContent("userLogin", true, true);
	b.setStatusBar("Log in or Register");
	b.showCenter()
}
function ajaxLoginframe() {
	iframe.src = "https://" + window.location.host + "/ajax-server/ajaxlogin.html?message=" + encodeURIComponent("Please log in to view your albums.")
}
function normalizedMyFontsUrl(b) {
	return b.replace(/^https?:\/\/([^\/]+\.)?myfonts\.(net|com)\//, "/")
}
function isMyFontsURL(b) {
	return normalizedMyFontsUrl(b).charAt(0) == "/"
}
function getTargetFromFlagUrl(b) {
	b = normalizedMyFontsUrl(b);
	if (b.charAt(0) != "/")return false;
	b = b.charAt(b.length - 1) == "/" ? b.substring(1, b.length - 1) : b.substring(1);
	b = b.split("/");
	if (b.length == 4 && b[0] == "images" && b[1] == "family")return b[2] + "/" + b[3].substring(0, b[3].lastIndexOf(".")); else if (b.length == 5 && b[0] == "s" && b[1] == "flag-stubs")return b[3] + "/" + b[4].substring(0, b[4].lastIndexOf("."));
	return false
}
function targetFromUrl(b) {
	b = normalizedMyFontsUrl(b);
	if (b.indexOf("?") != -1)b = b.substring(0, b.indexOf("?"));
	if (b.charAt(0) != "/")return false;
	b = b.substring(1, b.lastIndexOf("/"));
	b = b.split("/");
	if (b.shift() == "fonts")switch (b.length) {case 0:case 1:return false;case 2:case 3:return b.join("/");default:return b[0] + "/" + b[1] + "/" + b[2]
	}
	return false
}
var mfTooltipCurrentlyVisible = false,mfTooltipTimeout = false,mfTooltipDimensions = {},mfTooltipWindowSize = {},mfTooltipWindowScroll = {};
function mfTooltipConfigure(b) {
	window.mfTooltipDimensions = b.mfTooltipDiv.getDimensions();
	window.mfTooltipWindowSize = document.viewport.getDimensions();
	window.mfTooltipWindowScroll = document.viewport.getScrollOffsets();
	b.stopObserving("mousemove");
	b.stopObserving("mouseout");
	b.observe("mousemove", mfTooltipMouseMove.bindAsEventListener(b));
	b.observe("mouseout", mfTooltipMouseOut.bindAsEventListener(b))
}
function mfTooltipMouseOver() {
	var b = targetFromUrl(this.href);
	if (b) {
		window.mfTooltipCurrentlyVisible && this.mfTooltipDiv && window.mfTooltipCurrentlyVisible != this.mfTooltipDiv && window.mfTooltipCurrentlyVisible.hide();
		if (this.mfTooltipDiv && this.mfTooltipDiv.tooltipLoaded) {
			window.mfTooltipCurrentlyVisible = this.mfTooltipDiv;
			this.mfTooltipDiv.show();
			mfTooltipConfigure(this)
		} else {
			if (window.mfTooltipTimeout) {
				clearTimeout(window.mfTooltipTimeout);
				window.mfTooltipTimeout = false
			}
			if (!this.mfTooltipDiv) {
				this.mfTooltipDiv =
				new Element("div", {style:"position:absolute;display:none;background-color:white;border:1px solid black;padding:3px;z-index: 500;"});
				$("pagebody").appendChild(this.mfTooltipDiv)
			}
			mfTooltipConfigure(this);
			window.mfTooltipTimeout = function() {
				this.mfTooltipDiv.update("<img src='/images/iconsets/myfonts/spinner.gif' class='spinner16'>");
				this.mfTooltipDiv.tooltipLoaded = false;
				new Ajax.Request("/tooltips/" + b + ".html", {onSuccess:function(c) {
					this.mfTooltipDiv.update(c.responseText);
					this.mfTooltipDiv.tooltipLoaded =
					true;
					this.mfTooltipDiv.dontShow || mfTooltipMouseOver.bind(this).defer()
				}.bind(this)})
			}.bind(this).delay(0.2)
		}
	}
}
function mfTooltipMouseMove(b) {
	if (this.mfTooltipDiv) {
		var c = 5,d = 8;
		if (b.pointerX() > window.mfTooltipWindowScroll.left + window.mfTooltipWindowSize.width - window.mfTooltipDimensions.width - 24)c = -window.mfTooltipDimensions.width - c * 2;
		if (b.pointerY() > window.mfTooltipWindowScroll.top + window.mfTooltipWindowSize.height - window.mfTooltipDimensions.height - 24)d = -window.mfTooltipDimensions.height - d * 2;
		this.mfTooltipDiv.setStyle({left:b.pointerX() + c + "px",top:b.pointerY() + d + "px"})
	}
}
function mfTooltipMouseOut(b) {
	if (this.mfTooltipDiv)if (!(b.relatedTarget && (b.relatedTarget.identify() == this.identify() || b.relatedTarget.up("#" + this.identify())))) {
		this.mfTooltipDiv.hide();
		this.mfTooltipDiv.dontShow = true;
		clearTimeout(window.mfTooltipTimeout);
		window.mfTooltipTimeout = false;
		window.mfTooltipCurrentlyVisible = false;
		this.stopObserving("mousemove");
		this.stopObserving("mouseout")
	}
}
var mfTooltipBehaviour = {"a.tooltip":function(b) {
	b.observe("mouseover", mfTooltipMouseOver.bindAsEventListener(b))
}};
Behaviour.register(mfTooltipBehaviour, true);
window.BEHAVIOUR_WIDGET = "dropdown";
function myfontsDropdown(b) {
	this.optionIndex = function(c) {
		if (!this.options)return-1;
		if (!c || !c.identify)return-1;
		if (!this.li2index) {
			this.li2index = {};
			var d;
			for (d = 0; d < this.options.length; d++)this.li2index[this.options[d].identify()] = d
		}
		c = this.li2index[c.identify()];
		return typeof c == "undefined" ? -1 : c
	};
	this.findIndex = function(c) {
		if (!c.length)return-1;
		if (/^\[(.*)\]$/.exec(c)) {
			var d = this.findIndex(RegExp.$1);
			if (d >= 0)return d
		}
		return this.options.inject(-1, function(e, f, g) {
			if (e >= 0)return e;
			if (this.inputs[g] &&
			this.inputs[g].value === c)return this.optionIndex(f);
			if (this.values[g] === c)return this.optionIndex(f);
			return e
		}.bind(this))
	};
	this.showMenu = function(c) {
		c && c.stop();
		if (window.myfontsOpenDropdown) {
			window.myfontsOpenDropdown.hideMenu();
			window.myfontsOpenDropdown = false
		}
		this.inputs.each(function(g) {
			if (g)g.originalcheck = g.checked
		});
		this.menu.show();
		this.setPosition();
		this.textfield.activate.bind(this.textfield).defer();
		if (!this.menu.up(".docked")) {
			c = document.viewport.getHeight();
			var d = document.viewport.getScrollOffsets().top,
			e = this.menu.cumulativeOffset().top,f = this.menu.getHeight();
			e + f > d + c && new Effect.Scroll(window, {mode:"relative",y:Math.min(e + f - (d + c) + 10, e - d - 25),duration:1})
		}
		hideOnClickOutside(this.menu);
		window.myfontsOpenDropdown = this
	};
	this.hideMenu = function(c) {
		if (!c)return this.menu.hide();
		if (c.target == this.menu || c.target.up("div.dropdown_menu")) {
			if (c.target.tagName != "INPUT")return;
			if (c.target.readAttribute("type") != "button")return;
			if (c.type == "mousedown")return
		}
		this.menu.hide();
		this.inputs.each(function(d) {
			if (d)d.checked =
			d.originalcheck
		});
		this.hovering = -1
	};
	this.toggleMenu = function(c) {
		return this.menu.visible() ? this.hideMenu(c) : this.showMenu(c)
	};
	this.setPosition = function() {
		if (!this.positioned) {
			var c = this.textfield.getDimensions(),d = this.textfield.next(".dropdown_button").getDimensions();
			c = c.width + d.width - 3;
			d = this.options.inject(0, function(e, f) {
				f = f.down("label");
				if (!f)return e;
				f = f.getWidth();
				return f > e ? f : e
			});
			this.menu.style.width = Math.max(d + 10, c) + "px";
			this.positioned = true
		}
	};
	this.textfocus = function(c) {
		c.stop();
		this.textfield.activate.bind(this.textfield).defer();
		this.custom || this.showMenu()
	};
	this.hover = function(c) {
		if (typeof c == "object" && c.findElement) {
			c.stop();
			c = c.findElement("li")
		} else if (typeof c == "number" && c >= 0 && c < this.options.length)c = this.options[c]; else if ($(c))c = c; else return;
		c = this.optionIndex(c);
		if (this.hovering !== c) {
			this.options.invoke("removeClassName", "hover");
			this.hovering = c;
			this.options[this.hovering] && this.options[this.hovering].addClassName("hover")
		}
	};
	this.unhover = function(c) {
		var d = c.findElement("li");
		c.stop();
		if (!(c.relatedTarget && c.relatedTarget.up &&
		(c.relatedTarget == d || c.relatedTarget.up("li") == d))) {
			d.removeClassName("hover");
			this.hovering = -1
		}
	};
	this.keypress = function(c) {
		switch (c.keyCode) {case 32:if (this.custom && (this.hovering < 0 || !this.menu.visible()))return;case Event.KEY_TAB:case Event.KEY_RETURN:if (this.hovering < 0) {
			this.custom || c.stop();
			return
		}var d = this.inputs[this.hovering];if (d)if (d.readAttribute("type") == "radio") {
			d.checked = true;
			this.hideMenu()
		} else d.checked = !d.checked;c.stop();this.finalize(true);return false;case Event.KEY_ESC:this.hideMenu();
			c.stop();return false;case Event.KEY_LEFT:case Event.KEY_RIGHT:case 63234:case 63235:return true;case Event.KEY_UP:case 63232:if (this.menu.visible())this.hover(this.hovering <= 0 ? this.options.length - 1 : this.hovering - 1); else {
			this.showMenu();
			this.hover(this.options.last())
		}c.stop();return false;case Event.KEY_DOWN:case 63233:if (this.menu.visible())this.hover((this.hovering + 1) % this.options.length); else {
			this.showMenu();
			this.hover(this.options.first())
		}c.stop();return false;default:if (this.currentText == this.textfield.value)break;
			this.hideMenu();this.shortlist.value = this.textfield.value;this.fakeselect.fire("myfonts:dropdown_keypress");break
		}
	};
	this.itemclick = function(c) {
		var d = this.inputs[this.hovering];
		if (d) {
			if (d.readAttribute("type") == "radio") {
				d.checked = true;
				this.finalize(true);
				this.hideMenu()
			} else if (c.target != d)d.checked = !d.checked;
			c.target != d && c.stop()
		}
		this.finalize(true)
	};
	this.selectValue = function(c) {
		var d = this.findIndex(c);
		if (d < 0)if (this.custom) {
			this.shortlist.value = this.textfield.value = c;
			this.currentText = this.textfield.value
		} else {
			c =
			$A(c.split(","));
			if (c.length <= 1)return false; else c.each(function(e) {
				this.selectValue(e.strip())
			}.bind(this))
		} else this.inputs[d].checked = true;
		this.finalize(false);
		return true
	};
	this.deselectValue = function(c) {
		c = this.findIndex(c);
		if (c < 0)return true;
		this.inputs[c].checked = false;
		return true
	};
	this.setValue = function(c, d) {
		this.inputs.each(function(e) {
			if (e)e.checked = false
		});
		this.selectValue(c);
		d && this.finalize(d)
	};
	this.finalize = function(c) {
		if (!this.options)return false;
		if (this.options[this.hovering] && this.options[this.hovering].hasClassName("custom")) {
			var d =
			this.options[this.hovering];
			try {
				this.textfield.value = d.down(".item_value").innerHTML
			} catch(e) {
				this.textfield.value = d.innerHTML
			}
			this.currentText = this.shortlist.value = this.textfield.value;
			this.hovering = -1;
			this.hideMenu();
			this.textfield.activate()
		} else {
			var f = [],g = [];
			d = this.menu.hasClassName("show_short") ? "short" : "long";
			this.options.each(function(h, j) {
				h = this.inputs[j];
				j = this.values[j];
				var m = h.value;
				if (!(!j || !h || !m || !h.checked)) {
					f.push(m);
					g.push(j)
				}
			}.bind(this));
			if (this.custom && f.length == 0)this.shortlist.value =
			this.textfield.value; else {
				this.textfield.value = (d == "short" ? f : g).join(", ");
				this.shortlist.value = f.join(",");
				if (this.textfield.value != this.shortlist.value)this.textfield.value = "[" + this.textfield.value + "]";
				this.currentText = this.textfield.value
			}
		}
		c && this.fakeselect.fire("myfonts:dropdown_change");
		this.inputs.each(function(h) {
			if (h)h.originalcheck = h.checked
		});
		return true
	};
	this.positioned = false;
	this.hovering = -1;
	this.widget = $(b);
	this.fakeselect = this.widget.down("select.dropdown_fake_select");
	this.menu = this.widget.down("div.dropdown_menu");
	this.textfield = this.widget.down("input.dropdown_text");
	this.shortlist = this.widget.down("input.dropdown_shortlist");
	this.options = $A(this.menu.getElementsBySelector("li.option"));
	this.fakeselect.myfontsDropdown = this;
	this.textfield.myfontsDropdown = this;
	this.shortlist.myfontsDropdown = this;
	this.currentText = this.textfield.value;
	this.custom = false;
	Event.observe(this.textfield.next(".dropdown_button"), "mousedown", this.toggleMenu.bindAsEventListener(this));
	Event.observe(this.textfield, "keyup", this.keypress.bindAsEventListener(this));
	Event.observe(this.textfield, "focus", this.textfocus.bindAsEventListener(this));
	Event.observe(this.textfield, "blur", this.fakeselect.fire.bind(this.fakeselect, "myfonts:dropdown_change"));
	this.inputs = $A();
	this.values = $A();
	this.options.each(function(c) {
		c.observe("click", this.itemclick.bindAsEventListener(this));
		c.observe("mouseover", this.hover.bindAsEventListener(this));
		c.observe("mouseout", this.unhover.bindAsEventListener(this));
		var d = c.hasClassName("custom"),e;
		if (e = c.down("input")) {
			this.inputs.push(e);
			this.values.push(c.down(".item_value").innerHTML)
		} else {
			this.inputs.push(false);
			this.values.push(false)
		}
		if (d)this.custom = true
	}.bind(this));
	$A(this.menu.down("ul").getElementsBySelector("input[type=radio]")).invoke("hide");
	b = function() {
		this.textfield.style.width = this.widget.getWidth() - 21 + "px";
		if (Prototype.Browser.WebKit && navigator.appVersion.match("Version/2"))this.textfield.style.height = "21px"
	}.bind(this);
	Prototype.Browser.WebKit ? Event.observe(window, "load", b) : b();
	this.finalize(false)
}
var dropdownBehaviour = {"div.dropdown_widget":function(b) {
	new myfontsDropdown(b)
}};
Behaviour.register(dropdownBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "person_page";
Behaviour.register({"#person_page a.moreinfo":function(b) {
	b.observe("click", function(c) {
		c.stop();
		if ($("person_short_article")) {
			$("person_short_article").hide();
			$("person_full_article").show()
		}
		new Effect.BlindDown($("person_info"), {duration:0.5});
		$$("#person_page .hideme").invoke("hide")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "slideshow";
function mfSlideshowClass() {
	this.between_time = this.perpage = 10;
	this.fade_time = 0.5;
	this.controls_first_hide_time = 5;
	this.controls_fade_time = this.controls_mouseout_hide_time = 0.25;
	this.current_slide = 0;
	this.slides = [];
	this.pagestart = 0;
	this.hide_timeout = false;
	this.startup = function(b) {
		if (!(this.slides.length > 0)) {
			b.select(".slide").each(function(c) {
				this.slides.push(c)
			}.bind(this));
			this.controls = b.down("div.slideshow_controls");
			if (this.slides.length > 1) {
				this.slides[0].image_loaded = true;
				this.slideshow_load(0);
				this.pausebutton = this.controls.down("a.pause");
				this.slideshow_play();
				this.controls.select("div.slideshow_navbutton").invoke("observe", "click", function(c) {
					this.slideshow_load(c.element().up("div.slideshow_navbutton").className.match(/_(\d+)/)[1], true);
					this.slideshow_pause()
				}.bind(this));
				this.pausebutton.observe("click", this.slideshow_playpause.bindAsEventListener(this));
				this.prevpage = this.controls.down("a.previous");
				this.nextpage = this.controls.down("a.next");
				this.prevpage && this.prevpage.observe("click",
				function(c) {
					c.stop();
					this.slideshow_pause();
					this.previous_slide(true)
				}.bindAsEventListener(this));
				this.nextpage && this.nextpage.observe("click", function(c) {
					c.stop();
					this.slideshow_pause();
					this.next_slide(true)
				}.bindAsEventListener(this));
				b.observe("mouseover", this.show_controls.bindAsEventListener(this));
				b.observe("mouseout", this.hide_controls.bindAsEventListener(this));
				this.hide_controls()
			} else this.controls && this.controls.hide()
		}
	};
	this.next_slide = function(b) {
		this.slideshow_load((this.current_slide +
		1) % this.slides.length, b)
	};
	this.previous_slide = function(b) {
		this.slideshow_load((this.slides.length + this.current_slide - 1) % this.slides.length, b)
	};
	this.url_swap = function(b) {
		if (!(b >= this.slides.length))if (!this.slides[b].image_loaded) {
			var c = this.slides[b].down("img");
			if (c) {
				var d = c.readAttribute("alt").match(/^(.+);;;.*$/);
				if (!(!d || d.length < 2)) {
					c.writeAttribute("alt", d[0].replace(d[1] + ";;;", ""));
					c.observe("load", function() {
						this.slides[b].image_loaded = true
					}.bind(this));
					c.src = d[1]
				}
			}
		}
	};
	this.slideshow_load =
	function(b, c) {
		b = parseInt(b);
		b %= this.slides.length;
		c && this.url_swap(b);
		this.url_swap(b + 1);
		if (c || this.slides[b].image_loaded) {
			this.current_slide != b && Effect.Fade(this.slides[this.current_slide], {duration:this.fade_time});
			Effect.Appear(this.slides[b], {duration:this.fade_time});
			this.current_slide = b;
			this.slideshow_drawnav();
			this.url_swap(b + 1)
		}
	};
	this.slideshow_play = function() {
		this.repeater = new PeriodicalExecuter(this.next_slide.bind(this), this.between_time);
		this.pausebutton.removeClassName("play");
		this.pausebutton.addClassName("pause");
		this.pausebutton.down("img").src = "/s/w/slideshow/pause.gif";
		this.pausebutton.blur()
	};
	this.slideshow_pause = function() {
		if (this.repeater) {
			this.repeater.stop();
			delete this.repeater
		}
		this.pausebutton.removeClassName("pause");
		this.pausebutton.addClassName("play");
		this.pausebutton.down("img").src = "/s/w/slideshow/play.gif";
		this.pausebutton.blur()
	};
	this.slideshow_playpause = function(b) {
		if (this.repeater)this.slideshow_pause(); else {
			this.next_slide();
			this.slideshow_play()
		}
		b && b.stop && b.stop()
	};
	this.slideshow_drawnav =
	function() {
		var b = this.perpage / 2;
		if (this.current_slide < this.pagestart)this.pagestart - this.current_slide < b ? this.slideshow_nextpage(false, -1) : this.slideshow_loadpage(Math.max(0, this.current_slide - b)); else if (this.current_slide >= this.pagestart + this.perpage)this.current_slide - (this.pagestart + this.perpage) < b ? this.slideshow_nextpage(false, 1) : this.slideshow_loadpage(this.perpage * Math.floor(this.current_slide / this.perpage));
		this.controls.select(".slideshow_navbutton").each(function(c) {
			var d = c.className.match(/_(\d+)/);
			parseInt(d[1]) == this.current_slide ? c.addClassName("active") : c.removeClassName("active")
		}.bind(this))
	};
	this.slideshow_nextpage = function(b, c) {
		b && b.stop && b.stop();
		c = c < 0 ? -1 : 1;
		if (!(this.slides.length <= this.perpage))if (!(c < 0 && this.pagestart <= 0))if (!(c > 0 && this.pagestart >= this.slides.length - this.perpage)) {
			b = this.perpage / 2;
			var d = c > 0 ? this.pagestart : this.pagestart + this.perpage - 1,e;
			for (e = 0; e < b; e++) {
				var f = d + c * e,g = d + c * (this.perpage + e);
				if (f < this.slides.length && f >= 0)new Effect.Fade(this.controls.down("div.slide_nav_button_" +
				f), {duration:0.5,my_own_thing:g,afterFinish:function(h) {
					h.options.my_own_thing < this.slides.length && h.options.my_own_thing >= 0 && new Effect.Appear(this.controls.down("div.slide_nav_button_" + h.options.my_own_thing), {duration:0.5})
				}.bind(this)}); else g < this.slides.length && g >= 0 && new Effect.Appear(this.controls.down("div.slide_nav_button_" + g), {duration:0.5})
			}
			this.pagestart += c * b;
			if (c > 0 && this.current_slide < this.pagestart)this.slideshow_load(this.pagestart, true); else c < 0 && this.current_slide > this.pagestart +
			this.perpage - 1 && this.slideshow_load(this.pagestart + this.perpage - 1, true)
		}
	};
	this.slideshow_loadpage = function(b) {
		this.controls.select("div.slideshow_navbutton").invoke("hide");
		var c;
		for (c = b; c < b + this.perpage; c++) {
			if (c >= this.slides.length)break;
			this.controls.down("div.slide_nav_button_" + c).show()
		}
		this.pagestart = b
	};
	this.show_controls = function() {
		if (this.hide_timeout) {
			window.clearTimeout(this.hide_timeout);
			this.hide_timeout = false
		}
		new Effect.Morph(this.controls, {style:"bottom: 0px",duration:this.controls_fade_time})
	};
	this.hide_controls = function(b) {
		if (b && b.relatedTarget)if (b.relatedTarget.hasClassName("slideshowWidget") || b.relatedTarget.up("div.slideshowWidget"))return;
		if (this.hide_timeout) {
			window.clearTimeout(this.hide_timeout);
			this.hide_timeout = false;
			new Effect.Morph(this.controls, {style:"bottom: -" + (this.controls.getHeight() + 1) + "px",duration:this.controls_fade_time})
		} else this.hide_timeout = this.hide_controls.bind(this).delay(b ? this.controls_mouseout_hide_time : this.controls_first_hide_time)
	}
}
Behaviour.register({"div.slideshowWidget":function(b) {
	(new mfSlideshowClass).startup(b)
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "cart";
function cartAjaxCall(b) {
	new Ajax.Request("/ajax-server/cart.php", {evalScripts:true,parameters:b,onSuccess:function(c) {
		if (c.headerJSON && c.headerJSON.updated) {
			$("header_cart").update(c.responseText);
			if (window.lastClickedCartButton)try {
				if (b.command == "add")swapCartIcon(window.lastClickedCartButton); else b.command == "remove" && resetCartIcon(window.lastClickedCartButton);
				window.lastClickedCartButton = null
			} catch(d) {
			}
		}
	}})
}
function removeItemFromCart(b) {
	var c = b.href.match(/\d+$/);
	if (!c)return false;
	window.lastClickedCartButton = b;
	cartAjaxCall({command:"remove",id:c})
}
function swapCartIcon(b) {
	if (!b.href.match(/\d+$/))return false;
	b.old_href = b.href;
	b.href = "/cart/";
	var c = b.down("img");
	if (c) {
		var d = c.cloneNode(true);
		d.src = c.src.replace(/add_to_cart-(over|roll)/, "in_your_cart-roll");
		c.parentNode.replaceChild(d, c);
		Behaviour.apply()
	}
	b.removeClassName("mouseshow").setStyle({visibility:"visible"}).stopObserving("click")
}
function resetCartIcon(b) {
	if (!(b.old_href && b.old_href.match(/\d+$/)))return false;
	b.href = b.old_href;
	var c = b.down("img");
	if (c) {
		var d = c.cloneNode(true);
		d.src = c.src.replace("in_your_cart", "add_to_cart");
		c.parentNode.replaceChild(d, c)
	}
	b.addClassName("mouseshow").setStyle({visibility:"hidden"}).stopObserving("click")
}
function updateCartPricesOnPage() {
	if ($("cart_page")) {
		window.mfCartTotals.each(function(b) {
			$$("#cart_page ." + b.key).invoke("update", b.value)
		});
		window.mfSkuSetPrices.each(function(b) {
			var c = $("pack_" + b.key + "_price_cell");
			c && c.update(b.value)
		});
		window.doCurrencyUpdate && $$("form.choose_currency select").each(function(b) {
			window.doCurrencyUpdate(b);
			throw $break;
		})
	}
}
var cartRules = {"a.remove_from_cart":function(b) {
	b.onclick = function() {
		removeItemFromCart(b);
		return false
	}
},"a.related_sites":function(b) {
	if ($(b.parentNode).hasClassName("price-tag"))b = $(b.parentNode).setStyle({cursor:"pointer"});
	b.onclick = function() {
		var c = b.href.match(/\d+$/);
		if (!c)return false;
		showRelatedSitesBox(c);
		return false
	}
}};
Behaviour.register(cartRules);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "wtf";
var wtfBehaviour = {"img#wtf_continue":function(b) {
	b.style.cursor = "pointer";
	b.onclick = function() {
		var c = $("wtf_upload_form"),d = c.upload_url;
		if (c.userfile.value.empty() && d.value.empty()) {
			alert("you must either upload an image or specify an URL");
			return false
		} else $("wtf_upload_form").submit()
	}
}};
Behaviour.register(wtfBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_partner";
Behaviour.register({"#partner_type input[type=radio]":function(b) {
	b.observe("click", function() {
		var c = $F(b);
		c == "foundry" ? $("foundry_row").removeClassName("hidden") : $("foundry_row").addClassName("hidden");
		c == "referrer" ? $("referrer_row").removeClassName("hidden") : $("referrer_row").addClassName("hidden")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "user_edited_articles";
Behaviour.register({"#user_edited_article form input[type=submit]":function(b) {
	b.observe("click", function(c) {
		var d = b.up("form");
		if (d) {
			var e = d.serialize(true);
			e.ajax = 1;
			var f = "";
			delete e["action[deny]"];
			delete e["action[accept]"];
			if (b.name == "action[accept]") {
				e["action[accept]"] = 1;
				f = "accepted"
			} else if (b.name == "action[deny]") {
				e["action[deny]"] = 1;
				f = "denied"
			} else return;
			c.stop();
			new Ajax.Request(d.readAttribute("action"), {method:"post",parameters:e,onSuccess:function(g) {
				!g.responseJSON || !g.responseJSON.success ?
				alert(g.responseText) : d.replace("<div class='done_message'>Edit " + f + "</div>")
			}})
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "rollover_buttons";
var rolloverButtonsBehaviour = {"div.rollover_buttons":function(b) {
	var c = $(b.parentNode);
	c.observe("mouseover", function() {
		this.select(".mouseshow").invoke("setStyle", {visibility:"visible"})
	}.bindAsEventListener(b));
	c.observe("mouseout", function(d) {
		d.relatedTarget && d.relatedTarget.up && d.relatedTarget.up("#" + c.identify()) || this.select(".mouseshow").invoke("setStyle", {visibility:"hidden"})
	}.bindAsEventListener(b))
}};
Behaviour.register(rolloverButtonsBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_newuser";
newuserBehaviour = {"#newuser_form":function(b) {
	b.observe("submit", function(c) {
		if ($$("#newuser_form .newuser_field input").inject(false, function(e, f) {
			if (e)throw $break;
			if (!$F(f).length) {
				alert("Please fill in all the fields.");
				f.activate();
				return true;
				throw $break;
			}
			return false
		}))c.stop(); else {
			var d = ["password","confirm","email"].inject({}, function(e, f) {
				e[f] = $("newuser_" + f).down("input") || $("newuser_" + f).down("select");
				return e
			});
			if ($F(d.password) != $F(d.confirm)) {
				alert("Please check the password fields; they don't match.");
				d.password.activate();
				c.stop()
			} else if ($F(d.password).length < 6) {
				alert("Please choose a password that is at least 6 characters long.");
				d.password.activate();
				c.stop()
			} else if ($F(d.password) == $F(d.email)) {
				alert("Please choose a password that is different from your email address.");
				d.password.activate();
				c.stop()
			} else if (!$F(d.email).match(/.+@.+\..+/)) {
				alert("Please check your email address.  It doesn't appear to be formatted correctly.");
				d.email.activate();
				c.stop()
			}
		}
	})
},"#forgot_form":function(b) {
	b.observe("submit", function(c) {
		c.stop();
		if ($F(b.down("input[name=email]")).match(/.+@.+\..+/)) {
			c = b.serialize() + "&ajax=1";
			new Ajax.Request(b.readAttribute("action"), {parameters:c})
		} else alert("Please enter a valid email address.")
	})
}};
Behaviour.register(newuserBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "searchresults";
var searchresultsAutoLoad = false,searchresultsCount = 0,searchresultsFirst = 0,searchresultsLast = 0,searchresultsPrevTrigger = 0,searchresultsNextTrigger = 0,searchresultsWindowHeight = 0,searchresultsLoading = true,searchresultsRecalcPermalink = false;
function searchresultsCheckRangeHash() {
	if (/(\d+)-(\d+)/.test(window.location.hash)) {
		var b = parseInt(RegExp.$1),c = parseInt(RegExp.$2);
		if (b <= 0)b = 1;
		if (c <= 0)c = 1;
		if (b > c) {
			var d = c;
			c = b;
			b = d
		}
		d = "";
		if (/(item_\d+)/.test(window.location.hash))d = RegExp.$1;
		var e = false,f = /\/(\d+)-(\d+)\/$/;
		if (f.test(window.location.pathname)) {
			var g = f.exec(window.location.pathname);
			if (g[1] != b || g[2] != c)e = window.location.pathname.replace(f, "/" + b + "-" + c + "/")
		} else {
			f = window.location.search;
			if (/(first|last)=\d+/.test(f)) {
				f = f.replace(/(first|last)=\d+/g,
				"");
				f += "&range=" + b + "-" + c;
				e = window.location.pathname + f
			} else {
				e = window.location.pathname;
				/\/$/.test(e) || (e += "/");
				e += b + "-" + c + "/";
				if (f && f != "?")e += f
			}
		}
		if (e) {
			if (d)e += "#" + d;
			window.location.href = e
		} else searchresultsLoading = false
	}
}
searchresultsCheckRangeHash();
Event.observe(document, "dom:loaded", function() {
	if (!window.searchresultsIPP)return searchresultsLoading = false;
	if (!/item_(\d+)/.test(window.location.hash))return searchresultsLoading = false;
	var b = parseInt(RegExp.$1);
	if (b >= window.searchresultsFirst && b <= window.searchresultsLast)return searchresultsLoading = false;
	var c = window.searchresultsIPP * Math.floor(b / window.searchresultsIPP);
	window.location.hash = c + 1 + "-" + (c + window.searchresultsIPP) + "@item_" + b;
	searchresultsCheckRangeHash()
});
function searchresultsGetCurrentRange() {
	return window.searchresultsFirst + "-" + window.searchresultsLast
}
function searchresultsShowRange(b) {
	var c = new RegExp(searchresultsGetCurrentRange() + "/$");
	if (c.test(window.location.pathname))window.location.pathname = window.location.pathname.replace(c, b + "/"); else window.location.pathname += b + "/"
}
function searchresultsNoMoreToLoad(b) {
	var c = $("start_of_the_search_results"),d = $("end_of_the_search_results");
	if (b < 0 && c) {
		c.remove();
		c = null
	} else if (b > 0 && d) {
		d.remove();
		d = null
	}
	!c && !d && searchresultsStopAutoLoading()
}
function searchresultsSetPaginationControls() {
	$$("div.searchresultsWidget form.pagination input[type=submit]").invoke(window.searchresultsAutoLoad ? "show" : "hide");
	$$("div.searchresultsWidget form.pagination table.navigation").invoke(window.searchresultsAutoLoad ? "hide" : "show")
}
function searchresultsStartAutoLoading(b) {
	b && new Ajax.Request("/ajax-server/searchresults-autoload.php", {parameters:{enable:1}});
	if (!window.searchresultsAutoLoad) {
		window.searchresultsAutoLoad = true;
		searchresultsSetPaginationControls();
		searchresultsSetLoadTrigger();
		searchresultsScrollWatcher();
		Event.observe(window, "resize", searchresultsSetLoadTrigger);
		Event.observe(document, "dom:loaded", searchresultsSetLoadTrigger);
		Event.observe(window, "load", searchresultsSetLoadTrigger);
		Event.observe(window, "scroll",
		searchresultsScrollWatcher);
		window.searchresultsRepeater = new PeriodicalExecuter(searchresultsSetLoadTrigger, 5)
	}
}
function searchresultsStopAutoLoading(b) {
	b && new Ajax.Request("/ajax-server/searchresults-autoload.php", {parameters:{enable:0}});
	if (window.searchresultsAutoLoad) {
		window.searchresultsAutoLoad = false;
		searchresultsSetPaginationControls();
		Event.stopObserving(window, "scroll", searchresultsScrollWatcher);
		Event.stopObserving(window, "resize", searchresultsSetLoadTrigger);
		Event.stopObserving(document, "dom:loaded", searchresultsSetLoadTrigger);
		Event.stopObserving(window, "load", searchresultsSetLoadTrigger);
		window.searchresultsRepeater.stop()
	}
}
function searchresultsLoadNextBatch(b) {
	if (!window.searchresultsLoading) {
		if (parseInt(b) == 0)b = 1;
		if (b > 0 && window.searchresultsLast >= window.searchresultsCount || b < 0 && window.searchresultsFirst <= 1)searchresultsNoMoreToLoad(b); else {
			window.searchresultsLoading = true;
			var c,d;
			if (b > 0) {
				c = parseInt(window.searchresultsLast) + 1;
				d = parseInt(window.searchresultsLast) + window.searchresultsIPP
			} else {
				c = Math.max(1, parseInt(window.searchresultsFirst - window.searchresultsIPP));
				d = parseInt(window.searchresultsFirst - 1)
			}
			var e = window.searchresultsPost;
			e.embedded = 1;
			e.endlessdir = b;
			e.range = c + "-" + d;
			e.ajax = 1;
			if (window.TESTDRIVE_RANDOM_SEED)e.randomseed = window.TESTDRIVE_RANDOM_SEED;
			var f;
			f = b > 0 ? window.searchresultsCount - window.searchresultsLast : d;
			$(b > 0 ? "end_of_the_search_results" : "start_of_the_search_results").replace("<div id='searchresults_loader'><img src='/images/iconsets/myfonts/spinner.gif' alt='loading' class='spinner32'> Loading " + Math.min(window.searchresultsIPP, f) + "/" + f + " items&hellip;</div>");
			Behaviour.log("searchresults: starting ajax");
			new Ajax.Request(window.searchresultsScript,
			{method:"post",parameters:e,onSuccess:function(g) {
				Behaviour.log("searchresults: received response");
				var h = false;
				if (b < 0)h = $("pagebody").getHeight();
				var j,m = j = $("searchresults_loader");
				if (m) {
					if (m = j.up("table.searchresults_table tr"))j = m;
					Behaviour.log("searchresults: replacing...");
					j.replace(g.responseText);
					Behaviour.log("searchresults: done");
					b < 0 && window.scrollBy(0, $("pagebody").getHeight() - h);
					window.searchresultsLoading = false;
					if (b > 0)window.searchresultsLast = d; else window.searchresultsFirst = c;
					Behaviour.log("searchresults: refreshing testdrive image list");
					window.mfTestDrive && window.mfTestDrive.tdRefreshImageList();
					Behaviour.apply();
					searchresultsSetLoadTrigger();
					searchresultsSetPaginationControls();
					if (b > 0 && d >= window.searchresultsCount || b < 0 && c <= 1)searchresultsNoMoreToLoad(b)
				}
			},onFailure:function() {
				alert("Failed looking up items " + e.range);
				window.searchresultsLoading = false
			},onException:function(g, h) {
				alert(h);
				window.searchresultsLoading = false
			}});
			return false
		}
	}
}
function searchresultsSetLoadTrigger() {
	window.searchresultsWindowHeight = document.viewport.getHeight();
	var b = $("start_of_the_search_results"),c = $("end_of_the_search_results");
	if (b)window.searchresultsPrevTrigger = b.cumulativeOffset().top + window.searchresultsWindowHeight;
	if (c)window.searchresultsNextTrigger = c.cumulativeOffset().top - window.searchresultsWindowHeight * 2
}
function searchresultsScrollWatcher() {
	if (!window.searchresultsLoading) {
		var b = document.viewport.getScrollOffsets();
		if (!(b.top <= 0))if (!(b.top >= $("pagebody").getHeight() - window.searchresultsWindowHeight)) {
			window.searchresultsPrevTrigger && b.top < window.searchresultsPrevTrigger && searchresultsLoadNextBatch(-1);
			window.searchresultsNextTrigger && b.top + window.searchresultsWindowHeight > window.searchresultsNextTrigger && searchresultsLoadNextBatch(1)
		}
	}
}
function searchresultsGetCurrentAnchor() {
	var b = getFirstElementInViewport($$("a.search-results-anchor"));
	if (!(!b || b.tagName != "A"))return"return_to_" + b.readAttribute("name")
}
function searchresultsSetRecalcPermalink() {
	window.searchresultsRecalcPermalink = true;
	Event.stopObserving(window, "scroll", searchresultsSetRecalcPermalink)
}
function searchresultsCreateSortable() {
	var b = $$("div.searchresultsWidget")[0];
	b && Sortable.create(b.identify(), {tag:"div",only:"search-result-item",scroll:window,scrollSensitivity:50,onUpdate:function() {
		var c = /_(\d+)/,d = $$("a.search-results-anchor").inject({}, function(e, f, g) {
			if (!c.test(f.id))return e;
			e["so[" + RegExp.$1 + "]"] = window.searchresultsFirst + g;
			return e
		});
		d.albumid = albumID;
		new Ajax.Request("/widgets/album/ajaxsortorder.php", {method:"post",parameters:Object.toQueryString(d)})
	}})
}
var searchresultsBehaviour = {"select#listpage_sort":function(b) {
	b.observe("change", function() {
		var c = window.location.search.match(/sort=(\w+)/),d = $F(b);
		if (c && c.length > 1) {
			if (c[1] != d)window.location.search = window.location.search.replace(c[0], "sort=" + d)
		} else if (!window.location.search || window.location.search == "?")window.location.search = "?sort=" + d; else window.location.search += "&sort=" + d
	})
},"div.searchresultsWidget div.navigation div.previous img":function(b) {
	b.observe("mouseover", function(c) {
		Event.element(c).src =
		Event.element(c).src.replace(".png", "-over.png")
	});
	b.observe("mouseout", function(c) {
		Event.element(c).src = Event.element(c).src.replace("-over", "")
	})
},"div.searchresultsWidget div.navigation div.next img":function(b) {
	b.observe("mouseover", function(c) {
		Event.element(c).src = Event.element(c).src.replace(".png", "-over.png")
	});
	b.observe("mouseout", function(c) {
		Event.element(c).src = Event.element(c).src.replace("-over", "")
	})
},"div.searchresultsWidget a.searchtips":function(b) {
	b.onclick = function() {
		popupBox($(b.next().cloneNode(true)).show());
		return false
	}
},"div.searchresultsWidget a.searchsyntax":function(b) {
	b.onclick = function() {
		popupBox($(b.next().cloneNode(true)).show());
		return false
	}
},"div.searchresultsWidget a":function(b) {
	b.observe("click", function() {
		var c = searchresultsGetCurrentAnchor();
		if (c)window.location.hash = c
	})
},"div.searchresultsWidget a.thumbs_down":function(b) {
	b.observe("click", function(c) {
		c.stop();
		c = b.href.toQueryParams();
		b.up("div.search-result-item").setOpacity(0.5);
		new Ajax.Request("/ajax-server/addtags.php", {parameters:c,
			onSuccess:function() {
				new Effect.Fade(b.up("div.search-result-item"), {duration:0.5,from:0.5})
			}})
	})
},"form#end_of_the_search_results":function(b) {
	if (!(Prototype.Browser.IE && window.ieVersion < 8)) {
		Behaviour.RUN_EVERY_TIME.push("form#end_of_the_search_results");
		b.stopObserving("submit");
		b.observe("submit", function(c) {
			c.stop();
			searchresultsLoadNextBatch(1)
		})
	}
},"form#start_of_the_search_results":function(b) {
	if (!(Prototype.Browser.IE && window.ieVersion < 8)) {
		Behaviour.RUN_EVERY_TIME.push("form#start_of_the_search_results");
		b.stopObserving("submit");
		b.observe("submit", function(c) {
			c.stop();
			searchresultsLoadNextBatch(-1)
		})
	}
},"#listpage_view_options":function(b) {
	b.observe("mouseover", function() {
		if (window.searchresultsRecalcPermalink && $("listpage_link_to_range")) {
			$("listpage_link_to_range").href = "#" + searchresultsGetCurrentAnchor();
			window.searchresultsRecalcPermalink = false;
			Event.observe(window, "scroll", searchresultsSetRecalcPermalink)
		}
	});
	Event.observe(window, "scroll", searchresultsSetRecalcPermalink);
	b.srFloating = false;
	Event.observe(window,
	"scroll", function() {
		var c = $("listpage_view_options");
		if (!c.srPos) {
			c.srPos = c.cumulativeOffset();
			c.srPosPos = c.positionedOffset()
		}
		var d = document.viewport.getScrollOffsets();
		if (d.top > c.srPos.top && !c.srFloating) {
			c.srPos = c.cumulativeOffset();
			c.srPosPos = c.positionedOffset();
			c.srFloating = true;
			Prototype.Browser.IE && window.ieVersion < 7 ? c.setStyle({position:"absolute",width:"171px"}) : c.setStyle({position:"fixed",top:"0px",left:c.srPos.left - d.left + "px",width:"171px"})
		} else if (d.top <= c.srPos.top && c.srFloating) {
			c.srFloating =
			false;
			c.setStyle({position:"static",top:"auto",left:"auto"})
		}
		if (Prototype.Browser.IE && window.ieVersion < 7 && c.style.position == "absolute")c.style.top = c.srPosPos.top - c.srPos.top + d.top + "px"
	})
},"input#listpage_autoload_enable":function(b) {
	b.observe("change", function() {
		b.checked ? searchresultsStartAutoLoading(true) : searchresultsStopAutoLoading(true)
	})
},"a.removeFromAlbum":function(b) {
	b.observe("click", function(c) {
		c.stop();
		new Effect.Fade(b.up("div.search-result-item"), {duration:1});
		new Ajax.Request(b.href +
		"&ajax=1&aid=" + window.albumID, {method:"get"})
	})
},"div.comment.inplaceedit":function(b) {
	new Ajax.InPlaceEditor(b, "/widgets/album/ajaxaddalbumcomment.php", {clickToEditText:"Click here to add a note",cols:55,rows:4,highlightcolor:"transparent",highlightendcolor:"transparent",okText:"Update",cancelText:"Cancel",callback:function(c, d) {
		c = {};
		if (/_(\d+)/.test(b.identify()))c.id = RegExp.$1;
		c.albumid = albumID;
		c.comment = d;
		return Object.toQueryString(c)
	},onComplete:function() {
		b.empty() ? b.addClassName("fresh").update("Click here to add a note") :
		b.removeClassName("fresh")
	}});
	b.empty() && b.addClassName("fresh").update("Click here to add a note")
}};
Behaviour.register(searchresultsBehaviour);
Event.observe(document, "dom:loaded", function() {
	var b = $("listpage_view_options");
	if (b) {
		var c = b.up("div.two_column_layout").down("div.side_column");
		c && c.appendChild(b)
	}
});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "wtf_forum";
wtfBehaviour = {"#wtf_show_select":function(b) {
	b.observe("change", function() {
		window.location.href = "/WhatTheFont/forum/?show=" + $F(b)
	})
}};
Behaviour.register(wtfBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "browser_check";
Behaviour.register({"#browser_check":function() {
	var b = $("browser_check");
	if (b) {
		b.removeClassName("yellow").addClassName("chartreuse").update("75%");
		$("browser_score_note").update("Javascript is enabled.").style.visibility = "visible";
		new Ajax.Request("/widgets/browser_check/browser_check.js", {method:"GET",onSuccess:function() {
			b.removeClassName("chartreuse").addClassName("green").update("PASS!");
			$("browser_score_note").update("AJAX support verified.  Browser is fully compatible!")
		}})
	}
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "skuset-admin";
var fid = false,to_lmg = false,to_section = false,mergeid = false,mergesect = false,clearfunc = function() {
};
function ssaSetCellColor(b, c) {
	if (b) {
		c || (c = "white");
		$A(b).each(function(d) {
			var e = $(d);
			e || (e = $("set_row_" + d));
			e && e.select("td").invoke("setStyle", {backgroundColor:c})
		})
	}
}
Behaviour.register({"#skuset_lmg_form input[type=radio]":function(b) {
	b.observe("change", function() {
		if (b.checked) {
			to_lmg = b.value;
			to_section = b.up("tbody").identify()
		}
	})
},"#skuset_lmg_form input.mover":function(b) {
	b.observe("change", function(c) {
		if (b.checked) {
			var d = b.value;
			if (!d)return alert("Can't determine SkuSetID of this checkbox.");
			if (!to_lmg || !to_section) {
				c.stop();
				b.checked = false;
				return alert("Please choose a destination language set first.")
			}
			var e = $(to_section),f = b.up("tr");
			f.setOpacity(0.5);
			new Ajax.Request("skuset-admin.php",
			{parameters:{ajax:1,fid:fid,to_lmg:to_lmg,move_sets:d},onSuccess:function(g) {
				g = g.responseJSON;
				g[0] ? e.insert(f) : alert(g[1]);
				f.setOpacity(1);
				f.select("input[type=checkbox]").each(function(h) {
					h.checked = false
				})
			}})
		}
	})
},"#skuset_lmg_form a.merger":function(b) {
	b.up("tr").observe("mouseover", function() {
		b.style.visibility = "visible"
	});
	b.up("tr").observe("mouseout", function(c) {
		var d = c.findElement("tr"),e;
		if (!(c.relatedTarget && (e = c.relatedTarget.up("tr")) && e == d))b.style.visibility = "hidden"
	});
	b.observe("click",
		 function(c) {
			 c.stop();
			 b.href.match(/(\d+)/);
			 c = RegExp.$1;
			 if (!c)return alert("Unable to parse SkuSetID from link.");
			 if (mergeid)window.location.search = "?fid=" + fid + "&merge[]=" + mergeid + "&merge[]=" + c; else {
				 mergeid = c;
				 b.replace("<span style='color:#666'>Select other pack to merge</span>")
			 }
		 })
},"#skuset_table td.problem a":function(b) {
	b.observe("click", function(c) {
		c.stop();
		if (clearfunc(c))clearfunc = function() {
		};
		if (problems)if (/(group_\w+_\d+)/.test(b.href)) {
			var d = RegExp.$1;
			if (d && problems[d]) {
				if (problems[d].msg) {
					c =
					b.up("td").getDimensions();
					var e = b.up("td").positionedOffset(),f = new Element("div");
					f.setStyle({position:"absolute",left:e.left + c.width + 6 + "px",top:e.top + "px",backgroundColor:"#FFC",border:"1px solid black",padding:"3px"});
					f.update(problems[d].msg);
					b.insert({after:f});
					clearfunc = function(g) {
						if (g.findElement("div") != f) {
							f.remove();
							ssaSetCellColor(problems[d].group);
							return true
						}
						return false
					};
					document.observe("click", function(g) {
						if (clearfunc(g)) {
							document.stopObserving("click", clearfunc);
							clearfunc = function() {
							}
						}
					})
				}
				ssaSetCellColor(problems[d].group,
				"#FCC")
			}
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_payments_trans";
Behaviour.register({"select.set_field":function(b) {
	var c = $A(["Complete","Sent","Approved","Processing","Due","In Approval"]);
	b.observe("change", function(d) {
		var e = {},f = $F(b);
		e[b.name] = f;
		e.ajax = 1;
		if (!c.include(f)) {
			f = prompt("Reason for failure?");
			if (f == null) {
				d.stop();
				return
			}
			e.reason = f
		}
		new Ajax.Request(window.location.pathname, {parameters:e,onSuccess:function() {
			window.location.reload()
		}})
	})
},"input.email_sent":function(b) {
	b.observe("click", function() {
		var c = {};
		c[b.name] = b.checked ? "Y" : "N";
		c.ajax = 1;
		new Ajax.Request(window.location.pathname,
		{parameters:c})
	})
},"a.report_hold":function(b) {
	b.observe("click", function(c) {
		c.stop();
		if (/=(\d+)/.test(b.href)) {
			id = RegExp.$1;
			reasonForHold = prompt("Reason for hold");
			if (reasonForHold != null && reasonForHold != "") {
				url = "?set_hold=" + id + "&reason=" + encodeURIComponent(reasonForHold);
				window.location.search = url
			}
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_orders";
var vieworderBehaviour = {"#personal_note_edit":function(b) {
	b.observe("click", function(c) {
		c.stop();
		$("personal_note_current_hider").hide();
		$("personal_note_input_hider").show()
	})
},"#personal_note form":function(b) {
	b.observe("submit", function(c) {
		c.stop();
		new Ajax.Updater("personal_note_current", b.action, {parameters:b.serialize(true),onSuccess:function() {
			$("personal_note_input_hider").hide();
			$("personal_note_current_hider").show()
		}})
	})
},"#license_dashboard_sort_form":function(b) {
	b.down("select").observe("change",
				function() {
					b.submit()
				})
},"form.license_upgrade_form":function(b) {
	var c = function() {
		if (b.hasClassName("haspricetable")) {
			b.action = "/ajax-server/calculate_price.php";
			b.select("table.license_upgrade_price_list").invoke("replace", "<input type='submit' value='Calculate price'>");
			b.removeClassName("haspricetable")
		}
	};
	b.select("input[type=text]").invoke("observe", "keydown", c);
	b.select("select").invoke("observe", "change", c);
	b.observe("submit", function(d) {
		d.stop();
		var e = b.down("input[type=submit]");
		d = b.serialize(true);
		d.ajax = 1;
		switch (b.action.match(/(\/\/[\w-\.]+\.com)?(\/.*)$/)[2]) {case "/ajax-server/calculate_price.php":e.disable().setValue("Calculating...");new Ajax.Request(b.action, {method:"get",parameters:d,onSuccess:function(f) {
			if (f.responseJSON) {
				f = f.responseJSON;
				if (f.alert) {
					alert(f.alert);
					e.enable().setValue("Calculate price")
				} else {
					f.upgrade_elibile || e.insert({before:"<p>Unfortunately, your previous orders fall outside the " + f.upgrade_period + "-day upgrade period. You can purchase this license for the regular price and it will be added to your existing license.</p>"});
					b.action = "/cart/add";
					e.insert({before:["<table class='license_upgrade_price_list'>","<tr><td class='label'>Full price</td><td class='price'>" + makemoney(f.full_price) + "</td><td class='desc'>" + f.total_users + " desktop users, " + f.total_pageviews_nice + " pageviews/month</td></tr>","<tr><td class='label'>Discount</td><td class='price'>",f.discount > 0 ? "-" + makemoney(f.discount) : "-$0.00","</td><td class='desc'>",f.discount > 0 ? "" : "No discount probably means that the " + f.upgrade_period + "-day upgrade period has passed.",
						"</td></tr>","<tr><td class='label'>Upgrade price</td><td class='price'>" + makemoney(f.sale_price) + "</td><td class='desc'><input type='submit' value='Add to Cart'></td></tr>","</table>"].join("")});
					e.remove();
					b.addClassName("haspricetable")
				}
			} else e.replace("<p class='error'>An error occurred.</p>" + f.responseText)
		}});break;case "/cart/add":e.disable().setValue("Adding...");d = {command:"add","id[]":typeof d.skuid == "object" ? $A(d.skuid).last() : d.skuid,type:"sku",u:d.desktop_users,v:d.webfont_pageviews,
			o:d.upgrade_from_orderid,confirm:1};cartAjaxCall(d);break
		}
	})
}};
Behaviour.register(vieworderBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_foundry_admin";
function foundryAdminPermissionCheck(b) {
	var c = b.down("input[value=Admin]"),d = c.up("li");
	d = b.select("li").without(d);
	b.select("input[type=checkbox]").without(c).invoke(c.checked ? "disable" : "enable");
	d.invoke(c.checked ? "addClassName" : "removeClassName", "disabled")
}
Behaviour.register({"ul.permlist input[type=checkbox]":function(b) {
	b.observe("click", function() {
		b.value == "Admin" && foundryAdminPermissionCheck(b.up("ul"));
		var c = b.up("form").serialize(true);
		c.ajax = "1";
		new Ajax.Request(window.location.href, {parameters:c})
	})
},"input.new_foundry_user_input":function(b) {
	b.style.color = "#999";
	b.observe("focus", function() {
		if (b.value == "Email address") {
			b.value = "";
			b.style.color = "black"
		}
	});
	b.observe("blur", function() {
		if (b.value.trim() == "") {
			b.value = "Email address";
			b.style.color =
			"#999"
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_cart";
function replaceCartContent(b) {
	b || (b = {});
	b.no_header = 1;
	new Ajax.Request("/widgets/my_cart/my_cart.php", {parameters:b,onSuccess:function(c) {
		c.headerJSON && $("header_cart").update(c.headerJSON);
		$("cart_page").replace(c.responseText);
		Behaviour.apply()
	}})
}
function doCurrencyUpdate(b) {
	var c;
	if (b) {
		if (Object.isElement(b))c = b; else if (b.element)c = b.element();
		if (c)if (/(.*),(.*),(.*),(.*)/.test($F(c))) {
			b = RegExp.$1;
			var d = RegExp.$2,e = RegExp.$3 || b,f = parseInt(RegExp.$4) || 0;
			if (b && d) {
				createCookie("currency", b, 30);
				if (b == "USD")$$("span.price_tag_other_currency").invoke("remove"); else {
					b = function(g) {
						if (g && g.update)if (!(g.hasClassName("price_tag_other_currency") || g.up(".price_tag_other_currency"))) {
							var h = g.innerHTML;
							if (/(\d+(\.\d+)?)/.test(h.replace(",", ""))) {
								h = parseFloat(RegExp.$1);
								var j = Math.pow(10, f);
								h = e + Math.round(j * d * h) / j;
								if (f > 1 && /\.(\d+)$/.test(h))for (j = RegExp.$1.length; j < f; j++)h += "0";
								var m = g.up(".price_tag_widget");
								if (m) {
									j = m.next(".price_tag_other_currency");
									if (!j) {
										j = m.clone(true);
										j.addClassName("price_tag_other_currency");
										j.insert({top:"<br>("});
										j.insert({bottom:")"});
										m.insert({after:j})
									}
									m = ".regular-price";
									if (g.hasClassName("sale-price"))m = ".sale-price";
									(g = j.down(m)) && g.update(h)
								} else {
									g.up().select(".price_tag_other_currency").invoke("remove");
									j = g.clone(true);
									j.className =
									"price_tag_other_currency";
									j.update("<br>(" + h + ")");
									g.up().insert(j)
								}
							} else {
								(h = g.up(".price_tag_widget")) || (h = g.up());
								h.select(".price_tag_other_currency").invoke("remove")
							}
						}
					};
					$$("div.pack_list span.regular-price").each(b);
					$$("div.pack_list span.sale-price").each(b);
					$$("#cart_page span.cart_subtotal").each(b)
				}
			}
		}
	}
}
var cartPageBehaviour = {"a#link_to_this_cart":function(b) {
	b.observe("click", function(c) {
		c.stop();
		new Ajax.Request("/cart/?action=link", {method:"get",onSuccess:function(d) {
			$("cart_link_textarea") && $("cart_link_textarea").remove();
			d = htmlspecialchars(d.responseText);
			popupBox('<h3>Link to this cart</h3><p>Use <a href="' + d + "\">this link</a> to restore your current cart any time in the future:</p><form><textarea id='cart_link_textarea' cols='40' rows='4'>" + d + "</textarea><div style='text-align:center'><input type='button' onclick='hidePopupBox();' value='Close'></div></form>");
			$("cart_link_textarea").activate()
		}})
	})
},"#cart_page form.choose_currency select":function(b) {
	doCurrencyUpdate(b);
	b.observe("change", doCurrencyUpdate.bindAsEventListener(b))
}};
$H(cartPageBehaviour).each(function(b) {
	Behaviour.RUN_EVERY_TIME.push(b.key)
});
Behaviour.register(cartPageBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "testdrive";
function mfTestDriveClass() {
	this.mode = "image";
	this.debug = window.location.search.indexOf("debug") >= 0;
	this.tdMinSize = 8;
	this.tdMaxSize = 240;
	this.tdSetSizes = [8,10,12,14,18,24,36,48,60,72,96,120,160,200,240];
	this.tdDelay = 500;
	this.custom = this.docked = false;
	this.defaults = $H();
	this.tdParams = $H();
	this.tdImgIdx = $A();
	this.tdTimerId = null;
	this.tdTimerPending = false;
	this.tdUrlBase = "/ajax-server/testdrive.xml";
	this.tdLoaderNamePrefix = "tdloader";
	this.allowResize = false;
	this.pointSizeRE = /pointsize_(\d+)/;
	this.tdInitImage =
	function(b) {
		if (!b.hasClassName("tdInitiated")) {
			b.addClassName("tdInitiated");
			var c = window.location.href;
			if (b.parentNode.tagName == "A") {
				c = b.parentNode.href;
				if (!this.linkClickBoundFunc)this.linkClickBoundFunc = this.linkClicked.bindAsEventListener(this);
				$(b.parentNode).observe("click", this.linkClickBoundFunc)
			}
			if (isMyFontsURL(c)) {
				var d = targetFromUrl(c);
				if (d) {
					c = {url:c,target:d,id:this.tdImgIdx.length,sampleclass:b.className,img:b,w:parseInt(b.style.width),h:parseInt(b.style.height),currentSize:this.tempSize,
						allowResize:!b.hasClassName("noresize")};
					if (c.allowResize)this.allowResize = true;
					c.loader = document.createElement("img");
					c.loader.onload = this.tdSwapLoader;
					c.loader.id = this.tdLoaderNamePrefix + c.id;
					this.tdImgIdx.push(c);
					if (Prototype.Browser.IE && window.ieVersion < 7)for (b = b.up("div"); b;) {
						if (b.getStyle("overflow") == "hidden") {
							b.style.width = b.getWidth() + "px";
							break
						}
						b = b.up("div")
					}
				}
			}
		}
	};
	this.tdInitWebfont = function(b) {
		if (!b.hasClassName("tdInitiated")) {
			b.addClassName("tdInitiated");
			b = {id:this.tdImgIdx.length,img:b,
				sampleclass:b.className,currentSize:this.tempSize,allowResize:!b.hasClassName("noresize")};
			if (b.allowResize)this.allowResize = true;
			this.tdImgIdx.push(b)
		}
	};
	this.linkClicked = function(b) {
		if (b.shiftKey) {
			var c = b.element();
			if (c.tagName != "IMG")c = c.down("img");
			if (!(!c || c.tagName != "IMG")) {
				var d = c.readAttribute("alt");
				if (d)if (d = /https?:\/\/[^\s"']+/.exec(d)) {
					b.stop();
					window.open(d)
				} else c.up("a").stopObserving("click", this.linkClickBoundFunc); else c.up("a").stopObserving("click", this.linkClickBoundFunc)
			}
		}
	};
	this.tdResetImageList = function() {
		this.tdImgIdx = $A();
		this.tdRefreshImageList()
	};
	this.tdRefreshImageList = function() {
		this.tempSize = this.tdParams.get("size");
		var b = $$("img.fontsample.liveupdate");
		if (b.length) {
			this.mode = "image";
			b.each(this.tdInitImage.bind(this))
		} else {
			b = $$("span.webfont_render");
			if (b.length) {
				this.mode = "webfont";
				b.each(this.tdInitWebfont.bind(this))
			}
		}
		delete this.tempSize
	};
	this.setControlStates = function(b) {
		if (this.tdElement) {
			if (this.allowResize)this.tdParams.get("goodies").split(",").include("fit") ?
			this.disableSlider() : this.enableSlider(); else {
				this.disableSlider();
				$("testdrive_fit_cell").setStyle({color:"#999999"}).update("resize disabled")
			}
			this.slider.el.style.left = this.fontSizeToSliderPosition(this.tdParams.get("size")) + "px";
			$("testdrive_fg_square").style.backgroundColor = "#" + this.tdParams.get("fg");
			$("testdrive_bg_square").style.backgroundColor = "#" + this.tdParams.get("bg");
			this.setPermalink();
			var c = this.tdParams.get("goodies").split(",");
			$$('#testdrive_controls input[name="goodies[]"]').each(function(e) {
				e.checked =
				c.include(e.value)
			}.bind(this));
			var d = function(e) {
				if (!$("sampletext_dropdown").myfontsDropdown)return false;
				$("sampletext_dropdown").myfontsDropdown.setValue(this.tdParams.get(this.tdParams.get("src") == "custom" ? "text" : "src"), b);
				e && e.stop();
				return true
			}.bind(this);
			d() || new PeriodicalExecuter(d, 0.5)
		}
	};
	this.tdReset = function(b) {
		b && b.stop && b.stop();
		var c = this.tdParams.get("dock");
		this.tdParams = this.defaults.clone();
		this.tdParams.set("dock", c);
		this.setControlStates(true);
		this.hideMenu(b, true);
		this.tdGoToIt(true)
	};
	this.tdStart = function() {
		if ($("testdrive_controls")) {
			this.tdElement = $("testdrive_controls");
			this.defaults = $H(window.TESTDRIVE_DEFAULTS);
			this.tdParams = $H(window.TESTDRIVE_PARAMS);
			this.tdCurrentParams = this.tdParams.clone();
			if (this.tdParams.get("custom"))this.custom = true;
			var b = this.tdParams.get("size");
			if (!b || b < this.tdMinSize || b > this.tdMaxSize)this.tdParams.set("size", Math.floor((this.tdMaxSize - this.tdMinSize) / 2 + this.tdMinSize));
			if (Prototype.Browser.IE && window.ieVersion < 7) {
				this.tdParams.set("dock", 0);
				this.docked = false
			} else this.docked = this.tdParams.get("dock") ? true : false;
			this.tdRefreshImageList();
			if (this.tdImgIdx.length == 0)this.tdElement.remove(); else if (!this.started) {
				if (this.docked) {
					$("myfontsBody").appendChild(this.tdElement);
					Event.observe(window, "resize", function() {
						this.windowsize = document.viewport.getDimensions()
					}.bind(this));
					Event.observe(window, "scroll", this.doHorizontalPosition.bind(this));
					Event.observe(window, "load", function() {
						$("pagebody").insert("<div style='width:100%;height:" + this.tdElement.getHeight() +
						"px;'>&nbsp;</div>")
					}.bind(this))
				}
				$$("#testdrive_controls .menu_trigger").invoke("observe", "click", this.showMenu.bindAsEventListener(this));
				this.slider = {el:$("size_slider_ball"),label:$("size_slider_shoutout")};
				this.slider.track = this.slider.el.up();
				this.slider.gnubbelWidth = this.slider.el.getWidth();
				this.slider.trackWidth = this.slider.track.getWidth();
				this.slider.trackLeft = this.slider.track.cumulativeOffset().left;
				this.slider.track.insert("&nbsp;");
				$$("#testdrive_controls a.testdrive_reset").invoke("observe",
				"click", this.tdReset.bindAsEventListener(this));
				$$("#testdrive_color_squares div.color_square").invoke("observe", "click", this.tdShowColors.bindAsEventListener(this));
				$("testdrive_color_squares").stopObserving("click");
				Event.observe(document, "myfonts:colorwheel_mousemove", this.tdColorChange.bindAsEventListener(this, false));
				Event.observe(document, "myfonts:colorwheel_click", this.tdColorChange.bindAsEventListener(this, true));
				Event.observe(document, "myfonts:colorwheel_mouseout", this.tdColorRestore.bindAsEventListener(this));
				b = $("sampletext_dropdown_shortlist");
				var c = $("sampletext_dropdown_textvalue");
				if (b && c) {
					$("sampletext_dropdown").observe("myfonts:dropdown_keypress", this.tdStringChange.bindAsEventListener(this, false));
					$("sampletext_dropdown").observe("myfonts:dropdown_change", this.tdStringChange.bindAsEventListener(this, true))
				}
				this.tdParams.get("goodies").split(",");
				$$('#testdrive_controls input[name="goodies[]"]').invoke("observe", "click", this.tdGoodiesChange.bindAsEventListener(this, true));
				$$("#testdrive_controls a.testdrive_shuffle").invoke("observe",
				"click", this.tdShuffleStrings.bindAsEventListener(this));
				this.tdElement.fire("myfonts:testdrive_loaded");
				this.setControlStates(false);
				$$(".performanceWidget,.tracWidget").invoke("setStyle", "bottom:" + this.tdElement.getHeight() + "px");
				return this.started = true
			}
		}
	};
	this.doHorizontalPosition = function() {
		if (!this.origleft) {
			this.origleft = parseInt(this.tdElement.getStyle("left"));
			this.bodywidth = $("myfontsBody").getWidth()
		}
		if (this.windowsize)if (!(this.windowsize.width > this.bodywidth))this.tdElement.style.left =
		this.origleft - document.viewport.getScrollOffsets().left + "px"
	};
	this.tdKeypress = function(b) {
		var c = $F("sampletext_dropdown_shortlist"),d = $F("sampletext_dropdown_textvalue");
		if (c == d)return this.tdStringChange(b, false)
	};
	this.tdStringChange = function(b, c) {
		b = $F("sampletext_dropdown_shortlist");
		var d = $F("sampletext_dropdown_textvalue");
		if (b === d)this.tdParams.set("src", "custom"); else {
			if (b == this.tdParams.get("src"))return;
			this.tdParams.set("src", b)
		}
		this.tdParams.set("text", d);
		this.tdGoToIt(c)
	};
	this.tdSizeSlide =
	function(b) {
		$(this.slider.label.firstChild).update(b + "pt");
		this.slider.label.style.left = Math.floor(parseInt(this.slider.el.style.left) + this.slider.gnubbelWidth / 2 - this.slider.labelWidth / 2) + "px";
		for (var c = 0; c < this.tdImgIdx.length; c++)if (this.tdImgIdx[c].allowResize)if (this.mode == "webfont")this.tdImgIdx[c].img.style.fontSize = b + "px"; else {
			var d = b / this.tdImgIdx[c].currentSize;
			this.tdImgIdx[c].img.style.width = Math.round(d * this.tdImgIdx[c].w) + "px";
			this.tdImgIdx[c].img.style.height = Math.round(d * this.tdImgIdx[c].h) +
			"px"
		}
		autobox_assign_dimensions(this.tdElement.up(".autobox"))
	};
	this.tdSizeChange = function(b) {
		this.tdSizeSlide(b);
		this.tdParams.set("size", Math.round(b));
		this.tdGoToIt(true)
	};
	this.tdGoodiesChange = function() {
		var b = $$('#testdrive_controls input[name="goodies[]"]').inject([], function(c, d) {
			d.checked && c.push(d.value);
			return c
		});
		if (this.allowResize)b.include("fit") ? this.disableSlider() : this.enableSlider();
		this.tdParams.set("goodies", b.join(","));
		this.tdGoToIt(true)
	};
	this.tdShowColors = function(b) {
		if (b && b.stop) {
			b.stop();
			this.tdHideColors(b)
		}
		this.tdColorTable = $("testdrive_colorwheel");
		this.tdColorTable.editingColor = b.target.id.match("fg") ? "fg" : "bg";
		$("testdrive_" + this.tdColorTable.editingColor + "_square").style.borderColor = "black";
		this.showMenu(b, this.tdHideColors.bindAsEventListener(this))
	};
	this.tdHideColors = function(b) {
		if (this.tdColorTable) {
			b && b.stop && b.stop();
			this.hideMenu(b, true);
			this.tdColorRestore();
			this.tdColorTable.editingColor = null
		}
	};
	this.tdColorRestore = function() {
		if (this.tdColorTable && this.tdColorTable.editingColor) {
			$("testdrive_" +
			this.tdColorTable.editingColor + "_square").style.borderColor = "";
			$("testdrive_" + this.tdColorTable.editingColor + "_square").style.backgroundColor = "#" + this.tdParams.get(this.tdColorTable.editingColor)
		}
	};
	this.hexdigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	this.tdColorChange = function(b, c) {
		if (!(!b || !b.memo || !this.tdColorTable || !this.tdColorTable.editingColor)) {
			var d = b.memo;
			d = this.hexdigits[Math.floor(d.r / 16)] + this.hexdigits[d.r % 16] + this.hexdigits[Math.floor(d.g / 16)] + this.hexdigits[d.g %
			16] + this.hexdigits[Math.floor(d.b / 16)] + this.hexdigits[d.b % 16];
			$("testdrive_" + this.tdColorTable.editingColor + "_square").style.backgroundColor = "#" + d;
			if (c) {
				this.tdParams.set(this.tdColorTable.editingColor, d);
				this.tdHideColors(b);
				this.tdGoToIt(true)
			}
		}
	};
	this.tdShuffleStrings = function(b) {
		b && b.stop && b.stop();
		this.tdParams.set("seed", Math.random());
		this.hideMenu(b, true);
		this.tdGoToIt(true)
	};
	this.tdWebfontSetFittedSize = function(b, c) {
		c || (c = 0);
		if (c > 3)return b.currentSize;
		if (!b.currentSize)b.currentSize = b.img.getStyle("fontSize");
		if (!b.currentSize)return 40;
		if (!b.fullWidth) {
			this.debug && $("chris_debug").insert("fullwidth<br>");
			b.fullWidth = b.img.up("div").getWidth()
		}
		if (!b.fullWidth)return b.currentSize;
		var d = b.img.getWidth();
		if (!d)return b.currentSize;
		var e = b.currentSize * b.fullWidth / d;
		this.debug && $("chris_debug").insert(c + ": " + b.currentSize + " * " + b.fullWidth + " / " + d + " = " + e + "<br>");
		if (Math.abs(b.fullWidth - d) <= 2 || Math.abs(e - b.currentSize) < 0.5)return b.currentSize;
		b.currentSize = e;
		b.img.setStyle({fontSize:e + "px"});
		this.tdWebfontSetFittedSize.bind(this).defer(b,
		c + 1)
	};
	this.tdGoToIt = function(b) {
		if (this.mode == "webfont") {
			b = this.tdParams.get("goodies").split(",").include("fit");
			var c = this.tdParams.get("text");
			this.debug && b && $("chris_debug").show().update();
			for (var d = 0; d < this.tdImgIdx.length; d++) {
				this.tdImgIdx[d].img.setStyle({color:"#" + this.tdParams.get("fg"),backgroundColor:"#" + this.tdParams.get("bg")});
				typeof c == "string" && c.length && this.tdImgIdx[d].img.update(c);
				if (b)this.tdWebfontSetFittedSize(this.tdImgIdx[d]); else {
					var e = this.tdParams.get("size");
					this.tdImgIdx[d].img.setStyle({fontSize:e +
					"px"});
					this.tdImgIdx[d].currentSize = e
				}
			}
			return true
		}
		this.tdCalculateWidths();
		this.tdBuildRequest();
		b ? this.tdFetchSamples() : this.tdFetchSamplesDelayed()
	};
	this.tdBuildRequest = function() {
		this.tdPost = this.tdParams.toQueryString();
		for (var b = 0; b < this.tdImgIdx.length; b++) {
			var c = this.tdImgIdx[b],d = "&i[" + b + "]=" + encodeURIComponent(c.target + ",," + this.tdParams.get("w"));
			if (this.pointSizeRE.exec(c.img.className))d += "," + RegExp.$1;
			this.tdPost += d
		}
	};
	this.tdFetchSamples = function(b) {
		createCookie("testdrive", this.tdParams.toQueryString(),
		30);
		var c = this.tdCurrentParams.keys().without("dock").sort(),d = this.tdParams.keys().without("dock").sort(),e = true;
		if (c.length != d.length)e = false; else for (i = 0; i < c.length; i++) {
			if (c[i] != d[i]) {
				e = false;
				break
			}
			var f = c[i],g = this.tdCurrentParams.get(f);
			f = this.tdParams.get(f);
			if (g !== f) {
				e = false;
				break
			}
		}
		if (!e)if (this.tdImgIdx.length) {
			if (!b)b = this.tdPost;
			if (!(b.indexOf("&i[") < 0)) {
				this.tdCurrentParams = this.tdParams.clone();
				$("testdrive_spinner").style.visibility = "visible";
				new Ajax.Request(this.tdUrlBase, {method:"post",
					postBody:b,onSuccess:this.tdUpdate.bind(this)});
				return true
			}
		}
	};
	this.tdUpdate = function(b) {
		if (!b || !b.responseXML)return false;
		b = b.responseXML.getElementsByTagName("img");
		for (i = 0; i < b.length; i++)if (b[i].getAttribute("src")) {
			this.tdImgIdx[i].loader.width = b[i].getAttribute("width") || /width:(\d+)/.exec(b[i].getAttribute("style"))[1];
			this.tdImgIdx[i].loader.height = b[i].getAttribute("height") || /height:(\d+)/.exec(b[i].getAttribute("style"))[1];
			this.tdImgIdx[i].loader.src = b[i].getAttribute("src");
			this.tdImgIdx[i].loader.alt =
			b[i].getAttribute("alt");
			this.tdImgIdx[i].loader.title = b[i].getAttribute("title")
		}
		return true
	};
	this.tdSwapLoader = function() {
		var b = this.id.substring(mfTestDrive.tdLoaderNamePrefix.length);
		return mfTestDrive.tdSwapSpecificImage(b, mfTestDrive.tdImgIdx[b].loader)
	};
	this.tdSwapSpecificImage = function(b, c) {
		var d = this.tdImgIdx[b].img;
		if (!d)return true;
		var e = d.src.toString().substring(d.src.toString().lastIndexOf("/") + 1),f = c.src.toString().substring(c.src.toString().lastIndexOf("/") + 1);
		if (e != f) {
			this.tdImgIdx[b].w =
			c.width;
			this.tdImgIdx[b].h = c.height;
			this.tdImgIdx[b].currentSize = this.tdCurrentParams.get("size");
			e = d.cloneNode(true);
			e.style.width = c.width + "px";
			e.style.height = c.height + "px";
			e.src = c.src;
			e.alt = c.alt;
			e.title = c.title;
			d.parentNode.replaceChild(e, d);
			this.tdImgIdx[b].img = e;
			autobox_assign_dimensions(this.tdElement)
		}
		$("testdrive_spinner").style.visibility = "hidden";
		return true
	};
	this.tdFetchSamplesDelayed = function() {
		this.tdTimerPending && window.clearTimeout(this.tdTimerId);
		this.tdTimerId = window.setTimeout(this.tdFetchSamplesTimeout.bind(this),
		this.tdDelay);
		this.tdTimerPending = true
	};
	this.tdFetchSamplesTimeout = function() {
		this.tdTimerPending = false;
		this.tdTimerId = null;
		this.tdFetchSamples(this.tdPost)
	};
	this.tdCalculateWidths = function() {
		var b = false;
		if (this.tdImgIdx.length && (b = this.tdImgIdx[0].img.up(".testdrive_container")))this.tdParams.set("w", b.getWidth()); else if (this.tdImgIdx.length && (b = this.tdImgIdx[0].img.up(".autobox"))) {
			var c = parseInt(b.getStyle("padding-right")) || 0;
			this.tdParams.set("w", b.getWidth() - (this.tdImgIdx[0].img.cumulativeOffset().left -
			b.cumulativeOffset().left) - c)
		} else this.tdParams.set("w", document.viewport.getWidth())
	};
	this.smaller = function() {
		for (i = this.tdSetSizes.length - 1; i >= 0; i--) {
			var b = this.tdSetSizes[i];
			if (!(b >= this.tdParams.get("size"))) {
				this.tdSizeChange(b);
				this.slider.el.style.left = this.fontSizeToSliderPosition(b) + "px";
				break
			}
		}
	};
	this.bigger = function() {
		for (i = 0; i < this.tdSetSizes.length; i++) {
			var b = this.tdSetSizes[i];
			if (!(b <= this.tdParams.get("size"))) {
				this.tdSizeChange(b);
				this.slider.el.style.left = this.fontSizeToSliderPosition(b) +
				"px";
				break
			}
		}
	};
	this.sliderPositionToFontSize = function(b) {
		b = b / (this.slider.trackWidth - this.slider.gnubbelWidth);
		if (b > 1)b = 1;
		if (b < 0)b = 0;
		b = Math.pow(b, 2);
		return Math.round(this.tdMinSize + b * (this.tdMaxSize - this.tdMinSize))
	};
	this.fontSizeToSliderPosition = function(b) {
		b = Math.sqrt((b - this.tdMinSize) / (this.tdMaxSize - this.tdMinSize));
		return Math.round(b * (this.slider.trackWidth - this.slider.gnubbelWidth))
	};
	this.drag_start = function(b) {
		if (!this.dragging) {
			b.stop();
			this.slider.trackLeft = this.slider.track.cumulativeOffset().left;
			this.dragging = {movefunc:this.drag_continue.bindAsEventListener(this),stopfunc:this.drag_end.bindAsEventListener(this),scrollel:false};
			if (this.docked) {
				this.dragging.scrollel = getFirstElementInViewport(this.tdImgIdx.pluck("img"));
				if (this.dragging.scrollel == $("pagebody"))this.dragging.scrollel = false
			}
			if (!this.slider.labelWidth) {
				this.slider.labelWidth = this.slider.label.getWidth();
				this.slider.label.style.width = this.slider.labelWidth + "px";
				this.slider.label.style.left = Math.floor(parseInt(this.slider.el.style.left) +
				this.slider.gnubbelWidth / 2 - this.slider.labelWidth / 2) + "px";
				this.slider.label.down(".pointy").style.left = Math.floor(this.slider.labelWidth / 2 - 5) + "px"
			}
			this.slider.label.show();
			Event.observe(document, "mousemove", this.dragging.movefunc);
			Event.observe(document, "mouseup", this.dragging.stopfunc);
			this.drag_continue(b)
		}
	};
	this.drag_continue = function(b) {
		if (this.dragging) {
			b.stop();
			b = b.pointerX() - this.slider.trackLeft;
			b -= this.slider.gnubbelWidth / 2;
			if (b < 0)b = 0;
			if (b > this.slider.trackWidth - this.slider.gnubbelWidth)b =
			this.slider.trackWidth - this.slider.gnubbelWidth;
			this.slider.el.style.left = b + "px";
			this.tdSizeSlide(this.sliderPositionToFontSize(b));
			this.dragging.scrollel && this.dragging.scrollel.scrollTo()
		}
	};
	this.drag_end = function(b) {
		if (this.dragging) {
			b.stop();
			Event.stopObserving(document, "mousemove", this.dragging.movefunc);
			Event.stopObserving(document, "mouseup", this.dragging.stopfunc);
			this.slider.label.hide();
			delete this.dragging;
			this.tdSizeChange(this.sliderPositionToFontSize(parseInt(this.slider.el.style.left)))
		}
	};
	this.enableSlider = function() {
		this.slider.track.observe("mousedown", this.drag_start.bindAsEventListener(this));
		$("size_slider").observe("click", function(b) {
			b = b.pointerX();
			if (b < this.slider.trackLeft)this.smaller(); else b > this.slider.trackLeft + this.slider.trackWidth && this.bigger()
		}.bindAsEventListener(this));
		$("size_slider").setStyle({opacity:1});
		this.slider.el.style.cursor = "ew-resize"
	};
	this.disableSlider = function() {
		this.slider.track.stopObserving("mousedown");
		$("size_slider").stopObserving("click");
		$("size_slider").setStyle({opacity:0.5});
		this.slider.el.style.cursor = "default"
	};
	this.setPermalink = function() {
		var b = window.location.protocol + "//" + window.location.host + window.location.pathname + "?testdrive=" + encodeURIComponent(this.tdParams.toQueryString()),c = $("testdrive_permalink");
		if (c) {
			c.href = b;
			c.stopObserving("click");
			c.observe("click", function(d) {
				d.stop();
				popupBox("<p>Here is a link to these sample text settings:</p><textarea style='width:400px;height:100px;'>" + b + "</textarea><input type='button' onclick='hidePopupBox();' value='Close'>");
				$("popup_box").down("textarea").activate()
			})
		}
	};
	this.addMenuChrome = function(b, c) {
		b.insert("<div class='borderdiv' style='width:" + (c.getWidth() - 10) + "px;'></div>");
		if (Prototype.Browser.IE && window.ieVersion < 7) {
			c.style.width = c.getWidth() - 22 + "px";
			b.style.width = b.getWidth() - 2 + "px";
			var d = b.down(".borderdiv");
			c = b.getWidth() - c.getWidth();
			b.style.left = -(c + 3) + "px";
			b.style.right = "";
			d.style.left = c + 2 + "px";
			d.style.right = ""
		}
		b.addClassName("chromed")
	};
	this.showMenu = function(b, c) {
		if (b && b.stop) {
			var d = b.element();
			if (!(d.hasClassName("menu_active") ||
			d.up(".menu_active"))) {
				b.stop();
				this.hideMenu(b, true);
				d.hasClassName("menu_trigger") || (d = d.up(".menu_trigger"));
				if (d) {
					this.hide_menu_func = c || this.hideMenu.bindAsEventListener(this, false);
					var e = d.down(".menu_pane");
					this.setPermalink();
					e.hasClassName("chromed") || this.addMenuChrome(e, d);
					d.addClassName("menu_active");
					if (!this.docked) {
						b = document.viewport.getHeight();
						c = document.viewport.getScrollOffsets().top;
						var f = d.cumulativeOffset().top;
						d = d.getHeight() + e.getHeight();
						f + d > c + b && new Effect.Scroll(window,
						{mode:"relative",y:Math.min(f + d - (c + b) + 10, f - c - 10),duration:1})
					}
					Event.observe("pagebody", "click", this.hide_menu_func)
				}
			}
		}
	};
	this.hideMenu = function(b, c) {
		if (this.hide_menu_func) {
			var d = this.hide_menu_func;
			delete this.hide_menu_func;
			d(b)
		}
		if (!(!c && b.element().up(".menu_pane"))) {
			$$("#testdrive_controls .menu_active").invoke("removeClassName", "menu_active");
			Event.stopObserving("pagebody", "click", this.hide_menu_func);
			c && b.stop()
		}
	}
}
var mfTestDrive = new mfTestDriveClass;
Prototype.Browser.WebKit ? Event.observe(window, "load", mfTestDrive.tdStart.bind(mfTestDrive)) : Event.observe(document, "dom:loaded", mfTestDrive.tdStart.bind(mfTestDrive));
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "scrollbar";
function scrollbarReleaseHandle(b) {
	Event.stopObserving(document.body, "mousemove", scrollbarDragHandle);
	Event.stopObserving(document.body, "mouseup", scrollbarReleaseHandle);
	scrollbarDragInfo.newrange && scrollbarShowRange(scrollbarDragInfo.newrange);
	return false
}
function scrollbarDragHandle(b) {
	var c = $(scrollbarDragInfo.handle);
	b = Event.pointerX(b);
	b = scrollbarDragInfo.mouse_delta = b - scrollbarDragInfo.mouse_down_position;
	b = Math.round(scrollbarDragInfo.original_handle_position_pixels + b);
	if (b < 0)b = 0; else if (b > scrollbarDragInfo.max_handle_position)b = scrollbarDragInfo.max_handle_position;
	c.style.left = b + "px";
	scrollbarDragInfo.current_position_ratio = b / (scrollbarDragInfo.totalwidth_pixels - scrollbarDragInfo.handle_width_pixels);
	b = Math.floor(scrollbarDragInfo.current_position_ratio *
	(scrollbarTotal - scrollbarDragInfo.ipp)) + 1;
	var d = b + scrollbarDragInfo.ipp - 1;
	scrollbarDragInfo.newrange = b + "-" + d;
	c.down().update(b + "-" + d + " of " + scrollbarTotal);
	return false
}
function scrollbarGrabHandle(b) {
	if (!Event.isLeftClick(b))return true;
	var c = $(Event.element(b));
	c.down() || (c = c.up());
	scrollbarDragInfo = {handle:c,mouse_down_position:Event.pointerX(b),original_handle_position_pixels:Position.positionedOffset(c)[0],handle_width_pixels:c.getWidth(),totalwidth_pixels:c.up().getWidth()};
	scrollbarDragInfo.max_handle_position = scrollbarDragInfo.totalwidth_pixels - scrollbarDragInfo.handle_width_pixels;
	c = scrollbarGetCurrentRange();
	if (!c)return false;
	c = /(\d+)-(\d+)/.exec(c);
	if (!c[1] ||
	!c[2])return false;
	scrollbarDragInfo.ipp = parseInt(c[2]) - parseInt(c[1]) + 1;
	Event.observe(document.body, "mousemove", scrollbarDragHandle);
	Event.observe(document.body, "mouseup", scrollbarReleaseHandle);
	scrollbarDragHandle(b);
	Event.stop(b);
	return false
}
function scrollbarClickBar(b) {
	var c = $(Event.element(b)),d = c.down(".handle"),e = Position.cumulativeOffset(d)[0],f = d.getWidth(),g = Math.floor(e + f / 2);
	scrollbarDragInfo = {handle:d,mouse_down_position:g,original_handle_position_pixels:Position.positionedOffset(d)[0],handle_width_pixels:f,totalwidth_pixels:c.getWidth()};
	g = scrollbarGetCurrentRange();
	if (!g)return false;
	g = /(\d+)-(\d+)/.exec(g);
	if (!g[1] || !g[2])return false;
	c = parseInt(g[2]);
	g = parseInt(g[1]);
	d = scrollbarDragInfo.ipp = c - g + 1;
	Event.pointerX(b) > e ? scrollbarShowRange(g +
	d + "-" + (c + d)) : scrollbarShowRange(Math.max(1, g - d) + "-" + Math.max(d, c - d));
	return false
}
function scrollbarSetNavStyles(b) {
	if (Element.extend(b))if (window.scrollbarTotal) {
		var c = b.down(".bar"),d = b.down(".handle"),e = b.down(".range");
		if (!(!c || !d || !e))if (b = scrollbarGetCurrentRange()) {
			e.update(b + " of " + window.scrollbarTotal);
			e = /(\d+)-(\d+)/;
			if (e.test(b)) {
				e = e.exec(b);
				b = parseInt(e[1]);
				e = parseInt(e[2]);
				if (b && e) {
					e = Math.min(e, window.scrollbarTotal);
					e = e - b + 1;
					if (e >= window.scrollbarTotal) {
						d.style.left = "0%";
						d.style.width = "100%"
					} else {
						var f = 100 * e / window.scrollbarTotal;
						f = Math.max(f, 4);
						d.style.width = f + "%";
						d.style.left = (100 - f) * (b - 1) / (window.scrollbarTotal - e) + "%";
						Event.observe(d, "mousedown", scrollbarGrabHandle);
						Event.observe(c, "mousedown", scrollbarClickBar)
					}
				}
			}
		}
	}
}
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "tag_game";
var tagGameEntries = $A(),tagGameLoading = false;
function tag_game_request_login(b) {
	document.observe("myfonts:loggedin", function() {
		tag_game_submit(b)
	});
	showPopupLogin("Please log in to continue the game.")
}
function tag_game_get_entries() {
	if (!tagGameLoading) {
		var b = {};
		if (window.location.search)b = window.location.search.toQueryParams();
		b.ajax = 1;
		tagGameLoading = true;
		new Ajax.Request("/games/tag/", {parameters:b,onSuccess:function(c) {
			tagGameLoading = false;
			c.responseJSON && $A(c.responseJSON).each(function(d) {
				window.tagGameEntries.push(d)
			})
		}})
	}
}
function tag_game_insert_new_entry() {
	var b = window.tagGameEntries.pop();
	if (b)if (b.tagID && b.font) {
		$("tag_game_the_tid").value = b.tagID;
		$("tag_game_the_uid").value = b.font.uniqueID;
		$("tag_game_the_font_sample").update(b.font.sampleImage);
		$("tag_game_the_tag").update(b.tag);
		$("tag_game_the_tag_description").update(b.tagDescription ? b.tagDescription : "");
		b = $("tag_game").down("form");
		b.select("input[type=submit]").each(function(c) {
			c.disabled = false
		});
		if ((b = b.down("input[type=submit][value=...]")) && /(yes|no|skip)_button/.test(b.className))b.value =
		RegExp.$1.capitalize();
		Behaviour.apply("tag_game")
	}
}
function tag_game_submit(b) {
	var c = $("tag_game").down("form");
	c.select("input[type=submit]").each(function(e) {
		e.disabled = true
	});
	var d = c.down("input[type=submit][value=" + b + "]");
	if (d)d.value = "...";
	d = window.tagGameEntries.size();
	if (d == 0)c.submit(); else {
		d <= 3 && tag_game_get_entries();
		d = c.serialize(true);
		d.ajax = 1;
		d.valid = b ? b : "Skip";
		$("tag_game_previous_details").hide();
		window.logged_in && setTimeout(tag_game_insert_new_entry, 500);
		new Ajax.Request(c.action, {parameters:d,onSuccess:function(e) {
			if (e.responseJSON) {
				e =
				e.responseJSON;
				$("tag_game_prev_font").href = e.font.myfontsURL;
				$("tag_game_prev_font").update(e.font.name);
				$("tag_game_prev_foundry").href = e.font.foundry.myfontsURL;
				$("tag_game_prev_foundry").update(e.font.foundry.name);
				$("tag_game_prev_tag").update(e.tag);
				$("tag_game_prev_vote").update(e.vote > 0 ? "Yes" : e.vote < 0 ? "No" : "Skip");
				$("tag_game_previous_details").show()
			} else {
				$("tag_game").update(e.responseText);
				Behaviour.apply("tag_game")
			}
		}})
	}
}
function tag_game_get_key(b) {
	switch (b.keyCode) {case Event.KEY_LEFT:case 89:return"Yes";case Event.KEY_RIGHT:case 78:return"No";case Event.KEY_DOWN:case Event.KEY_UP:case 83:return"Skip";default:return""
	}
}
Behaviour.register({"#tag_game":function() {
	Behaviour.RUN_EVERY_TIME.push("#tag_game");
	document.stopObserving("keydown");
	document.observe("keydown", function(b) {
		var c = tag_game_get_key(b);
		if (c) {
			b.stop();
			(b = $("tag_game").down("form").down("input[type=submit][value=" + c + "]")) && b.addClassName("active")
		}
	});
	document.stopObserving("keyup");
	document.observe("keyup", function(b) {
		var c = tag_game_get_key(b);
		if (c) {
			b.stop();
			if (b = $("tag_game").down("form").down("input[type=submit][value=" + c + "]")) {
				b.removeClassName("active");
				document.stopObserving("keydown");
				document.stopObserving("keyup");
				tag_game_submit(c)
			}
		}
	});
	window.tagGameEntries.size() || tag_game_get_entries()
},"#tag_game form":function(b) {
	b.observe("submit", function(c) {
		c.stop()
	})
},"#tag_game form input[type=submit]":function(b) {
	b.observe("click", function() {
		tag_game_submit(b.value)
	})
},"#tag_game_stats_refresh":function(b) {
	b.observe("click", function(c) {
		c.stop();
		$("tag_game_the_stats").update("&hellip;");
		new Ajax.Updater("tag_game_the_stats", "/games/tag/", {parameters:{ajax:1,
			action:"get_stats"}})
	})
}}, false, "tag_game");
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "more_like_this_sidebar";
function minibrowserWidget(b, c, d, e) {
	this.startIndex = -1;
	this.currentID = c;
	this.familyID = d;
	this.mode = e;
	this.element = $(b);
	this.gallery = this.element.down(".minibrowser_gallery");
	this.prevlink = this.element.down("a.prev_page");
	this.nextlink = this.element.down("a.next_page");
	this.allTiles = $A();
	this.numberOfTiles = 5;
	this.pendingIndex = this.currentIndex = this.firstIndex = 0;
	this.fontCount = this.lastIndex = -1;
	if ((b = this.gallery.select("li")) && b.length) {
		this.lastIndex = b.length - 1;
		for (i = 0; i < b.length; i++)this.allTiles[i] =
		b[i]
	}
	this.sliding = this.loading = false;
	this.previousRequests = {};
	this.slideOptions = {duration:0.25,transition:Effect.Transitions.sinoidal};
	this.element.select("a.minibrowser_nav").invoke("observe", "click", this.shift.bindAsEventListener(this))
}
a = minibrowserWidget.prototype;
a.loadTiles = function(b) {
	if (typeof b != "object") {
		if (!this.loading) {
			var c = {current_id:this.currentID,family_id:this.familyID,mode:this.mode};
			if (b == "next" && this.lastIndex >= 0)c.first = this.lastIndex + 1; else if (b == "prev" && this.firstIndex >= 0)c.last = this.firstIndex - 1; else if (this.pendingIndex >= 0) {
				c.first = Math.max(this.pendingIndex - this.numberOfTiles * 3, 0);
				c.last = this.pendingIndex + this.numberOfTiles * 3
			}
			if (typeof this.previousRequests[c.first + "-" + c.last] == "undefined") {
				this.loading = this.previousRequests[c.first +
				"-" + c.last] = true;
				new Ajax.Request("/widgets/more_like_this_sidebar/more_like_this_sidebar_server.php", {method:"post",parameters:c,onSuccess:this.loadTiles.bind(this)})
			}
		}
	} else {
		this.loading = false;
		if (b.responseJSON) {
			b = b.responseJSON;
			if (b.fonts && b.fonts.length) {
				c = parseInt(b.firstIndex);
				if (this.fontCount < 0) {
					this.firstIndex = this.lastIndex = c;
					if (this.pendingIndex < 0)this.pendingIndex = parseInt(b.requestedIndex);
					this.fontCount = parseInt(b.totalResults)
				} else this.firstIndex = Math.min(this.firstIndex, c);
				for (var d =
				0; d < b.fonts.length; d++)if (typeof this.allTiles[c + d] == "undefined") {
					var e = b.fonts[d],f = new Element("li");
					f.className = "minibrowser_tile";
					f.style.display = "none";
					f.update("<a href='" + e.myfontsURL + "'>" + e.sampleImage + "</a>");
					this.gallery.appendChild(f);
					this.allTiles[c + d] = f;
					this.lastIndex = Math.max(this.lastIndex, c + d)
				}
				this.allTiles.length && this.displayTiles()
			}
		}
	}
};
a.showTile = function(b) {
	b = this.allTiles[b];
	!b || b.visible() || new Effect.BlindDown(b, this.slideOptions)
};
a.hideTile = function(b) {
	(b = this.allTiles[b]) && b.visible() && new Effect.BlindUp(b, this.slideOptions)
};
a.displayTiles = function() {
	if (!this.allTiles.length || !this.allTiles[this.pendingIndex])this.loadTiles(); else if (this.pendingIndex != this.currentIndex) {
		for (i = this.currentIndex; i < this.currentIndex + this.numberOfTiles; i++)this.hideTile(i);
		for (i = this.pendingIndex; i < this.pendingIndex + this.numberOfTiles; i++)this.showTile(i);
		this.currentIndex = this.pendingIndex;
		this.currentIndex <= 0 ? this.prevlink.hide() : this.prevlink.show();
		this.currentIndex + this.numberOfTiles >= this.fontCount ? this.nextlink.hide() : this.nextlink.show()
	}
};
a.shift = function(b, c) {
	b && b.stop();
	if (!this.sliding) {
		if ((b = b.findElement("a")) && b.hasClassName("minibrowser_nav"))c = b.hasClassName("prev_page") ? -this.numberOfTiles : this.numberOfTiles;
		if (c = parseInt(c)) {
			b = this.currentIndex + c;
			if (b < 0)b = 0; else if (this.fontCount > 0 && b >= this.fontCount)b = this.fontCount - this.numberOfTiles;
			this.pendingIndex = b;
			this.displayTiles();
			if (c > 0)for (b = this.currentIndex + this.numberOfTiles; b < this.currentIndex + this.numberOfTiles * 2 && b < this.fontCount; b++)if (!this.allTiles[b]) {
				this.loadTiles("next");
				break
			}
			if (c < 0)for (b = this.currentIndex - this.numberOfTiles; b > this.currentIndex - this.numberOfTiles * 2 && b >= 0; b--)if (!this.allTiles[b]) {
				this.loadTiles("prev");
				break
			}
		}
	}
};
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "family_overview_header";
function wikifyArticleText(b) {
	b = b.replace(/^(\s*<div[^>]*>)+\s*/ig, "");
	b = b.replace(/<\/?div[^>]*>/i, "\n");
	b = b.replace(/<\/?p[^>]*>/ig, "\n\n");
	b = b.replace(/<a.*?\shref=['"]?([^\s'"]+)[^>]*>(.*?)<\/a>/ig, "[$1 $2]");
	b = b.replace(/<b>(.*?)<\/b>/ig, "'''$1'''");
	b = b.replace(/<i>(.*?)<\/i>/ig, "''$1''");
	b = b.replace(/\[\?more [^\]]+\]/, "");
	for (var c = /(<h(\d)[^>]*>(.*?)<\/h(\d)>)/i; c.test(b);) {
		var d = "=".times(RegExp.$2 - 2);
		b = b.replace(RegExp.$1, d + " " + RegExp.$3 + " " + d)
	}
	return b = b.replace(/\s*\n\s*\n\s*/g, "\n\n").strip()
}
Behaviour.register({"#family_article a.article_edit":function(b) {
	b.observe("click", function(c) {
		c.stop();
		var d = 0;
		if (/(\d+)/.test(b.up("div.article_edit").id))d = RegExp.$1;
		c = function() {
			var e = ["<form class='user_article_edit' method='post' action='./'>","<input type='hidden' name='edited_article_id' value='" + d + "'>","<p>Found a problem with the text? Submit it here and you'll see the correction immediately. If we agree with your changes we'll make it live!</p>\n<textarea name='edited_article'>",wikifyArticleText($("family_article_forreal").innerHTML),
				"</textarea>\n<div>Hint: Some Wikipedia-style formatting is supported, specifically <a href='http://en.wikipedia.org/wiki/Wikipedia:Tutorial_%28Formatting%29' target='_blank'>bold, italic, headings</a> and <a href='http://en.wikipedia.org/wiki/Wikipedia:Tutorial_%28Citing_sources%29' target='_blank'>links</a>.\n<div><input type='submit' value='Submit updated text'>&nbsp;&nbsp;&nbsp;<input type='reset' class='cancel' value='Cancel'></div>\n</form>"].join("\n");
			popupBox(e)
		};
		if (logged_in)c(); else {
			document.observe("myfonts:loggedin",
			c);
			showPopupLogin("Please sign in to edit font descriptions.")
		}
	})
},"#bling ul li":function(b) {
	var c = b.down();
	if (c.tagName == "IMG") {
		var d = b.getDimensions(),e = c.getDimensions();
		c.positionedOffset();
		c.style.top = Math.round((d.height - parseInt(b.getStyle("paddingBottom")) - e.height) / 2) + "px"
	}
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "facebook_like";
window.fbAsyncInit = function() {
	FB.init({appId:"115188275181513",status:true,cookie:true,xfbml:true})
};
Behaviour.register({"#fb-root":function(b) {
	var c = document.createElement("script");
	c.async = true;
	c.src = document.location.protocol + "//connect.facebook.net/en_US/all.js";
	b.appendChild(c)
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "reset_password_link";
function resetPasswordSuccess() {
	popupBox("<form id='reset_password_form'><div>You should receive an email from info@myfonts.com within a few minutes. If you don't see it soon, first check your spam filter! Then contact help@myfonts.com if you still don't see it anywhere.</div><div>Follow the instructions in the email to reset your password.</div><div id='reset_password_buttons'><input type='reset' value='I understand'></div></form>");
	var b = $$("#signin_form input[name=returnto]");
	if (b && b.length)b[0].value =
	"/my/settings/"
}
Behaviour.register({"#reset_password_link":function(b) {
	b.observe("click", function(c) {
		c.stop();
		popupBox("<form id='reset_password_form' method='post' action='/ajax-server/reset_password.php'><div>Please enter your email address and we&rsquo;ll send you a new password.</div><div>Email address: <input type='text' name='email'></div><div id='reset_password_buttons'><input type='submit' value='Reset password'> <input type='reset' value='Cancel'></div></form>")
	})
},"#reset_password_form input[type=reset]":function(b) {
	b.observe("click", hidePopupBox)
},
	"#reset_password_form":function(b) {
		Behaviour.RUN_EVERY_TIME.push("#reset_password_form");
		b.stopObserving("submit");
		b.observe("submit", function(c) {
			c.stop();
			c = b.serialize(true);
			new Ajax.Request(b.readAttribute("action"), {parameters:c})
		})
	}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "wtf_iphone";
Behaviour.register({"#wtf_iphone_support_content ul li a":function(b) {
	var c = b.up("li");
	/(#\w+)$/.test(b.href) && RegExp.$1 == window.location.hash && c.addClassName("active");
	b.observe("click", function() {
		c.hasClassName("active") ? c.removeClassName("active") : c.addClassName("active")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "album";
var albumRules = {"a.deleteAlbum":function(b) {
	b.onclick = function() {
		if (confirm("are you sure?"))return true;
		return false
	}
},"p.description.inplaceedit":function(b) {
	b.style.cursor = "pointer";
	new Ajax.InPlaceEditor(b, "/widgets/album/ajaxeditdesc.php", {clickToEditText:"Click here to edit the album description",cols:55,rows:4,highlightcolor:"transparent",highlightendcolor:"transparent",onComplete:function() {
		if (!b.empty() && !b.innerHTML.match("Click here to"))b.removeClassName("fresh"); else {
			b.innerHTML = "Click here to edit the album description";
			Element.addClassName(b, "fresh")
		}
	}});
	b.observe("click", function(c) {
		var d = $$(".editor_field")[0];
		b.hasClassName("fresh") && d.setValue("");
		c.stop()
	})
},"a#rename_album":function(b) {
	b.onclick = function() {
		$("rename_album").hide();
		$("edit_title").show();
		return false
	}
},"a#cancel_name_edit":function(b) {
	b.onclick = function() {
		$("edit_title").hide();
		$("rename_album").show();
		return false
	}
},"a#share_album_link":function(b) {
	b.observe("click", function(c) {
		c.stop();
		c = $("share_album_box").down("form");
		c.select("*[id]").each(function(d) {
			d.id =
			""
		});
		c.id = "";
		popupBox(c.cloneNode(true))
	})
},"input.album_permalink":function(b) {
	b.stopObserving("focus");
	b.observe("focus", function() {
		Form.Element.activate.defer(b)
	});
	b.stopObserving("keypress");
	b.observe("keypress", function(c) {
		c.stop()
	})
},"form.share_album_form input[type=reset]":function(b) {
	b.stopObserving("click");
	b.observe("click", hidePopupBox)
},"form.share_album_form":function(b) {
	if (!b.up(".side_column")) {
		b.stopObserving("submit");
		b.observe("submit", function(c) {
			c.stop();
			if ($A(b.getElementsByTagName("input")).inject(false,
								      function(d, e) {
									      if (d)return true;
									      if (!e.value.strip().length)return true;
									      return false
								      }))alert("Please fill in all the fields."); else {
				b.down("input[type=submit]").writeAttribute("disabled", true).value = "Sending...";
				c = b.serialize(true);
				c.ajax = 1;
				new Ajax.Request(b.action, {parameters:c,onSuccess:function(d) {
					if (d.headerJSON.success) {
						d.headerJSON.errmsg && alert(d.headerJSON.errmsg);
						hidePopupBox()
					} else {
						alert(d.headerJSON.errmsg);
						b.down("input[type=submit]").writeAttribute("disabled", false).value = "Send"
					}
				}})
			}
		})
	}
}};
Behaviour.register(albumRules);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "rating_bar";
var myfontsRatings = {};
function myfontsRatingBar(b) {
	this.translations = ["Click a star to rate.","You hate it.","You don&rsquo;t like it.","You like it.","You like it a lot.","It&rsquo;s a favorite."];
	this.widthFromRating = function(c) {
		return Math.round(this.width * c / this.max_rating) + "px"
	};
	this.ratingFromWidth = function(c) {
		return Math.round(this.max_rating * parseInt(c) / this.width)
	};
	this.max_rating = 5;
	this.el = $(b);
	this.unique_id = parseInt(this.el.id.replace("rating_stars_", ""));
	this.setPosition = function() {
		this.left = this.el.cumulativeOffset()[0];
		this.width = this.el.getWidth()
	};
	this.setPosition();
	Event.observe(window, "resize", this.setPosition.bind(this));
	this.avg_bar = this.el.down(".avg_rating");
	this.my_bar = this.el.down(".my_rating");
	this.hover_bar = this.el.down(".hover_rating");
	this.i_own_it = (this.box = this.el.up("div.rating_bar")) ? this.box.down("input.i_own_it") : false;
	this.rating_text = this.box ? this.box.down(".rating_text") : false;
	this.my_text = this.box ? this.box.down(".my_text") : false;
	this.clear_text = this.box ? this.box.down(".clear_text") : false;
	this.current_rating = this.my_bar ? this.ratingFromWidth(this.my_bar.getWidth()) : 0;
	this.hover_rating = 0;
	this.current_rating && this.avg_bar.hide();
	this.setRating = function(c, d) {
		this.hover_bar.hide();
		this.current_rating = c = parseInt(c);
		if (this.my_bar)this.my_bar.style.width = this.widthFromRating(c);
		if (c) {
			this.avg_bar.hide();
			this.clear_text && this.clear_text.show()
		} else {
			this.avg_bar.show();
			this.clear_text && this.clear_text.hide()
		}
		if (this.i_own_it)this.i_own_it.checked = d;
		this.my_text && this.my_text.update(this.translations[c])
	};
	this.enterFunc = function() {
		if (this.current_rating) {
			this.clear_text && this.clear_text.hide();
			this.my_bar.hide()
		} else this.avg_bar.hide();
		this.hover_bar.show()
	};
	this.moveFunc = function(c) {
		c = (c.pointerX() - this.left) / this.width;
		c = c > 1 ? this.current_rating : Math.ceil(c * this.max_rating);
		if (c != this.hover_rating) {
			this.hover_rating = c;
			this.hover_bar.style.width = this.widthFromRating(c);
			this.my_text && this.my_text.update(this.translations[this.hover_rating])
		}
	};
	this.exitFunc = function(c) {
		if (!Position.within(this.el, Event.pointerX(c),
		Event.pointerY(c))) {
			this.hover_rating = 0;
			this.hover_bar.hide();
			this.my_text && this.my_text.update(this.translations[this.current_rating]);
			if (this.current_rating) {
				this.my_bar.show();
				this.my_text && this.my_text.update(this.translations[this.current_rating]);
				this.clear_text && this.clear_text.show()
			} else this.avg_bar.show()
		}
	};
	this.doRating = function() {
		var c = this.unique_id,d = this.hover_rating,e = function() {
			new Ajax.Request("/ajax-server/rate.php?unique_id=" + c + "&rating=" + d)
		};
		Event.observe(document, "myfonts:loggedin",
		e);
		e()
	}
}
function ratingBarInitialMouseover() {
	this.up(".rating_container").stopObserving("mouseover", myfontsRatings[this.identify()]);
	delete myfontsRatings[this.identify()];
	var b = new myfontsRatingBar(this);
	Event.observe(this, "mouseover", b.enterFunc.bindAsEventListener(b));
	Event.observe(this, "mousemove", b.moveFunc.bindAsEventListener(b));
	Event.observe(this, "mouseout", b.exitFunc.bindAsEventListener(b));
	Event.observe(this, "click", b.doRating.bindAsEventListener(b));
	Prototype.Browser.WebKit && Event.observe(window, "load",
	b.setPosition.bind(b));
	window.myfontsRatings[b.unique_id] = b
}
var ratingBehaviour = {"div.rating_container":function(b) {
	var c = b.down("div.rating_stars");
	if (!c.hasClassName("static")) {
		c = myfontsRatings[c.identify()] = ratingBarInitialMouseover.bind(c);
		b.observe("mouseover", c)
	}
},"div.rating_bar a.clear":function(b) {
	var c = parseInt(b.up("div.rating_box").id.replace("rating_box_", ""));
	if (!c)return false;
	Event.observe(b, "mouseover", function() {
		if (myfontsRatings[c]) {
			myfontsRatings[c].my_bar.hide();
			myfontsRatings[c].avg_bar.show()
		}
	});
	Event.observe(b, "mouseout", function() {
		if (myfontsRatings[c]) {
			myfontsRatings[c].my_bar.show();
			myfontsRatings[c].current_rating && myfontsRatings[c].avg_bar.hide()
		}
	});
	Event.observe(b, "click", function(d) {
		Event.stop(d);
		if (!myfontsRatings[c])return false;
		if (myfontsRatings[c] && !myfontsRatings[c].current_rating)return false;
		new Ajax.Request("/ajax-server/rate.php?unique_id=" + c + "&rating=0")
	})
},"input.i_own_it":function(b) {
	b.observe("click", function() {
		var c = parseInt(this.up("div.rating_box").id.replace("rating_box_", ""));
		if (c)new Ajax.Request("/ajax-server/rate.php?unique_id=" + c + "&i_own_it=" + (this.checked ?
		1 : 0))
	})
}};
Behaviour.register(ratingBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "foundry";
Behaviour.register({"#foundry_page a.moreinfo":function(b) {
	b.observe("click", function(c) {
		c.stop();
		if ($("foundry_short_article")) {
			$("foundry_short_article").hide();
			$("foundry_full_article").show()
		}
		new Effect.BlindDown($("foundry_info"), {duration:0.5});
		$$("#foundry_page .hideme").invoke("hide")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "tag_admin";
Behaviour.register({"#tag_admin_table a.flag":function(b) {
	b.observe("click", function(c) {
		c.stop();
		new Ajax.Request(b.href, {onSuccess:function(d) {
			b.update(d.responseText)
		}})
	}.bindAsEventListener(b))
},"#tag_admin_table a.edit":function(b) {
	b.observe("click", function(c) {
		c.stop();
		b.hide().next("form").show()
	})
},"#tag_admin_table form":function(b) {
	b.observe("submit", function(c) {
		var d = b.down("input[type=submit]");
		d.disabled = true;
		d.value = "submitting...";
		b.select(".status").invoke("hide");
		new Ajax.Request(b.action,
		{parameters:b.serialize(true),onSuccess:function(e) {
			var f = b.down("input[type=submit]");
			b.select(".status").invoke("remove");
			switch (e.headerJSON.status) {case "success":b.down("input[name=new]").style.backgroundColor = "white";f.disabled = true;f.value = "updated";break;case "confirm":f.disabled = true;f.name = "confirm";f.value = "confirm";b.insert("<span class='status'><input type='hidden' name='confirm' value='1'><br>" + e.headerJSON.msg + " <input type='submit' value='confirm'> or <input type='reset' value='cancel'></span>");
				b.down("input[type=reset]").observe("click", function(g) {
					g.stop();
					b.select(".status").invoke("remove");
					g = b.down("input[name=new]");
					g.value = b.down("input[name=old]").value;
					g.style.backgroundColor = "white";
					f.value = "unchanged";
					f.disabled = true
				}.bindAsEventListener(b));break;default:f.disabled = true;f.value = "error";alert(e.headerJSON.msg);break
			}
		}});
		c.stop()
	}.bindAsEventListener(b))
},"#tag_admin_table form input[type=text]":function(b) {
	b.observe("keydown", function() {
		b.style.backgroundColor = "#FFCCCC";
		var c =
		b.next("input[type=submit]");
		c.name = "";
		c.value = "update";
		c.disabled = false;
		b.up("form").select(".status").invoke("remove")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "help";
Behaviour.register({"#help_form textarea":function() {
},"#help_form select[name=subject]":function(b) {
	var c = {history:"You can download your purchased fonts any time from your <a href='/my/orders/'>order history</a>.",license:"You can view the license for any font package by adding it to the cart.",quote:"You can get exact pricing information for any font (including multi-user site licenses) by adding it to your cart.",wtf:"Try <a href='/WhatTheFont/'>WhatTheFont</a> for identifying typefaces. It's better than we are! And if automatic WhatTheFont fails, you can post your question to the <a href='/WhatTheFont/forum/'>WhatTheFont forum</a>.",
		sell:"Please see the <a href='/info/prospectus/'>foundry prospectus</a> for info on joining MyFonts!",support:"Because most font questions require some time to research before we can give an accurate response. For example, for a question about an order, we need to look up your order, download the fonts, and test them in a similar environment to verify the problem and find solutions.<br><br>And, let's be honest, phone support is expensive! :)"};
	b.observe("change", function() {
		var d = b.options[b.selectedIndex];
		$("help_message");
		if (c[d.className]) {
			var e = c[d.className];
			if (window.location.search.indexOf("iframe") >= 0)e = e.replace("<a href='/", "<a target='_top' href='http://www.myfonts.com/");
			$("help_suggestion").update(e);
			$("help_suggestion_row").show()
		} else $("help_suggestion_row").hide();
		d.className == "other" ? b.up("tr").next().show().down("input").enable().activate() : b.up("tr").next().hide().down("input").disable()
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_webfonts";
Behaviour.register({"#testcase":function(b) {
	var c = b.getDimensions();
	$$("div.test_sample").each(function(d) {
		d = d.getDimensions();
		d.width == c.width && d.height == c.height && setTimeout(function() {
			testLoop(b, 1)
		}, 100)
	});
	b.up().hide()
}});
function testLoop(b, c) {
	var d = b.getDimensions();
	c = c;
	$$("div.test_sample").each(function(e) {
		var f = e.getDimensions();
		if (c > 5)e.up().setStyle({background:"#ff9999"}); else if (f.width == d.width && f.height == d.height) {
			c++;
			setTimeout(function() {
				testLoop(b, c)
			}, 100)
		}
	});
	b.up().hide()
}
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_tags";
var mytagsBehaviour = {"#old_tag_value":function(b) {
	b.observe("change", function() {
		$("new_tag_value").value = $F(this)
	})
}};
Behaviour.register(mytagsBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_payments_admin";
var payee_accounts = $H();
function foundryAdminResizeRoyaltyBox() {
}
function foundryAdminShowIntermediaryBank() {
	var b = $("intermediary_checkbox"),c = b.up("tr").visible() && b.checked;
	b.up("table").select("tr.intermediary").each(function(d) {
		c ? d.show().select("input, select").invoke("enable") : d.hide().select("input[type=text], select").invoke("clear").invoke("disable")
	})
}
function foundryAdminSelectPaymentMethod() {
	var b = $("payments_admin_payee_select"),c = $F(b);
	if (c == "")c = "missouri";
	b.up("table").select("tr").each(function(d) {
		if (d.hasClassName(c) || d.hasClassName("missouri") || c != "missouri" && d.hasClassName("all"))d.show().select("input, select").invoke("enable"); else if (d.visible()) {
			d.hide();
			d.select("input[type=text], select").invoke("clear").invoke("disable")
		}
	});
	foundryAdminChangeCountry();
	foundryAdminShowIntermediaryBank();
	if (payment_methods[c]) {
		b = parseInt(payment_methods[c].MinimumTransaction);
		$("minimum_payment_method").update(payment_methods[c].MethodName);
		$("minimum_payment_amount").update(parseInt(payment_methods[c].MinimumTransaction));
		$("minimum_payment_field").value = b
	}
}
function foundryAdminChangeCountry() {
	var b = $$("#rcpt_country_cell select")[0];
	$F(b) == "US" ? $("rcpt_tax_id_row").show() : $("rcpt_tax_id_row").hide()
}
function foundryAdminShowSuccessThing(b, c) {
	$("payments_admin_success_thing") || $("pagebody").insert(new Element("div", {id:"payments_admin_success_thing",style:"position:absolute;z-index:1000;padding:1em;background-color:white;border:1px solid #09F;"}));
	var d = $("payments_admin_success_thing");
	b || (b = "Success!");
	d.update(b);
	b = d.getDimensions();
	var e;
	if (!c || c == "window" || c == window || !$(c)) {
		d.style.position = "fixed";
		e = {top:0,left:0};
		c = document.viewport.getDimensions()
	} else {
		d.style.position = "absolute";
		e = $(c).cumulativeOffset();
		c = $(c).getDimensions()
	}
	d.setStyle({left:Math.round(e.left + (c.width - b.width) / 2) + "px",top:Math.round(e.top + (c.height - b.height) / 2) + "px"});
	new Effect.Appear(d, {duration:0.5});
	new Effect.Fade(d, {duration:0.5,delay:3})
}
Behaviour.register({"#payments_admin div.royalty_box":function(b) {
	foundryAdminResizeRoyaltyBox(b);
	Event.observe(window, "resize", foundryAdminResizeRoyaltyBox.curry(b))
},"#payments_admin_select_foundry":function(b) {
	b.observe("change", function() {
		$F(b) && b.up("form").submit()
	});
	b.up("form").down("input[type=submit]").remove()
},"#current_payees":function() {
},"#current_payees a.payee_edit, a#setup_missing_accounts":function(b) {
	b.observe("click", function(c) {
		c.stop();
		c = $("new_payee_form");
		var d = false,e = false;
		if (/=(\d+)/.test(b.href))d = RegExp.$1;
		if (d && payee_accounts[d])e = payee_accounts[d];
		var f = /newpayee\[(.*)\]/;
		c.getElements().each(function(h) {
			if (h.name && f.test(h.name)) {
				var j = RegExp.$1;
				if (e) {
					if (typeof e[j] != "undefined")if (h.type == "checkbox" || h.type == "radio")h.checked = e[j] == h.value; else h.hasClassName("default") || h.setValue(e[j])
				} else if (h.type == "checkbox" || h.type == "radio")h.checked = false; else h.hasClassName("default") || h.setValue("")
			}
		});
		if (e && e.IntermediaryBankName)$("intermediary_checkbox").checked =
		true;
		$("new_payee_link") && $("new_payee_link").hide();
		c.show();
		$("add_new_account_submit").value = e ? "Submit Changes" : "Add Account";
		foundryAdminSelectPaymentMethod();
		if (e && e.MinimumPayment)$("minimum_payment_field").value = e.MinimumPayment;
		new Effect.ScrollTo(c);
		new Effect.Highlight(c, {delay:0.1,duration:2});
		var g = /linkup\[(\w*)\]/;
		c.select("input[type=checkbox]").each(function(h) {
			if (h.name && g.test(h.name)) {
				var j = RegExp.$1;
				if (e)h.checked = typeof e[j] != "undefined" && typeof e[j][h.value] != "undefined"; else if (missing_accounts)h.checked =
				typeof missing_accounts[j][h.value] != "undefined"
			}
		})
	})
},"form.account_linkup input[type=checkbox]":function(b) {
	b.observe("change", function() {
		new Effect.Appear(b.up("form").down("input[type=submit]"))
	})
},"#new_payee_link":function(b) {
	b.observe("click", function(c) {
		c.stop();
		b.hide();
		$$(".add_account_showme").invoke("show")
	})
},"#payments_admin_payee_select":function(b) {
	foundryAdminSelectPaymentMethod();
	b.observe("change", foundryAdminSelectPaymentMethod)
},"#new_payee_form":function(b) {
	b.observe("submit",
		 function(c) {
			 c.stop();
			 c = b.serialize(true);
			 c.ajax_verify = 1;
			 new Ajax.Request(b.action, {method:"post",parameters:c,onSuccess:function(d) {
				 if (!d.responseJSON || d.responseJSON.success)return b.submit(); else {
					 var e = "";
					 $H(d.responseJSON.errors).each(function(f) {
						 var g = f.value;
						 if (typeof g == "string") {
							 b.getInputs("text", temp = "newpayee[" + f.key + "]").each(function(h) {
								 if (h.up("tr").visible()) {
									 h.blur();
									 h.addClassName("error");
									 h.observe("focus", function() {
										 this.removeClassName("error");
										 this.stopObserving("focus")
									 }.bindAsEventListener(h))
								 }
							 });
							 e += g + "\n"
						 }
					 });
					 alert(e)
				 }
			 }})
		 })
},"#rcpt_country_cell select":function(b) {
	foundryAdminChangeCountry();
	b.observe("change", foundryAdminChangeCountry.curry())
},"#intermediary_checkbox":function(b) {
	b.observe("click", foundryAdminShowIntermediaryBank)
},"a.status_meaning":function(b) {
	b.observe("click", function(c) {
		c.stop();
		popupBox("<h3>" + b.innerHTML + "</h3><p>" + status_meanings[b.innerHTML] + "</p>")
	})
},"#manual_payment_form select":function(b) {
	b.observe("change", function() {
		var c = $F("pa_manual_payee_field"),d = $F("pa_manual_month_field"),
		e = $F("pa_manual_year_field");
		if (c && d && e) {
			c = b.up("form");
			d = c.serialize(true);
			d.ajax = 1;
			d["manual_payment[action]"] = "lookup_only";
			new Ajax.Request(c.action, {method:"post",parameters:d,onSuccess:function(f) {
				f.responseJSON && $("pa_manual_amount_field").setValue(f.responseJSON).activate()
			}})
		}
	})
},"a.clicktoprocess":function(b) {
	b.observe("click", function(c) {
		c.stop();
		b.up("div.replace_to_process").update('Processing... <iframe src="' + b.href + '">You shouldn\'t see this, but if you do, click <a href="' + b.href +
		'">here</a> to process the payments.</iframe>')
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_albums";
var myAlbumRules = {"div.album_tile":function(b) {
	b.onmouseout = function() {
		window.status = ""
	};
	b.onmouseover = function() {
		var c = b.id.match(/_(\d+)$/)[1];
		window.status = "http://" + window.location.host + "/album/" + c + "/"
	};
	b.onclick = function() {
		var c = b.id.match(/_(\d+)$/)[1];
		window.location = "http://" + window.location.host + "/album/" + c + "/"
	}
},"a.deleteAlbum":function(b) {
	b.onclick = function() {
		if (confirm("Are you sure you want to delete this album?"))return true;
		return false
	}
},"div.album_title.inplaceeditor":function(b) {
	b.style.cursor =
	"pointer";
	new Ajax.InPlaceEditor(b, "/widgets/album/rename_album.php?mode=ajax", {clickToEditText:"edit album title",highlightcolor:"transparent",highlightendcolor:"transparent",onComplete:function() {
		if (!b.empty() && !b.innerHTML.match("Click here to"))b.removeClassName("fresh"); else {
			b.innerHTML = "edit album title";
			Element.addClassName(b, "fresh")
		}
	}});
	b.observe("click", function(c) {
		var d = $$(".editor_field")[0];
		b.hasClassName("fresh") && d.setValue("");
		c.stop()
	})
}};
Behaviour.register(myAlbumRules);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "pack_list";
var rightarrow = "&#x25B6;",downarrow = "&#x25BC;",pack_list_filters = {packs:$A()};
function makeIntersectionOfCheckedLists(b, c) {
	var d = $("pack_list_filter_" + c.key);
	if (!d || !d.checked)return b;
	return typeof b == "boolean" ? $A(c.value) : b.intersect($A(c.value))
}
function filterPackList(b) {
	if (window.pack_list_filters.packs) {
		var c = $H(window.pack_list_filters.packs).inject(false, makeIntersectionOfCheckedLists),d = $("pack_list_no_rows");
		if (!d) {
			d = new Element("div", {id:"pack_list_no_rows",style:"padding-top:12px;display:none;"});
			d.update("No packages are available that meet your strict criteria! Try selecting fewer format &amp; language filters.");
			b.insert({after:d})
		}
		if (typeof c == "boolean") {
			b.select("tr.pack_header_row").invoke("show");
			d.hide()
		} else {
			c.length ? d.hide() :
			d.show();
			b.select("tr.pack_header_row").each(function(e) {
				if (/_(\d+)$/.test(e.id))if (c.include(RegExp.$1))e.show(); else {
					e.hide();
					(e = e.next()) && e.hasClassName("pack_details_row") && e.hide()
				}
			})
		}
	}
}
Behaviour.register({"form.pack_list_filters":function(b) {
	if (window.pack_list_filters) {
		var c = $$("table.pack_list");
		if (c.length) {
			c = c[0];
			b = b.select("input[type=checkbox]");
			b.invoke("observe", "click", filterPackList.curry(c, b));
			filterPackList(c)
		}
	}
}});
function cartRowClick(b) {
	var c;
	if (b.findElement)c = b.findElement("tr"); else if (b.tagName && b.tagName == "TR")c = b; else if (b.up)c = b.up("tr");
	if (c) {
		var d = c.down("td.expando");
		if (d)d = d.down("span");
		if (!d && c.hasClassName("pack_webfont_row"))d = c.previous().down("td.expando").down("span");
		c = c.next("tr.pack_details_row");
		if (b.target)switch (b.target.tagName) {case "A":case "INPUT":case "SELECT":case "IMG":case "OPTION":return
		}
		if (!(!d || !d.innerHTML || !c))if (c.visible()) {
			c.hide();
			d.update(rightarrow)
		} else {
			b.stop &&
			b.stop();
			c.show();
			d.update(downarrow)
		}
	}
}
var packlistBehaviour = {"table.pack_list a.remove":function(b) {
	var c = new Element("img", {src:"/s/images/iconsets/myfonts/spinner.gif",alt:"spinner",style:"vertical-align: middle"});
	Behaviour.RUN_EVERY_TIME.push("table.pack_list a.remove");
	b.stopObserving("click");
	b.observe("click", function(d) {
		d.stop();
		removeItemFromCart(b);
		$$("#cart_page span.cart_subtotal").each(function(g) {
			var h = g.getDimensions();
			c.style.paddingRight = Math.floor((h.width - 20) / 2) + "px";
			c.style.paddingLeft = Math.ceil((h.width - 20) / 2) + "px";
			g.update(c)
		});
		d = b.up("tr");
		var e = /_(\d+)$/,f;
		do{
			if (!d)return;
			if (!e.test(d.identify()))return;
			if (!f)f = RegExp.$1;
			if (!f)return;
			if (RegExp.$1 != f)return;
			new Effect.Fade(d, {duration:0.25});
			d = d.next()
		} while (1)
	})
},"table.pack_list td":function(b) {
	Behaviour.RUN_EVERY_TIME.push("table.pack_list td");
	b.stopObserving("click");
	b.observe("click", cartRowClick.bindAsEventListener(b))
},"td.license a":function(b) {
	Behaviour.RUN_EVERY_TIME.push("td.license a");
	b.stopObserving("click");
	b.observe("click", function(c) {
		c.stop();
		popupBox("Loading license&hellip;");
		new Ajax.Request(b.href, {onSuccess:function(d) {
			var e = document.viewport.getDimensions(),f = Math.round(Math.min(e.width * 0.8, 640));
			e = Math.round(e.height * 0.75);
			popupBox("<div style='height:" + (e - 40) + "px;overflow:auto'>" + d.responseText + "</div><div style='text-align:center'><input type='reset' value='Close' onclick='hidePopupBox();'></div>", {width:f + "px",height:e + "px"})
		}})
	})
},"form.cart_item_replace":function(b) {
	Behaviour.RUN_EVERY_TIME.push("form.cart_item_replace");
	var c =
	    function(d) {
		    d.type == "submit" && d.stop();
		    d = b.serialize(true);
		    replaceCartContent(d)
	    };
	b.stopObserving("submit").observe("submit", c);
	b.select("select").invoke("stopObserving", "change").invoke("observe", "change", c);
	b.select("input[type=text]").each(function(d) {
		d.stopObserving("focus");
		d.observe("focus", function() {
			d.select.bind(d).defer();
			var e = d.next();
			if (!e || !e.hasClassName("submit_hint")) {
				e = new Element("div", {"class":"submit_hint smalltext",style:"display:none"});
				e.update("Hit Enter to submit");
				d.insert({after:e})
			}
			var f =
			d.getDimensions(),g = d.positionedOffset(),h = e.getDimensions();
			h.width || (h = {width:50,height:10});
			e.style.left = Math.round(g.left - h.width / 2 + f.width / 2) + "px";
			e.style.top = g.top + f.height + 6 + "px";
			new Effect.Appear(e, {duration:0.5});
			new Effect.Fade(e, {duration:0.5,delay:3.5})
		})
	})
},"table.pack_list a.nodownload":function(b) {
	b.observe("click", function(c) {
		c.stop();
		popupBox("<p>No download file is available for this package. It may have been removed from MyFonts at the request of the foundry. Sorry.</p><form style='text-align:center'><input type='button' value='Reluctantly acknowledge' onclick='hidePopupBox();'></form>")
	})
},
	"input.license_upgrade_button":function(b) {
		b.observe("click", function(c) {
			if (/_(\d+)$/.test(b.id)) {
				c.stop();
				if (b.hasClassName("cancel")) {
					b.removeClassName("cancel").value = "Upgrade";
					d = b.up("tr");
					do{
						d.select("td").invoke("setStyle", {borderLeft:"",borderRight:"",borderTop:"",borderBottom:""});
						d = d.next()
					} while (d && !d.hasClassName("pack_upgrade_row"));
					d && d.remove()
				} else {
					b.addClassName("cancel").value = "Cancel";
					c = RegExp.$1;
					var d = b.up("tr");
					d.select("td").invoke("setStyle", {borderTop:"2px solid #e58c18"});
					var e = d;
					do{
						e = d.select("td");
						e.first().setStyle({borderLeft:"2px solid #e58c18"});
						e.last().setStyle({borderRight:"2px solid #e58c18"});
						e = d;
						d = d.next("tr")
					} while (d && (!d.hasClassName("pack_header_row") || d.hasClassName("pack_webfont_row")));
					d = new Element("tr");
					var f = new Element("td");
					d.addClassName("pack_upgrade_row");
					d.insert(f);
					e.insert({after:d});
					d = e.select("td").inject(0, function(g, h) {
						h = parseInt(h.readAttribute("colspan"));
						return h > 0 ? g + h : g + 1
					});
					f.writeAttribute("colspan", d);
					f.setStyle({borderBottom:"2px solid #e58c18",
						borderLeft:"2px solid #e58c18",borderRight:"2px solid #e58c18",borderTopStyle:"none",paddingLeft:e.down("td").getWidth() + "px",backgroundColor:"white"});
					f.update("Looking up license details&hellip;");
					new Ajax.Request("/widgets/my_orders/my_orders.php", {parameters:{ajax:"1",action:"license_upgrade_form",skuid:c},onSuccess:function(g) {
						f.update(g.responseText);
						Behaviour.apply();
						g = f.cumulativeOffset().top;
						var h = f.getHeight(),j = document.viewport.getHeight(),m = document.viewport.getScrollOffsets().top;
						g +
						h >= m + j && new Effect.ScrollTo(f, {duration:1,offset:-(j - h) / 2})
					}})
				}
			} else alert("Missing some vital information. Please contact help@myfonts.com instead. Sorry.")
		})
	}};
Behaviour.register(packlistBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_webfonts_admin";
Behaviour.register({"div#secure_webfonts_admin a#show_faq":function(b) {
	b.observe("click", function(c) {
		$("show_faq").hide();
		$("webfonts_faq").show();
		c.stop()
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "frontpage_maincolumn";
function frontpageShowNewFonts(b) {
	b.sort(function() {
		return 0.5 - Math.random()
	});
	for (var c = "",d = 0; d < 5; d++)c += "<div class='newfont'><a href='" + b[d][1] + "'><img src='" + b[d][2] + "' width=" + b[d][3] + " height=" + b[d][4] + "></a></div>";
	$("newfonts").replace(c)
}
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "webfont_preview";
function mfWebfontPreviewClass() {
	this.method = "";
	this.UrlBase = "/widgets/webfont_preview/webfont_preview.php";
	this.webPStart = function() {
		if (!this.started) {
			var b;
			if (b = $("webfont_preview_drop0"))new Form.Element.EventObserver(b, this.selected.bind(this));
			if (b = $("webfont_preview_drop1")) {
				var c = {};
				window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(e, f, g) {
					c[f] = g
				});
				var d = new Option("Compare with...", "null");
				d.id = "mfwebPNull";
				new Insertion.Before($(b).down("OPTGROUP"), d);
				if (c.view != "compare")$("mfwebPNull").selected =
				true;
				new Form.Element.EventObserver(b, this.selectCompare.bind(this))
			}
			if (b = $("webfont_maxLink")) {
				b.hide();
				new Event.observe(b, "click", this.clear.bind(this))
			}
			return this.started = true
		}
	};
	this.clear = function() {
		if ($("webfont_preview_browser1").down("img")) {
			$("webfont_preview_browser1").down("img").remove();
			$("webfont_maxLink").hide();
			$("mfwebPNull").selected = true
		}
	};
	this.selected = function(b) {
		if (b.getValue() == "null")this.clear(); else new Ajax.Request(this.UrlBase, {method:"get",parameters:{browser0:$F(b.id),
			styleid:$F("styleid"),ajax:"true",view:"waterfall",mode:"single"},onSuccess:this.processResult(b).bind(this)})
	};
	this.selectCompare = function(b) {
		if (b.getValue() != "null") {
			$("webfont_maxLink").show();
			new Ajax.Request(this.UrlBase, {method:"get",parameters:{browser0:$F(b.id),styleid:$F("styleid"),ajax:"true",view:"waterfall",mode:"single"},onSuccess:this.processResult(b).bind(this)})
		} else {
			this.clear();
			$("webfont_maxLink").hide()
		}
	};
	this.processResult = function(b) {
		return function(c) {
			if (c)if (c.responseText.match(/error/))this.handleErrors(b.next("div"));
			else {
				b.next("div").down("div") && b.next("div").down("div").remove();
				c = c.responseText.evalJSON();
				this.updateFullIMG(c.data.url, c.data.browser, b.next("div"))
			}
		}
	};
	this.updateFullIMG = function(b, c, d) {
		c = $(d);
		if (c.hasChildNodes())c.down("img").src = b; else {
			d = document.createElement("img");
			d.src = b;
			c.appendChild(d)
		}
	};
	this.handleErrors = function(b) {
		var c = $(b);
		if (c.hasChildNodes()) {
			c.down("img").remove();
			$(b).insert({top:new Element("div", {className:"error"})});
			$(b).down("div").insert("Sorry this preview has not yet been generated")
		}
	}
}
var mfPreview = new mfWebfontPreviewClass;
Prototype.Browser.WebKit ? Event.observe(window, "load", mfPreview.webPStart.bind(mfPreview)) : Event.observe(document, "dom:loaded", mfPreview.webPStart.bind(mfPreview));
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_contract";
Behaviour.register({"a.go_back":function(b) {
	b.observe("click", function(c) {
		c.stop();
		history.go(-1)
	})
},"#contract_info_form":function(b) {
	b.observe("submit", function(c) {
		var d = $("payments_addendum_country_cell"),e = d ? $F(d.down("select")) : false,f = false;
		$A(b.getElements()).each(function(g) {
			if (g.type == "text") {
				var h = $F(g);
				g.removeClassName("error");
				var j = false;
				if (g.name.indexOf("[State]") != -1 || g.name.indexOf("[PostalCode]") != -1)if (e != "US" && e != "CA")j = true;
				if (!j && h == "") {
					f = true;
					g.addClassName("error");
					g.observe("focus",
						 function() {
							 g.removeClassName("error");
							 g.stopObserving("focus")
						 })
				}
			}
		});
		if (f) {
			c.stop();
			alert("Please fill in the remaining fields.")
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "minibrowser";
function minibrowserWidget(b, c, d, e) {
	this.startIndex = -1;
	this.currentID = c;
	this.familyID = d;
	this.mode = e;
	this.element = $(b);
	this.gallery = this.element.down(".character_gallery").update("");
	this.gnubbel = this.element.down(".gnubbel");
	this.gnubbelWidth = 0;
	this.scrollWidth = this.gnubbel.up().getWidth();
	this.allTiles = $A();
	this.numberOfTiles = 7;
	this.centerIndex = Math.floor(this.numberOfTiles / 2);
	this.fontCount = this.lastIndex = this.pendingIndex = this.currentIndex = this.firstIndex = -1;
	this.tileSizes = new Array(48, 36, 18, 1);
	this.tilePositions = [];
	this.keepgoing = this.sliding = this.loading = false;
	this.stopScrollingAt = -1;
	this.previousRequests = {};
	this.slideOptions = {duration:0.25,transition:Effect.Transitions.sinoidal};
	this.scrollingMessageIndex = 0;
	this.scrollingMessages = new Array("scrollin&rsquo; scrollin&rsquo; scrollin&rsquo;&hellip;", "keep them fonties scrollin&rsquo;&hellip;", "scrollin&rsquo; scrollin&rsquo; scrollin&rsquo;&hellip;", '<a href="/fonts/canadatype/rawhide/">Rawhide</a>!');
	Event.observe(this.element.down(".scroll_prev"),
	"mousedown", this.shift.bindAsEventListener(this, -1));
	Event.observe(this.element.down(".scroll_next"), "mousedown", this.shift.bindAsEventListener(this, 1));
	Event.observe(this.element.down(".scrollbar_background"), "mousedown", this.scrollbar_click.bindAsEventListener(this));
	Event.observe(this.gnubbel, "mousedown", this.drag_start.bindAsEventListener(this));
	b = Math.round(this.gallery.getWidth() / 2) - 2;
	for (c = 0; c <= this.centerIndex; c++) {
		d = 0;
		for (e = 1; e <= c; e++)d += this.tileSizes[e];
		d *= 1.2;
		this.tilePositions[this.centerIndex -
		c] = {width:this.tileSizes[c] + "px",height:this.tileSizes[c] + "px",left:Math.round(b - this.tileSizes[0] / 2 - d) + "px",top:Math.round((this.tileSizes[0] - this.tileSizes[c]) / 2) + "px"};
		if (c != 0)this.tilePositions[this.centerIndex + c] = {width:this.tileSizes[c] + "px",height:this.tileSizes[c] + "px",left:Math.round(b + this.tileSizes[0] / 2 + d - this.tileSizes[c]) + "px",top:Math.round((this.tileSizes[0] - this.tileSizes[c]) / 2) + "px"}
	}
	if (Prototype.Browser.IE) {
		b = this.gnubbel.up();
		c = b.up().getWidth() - parseInt(b.getStyle("left")) - parseInt(b.getStyle("right"));
		b.setStyle({width:c + "px"});
		this.scrollWidth = c
	}
}
a = minibrowserWidget.prototype;
a.loadTiles = function(b) {
	if (typeof b != "object") {
		if (!this.loading) {
			var c = {current_id:this.currentID,family_id:this.familyID,mode:this.mode};
			if (b == "next" && this.lastIndex >= 0)c.first = this.lastIndex + 1; else if (b == "prev" && this.firstIndex >= 0)c.last = this.firstIndex - 1; else if (this.pendingIndex >= 0) {
				c.first = Math.max(this.pendingIndex - this.numberOfTiles * 2, 0);
				c.last = Math.min(this.pendingIndex + this.numberOfTiles * 2, this.fontCount - 1)
			}
			if (typeof this.previousRequests[c.first + "-" + c.last] == "undefined") {
				this.previousRequests[c.first +
				"-" + c.last] = true;
				var d = this;
				this.loading = true;
				new Ajax.Request("/widgets/minibrowser/minibrowser_server.php", {method:"post",parameters:c,onSuccess:d.loadTiles.bind(d)})
			}
		}
	} else {
		this.loading = false;
		if (b.responseXML)if ((b = b.responseXML.getElementsByTagName("minibrowser")) && b.length) {
			var e = b[0];
			if ((b = e.getElementsByTagName("font")) && b.length) {
				c = parseInt(e.getAttribute("firstIndex"));
				if (this.firstIndex < 0) {
					this.firstIndex = this.lastIndex = c;
					this.pendingIndex = parseInt(e.getAttribute("requestedIndex"));
					this.fontCount =
					parseInt(e.getAttribute("totalResults"));
					if (this.fontCount > 0) {
						this.gnubbel.style.width = Math.max(15, Math.round(100 / this.fontCount)) + "%";
						this.gnubbel.show();
						this.gnubbelWidth = this.gnubbel.getWidth()
					}
				} else this.firstIndex = Math.min(this.firstIndex, c);
				for (e = 0; e < b.length; e++)if (typeof this.allTiles[c + e] == "undefined") {
					var f = new Element("div", {"class":"character_tile"});
					if (b[e].getElementsByTagName("url").length) {
						var g = b[e].getElementsByTagName("sample")[0].getElementsByTagName("img")[0],h = new Element("a",
						{href:(d = b[e].getElementsByTagName("url")[0].firstChild) && d.nodeValue,title:(d = b[e].getElementsByTagName("name")[0].firstChild) && d.nodeValue,"class":"tooltip"});
						g = new Element("img", {src:g.getAttribute("src"),alt:"a"});
						h.appendChild(g);
						f.appendChild(h)
					}
					$(f).setStyle(this.tilePositions[0]);
					this.gallery.appendChild(f);
					this.allTiles[c + e] = f;
					this.lastIndex = Math.max(this.lastIndex, c + e)
				}
				Behaviour.apply();
				this.allTiles.length && this.displayTiles()
			}
		}
	}
};
a.displayTiles = function() {
	if (!this.allTiles.length || !this.allTiles[this.pendingIndex])this.loadTiles(); else {
		this.hideOverlay();
		if (this.pendingIndex != this.currentIndex) {
			this.sliding = true;
			for (var b = this.pendingIndex - this.currentIndex,c = 0; c < this.numberOfTiles; c++) {
				var d = c - this.centerIndex,e = this.currentIndex + d;
				d = this.pendingIndex + d;
				var f;
				if ((f = this.allTiles[e]) && f.style.width != this.tilePositions[0].width)if (e < this.pendingIndex - this.centerIndex)f.morph(this.tilePositions[0], this.slideOptions); else e >
				this.pendingIndex + this.centerIndex && f.morph(this.tilePositions[this.numberOfTiles - 1], this.slideOptions);
				if (f = this.allTiles[d]) {
					if (Math.abs(b) > 1 && f.style.width == this.tilePositions[0].width && f.style.left != this.tilePositions[b > 0 ? this.numberOfTiles - 1 : 0].left)f.setStyle(this.tilePositions[b > 0 ? this.numberOfTiles - 1 : 0]);
					f.morph(this.tilePositions[c], this.slideOptions)
				}
			}
			this.currentIndex = this.pendingIndex;
			var g = this;
			setTimeout(function() {
				g.sliding = false
			}, this.slideOptions.duration * 1E3);
			this.fontCount > 0 && this.currentIndex >=
			0 && this.gnubbel.morph("left:" + (Math.round((this.scrollWidth - this.gnubbelWidth) * this.currentIndex / (this.fontCount - 1)) + "px"), this.slideOptions)
		}
	}
};
a.shift = function(b, c) {
	var d = this;
	if (b) {
		b.stop();
		this.stopfunc = function(f) {
			f.stop();
			this.keepgoing = false;
			this.stopScrollingAt = -1;
			this.slideOptions.transition = Effect.Transitions.sinoidal;
			Event.stopObserving(document, "mouseup", this.stopfunc);
			Event.stopObserving(b.target, "mouseout", this.stopfunc);
			delete this.stopfunc
		};
		Event.observe(document, "mouseup", this.stopfunc.bindAsEventListener(this));
		Event.observe(b.target, "mouseout", this.stopfunc.bindAsEventListener(this))
	}
	if (!this.sliding)if (c = parseInt(c)) {
		var e =
		this.currentIndex + c;
		if (e < 0) {
			e = 0;
			this.keepgoing = false
		} else if (e >= this.fontCount) {
			e = this.fontCount - 1;
			this.keepgoing = false
		} else this.keepgoing = true;
		this.pendingIndex = e;
		this.displayTiles();
		this.slideOptions.transition = Effect.Transitions.linear;
		setTimeout(function() {
			if (d.stopScrollingAt >= 0)if (c > 0 && d.currentIndex >= d.stopScrollingAt)d.keepgoing = false; else if (c < 0 && d.currentIndex <= d.stopScrollingAt)d.keepgoing = false;
			d.keepgoing && d.shift(null, c)
		}, this.slideOptions.duration * 1E3 + 10);
		if (c > 0)for (e = this.currentIndex +
		1; e < this.currentIndex + this.numberOfTiles && e < this.fontCount; e++)if (!this.allTiles[e]) {
			this.loadTiles("next");
			break
		}
		if (c < 0)for (e = this.currentIndex - 1; e > this.currentIndex - this.numberOfTiles && e >= 0; e--)if (!this.allTiles[e]) {
			this.loadTiles("prev");
			break
		}
	}
};
a.drag_start = function(b) {
	b.stop();
	if (!(this.fontCount <= 1)) {
		this.dragging = {mouseOrig:Event.pointerX(b),gnubbelOrig:parseInt(this.gnubbel.style.left) || 0,mousemove_func:this.drag_continue.bindAsEventListener(this),mouseup_func:this.drag_end.bindAsEventListener(this)};
		Event.observe(document, "mousemove", this.dragging.mousemove_func);
		Event.observe(document, "mouseup", this.dragging.mouseup_func);
		Prototype.Browser.Gecko && Event.observe(window, "mouseout", this.dragging.mouseup_func);
		this.drag_continue(b)
	}
};
a.drag_continue = function(b) {
	b.stop();
	if (this.dragging) {
		b = b.pointerX();
		var c = this.dragging.gnubbelOrig + b - this.dragging.mouseOrig;
		!this.overlay && b != this.dragging.mouseOrig && this.showOverlay(this.scrollingMessages[this.scrollingMessageIndex++ % this.scrollingMessages.length]);
		if (c < 0)c = 0; else if (c > this.scrollWidth - this.gnubbelWidth)c = this.scrollWidth - this.gnubbelWidth;
		this.gnubbel.style.left = c + "px"
	}
};
a.drag_end = function(b) {
	if (!(Prototype.Browser.Gecko && b.currentTarget == window && b.target && b.target.tagName != "HTML")) {
		b.stop();
		Event.stopObserving(document, "mousemove", this.dragging.mousemove_func);
		Event.stopObserving(document, "mouseup", this.dragging.mouseup_func);
		Prototype.Browser.Gecko && Event.stopObserving(window, "mouseout", this.dragging.mouseup_func);
		delete this.dragging;
		if (!(this.fontCount <= 0)) {
			this.pendingIndex = Math.floor(parseInt(this.gnubbel.style.left) / (this.scrollWidth - this.gnubbelWidth + 1) *
			this.fontCount);
			this.displayTiles()
		}
	}
};
a.scrollbar_click = function(b) {
	var c = b.pointerX(),d = this.gnubbel.cumulativeOffset()[0],e = d + this.gnubbelWidth,f = c - this.gnubbel.up().cumulativeOffset()[0];
	if (c < d) {
		this.stopScrollingAt = Math.floor(f / (this.scrollWidth - this.gnubbelWidth) * this.fontCount);
		this.shift(b, -(this.numberOfTiles - 3))
	} else if (c > e) {
		this.stopScrollingAt = Math.ceil((f - this.gnubbelWidth) / (this.scrollWidth - this.gnubbelWidth) * this.fontCount);
		this.shift(b, this.numberOfTiles - 3)
	}
};
a.showOverlay = function() {
	this.hideOverlay();
	this.gallery.setStyle({opacity:"0.2",filter:"alpha(opacity=20)"})
};
a.hideOverlay = function() {
	this.gallery.setStyle({opacity:"1",filter:"alpha(opacity=100)"})
};
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "tag_cloud_box";
Behaviour.register({"ul.tag_cloud_widget li.xtra":Element.hide,"ul.tag_cloud_widget a.xtra_link":function(b) {
	b.observe("click", function(c) {
		c.stop();
		b.up("ul").select("li.xtra").invoke("toggle");
		if (b.hasClassName("showing")) {
			b.removeClassName("showing");
			b.update("More&hellip;")
		} else {
			b.addClassName("showing");
			b.update("Less&hellip;")
		}
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "webfont_status";
function mfWebfontStatusClass() {
	this.webSStart = function() {
		if (!this.started) {
			var b;
			if (b = $$(".wfStatus_family_status"))b.each(function(c) {
				Event.observe(c, "click", function(d) {
					if (d = d.findElement("div").down("div"))d.visible() ? d.hide() : d.show()
				})
			});
			return this.started = true
		}
	}
}
var mfStatus = new mfWebfontStatusClass;
Prototype.Browser.WebKit ? Event.observe(window, "load", mfStatus.webSStart.bind(mfStatus)) : Event.observe(document, "dom:loaded", mfStatus.webSStart.bind(mfStatus));
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "info";
Behaviour.register({"#info_article ul":function(b) {
	b.addClassName("bullet")
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "searchfilter";
var searchfilter = {activeCriteria:[],criteriaParams:["param","operator","value"],nextIndex:0,classRE:/criterium_(\w+)/,getCriteriumFromRow:function(b) {
	if (!Element.extend(b))return{};
	if (!b.hasClassName || !b.hasClassName("criterium"))return{};
	var c = $H(),d = this;
	b.select("select,input").inject(c, function(e, f) {
		var g = d.classRE.exec(f.className)[1];
		e[g] = $F(f);
		return e
	});
	return c
},insertCriterium:function(b, c) {
	if (!b || !b.param)b = {param:"any field",value:""};
	var d = $("criterium_prototype_" + b.param.replace(/\W+/g,
	"_")).cloneNode(true);
	if (!Element.extend(d))return true;
	var e = this.nextIndex++;
	d.select("[id]").each(function(z) {
		z.id = ""
	});
	d.id = "criterium_" + e;
	d.removeClassName("prototype");
	d.addClassName("active_criterium");
	var f = this.activeCriteria.length;
	switch (c) {case "0":case "start":case "first":f = 0;break;case "end":case "last":f = this.activeCriteria.length;break;default:if (Element.extend(c) && c.hasClassName && c.hasClassName("criterium"))for (var g = 0; g < this.activeCriteria.length; g++) {
		if (this.activeCriteria[g].identify() ==
		c.identify()) {
			f = g;
			break
		}
	} else if (typeof c != "undefined" && parseInt(c))f = parseInt(c);if (typeof f != "number" || f < 0)f = 0;break
	}
	c = {};
	for (g = 0; g < this.criteriaParams.length; g++) {
		var h = this.criteriaParams[g],j = d.select(".criterium_" + h);
		if (j && j.length)if (j = j[0]) {
			j.setAttribute("name", j.getAttribute("name").replace("INDEX", e));
			j.disabled = false;
			c[h] = j;
			switch (j.tagName.toLowerCase()) {case "select":for (var m = 0; m < j.options.length; m++)if (j.options[m].value == b[h]) {
				j.selectedIndex = m;
				break
			}break;case "input":j.id = "criterium_value_" +
			e;j.value = b[h];break
			}
		}
	}
	b = $("searchfilter_criteria");
	f = f >= this.activeCriteria.length - 1 ? $("searchfilter_last_row") : this.activeCriteria[f + 1];
	b.insertBefore(d, f);
	try {
		h = d.down(".criterium_value");
		var q = d.down(".criterium_remove").positionedOffset().left,s = h.positionedOffset().left;
		h.style.width = q - s - 24 + "px"
	} catch(v) {
	}
	this.activeCriteria = $A(b.select(".active_criterium"));
	if (this.activeCriteria.length == 1) {
		this.activeCriteria[0].down("a.criterium_remove").style.visibility = "hidden";
		$("searchfilter_anyorall").style.visibility =
		"hidden"
	} else if (this.activeCriteria.length > 1) {
		this.activeCriteria[0].down("a.criterium_remove").style.visibility = "visible";
		$("searchfilter_anyorall").style.visibility = "visible"
	}
	Behaviour.apply()
},replaceCriterium:function(b) {
	this.insertCriterium(this.getCriteriumFromRow(b), b);
	this.removeCriterium(b)
},removeCriterium:function(b) {
	if (this.activeCriteria.length == 1)return false;
	if (!Element.extend(b))return true;
	if (!b.hasClassName("criterium"))return true;
	b.remove();
	this.activeCriteria = $("searchfilter_criteria").select(".active_criterium");
	if (this.activeCriteria.length == 1) {
		this.activeCriteria[0].down("a.criterium_remove").style.visibility = "hidden";
		$("searchfilter_anyorall").style.visibility = "hidden"
	}
	Behaviour.apply()
}},searchfilterBehaviour = {"#searchfilter_widget div.criterium:not(.prototype) select.criterium_param":function(b) {
	b.observe("change", function(c) {
		searchfilter.replaceCriterium(b.up(".criterium"));
		c.stop()
	})
},"#searchfilter_widget div.criterium:not(.prototype) a.criterium_add":function(b) {
	b.observe("click", function(c) {
		var d =
		b.up(".criterium"),e = searchfilter.getCriteriumFromRow(d);
		e.value = "";
		searchfilter.insertCriterium(e, d);
		c.stop()
	}.bindAsEventListener(b))
},"#searchfilter_widget div.criterium:not(.prototype) a.criterium_remove":function(b) {
	b.observe("click", function(c) {
		searchfilter.removeCriterium(b.up(".criterium"));
		c.stop()
	}.bindAsEventListener(b))
}};
if (Prototype.Browser.IE && ieVersion < 7)searchfilterBehaviour["#searchfilter_widget .criterium"] = function(b) {
	var c = b.getDimensions();
	b.style.height = parseInt(c.height * 0.6) + "px"
};
Behaviour.register(searchfilterBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "feedback";
Behaviour.register({"#testimonials #testimonials_add a":function(b) {
	b.onclick = function() {
		$("testimonials_addlink").hide();
		$("testimonials_editform").show();
		return false
	}
},"#testimonials form input[type=reset]":function(b) {
	b.onclick = function() {
		$("testimonials_addlink").show();
		$("testimonials_editform").hide();
		return true
	}
},"#testimonials form input[type=submit]":function(b) {
	b.onclick = function() {
		var c = b.up("form"),d = new Hash(c.serialize(true));
		new Ajax.Request("/feedback/testimonials/", {parameters:d,
			onSuccess:function() {
				c.reset();
				$("testimonials_addlink").show();
				$("testimonials_editform").hide();
				alert("Thank you for your comments. MyFonts staff will review and post it soon.")
			},onFailure:function(e) {
				alert(e.responseText)
			}});
		return false
	}
},"#dear_myfonts a.reply":function(b) {
	b.observe("click", function(c) {
		c.stop();
		c = b.up(".message").down("div.reply");
		var d = "";
		if (c)d = c.innerHTML;
		popupBox("<form class='dear_myfonts_reply' method='post' action='" + b.href + "'>Optional reply:<br><textarea name='reply' rows='8' cols='40'>" +
		d + "</textarea><br><br><input type='submit' value='Submit'> or <input type='reset' value='Cancel'></form>")
	})
},"form.dear_myfonts_reply input[type=reset]":function(b) {
	b.observe("click", function() {
		hidePopupBox()
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "secure_checkout";
function checkoutEditCC(b, c) {
	if (b = $("cc_form_" + b)) {
		$("choose_payment_method").show();
		$$("form.cc_entry_form").invoke("hide");
		$("finalize_your_order").update("Please choose a payment method above.");
		b.show().down("div.info_entry." + (c == "address" ? "nameOnCard" : "name") + " input").activate();
		new Effect.ScrollTo("choose_payment_method")
	}
}
function checkoutEditAddress(b) {
	if (b = $("address_form_" + b)) {
		$("choose_shipping_address").show();
		$("finalize_your_order").update("Please confirm your shipping information above.");
		$$("form.address_entry_form").invoke("hide");
		b.show().down("div.info_entry.name input").activate();
		new Effect.ScrollTo("choose_shipping_address")
	}
}
var checkoutBehaviour = {"a.edit_expiry_link":function(b) {
	b.observe("click", function(c) {
		var d = /=(.+)$/.exec(b.href)[1];
		if (d)if (d = $("edit_expiry_" + d)) {
			d.show();
			b.hide();
			c.stop()
		}
	})
},"input.cc_update_expiry":function(b) {
	b.observe("click", function() {
		var c = b.up("div.inline_expiry_update").id.match(/\d+/),d = $F(b.previous("select", 1)),e = $F(b.previous("select", 0));
		if (!(!c || !e || !d)) {
			e = e.substr(e.length - 2);
			new Ajax.Request("/ajax-server/update_cc.php", {parameters:{ccid:c,"update[expirationDate]":d + "/" + e},onSuccess:function(f, g) {
				if (g) {
					$$(".expiry_text_" + g.id).invoke("update", "Expires " + g.expirationDate);
					$$(".expiry_text_" + g.id).invoke("removeClassName", "warning");
					$("edit_expiry_" + g.id).hide()
				}
			}})
		}
	})
},"a.payment_method_link":function(b) {
	b.observe("click", function(c) {
		new Effect.ScrollTo($("choose_payment_method").show());
		c.stop()
	})
},"a.cc_edit_link":function(b) {
	b.observe("click", function(c) {
		checkoutEditCC(/=(.+)$/.exec(b.href)[1], b.up("#billing_address_cell") ? "address" : "cc");
		Event.stop(c)
	})
},"a.shipping_address_link":function(b) {
	b.observe("click",
		 function(c) {
			 new Effect.ScrollTo($("choose_shipping_address").show());
			 c.stop()
		 })
},"#shipping_address_list input[type=radio]":function(b) {
	b.observe("click", function() {
		var c = parseInt(b.value);
		if (!(c <= 0))window.location.search = "?update[addressid]=" + c
	})
},"a.address_edit_link":function(b) {
	b.observe("click", function(c) {
		checkoutEditAddress(/=(.+)$/.exec(b.href)[1]);
		c.stop()
	})
},"#shipping_rate_list input[type=radio]":function(b) {
	b.observe("click", function() {
		var c = parseInt(b.value);
		if (c)window.location.search =
		"?update[rateid]=" + c
	})
},"form.ajax_checkout_options":function(b) {
	var c,d,e;
	if (b.tagName == "FORM") {
		c = "submit";
		d = true;
		e = b;
		e.select("input.remember_on_blur").invoke("observe", "focus", function() {
			e.select("span.donedone").invoke("remove")
		})
	} else {
		c = "blur";
		d = false;
		e = b.up("form")
	}
	b.observe(c, function(f) {
		d && f.stop();
		f = e.serialize(true);
		f.ajax = 1;
		new Ajax.Request(e.action, {parameters:f,onSuccess:function(g) {
			if (g.responseJSON) {
				$H(g.responseJSON).each(function(h) {
					var j = e.getInputs("text", h.key);
					if (j && j.length)j[0].value =
					h.value
				});
				e.getInputs("submit").invoke("insert", {after:" <span class='donedone' style='color:#006600;'>Done!</span>"})
			}
		}})
	})
},"#submit_order_form":function(b) {
	b.observe("submit", function() {
		b.select("input[type=image], input[type=submit]").invoke("disable")
	})
},"#license_owner":function(b) {
	b.observe("keyup", function() {
		remember = $("remember_license_owner");
		if (!remember.visible()) {
			remember.show();
			new Effect.Highlight(remember, {duration:2})
		}
	})
}};
Behaviour.register(checkoutBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "family";
function delete_bling(b) {
	var c = b.id.match(/_(\d+)_(\d+)$/);
	b = c[1];
	c = c[2];
	confirm("Really delete suggestion?") && new Ajax.Request("http://" + window.location.host + "/ajax-server/admin_new_bling.php", {parameters:{mode:"delete",suggestionid:c,uniqueid:b},method:"get",onSuccess:function(d) {
		$("blinglist").innerHTML = d.responseText;
		Behaviour.apply()
	},onFailure:function(d) {
		alert("Can't save changes.\n\n" + d.responseText)
	}});
	return false
}
behaviourRules = {"#language_options_selection":function(b) {
	b.observe("click", function(c) {
		c = c.findElement("ul");
		var d = b.down("ul");
		if (!(c && c == d)) {
			$("language_options_dropdown_arrow").update(d.visible() ? "v" : "&times;");
			d.toggle()
		}
	})
},"form#admin_new_bling":function(b) {
	b.onsubmit = function() {
		var c = this.serialize(true);
		new Ajax.Request("http://" + window.location.host + "/ajax-server/admin_new_bling.php", {parameters:c,method:"get",onSuccess:function(d) {
			$("blinglist").innerHTML = d.responseText;
			$("admin_new_bling").reset();
			Behaviour.apply()
		},onFailure:function(d) {
			alert("Can't save changes.\n\n" + d.responseText)
		}});
		return false
	}
},"div#blinglist li a.bling_delete":function(b) {
	b.onclick = function() {
		delete_bling(b);
		return false
	}
},"#generate_new_webfonts_form ul ul input[type=checkbox]":function(b) {
	b.observe("click", function() {
		b.up("form").down("input[type=radio][name=newcrunch][value=crunch]").checked = true
	})
},"#webfont_debug_info":function(b) {
	b.down("a").observe("click", function(c) {
		c.stop();
		b.next().show()
	})
}};
Behaviour.register(behaviourRules);
Behaviour.RUN_EVERY_TIME.push("div#blinglist li a.bling_delete");
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "colorwheel";
function myfontsColorwheel(b) {
	this.init = function(c) {
		this.el = $(c);
		this.img = $(c).down("img");
		this.el.colorwheel = this;
		this.img.observe("mousemove", this.getMouseColor.bindAsEventListener(this));
		this.img.observe("click", this.getMouseColor.bindAsEventListener(this));
		this.img.observe("mouseout", this.el.fire.bind(this.el, "myfonts:colorwheel_mouseout"));
		if ((this.docked = this.el.up(".docked") ? true : false) && Prototype.Browser.IE && window.ieVersion < 7)this.docked = false;
		this.need_update = true
	};
	this.updatePosition = function() {
		this.imgPos =
		this.img.cumulativeOffset();
		if (this.docked) {
			this.need_update = true;
			var c = document.viewport.getScrollOffsets();
			this.imgPos[0] += c[0];
			this.imgPos[1] += c[1];
			this.imgPos.top += c.top;
			this.imgPos.left += c.left
		}
	};
	this.getRed = function(c) {
		c = c * 7;
		switch (Math.floor(c)) {case 0:case 1:return 1;case 2:return 3 - c;case 3:return 0;case 4:return 0;case 5:return c - 5;default:return 1
		}
	};
	this.getGreen = function(c) {
		c = c * 7;
		switch (Math.floor(c)) {case 0:case 1:return c / 2;case 2:return 1;case 3:return 1;case 4:return 5 - c;case 5:return 0;
			default:return 0
		}
	};
	this.getBlue = function(c) {
		c = c * 7;
		switch (Math.floor(c)) {case 0:case 1:case 2:return 0;case 3:return c - 3;case 4:return 1;case 5:return 1;case 6:return 7 - c;default:return 0
		}
	};
	this.coordToRGB = function(c, d) {
		var e = 0,f = Math.sqrt(c * c + d * d);
		if (c > 0 && d > 0)e = Math.atan(c / d); else if (c > 0 && d < 0)e = 0.5 * Math.PI + Math.atan(-d / c); else if (c < 0 && d < 0)e = 1 * Math.PI + Math.atan(-c / -d); else if (c < 0 && d > 0)e = 1.5 * Math.PI + Math.atan(d / -c); else if (d == 0)if (c > 0)e = Math.PI / 2; else {
			if (c < 0)e = 1.5 * Math.PI
		} else if (c == 0)if (d > 0)e = 0; else if (d <
		0)e = Math.PI;
		e /= 2 * Math.PI;
		c = this.getRed(e) * 255;
		d = this.getGreen(e) * 255;
		var g = this.getBlue(e) * 255;
		if (f > 1) {
			f = Math.min(1, Math.max(0, (1.37 - f) / 0.35));
			c = d = g = 255 * f;
			f = (Math.pow(f, 20) + 1) * 128 - 1;
			switch (Math.floor(e * 4)) {case 0:break;case 1:c = f;break;case 2:d = f;break;case 3:g = f;break
			}
		} else if (f <= 2 / 3) {
			c *= 1.5 * f;
			d *= 1.5 * f;
			g *= 1.5 * f
		} else {
			c += (255 - c) * 3 * (f - 2 / 3);
			d += (255 - d) * 3 * (f - 2 / 3);
			g += (255 - g) * 3 * (f - 2 / 3)
		}
		return{r:Math.round(c),g:Math.round(d),b:Math.round(g)}
	};
	this.getMouseColor = function(c) {
		if (!this.imgSize) {
			this.imgSize =
			this.img.getDimensions();
			this.docked && Event.observe(window, "scroll", this.updatePosition.bind(this))
		}
		if (this.need_update) {
			this.updatePosition();
			this.need_update = false
		}
		var d = (c.pointerX() - this.imgPos.left) / this.imgSize.width * 2 - 1,e = -((c.pointerY() - this.imgPos.top) / this.imgSize.height * 2 - 1);
		(d = this.coordToRGB(d, e)) && this.el.fire("myfonts:colorwheel_" + c.type, d)
	};
	this.init(b)
}
var colorwheelBehaviour = {"div.colorwheel_widget":function(b) {
	new myfontsColorwheel(b)
}};
Behaviour.register(colorwheelBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "my_settings";
function my_settings_edit(b) {
	var c = b.select(".hidden");
	c.invoke("removeClassName", "hidden");
	c.invoke("addClassName", "was_hidden");
	b.select(".original_value, td.edit a").invoke("addClassName", "hidden")
}
function my_settings_restore(b) {
	b.select(".hidden").invoke("removeClassName", "hidden");
	b.select(".was_hidden").invoke("addClassName", "hidden");
	b.select(".error").invoke("removeClassName", "error");
	b.select(".removeme").invoke("remove")
}
Behaviour.register({"#my_settings_table td.edit a":function(b) {
	b.observe("click", function(c) {
		my_settings_edit(b.up("tr"));
		c.stop()
	})
},"#my_settings_table a.editcard":function(b) {
	b.observe("click", function(c) {
		my_settings_edit(b.up("li"));
		c.stop()
	})
},"#my_settings_table a.removecard":function(b) {
	b.observe("click", function(c) {
		new Ajax.Request(b.href + "&section=payment&ajax=1", {method:"get",onSuccess:function(d) {
			b.up("tr").replace(d.responseText);
			Behaviour.apply()
		}});
		c.stop()
	})
},"#my_settings_table form input[type=reset]":function(b) {
	b.observe("click",
		 function() {
			 var c = b.up("li") || b.up("tr");
			 my_settings_restore(c)
		 })
},"#my_settings_table form":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#my_settings_table form");
	b.stopObserving("submit");
	b.observe("submit", function(c) {
		b.up("tr").select(".error").invoke("removeClassName", "error");
		b.up("tr").select(".removeme").invoke("remove");
		var d = b.serialize(true);
		d.ajax = 1;
		new Ajax.Request(b.readAttribute("action"), {parameters:d,onSuccess:function(e) {
			if (e.headerJSON && e.headerJSON.errmsg) {
				b.show();
				var f;
				if (f = b.next("img.spinner32"))f.remove();
				e.headerJSON.fields && $(Object.keys(e.headerJSON.fields)).each(function(g) {
					var h = e.headerJSON.fields[g];
					if (g = b.down("div." + g)) {
						h && g.insert("<span class='error removeme'><br>" + h + "</span>");
						(g = (temp = g.down(".label")) ? temp : g.up("tr").down("td.label")) && g.addClassName("error")
					}
				});
				alert(e.headerJSON.errmsg)
			} else {
				b.up("tr").replace(e.responseText);
				Behaviour.apply()
			}
		},onFailure:function(e) {
			alert("An error occurred saving your changes.\n\n" + e.responseText);
			if (e = b.next("img.spinner32"))e.remove();
			e = b.up("li") ||
			b.up("tr");
			my_settings_restore(e)
		}});
		b.hide();
		b.insert({after:"<img src='/images/iconsets/myfonts/spinner.gif' alt='working' class='spinner32'>"});
		c.stop()
	})
},"#my_settings_delete_account":function(b) {
	b.observe("click", function(c) {
		var d = b.href.toQueryParams().removeaccount;
		popupBox("<form method='post' action='.' style='font-size:larger;width:350px;height:100px;'><input type='hidden' name='removeaccount' value='" + d + "'><input type='hidden' name='seriously' value='1'>Seriously?<br><br><input type='submit' value='Yes, delete my account'> or <input type='reset' onclick='hidePopupBox();' value=\"No, I'll keep it\"></form>");
		c.stop()
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "add_to_cart_button";
function askAboutCartPrefs(b) {
	var c = "<form class='cart_choose_params_popup'><div>This font offers a choice of licenses.</div>";
	if (b.clear)c += "<input type='hidden' name='id1' value='" + b.clear + "'>";
	c += "<div>Please choose: <select name='id2'>";
	$H(b).each(function(d) {
		var e = d.key;
		d = d.value;
		if (e != "clear")c += "<option value='" + d.id + "'>" + e.capitalize() + " use: " + d.price + "</option>"
	});
	c += "</select></div>";
	c += "<div class='buttons'><input type='submit' value='Add to Cart'> <input type='reset' value='Cancel'></div></form>";
	popupBox(c)
}
Behaviour.register({"a.add_to_cart":function(b) {
	if (/\[id\]=(\d+)/.test(b.href)) {
		var c = RegExp.$1,d = "skuset";
		if (/type=([^&]+)/.test(b.href))d = RegExp.$1;
		d == "skuset" && mfCartSkuSetIDs && mfCartSkuSetIDs.include(c) ? swapCartIcon(b) : b.observe("click", function(e) {
			e.stop();
			window.lastClickedCartButton = b;
			params = {command:"add",id:c,type:d};
			if (b.hasClassName("confirm"))params.confirm = "1";
			cartAjaxCall(params)
		})
	}
},"form.cart_choose_params_popup":function(b) {
	b.observe("submit", function(c) {
		c.stop();
		c = b.serialize(true);
		if (c.id2) {
			c = c.id1 ? c.id1 + "," + c.id2 : c.id2;
			var d = b.down("input[type=submit]");
			d.disabled = true;
			d.value = "Adding...";
			cartAjaxCall({command:"add",id:c,confirm:1})
		} else {
			alert("Couldn't find the item number. Our bad!");
			hidePopupBox()
		}
	})
},"form.cart_choose_params_popup input[type=reset]":function(b) {
	b.observe("click", hidePopupBox)
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "whats_new";
var whatsnewsubmit = function() {
	window.location.pathname = "/whatsnew/" + $F("whatsnewtime") + "/";
	return false
},whatsnewBehaviour = {"#monthselectform":function(b) {
	b.onsubmit = whatsnewsubmit
},"#monthselectform select":function(b) {
	b.onchange = whatsnewsubmit
}};
Behaviour.register(whatsnewBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "article_tease";
Behaviour.register({"a.article_tease_more":function(b) {
	b.observe("click", function(c) {
		c.stop();
		b.hide();
		b.up("div.article_tease_container").select("p").invoke("show")
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "fontalbums";
var albumFontID,albumFontType,albumAlbumID,albumMenuDiv,albumMenuForm;
function addToAlbum(b) {
	b && b.type && b.type == "click" && b.stop();
	if (Element.extend(this) && this.id)if ((b = $A(/add_([A-Za-z]+)_(\d+)_to_album_(\d+)/.exec(this.id))) && b.size() >= 3) {
		albumFontID = b[2];
		albumFontType = b[1];
		albumAlbumID = b[3]
	}
	if (!(!albumFontID || !albumFontType || !albumAlbumID)) {
		this.tagName && this.tagName == "A" && this.update("Adding&hellip;");
		new Ajax.Request("/widgets/fontalbums/ajaxaddtoalbum.php", {method:"post",parameters:{id:albumFontID,idtype:albumFontType,aid:albumAlbumID},onSuccess:function(c) {
			popupBox(c.responseText)
		}});
		return false
	}
}
function albumLogin() {
	showPopupLogin("Please log in to use albums.");
	Event.observe(document, "myfonts:loggedin", function() {
		showAddToAlbumMenu.delay(0.25)
	})
}
function deleteFromAlbum(b) {
	b && b.type && b.type == "click" && b.stop();
	if (Element.extend(this) && this.id)if ((b = $A(/delete_([A-Za-z]+)_(\d+)_from_album_(\d+)/.exec(this.id))) && b.size() >= 3) {
		albumFontID = b[2];
		albumFontType = b[1];
		albumAlbumID = b[3]
	}
	if (!(!albumFontID || !albumFontType || !albumAlbumID)) {
		var c = true;
		if (this.tagName && this.tagName == "A")this.update("Removing&hellip;"); else {
			hidePopupBox();
			c = false
		}
		new Ajax.Request("/widgets/fontalbums/ajaxdeletefromalbum.php", {method:"post",parameters:{id:albumFontID,idtype:albumFontType,
			aid:albumAlbumID},onSuccess:function() {
			c && populateAlbumList({id:albumFontID,type:albumFontType})
		}});
		return false
	}
}
function populateAlbumList(b) {
	$("addToAlbumMenuBody") && new Ajax.Request("/widgets/fontalbums/ajaxalbumlist.php", {parameters:b,onSuccess:function(c) {
		if (!/javascript/i.test(c.getHeader("Content-type"))) {
			$("addToAlbumMenuBody").update(c.responseText);
			Behaviour.apply()
		}
	}})
}
function showAddToAlbumMenu(b) {
	b && b.type && b.type == "click" && b.stop();
	if (this.id)if ((b = $A(/([A-Za-z]+)_(\d+)/.exec(this.id))) && b.size() >= 2) {
		albumFontID = b[2];
		albumFontType = b[1]
	}
	if (albumFontID && albumFontType)if (window.logged_in) {
		if (!window.albumMenuDiv || !window.albumMenuForm) {
			window.albumMenuDiv = $("addToAlbumMenu");
			window.albumMenuForm = $("addToAlbumMenuNewAlbum")
		}
		if (!window.albumMenuDiv || !window.albumMenuForm) {
			new Ajax.Request("/widgets/fontalbums/fontalbums.php", {method:"get",onSuccess:function(c) {
				$("pagebody").insert(c.responseText);
				showAddToAlbumMenu()
			}});
			return false
		}
		$("addToAlbumMenuBody").update("Loading&hellip;");
		popupBox(window.albumMenuDiv);
		populateAlbumList({type:albumFontType,id:albumFontID});
		return false
	} else albumLogin()
}
var addToAlbumBehaviour = {"a.add_to_album, a.addToAlbum":function(b) {
	b.addClassName("opener");
	b.stopObserving("click");
	b.observe("click", showAddToAlbumMenu.bindAsEventListener(b))
},"#createAlbum":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#createAlbum");
	b.stopObserving("click");
	b.observe("click", function(c) {
		c.stop();
		popupBox(window.albumMenuForm)
	})
},"#newAlbumToggleClose":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#newAlbumToggleClose");
	b.stopObserving("click");
	b.observe("click", function(c) {
		c.stop();
		popupBox(window.albumMenuDiv)
	})
},"form#addToAlbumMenuNewAlbum":function(b) {
	Behaviour.RUN_EVERY_TIME.push("form#addToAlbumMenuNewAlbum");
	b.stopObserving("submit");
	b.observe("submit", function(c) {
		c.stop();
		params = b.serialize(true);
		params.id = window.albumFontID;
		params.idtype = window.albumFontType;
		new Ajax.Request("/widgets/fontalbums/ajaxaddtoalbum.php", {method:"post",parameters:params,onSuccess:function(d) {
			popupBox(d.responseText)
		}})
	})
},"#addToAlbumMenu input.cancel, #addToAlbumConfirmedButtons input.ok_button":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#addToAlbumMenu input.cancel, #addToAlbumConfirmedButtons input.ok_button");
	b.stopObserving("click");
	b.observe("click", hidePopupBox.bindAsEventListener(b))
},"#addToAlbumMenu li.available a":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#addToAlbumMenu li.available a");
	b.stopObserving("click");
	b.observe("click", addToAlbum.bindAsEventListener(b))
},"#addToAlbumMenu li.unavailable a, #addToAlbumConfirmedButtons input.undo_button":function(b) {
	Behaviour.RUN_EVERY_TIME.push("#addToAlbumMenu li.unavailable a, #addToAlbumConfirmedButtons input.undo_button");
	b.stopObserving("click");
	b.observe("click", deleteFromAlbum.bindAsEventListener(b))
}};
Behaviour.register(addToAlbumBehaviour);
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "admin_choose_foundry";
var el = $("admin_select_foundry"),searchLimit = 15,i = 0;
function autoCompleteSelector(b, c, d) {
	b = $(b);
	var e = b.select("[class=" + c + "_selected]");
	if (d)if (e[0]) {
		if (e[0] && e[0].previousSibling) {
			e[0].previousSibling.className += "_selected";
			e[0].className = c
		}
	} else b.down().lastChild.className += "_selected"; else if (!e[0] && b.down(1))b.down(1).className += "_selected"; else if (e[0] && e[0].nextSibling) {
		e[0].nextSibling.className += "_selected";
		e[0].className = c
	}
}
function AutoCompleteFound(b) {
	if (b.value.length > 1) {
		var c = $("admin_select_foundry_auto_complete");
		c = $("admin_select_foundry_auto_complete_ul");
		var d = new RegExp(encodeURIComponent(b.value), "i");
		for (var e in foundList) {
			var f = encodeURIComponent(e);
			if (i >= searchLimit) {
				f = c.childElements();
				var g = f.length;
				for (a = 0; a < g; a++) {
					var h = encodeURIComponent(f[a].innerHTML);
					if (!d.test(h)) {
						f[a].parentNode.removeChild(f[a]);
						i--
					}
				}
				break
			}
			if (d.test(f) && !document.getElementById(foundList[e]) && i <= searchLimit) {
				f = document.createElement("li");
				f.onclick = function() {
					b.value = this.firstChild.innerHTML;
					var j = document.createElement("input");
					j.type = "hidden";
					j.value = this.id;
					j.name = "id";
					b.parentNode.appendChild(j);
					b.parentNode.submit()
				};
				g = document.createElement("div");
				g.id = e;
				g.appendChild(document.createTextNode(e));
				f.appendChild(g);
				g = /^f/.test(foundList[e]) ? "foundry" : "referrer";
				h = document.createElement("div");
				f.appendChild(h);
				h.appendChild(document.createTextNode(foundName[foundList[e]] + " - " + g));
				f.className = "auto_complete_li";
				f.id = foundList[e];
				c.appendChild(f);
				i++
			}
			f = c.childElements();
			g = f.length;
			for (a = 0; a < g; a++) {
				h = encodeURIComponent(f[a].innerHTML);
				if (!d.test(h)) {
					f[a].parentNode.removeChild(f[a]);
					i--
				}
			}
		}
	} else {
		c = $("admin_select_foundry_auto_complete");
		e = $("admin_select_foundry_auto_complete_ul");
		e.parentNode.removeChild(e);
		e = document.createElement("ul");
		e.id = "admin_select_foundry_auto_complete_ul";
		c.appendChild(e);
		i = 0
	}
}
function toggleAutoComp(b) {
	var c = $("admin_select_foundry_auto_complete");
	if (c)c.style.display = b ? "block" : "none"
}
Behaviour.register({"#admin_choose_foundry":function(b) {
	var c = b.down("input");
	c.observe("keydown", function(d) {
		if (d.keyCode == Event.KEY_RETURN && c.value.length != 0) {
			d = $$("li.auto_complete_li_selected")[0];
			c.value = foundName[d.id];
			var e = document.createElement("input");
			e.type = "hidden";
			e.value = d.id;
			e.name = "id";
			b.appendChild(e)
		}
	});
	c.observe("keyup", function(d) {
		if (c.value.length > 1) {
			toggleAutoComp(true);
			if (d.keyCode == Event.KEY_UP)autoCompleteSelector("admin_select_foundry_auto_complete", "auto_complete_li", true);
			else d.keyCode == Event.KEY_DOWN ? autoCompleteSelector("admin_select_foundry_auto_complete", "auto_complete_li", false) : setTimeout(function() {
				AutoCompleteFound(c)
			}, 400)
		} else toggleAutoComp(false)
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "add_bling";
Behaviour.register({"a.add_bling":function(b) {
	b.observe("click", function(c) {
		c.stop();
		if (!window.add_bling_form)window.add_bling_form = $("add_bling_form");
		window.add_bling_form ? popupBox(window.add_bling_form.show()) : alert("Error finding bling form.")
	})
},"form.add_bling_form":function(b) {
	b.observe("submit", function(c) {
		if (b.getInputs("text", "newinfo[AwardName]")[0].value.strip() == "") {
			c.stop();
			alert("Please fill in a name.")
		}
	})
},"form.add_bling_form input[type=reset]":function(b) {
	b.observe("click", hidePopupBox)
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "family_metadata_edit";
Behaviour.register({"ul.family_metadata a.metadata_update":function(b) {
	b.observe("click", function(c) {
		c.stop();
		var d = b.href.toQueryParams();
		d.ajax = 1;
		if (c = b.up("span"))d.span = c.identify();
		if (!d.metadata_cmd)return alert("unable to find command.");
		if (d.metadata_cmd == "add") {
			new Ajax.Request("/widgets/family_metadata_edit/metadata.php", {parameters:{ajax:1,check_site:1}});
			var e = b.next("form.metadata_update");
			if (e) {
				e.select("input.metadata_autocomplete").each(function(f) {
					var g = new Element("div", {"class":"auto_complete"});
					e.insert(g);
					new Ajax.Autocompleter(f, g, "/widgets/family_metadata_edit/autocomplete.php", {paramName:"q",frequency:0.2,parameters:"type=" + d.type})
				});
				e.show().down("input[type=text]").activate();
				return
			}
		}
		new Ajax.Request("/widgets/family_metadata_edit/metadata.php", {parameters:d})
	})
},"form.metadata_update input[type=reset]":function(b) {
	b.observe("click", function() {
		b.up("form").hide()
	})
}});
window.BEHAVIOUR_WIDGET = null;
window.BEHAVIOUR_WIDGET = "tags";
var tagsAutocompleter = {},tagsAutocompleteOptions = [];
function cacheMyTags() {
	tagsAutocompleteOptions.length || new Ajax.Request("/ajax-server/mytags.php")
}
function addTags() {
	Element.extend(this);
	if (this.up)if (this.up("div.tags_widget")) {
		var b = /(\d+)/.exec(this.up("div.tags_widget").id)[1];
		if (b) {
			window.lastClickLocation = Position.cumulativeOffset(this);
			var c,d;
			if (this.tagName == "FORM") {
				d = this.serialize(true);
				d.addMethod = "add"
			} else if (c = this.up().down("span.tag"))d = {tagProposeInput:c.innerHTML,isHTML:"1",addMethod:"agree",tagPublic:"1"}; else {
				alert("Couldn't find tag.");
				return false
			}
			if (!d || !d.bulk && d.tagProposeInput == "")return false;
			d.unique_id = b;
			if (this.hasClassName("remove"))d.remove =
			1;
			if (this.hasClassName("disagree"))d.disagree = 1;
			new Ajax.Request("/ajax-server/addtags.php", {method:"post",parameters:d,onSuccess:function(e) {
				if (!(e.getResponseHeader("Content-Type").indexOf("javascript") >= 0)) {
					$("tags_widget_" + b).replace(e.responseText);
					tagsAutocompleter[b] = null;
					Behaviour.apply();
					$("tags_widget_" + b).down("a.add_tags_link").hide().next().show();
					if (!d.remove && !d.disagree) {
						cacheMyTags();
						$("tags_widget_" + b).down("form.addtags").down("input.tags_input").focus()
					}
				}
			}});
			return false
		}
	}
}
var tagsBehaviour = {"div.tags_widget":function(b) {
	Behaviour.RUN_EVERY_TIME.push("div.tags_widget");
	var c = /(\d+)/.exec(b.id)[1];
	if (c)if (!tagsAutocompleter[c])if ($("tags_input_" + c))tagsAutocompleter[c] = new Autocompleter.Local("tags_input_" + c, "tags_autocomplete_" + c, tagsAutocompleteOptions, {submitOnSelect:false,tokens:[","],frequency:0.1,afterUpdateElement:addTags.bindAsEventListener(b.down("form.addtags"))})
},"div.tags_widget a.add_tags_link":function(b) {
	b.observe("click", function(c) {
		c.stop();
		var d = b.up("div.tags_widget");
		if (d) {
			var e = /(\d+)/.exec(d.id)[1];
			if (e)if (window.logged_in) {
				cacheMyTags();
				b.next().show().down("input.tags_input").focus();
				b.hide()
			} else {
				showPopupLogin("Please sign in to tag things.");
				Event.observe(document, "myfonts:loggedin", function() {
					new Ajax.Request("http://" + window.location.host + "/widgets/tags/tags.php", {method:"get",parameters:{unique_id:e},onSuccess:function(f) {
						var g = d.id;
						d.replace(f.responseText);
						tagsAutocompleteOptions = [];
						Behaviour.apply();
						if ($(g)) {
							d = $(g);
							b = d.down("a.add_tags_link");
							cacheMyTags();
							b.next().show().down("input.tags_input").focus();
							b.hide()
						}
					}})
				})
			}
		}
	})
},"div.tags_widget form.addtags":function(b) {
	b.onsubmit = addTags
},"div.tags_widget ul span.plusminus":function(b) {
	b.onclick = addTags
},"a.tag_bulk_show":function(b) {
	b.observe("click", function(c) {
		c.stop();
		c = b.up("form");
		b.hide();
		c.select(".tag_bulk_controls").invoke("show");
		c.select("input.tag_bulk_controls").invoke("insert", {after:"&nbsp;"});
		c.down("input[name=bulk]").value = 1
	})
}};
Behaviour.register(tagsBehaviour);
window.BEHAVIOUR_WIDGET = null;

/**
 * Created by IntelliJ IDEA.
 * User: Oksana
 * Date: 10/26/10
 * Time: 8:57 PM
 * To change this template use File | Settings | File Templates.
 */
