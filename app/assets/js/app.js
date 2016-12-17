/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 1.6.0
 * @date    2015-04-22
 *
 * @license
 * Copyright (C) 2013-2015 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):"object"==typeof exports?exports.math=r():e.math=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";function n(e){if("function"!=typeof Object.create)throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var r={},a={matrix:"matrix",number:"number",precision:64,epsilon:1e-14};r.config=function(e){if(e){if(i.deepExtend(a,e),e.precision&&r.type.BigNumber.config({precision:e.precision}),t(4)(r,a),e.number&&e.number.defaultType)throw new Error("setting `number.defaultType` is deprecated. Use `number` instead.");if(e.number&&e.number.precision)throw new Error("setting `number.precision` is deprecated. Use `precision` instead.");if(e.matrix&&e.matrix.defaultType)throw new Error("setting `matrix.defaultType` is deprecated. Use `matrix` instead.");if(e.matrix&&e.matrix["default"])throw new Error("setting `matrix.default` is deprecated. Use `matrix` instead.");if(e.decimals)throw new Error("setting `decimals` is deprecated. Use `precision` instead.")}return i.clone(a)},r.create=n;var s=t(5).constructor();if(s.prototype.toJSON=function(){return{mathjs:"BigNumber",value:this.toString()}},s.fromJSON=function(e){return new s(e.value)},"function"!=typeof s.prototype.clone&&(s.prototype.clone=function(){return this}),"function"==typeof s.convert)throw new Error("Cannot add function convert to BigNumber: function already exists");return s.convert=function(e){return o(e)>15?e:new s(e)},r.error=t(6),r.type={},r.type.Complex=t(7),r.type.Range=t(8),r.type.Index=t(9),r.type.Matrix=t(10)(a),r.type.Unit=t(11),r.type.Help=t(12),r.type.ResultSet=t(13),r.type.BigNumber=s,r.collection=t(14)(r,a),r.type.CcsMatrix=t(15)(r,a),r.type.CrsMatrix=t(16)(r,a),r.type.DenseMatrix=t(17)(r,a),r.type.Matrix._storage.ccs=r.type.CcsMatrix,r.type.Matrix._storage.crs=r.type.CrsMatrix,r.type.Matrix._storage.dense=r.type.DenseMatrix,r.type.Matrix._storage["default"]=r.type.DenseMatrix,r.expression={},r.expression.node=t(18),r.expression.parse=t(19)(r,a),r.expression.Parser=t(20)(r,a),r.expression.docs=t(21),r.json={reviver:t(22)(r,a)},t(34)(r,a),t(35)(r,a),t(36)(r,a),t(37)(r,a),t(38)(r,a),t(39)(r,a),t(40)(r,a),t(41)(r,a),t(42)(r,a),t(43)(r,a),t(44)(r,a),t(45)(r,a),t(46)(r,a),t(47)(r,a),t(48)(r,a),t(49)(r,a),t(50)(r,a),t(51)(r,a),t(52)(r,a),t(53)(r,a),t(54)(r,a),t(55)(r,a),t(56)(r,a),t(57)(r,a),t(58)(r,a),t(59)(r,a),t(60)(r,a),t(61)(r,a),t(62)(r,a),t(63)(r,a),t(64)(r,a),t(65)(r,a),t(66)(r,a),t(67)(r,a),t(68)(r,a),t(69)(r,a),t(70)(r,a),t(71)(r,a),t(72)(r,a),t(73)(r,a),t(74)(r,a),t(75)(r,a),t(76)(r,a),t(77)(r,a),t(78)(r,a),t(79)(r,a),t(80)(r,a),t(81)(r,a),t(82)(r,a),t(83)(r,a),t(84)(r,a),t(85)(r,a),t(86)(r,a),t(87)(r,a),t(88)(r,a),t(89)(r,a),t(90)(r,a),t(91)(r,a),t(92)(r,a),t(93)(r,a),t(94)(r,a),t(95)(r,a),t(96)(r,a),t(97)(r,a),t(98)(r,a),t(99)(r,a),t(100)(r,a),t(101)(r,a),t(102)(r,a),t(103)(r,a),t(104)(r,a),t(105)(r,a),t(106)(r,a),t(107)(r,a),t(108)(r,a),t(109)(r,a),t(110)(r,a),t(111)(r,a),t(112)(r,a),t(113)(r,a),t(114)(r,a),t(115)(r,a),t(116)(r,a),t(117)(r,a),t(118)(r,a),t(119)(r,a),t(120)(r,a),t(121)(r,a),t(122)(r,a),t(123)(r,a),t(124)(r,a),t(125)(r,a),t(126)(r,a),t(127)(r,a),t(128)(r,a),t(129)(r,a),t(130)(r,a),t(131)(r,a),t(132)(r,a),t(133)(r,a),t(134)(r,a),t(135)(r,a),t(136)(r,a),t(137)(r,a),t(138)(r,a),t(139)(r,a),t(140)(r,a),t(141)(r,a),t(142)(r,a),t(143)(r,a),t(144)(r,a),t(145)(r,a),t(146)(r,a),t(147)(r,a),t(148)(r,a),t(149)(r,a),t(150)(r,a),t(151)(r,a),t(152)(r,a),t(153)(r,a),t(154)(r,a),t(155)(r,a),t(156)(r,a),t(157)(r,a),t(158)(r,a),t(159)(r,a),t(160)(r,a),t(161)(r,a),t(162)(r,a),t(163)(r,a),t(164)(r,a),t(165)(r,a),t(166)(r,a),r.ifElse=function(){throw new Error("Function ifElse is deprecated. Use the conditional operator instead.")},t(4)(r,a),r.expression.transform={concat:t(23)(r,a),filter:t(24)(r,a),forEach:t(25)(r,a),index:t(26)(r,a),map:t(27)(r,a),max:t(28)(r,a),mean:t(29)(r,a),min:t(30)(r,a),range:t(31)(r,a),subset:t(32)(r,a)},r.chaining={},r.chaining.Chain=t(33)(r,a),r.chaining.Selector=r.chaining.Chain,r.config(a),r.config(e),r}var i=t(2),o=t(3).digits,a=n();"undefined"!=typeof window&&(window.mathjs=a),e.exports=a},function(e,r,t){"use strict";r.clone=function n(e){var r=typeof e;if("number"===r||"string"===r||"boolean"===r||null===e||void 0===e)return e;if("function"==typeof e.clone)return e.clone();if(Array.isArray(e))return e.map(function(e){return n(e)});if(e instanceof Number)return new Number(e.valueOf());if(e instanceof String)return new String(e.valueOf());if(e instanceof Boolean)return new Boolean(e.valueOf());if(e instanceof Date)return new Date(e.valueOf());if(e instanceof RegExp)throw new TypeError("Cannot clone "+e);var t={};for(var i in e)e.hasOwnProperty(i)&&(t[i]=n(e[i]));return t},r.extend=function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t]);return e},r.deepExtend=function i(e,r){if(Array.isArray(r))throw new TypeError("Arrays are not supported by deepExtend");for(var t in r)if(r.hasOwnProperty(t))if(r[t]&&r[t].constructor===Object)void 0===e[t]&&(e[t]={}),e[t].constructor===Object?i(e[t],r[t]):e[t]=r[t];else{if(Array.isArray(r[t]))throw new TypeError("Arrays are not supported by deepExtend");e[t]=r[t]}return e},r.deepEqual=function(e,t){var n,i,o;if(Array.isArray(e)){if(!Array.isArray(t))return!1;if(e.length!=t.length)return!1;for(i=0,o=e.length;o>i;i++)if(!r.deepEqual(e[i],t[i]))return!1;return!0}if(e instanceof Object){if(Array.isArray(t)||!(t instanceof Object))return!1;for(n in e)if(!r.deepEqual(e[n],t[n]))return!1;for(n in t)if(!r.deepEqual(e[n],t[n]))return!1;return!0}return typeof e==typeof t&&e==t},r.canDefineProperty=function(){try{if(Object.defineProperty)return Object.defineProperty({},"x",{}),!0}catch(e){}return!1},r.lazy=function(e,t,n){if(r.canDefineProperty()){var i,o=!0;Object.defineProperty(e,t,{get:function(){return o&&(i=n(),o=!1),i},set:function(e){i=e,o=!1},configurable:!0})}else e[t]=n()}},function(e,r,t){"use strict";var n=t(167);r.isNumber=function(e){return e instanceof Number||"number"==typeof e},r.isInteger=function(e){return e==Math.round(e)},r.sign=function(e){return e>0?1:0>e?-1:0},r.format=function(e,t){if("function"==typeof t)return t(e);if(e===1/0)return"Infinity";if(e===-(1/0))return"-Infinity";if(isNaN(e))return"NaN";var n="auto",i=void 0;switch(t&&(t.notation&&(n=t.notation),r.isNumber(t)?i=t:t.precision&&(i=t.precision)),n){case"fixed":return r.toFixed(e,i);case"exponential":return r.toExponential(e,i);case"auto":return r.toPrecision(e,i,t&&t.exponential).replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],r=arguments[4];return"."!==e?e+r:r});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},r.toExponential=function(e,r){return new n(e).toExponential(r)},r.toFixed=function(e,r){return new n(e).toFixed(r)},r.toPrecision=function(e,r,t){return new n(e).toPrecision(r,t)},r.digits=function(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length},r.DBL_EPSILON=Number.EPSILON||2.220446049250313e-16,r.nearlyEqual=function(e,t,n){if(null==n)return e==t;if(e==t)return!0;if(isNaN(e)||isNaN(t))return!1;if(isFinite(e)&&isFinite(t)){var i=Math.abs(e-t);return i<r.DBL_EPSILON?!0:i<=Math.max(Math.abs(e),Math.abs(t))*n}return!1}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(2),i=t(168),o=t(7),a=e.type.BigNumber;e["true"]=!0,e["false"]=!1,e["null"]=null,e.uninitialized=t(169).UNINITIALIZED,"bignumber"===r.number?(e.Infinity=new a(1/0),e.NaN=new a(0/0),n.lazy(e,"pi",function(){return i.pi(r.precision)}),n.lazy(e,"tau",function(){return i.tau(r.precision)}),n.lazy(e,"e",function(){return i.e(r.precision)}),n.lazy(e,"phi",function(){return i.phi(r.precision)}),n.lazy(e,"E",function(){return e.e}),n.lazy(e,"LN2",function(){return new a(2).ln()}),n.lazy(e,"LN10",function(){return new a(10).ln()}),n.lazy(e,"LOG2E",function(){return new a(1).div(new a(2).ln())}),n.lazy(e,"LOG10E",function(){return new a(1).div(new a(10).ln())}),n.lazy(e,"PI",function(){return e.pi}),n.lazy(e,"SQRT1_2",function(){return new a("0.5").sqrt()}),n.lazy(e,"SQRT2",function(){return new a(2).sqrt()})):(e.Infinity=1/0,e.NaN=0/0,e.pi=Math.PI,e.tau=2*Math.PI,e.e=Math.E,e.phi=1.618033988749895,e.E=e.e,e.LN2=Math.LN2,e.LN10=Math.LN10,e.LOG2E=Math.LOG2E,e.LOG10E=Math.LOG10E,e.PI=e.pi,e.SQRT1_2=Math.SQRT1_2,e.SQRT2=Math.SQRT2),e.i=new o(0,1),e.version=t(170)}},function(e,r,t){var n=t(340);e.exports=n},function(e,r,t){"use strict";r.ArgumentsError=t(171),r.DimensionError=t(172),r.IndexError=t(173),r.UnsupportedTypeError=t(174)},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");switch(arguments.length){case 0:this.re=0,this.im=0;break;case 1:var t=arguments[0];if("object"==typeof t){if("re"in t&&"im"in t){var i=new n(t.re,t.im);this.re=i.re,this.im=i.im;break}if("r"in t&&"phi"in t){var i=n.fromPolar(t.r,t.phi);this.re=i.re,this.im=i.im;break}}throw new SyntaxError("Object with the re and im or r and phi properties expected.");case 2:if(!h(e)||!h(r))throw new TypeError("Two numbers expected in Complex constructor");this.re=e,this.im=r;break;default:throw new SyntaxError("One, two or three arguments expected in Complex constructor")}}function i(){for(;" "==x||"	"==x;)s()}function o(e){return e>="0"&&"9">=e||"."==e}function a(e){return e>="0"&&"9">=e}function s(){y++,x=v.charAt(y)}function u(e){y=e,x=v.charAt(y)}function c(){var e,r="";if(e=y,"+"==x?s():"-"==x&&(r+=x,s()),!o(x))return u(e),null;if("."==x){if(r+=x,s(),!a(x))return u(e),null}else{for(;a(x);)r+=x,s();"."==x&&(r+=x,s())}for(;a(x);)r+=x,s();if("E"==x||"e"==x){if(r+=x,s(),("+"==x||"-"==x)&&(r+=x,s()),!a(x))return u(e),null;for(;a(x);)r+=x,s()}return r}function f(){var e=v.charAt(y+1);if("I"==x||"i"==x)return s(),"1";if(!("+"!=x&&"-"!=x||"I"!=e&&"i"!=e)){var r="+"==x?"1":"-1";return s(),s(),r}return null}var l=t(175),p=t(11),m=l.number,h=l.number.isNumber,g=p.isUnit,d=l.string.isString;n.isComplex=function(e){return e instanceof n};var v,y,x;n.parse=function(e){if(v=e,y=-1,x="",!d(v))return null;s(),i();var r=c();if(r){if("I"==x||"i"==x)return s(),i(),x?null:new n(0,Number(r));i();var t=x;if("+"!=t&&"-"!=t)return i(),x?null:new n(Number(r),0);s(),i();var o=c();if(o){if("I"!=x&&"i"!=x)return null;s()}else if(o=f(),!o)return null;return"-"==t&&(o="-"==o[0]?"+"+o.substring(1):"-"+o),s(),i(),x?null:new n(Number(r),Number(o))}return(r=f())?(i(),x?null:new n(0,Number(r))):null},n.fromPolar=function(e){switch(arguments.length){case 1:var r=arguments[0];if("object"==typeof r)return n.fromPolar(r.r,r.phi);throw new TypeError("Input has to be an object with r and phi keys.");case 2:var t=arguments[0],i=arguments[1];if(h(t)){if(g(i)&&i.hasBase(p.BASE_UNITS.ANGLE)&&(i=i.toNumber("rad")),h(i))return new n(t*Math.cos(i),t*Math.sin(i));throw new TypeError("Phi is not a number nor an angle unit.")}throw new TypeError("Radius r is not a number.");default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},n.prototype.toPolar=function(){return{r:Math.sqrt(this.re*this.re+this.im*this.im),phi:Math.atan2(this.im,this.re)}},n.prototype.clone=function(){return new n(this.re,this.im)},n.prototype.equals=function(e){return this.re===e.re&&this.im===e.im},n.prototype.format=function(e){var r="",t=this.im,n=this.re,i=m.format(this.re,e),o=m.format(this.im,e),a=h(e)?e:e?e.precision:null;if(null!==a){var s=Math.pow(10,-a);Math.abs(n/t)<s&&(n=0),Math.abs(t/n)<s&&(t=0)}return r=0==t?i:0==n?1==t?"i":-1==t?"-i":o+"i":t>0?1==t?i+" + i":i+" + "+o+"i":-1==t?i+" - i":i+" - "+o.substring(1)+"i"},n.prototype.toString=function(){return this.format()},n.prototype.toJSON=function(){return{mathjs:"Complex",re:this.re,im:this.im}},n.fromJSON=function(e){return new n(e)},n.prototype.valueOf=n.prototype.toString,e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(null!=e&&!o.isNumber(e))throw new TypeError("Parameter start must be a number");if(null!=r&&!o.isNumber(r))throw new TypeError("Parameter end must be a number");if(null!=t&&!o.isNumber(t))throw new TypeError("Parameter step must be a number");this.start=null!=e?parseFloat(e):0,this.end=null!=r?parseFloat(r):0,this.step=null!=t?parseFloat(t):1}{var i=t(175),o=i.number,a=i.string;i.array}n.parse=function(e){if(!a.isString(e))return null;var r=e.split(":"),t=r.map(function(e){return parseFloat(e)}),i=t.some(function(e){return isNaN(e)});if(i)return null;switch(t.length){case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[2],t[1]);default:return null}},n.prototype.clone=function(){return new n(this.start,this.end,this.step)},n.isRange=function(e){return e instanceof n},n.prototype.size=function(){var e=0,r=this.start,t=this.step,n=this.end,i=n-r;return o.sign(t)==o.sign(i)?e=Math.ceil(i/t):0==i&&(e=0),isNaN(e)&&(e=0),[e]},n.prototype.min=function(){var e=this.size()[0];return e>0?this.step>0?this.start:this.start+(e-1)*this.step:void 0},n.prototype.max=function(){var e=this.size()[0];return e>0?this.step>0?this.start+(e-1)*this.step:this.start:void 0},n.prototype.forEach=function(e){var r=this.start,t=this.step,n=this.end,i=0;if(t>0)for(;n>r;)e(r,i,this),r+=t,i++;else if(0>t)for(;r>n;)e(r,i,this),r+=t,i++},n.prototype.map=function(e){var r=[];return this.forEach(function(t,n,i){r[n]=e(t,n,i)}),r},n.prototype.toArray=function(){var e=[];return this.forEach(function(r,t){e[t]=r}),e},n.prototype.valueOf=function(){return this.toArray()},n.prototype.format=function(e){var r=o.format(this.start,e);return 1!=this.step&&(r+=":"+o.format(this.step,e)),r+=":"+o.format(this.end,e)},n.prototype.toString=function(){return this.format()},n.prototype.toJSON=function(){return{mathjs:"Range",start:this.start,end:this.end,step:this.step}},n.fromJSON=function(e){return new n(e.start,e.end,e.step)},e.exports=n},function(e,r,t){"use strict";function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this._ranges=[],this._isScalar=!0;for(var r=0,t=arguments.length;t>r;r++){var o=arguments[r];if(o instanceof a)this._ranges.push(o),this._isScalar=!1;else if(f(o))this._ranges.push(i(o)),this._isScalar=!1;else if(u(o))this._ranges.push(i([o,o+1]));else{var s=o.valueOf();if(!f(s))throw new TypeError("Ranges must be an Array, Number, or Range");this._ranges.push(i(s)),this._isScalar=!1}}}function i(e){for(var r=e.length,t=0;r>t;t++)if(!u(e[t])||!c(e[t]))throw new TypeError("Index parameters must be integer numbers");switch(e.length){case 2:return new a(e[0],e[1]);case 3:return new a(e[0],e[1],e[2]);default:throw new SyntaxError("Wrong number of arguments in Index (2 or 3 expected)")}}var o=t(175),a=t(8),s=o.number,u=s.isNumber,c=s.isInteger,f=Array.isArray;n.prototype.clone=function(){var e=new n;return e._ranges=o.object.clone(this._ranges),e._isScalar=this._isScalar,e},n.isIndex=function(e){return e instanceof n},n.create=function(e){var r=new n;return n.apply(r,e),r},n.prototype.size=function(){for(var e=[],r=0,t=this._ranges.length;t>r;r++){var n=this._ranges[r];e[r]=n.size()[0]}return e},n.prototype.max=function(){for(var e=[],r=0,t=this._ranges.length;t>r;r++){var n=this._ranges[r];e[r]=n.max()}return e},n.prototype.min=function(){for(var e=[],r=0,t=this._ranges.length;t>r;r++){var n=this._ranges[r];e[r]=n.min()}return e},n.prototype.forEach=function(e){for(var r=0,t=this._ranges.length;t>r;r++)e(this._ranges[r],r,this)},n.prototype.range=function(e){return this._ranges[e]||null},n.prototype.isScalar=function(){return this._isScalar},n.prototype.toArray=function(){for(var e=[],r=0,t=this._ranges.length;t>r;r++){var n=this._ranges[r],i=[],o=n.start,a=n.end,s=n.step;if(s>0)for(;a>o;)i.push(o),o+=s;else if(0>s)for(;o>a;)i.push(o),o+=s;e.push(i)}return e},n.prototype.valueOf=n.prototype.toArray,n.prototype.toString=function(){for(var e=[],r=0,t=this._ranges.length;t>r;r++){var n=this._ranges[r],i=s.format(n.start);1!=n.step&&(i+=":"+s.format(n.step)),i+=":"+s.format(n.end),e.push(i)}return"["+e.join(", ")+"]"},n.prototype.toJSON=function(){return{mathjs:"Index",ranges:this._ranges}},n.fromJSON=function(e){return n.create(e.ranges)},e.exports=n},function(e,r,t){"use strict";var n=t(176),i=n.isString;e.exports=function(e){function r(){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator")}return r.isMatrix=function(e){return e instanceof r},r.storage=function(e){if(!i(e))throw new TypeError("format must be a string value");var t=r._storage[e];if(!t)throw new SyntaxError("Unsupported matrix storage format: "+e);return t},r._storage={},r.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},r.prototype.subset=function(e,r,t){throw new Error("Cannot invoke subset on a Matrix interface")},r.prototype.get=function(e){throw new Error("Cannot invoke get on a Matrix interface")},r.prototype.set=function(e,r,t){throw new Error("Cannot invoke set on a Matrix interface")},r.prototype.resize=function(e,r){throw new Error("Cannot invoke resize on a Matrix interface")},r.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},r.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},r.prototype.map=function(e,r){throw new Error("Cannot invoke map on a Matrix interface")},r.prototype.forEach=function(e){throw new Error("Cannot invoke forEach on a Matrix interface")},r.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},r.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},r.prototype.format=function(e){throw new Error("Cannot invoke format on a Matrix interface")},r.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},r.prototype.transpose=function(){throw new Error("Cannot invoke transpose on a Matrix interface")},r.prototype.trace=function(){throw new Error("Cannot invoke transpose on a Matrix interface")},r.prototype.multiply=function(e){throw new Error("Cannot invoke multiply on a Matrix interface")},r}},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new Error("Constructor must be called with the new operator");if(void 0!=e&&!y(e))throw new TypeError("First parameter in Unit constructor must be a number");if(void 0!=r&&(!x(r)||""==r))throw new TypeError("Second parameter in Unit constructor must be a string");if(void 0!=r){var t=l(r);if(!t)throw new SyntaxError('Unknown unit "'+r+'"');this.unit=t.unit,this.prefix=t.prefix}else this.unit=M,this.prefix=b;this.value=void 0!=e?this._normalize(e):null,this.fixPrefix=!1}function i(){for(;" "==h||"	"==h;)s()}function o(e){return e>="0"&&"9">=e||"."==e}function a(e){return e>="0"&&"9">=e}function s(){m++,h=p.charAt(m)}function u(e){m=e,h=p.charAt(m)}function c(){var e,r="";if(e=m,"+"==h?s():"-"==h&&(r+=h,s()),!o(h))return u(e),null;if("."==h){if(r+=h,s(),!a(h))return u(e),null}else{for(;a(h);)r+=h,s();"."==h&&(r+=h,s())}for(;a(h);)r+=h,s();if("E"==h||"e"==h){if(r+=h,s(),("+"==h||"-"==h)&&(r+=h,s()),!a(h))return u(e),null;for(;a(h);)r+=h,s()}return r}function f(){var e="";for(i();h&&" "!=h&&"	"!=h;)e+=h,s();return e||null}function l(e){for(var r in _)if(_.hasOwnProperty(r)&&v.endsWith(e,r)){var t=_[r],n=e.length-r.length,i=e.substring(0,n),o=t.prefixes[i];if(void 0!==o)return{unit:t,prefix:o}}return null}var p,m,h,g=t(175),d=g.number,v=g.string,y=g.number.isNumber,x=g.string.isString;n.parse=function(e){if(p=e,m=-1,h="",!x(p))return null;s(),i();var r,t=c();if(t){if(r=f(),s(),i(),h)return null;if(t&&r)try{return new n(Number(t),r)}catch(o){}}else{if(r=f(),s(),i(),h)return null;if(r)try{return new n(null,r)}catch(o){}}return null},n.isUnit=function(e){return e instanceof n},n.prototype.clone=function(){var e=new n;for(var r in this)this.hasOwnProperty(r)&&(e[r]=this[r]);return e},n.prototype._normalize=function(e){return(e+this.unit.offset)*this.unit.value*this.prefix.value},n.prototype._denormalize=function(e,r){return void 0==r?e/this.unit.value/this.prefix.value-this.unit.offset:e/this.unit.value/r-this.unit.offset},n.isValuelessUnit=function(e){return null!=l(e)},n.prototype.hasBase=function(e){return this.unit.base===e},n.prototype.equalBase=function(e){return this.unit.base===e.unit.base},n.prototype.equals=function(e){return this.equalBase(e)&&this.value==e.value},n.prototype.to=function(e){var r,t=null==this.value?this._normalize(1):this.value;if(x(e)){if(r=new n(null,e),!this.equalBase(r))throw new Error("Units do not match");return r.value=t,r.fixPrefix=!0,r}if(e instanceof n){if(!this.equalBase(e))throw new Error("Units do not match");if(null!==e.value)throw new Error("Cannot convert to a unit with a value");return r=e.clone(),r.value=t,r.fixPrefix=!0,r}throw new Error("String or Unit expected as parameter")},n.prototype.toNumber=function(e){var r=this.to(e);return r._denormalize(r.value,r.prefix.value)},n.prototype.toString=function(){return this.format()},n.prototype.toJSON=function(){return{mathjs:"Unit",value:this._denormalize(this.value),unit:this.prefix.name+this.unit.name,fixPrefix:this.fixPrefix}},n.fromJSON=function(e){var r=new n(e.value,e.unit);return r.fixPrefix=e.fixPrefix||!1,r},n.prototype.valueOf=n.prototype.toString,n.prototype.format=function(e){var r,t;if(null===this.value||this.fixPrefix)r=this._denormalize(this.value),t=null!==this.value?d.format(r,e)+" ":"",t+=this.prefix.name+this.unit.name;else{var n=this._bestPrefix();r=this._denormalize(this.value,n.value),t=d.format(r,e)+" ",t+=n.name+this.unit.name}return t},n.prototype._bestPrefix=function(){var e=Math.abs(this.value/this.unit.value),r=b,t=Math.abs(Math.log(e/r.value)/Math.LN10-1.2),n=this.unit.prefixes;for(var i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o.scientific){var a=Math.abs(Math.log(e/o.value)/Math.LN10-1.2);t>a&&(r=o,t=a)}}return r};var w={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-42,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}}},b={name:"",value:1,scientific:!0},E={NONE:{},LENGTH:{},MASS:{},TIME:{},CURRENT:{},TEMPERATURE:{},LUMINOUS_INTENSITY:{},AMOUNT_OF_SUBSTANCE:{},FORCE:{},SURFACE:{},VOLUME:{},ANGLE:{},BIT:{}},N={},M={name:"",base:N,value:1,offset:0},_={meter:{name:"meter",base:E.LENGTH,prefixes:w.LONG,value:1,offset:0},inch:{name:"inch",base:E.LENGTH,prefixes:w.NONE,value:.0254,offset:0},foot:{name:"foot",base:E.LENGTH,prefixes:w.NONE,value:.3048,offset:0},yard:{name:"yard",base:E.LENGTH,prefixes:w.NONE,value:.9144,offset:0},mile:{name:"mile",base:E.LENGTH,prefixes:w.NONE,value:1609.344,offset:0},link:{name:"link",base:E.LENGTH,prefixes:w.NONE,value:.201168,offset:0},rod:{name:"rod",base:E.LENGTH,prefixes:w.NONE,value:5.02921,offset:0},chain:{name:"chain",base:E.LENGTH,prefixes:w.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:E.LENGTH,prefixes:w.NONE,value:1e-10,offset:0},m:{name:"m",base:E.LENGTH,prefixes:w.SHORT,value:1,offset:0},"in":{name:"in",base:E.LENGTH,prefixes:w.NONE,value:.0254,offset:0},ft:{name:"ft",base:E.LENGTH,prefixes:w.NONE,value:.3048,offset:0},yd:{name:"yd",base:E.LENGTH,prefixes:w.NONE,value:.9144,offset:0},mi:{name:"mi",base:E.LENGTH,prefixes:w.NONE,value:1609.344,offset:0},li:{name:"li",base:E.LENGTH,prefixes:w.NONE,value:.201168,offset:0},rd:{name:"rd",base:E.LENGTH,prefixes:w.NONE,value:5.02921,offset:0},ch:{name:"ch",base:E.LENGTH,prefixes:w.NONE,value:20.1168,offset:0},mil:{name:"mil",base:E.LENGTH,prefixes:w.NONE,value:254e-7,offset:0},m2:{name:"m2",base:E.SURFACE,prefixes:w.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:E.SURFACE,prefixes:w.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:E.SURFACE,prefixes:w.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:E.SURFACE,prefixes:w.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:E.SURFACE,prefixes:w.NONE,value:2589988.110336,offset:0},sqrd:{name:"sqrd",base:E.SURFACE,prefixes:w.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:E.SURFACE,prefixes:w.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:E.SURFACE,prefixes:w.NONE,value:6.4516e-10,offset:0},m3:{name:"m3",base:E.VOLUME,prefixes:w.CUBIC,value:1,offset:0},L:{name:"L",base:E.VOLUME,prefixes:w.SHORT,value:.001,offset:0},l:{name:"l",base:E.VOLUME,prefixes:w.SHORT,value:.001,offset:0},litre:{name:"litre",base:E.VOLUME,prefixes:w.LONG,value:.001,offset:0},cuin:{name:"cuin",base:E.VOLUME,prefixes:w.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:E.VOLUME,prefixes:w.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:E.VOLUME,prefixes:w.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:E.VOLUME,prefixes:w.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:E.VOLUME,prefixes:w.NONE,value:15e-6,offset:0},drop:{name:"drop",base:E.VOLUME,prefixes:w.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:E.VOLUME,prefixes:w.NONE,value:5e-8,offset:0},minim:{name:"minim",base:E.VOLUME,prefixes:w.NONE,value:6.161152e-8,offset:0},fluiddram:{name:"fluiddram",base:E.VOLUME,prefixes:w.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:E.VOLUME,prefixes:w.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:E.VOLUME,prefixes:w.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:E.VOLUME,prefixes:w.NONE,value:1e-6,offset:0},cup:{name:"cup",base:E.VOLUME,prefixes:w.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:E.VOLUME,prefixes:w.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:E.VOLUME,prefixes:w.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:E.VOLUME,prefixes:w.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:E.VOLUME,prefixes:w.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:E.VOLUME,prefixes:w.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:E.VOLUME,prefixes:w.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:E.VOLUME,prefixes:w.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:E.VOLUME,prefixes:w.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:E.VOLUME,prefixes:w.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:E.VOLUME,prefixes:w.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:E.VOLUME,prefixes:w.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:E.VOLUME,prefixes:w.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:E.VOLUME,prefixes:w.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:E.VOLUME,prefixes:w.NONE,value:.1173478,offset:0},obl:{name:"obl",base:E.VOLUME,prefixes:w.NONE,value:.1589873,offset:0},g:{name:"g",base:E.MASS,prefixes:w.SHORT,value:.001,offset:0},gram:{name:"gram",base:E.MASS,prefixes:w.LONG,value:.001,offset:0},ton:{name:"ton",base:E.MASS,prefixes:w.SHORT,value:907.18474,offset:0},tonne:{name:"tonne",base:E.MASS,
    prefixes:w.SHORT,value:1e3,offset:0},grain:{name:"grain",base:E.MASS,prefixes:w.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:E.MASS,prefixes:w.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:E.MASS,prefixes:w.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:E.MASS,prefixes:w.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:E.MASS,prefixes:w.NONE,value:45.359237,offset:0},stick:{name:"stick",base:E.MASS,prefixes:w.NONE,value:.115,offset:0},stone:{name:"stone",base:E.MASS,prefixes:w.NONE,value:6350,offset:0},gr:{name:"gr",base:E.MASS,prefixes:w.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:E.MASS,prefixes:w.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:E.MASS,prefixes:w.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:E.MASS,prefixes:w.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:E.MASS,prefixes:w.NONE,value:45.359237,offset:0},s:{name:"s",base:E.TIME,prefixes:w.SHORT,value:1,offset:0},min:{name:"min",base:E.TIME,prefixes:w.NONE,value:60,offset:0},h:{name:"h",base:E.TIME,prefixes:w.NONE,value:3600,offset:0},second:{name:"second",base:E.TIME,prefixes:w.LONG,value:1,offset:0},sec:{name:"sec",base:E.TIME,prefixes:w.LONG,value:1,offset:0},minute:{name:"minute",base:E.TIME,prefixes:w.NONE,value:60,offset:0},hour:{name:"hour",base:E.TIME,prefixes:w.NONE,value:3600,offset:0},day:{name:"day",base:E.TIME,prefixes:w.NONE,value:86400,offset:0},rad:{name:"rad",base:E.ANGLE,prefixes:w.NONE,value:1,offset:0},deg:{name:"deg",base:E.ANGLE,prefixes:w.NONE,value:.017453292519943295,offset:0},grad:{name:"grad",base:E.ANGLE,prefixes:w.NONE,value:.015707963267948967,offset:0},cycle:{name:"cycle",base:E.ANGLE,prefixes:w.NONE,value:6.283185307179586,offset:0},A:{name:"A",base:E.CURRENT,prefixes:w.SHORT,value:1,offset:0},ampere:{name:"ampere",base:E.CURRENT,prefixes:w.LONG,value:1,offset:0},K:{name:"K",base:E.TEMPERATURE,prefixes:w.NONE,value:1,offset:0},degC:{name:"degC",base:E.TEMPERATURE,prefixes:w.NONE,value:1,offset:273.15},degF:{name:"degF",base:E.TEMPERATURE,prefixes:w.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:E.TEMPERATURE,prefixes:w.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:E.TEMPERATURE,prefixes:w.NONE,value:1,offset:0},celsius:{name:"celsius",base:E.TEMPERATURE,prefixes:w.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:E.TEMPERATURE,prefixes:w.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:E.TEMPERATURE,prefixes:w.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:E.AMOUNT_OF_SUBSTANCE,prefixes:w.NONE,value:1,offset:0},mole:{name:"mole",base:E.AMOUNT_OF_SUBSTANCE,prefixes:w.NONE,value:1,offset:0},cd:{name:"cd",base:E.LUMINOUS_INTENSITY,prefixes:w.NONE,value:1,offset:0},candela:{name:"candela",base:E.LUMINOUS_INTENSITY,prefixes:w.NONE,value:1,offset:0},N:{name:"N",base:E.FORCE,prefixes:w.SHORT,value:1,offset:0},newton:{name:"newton",base:E.FORCE,prefixes:w.LONG,value:1,offset:0},lbf:{name:"lbf",base:E.FORCE,prefixes:w.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:E.FORCE,prefixes:w.NONE,value:4.4482216152605,offset:0},b:{name:"b",base:E.BIT,prefixes:w.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:E.BIT,prefixes:w.BINARY_LONG,value:1,offset:0},B:{name:"B",base:E.BIT,prefixes:w.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:E.BIT,prefixes:w.BINARY_LONG,value:8,offset:0}},A={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",litres:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",seconds:"second",minutes:"minute",hours:"hour",days:"day",radians:"rad",degrees:"deg",gradients:"grad",cycles:"cycle",amperes:"ampere",moles:"mole"};for(var T in A)if(A.hasOwnProperty(T)){var S=_[A[T]],O=Object.create(S);O.name=T,_[T]=O}_.lt=_.l,_.liter=_.litre,_.liters=_.litres,_.lb=_.lbm,_.lbs=_.lbm,n.PREFIXES=w,n.BASE_UNITS=E,n.UNITS=_,e.exports=n},function(e,r,t){"use strict";function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!e)throw new Error('Argument "doc" missing');this.doc=e}var i=t(175),o=i.object,a=i.string;n.isHelp=function(e){return e instanceof n},n.prototype.toText=function(e){var r=this.doc||{},t="\n";if(r.name&&(t+="Name: "+r.name+"\n\n"),r.category&&(t+="Category: "+r.category+"\n\n"),r.description&&(t+="Description:\n    "+r.description+"\n\n"),r.syntax&&(t+="Syntax:\n    "+r.syntax.join("\n    ")+"\n\n"),r.examples){var i=e&&e.parser();t+="Examples:\n";for(var o=0;o<r.examples.length;o++){var s=r.examples[o];if(t+="    "+s+"\n",i){var u;try{u=i.eval(s)}catch(c){u=c}void 0===u||u instanceof n||(t+="        "+a.format(u,{precision:14})+"\n")}}t+="\n"}return r.seealso&&(t+="See also: "+r.seealso.join(", ")+"\n"),t},n.prototype.toString=function(){return this.toText()},n.prototype.toJSON=function(){var e=o.clone(this.doc);return e.mathjs="Help",e},n.fromJSON=function(e){var r={};for(var t in e)"mathjs"!==t&&(r[t]=e[t]);return new n(r)},n.prototype.valueOf=n.prototype.toString,e.exports=n},function(e,r,t){"use strict";function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this.entries=e||[]}n.prototype.valueOf=function(){return this.entries},n.prototype.toString=function(){return"["+this.entries.join(", ")+"]"},n.prototype.toJSON=function(){return{mathjs:"ResultSet",entries:this.entries}},n.fromJSON=function(e){return new n(e.entries)},e.exports=n},function(e,r,t){"use strict";var n=t(175),i=t(173),o=t(172),a=n.array,s=n.array.isArray;e.exports=function(e){function r(e,n,i){var o,a,u,c;if(0>=n){if(s(e[0])){for(c=t(e),a=[],o=0;o<c.length;o++)a[o]=r(c[o],n-1,i);return a}for(u=e[0],o=1;o<e.length;o++)u=i(u,e[o]);return u}for(a=[],o=0;o<e.length;o++)a[o]=r(e[o],n-1,i);return a}function t(e){var r,t,n=e.length,i=e[0].length,o=[];for(t=0;i>t;t++){var a=[];for(r=0;n>r;r++)a.push(e[r][t]);o.push(a)}return o}var u=e.type.Matrix,c={};return c.argsToArray=function(e){if(0===e.length)return[];if(1==e.length){var r=e[0];return r instanceof u&&(r=r.valueOf()),s(r)||(r=[r]),r}return n.array.argsToArray(e)},c.isCollection=function(e){return s(e)||e instanceof u},c.deepMap=function f(e,r,t){return e&&"function"==typeof e.map?e.map(function(e){return f(e,r,t)}):r(e)},c.deepMap2=function l(r,t,n){var i,a,c;if(s(r))if(s(t)){if(r.length!=t.length)throw new o(r.length,t.length);for(i=[],a=r.length,c=0;a>c;c++)i[c]=l(r[c],t[c],n)}else{if(t instanceof u)return i=l(r,t.valueOf(),n),e.matrix(i);for(i=[],a=r.length,c=0;a>c;c++)i[c]=l(r[c],t,n)}else{if(r instanceof u)return t instanceof u?(i=l(r.valueOf(),t.valueOf(),n),e.matrix(i)):(i=l(r.valueOf(),t,n),e.matrix(i));if(s(t))for(i=[],a=t.length,c=0;a>c;c++)i[c]=l(r,t[c],n);else{if(t instanceof u)return i=l(r,t.valueOf(),n),e.matrix(i);i=n(r,t)}}return i},c.reduce=function(t,n,o){var c=s(t)?a.size(t):t.size();if(0>n)throw new i(n);if(n>=c.length)throw new i(n,c.length);return t instanceof u?e.matrix(r(t.valueOf(),n,o)):r(t,n,o)},c.deepForEach=function p(e,r){e instanceof u&&(e=e.valueOf());for(var t=0,n=e.length;n>t;t++){var i=e[t];s(i)?p(i,r):r(i)}},c}},function(e,r,t){"use strict";var n=t(175),i=t(172),o=n.array,a=n.object,s=n.string,u=n.number,c=Array.isArray,f=n.number.isNumber,l=n.number.isInteger,p=o.validateIndex;e.exports=function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(e instanceof h)"CcsMatrix"===e.type?(this._values=a.clone(e._values),this._index=a.clone(e._index),this._ptr=a.clone(e._ptr),this._size=a.clone(e._size)):g(this,e.valueOf());else if(e&&c(e.values)&&c(e.index)&&c(e.ptr)&&c(e.size))this._values=e.values,this._index=e.index,this._ptr=e.ptr,this._size=e.size;else if(c(e))g(this,e);else{if(e)throw new TypeError("Unsupported type of data ("+n.types.type(e)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0]}}var t=e.type.Index,m=e.type.BigNumber,h=e.type.Matrix,g=function(r,t){r._values=[],r._index=[],r._ptr=[];var n=t.length,i=0;if(n>0){var o=0;do{r._ptr.push(r._values.length);for(var a=0;n>a;a++){var s=t[a];if(c(s)){if(0===o&&i<s.length&&(i=s.length),o<s.length){var u=s[o];e.equal(u,0)||(r._values.push(u),r._index.push(a))}}else 0===o&&1>i&&(i=1),e.equal(s,0)||(r._values.push(s),r._index.push(a))}o++}while(i>o)}r._ptr.push(r._values.length),r._size=[n,i]};r.prototype=new e.type.Matrix,r.prototype.type="CcsMatrix",r.prototype.storage=function(){return"ccs"},r.prototype.subset=function(e,r,t){switch(arguments.length){case 1:return d(this,e);case 2:case 3:return v(this,e,r,t);default:throw new SyntaxError("Wrong number of arguments")}};var d=function(e,r){if(!(r instanceof t))throw new TypeError("Invalid index");var n=r.isScalar();if(n)return e.get(r.min());var o=r.size();if(o.length!=e._size.length)throw new i(o.length,e._size.length);for(var a=r.min(),s=r.max(),u=0,c=e._size.length;c>u;u++)p(a[u],e._size[u]),p(s[u],e._size[u]);var f=function(e){return e};return E(e,a[0],s[0],a[1],s[1],f,!1)},v=function(e,r,n,s){if(!(r instanceof t))throw new TypeError("Invalid index");var u,c=r.size(),f=r.isScalar();if(n instanceof h?(u=n.size(),n=n.toArray()):u=o.size(n),f){if(0!==u.length)throw new TypeError("Scalar expected");e.set(r.min(),n,s)}else{if(1!==c.length&&2!==c.length)throw new i(c.length,e._size.length,"<");if(u.length<c.length){for(var l=0,p=0;1===c[l]&&1===u[l];)l++;for(;1===c[l];)p++,l++;n=o.unsqueeze(n,c.length,p,u)}if(!a.deepEqual(c,u))throw new i(c,u,">");for(var m=r.min()[0],g=r.min()[1],d=u[0],v=u[1],y=0;d>y;y++)for(var x=0;v>x;x++){var w=n[y][x];e.set([y+m,x+g],w,s)}}return e};r.prototype.get=function(e){if(!c(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new i(e.length,this._size.length);var r=e[0],t=e[1];p(r,this._size[0]),p(t,this._size[1]);var n=y(r,this._ptr[t],this._ptr[t+1],this._index);return n<this._ptr[t+1]&&this._index[n]===r?a.clone(this._values[n]):0},r.prototype.set=function(r,t,n){if(!c(r))throw new TypeError("Array expected");if(r.length!=this._size.length)throw new i(r.length,this._size.length);var o=r[0],a=r[1],s=this._size[0],u=this._size[1];(o>s-1||a>u-1)&&(b(this,Math.max(o+1,s),Math.max(a+1,u),n),s=this._size[0],u=this._size[1]),p(o,s),p(a,u);var f=y(o,this._ptr[a],this._ptr[a+1],this._index);return f<this._ptr[a+1]&&this._index[f]===o?e.equal(t,0)?x(f,a,this._values,this._index,this._ptr):this._values[f]=t:w(f,o,a,t,this._values,this._index,this._ptr),this};var y=function(e,r,t,n){if(t-r===0||e>n[t-1])return t;for(;t>r;){var i=~~((r+t)/2),o=n[i];if(o>e)t=i;else{if(!(e>o))return i;r=i+1}}return r},x=function(e,r,t,n,i){t.splice(e,1),n.splice(e,1);for(var o=r+1;o<i.length;o++)i[o]--},w=function(e,r,t,n,i,o,a){i.splice(e,0,n),o.splice(e,0,r);for(var s=t+1;s<a.length;s++)a[s]++};r.prototype.resize=function(e,r,t){if(!c(e))throw new TypeError("Array expected");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");e.forEach(function(r){if(!u.isNumber(r)||!u.isInteger(r)||0>r)throw new TypeError("Invalid size, must contain positive integers (size: "+s.format(e)+")")});var n=t?this.clone():this;return b(n,e[0],e[1],r)};var b=function(r,t,n,i){var o,a,s,u=i||0,c=!e.equal(u,0),f=r._size[0],l=r._size[1];if(n>l){for(a=l;n>a;a++)if(r._ptr[a]=r._values.length,c)for(o=0;f>o;o++)r._values.push(u),r._index.push(o);r._ptr[n]=r._values.length}else l>n&&(r._ptr.splice(n+1,l-n),r._values.splice(r._ptr[n],r._values.length),r._index.splice(r._ptr[n],r._index.length));if(l=n,t>f){if(c){var p=0;for(a=0;l>a;a++){r._ptr[a]=r._ptr[a]+p,s=r._ptr[a+1]+p;var m=0;for(o=f;t>o;o++,m++)r._values.splice(s+m,0,u),r._index.splice(s+m,0,o),p++}r._ptr[l]=r._values.length}}else if(f>t){var h=0;for(a=0;l>a;a++){r._ptr[a]=r._ptr[a]-h;var g=r._ptr[a],d=r._ptr[a+1]-h;for(s=g;d>s;s++)o=r._index[s],o>t-1&&(r._values.splice(s,1),r._index.splice(s,1),h++)}r._ptr[a]=r._values.length}return r._size[0]=t,r._size[1]=n,r};r.prototype.clone=function(){var e=new r({values:a.clone(this._values),index:a.clone(this._index),ptr:a.clone(this._ptr),size:a.clone(this._size)});return e},r.prototype.size=function(){return a.clone(this._size)},r.prototype.map=function(e,r){var t=this,n=this._size[0],i=this._size[1],o=function(r,n,i){return e(r,[n,i],t)};return E(this,0,n-1,0,i-1,o,r)};var E=function(t,n,i,o,a,s,u){for(var c=[],f=[],l=[],p=function(r,t,n){r=s(r,t,n),e.equal(r,0)||(c.push(r),f.push(t))},m=o;a>=m;m++){l.push(c.length);for(var h=t._ptr[m],g=t._ptr[m+1],d=n,v=h;g>v;v++){var y=t._index[v];if(y>=n&&i>=y){if(!u)for(var x=d;y>x;x++)p(0,x-n,m-o);p(t._values[v],y-n,m-o)}d=y+1}if(!u)for(var w=d;i>=w;w++)p(0,w-n,m-o)}return l.push(c.length),new r({values:c,index:f,ptr:l,size:[i-n+1,a-o+1]})};r.prototype.forEach=function(e,r){for(var t=this,n=this._size[0],i=this._size[1],o=0;i>o;o++){for(var a=this._ptr[o],s=this._ptr[o+1],u=0,c=a;s>c;c++){var f=this._index[c];if(!r)for(var l=u;f>l;l++)e(0,[l,o],t);e(this._values[c],[f,o],t),u=f+1}if(!r)for(var p=u;n>p;p++)e(0,[p,o],t)}},r.prototype.toArray=function(){return N(this,!0)},r.prototype.valueOf=function(){return N(this,!1)};var N=function(e,r){for(var t=[],n=e._size[0],i=e._size[1],o=0;i>o;o++){for(var s=e._ptr[o],u=e._ptr[o+1],c=0,f=s;u>f;f++){for(var l=e._index[f],p=c;l>p;p++)(t[p]=t[p]||[])[o]=0;(t[l]=t[l]||[])[o]=r?a.clone(e._values[f]):e._values[f],c=l+1}for(var m=c;n>m;m++)(t[m]=t[m]||[])[o]=0}return t};r.prototype.format=function(e){for(var r=this._size[0],t=this._size[1],n="CCS ["+s.format(r,e)+" x "+s.format(t,e)+"] density: "+s.format(this._values.length/(r*t),e)+"\n",i=0;t>i;i++)for(var o=this._ptr[i],a=this._ptr[i+1],u=o;a>u;u++){var c=this._index[u];n+="\n    ("+s.format(c,e)+", "+s.format(i,e)+") ==> "+s.format(this._values[u],e)}return n},r.prototype.toString=function(){return s.format(this.toArray())},r.prototype.toJSON=function(){return{mathjs:"CcsMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size}},r.prototype.transpose=function(){var r=this._size[0],t=this._size[1];if(0===t)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+s.format(this._size)+")");return new e.type.CrsMatrix({values:a.clone(this._values),index:a.clone(this._index),ptr:a.clone(this._ptr),size:[t,r]})},r.prototype.diagonal=function(e){if(e){if(e instanceof m&&(e=e.toNumber()),!f(e)||!l(e))throw new TypeError("The parameter k must be an integer number")}else e=0;for(var r=e>0?e:0,t=0>e?-e:0,n=this._size[0],i=this._size[1],o=Math.min(n-t,i-r),s=[],u=r;i>u&&s.length<o;u++){for(var c=this._ptr[u],p=this._ptr[u+1],h=!1,g=c;p>g;g++){var d=this._index[g];if(d===u-r+t){h=!0,s.push(a.clone(this._values[g]));break}if(d>u-r+t)break}!h&&s.length<o&&s.push(0)}return s},r.fromJSON=function(e){return new r(e)},r.diagonal=function(t,n,i){if(!c(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map(function(e){if(e instanceof m&&(e=e.toNumber()),!f(e)||!l(e)||1>e)throw new Error("Size values must be positive integers");return e}),i){if(i instanceof m&&(i=i.toNumber()),!f(i)||!l(i))throw new TypeError("The parameter k must be an integer number")}else i=0;var o,a=i>0?i:0,s=0>i?-i:0,u=t[0],p=t[1],h=Math.min(u-s,p-a);if(c(n)){if(n.length!==h)throw new Error("Invalid value array length");o=function(e){return n[e]}}else o=function(){return n};for(var g=[],d=[],v=[],y=0;p>y;y++){v.push(g.length);var x=y-a;if(x>=0&&h>x){var w=o(x);e.equal(w,0)||(d.push(x+s),g.push(w))}}return v.push(g.length),new r({values:g,index:d,ptr:v,size:[u,p]})},r.prototype.trace=function(){var r=this._size,t=r[0],n=r[1];if(t===n){var i=0;if(this._values.length>0)for(var o=0;n>o;o++)for(var a=this._ptr[o],u=this._ptr[o+1],c=a;u>c;c++){var f=this._index[c];if(f===o){i=e.add(i,this._values[c]);break}if(f>o)break}return i}throw new RangeError("Matrix must be square (size: "+s.format(r)+")")},r.prototype.multiply=function(r){var t=this._size[0],n=this._size[1];if(r instanceof h){var i=r.size();if(1===i.length)return M(this,i[0],1,function(e){return r.get([e])});if(2===i.length)return M(this,i[0],i[1],function(e,t){return r.get([e,t])});throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+i.length+" dimensions)")}if(c(r)){var a=o.size(r);if(1===a.length)return M(this,a[0],1,function(e){return r[e]});if(2===a.length)return M(this,a[0],a[1],function(e,t){return r[e][t]});throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+a.length+" dimensions)")}var s=function(t){return e.multiply(t,r)};return E(this,0,t-1,0,n-1,s,!1)};var M=function(t,n,i,o){var a=t._size[0],s=t._size[1];if(s!==n)throw new RangeError("Dimension mismatch in multiplication. Columns of A must match length of B (A is "+a+"x"+s+", B is "+n+", "+s+" != "+n+")");for(var u=[],c=[],f=[],l=[],p=0;a>p;p++)l[p]=0;for(var m=0;i>m;m++){f.push(u.length);for(var h=0;s>h;h++)for(var g=t._ptr[h],d=t._ptr[h+1],v=g;d>v;v++){var y=t._index[v];l[y]=e.add(l[y],e.multiply(t._values[v],o(h,m)))}for(var x=0;a>x;x++)e.equal(l[x],0)||(u.push(l[x]),c.push(x)),l[x]=0}return f.push(u.length),1===a&&1===i?1===u.length?u[0]:0:new r({values:u,index:c,ptr:f,size:[a,i]})};return r}},function(e,r,t){"use strict";var n=t(175),i=t(172),o=n.array,a=n.object,s=n.string,u=n.number,c=Array.isArray,f=n.number.isNumber,l=n.number.isInteger,p=o.validateIndex;e.exports=function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(e instanceof h)"CrsMatrix"===e.type?(this._values=a.clone(e._values),this._index=a.clone(e._index),this._ptr=a.clone(e._ptr),this._size=a.clone(e._size)):g(this,e.valueOf());else if(e&&c(e.values)&&c(e.index)&&c(e.ptr)&&c(e.size))this._values=e.values,this._index=e.index,this._ptr=e.ptr,this._size=e.size;else if(c(e))g(this,e);else{if(e)throw new TypeError("Unsupported type of data ("+n.types.type(e)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0]}}var t=e.type.Index,m=e.type.BigNumber,h=e.type.Matrix,g=function(r,t){r._values=[],r._index=[],r._ptr=[];for(var n=t.length,i=0,o=0;n>o;o++){r._ptr.push(r._values.length);var a=t[o];if(c(a)){a.length>i&&(i=a.length);for(var s=0;s<a.length;s++){var u=a[s];e.equal(u,0)||(r._values.push(u),r._index.push(s))}}else 0===o&&1>i&&(i=1),e.equal(a,0)||(r._values.push(a),r._index.push(0))}r._ptr.push(r._values.length),r._size=[n,i]};r.prototype=new e.type.Matrix,r.prototype.type="CrsMatrix",r.prototype.storage=function(){return"crs"},r.prototype.subset=function(e,r,t){switch(arguments.length){case 1:return d(this,e);case 2:case 3:return v(this,e,r,t);default:throw new SyntaxError("Wrong number of arguments")}};var d=function(e,r){if(!(r instanceof t))throw new TypeError("Invalid index");var n=r.isScalar();if(n)return e.get(r.min());var o=r.size();if(o.length!=e._size.length)throw new i(o.length,e._size.length);for(var a=r.min(),s=r.max(),u=0,c=e._size.length;c>u;u++)p(a[u],e._size[u]),p(s[u],e._size[u]);var f=function(e){return e};return E(e,a[0],s[0],a[1],s[1],f,!1)},v=function(e,r,n,s){if(!(r instanceof t))throw new TypeError("Invalid index");var u,c=r.size(),f=r.isScalar();if(n instanceof h?(u=n.size(),n=n.toArray()):u=o.size(n),f){if(0!==u.length)throw new TypeError("Scalar expected");e.set(r.min(),n,s)}else{if(1!==c.length&&2!==c.length)throw new i(c.length,e._size.length,"<");if(u.length<c.length){for(var l=0,p=0;1===c[l]&&1===u[l];)l++;for(;1===c[l];)p++,l++;n=o.unsqueeze(n,c.length,p,u)}if(!a.deepEqual(c,u))throw new i(c,u,">");for(var m=r.min()[0],g=r.min()[1],d=u[0],v=u[1],y=0;d>y;y++)for(var x=0;v>x;x++){var w=n[y][x];e.set([y+m,x+g],w,s)}}return e};r.prototype.get=function(e){if(!c(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new i(e.length,this._size.length);var r=e[0],t=e[1];p(r,this._size[0]),p(t,this._size[1]);var n=y(t,this._ptr[r],this._ptr[r+1],this._index);return n<this._ptr[r+1]&&this._index[n]===t?a.clone(this._values[n]):0},r.prototype.set=function(r,t,n){if(!c(r))throw new TypeError("Array expected");if(r.length!=this._size.length)throw new i(r.length,this._size.length);var o=r[0],a=r[1],s=this._size[0],u=this._size[1];(o>s-1||a>u-1)&&(b(this,Math.max(o+1,s),Math.max(a+1,u),n),s=this._size[0],u=this._size[1]),p(o,s),p(a,u);var f=y(a,this._ptr[o],this._ptr[o+1],this._index);return f<this._ptr[o+1]&&this._index[f]===a?e.equal(t,0)?x(f,o,this._values,this._index,this._ptr):this._values[f]=t:w(f,o,a,t,this._values,this._index,this._ptr),this};var y=function(e,r,t,n){if(t-r===0||e>n[t-1])return t;for(;t>r;){var i=~~((r+t)/2),o=n[i];if(o>e)t=i;else{if(!(e>o))return i;r=i+1}}return r},x=function(e,r,t,n,i){t.splice(e,1),n.splice(e,1);for(var o=r+1;o<i.length;o++)i[o]--},w=function(e,r,t,n,i,o,a){i.splice(e,0,n),o.splice(e,0,t);for(var s=r+1;s<a.length;s++)a[s]++};r.prototype.resize=function(e,r,t){if(!c(e))throw new TypeError("Array expected");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");e.forEach(function(r){if(!u.isNumber(r)||!u.isInteger(r)||0>r)throw new TypeError("Invalid size, must contain positive integers (size: "+s.format(e)+")")});var n=t?this.clone():this;return b(n,e[0],e[1],r)};var b=function(r,t,n,i){var o,a,s,u=i||0,c=!e.equal(u,0),f=r._size[0],l=r._size[1];if(t>f){for(o=f;t>o;o++)if(r._ptr[o]=r._values.length,c)for(a=0;l>a;a++)r._values.push(u),r._index.push(a);r._ptr[t]=r._values.length}else f>t&&(r._ptr.splice(t+1,f-t),r._values.splice(r._ptr[t],r._values.length),r._index.splice(r._ptr[t],r._index.length));if(f=t,n>l){if(c){var p=0;for(o=0;f>o;o++){r._ptr[o]=r._ptr[o]+p,s=r._ptr[o+1]+p;var m=0;for(a=l;n>a;a++,m++)r._values.splice(s+m,0,u),r._index.splice(s+m,0,a),p++}r._ptr[f]=r._values.length}}else if(l>n){var h=0;for(o=0;f>o;o++){r._ptr[o]=r._ptr[o]-h;var g=r._ptr[o],d=r._ptr[o+1]-h;for(s=g;d>s;s++)a=r._index[s],a>n-1&&(r._values.splice(s,1),r._index.splice(s,1),h++)}r._ptr[o]=r._values.length}return r._size[0]=t,r._size[1]=n,r};r.prototype.clone=function(){var e=new r({values:a.clone(this._values),index:a.clone(this._index),ptr:a.clone(this._ptr),size:a.clone(this._size)});return e},r.prototype.size=function(){return a.clone(this._size)},r.prototype.map=function(e,r){var t=this,n=this._size[0],i=this._size[1],o=function(r,n,i){return e(r,[n,i],t)};return E(this,0,n-1,0,i-1,o,r)};var E=function(t,n,i,o,a,s,u){for(var c=[],f=[],l=[],p=function(r,t,n){r=s(r,t,n),e.equal(r,0)||(c.push(r),f.push(n))},m=n;i>=m;m++){l.push(c.length);for(var h=t._ptr[m],g=t._ptr[m+1],d=o,v=h;g>v;v++){var y=t._index[v];if(y>=o&&a>=y){if(!u)for(var x=d;y>x;x++)p(0,m-n,x-o);p(t._values[v],m-n,y-o)}d=y+1}if(!u)for(var w=d;a>=w;w++)p(0,m-n,w-o)}return l.push(c.length),new r({values:c,index:f,ptr:l,size:[i-n+1,a-o+1]})};r.prototype.forEach=function(e,r){for(var t=this,n=this._size[0],i=this._size[1],o=0;n>o;o++){for(var a=this._ptr[o],s=this._ptr[o+1],u=0,c=a;s>c;c++){var f=this._index[c];if(!r)for(var l=u;f>l;l++)e(0,[o,l],t);e(this._values[c],[o,f],t),u=f+1}if(!r)for(var p=u;i>p;p++)e(0,[o,p],t)}},r.prototype.toArray=function(){return N(this,!0)},r.prototype.valueOf=function(){return N(this,!1)};var N=function(e,r){for(var t=[],n=e._size[0],i=e._size[1],o=0;n>o;o++){for(var s=t[o]=[],u=e._ptr[o],c=e._ptr[o+1],f=0,l=u;c>l;l++){for(var p=e._index[l],m=f;p>m;m++)s[m]=0;s[p]=r?a.clone(e._values[l]):e._values[l],f=p+1}for(var h=f;i>h;h++)s[h]=0}return t};r.prototype.format=function(e){for(var r=this._size[0],t=this._size[1],n="CRS ["+s.format(r,e)+" x "+s.format(t,e)+"] density: "+s.format(this._values.length/(r*t),e)+"\n",i=0;r>i;i++)for(var o=this._ptr[i],a=this._ptr[i+1],u=o;a>u;u++){var c=this._index[u];n+="\n    ("+s.format(i,e)+", "+s.format(c,e)+") ==> "+s.format(this._values[u],e)}return n},r.prototype.toString=function(){return s.format(this.toArray())},r.prototype.toJSON=function(){return{mathjs:"CrsMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size}},r.prototype.transpose=function(){var r=this._size[0],t=this._size[1];if(0===t)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+s.format(this._size)+")");return new e.type.CcsMatrix({values:a.clone(this._values),index:a.clone(this._index),ptr:a.clone(this._ptr),size:[t,r]})},r.prototype.diagonal=function(e){if(e){if(e instanceof m&&(e=e.toNumber()),!f(e)||!l(e))throw new TypeError("The parameter k must be an integer number")}else e=0;for(var r=e>0?e:0,t=0>e?-e:0,n=this._size[0],i=this._size[1],o=Math.min(n-t,i-r),s=[],u=t;n>u&&s.length<o;u++){for(var c=this._ptr[u],p=this._ptr[u+1],h=!1,g=c;p>g;g++){var d=this._index[g];if(d===u+r-t){h=!0,s.push(a.clone(this._values[g]));break}if(d>u+r-t)break}!h&&s.length<o&&s.push(0)}return s},r.fromJSON=function(e){return new r(e)},r.diagonal=function(t,n,i){if(!c(t))throw new TypeError("Array expected, size parameter");if(2!==t.length)throw new Error("Only two dimensions matrix are supported");if(t=t.map(function(e){if(e instanceof m&&(e=e.toNumber()),!f(e)||!l(e)||1>e)throw new Error("Size values must be positive integers");return e}),i){if(i instanceof m&&(i=i.toNumber()),!f(i)||!l(i))throw new TypeError("The parameter k must be an integer number")}else i=0;var o,a=i>0?i:0,s=0>i?-i:0,u=t[0],p=t[1],h=Math.min(u-s,p-a);if(c(n)){if(n.length!==h)throw new Error("Invalid value array length");o=function(e){return n[e]}}else o=function(){return n};for(var g=[],d=[],v=[],y=0;u>y;y++){v.push(g.length);var x=y-s;if(x>=0&&h>x){var w=o(x);e.equal(w,0)||(d.push(x+a),g.push(w))}}return v.push(g.length),new r({values:g,index:d,ptr:v,size:[u,p]})},r.prototype.trace=function(){var r=this._size,t=r[0],n=r[1];if(t===n){var i=0;if(this._values.length>0)for(var o=0;t>o;o++)for(var a=this._ptr[o],u=this._ptr[o+1],c=a;u>c;c++){var f=this._index[c];if(o===f){i=e.add(i,this._values[c]);break}if(f>o)break}return i}throw new RangeError("Matrix must be square (size: "+s.format(r)+")")},r.prototype.multiply=function(r){var t=this._size[0],n=this._size[1];if(r instanceof h){var i=r.size();if(1===i.length)return M(this,i[0],1,function(e){return r.get([e])});if(2===i.length)return M(this,i[0],i[1],function(e,t){return r.get([e,t])});throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+i.length+" dimensions)")}if(c(r)){var a=o.size(r);if(1===a.length)return M(this,a[0],1,function(e){return r[e]});if(2===a.length)return M(this,a[0],a[1],function(e,t){return r[e][t]});throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+a.length+" dimensions)")}var s=function(t){return e.multiply(t,r)};return E(this,0,t-1,0,n-1,s,!1)};var M=function(t,n,i,o){var a=t._size[0],s=t._size[1];if(s!==n)throw new RangeError("Dimension mismatch in multiplication. Columns of A must match length of B (A is "+a+"x"+s+", B is "+n+", "+s+" != "+n+")");for(var u=[],c=[],f=[],l=0;a>l;l++){f.push(u.length);for(var p=t._ptr[l],m=t._ptr[l+1],h=0;i>h;h++){for(var g=0,d=p;m>d;d++){var v=t._index[d];g=e.add(g,e.multiply(t._values[d],o(v,h)))}e.equal(g,0)||(u.push(g),c.push(h))}}return f.push(u.length),1===a&&1===i?1===u.length?u[0]:0:new r({values:u,index:c,ptr:f,size:[a,i]})};return r}},function(e,r,t){"use strict";var n=t(175),i=t(172),o=n.string,a=n.array,s=n.object,u=Array.isArray,c=n.number.isNumber,f=n.number.isInteger,l=a.validateIndex;e.exports=function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(e instanceof x)"DenseMatrix"===e.type?(this._data=s.clone(e._data),this._size=s.clone(e._size)):(this._data=e.toArray(),this._size=e.size());else if(e&&u(e.data)&&u(e.size))this._data=e.data,this._size=e.size;else if(u(e))this._data=d(e),this._size=a.size(this._data);else{if(e)throw new TypeError("Unsupported type of data ("+n.types.type(e)+")");this._data=[],this._size=[0]}}function t(e,t){if(!(t instanceof v))throw new TypeError("Invalid index");var n=t.isScalar();if(n)return e.get(t.min());var o=t.size();if(o.length!=e._size.length)throw new i(o.length,e._size.length);for(var a=t.min(),s=t.max(),u=0,c=e._size.length;c>u;u++)l(a[u],e._size[u]),l(s[u],e._size[u]);return new r(p(e._data,t,o.length,0))}function p(e,r,t,n){var i=n==t-1,o=r.range(n);return o.map(i?function(r){return e[r]}:function(i){var o=e[i];return p(o,r,t,n+1)})}function m(r,t,n,o){if(!(t instanceof v))throw new TypeError("Invalid index");var u,c=t.size(),f=t.isScalar();if(n instanceof e.type.Matrix?(u=n.size(),n=n.valueOf()):u=a.size(n),f){if(0!==u.length)throw new TypeError("Scalar expected");r.set(t.min(),n,o)}else{if(c.length<r._size.length)throw new i(c.length,r._size.length,"<");if(u.length<c.length){for(var l=0,p=0;1===c[l]&&1===u[l];)l++;for(;1===c[l];)p++,l++;n=a.unsqueeze(n,c.length,p,u)}if(!s.deepEqual(c,u))throw new i(c,u,">");var m=t.max().map(function(e){return e+1});g(r,m,o);var d=c.length,y=0;h(r._data,t,n,d,y)}return r}function h(e,r,t,n,i){var o=i==n-1,a=r.range(i);a.forEach(o?function(r,n){l(r),e[r]=t[n]}:function(o,a){l(o),h(e[o],r,t[a],n,i+1)})}function g(e,r,t){for(var n=s.clone(e._size),i=!1;n.length<r.length;)n.push(0),i=!0;for(var o=0,a=r.length;a>o;o++)r[o]>n[o]&&(n[o]=r[o],i=!0);i&&w(e,n,t)}function d(r){for(var t=0,n=r.length;n>t;t++){var i=r[t];u(i)?r[t]=d(i):i instanceof e.type.Matrix&&(r[t]=d(i.valueOf()))}return r}var v=e.type.Index,y=e.type.BigNumber,x=e.type.Matrix;r.prototype=new e.type.Matrix,r.prototype.type="DenseMatrix",r.prototype.storage=function(){return"dense"},r.prototype.subset=function(e,r,n){switch(arguments.length){case 1:return t(this,e);case 2:case 3:return m(this,e,r,n);default:throw new SyntaxError("Wrong number of arguments")}},r.prototype.get=function(e){if(!u(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new i(e.length,this._size.length);for(var r=0;r<e.length;r++)l(e[r],this._size[r]);for(var t=this._data,n=0,o=e.length;o>n;n++){var a=e[n];l(a,t.length),t=t[a]}return s.clone(t)},r.prototype.set=function(e,r,t){if(!u(e))throw new TypeError("Array expected");if(e.length<this._size.length)throw new i(e.length,this._size.length,"<");var n,o,a,s=e.map(function(e){return e+1});g(this,s,t);var c=this._data;for(n=0,o=e.length-1;o>n;n++)a=e[n],l(a,c.length),c=c[a];return a=e[e.length-1],l(a,c.length),c[a]=r,this},r.prototype.resize=function(e,r,t){if(!u(e))throw new TypeError("Array expected");var n=t?this.clone():this;return w(n,e,r)};var w=function(e,r,t){if(0===r.length){for(var n=e._data;u(n);)n=n[0];return s.clone(n)}return e._size=s.clone(r),e._data=a.resize(e._data,e._size,t),e};r.prototype.clone=function(){var e=new r({data:s.clone(this._data),size:s.clone(this._size)});return e},r.prototype.size=function(){return this._size},r.prototype.map=function(e){var t=this,n=function(r,i){return u(r)?r.map(function(e,r){return n(e,i.concat(r))}):e(r,i,t)};return new r({data:n(this._data,[]),size:s.clone(this._size)})},r.prototype.forEach=function(e){var r=this,t=function(n,i){u(n)?n.forEach(function(e,r){t(e,i.concat(r))}):e(n,i,r)};t(this._data,[])},r.prototype.toArray=function(){return s.clone(this._data)},r.prototype.valueOf=function(){return this._data},r.prototype.format=function(e){return o.format(this._data,e)},r.prototype.toString=function(){return o.format(this._data)},r.prototype.toJSON=function(){return{mathjs:"DenseMatrix",data:this._data,size:this._size}},r.prototype.transpose=function(){switch(this._size.length){case 1:return this.clone();case 2:var e=this._size[0],t=this._size[1];if(0===t)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+o.format(this._size)+")");for(var n,i=[],a=0;t>a;a++){n=i[a]=[];for(var u=0;e>u;u++)n[u]=s.clone(this._data[u][a]);

}return new r({data:i,size:[t,e]});default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(this._size)+")")}},r.prototype.diagonal=function(e){if(e){if(e instanceof y&&(e=e.toNumber()),!c(e)||!f(e))throw new TypeError("The parameter k must be an integer number")}else e=0;for(var r=e>0?e:0,t=0>e?-e:0,n=this._size[0],i=this._size[1],o=Math.min(n-t,i-r),a=[],u=0;o>u;u++)a[u]=s.clone(this._data[u+t][u+r]);return a},r.diagonal=function(e,t,n,i){if(!u(e))throw new TypeError("Array expected, size parameter");if(2!==e.length)throw new Error("Only two dimensions matrix are supported");if(e=e.map(function(e){if(e instanceof y&&(e=e.toNumber()),!c(e)||!f(e)||1>e)throw new Error("Size values must be positive integers");return e}),n){if(n instanceof y&&(n=n.toNumber()),!c(n)||!f(n))throw new TypeError("The parameter k must be an integer number")}else n=0;var o,s=n>0?n:0,l=0>n?-n:0,p=e[0],m=e[1],h=Math.min(p-l,m-s);if(u(t)){if(t.length!==h)throw new Error("Invalid value array length");o=function(e){return t[e]}}else o=function(){return t};var g=[];if(e.length>0){g=a.resize(g,e,i);for(var d=0;h>d;d++)g[d+l][d+s]=o(d)}return new r({data:g,size:[p,m]})},r.prototype.trace=function(){var r=this._size,t=this._data;switch(r.length){case 1:if(1==r[0])return s.clone(t[0]);throw new RangeError("Matrix must be square (size: "+o.format(r)+")");case 2:var n=r[0],i=r[1];if(n===i){for(var a=0,u=0;n>u;u++)a=e.add(a,t[u][u]);return a}throw new RangeError("Matrix must be square (size: "+o.format(r)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(r)+")")}},r.fromJSON=function(e){return new r(e)},r.prototype.multiply=function(e){switch(this._size.length){case 1:return b(this,this._size[0],e);case 2:return M(this,this._size[0],this._size[1],e);default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (matrix has "+this._size.length+" dimensions)")}};var b=function(r,t,n){if(n instanceof x){var i=n.size();if(1===i.length){if(i[0]!==t)throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length.");return E(r,t,function(e){return n.get([e])})}if(2===i.length){if(i[0]!==t)throw new RangeError("Dimension mismatch in multiplication. Matrix rows and Vector length must be equal.");return N(r,t,i[1],function(e,r){return n.get([e,r])})}throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+i.length+" dimensions)")}if(u(n)){var o=a.size(n);if(1===o.length){if(o[0]!==t)throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length.");return E(r,t,function(e){return n[e]})}if(2===o.length){if(o[0]!==t)throw new RangeError("Dimension mismatch in multiplication. Matrix rows and Vector length must be equal.");return N(r,t,o[1],function(e,r){return n[e][r]})}throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+o.length+" dimensions)")}return r.map(function(r){return e.multiply(n,r)})},E=function(r,t,n){if(0===t)throw new Error("Cannot multiply two empty vectors");for(var i=0,o=0;t>o;o++)i=e.add(i,e.multiply(r._data[o],n(o)));return i},N=function(t,n,i,o){for(var a=[],s=0;i>s;s++){for(var u=0,c=0;n>c;c++)u=e.add(u,e.multiply(t._data[c],o(c,s)));a[s]=u}return 1===i?a[0]:new r({data:a,size:[i]})},M=function(r,t,n,i){if(i instanceof x){var o=i.size();if(1===o.length){if(o[0]!==n)throw new RangeError("Dimension mismatch in multiplication. Matrix columns must match vector length.");return _(r,t,n,function(e){return i.get([e])})}if(2===o.length){if(o[0]!==n)throw new RangeError("Dimension mismatch in multiplication. Columns of A must match length of B (A is "+t+"x"+n+", B is "+o[0]+", "+n+" != "+o[0]+")");return A(r,t,n,o[1],function(e,r){return i.get([e,r])})}throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+o.length+" dimensions)")}if(u(i)){var s=a.size(i);if(1===s.length){if(s[0]!==n)throw new RangeError("Dimension mismatch in multiplication. Matrix columns must match vector length.");return _(r,t,n,function(e){return i[e]})}if(2===s.length){if(s[0]!==n)throw new RangeError("Dimension mismatch in multiplication. Columns of A must match length of B (A is "+t+"x"+n+", B is "+s[0]+", "+n+" != "+s[0]+")");return A(r,t,n,s[1],function(e,r){return i[e][r]})}throw new Error("Can only multiply a 1 or 2 dimensional matrix (value has "+s.length+" dimensions)")}return r.map(function(r){return e.multiply(i,r)})},_=function(t,n,i,o){for(var a=[],s=0;n>s;s++){for(var u=t._data[s],c=0,f=0;i>f;f++)c=e.add(c,e.multiply(u[f],o(f)));a[s]=c}return 1===n?a[0]:new r({data:a,size:[n]})},A=function(t,n,i,o,a){for(var s=[],u=0;n>u;u++){var c=t._data[u];s[u]=[];for(var f=0;o>f;f++){for(var l=0,p=0;i>p;p++)l=e.add(l,e.multiply(c[p],a(p,f)));s[u][f]=l}}return 1===n&&1===o?s[0][0]:new r({data:s,size:[n,o]})};return r}},function(e,r,t){"use strict";r.ArrayNode=t(177),r.AssignmentNode=t(178),r.BlockNode=t(179),r.ConditionalNode=t(180),r.ConstantNode=t(181),r.IndexNode=t(183),r.FunctionAssignmentNode=t(182),r.FunctionNode=t(185),r.Node=t(189),r.OperatorNode=t(184),r.RangeNode=t(186),r.SymbolNode=t(187),r.UpdateNode=t(188)},function(e,r,t){"use strict";var n=t(175),i=t(171),o=n.string.isString,a=Array.isArray,s=t(177),u=t(178),c=t(179),f=t(180),l=t(181),p=t(182),m=t(183),h=t(184),g=t(185),d=t(186),v=t(187),y=t(188);e.exports=function(e){function r(e,r){if(1!=arguments.length&&2!=arguments.length)throw new i("parse",arguments.length,1,2);if(pe=r&&r.nodes?r.nodes:{},o(e))return me=e,S();if(a(e)||e instanceof se)return ue.deepMap(e,function(e){if(!o(e))throw new TypeError("String expected");return me=e,S()});throw new TypeError("String or matrix expected")}function t(){he=0,ge=me.charAt(0),ye=0,xe=null}function n(){he++,ge=me.charAt(he)}function x(){return me.charAt(he+1)}function w(){return me.charAt(he+2)}function b(){for(ve=ce.NULL,de="";" "==ge||"	"==ge||"\n"==ge&&ye;)n();if("#"==ge)for(;"\n"!=ge&&""!=ge;)n();if(""==ge)return void(ve=ce.DELIMITER);if("\n"==ge&&!ye)return ve=ce.DELIMITER,de=ge,void n();var e=ge+x(),r=e+w();if(3==r.length&&fe[r])return ve=ce.DELIMITER,de=r,n(),n(),void n();if(2==e.length&&fe[e])return ve=ce.DELIMITER,de=e,n(),void n();if(fe[ge])return ve=ce.DELIMITER,de=ge,void n();if(!A(ge)){if(_(ge)){for(;_(ge)||T(ge);)de+=ge,n();return void(ve=le[de]?ce.DELIMITER:ce.SYMBOL)}for(ve=ce.UNKNOWN;""!=ge;)de+=ge,n();throw oe('Syntax error in part "'+de+'"')}if(ve=ce.NUMBER,"."==ge)de+=ge,n(),T(ge)||(ve=ce.UNKNOWN);else{for(;T(ge);)de+=ge,n();"."==ge&&(de+=ge,n())}for(;T(ge);)de+=ge,n();if(e=x(),("E"==ge||"e"==ge)&&(T(e)||"-"==e||"+"==e))for(de+=ge,n(),("+"==ge||"-"==ge)&&(de+=ge,n()),T(ge)||(ve=ce.UNKNOWN);T(ge);)de+=ge,n()}function E(){do b();while("\n"==de)}function N(){ye++}function M(){ye--}function _(e){return e>="a"&&"z">=e||e>="A"&&"Z">=e||"_"==e}function A(e){return e>="0"&&"9">=e||"."==e}function T(e){return e>="0"&&"9">=e}function S(){t(),b();var e=O();if(""!=de)throw ve==ce.DELIMITER?ae("Unexpected operator "+de):oe('Unexpected part "'+de+'"');return e}function O(){var e,r,t=[];if(""==de)return new l("undefined","undefined");for("\n"!=de&&";"!=de&&(e=z());"\n"==de||";"==de;)0==t.length&&e&&(r=";"!=de,t.push({node:e,visible:r})),b(),"\n"!=de&&";"!=de&&""!=de&&(e=z(),r=";"!=de,t.push({node:e,visible:r}));return t.length>0?new c(t):e}function z(){if(ve==ce.SYMBOL&&"function"==de)throw oe('Deprecated keyword "function". Functions can now be assigned without it, like "f(x) = x^2".');return C()}function C(){var e,r,t,n,i=q();if("="==de){if(i instanceof v)return e=i.name,E(),t=C(),new u(e,t);if(i instanceof m)return E(),t=C(),new y(i,t);if(i instanceof g&&(n=!0,r=[],e=i.name,i.args.forEach(function(e,t){e instanceof v?r[t]=e.name:n=!1}),n))return E(),t=C(),new p(e,r,t);throw oe("Invalid left hand side of assignment operator =")}return i}function q(){for(var e=U();"?"==de;){var r=xe;xe=ye,E();var t=e,n=U();if(":"!=de)throw oe("False part of conditional expression expected");xe=null,E();var i=q();e=new f(t,n,i),xe=r}return e}function U(){for(var e=B();"or"==de;)E(),e=new h("or","or",[e,B()]);return e}function B(){for(var e=I();"xor"==de;)E(),e=new h("xor","xor",[e,I()]);return e}function I(){for(var e=P();"and"==de;)E(),e=new h("and","and",[e,P()]);return e}function P(){for(var e=R();"|"==de;)E(),e=new h("|","bitOr",[e,R()]);return e}function R(){for(var e=L();"^|"==de;)E(),e=new h("^|","bitXor",[e,L()]);return e}function L(){for(var e=F();"&"==de;)E(),e=new h("&","bitAnd",[e,F()]);return e}function F(){var e,r,t,n,i;for(e=k(),r={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};de in r;)t=de,n=r[t],E(),i=[e,k()],e=new h(t,n,i);return e}function k(){var e,r,t,n,i;for(e=j(),r={"<<":"leftShift",">>":"rightArithShift",">>>":"rightLogShift"};de in r;)t=de,n=r[t],E(),i=[e,j()],e=new h(t,n,i);return e}function j(){var e,r,t,n,i;for(e=D(),r={to:"to","in":"to"};de in r;)t=de,n=r[t],E(),i=[e,D()],e=new h(t,n,i);return e}function D(){var e,r=[];if(e=":"==de?new l("1","number"):G(),":"==de&&xe!==ye){for(r.push(e);":"==de&&r.length<3;)E(),r.push(")"==de||"]"==de||","==de||""==de?new v("end"):G());e=3==r.length?new d(r[0],r[2],r[1]):new d(r[0],r[1])}return e}function G(){var e,r,t,n,i;for(e=W(),r={"+":"add","-":"subtract"};de in r;)t=de,n=r[t],E(),i=[e,W()],e=new h(t,n,i);return e}function W(){var e,r,t,n,i;if(e=Z(),r={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide","%":"mod",mod:"mod"},de in r)for(;de in r;)t=de,n=r[t],E(),i=[e,Z()],e=new h(t,n,i);return(ve==ce.SYMBOL||"in"==de&&e instanceof l||ve==ce.NUMBER&&!(e instanceof l)||"("==de||"["==de)&&(e=new h("*","multiply",[e,W()])),e}function Z(){var e,r,t={"-":"unaryMinus","+":"unaryPlus","~":"bitNot",not:"not"}[de];return t?(e=de,E(),r=[Z()],new h(e,t,r)):V()}function V(){var e,r,t,n;return e=H(),("^"==de||".^"==de)&&(r=de,t="^"==r?"pow":"dotPow",E(),n=[e,Z()],e=new h(r,t,n)),e}function H(){var e,r,t,n,i;for(e=Y(),r={"!":"factorial","'":"transpose"};de in r;)t=de,n=r[t],b(),i=[e],e=new h(t,n,i);return e}function Y(){var e,r=[];if(ve==ce.SYMBOL&&pe[de]){if(e=pe[de],b(),"("==de){if(r=[],N(),b(),")"!=de)for(r.push(q());","==de;)b(),r.push(q());if(")"!=de)throw oe("Parenthesis ) expected");M(),b()}return new e(r)}return J()}function J(){var e,r;return ve==ce.SYMBOL||ve==ce.DELIMITER&&de in le?(r=de,b(),e=X(r),e=Q(e)):$()}function X(e){var r;if("("==de){if(r=[],N(),b(),")"!=de)for(r.push(q());","==de;)b(),r.push(q());if(")"!=de)throw oe("Parenthesis ) expected");return M(),b(),new g(e,r)}return new v(e)}function Q(e){for(var r;"["==de;){if(r=[],N(),b(),"]"!=de)for(r.push(q());","==de;)b(),r.push(q());if("]"!=de)throw oe("Parenthesis ] expected");M(),b(),e=new m(e,r)}return e}function $(){var e,r,t;if('"'==de){for(r="",t="";""!=ge&&('"'!=ge||"\\"==t);)r+=ge,t=ge,n();if(b(),'"'!=de)throw oe('End of string " expected');return b(),e=new l(r,"string"),e=Q(e)}return K()}function K(){var e,r,t,n;if("["==de){if(N(),b(),"]"!=de){var i=ee();if(";"==de){for(t=1,r=[i];";"==de;)b(),r[t]=ee(),t++;if("]"!=de)throw oe("End of matrix ] expected");M(),b(),n=r[0].nodes.length;for(var o=1;t>o;o++)if(r[o].nodes.length!=n)throw ae("Column dimensions mismatch ("+r[o].nodes.length+" != "+n+")");e=new s(r)}else{if("]"!=de)throw oe("End of matrix ] expected");M(),b(),e=i}}else M(),b(),e=new s([]);return e}return re()}function ee(){for(var e=[C()],r=1;","==de;)b(),e[r]=C(),r++;return new s(e)}function re(){var e;return ve==ce.NUMBER?(e=de,b(),new l(e,"number")):te()}function te(){var e;if("("==de){if(N(),b(),e=C(),")"!=de)throw oe("Parenthesis ) expected");return M(),b(),e}return ne()}function ne(){throw oe(""==de?"Unexpected end of expression":"Value expected")}function ie(){return he-de.length+1}function oe(e){var r=ie(),t=new SyntaxError(e+" (char "+r+")");return t["char"]=r,t}function ae(e){var r=ie(),t=new Error(e+" (char "+r+")");return t["char"]=r,t}var se=e.type.Matrix,ue=e.collection,ce={NULL:0,DELIMITER:1,NUMBER:2,SYMBOL:3,UNKNOWN:4},fe={",":!0,"(":!0,")":!0,"[":!0,"]":!0,'"':!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"~":!0,"!":!0,"&":!0,"|":!0,"^|":!0,"'":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0,"<<":!0,">>":!0,">>>":!0},le={mod:!0,to:!0,"in":!0,and:!0,xor:!0,or:!0,not:!0},pe={},me="",he=0,ge="",de="",ve=ce.NULL,ye=0,xe=null;return r}},function(e,r,t){"use strict";e.exports=function(e){function r(){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.scope={}}var t=e.expression.parse;return r.prototype.parse=function(e){throw new Error("Parser.parse is deprecated. Use math.parse instead.")},r.prototype.compile=function(e){throw new Error("Parser.compile is deprecated. Use math.compile instead.")},r.prototype.eval=function(r){return t(r).compile(e).eval(this.scope)},r.prototype.get=function(e){return this.scope[e]},r.prototype.set=function(e,r){return this.scope[e]=r},r.prototype.remove=function(e){delete this.scope[e]},r.prototype.clear=function(){for(var e in this.scope)this.scope.hasOwnProperty(e)&&delete this.scope[e]},r}},function(e,r,t){r.e=t(190),r.E=t(190),r["false"]=t(191),r.i=t(192),r.Infinity=t(193),r.LN2=t(194),r.LN10=t(195),r.LOG2E=t(196),r.LOG10E=t(197),r.NaN=t(198),r["null"]=t(199),r.pi=t(200),r.PI=t(200),r.phi=t(201),r.SQRT1_2=t(202),r.SQRT2=t(203),r.tau=t(204),r["true"]=t(205),r.version=t(206),r.abs=t(210),r.add=t(211),r.ceil=t(212),r.cube=t(213),r.divide=t(214),r.dotDivide=t(215),r.dotMultiply=t(216),r.dotPow=t(217),r.exp=t(218),r.fix=t(219),r.floor=t(220),r.gcd=t(221),r.lcm=t(222),r.log=t(223),r.log10=t(224),r.mod=t(225),r.multiply=t(226),r.norm=t(227),r.nthRoot=t(228),r.pow=t(229),r.round=t(230),r.sign=t(231),r.sqrt=t(232),r.square=t(233),r.subtract=t(234),r.unaryMinus=t(235),r.unaryPlus=t(236),r.xgcd=t(237),r.bitAnd=t(238),r.bitNot=t(239),r.bitOr=t(240),r.bitXor=t(241),r.leftShift=t(242),r.rightArithShift=t(243),r.rightLogShift=t(244),r.arg=t(245),r.conj=t(246),r.re=t(247),r.im=t(248),r.bignumber=t(249),r["boolean"]=t(250),r.complex=t(251),r.index=t(252),r.matrix=t(253),r.number=t(254),r.string=t(255),r.unit=t(256),r.eval=t(257),r.help=t(258),r.and=t(259),r.not=t(260),r.or=t(261),r.xor=t(262),r.concat=t(263),r.cross=t(264),r.det=t(265),r.diag=t(266),r.dot=t(267),r.eye=t(268),r.flatten=t(269),r.inv=t(270),r.ones=t(271),r.range=t(272),r.resize=t(273),r.size=t(274),r.squeeze=t(275),r.subset=t(276),r.trace=t(277),r.transpose=t(278),r.zeros=t(279),r.combinations=t(280),r.factorial=t(281),r.gamma=t(282),r.permutations=t(283),r.pickRandom=t(284),r.random=t(285),r.randomInt=t(286),r.compare=t(287),r.deepEqual=t(288),r.equal=t(289),r.larger=t(290),r.largerEq=t(291),r.smaller=t(292),r.smallerEq=t(293),r.unequal=t(294),r.max=t(295),r.mean=t(296),r.median=t(297),r.min=t(298),r.prod=t(299),r.std=t(300),r.sum=t(301),r["var"]=t(302),r.acos=t(303),r.acosh=t(304),r.acot=t(305),r.acoth=t(306),r.acsc=t(307),r.acsch=t(308),r.asec=t(309),r.asech=t(310),r.asin=t(311),r.asinh=t(312),r.atan=t(313),r.atanh=t(314),r.atan2=t(315),r.cos=t(316),r.cosh=t(317),r.cot=t(318),r.coth=t(319),r.csc=t(320),r.csch=t(321),r.sec=t(322),r.sech=t(323),r.sin=t(324),r.sinh=t(325),r.tan=t(326),r.tanh=t(327),r.to=t(328),r.clone=t(329),r.map=t(330),r.filter=t(331),r.forEach=t(332),r.format=t(333),r["import"]=t(334),r.sort=t(335),r["typeof"]=t(336)},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var n=t&&t.mathjs,i=e.type[n];return i&&i.fromJSON?i.fromJSON(t):t}return r}},function(e,r,t){"use strict";var n=t(5),i=t(208).transform,o=t(3).isNumber,a=t(169).argsToArray;e.exports=function(e){var r=function(){var r=a(arguments),t=r.length-1,s=r[t];o(s)?r[t]=s-1:s instanceof n&&(r[t]=s.minus(1));try{return e.concat.apply(e,r)}catch(u){throw i(u)}};return e.concat.transform=r,r}},function(e,r,t){"use strict";var n=t(187),i=(t(209).isBoolean,t(169).argsToArray,t(171));e.exports=function(e){var r=e.filter,t=function(e,t,o){if(2!==e.length)throw new i("filter",arguments.length,2);var a,s=e[0].compile(t).eval(o);if(e[1]instanceof n)a=e[1].compile(t).eval(o);else{var u=o||{},c=e[1].filter(function(e){return e instanceof n&&!(e.name in t)&&!(e.name in u)})[0],f=Object.create(u),l=e[1].compile(t);if(!c)throw new Error("No undefined variable found in filter equation");var p=c.name;a=function(e){return f[p]=e,l.eval(f)}}return r(s,a)};return t.rawArgs=!0,e.filter.transform=t,t}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r,t){var n=function(e,i){Array.isArray(e)?e.forEach(function(e,r){n(e,i.concat(r+1))}):r(e,i,t)};n(e,[])}var t=e.type.Matrix,n=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("forEach",arguments.length,2);if(Array.isArray(n))r(n,i,n);else{if(!(n instanceof t))throw new e.error.UnsupportedTypeError("forEach",e["typeof"](n));r(n.valueOf(),i,n)}};return e.forEach.transform=n,n}},function(e,r,t){"use strict";var n=t(5),i=t(8),o=t(9),a=t(3).isNumber;e.exports=function(e){var r=function(){for(var e=[],r=0,t=arguments.length;t>r;r++){var s=arguments[r];if(s instanceof i)s.start--,s.end-=s.step>0?0:2;else if(a(s))s--;else{if(!(s instanceof n))throw new TypeError("Ranges must be a Number or Range");s=s.toNumber()-1}e[r]=s}var u=new o;return o.apply(u,e),u};return e.index.transform=r,r}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r,t){var n=function(e,i){return Array.isArray(e)?e.map(function(e,r){return n(e,i.concat(r+1))}):r(e,i,t)};return n(e,[])}var t=e.type.Matrix,n=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("map",arguments.length,2);if(Array.isArray(n))return r(n,i,n);if(n instanceof t)return e.matrix(r(n.valueOf(),i,n));throw new e.error.UnsupportedTypeError("map",e["typeof"](n))};return e.map.transform=n,n}},function(e,r,t){"use strict";var n=t(5),i=t(208).transform,o=t(3).isNumber,a=t(169).argsToArray;e.exports=function(e){var r=e.collection.isCollection,t=function(){var t=a(arguments);if(2==t.length&&r(t[0])){var s=t[1];o(s)?t[1]=s-1:s instanceof n&&(t[1]=s.minus(1))}try{return e.max.apply(e,t)}catch(u){throw i(u)}};return e.max.transform=t,t}},function(e,r,t){"use strict";var n=t(5),i=t(208).transform,o=t(3).isNumber,a=t(169).argsToArray;e.exports=function(e){var r=e.collection.isCollection,t=function(){var t=a(arguments);if(2==t.length&&r(t[0])){var s=t[1];o(s)?t[1]=s-1:s instanceof n&&(t[1]=s.minus(1))}try{return e.mean.apply(e,t)}catch(u){throw i(u)}};return e.mean.transform=t,t}},function(e,r,t){"use strict";var n=t(5),i=t(208).transform,o=t(3).isNumber,a=t(169).argsToArray;e.exports=function(e){var r=e.collection.isCollection,t=function(){var t=a(arguments);if(2==t.length&&r(t[0])){var s=t[1];o(s)?t[1]=s-1:s instanceof n&&(t[1]=s.minus(1))}try{return e.min.apply(e,t)}catch(u){throw i(u)}};return e.min.transform=t,t}},function(e,r,t){"use strict";var n=t(209).isBoolean,i=t(169).argsToArray;e.exports=function(e){var r=function(){var r=i(arguments),t=r.length-1,o=r[t];return n(o)||r.push(!0),e.range.apply(e,r)};return e.range.transform=r,r}},function(e,r,t){"use strict";var n=t(208).transform,i=(t(209).isBoolean,t(169).argsToArray);e.exports=function(e){var r=function(){try{return e.subset.apply(e,i(arguments))}catch(r){throw n(r)}};return e.subset.transform=r,r}},function(e,r,t){"use strict";e.exports=function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");e instanceof r?this.value=e.value:this.value=e}function n(e,t){var n=Array.prototype.slice;"function"==typeof t?r.prototype[e]=function(){var e=[this.value].concat(n.call(arguments,0));return new r(t.apply(this,e))}:r.prototype[e]=new r(t)}var i=t(176);r.prototype.done=function(){return this.value},r.prototype.valueOf=function(){return this.value},r.prototype.toString=function(){return i.format(this.value)},r.createProxy=n;for(var o in e)e.hasOwnProperty(o)&&n(o,e[o]);return r}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=e.collection,o=i.isCollection,a=r.number.isNumber,s=r.string.isString,u=r["boolean"].isBoolean;e.bignumber=function c(r){if(arguments.length>1)throw new e.error.ArgumentsError("bignumber",arguments.length,0,1);if(r instanceof n||a(r)||s(r))return new n(r);if(u(r)||null===r)return new n(+r);if(o(r))return i.deepMap(r,c);if(0==arguments.length)return new n(0);throw new e.error.UnsupportedTypeError("bignumber",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=e.collection,o=i.isCollection,a=r.number.isNumber,s=r.string.isString;e["boolean"]=function u(r){if(1!=arguments.length)throw new e.error.ArgumentsError("boolean",arguments.length,0,1);if("true"===r||r===!0)return!0;if("false"===r||r===!1||null===r)return!1;if(r instanceof Boolean)return 1==r;if(a(r))return 0!==r;if(r instanceof n)return!r.isZero();if(s(r)){var t=r.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;var c=Number(r);if(""!=r&&!isNaN(c))return 0!==c}if(o(r))return i.deepMap(r,u);throw new SyntaxError(r.toString()+" is no valid boolean")}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=o.isCollection,s=r.number.isNumber,u=r.string.isString,c=i.isComplex;e.complex=function f(r){switch(arguments.length){case 0:return new i(0,0);case 1:var t=arguments[0];if(s(t))return new i(t,0);if(t instanceof n)return new i(t.toNumber(),0);if(c(t))return t.clone();if(u(t)){var l=i.parse(t);if(l)return l;throw new SyntaxError('String "'+t+'" is no valid complex number')}if(a(t))return o.deepMap(t,f);if("object"==typeof t){if("re"in t&&"im"in t)return new i(t.re,t.im);if("r"in t&&"phi"in t)return i.fromPolar(t.r,t.phi)}throw new TypeError("Two numbers, single string or an fitting object expected in function complex");case 2:var p=arguments[0],m=arguments[1];if(p instanceof n&&(p=p.toNumber()),m instanceof n&&(m=m.toNumber()),s(p)&&s(m))return new i(p,m);throw new TypeError("Two numbers or a single string expected in function complex");default:throw new e.error.ArgumentsError("complex",arguments.length,0,2)}}}},function(e,r,t){"use strict";e.exports=function(e){var r=(t(175),e.type.BigNumber),n=t(9);e.index=function(e){var t=Array.prototype.slice.apply(arguments).map(function(e){return e instanceof r?e.toNumber():Array.isArray(e)?e.map(function(e){return e instanceof r?e.toNumber():e}):e}),i=new n;return n.apply(i,t),i}}},function(e,r,t){"use strict";var n=t(176),i=Array.isArray,o=n.isString;e.exports=function(e){var r=e.type.Matrix;e.matrix=function(t,n){switch(arguments.length){case 0:t=[],n="default";break;case 1:i(t)?n="default":t instanceof r?n=t.storage():o(t)&&(n=t,t=[]);break;case 2:if(!(i(t)||t instanceof r))throw new TypeError("data must be an array value or Matrix instance");break;default:throw new e.error.ArgumentsError("matrix",arguments.length,0,2)}var a=r.storage(n);return new a(t)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=e.type.Unit,o=e.collection,a=o.isCollection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=r.string.isString;e.number=function f(r,t){switch(arguments.length){case 0:return 0;case 1:if(a(r))return o.deepMap(r,f);if(r instanceof n)return r.toNumber();if(c(r)){var l=Number(r);if(isNaN(l)&&(l=Number(r.valueOf())),isNaN(l))throw new SyntaxError(r.toString()+" is no valid number");return l}if(u(r)||null===r)return+r;if(s(r))return r;if(r instanceof i)throw new Error("Second argument with valueless unit expected");throw new e.error.UnsupportedTypeError("number",e["typeof"](r));case 2:if(r instanceof i&&c(t)||t instanceof i)return r.toNumber(t);throw new e.error.UnsupportedTypeError("number",e["typeof"](r),e["typeof"](t));default:throw new e.error.ArgumentsError("number",arguments.length,0,1)}}}},function(e,r,t){"use strict";e.exports=function(e){var r=e.expression.Parser;e.parser=function(){return new r}}},function(e,r,t){"use strict";e.exports=function(e){e.chain=function(r){return new e.chaining.Chain(r)},e.select=function(r){return console&&"function"==typeof console.log&&console.log('WARNING: Function "select" is renamed to "chain". It will be deprecated in v2.0.'),e.select=e.chain,e.chaining.Chain.prototype.select=e.select,e.chain(r)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.collection,i=r.number,o=r.number.isNumber,a=n.isCollection;e.string=function s(r){switch(arguments.length){case 0:return"";case 1:return o(r)?i.format(r):a(r)?n.deepMap(r,s):null===r?"null":r.toString();default:throw new e.error.ArgumentsError("string",arguments.length,0,1)}}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(11),o=e.collection,a=o.isCollection,s=r.string.isString;e.unit=function u(r){switch(arguments.length){case 1:var t=arguments[0];if(t instanceof i)return t.clone();if(s(t)){if(i.isValuelessUnit(t))return new i(null,t);var c=i.parse(t);if(c)return c;throw new SyntaxError('String "'+t+'" is no valid unit')}if(a(r))return o.deepMap(r,u);throw new TypeError("A string or a number and string expected in function unit");case 2:return arguments[0]instanceof n?new i(arguments[0].toNumber(),arguments[1]):new i(arguments[0],arguments[1]);default:throw new e.error.ArgumentsError("unit",arguments.length,1,2)}}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.expression.parse,o=e.collection,a=n.string.isString,s=o.isCollection;e.compile=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("compile",arguments.length,1);if(a(r))return i(r).compile(e);if(s(r))return o.deepMap(r,function(r){return i(r).compile(e)});throw new TypeError("String, array, or matrix expected")}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.expression.parse,i=e.collection,o=r.string.isString,a=i.isCollection;e.eval=function(r,t){if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("eval",arguments.length,1,2);if(t=t||{},o(r))return n(r).compile(e).eval(t);if(a(r))return i.deepMap(r,function(r){return n(r).compile(e).eval(t)});throw new TypeError("String, array, or matrix expected")}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(12);e.help=function(t){if(1!=arguments.length)throw new SyntaxError("Wrong number of arguments in function help ("+arguments.length+" provided, 1 expected)");var n=null;if(t instanceof String||"string"==typeof t)n=t;else{var i;for(i in e)if(e.hasOwnProperty(i)&&t===e[i]){n=i;break}}var o=e.expression.docs[n];if(!n)throw new Error('Cannot find "'+t+'" in math.js');if(!o)throw new Error('No documentation found on "'+n+'"');return new r(o)}}},function(e,r,t){"use strict";e.exports=function(e,r){var t=e.expression.parse;e.parse=function(e,r){return t.apply(t,arguments)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.abs=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("abs",arguments.length,1);if(a(r))return Math.abs(r);if(u(r)){var t=Math.abs(r.re),i=Math.abs(r.im);if(1e3>t&&1e3>i)return Math.sqrt(t*t+i*i);if(t>=i){var l=i/t;return t*Math.sqrt(1+l*l)}var p=t/i;return i*Math.sqrt(1+p*p)}if(r instanceof n)return r.abs();if(c(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return Math.abs(r);throw new e.error.UnsupportedTypeError("abs",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r["boolean"].isBoolean,u=r.number.isNumber,c=r.string.isString,f=i.isComplex,l=o.isUnit,p=a.isCollection;e.add=function m(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("add",arguments.length,2);if(u(r)){if(u(t))return r+t;if(f(t))return new i(r+t.re,t.im)}if(f(r)){if(f(t))return new i(r.re+t.re,r.im+t.im);if(u(t))return new i(r.re+t,r.im)}if(l(r)&&l(t)){if(null==r.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!r.equalBase(t))throw new Error("Units do not match");var o=r.clone();return o.value+=t.value,o.fixPrefix=!1,o}if(r instanceof n)return u(t)?t=n.convert(t):(s(t)||null===t)&&(t=new n(t?1:0)),t instanceof n?r.plus(t):m(r.toNumber(),t);if(t instanceof n)return u(r)?r=n.convert(r):(s(r)||null===r)&&(r=new n(r?1:0)),r instanceof n?r.plus(t):m(r,t.toNumber());if(p(r)||p(t))return a.deepMap2(r,t,m);if(c(r)||c(t))return r+t;if(s(r)||null===r)return m(+r,t);if(s(t)||null===t)return m(r,+t);throw new e.error.UnsupportedTypeError("add",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,c=i.isComplex;e.ceil=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("ceil",arguments.length,1);if(a(r))return Math.ceil(r);if(c(r))return new i(Math.ceil(r.re),Math.ceil(r.im));if(r instanceof n)return r.ceil();if(u(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return Math.ceil(r);throw new e.error.UnsupportedTypeError("ceil",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.cube=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cube",arguments.length,1);if(a(r))return r*r*r;if(u(r))return e.multiply(e.multiply(r,r),r);if(r instanceof n)return r.times(r).times(r);if(c(r))return o.deepMap(r,f);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("cube",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){var t=r.re*r.re+r.im*r.im;return 0!=t?new o((e.re*r.re+e.im*r.im)/t,(e.im*r.re-e.re*r.im)/t):new o(0!=e.re?e.re/0:0,0!=e.im?e.im/0:0)}var n=t(175),i=e.type.BigNumber,o=t(7),a=(e.type.Matrix,t(11)),s=n.number.isNumber,u=n["boolean"].isBoolean,c=o.isComplex,f=a.isUnit;e._divide=function l(t,n){if(s(t)){if(s(n))return t/n;if(c(n))return r(new o(t,0),n)}if(c(t)){if(c(n))return r(t,n);if(s(n))return r(t,new o(n,0))}if(t instanceof i)return s(n)?n=i.convert(n):(u(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.div(n):l(t.toNumber(),n);if(n instanceof i)return s(t)?t=i.convert(t):(u(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.div(n):l(t,n.toNumber());if(f(t)&&s(n)){var a=t.clone();return a.value=(null===a.value?a._normalize(1):a.value)/n,a}if(u(t)||null===t)return l(+t,n);if(u(n)||null===n)return l(t,+n);throw new e.error.UnsupportedTypeError("divide",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){var r=e.collection,t=r.isCollection;e.divide=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("divide",arguments.length,2);return t(n)?t(i)?e.multiply(n,e.inv(i)):r.deepMap2(n,i,e._divide):t(i)?e.multiply(n,e.inv(i)):e._divide(n,i)}}},function(e,r,t){"use strict";e.exports=function(e){var r=e.collection;e.dotDivide=function(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("dotDivide",arguments.length,2);return r.deepMap2(t,n,e.divide)},e.edivide=function(){throw new Error("Function edivide is renamed to dotDivide")}}},function(e,r,t){"use strict";e.exports=function(e){var r=(t(175),e.collection);e.dotMultiply=function(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("dotMultiply",arguments.length,2);return r.deepMap2(t,n,e.multiply)},e.emultiply=function(){throw new Error("Function emultiply is renamed to dotMultiply")}}},function(e,r,t){"use strict";e.exports=function(e){var r=(t(175),e.collection);e.dotPow=function(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("dotPow",arguments.length,2);return r.deepMap2(t,n,e.pow)},e.epow=function(){throw new Error("Function epow is renamed to dotPow")}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=(e.type.Matrix,e.collection),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;

    e.exp=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("exp",arguments.length,1);if(a(r))return Math.exp(r);if(u(r)){var t=Math.exp(r.re);return new i(t*Math.cos(r.im),t*Math.sin(r.im))}if(r instanceof n)return r.exp();if(c(r))return o.deepMap(r,f);if(s(r)||null===r)return Math.exp(r);throw new e.error.UnsupportedTypeError("exp",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.fix=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("fix",arguments.length,1);if(a(r))return r>0?Math.floor(r):Math.ceil(r);if(u(r))return new i(r.re>0?Math.floor(r.re):Math.ceil(r.re),r.im>0?Math.floor(r.im):Math.ceil(r.im));if(r instanceof n)return r.isNegative()?r.ceil():r.floor();if(c(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("fix",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.floor=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("floor",arguments.length,1);if(a(r))return Math.floor(r);if(u(r))return new i(Math.floor(r.re),Math.floor(r.im));if(r instanceof n)return r.floor();if(c(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("floor",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){if(!e.isInt()||!r.isInt())throw new Error("Parameters in function gcd must be integer numbers");for(var t=new i(0);!r.isZero();){var n=e.mod(r);e=r,r=n}return e.lt(t)?e.neg():e}var n=t(175),i=e.type.BigNumber,o=e.collection,a=n.number.isNumber,s=n["boolean"].isBoolean,u=n.number.isInteger,c=o.isCollection;e.gcd=function f(t){var n,l=arguments[0],p=arguments[1];if(2==arguments.length){if(a(l)&&a(p)){if(!u(l)||!u(p))throw new Error("Parameters in function gcd must be integer numbers");for(;0!=p;)n=l%p,l=p,p=n;return 0>l?-l:l}if(c(l)||c(p))return o.deepMap2(l,p,f);if(l instanceof i)return a(p)?p=i.convert(p):(s(p)||null===p)&&(p=new i(p?1:0)),p instanceof i?r(l,p):f(l.toNumber(),p);if(p instanceof i)return a(l)?l=i.convert(l):(s(l)||null===l)&&(l=new i(l?1:0)),l instanceof i?r(l,p):f(l.toNumber(),p);if(s(l)||null===l)return f(+l,p);if(s(p)||null===p)return f(l,+p);throw new e.error.UnsupportedTypeError("gcd",e["typeof"](l),e["typeof"](p))}if(arguments.length>2){for(var m=1;m<arguments.length;m++)l=f(l,arguments[m]);return l}throw new SyntaxError("Function gcd expects two or more arguments")}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){if(!e.isInt()||!r.isInt())throw new Error("Parameters in function lcm must be integer numbers");if(e.isZero()||r.isZero())return new i(0);for(var t=e.times(r);!r.isZero();){var n=r;r=e.mod(n),e=n}return t.div(e).abs()}var n=t(175),i=e.type.BigNumber,o=e.collection,a=n.number.isNumber,s=n["boolean"].isBoolean,u=n.number.isInteger,c=o.isCollection;e.lcm=function f(t){var n,l=arguments[0],p=arguments[1];if(2==arguments.length){if(a(l)&&a(p)){if(!u(l)||!u(p))throw new Error("Parameters in function lcm must be integer numbers");if(0==l||0==p)return 0;for(var m=l*p;0!=p;)n=p,p=l%n,l=n;return Math.abs(m/l)}if(c(l)||c(p))return o.deepMap2(l,p,f);if(l instanceof i)return a(p)?p=i.convert(p):(s(p)||null===p)&&(p=new i(p?1:0)),p instanceof i?r(l,p):f(l.toNumber(),p);if(p instanceof i)return a(l)?l=i.convert(l):(s(l)||null===l)&&(l=new i(l?1:0)),l instanceof i?r(l,p):f(l.toNumber(),p);if(s(l)||null===l)return f(+l,p);if(s(p)||null===p)return f(l,+p);throw new e.error.UnsupportedTypeError("lcm",e["typeof"](l),e["typeof"](p))}if(arguments.length>2){for(var h=1;h<arguments.length;h++)l=f(l,arguments[h]);return l}throw new SyntaxError("Function lcm expects two or more arguments")}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.log=function f(r,t){if(1==arguments.length){if(a(r))return r>=0?Math.log(r):f(new i(r,0));if(u(r))return new i(Math.log(Math.sqrt(r.re*r.re+r.im*r.im)),Math.atan2(r.im,r.re));if(r instanceof n)return r.isNegative()?f(r.toNumber()):r.ln();if(c(r))return o.deepMap(r,f);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("log",e["typeof"](r))}if(2==arguments.length)return e.divide(f(r),f(t));throw new e.error.ArgumentsError("log",arguments.length,1,2)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.log10=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("log10",arguments.length,1);if(a(r))return r>=0?Math.log(r)/Math.LN10:f(new i(r,0));if(r instanceof n)return r.isNegative()?f(r.toNumber()):r.log();if(u(r))return new i(Math.log(Math.sqrt(r.re*r.re+r.im*r.im))/Math.LN10,Math.atan2(r.im,r.re)/Math.LN10);if(c(r))return o.deepMap(r,f);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("log10",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){if(r>0)return e-r*Math.floor(e/r);if(0==r)return e;throw new Error("Cannot calculate mod for a negative divisor")}var n=t(175),i=e.type.BigNumber,o=e.collection,a=n.number.isNumber,s=n["boolean"].isBoolean,u=o.isCollection;e.mod=function c(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("mod",arguments.length,2);if(a(t)&&a(n))return r(t,n);if(t instanceof i)return a(n)?n=i.convert(n):(s(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?n.isZero()?t:t.mod(n):c(t.toNumber(),n);if(n instanceof i)return a(t)?t=i.convert(t):(s(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?n.isZero()?t:t.mod(n):c(t,n.toNumber());if(u(t)||u(n))return o.deepMap2(t,n,c);if(s(t)||null===t)return c(+t,n);if(s(n)||null===n)return c(t,+n);throw new e.error.UnsupportedTypeError("mod",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){return 0==e.im?0==r.im?new o(e.re*r.re,0):0==r.re?new o(0,e.re*r.im):new o(e.re*r.re,e.re*r.im):0==e.re?0==r.im?new o(0,e.im*r.re):0==r.re?new o(-e.im*r.im,0):new o(-e.im*r.im,e.im*r.re):0==r.im?new o(e.re*r.re,e.im*r.re):0==r.re?new o(-e.im*r.im,e.re*r.im):new o(e.re*r.re-e.im*r.im,e.re*r.im+e.im*r.re)}var n=t(175),i=e.type.BigNumber,o=t(7),a=e.type.Matrix,s=t(11),u=e.collection,c=n.number.isNumber,f=n["boolean"].isBoolean,l=o.isComplex,p=Array.isArray,m=s.isUnit;e.multiply=function h(t,n){var s;if(2!=arguments.length)throw new e.error.ArgumentsError("multiply",arguments.length,2);if(c(t)){if(c(n))return t*n;if(l(n))return r(new o(t,0),n);if(m(n))return s=n.clone(),s.value=null===s.value?s._normalize(t):s.value*t,s}if(l(t)){if(c(n))return r(t,new o(n,0));if(l(n))return r(t,n)}if(t instanceof i)return c(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.times(n):h(t.toNumber(),n);if(n instanceof i)return c(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.times(n):h(t,n.toNumber());if(m(t)&&c(n))return s=t.clone(),s.value=null===s.value?s._normalize(n):s.value*n,s;if(p(t)){var g=e.matrix(t),d=g.multiply(n);return d instanceof a?n instanceof a?d:d.valueOf():d}if(t instanceof a)return t.multiply(n);if(p(n))return u.deepMap2(t,n,h);if(n instanceof a){var v=function(e){return h(t,e)};return u.deepMap(n,v,!0)}if(f(t)||null===t)return h(+t,n);if(f(n)||null===n)return h(t,+n);throw new e.error.UnsupportedTypeError("multiply",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.type.Matrix,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=Array.isArray;e.norm=function f(r,t){if(arguments.length<1||arguments.length>2)throw new e.error.ArgumentsError("abs",arguments.length,1,2);if(a(r))return Math.abs(r);if(u(r)){var i=Math.abs(r.re),l=Math.abs(r.im);if(i>=l){var p=l/i;return i*Math.sqrt(1+p*p)}var m=i/l;return l*Math.sqrt(1+m*m)}if(r instanceof n)return r.abs();if(s(r)||null===r)return Math.abs(r);if(c(r))return f(e.matrix(r),t);if(r instanceof o){var h=r.size();if(null==t&&(t=2),1==h.length){if(t===Number.POSITIVE_INFINITY||"inf"===t){var g;return r.forEach(function(r){var t=e.abs(r);(!g||e.larger(t,g))&&(g=t)},!0),g}if(t===Number.NEGATIVE_INFINITY||"-inf"===t){var g;return r.forEach(function(r){var t=e.abs(r);(!g||e.smaller(t,g))&&(g=t)},!0),g}if("fro"===t)return f(r);if(a(t)&&!isNaN(t)){if(!e.equal(t,0)){var g=0;return r.forEach(function(r){g=e.add(e.pow(e.abs(r),t),g)},!0),e.pow(g,1/t)}return Number.POSITIVE_INFINITY}throw new Error("Unsupported parameter value")}if(2==h.length){if(1==t){var d=[];return r.forEach(function(r,t){var n=t[1];d[n]=e.add(d[n]||0,e.abs(r))},!0),e.max(d)}if(t==Number.POSITIVE_INFINITY||"inf"===t){var v=[];return r.forEach(function(r,t){var n=t[0];v[n]=e.add(v[n]||0,e.abs(r))},!0),e.max(v)}if("fro"===t)return e.sqrt(r.transpose().multiply(r).trace());if(2==t)throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value")}}throw new e.error.UnsupportedTypeError("norm",r)}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){var t=void 0!=r?r:2,n=0>t;if(n&&(t=-t),0==t)throw new Error("Root must be non-zero");if(0>e&&Math.abs(t)%2!=1)throw new Error("Root must be odd when a is negative.");if(0==e)return 0;if(!Number.isFinite(e))return n?0:e;var i=1e-16,o=1,a=0,s=100;do{var u=(e/Math.pow(o,t-1)-o)/t;o+=u,a++}while(Math.abs(u)>i&&s>a);return n?1/o:o}function i(e,r){var t=void 0!=r?r:new a(2),n=new a(0),i=new a(1),o=t.isNegative();if(o&&(t=t.negated()),t.isZero())throw new Error("Root must be non-zero");if(e.isNegative()&&!t.abs().mod(2).equals(1))throw new Error("Root must be odd when a is negative.");if(e.isZero())return n;if(!e.isFinite())return o?n:e;var s=i,u=0,c=100;do{var f=s,l=e.div(s.pow(t.minus(1))).minus(s).div(t);s=s.plus(l),u++}while(!s.equals(f)&&c>u);return o?i.div(s):s}var o=t(175),a=e.type.BigNumber,s=e.collection,u=o.number.isNumber,c=o["boolean"].isBoolean,f=s.isCollection;e.nthRoot=function l(t,o){if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("nthRoot",arguments.length,1,2);switch(arguments.length){case 1:if(u(t))return r(t);if(t instanceof a)return i(t);if(f(t))return s.deepMap(x,l);if(c(t)||null===t)return l(+t);break;case 2:if(u(t)){if(u(o))return r(t,o);if(o instanceof a)return t=a.convert(t),t instanceof a?i(t,o):r(t,o.toNumber())}else{if(t instanceof a)return u(o)&&(o=a.convert(o)),o instanceof a?i(t,o):r(t.toNumber(),o);if(f(t)&&!f(o))return s.deepMap2(t,o,l)}if(c(t)||null===t)return l(+t,o);if(c(o)||null===o)return l(t,+o);break;default:throw new e.error.ArgumentsError("nthRoot",arguments.length,1,2)}if(c(x)||null===x)return 2==arguments.length?l(+x,n):l(+x);throw new e.error.UnsupportedTypeError("nthRoot",e["typeof"](t),e["typeof"](o))}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var n=e.log(r),i=e.multiply(n,t);return e.exp(i)}var n=t(175),i=e.type.BigNumber,o=t(7),a=e.type.Matrix,s=n.array,u=n.number.isNumber,c=n["boolean"].isBoolean,f=Array.isArray,l=n.number.isInteger,p=o.isComplex;e.pow=function m(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("pow",arguments.length,2);if(u(t)){if(u(n))return l(n)||t>=0?Math.pow(t,n):r(new o(t,0),new o(n,0));if(p(n))return r(new o(t,0),n)}if(p(t)){if(u(n))return r(t,new o(n,0));if(p(n))return r(t,n)}if(t instanceof i)return u(n)?n=i.convert(n):(c(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?n.isInteger()||!t.isNegative()?t.pow(n):m(t.toNumber(),n.toNumber()):m(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(c(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?n.isInteger()&&!t.isNegative()?t.pow(n):m(t.toNumber(),n.toNumber()):m(t,n.toNumber());if(f(t)){if(!u(n)||!l(n)||0>n)throw new TypeError("For A^b, b must be a positive integer (value is "+n+")");var h=s.size(t);if(2!=h.length)throw new Error("For A^b, A must be 2 dimensional (A has "+h.length+" dimensions)");if(h[0]!=h[1])throw new Error("For A^b, A must be square (size is "+h[0]+"x"+h[1]+")");for(var g=e.eye(h[0]).valueOf(),d=t;n>=1;)1==(1&n)&&(g=e.multiply(d,g)),n>>=1,d=e.multiply(d,d);return g}if(t instanceof a)return e.matrix(m(t.valueOf(),n));if(c(t)||null===t)return m(+t,n);if(c(n)||null===n)return m(t,+n);throw new e.error.UnsupportedTypeError("pow",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){return parseFloat(p(e,r))}var n=t(175),i=e.type.BigNumber,o=t(7),a=e.collection,s=n.number.isNumber,u=n.number.isInteger,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isCollection,p=n.number.toFixed;e.round=function m(t,n){if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("round",arguments.length,1,2);if(void 0==n){if(s(t))return Math.round(t);if(f(t))return new o(Math.round(t.re),Math.round(t.im));if(t instanceof i)return t.toDecimalPlaces(0);if(l(t))return a.deepMap(t,m);if(c(t)||null===t)return Math.round(t);throw new e.error.UnsupportedTypeError("round",e["typeof"](t))}if(!s(n)||!u(n)){if(!(n instanceof i)){if(c(n)||null===t)return m(t,+n);throw new TypeError("Number of decimals in function round must be an integer")}n=parseFloat(n.valueOf())}if(0>n||n>15)throw new Error("Number of decimals in function round must be in te range of 0-15");if(s(t))return r(t,n);if(f(t))return new o(r(t.re,n),r(t.im,n));if(t instanceof i)return t.toDecimalPlaces(n);if(l(t)||l(n))return a.deepMap2(t,n,m);if(c(t)||null===t)return m(+t,n);throw new e.error.UnsupportedTypeError("round",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isCollection;e.sign=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sign",arguments.length,1);if(s(r))return a.sign(r);if(c(r)){var t=Math.sqrt(r.re*r.re+r.im*r.im);return new i(r.re/t,r.im/t)}if(r instanceof n)return new n(r.cmp(0));if(f(r))return o.deepMap(r,l,!0);if(u(r)||null===r)return a.sign(r);throw new e.error.UnsupportedTypeError("sign",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.sqrt=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sqrt",arguments.length,1);if(a(r))return r>=0?Math.sqrt(r):f(new i(r,0));if(u(r)){var t,l,p=Math.sqrt(r.re*r.re+r.im*r.im);return t=r.re>=0?.5*Math.sqrt(2*(p+r.re)):Math.abs(r.im)/Math.sqrt(2*(p-r.re)),l=r.re<=0?.5*Math.sqrt(2*(p-r.re)):Math.abs(r.im)/Math.sqrt(2*(p+r.re)),r.im>=0?new i(t,l):new i(t,-l)}if(r instanceof n)return r.isNegative()?f(r.toNumber()):r.sqrt();if(c(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return f(+r);throw new e.error.UnsupportedTypeError("sqrt",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection;e.square=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("square",arguments.length,1);if(a(r))return r*r;if(u(r))return e.multiply(r,r);if(r instanceof n)return r.times(r);if(c(r))return o.deepMap(r,f,!0);if(s(r)||null===r)return r*r;throw new e.error.UnsupportedTypeError("square",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=(e.type.Matrix,t(11)),a=e.collection,s=r["boolean"].isBoolean,u=r.number.isNumber,c=i.isComplex,f=o.isUnit,l=a.isCollection;e.subtract=function p(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("subtract",arguments.length,2);if(u(r)){if(u(t))return r-t;if(c(t))return new i(r-t.re,-t.im)}else if(c(r)){if(u(t))return new i(r.re-t,r.im);if(c(t))return new i(r.re-t.re,r.im-t.im)}if(r instanceof n)return u(t)?t=n.convert(t):(s(t)||null===t)&&(t=new n(t?1:0)),t instanceof n?r.minus(t):p(r.toNumber(),t);if(t instanceof n)return u(r)?r=n.convert(r):(s(r)||null===r)&&(r=new n(r?1:0)),r instanceof n?r.minus(t):p(r,t.toNumber());if(f(r)&&f(t)){if(null==r.value)throw new Error("Parameter x contains a unit with undefined value");if(null==t.value)throw new Error("Parameter y contains a unit with undefined value");if(!r.equalBase(t))throw new Error("Units do not match");var o=r.clone();return o.value-=t.value,o.fixPrefix=!1,o}if(l(r)||l(t))return a.deepMap2(r,t,p);if(s(r)||null===r)return p(+r,t);if(s(t)||null===t)return p(r,+t);throw new e.error.UnsupportedTypeError("subtract",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=n.string.isString,l=o.isComplex,p=a.isUnit,m=s.isCollection;e.unaryMinus=function h(t){if(1!=arguments.length)throw new e.error.ArgumentsError("unaryMinus",arguments.length,1);if(u(t))return-t;if(l(t))return new o(-t.re,-t.im);if(t instanceof i)return t.neg();if(p(t)){var n=t.clone();return n.value=-t.value,n}if(m(t))return s.deepMap(t,h,!0);if(c(t)||f(t)||null===t)return"bignumber"==r.number?new i(-t):-t;throw new e.error.UnsupportedTypeError("unaryMinus",e["typeof"](t))},e.unary=function(){throw new Error("Function unary is deprecated. Use unaryMinus instead.")}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=n.string.isString,l=o.isComplex,p=a.isUnit,m=s.isCollection;e.unaryPlus=function h(t){if(1!=arguments.length)throw new e.error.ArgumentsError("unaryPlus",arguments.length,1);if(u(t))return t;if(l(t))return t.clone();if(t instanceof i)return t;if(p(t))return t.clone();if(m(t))return s.deepMap(t,h,!0);if(c(t)||f(t)||null===t)return"bignumber"==r.number?new i(+t):+t;throw new e.error.UnsupportedTypeError("unaryPlus",e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){function n(t,n){for(var i,o,a,s=0,u=1,c=1,f=0;n;)o=Math.floor(t/n),a=t%n,i=s,s=u-o*s,u=i,i=c,c=f-o*c,f=i,t=n,n=a;var l;return l=0>t?[-t,-u,-f]:[t,t?u:0,f],"array"===r.matrix?l:e.matrix(l)}function i(t,n){for(var i,o,s,u=new a(0),c=new a(0),f=new a(1),l=new a(1),p=new a(0);!n.isZero();)o=t.div(n).floor(),s=t.mod(n),i=c,c=f.minus(o.times(c)),f=i,i=l,l=p.minus(o.times(l)),p=i,t=n,n=s;var m;return m=t.lt(u)?[t.neg(),f.neg(),p.neg()]:[t,t.isZero()?0:f,p],"array"===r.matrix?m:e.matrix(m)}var o=t(175),a=(e.type.Matrix,e.type.BigNumber),s=o.number.isNumber,u=o["boolean"].isBoolean,c=o.number.isInteger;e.xgcd=function f(r,t){if(2==arguments.length){if(s(r)&&s(t)){if(!c(r)||!c(t))throw new Error("Parameters in function xgcd must be integer numbers");return n(r,t)}if(r instanceof a)return s(t)?t=a.convert(t):(u(t)||null===t)&&(t=new a(t?1:0)),t instanceof a?i(r,t):f(r.toNumber(),t);if(t instanceof a)return s(r)?r=a.convert(r):(u(r)||null===r)&&(r=new a(r?1:0)),r instanceof a?i(r,t):f(r.toNumber(),t);if(u(r)||null===r)return f(+r,t);if(u(t)||null===t)return f(r,+t);throw new e.error.UnsupportedTypeError("xgcd",e["typeof"](r),e["typeof"](t))}throw new SyntaxError("Function xgcd expects two arguments")}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.and;e.bitAnd=function l(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("bitAnd",arguments.length,2);if(u(r)&&u(t)){if(!s(r)||!s(t))throw new Error("Parameters in function bitAnd must be integer numbers");return r&t}if(c(r)||c(t))return o.deepMap2(r,t,l);if(a(r)||null===r)return l(+r,t);if(a(t)||null===t)return l(r,+t);if(r instanceof i)return u(t)&&(t=i.convert(t)),t instanceof i?f(r,t):l(r.toNumber(),t);if(t instanceof i)return u(r)&&(r=i.convert(r)),r instanceof i?f(r,t):l(r,t.toNumber());throw new e.error.UnsupportedTypeError("bitAnd",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.not;e.bitNot=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("bitNot",arguments.length,1);if(u(r)){if(!s(r))throw new Error("Parameter in function bitNot must be integer numbers");return~r}if(r instanceof i)return f(r);if(c(r))return o.deepMap(r,l);if(a(r)||null===r)return l(+r);throw new e.error.UnsupportedTypeError("bitNot",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.or;e.bitOr=function l(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("bitOr",arguments.length,2);if(u(r)&&u(t)){if(!s(r)||!s(t))throw new Error("Parameters in function bitOr must be integer numbers");return r|t}if(c(r)||c(t))return o.deepMap2(r,t,l);if(a(r)||null===r)return l(+r,t);if(a(t)||null===t)return l(r,+t);if(r instanceof i)return u(t)&&(t=i.convert(t)),t instanceof i?f(r,t):l(r.toNumber(),t);if(t instanceof i)return u(r)&&(r=i.convert(r)),r instanceof i?f(r,t):l(r,t.toNumber());throw new e.error.UnsupportedTypeError("bitOr",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.xor;e.bitXor=function l(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("bitXor",arguments.length,2);if(u(r)&&u(t)){if(!s(r)||!s(t))throw new Error("Parameters in function bitXor must be integer numbers");return r^t}if(c(r)||c(t))return o.deepMap2(r,t,l);if(a(r)||null===r)return l(+r,t);if(a(t)||null===t)return l(r,+t);if(r instanceof i)return u(t)&&(t=i.convert(t)),t instanceof i?f(r,t):l(r.toNumber(),t);if(t instanceof i)return u(r)&&(r=i.convert(r)),r instanceof i?f(r,t):l(r,t.toNumber());throw new e.error.UnsupportedTypeError("bitXor",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.leftShift;e.leftShift=function l(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("leftShift",arguments.length,2);if(u(r)){if(u(t)){if(!s(r)||!s(t))throw new Error("Parameters in function leftShift must be integer numbers");return r<<t}if(t instanceof i)return f(i.convert(r),t)}if(u(t)){if(isFinite(t)&&!s(t))throw new Error("Parameters in function leftShift must be integer numbers");if(r instanceof i){if(r.isFinite()&&!r.isInteger())throw new Error("Parameters in function leftShift must be integer numbers");return r.isNaN()||isNaN(t)||0>t?new i(0/0):0==t||r.isZero()?r:t!=1/0||r.isFinite()?55>t?r.times(Math.pow(2,t)+""):(t=i.convert(t),f(r,t)):new i(0/0)}}if(c(r)&&u(t))return o.deepMap2(r,t,l);if(a(r)||null===r)return l(+r,t);if(a(t)||null===t)return l(r,+t);if(r instanceof i)return t instanceof i?f(r,t):l(r.toNumber(),t);if(t instanceof i)return l(r,t.toNumber());throw new e.error.UnsupportedTypeError("leftShift",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=(e.type.Matrix,t(11),e.collection),a=n["boolean"].isBoolean,s=n.number.isInteger,u=n.number.isNumber,c=o.isCollection,f=n.bignumber.rightShift;e.rightArithShift=function l(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("rightArithShift",arguments.length,2);if(u(r)){if(u(t)){if(!s(r)||!s(t))throw new Error("Parameters in function rightArithShift must be integer numbers");return r>>t}if(t instanceof i)return f(i.convert(r),t)}if(u(t)){if(isFinite(t)&&!s(t))throw new Error("Parameters in function rightArithShift must be integer numbers");if(r instanceof i){if(r.isFinite()&&!r.isInteger())throw new Error("Parameters in function rightArithShift must be integer numbers");return r.isNaN()||isNaN(t)||0>t?new i(0/0):t==1/0?new i(r.isNegative()?-1:r.isFinite()?0:0/0):55>t?r.div(Math.pow(2,t)+"").floor():(t=i.convert(t),f(r,t))}}if(c(r)&&u(t))return o.deepMap2(r,t,l);if(a(r)||null===r)return l(+r,t);if(a(t)||null===t)return l(r,+t);if(r instanceof i)return t instanceof i?f(r,t):l(r.toNumber(),t);if(t instanceof i)return l(r,t.toNumber());throw new e.error.UnsupportedTypeError("rightArithShift",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=(e.type.Matrix,t(11),e.collection),o=n["boolean"].isBoolean,a=n.number.isInteger,s=n.number.isNumber,u=i.isCollection;e.rightLogShift=function c(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("rightLogShift",arguments.length,2);if(s(r)&&s(t)){if(!a(r)||!a(t))throw new Error("Parameters in function rightLogShift must be integer numbers");return r>>>t}if(u(r)&&s(t))return i.deepMap2(r,t,c);if(o(r)||null===r)return c(+r,t);if(o(t)||null===t)return c(r,+t);throw new e.error.UnsupportedTypeError("rightLogShift",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,c=i.isComplex;e.arg=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("arg",arguments.length,1);if(a(r))return Math.atan2(0,r);if(c(r))return Math.atan2(r.im,r.re);if(u(r))return o.deepMap(r,f);if(s(r)||null===r)return f(+r);if(r instanceof n)return f(r.toNumber());throw new e.error.UnsupportedTypeError("arg",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.object,s=r.number.isNumber,u=r["boolean"].isBoolean,c=o.isCollection,f=i.isComplex;e.conj=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("conj",arguments.length,1);return s(r)?r:r instanceof n?new n(r):f(r)?new i(r.re,-r.im):c(r)?o.deepMap(r,l):u(r)||null===r?+r:a.clone(r)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.object,s=r.number.isNumber,u=r["boolean"].isBoolean,c=o.isCollection,f=i.isComplex;e.re=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("re",arguments.length,1);return s(r)?r:r instanceof n?new n(r):f(r)?r.re:c(r)?o.deepMap(r,l):u(r)||null===r?+r:a.clone(r)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,c=i.isComplex;e.im=function f(r){if(1!=arguments.length)throw new e.error.ArgumentsError("im",arguments.length,1);return a(r)?0:r instanceof n?new n(0):c(r)?r.im:u(r)?o.deepMap(r,f):(s(r)||null===r,0)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection;e.and=function p(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("and",arguments.length,2);if((s(r)||u(r)||null===r)&&(s(t)||u(t)||null===t))return!(!r||!t);if(c(r))return 0==r.re&&0==r.im?!1:p(!0,t);if(c(t))return 0==t.re&&0==t.im?!1:p(r,!0);if(r instanceof n)return r.isZero()||r.isNaN()?!1:p(!0,t);if(t instanceof n)return t.isZero()||t.isNaN()?!1:p(r,!0);if(f(r))return null===r.value||0==r.value?!1:p(!0,t);if(f(t))return null===t.value||0==t.value?!1:p(r,!0);if(l(r)||l(t))return a.deepMap2(r,t,p);throw new e.error.UnsupportedTypeError("and",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection;e.not=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("not",arguments.length,1);if(s(r)||u(r)||null===r)return!r;if(c(r))return 0==r.re&&0==r.im;if(r instanceof n)return r.isZero()||r.isNaN();if(f(r))return null===r.value||0==r.value;if(l(r))return a.deepMap(r,p);throw new e.error.UnsupportedTypeError("not",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection;e.or=function p(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("or",arguments.length,2);if((s(r)||u(r)||null===r)&&(s(t)||u(t)||null===t))return!(!r&&!t);if(c(r))return 0==r.re&&0==r.im?p(!1,t):!0;if(c(t))return 0==t.re&&0==t.im?p(r,!1):!0;if(r instanceof n)return r.isZero()||r.isNaN()?p(!1,t):!0;if(t instanceof n)return t.isZero()||t.isNaN()?p(r,!1):!0;if(f(r))return null===r.value||0==r.value?p(!1,t):!0;if(f(t))return null===t.value||0==t.value?p(r,!1):!0;if(l(r)||l(t))return a.deepMap2(r,t,p);throw new e.error.UnsupportedTypeError("or",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection;e.xor=function p(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("xor",arguments.length,2);if((s(r)||u(r)||null===r)&&(s(t)||u(t)||null===t))return!!(!!r^!!t);if(c(r))return p(!(0==r.re&&0==r.im),t);if(c(t))return p(r,!(0==t.re&&0==t.im));if(r instanceof n)return p(!(r.isZero()||r.isNaN()),t);if(t instanceof n)return p(r,!(t.isZero()||t.isNaN()));if(f(r))return p(!(null===r.value||0==r.value),t);if(f(t))return p(r,!(null===t.value||0==t.value));if(l(r)||l(t))return a.deepMap2(r,t,p);throw new e.error.UnsupportedTypeError("xor",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){function r(t,n,i,o){if(i>o){if(t.length!=n.length)throw new e.error.DimensionError(t.length,n.length);for(var a=[],s=0;s<t.length;s++)a[s]=r(t[s],n[s],i,o+1);return a}return t.concat(n)}var n=t(175),i=t(5),o=e.type.Matrix,a=e.collection,s=n.object,u=n.array,c=n.number.isNumber,f=n.number.isInteger,l=a.isCollection;e.concat=function(t){var n,a,p=arguments.length,m=-1,h=!1,g=[];for(n=0;p>n;n++){var d=arguments[n];if(d instanceof o&&(h=!0),n==p-1&&(c(d)||d instanceof i)){if(a=m,m=d.valueOf(),!f(m))throw new TypeError("Integer number expected for dimension");if(0>m)throw new e.error.IndexError(m);if(n>0&&m>a)throw new e.error.IndexError(m,a+1)}else{if(!l(d))throw new e.error.UnsupportedTypeError("concat",e["typeof"](d));var v=s.clone(d).valueOf(),y=u.size(d.valueOf());if(g[n]=v,a=m,m=y.length-1,n>0&&m!=a)throw new e.error.DimensionError(a+1,m+1)}}if(0==g.length)throw new SyntaxError("At least one matrix expected");for(var x=g.shift();g.length;)x=r(x,g.shift(),m,0);return h?e.matrix(x):x}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var i=n.size(r),o=n.size(t);if(1!=i.length||1!=o.length||3!=i[0]||3!=o[0])throw new RangeError("Vectors with length 3 expected (Size A = ["+i.join(", ")+"], B = ["+o.join(", ")+"])");return[e.subtract(e.multiply(r[1],t[2]),e.multiply(r[2],t[1])),e.subtract(e.multiply(r[2],t[0]),e.multiply(r[0],t[2])),e.subtract(e.multiply(r[0],t[1]),e.multiply(r[1],t[0]))]}var n=t(169),i=e.type.Matrix;e.cross=function(t,n){if(t instanceof i){if(n instanceof i)return e.matrix(r(t.toArray(),n.toArray()));if(Array.isArray(n))return e.matrix(r(t.toArray(),n))}else if(Array.isArray(t)){if(n instanceof i)return e.matrix(r(t,n.toArray()));if(Array.isArray(n))return r(t,n)}throw new e.error.UnsupportedTypeError("cross",e["typeof"](t),e["typeof"](n));

}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t,n){if(1==t)return o.clone(r[0][0]);if(2==t)return e.subtract(e.multiply(r[0][0],r[1][1]),e.multiply(r[1][0],r[0][1]));for(var i=function(r){var t,n,i=new Array(r.length),o=0;for(t=1;t<r.length;t++)o=e.add(o,r[t][t]);for(t=0;t<r.length;t++){for(i[t]=new Array(r.length),i[t][t]=e.unaryMinus(o),n=0;t>n;n++)i[t][n]=0;for(n=t+1;n<r.length;n++)i[t][n]=r[t][n];t+1<r.length&&(o=e.subtract(o,r[t+1][t+1]))}return i},a=r,s=0;t-1>s;s++)a=e.multiply(i(a),r);return t%2==0?e.unaryMinus(a[0][0]):a[0][0]}var n=t(175),i=e.type.Matrix,o=n.object,a=n.string;e.det=function(t){if(1!=arguments.length)throw new e.error.ArgumentsError("det",arguments.length,1);var n;switch(t instanceof i?n=t.size():t instanceof Array?(t=e.matrix(t),n=t.size()):n=[],n.length){case 0:return o.clone(t);case 1:if(1==n[0])return o.clone(t.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+a.format(n)+")");case 2:var s=n[0],u=n[1];if(s==u)return r(t.clone().valueOf(),s,u);throw new RangeError("Matrix must be square (size: "+a.format(n)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+a.format(n)+")")}}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=e.type.Matrix,o=r.object,a=r.array,s=a.isArray,u=r.number.isNumber,c=r.string.isString,f=r.number.isInteger;e.diag=function(r,t,l){if(0===arguments.length||arguments.length>3)throw new e.error.ArgumentsError("diag",arguments.length,1,3);switch(arguments.length){case 1:t=0,l=void 0;break;case 2:c(arguments[1])&&(l=arguments[1],t=0)}if(!(r instanceof i||s(r)))throw new TypeError("First parameter in function diag must be a Matrix or Array");if(t instanceof n&&(t=t.toNumber()),!u(t)||!f(t))throw new TypeError("Second parameter in function diag must be an integer");if(l&&!c(l))throw new TypeError("Third parameter in function diag must be a String");var p,m,h,g,d,v,y=t>0?t:0,x=0>t?-t:0;if(r instanceof i?(g=r.valueOf(),l=l||r.storage(),p=r.size()):(g=r,p=a.size(r)),l){if(1===p.length){m=g[0]instanceof n?new n(0):0;var w=[g.length+x,g.length+y],b=i.storage(l);return b.diagonal(w,g,t,m)}if(2===p.length)return h=r.diagonal(t),e.matrix(h,l);throw new RangeError("Matrix for function diag must be 2 dimensional")}switch(p.length){case 1:m=g[0]instanceof n?new n(0):0;var E=[];for(a.resize(E,[g.length+x,g.length+y],m),v=g.length,d=0;v>d;d++)E[d+x][d+y]=o.clone(g[d]);return E;case 2:for(h=[],v=Math.min(p[0]-x,p[1]-y),d=0;v>d;d++)h[d]=o.clone(g[d+x][d+y]);return h;default:throw new RangeError("Matrix for function diag must be 2 dimensional")}}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var i=n.size(r),o=n.size(t),a=i[0];if(1!==i.length||1!==o.length)throw new RangeError("Vector expected");if(i[0]!=o[0])throw new RangeError("Vectors must have equal length ("+i[0]+" != "+o[0]+")");if(0==a)throw new RangeError("Cannot calculate the dot product of empty vectors");for(var s=0,u=0;a>u;u++)s=e.add(s,e.multiply(r[u],t[u]));return s}var n=t(169),i=e.type.Matrix;e.dot=function(t,n){if(t instanceof i){if(n instanceof i)return r(t.toArray(),n.toArray());if(Array.isArray(n))return r(t.toArray(),n)}else if(Array.isArray(t)){if(n instanceof i)return r(t,n.toArray());if(Array.isArray(n))return r(t,n)}throw new e.error.UnsupportedTypeError("dot",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=e.type.Matrix,a=e.collection,s=n.array,u=n.number.isNumber,c=n.number.isInteger,f=n.string.isString,l=Array.isArray;e.eye=function(t,n){var p,m=a.argsToArray(arguments);if(m.length>0&&f(m[m.length-1])?(p=m[m.length-1],m=a.argsToArray(m.slice(0,m.length-1))):t instanceof o?p=t.storage():l(t)||"matrix"!==r.matrix||(p="default"),1==m.length)m[1]=m[0];else if(m.length>2)throw new e.error.ArgumentsError("eye",m.length,0,2);var h=!1;m=m.map(function(e){if(e instanceof i&&(h=!0,e=e.toNumber()),!u(e)||!c(e)||0>e)throw new Error("Parameters in function eye must be positive integers");return e});var g=h?new i(1):1,d=h?new i(0):0;if(p){if(0===m.length)return e.matrix(p);var v=o.storage(p);return v.diagonal(m,g,0,d)}var y=[];if(m.length>0){y=s.resize(y,m,d);for(var x=e.min(m),w=0;x>w;w++)y[w][w]=g}return y}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.Matrix,o=n.object,a=n.array,s=Array.isArray;e.flatten=function(r){if(1!==arguments.length)throw new e.error.ArgumentsError("flatten",arguments.length,1);if(r instanceof i){var t=o.clone(r.toArray()),n=a.flatten(t);return e.matrix(n)}if(s(r))return a.flatten(o.clone(r));throw new e.error.UnsupportedTypeError("flatten",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t,n){var i,o,a,s,u;if(1==t){if(s=r[0][0],0==s)throw Error("Cannot calculate inverse, determinant is zero");return[[e._divide(1,s)]]}if(2==t){var c=e.det(r);if(0==c)throw Error("Cannot calculate inverse, determinant is zero");return[[e._divide(r[1][1],c),e._divide(e.unaryMinus(r[0][1]),c)],[e._divide(e.unaryMinus(r[1][0]),c),e._divide(r[0][0],c)]]}var f=r.concat();for(i=0;t>i;i++)f[i]=f[i].concat();for(var l=e.eye(t).valueOf(),p=0;n>p;p++){for(i=p;t>i&&0==f[i][p];)i++;if(i==t||0==f[i][p])throw Error("Cannot calculate inverse, determinant is zero");i!=p&&(u=f[p],f[p]=f[i],f[i]=u,u=l[p],l[p]=l[i],l[i]=u);var m=f[p],h=l[p];for(i=0;t>i;i++){var g=f[i],d=l[i];if(i!=p){if(0!=g[p]){for(a=e._divide(e.unaryMinus(g[p]),m[p]),o=p;n>o;o++)g[o]=e.add(g[o],e.multiply(a,m[o]));for(o=0;n>o;o++)d[o]=e.add(d[o],e.multiply(a,h[o]))}}else{for(a=m[p],o=p;n>o;o++)g[o]=e._divide(g[o],a);for(o=0;n>o;o++)d[o]=e._divide(d[o],a)}}}return l}var n=t(175),i=e.type.Matrix;e.inv=function(t){if(1!=arguments.length)throw new e.error.ArgumentsError("inv",arguments.length,1);var o=e.size(t).valueOf();switch(o.length){case 0:return e._divide(1,t);case 1:if(1==o[0])return t instanceof i?e.matrix([e._divide(1,t.valueOf()[0])]):[e._divide(1,t[0])];throw new RangeError("Matrix must be square (size: "+n.string.format(o)+")");case 2:var a=o[0],s=o[1];if(a==s)return t instanceof i?e.matrix(r(t.valueOf(),a,s),t.storage()):r(t,a,s);throw new RangeError("Matrix must be square (size: "+n.string.format(o)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+n.string.format(o)+")")}}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=e.type.Matrix,a=e.collection,s=n.array,u=n.number.isNumber,c=n.number.isInteger,f=n.string.isString,l=Array.isArray;e.ones=function(t,n){var p,m=a.argsToArray(arguments);m.length>0&&f(m[m.length-1])?(p=m[m.length-1],m=a.argsToArray(m.slice(0,m.length-1))):t instanceof o?p=t.storage():l(t)||"matrix"!==r.matrix||(p="default");var h=!1;m=m.map(function(e){if(e instanceof i&&(h=!0,e=e.toNumber()),!u(e)||!c(e)||0>e)throw new Error("Parameters in function eye must be positive integers");return e});var g=h?new i(1):1;if(p){var d=e.matrix(p);return m.length>0?d.resize(m,g):d}var v=[];return m.length>0?s.resize(v,m,g):v}}},function(e,r,t){"use strict";e.exports=function(e,r){function n(e,r,t){var n=[],i=e;if(t>0)for(;r>i;)n.push(i),i+=t;else if(0>t)for(;i>r;)n.push(i),i+=t;return n}function i(e,r,t){var n=[],i=e;if(t>0)for(;r>=i;)n.push(i),i+=t;else if(0>t)for(;i>=r;)n.push(i),i+=t;return n}function o(e,r,t){var n=[],i=e.clone(),o=new c(0);if(t.gt(o))for(;i.lt(r);)n.push(i),i=i.plus(t);else if(t.lt(o))for(;i.gt(r);)n.push(i),i=i.plus(t);return n}function a(e,r,t){var n=[],i=e.clone(),o=new c(0);if(t.gt(o))for(;i.lte(r);)n.push(i),i=i.plus(t);else if(t.lt(o))for(;i.gte(r);)n.push(i),i=i.plus(t);return n}function s(e){var t=e.split(":"),n=null;if("bignumber"===r.number)try{n=t.map(function(e){return new c(e)})}catch(i){return null}else{n=t.map(function(e){return Number(e)});var o=n.some(function(e){return isNaN(e)});if(o)return null}switch(n.length){case 2:return{start:n[0],end:n[1],step:1};case 3:return{start:n[0],end:n[2],step:n[1]};default:return null}}var u=t(175),c=e.type.BigNumber,f=(e.type.Matrix,e.collection,u["boolean"].isBoolean),l=u.string.isString,p=u.number.isNumber;e.range=function(t){var u,m,h,g=Array.prototype.slice.call(arguments),d=!1;switch(f(g[g.length-1])&&(d=g.pop()?!0:!1),g.length){case 1:if(!l(g[0]))throw new TypeError("Two or three numbers or a single string expected in function range");var v=s(g[0]);if(!v)throw new SyntaxError('String "'+g[0]+'" is no valid range');u=v.start,m=v.end,h=v.step;break;case 2:u=g[0],m=g[1],h=1;break;case 3:u=g[0],m=g[1],h=g[2];break;case 4:throw new TypeError("Parameter includeEnd must be a boolean");default:throw new e.error.ArgumentsError("range",arguments.length,2,4)}if(!(p(u)||u instanceof c))throw new TypeError("Parameter start must be a number");if(!(p(m)||m instanceof c))throw new TypeError("Parameter end must be a number");if(!(p(h)||h instanceof c))throw new TypeError("Parameter step must be a number");if(u instanceof c||m instanceof c||h instanceof c){var y=!0;u instanceof c||(u=c.convert(u)),m instanceof c||(m=c.convert(m)),h instanceof c||(h=c.convert(h)),u instanceof c&&m instanceof c&&h instanceof c||(y=!1,u instanceof c&&(u=u.toNumber()),m instanceof c&&(m=m.toNumber()),h instanceof c&&(h=h.toNumber()))}var x=y?d?a:o:d?i:n,w=x(u,m,h);return"array"===r.matrix?w:e.matrix(w)}}},function(e,r,t){"use strict";e.exports=function(e,r){function n(r,t,n){if(void 0!==n){if(!f(n)||1!==n.length)throw new TypeError("Single character expected as defaultValue")}else n=" ";if(1!==t.length)throw new e.error.DimensionError(t.length,1);var i=t[0];if(!l(i)||!p(i))throw new TypeError("Invalid size, must contain positive integers (size: "+c.format(t)+")");if(r.length>i)return r.substring(0,i);if(r.length<i){for(var o=r,a=0,s=i-r.length;s>a;a++)o+=n;return o}return r}var i=t(175),o=e.type.BigNumber,a=e.type.Matrix,s=i.array,u=i.object.clone,c=i.string,f=i.string.isString,l=i.number.isNumber,p=i.number.isInteger,m=s.isArray;e.resize=function(t,i,c){if(2!=arguments.length&&3!=arguments.length)throw new e.error.ArgumentsError("resize",arguments.length,2,3);if(i instanceof a&&(i=i.valueOf()),i.length&&i[0]instanceof o&&(i=i.map(function(e){return e instanceof o?e.toNumber():e})),t instanceof a)return t.resize(i,c,!0);if(f(t))return n(t,i,c);var l=m(t)?!1:"array"!==r.matrix;if(0==i.length){for(;m(t);)t=t[0];return u(t)}m(t)||(t=[t]),t=u(t);var p=s.resize(t,i,c);return l?e.matrix(p):p}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.type.Matrix,u=n.array,c=n.number.isNumber,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit;e.size=function(t){if(1!=arguments.length)throw new e.error.ArgumentsError("size",arguments.length,1);var n="array"===r.matrix;if(c(t)||p(t)||m(t)||f(t)||null==t||t instanceof i)return n?[]:e.matrix([]);if(l(t))return n?[t.length]:e.matrix([t.length]);if(Array.isArray(t))return u.size(t);if(t instanceof s)return e.matrix(t.size());throw new e.error.UnsupportedTypeError("size",e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.Matrix,i=r.object,o=r.array,a=Array.isArray;e.squeeze=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("squeeze",arguments.length,1);if(a(r))return o.squeeze(i.clone(r));if(r instanceof n){var t=o.squeeze(r.toArray());return a(t)?e.matrix(t):t}return i.clone(r)}}},function(e,r,t){"use strict";e.exports=function(e,r){function n(r,t){var n,o;if(p(r))return n=e.matrix(r),o=n.subset(t),o&&o.valueOf();if(r instanceof u)return r.subset(t);if(l(r))return i(r,t);throw new e.error.UnsupportedTypeError("subset",e["typeof"](r))}function i(r,t){if(!(t instanceof c))throw new TypeError("Index expected");if(1!=t.size().length)throw new e.error.DimensionError(t.size().length,1);var n=r.length;f.validateIndex(t.min()[0],n),f.validateIndex(t.max()[0],n);var i=t.range(0),o="";return i.forEach(function(e){o+=r.charAt(e)}),o}function o(r,t,n,i){var o;if(p(r))return o=e.matrix(e.clone(r)),o.subset(t,n,i),o.valueOf();if(r instanceof u)return r.clone().subset(t,n,i);if(l(r))return a(r,t,n,i);throw new e.error.UnsupportedTypeError("subset",e["typeof"](r))}function a(r,t,n,i){if(!(t instanceof c))throw new TypeError("Index expected");if(1!=t.size().length)throw new e.error.DimensionError(t.size().length,1);if(void 0!==i){if(!l(i)||1!==i.length)throw new TypeError("Single character expected as defaultValue")}else i=" ";var o=t.range(0),a=o.size()[0];if(a!=n.length)throw new e.error.DimensionError(o.size()[0],n.length);var s=r.length;f.validateIndex(t.min()[0]),f.validateIndex(t.max()[0]);for(var u=[],p=0;s>p;p++)u[p]=r.charAt(p);if(o.forEach(function(e,r){u[e]=n.charAt(r)}),u.length>s)for(p=s-1,a=u.length;a>p;p++)u[p]||(u[p]=i);return u.join("")}var s=t(175),u=e.type.Matrix,c=t(9),f=s.array,l=s.string.isString,p=Array.isArray;e.subset=function(r,t,i,a){switch(arguments.length){case 2:return n(arguments[0],arguments[1]);case 3:case 4:return o(arguments[0],arguments[1],arguments[2],arguments[3]);default:throw new e.error.ArgumentsError("subset",arguments.length,2,4)}}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.Matrix,i=r.object,o=r.array,a=r.string;e.trace=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("trace",arguments.length,1);if(r instanceof n)return r.trace();var t;switch(t=r instanceof Array?o.size(r):[],t.length){case 0:return i.clone(r);case 1:if(1==t[0])return i.clone(r[0]);throw new RangeError("Array must be square (size: "+a.format(t)+")");case 2:var s=t[0],u=t[1];if(s==u){for(var c=0,f=0;f<r.length;f++)c=e.add(c,r[f][f]);return c}throw new RangeError("Array must be square (size: "+a.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+a.format(t)+")")}}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.Matrix,i=r.object,o=r.string;e.transpose=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("transpose",arguments.length,1);var t=e.size(r).valueOf();switch(t.length){case 0:return i.clone(r);case 1:return i.clone(r);case 2:if(r instanceof n)return r.transpose();var a,s=t[1],u=t[0],c=r.valueOf(),f=[],l=i.clone;if(0===s)throw new RangeError("Cannot transpose a 2D matrix with no rows(size: "+o.format(t)+")");for(var p=0;s>p;p++){a=f[p]=[];for(var m=0;u>m;m++)a[m]=l(c[m][p])}return f;default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(t)+")")}}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=e.type.Matrix,a=e.collection,s=n.array,u=n.number.isNumber,c=n.number.isInteger,f=n.string.isString,l=Array.isArray;e.zeros=function(t){var n,p=a.argsToArray(arguments);p.length>0&&f(p[p.length-1])?(n=p[p.length-1],p=a.argsToArray(p.slice(0,p.length-1))):t instanceof o?n=t.storage():l(t)||"matrix"!==r.matrix||(n="default");var m=!1;p=p.map(function(e){if(e instanceof i&&(m=!0,e=e.toNumber()),!u(e)||!c(e)||0>e)throw new Error("Parameters in function eye must be positive integers");return e});var h=m?new i(0):0;if(n){var g=e.matrix(n);return p.length>0?g.resize(p,h):g}var d=[];return p.length>0?s.resize(d,p,h):d}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=e.collection,a=n.number.isNumber,s=n["boolean"].isBoolean,u=(n.number.isInteger,o.isCollection);e.factorial=function p(t){var m,h,g;if(1!=arguments.length)throw new e.error.ArgumentsError("factorial",arguments.length,1);if(a(t))return t!==Number.POSITIVE_INFINITY?e.gamma(t+1):Math.sqrt(2*Math.PI);if(t instanceof i){if(!c(t))return t.isNegative()||t.isFinite()?e.gamma(t.plus(1)):n.bignumber.tau(r.precision).sqrt();if(t=t.toNumber(),t<l.length)return i.convert(l[t]).toSD(r.precision);var d=r.precision+(0|Math.log(t)),v=i.constructor({precision:d});if(t-=l.length,g=f[d]){if(g[t])return new i(g[t].toPrecision(r.precision));h=g[g.length-1]}else g=f[d]=[],h=new v(l[l.length-1]).toSD(d);var y=new v(1);m=new v(g.length+l.length);for(var x=g.length;t>x;++x)g[x]=h=h.times(m),m=m.plus(y);return g[t]=h.times(m),new i(g[t].toPrecision(r.precision))}if(s(t)||null===t)return 1;if(u(t))return o.deepMap(t,p);throw new e.error.UnsupportedTypeError("factorial",e["typeof"](t))};var c=function(e){return e.isInteger()&&(!e.isNegative()||e.isZero())},f=[],l=[1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600,6227020800,87178291200,1307674368e3,20922789888e3,355687428096e3,6402373705728e3,0x1b02b9306890000,243290200817664e4]}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=e.collection,s=n["boolean"].isBoolean,u=o.isComplex,c=n.number.isNumber,f=n.number.isInteger,l=a.isCollection;e.gamma=function m(r){var t,n,h=4.7421875;if(1!=arguments.length)throw new e.error.ArgumentsError("gamma",arguments.length,1);if(c(r)){if(f(r)){if(0>=r)return isFinite(r)?1/0:0/0;if(r>171)return 1/0;for(var g=r-2,d=r-1;g>1;)d*=g,g--;return 0==d&&(d=1),d}if(.5>r)return Math.PI/(Math.sin(Math.PI*r)*m(1-r));if(r>=171.35)return 1/0;if(r>85){var v=r*r,y=v*r,x=y*r,w=x*r;return Math.sqrt(2*Math.PI/r)*Math.pow(r/Math.E,r)*(1+1/(12*r)+1/(288*v)-139/(51840*y)-571/(2488320*x)+163879/(209018880*w)+5246819/(75246796800*w*r))}--r,n=p[0];for(var b=1;b<p.length;++b)n+=p[b]/(r+b);return t=r+h+.5,Math.sqrt(2*Math.PI)*Math.pow(t,r+.5)*Math.exp(-t)*n}if(u(r)){if(0==r.im)return m(r.re);r=new o(r.re-1,r.im),n=new o(p[0],0);for(var b=1;b<p.length;++b){var E=r.re+b,N=E*E+r.im*r.im;0!=N?(n.re+=p[b]*E/N,n.im+=-(p[b]*r.im)/N):n.re=p[b]<0?-(1/0):1/0}t=new o(r.re+h+.5,r.im);var M=Math.sqrt(2*Math.PI);r.re+=.5;var _=e.pow(t,r);0==_.im?_.re*=M:0==_.re?_.im*=M:(_.re*=M,_.im*=M);var A=Math.exp(-t.re);return t.re=A*Math.cos(-t.im),t.im=A*Math.sin(-t.im),e.multiply(e.multiply(_,t),n)}if(r instanceof i){if(r.isInteger())return r.isNegative()||r.isZero()?new i(1/0):e.factorial(r.minus(1));if(!r.isFinite())return new i(r.isNegative()?0/0:1/0)}if(s(r)||null===r)return r?1:1/0;if(l(r))return a.deepMap(r,m);throw new e.error.UnsupportedTypeError("gamma",e["typeof"](r))};var p=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22]}},function(e,r,t){"use strict";e.exports=function(e){var r=t(337)(e);e.random=r("uniform").random}},function(e,r,t){"use strict";e.exports=function(e){var r=t(337)(e);e.randomInt=r("uniform").randomInt}},function(e,r,t){"use strict";e.exports=function(e){var r=t(337)(e);e.pickRandom=r("uniform").pickRandom}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=r.number.isNumber,o=r.number.isInteger;e.permutations=function(r,t){var s,u,c=arguments.length;if(c>2)throw new e.error.ArgumentsError("permutations",arguments.length,2);if(i(r)){if(!o(r)||0>r)throw new TypeError("Positive integer value expected in function permutations");if(1==c)return e.factorial(r);if(2==c&&i(t)){if(!o(t)||0>t)throw new TypeError("Positive integer value expected in function permutations");if(t>r)throw new TypeError("second argument k must be less than or equal to first argument n");for(s=1,u=r-t+1;r>=u;u++)s*=u;return s}}if(r instanceof n){if(void 0===t&&a(r))return e.factorial(r);if(t=n.convert(t),!(t instanceof n&&a(r)&&a(t)))throw new TypeError("Positive integer value expected in function permutations");if(t.gt(r))throw new TypeError("second argument k must be less than or equal to first argument n");for(s=new n(1),u=r.minus(t).plus(1);u.lte(r);u=u.plus(1))s=s.times(u);return s}throw new e.error.UnsupportedTypeError("permutations",e["typeof"](r))};var a=function(e){return e.isInteger()&&e.gte(0)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=(e.collection,r.number.isNumber),o=r.number.isInteger;e.combinations=function(r,t){var s,u,c,f,l=arguments.length;if(2!=l)throw new e.error.ArgumentsError("combinations",arguments.length,2);if(i(r)){if(!o(r)||0>r)throw new TypeError("Positive integer value enpected in function combinations");if(t>r)throw new TypeError("k must be less than or equal to n");for(s=Math.max(t,r-t),u=1,c=1;r-s>=c;c++)u=u*(s+c)/c;return u}if(r instanceof n){if(t=n.convert(t),!(t instanceof n&&a(r)&&a(t)))throw new TypeError("Positive integer value expected in function combinations");if(t.gt(r))throw new TypeError("k must be less than n in function combinations");for(s=r.minus(t),t.lt(s)&&(s=t),u=new n(1),c=new n(1),f=r.minus(s);c.lte(f);c=c.plus(1))u=u.times(s.plus(c)).dividedBy(c);return u}throw new e.error.UnsupportedTypeError("combinations",e["typeof"](r))};var a=function(e){return e.isInteger()&&e.gte(0)}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.compare=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("compare",arguments.length,2);if(u(t)&&u(n))return c(t,n,r.epsilon)?0:t>n?1:-1;if(t instanceof i)return u(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?new i(t.cmp(n)):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?new i(t.cmp(n)):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value>n.value?1:t.value<n.value?-1:0}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return t>n?1:n>t?-1:0;if(f(t)||null===t)return g(+t,n);if(f(n)||null===n)return g(t,+n);if(p(t)||p(n))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("compare",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){function r(t,n){if(i(t)){if(i(n)){var o=t.length;if(o!==n.length)return!1;for(var a=0;o>a;a++)if(!r(t[a],n[a]))return!1;return!0}return!1}return i(n)?!1:e.equal(t,n)}var t=e.collection,n=t.isCollection,i=Array.isArray;e.deepEqual=function(t,i){if(2!=arguments.length)throw new e.error.ArgumentsError("deepEqual",arguments.length,2);return n(t)||n(i)?r(t.valueOf(),i.valueOf()):e.equal(t,i)}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.equal=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("equal",arguments.length,2);if(u(t)){if(u(n))return c(t,n,r.epsilon);if(p(n))return c(t,n.re,r.epsilon)&&c(n.im,0,r.epsilon)}if(p(t)){if(u(n))return c(t.re,n,r.epsilon)&&c(t.im,0,r.epsilon);if(p(n))return c(t.re,n.re,r.epsilon)&&c(t.im,n.im,r.epsilon)}if(t instanceof i)return u(n)?n=i.convert(n):f(n)&&(n=new i(n?1:0)),n instanceof i?t.eq(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):f(t)&&(t=new i(t?1:0)),t instanceof i?t.eq(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value==n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return t==n;if(f(t))return g(+t,n);if(f(n))return g(t,+n);if(null===t)return null===n;if(null===n)return null===t;if(void 0===t)return void 0===n;if(void 0===n)return void 0===t;throw new e.error.UnsupportedTypeError("equal",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.larger=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("larger",arguments.length,2);if(u(t)&&u(n))return!c(t,n,r.epsilon)&&t>n;if(t instanceof i)return u(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.gt(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.gt(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value>n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return t>n;if(f(t)||null===t)return g(+t,n);if(f(n)||null===n)return g(t,+n);if(p(t)||p(n))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("larger",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.largerEq=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("largerEq",arguments.length,2);if(u(t)&&u(n))return c(t,n,r.epsilon)||t>n;if(t instanceof i)return u(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.gte(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.gte(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value>=n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return t>=n;if(f(t)||null===t)return g(+t,n);if(f(n)||null===n)return g(t,+n);if(p(t)||p(n))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("largerEq",e["typeof"](t),e["typeof"](n))},e.largereq=function(){throw new Error("Function largereq is renamed to largerEq")}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.smaller=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("smaller",arguments.length,2);if(u(t)&&u(n))return!c(t,n,r.epsilon)&&n>t;if(t instanceof i)return u(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.lt(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.lt(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value<n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return n>t;if(f(t)||null===t)return g(+t,n);if(f(n)||null===n)return g(t,+n);if(p(t)||p(n))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("smaller",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.smallerEq=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("smallerEq",arguments.length,2);if(u(t)&&u(n))return c(t,n,r.epsilon)||n>t;if(t instanceof i)return u(n)?n=i.convert(n):(f(n)||null===n)&&(n=new i(n?1:0)),n instanceof i?t.lte(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):(f(t)||null===t)&&(t=new i(t?1:0)),t instanceof i?t.lte(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value<=n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return n>=t;if(f(t)||null===t)return g(+t,n);if(f(n)||null===n)return g(t,+n);if(p(t)||p(n))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("smallerEq",e["typeof"](t),e["typeof"](n))},e.smallereq=function(){throw new Error("Function smallereq is renamed to smallerEq")}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n.number.nearlyEqual,f=n["boolean"].isBoolean,l=n.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.unequal=function g(t,n){if(2!=arguments.length)throw new e.error.ArgumentsError("unequal",arguments.length,2);if(u(t)){if(u(n))return!c(t,n,r.epsilon);if(p(n))return!c(t,n.re,r.epsilon)||!c(n.im,0,r.epsilon)}if(p(t)){if(u(n))return!c(t.re,n,r.epsilon)||!c(t.im,0,r.epsilon);if(p(n))return!c(t.re,n.re,r.epsilon)||!c(t.im,n.im,r.epsilon)}if(t instanceof i)return u(n)?n=i.convert(n):f(n)&&(n=new i(n?1:0)),n instanceof i?!t.eq(n):g(t.toNumber(),n);if(n instanceof i)return u(t)?t=i.convert(t):f(t)&&(t=new i(t?1:0)),t instanceof i?!t.eq(n):g(t,n.toNumber());if(m(t)&&m(n)){if(!t.equalBase(n))throw new Error("Cannot compare units with different base");return t.value!=n.value}if(h(t)||h(n))return s.deepMap2(t,n,g);if(l(t)||l(n))return t!=n;if(f(t))return g(+t,n);if(f(n))return g(t,+n);if(null===t)return null!==n;if(null===n)return null!==t;if(void 0===t)return void 0!==n;if(void 0===n)return void 0!==t;throw new e.error.UnsupportedTypeError("unequal",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){return e.smaller(r,t)?r:t}function t(r){var t=void 0;if(n.deepForEach(r,function(r){(void 0===t||e.smaller(r,t))&&(t=r)}),void 0===t)throw new Error("Cannot calculate min of an empty array");return t}var n=(e.type.Matrix,e.collection),i=n.isCollection;e.min=function(e){if(0==arguments.length)throw new SyntaxError("Function min requires one or more parameters (0 provided)");if(i(e)){if(1==arguments.length)return t(e);if(2==arguments.length)return n.reduce(arguments[0],arguments[1],r);throw new SyntaxError("Wrong number of parameters")}return t(arguments)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){return e.larger(r,t)?r:t}function t(r){var t=void 0;if(n.deepForEach(r,function(r){(void 0===t||e.larger(r,t))&&(t=r)}),void 0===t)throw new Error("Cannot calculate max of an empty array");return t}var n=(e.type.Matrix,e.collection),i=n.isCollection;e.max=function(e){if(0==arguments.length)throw new SyntaxError("Function max requires one or more parameters (0 provided)");if(i(e)){if(1==arguments.length)return t(e);if(2==arguments.length)return n.reduce(arguments[0],arguments[1],r);throw new SyntaxError("Wrong number of parameters")}return t(arguments)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var n=i.reduce(r,t,e.add),o=s(r)?a(r):r.size();return e.divide(n,o[t])}function n(r){var t=0,n=0;if(i.deepForEach(r,function(r){t=e.add(t,r),n++}),0===n)throw new Error("Cannot calculate mean of an empty array");return e.divide(t,n)}var i=(e.type.Matrix,e.collection),o=i.isCollection,a=t(169).size,s=Array.isArray;e.mean=function(e){if(0==arguments.length)throw new SyntaxError("Function mean requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return n(e);if(2==arguments.length)return r(arguments[0],arguments[1]);throw new SyntaxError("Wrong number of parameters")}return n(arguments)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r){var t=u(r);t.sort(e.compare);var o=t.length;if(0==o)throw new Error("Cannot calculate median of an empty array");if(o%2==0){var s=t[o/2-1],c=t[o/2];if(!(a(s)||s instanceof i||s instanceof n))throw new e.error.UnsupportedTypeError("median",e["typeof"](s));if(!(a(c)||c instanceof i||c instanceof n))throw new e.error.UnsupportedTypeError("median",e["typeof"](c));return e.divide(e.add(s,c),2)}var f=t[(o-1)/2];if(!(a(f)||f instanceof i||f instanceof n))throw new e.error.UnsupportedTypeError("median",e["typeof"](f));return f}var n=(e.type.Matrix,t(11)),i=e.type.BigNumber,o=e.collection,a=t(3).isNumber,s=o.isCollection,u=t(169).flatten;e.median=function(e){if(0==arguments.length)throw new SyntaxError("Function median requires one or more parameters (0 provided)");

    if(s(e)){if(1==arguments.length)return r(e.valueOf());throw 2==arguments.length?new Error("median(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(Array.prototype.slice.call(arguments))}}},function(e,r,t){"use strict";e.exports=function(e){function r(r){var n=void 0;if(t.deepForEach(r,function(r){n=void 0===n?r:e.multiply(n,r)}),void 0===n)throw new Error("Cannot calculate prod of an empty array");return n}var t=(e.type.Matrix,e.collection),n=t.isCollection;e.prod=function(e){if(0==arguments.length)throw new SyntaxError("Function prod requires one or more parameters (0 provided)");if(n(e)){if(1==arguments.length)return r(e);throw 2==arguments.length?new Error("prod(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(arguments)}}},function(e,r,t){"use strict";e.exports=function(e){e.std=function(r,t){if(0==arguments.length)throw new SyntaxError("Function std requires one or more parameters (0 provided)");var n=e["var"].apply(null,arguments);return e.sqrt(n)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r){var n=void 0;if(t.deepForEach(r,function(r){n=void 0===n?r:e.add(n,r)}),void 0===n)throw new Error("Cannot calculate sum of an empty array");return n}var t=(e.type.Matrix,e.collection),n=t.isCollection;e.sum=function(e){if(0==arguments.length)throw new SyntaxError("Function sum requires one or more parameters (0 provided)");if(n(e)){if(1==arguments.length)return r(e);throw 2==arguments.length?new Error("sum(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(arguments)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t){var o=0,a=0;if(i.deepForEach(r,function(r){o=e.add(o,r),a++}),0===a)throw new Error("Cannot calculate var of an empty array");var s=e.divide(o,a);switch(o=0,i.deepForEach(r,function(r){var t=e.subtract(r,s);o=e.add(o,e.multiply(t,t))}),t){case"uncorrected":return e.divide(o,a);case"biased":return e.divide(o,a+1);case"unbiased":var u=o instanceof n?new n(0):0;return 1==a?u:e.divide(o,a-1);default:throw new Error('Unknown normalization "'+t+'". Choose "unbiased" (default), "uncorrected", or "biased".')}}var n=(e.type.Matrix,e.type.BigNumber),i=e.collection,o=i.isCollection,a=t(176).isString,s="unbiased";e["var"]=function(e,t){if(0==arguments.length)throw new SyntaxError("Function var requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return r(e,s);if(2==arguments.length){if(!a(t))throw new Error("String expected for parameter normalization");return r(e,t)}throw new SyntaxError("Wrong number of parameters")}return r(arguments,s)}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arccos_arcsec;e.acos=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acos",arguments.length,1);if(a(r))return r>=-1&&1>=r?Math.acos(r):l(new i(r,0));if(u(r)){var t=new i(r.im*r.im-r.re*r.re+1,-2*r.re*r.im),p=e.sqrt(t),m=new i(p.re-r.im,p.im+r.re),h=e.log(m);return new i(1.5707963267948966-h.im,h.re)}if(c(r))return o.deepMap(r,l);if(s(r)||null===r)return Math.acos(r);if(r instanceof n)return f(r,n,!1);throw new e.error.UnsupportedTypeError("acos",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.acosh_asinh_asech_acsch;e.acosh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acosh",arguments.length,1);if(s(r))return r>=1?Math.log(Math.sqrt(r*r-1)+r):-1>=r?new i(Math.log(Math.sqrt(r*r-1)-r),Math.PI):p(new i(r,0));if(c(r)){var t,o=e.acos(r);return o.im<=0?(t=o.re,o.re=-o.im,o.im=t):(t=o.im,o.im=-o.re,o.re=t),o}if(f(r))return a.deepMap(r,p);if(u(r)||null===r)return r?0:new i(0,1.5707963267948966);if(r instanceof n)return l(r,n,!1,!1);throw new e.error.UnsupportedTypeError("acosh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arctan_arccot;e.acot=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acot",arguments.length,1);if(a(r))return r?Math.atan(1/r):l;if(u(r)){if(0==r.im)return new i(r.re?Math.atan(1/r.re):l,0);var t=r.re*r.re+r.im*r.im;return r=0!=t?new i(r.re=r.re/t,r.im=-r.im/t):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.atan(r)}if(c(r))return o.deepMap(r,p);if(s(r)||null===r)return r?.7853981633974483:l;if(r instanceof n)return f(r,n,!0);throw new e.error.UnsupportedTypeError("acot",e["typeof"](r))};var l=1.5707963267948966}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.atanh_acoth;e.acoth=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acoth",arguments.length,1);if(s(r))return r>=1||-1>=r?isFinite(r)?(Math.log((r+1)/r)+Math.log(r/(r-1)))/2:0:r?m(new i(r,0)):new i(0,p);if(c(r)){if(0==r.re&&0==r.im)return new i(0,p);var t=r.re*r.re+r.im*r.im;return r=0!=t?new i(r.re/t,-r.im/t):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.atanh(r)}if(f(r))return a.deepMap(r,m);if(u(r)||null===r)return r?1/0:new i(0,p);if(r instanceof n)return l(r,n,!0);throw new e.error.UnsupportedTypeError("acoth",e["typeof"](r))};var p=1.5707963267948966}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arcsin_arccsc;e.acsc=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acsc",arguments.length,1);if(a(r))return-1>=r||r>=1?Math.asin(1/r):p(new i(r,0));if(u(r)){if(0==r.re&&0==r.im)return new i(l,1/0);var t=r.re*r.re+r.im*r.im;return r=0!=t?new i(r.re=r.re/t,r.im=-r.im/t):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.asin(r)}if(c(r))return o.deepMap(r,p);if(s(r)||null===r)return r?l:new i(l,1/0);if(r instanceof n)return f(r,n,!0);throw new e.error.UnsupportedTypeError("acsc",e["typeof"](r))};var l=1.5707963267948966}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.acosh_asinh_asech_acsch;e.acsch=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acsch",arguments.length,1);if(s(r))return r=1/r,Math.log(r+Math.sqrt(r*r+1));if(c(r)){if(0==r.im)return r=0!=r.re?Math.log(r.re+Math.sqrt(r.re*r.re+1)):1/0,new i(r,0);var t=r.re*r.re+r.im*r.im;return r=0!=t?new i(r.re/t,-r.im/t):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.asinh(r)}if(f(r))return a.deepMap(r,p);if(u(r)||null===r)return r?.881373587019543:1/0;if(r instanceof n)return l(r,n,!0,!0);throw new e.error.UnsupportedTypeError("acsch",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arccos_arcsec;e.asec=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("asec",arguments.length,1);if(a(r))return-1>=r||r>=1?Math.acos(1/r):l(new i(r,0));if(u(r)){if(0==r.re&&0==r.im)return new i(0,1/0);var t=r.re*r.re+r.im*r.im;return r=0!=t?new i(r.re=r.re/t,r.im=-r.im/t):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.acos(r)}if(c(r))return o.deepMap(r,l);if(s(r)||null===r)return r?0:new i(0,1/0);if(r instanceof n)return f(r,n,!0);throw new e.error.UnsupportedTypeError("asec",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.acosh_asinh_asech_acsch;e.asech=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("asech",arguments.length,1);if(s(r)){if(1>=r&&r>=-1){r=1/r;var t=Math.sqrt(r*r-1);return r>0?Math.log(t+r):new i(Math.log(t-r),Math.PI)}return p(new i(r,0))}if(c(r)){if(0==r.re&&0==r.im)return new i(1/0,0);var o=r.re*r.re+r.im*r.im;return r=0!=o?new i(r.re/o,-r.im/o):new i(0!=r.re?r.re/0:0,0!=r.im?-(r.im/0):0),e.acosh(r)}if(f(r))return a.deepMap(r,p);if(u(r)||null===r)return r?0:1/0;if(r instanceof n)return l(r,n,!1,!0);throw new e.error.UnsupportedTypeError("asech",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arcsin_arccsc;e.asin=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("asin",arguments.length,1);if(a(r))return r>=-1&&1>=r?Math.asin(r):l(new i(r,0));if(u(r)){var t=r.re,p=r.im,m=new i(p*p-t*t+1,-2*t*p),h=e.sqrt(m),g=new i(h.re-p,h.im+t),d=e.log(g);return new i(d.im,-d.re)}if(c(r))return o.deepMap(r,l,!0);if(s(r)||null===r)return Math.asin(r);if(r instanceof n)return f(r,n,!1);throw new e.error.UnsupportedTypeError("asin",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.acosh_asinh_asech_acsch;e.asinh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("asinh",arguments.length,1);if(s(r))return Math.log(Math.sqrt(r*r+1)+r);if(c(r)){var t=r.im;r.im=-r.re,r.re=t;var i=e.asin(r);return r.re=-r.im,r.im=t,t=i.re,i.re=-i.im,i.im=t,i}if(f(r))return a.deepMap(r,p,!0);if(u(r)||null===r)return r?.881373587019543:0;if(r instanceof n)return l(r,n,!0,!1);throw new e.error.UnsupportedTypeError("asinh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,c=o.isCollection,f=r.bignumber.arctan_arccot;e.atan=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("atan",arguments.length,1);if(a(r))return Math.atan(r);if(u(r)){if(0==r.re){if(1==r.im)return new i(0,1/0);if(-1==r.im)return new i(0,-(1/0))}var t=r.re,p=r.im,m=t*t+(1-p)*(1-p),h=new i((1-p*p-t*t)/m,-2*t/m),g=e.log(h);return new i(-.5*g.im,.5*g.re)}if(c(r))return o.deepMap(r,l,!0);if(s(r)||null===r)return Math.atan(r);if(r instanceof n)return f(r,n,!1);throw new e.error.UnsupportedTypeError("atan",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=e.collection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=(i.isComplex,o.isCollection),c=r.bignumber.arctan2;e.atan2=function f(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("atan2",arguments.length,2);if(a(r)){if(a(t))return Math.atan2(r,t);if(t instanceof n)return c(new n(r),t,n)}if(u(r)||u(t))return o.deepMap2(r,t,f);if(s(r)||null===r)return f(r?1:0,t);if(s(t)||null===t)return f(r,t?1:0);if(r instanceof n)return a(t)?c(r,new n(t),n):t instanceof n?c(r,t,n):f(r.toNumber(),t);if(t instanceof n)return r instanceof n?c(r,t,n):f(r,t.toNumber());throw new e.error.UnsupportedTypeError("atan2",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=(o.isUnit,a.isCollection),l=r.bignumber.atanh_acoth;e.atanh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("atanh",arguments.length,1);if(s(r))return 1>=r&&r>=-1?Math.log((1+r)/(1-r))/2:p(new i(r,0));if(c(r)){var t=r.re>1&&0==r.im,o=1-r.re,m=1+r.re,h=o*o+r.im*r.im;r=0!=h?new i((m*o-r.im*r.im)/h,(r.im*o+m*r.im)/h):new i(-1!=r.re?r.re/0:0,0!=r.im?r.im/0:0);var g=r.re;return r.re=Math.log(Math.sqrt(r.re*r.re+r.im*r.im))/2,r.im=Math.atan2(r.im,g)/2,t&&(r.im=-r.im),r}if(f(r))return a.deepMap(r,p,!0);if(u(r)||null===r)return r?1/0:0;if(r instanceof n)return l(r,n,!1);throw new e.error.UnsupportedTypeError("atanh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.cos_sin_sec_csc;e.cos=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cos",arguments.length,1);if(u(r))return Math.cos(r);if(f(r))return new o(Math.cos(r.re)*e.cosh(-r.im),Math.sin(r.re)*e.sinh(-r.im));if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");return Math.cos(r.value)}if(p(r))return s.deepMap(r,h);if(c(r)||null===r)return Math.cos(r);if(r instanceof i)return m(r,i,0,!1);throw new e.error.UnsupportedTypeError("cos",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection,p=r.bignumber.cosh_sinh_csch_sech;e.cosh=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cosh",arguments.length,1);if(s(r))return(Math.exp(r)+Math.exp(-r))/2;if(c(r)){var t=Math.exp(r.re),h=Math.exp(-r.re);return new i(Math.cos(r.im)*(t+h)/2,Math.sin(r.im)*(t-h)/2)}if(f(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cosh is no angle");return m(r.value)}if(l(r))return a.deepMap(r,m);if(u(r)||null===r)return m(r?1:0);if(r instanceof n)return p(r,n,!1,!1);throw new e.error.UnsupportedTypeError("cosh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.tan_cot;e.cot=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cot",arguments.length,1);if(u(r))return 1/Math.tan(r);if(f(r)){var t=Math.exp(-4*r.im)-2*Math.exp(-2*r.im)*Math.cos(2*r.re)+1;return new o(2*Math.exp(-2*r.im)*Math.sin(2*r.re)/t,(Math.exp(-4*r.im)-1)/t)}if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");return 1/Math.tan(r.value)}if(p(r))return s.deepMap(r,h);if(c(r)||null===r)return h(+r);if(r instanceof i)return m(r,i,!0);throw new e.error.UnsupportedTypeError("cot",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection,p=r.bignumber.tanh_coth;e.coth=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("coth",arguments.length,1);if(s(r)){var t=Math.exp(2*r);return(t+1)/(t-1)}if(c(r)){var h=Math.exp(2*r.re),g=h*Math.cos(2*r.im),d=h*Math.sin(2*r.im),v=(g-1)*(g-1)+d*d;return new i(((g+1)*(g-1)+d*d)/v,-2*d/v)}if(f(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function coth is no angle");return m(r.value)}if(l(r))return a.deepMap(r,m);if(u(r)||null===r)return m(r?1:0);if(r instanceof n)return p(r,n,!0);throw new e.error.UnsupportedTypeError("coth",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.cos_sin_sec_csc;e.csc=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("csc",arguments.length,1);if(u(r))return 1/Math.sin(r);if(f(r)){var t=.25*(Math.exp(-2*r.im)+Math.exp(2*r.im))-.5*Math.cos(2*r.re);return new o(.5*Math.sin(r.re)*(Math.exp(-r.im)+Math.exp(r.im))/t,.5*Math.cos(r.re)*(Math.exp(-r.im)-Math.exp(r.im))/t)}if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");return 1/Math.sin(r.value)}if(p(r))return s.deepMap(r,h);if(c(r)||null===r)return h(+r);if(r instanceof i)return m(r,i,1,!0);throw new e.error.UnsupportedTypeError("csc",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number,u=r.number.isNumber,c=r["boolean"].isBoolean,f=i.isComplex,l=o.isUnit,p=a.isCollection,m=r.bignumber.cosh_sinh_csch_sech;e.csch=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("csch",arguments.length,1);if(u(r))return 0==r?Number.POSITIVE_INFINITY:Math.abs(2/(Math.exp(r)-Math.exp(-r)))*s.sign(r);if(f(r)){var t=Math.exp(r.re),g=Math.exp(-r.re),d=Math.cos(r.im)*(t-g),v=Math.sin(r.im)*(t+g),y=d*d+v*v;return new i(2*d/y,-2*v/y)}if(l(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csch is no angle");return h(r.value)}if(p(r))return a.deepMap(r,h);if(c(r)||null===r)return h(r?1:0);if(r instanceof n)return m(r,n,!0,!0);throw new e.error.UnsupportedTypeError("csch",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.cos_sin_sec_csc;e.sec=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sec",arguments.length,1);if(u(r))return 1/Math.cos(r);if(f(r)){var t=.25*(Math.exp(-2*r.im)+Math.exp(2*r.im))+.5*Math.cos(2*r.re);return new o(.5*Math.cos(r.re)*(Math.exp(-r.im)+Math.exp(r.im))/t,.5*Math.sin(r.re)*(Math.exp(r.im)-Math.exp(-r.im))/t)}if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");return 1/Math.cos(r.value)}if(p(r))return s.deepMap(r,h);if(c(r)||null===r)return h(+r);if(r instanceof i)return m(r,i,0,!0);throw new e.error.UnsupportedTypeError("sec",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection,p=r.bignumber.cosh_sinh_csch_sech;e.sech=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sech",arguments.length,1);if(s(r))return 2/(Math.exp(r)+Math.exp(-r));if(c(r)){var t=Math.exp(r.re),h=Math.exp(-r.re),g=Math.cos(r.im)*(t+h),d=Math.sin(r.im)*(t-h),v=g*g+d*d;return new i(2*g/v,-2*d/v)}if(f(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sech is no angle");return m(r.value)}if(l(r))return a.deepMap(r,m);if(u(r)||null===r)return m(r?1:0);if(r instanceof n)return p(r,n,!1,!0);throw new e.error.UnsupportedTypeError("sech",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.cos_sin_sec_csc;e.sin=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sin",arguments.length,1);if(u(r))return Math.sin(r);if(f(r))return new o(Math.sin(r.re)*e.cosh(-r.im),Math.cos(r.re)*e.sinh(r.im));if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sin is no angle");return Math.sin(r.value)}if(p(r))return s.deepMap(r,h,!0);if(c(r)||null===r)return Math.sin(r);if(r instanceof i)return m(r,i,1,!1);throw new e.error.UnsupportedTypeError("sin",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection,p=r.bignumber.cosh_sinh_csch_sech;e.sinh=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sinh",arguments.length,1);if(s(r))return Math.abs(r)<1?r+r*r*r/6+r*r*r*r*r/120:(Math.exp(r)-Math.exp(-r))/2;if(c(r)){var t=Math.cos(r.im),h=Math.sin(r.im),g=Math.exp(r.re),d=Math.exp(-r.re);return new i(t*(g-d)/2,h*(g+d)/2)}if(f(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sinh is no angle");return m(r.value)}if(l(r))return a.deepMap(r,m,!0);if(u(r)||null===r)return m(r?1:0);if(r instanceof n)return p(r,n,!0,!1);throw new e.error.UnsupportedTypeError("sinh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e,r){var n=t(175),i=e.type.BigNumber,o=t(7),a=t(11),s=e.collection,u=n.number.isNumber,c=n["boolean"].isBoolean,f=o.isComplex,l=a.isUnit,p=s.isCollection,m=n.bignumber.tan_cot;e.tan=function h(r){if(1!=arguments.length)throw new e.error.ArgumentsError("tan",arguments.length,1);if(u(r))return Math.tan(r);if(f(r)){var t=Math.exp(-4*r.im)+2*Math.exp(-2*r.im)*Math.cos(2*r.re)+1;return new o(2*Math.exp(-2*r.im)*Math.sin(2*r.re)/t,(1-Math.exp(-4*r.im))/t)}if(l(r)){if(!r.hasBase(a.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");return Math.tan(r.value)}if(p(r))return s.deepMap(r,h,!0);if(c(r)||null===r)return Math.tan(r);if(r instanceof i)return m(r,i,!1);throw new e.error.UnsupportedTypeError("tan",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=e.type.BigNumber,i=t(7),o=t(11),a=e.collection,s=r.number.isNumber,u=r["boolean"].isBoolean,c=i.isComplex,f=o.isUnit,l=a.isCollection,p=r.bignumber.tanh_coth;e.tanh=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("tanh",arguments.length,1);if(s(r)){var t=Math.exp(2*r);return(t-1)/(t+1)}if(c(r)){var h=Math.exp(2*r.re),g=h*Math.cos(2*r.im),d=h*Math.sin(2*r.im),v=(g+1)*(g+1)+d*d;return new i(((g-1)*(g+1)+d*d)/v,2*d/v)}if(f(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tanh is no angle");return m(r.value)}if(l(r))return a.deepMap(r,m,!0);if(u(r)||null===r)return m(r?1:0);if(r instanceof n)return p(r,n,!1);throw new e.error.UnsupportedTypeError("tanh",e["typeof"](r))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=t(11),i=e.collection,o=r.string.isString,a=n.isUnit,s=i.isCollection;e.to=function u(r,t){if(2!=arguments.length)throw new e.error.ArgumentsError("to",arguments.length,2);if(a(r)&&(a(t)||o(t)))return r.to(t);if(s(r)||s(t))return i.deepMap2(r,t,u);throw new e.error.UnsupportedTypeError("to",e["typeof"](r),e["typeof"](t))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=r.object;e.clone=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("clone",arguments.length,1);return n.clone(r)}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){if("function"==typeof r)return e.filter(function(e){return r(e)});if(r instanceof RegExp)return e.filter(function(e){return r.test(e)});throw new TypeError("Function or RegExp expected")}var t=e.type.Matrix;e.filter=function(n,i){if(2!==arguments.length)throw new e.error.ArgumentsError("filter",arguments.length,2);if(n instanceof t){var o=n.size();if(o.length>1)throw new Error("Only one dimensional matrices supported");return e.matrix(r(n.toArray(),i))}if(Array.isArray(n))return r(n,i);throw new e.error.UnsupportedTypeError("filter",e["typeof"](n),e["typeof"](compare))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=r.string;e.format=function(r,t){var i=arguments.length;if(1!==i&&2!==i)throw new e.error.ArgumentsError("format",i,1,2);return n.format(r,t)}}},function(e,r,t){"use strict";e.exports=function(e){function r(r,t,n){(n.override||void 0===e[r])&&(n.wrap&&"function"==typeof t?(e[r]=function(){for(var r=[],n=0,i=arguments.length;i>n;n++){var o=arguments[n];r[n]=o&&o.valueOf()}return t.apply(e,r)},t&&t.transform&&(e[r].transform=t.transform)):e[r]=t,t&&t.transform&&(e.expression.transform[r]=t.transform),e.chaining.Chain.createProxy(r,t))}function n(e){return"function"==typeof e||s(e)||u(e)||c(e)||f(e)}var i=t(175),o=t(7),a=t(11),s=i.number.isNumber,u=i.string.isString,c=o.isComplex,f=a.isUnit;e["import"]=function l(i,o){var a=arguments.length;if(1!=a&&2!=a)throw new e.error.ArgumentsError("import",a,1,2);var s,c={override:o&&o.override||!1,wrap:o&&o.wrap||!1};if(u(i)){var f=t(207)(i);l(f,o)}else{if("object"!=typeof i)throw new TypeError("Object or module name expected");for(s in i)if(i.hasOwnProperty(s)){var p=i[s];n(p)?r(s,p,c):l(p,o)}}}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){var t=function(n,i){return Array.isArray(n)?n.map(function(e,r){return t(e,i.concat(r))}):r(n,i,e)};return t(e,[])}var t=e.type.Matrix;e.map=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("map",arguments.length,2);if(Array.isArray(n))return r(n,i);if(n instanceof t)return n.map(i);throw new e.error.UnsupportedTypeError("map",e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(175),n=r.string.isString;e.print=function(r,t,i){var o=arguments.length;if(2!=o&&3!=o)throw new e.error.ArgumentsError("print",o,2,3);if(!n(r))throw new TypeError("String expected as first parameter in function format");if(!(t instanceof Object))throw new TypeError("Object expected as second parameter in function format");return r.replace(/\$([\w\.]+)/g,function(r,o){for(var a=o.split("."),s=t[a.shift()];a.length&&void 0!==s;){var u=a.shift();s=u?s[u]:s+"."}return void 0!==s?n(s)?s:e.format(s,i):r})}}},function(e,r,t){"use strict";e.exports=function(e){var r=e.type.Matrix;e.sort=function(t,n){var i=null;if(1===arguments.length)i=e.compare;else{if(2!==arguments.length)throw new e.error.ArgumentsError("sort",arguments.length,1,2);if("function"==typeof n)i=n;else if("asc"===n)i=e.compare;else{if("desc"!==n)throw new e.error.UnsupportedTypeError("sort",e["typeof"](t),e["typeof"](n));i=function(r,t){return-e.compare(r,t)}}}if(t instanceof r){var o=t.size();if(o.length>1)throw new Error("Only one dimensional matrices supported");return e.matrix(t.toArray().sort(i))}if(Array.isArray(t))return t.sort(i);throw new e.error.UnsupportedTypeError("sort",e["typeof"](t),e["typeof"](n))}}},function(e,r,t){"use strict";e.exports=function(e){var r=t(338),n=t(7),i=e.type.Matrix,o=t(11),a=t(9),s=t(8),u=t(12);e["typeof"]=function(t){if(1!=arguments.length)throw new e.error.ArgumentsError("typeof",arguments.length,1);var c=r.type(t);if("object"===c){if(t instanceof n)return"complex";if(t instanceof i)return"matrix";if(t instanceof o)return"unit";if(t instanceof a)return"index";if(t instanceof s)return"range";if(t instanceof u)return"help";if(t instanceof e.type.BigNumber)return"bignumber";if(t instanceof e.chaining.Chain)return"chain"}return c}}},function(e,r,t){"use strict";e.exports=function(e){function r(e,r){var t=function(n,i){Array.isArray(n)?n.forEach(function(e,r){t(e,i.concat(r))}):r(n,i,e)};t(e,[])}var t=e.type.Matrix;e.forEach=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("forEach",arguments.length,2);if(Array.isArray(n))return r(n,i);if(n instanceof t)return n.forEach(i);throw new e.error.UnsupportedTypeError("forEach",e["typeof"](n))}}},function(e,r,t){"use strict";function n(e){var r=String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!r)throw new SyntaxError("Invalid number");var t=r[1],n=r[2],i=parseFloat(r[4]||"0"),o=n.indexOf(".");i+=-1!==o?o-1:n.length-1,this.sign=t,this.coefficients=n.replace(".","").replace(/^0*/,function(e){return i-=e.length,""}).replace(/0*$/,"").split("").map(function(e){return parseInt(e)}),0===this.coefficients.length&&(this.coefficients.push(0),i++),this.exponent=i}function i(e){for(var r=[],t=0;e>t;t++)r.push(0);return r}n.prototype.toFixed=function(e){var r=this.roundDigits(this.exponent+1+(e||0)),t=r.coefficients,n=r.exponent+1,o=n+(e||0);return t.length<o&&(t=t.concat(i(o-t.length))),0>n&&(t=i(-n+1).concat(t),n=1),e&&t.splice(n,0,0===n?"0.":"."),this.sign+t.join("")},n.prototype.toExponential=function(e){var r=e?this.roundDigits(e):this.clone(),t=r.coefficients,n=r.exponent;t.length<e&&(t=t.concat(i(e-t.length)));var o=t.shift();return this.sign+o+(t.length>0?"."+t.join(""):"")+"e"+(n>=0?"+":"")+n},n.prototype.toPrecision=function(e,r){var t=r&&void 0!==r.lower?r.lower:.001,n=r&&void 0!==r.upper?r.upper:1e5,o=Math.abs(Math.pow(10,this.exponent));if(t>o||o>=n)return this.toExponential(e);var a=e?this.roundDigits(e):this.clone(),s=a.coefficients,u=a.exponent;s.length<e&&(s=s.concat(i(e-s.length))),s=s.concat(i(u-s.length+1+(s.length<e?e-s.length:0))),s=i(-u).concat(s);var c=u>0?u:0;return c<s.length-1&&s.splice(c+1,0,"."),this.sign+s.join("")},n.prototype.clone=function(){var e=new n("0");return e.sign=this.sign,e.coefficients=this.coefficients.slice(0),e.exponent=this.exponent,e},n.prototype.roundDigits=function(e){for(var r=this.clone(),t=r.coefficients;0>=e;)t.unshift(0),r.exponent++,e++;if(t.length>e){var n=t.splice(e);if(n[0]>=5){var i=e-1;for(t[i]++;10===t[i];)t.pop(),0===i&&(t.unshift(0),r.exponent++,i++),i--,t[i]++}}return r},e.exports=n},function(e,r,t){"use strict";function n(e,t,n){var o,a,s=e.constructor,u=+(e.s<0),c=+(t.s<0);if(u){o=i(r.not(e));for(var f=0;f<o.length;++f)o[f]^=1}else o=i(e);if(c){a=i(r.not(t));for(var f=0;f<a.length;++f)a[f]^=1}else a=i(t);var l,p,m;o.length<=a.length?(l=o,p=a,m=u):(l=a,p=o,m=c);var h=l.length,g=p.length,d=1^n(u,c),v=new s(1^d),y=s.ONE,x=new s(2),w=s.precision;for(s.config({precision:1e9});h>0;)n(l[--h],p[--g])==d&&(v=v.plus(y)),y=y.times(x);for(;g>0;)n(m,p[--g])==d&&(v=v.plus(y)),y=y.times(x);return s.config({precision:w}),0==d&&(v.s=-v.s),v}function i(e){for(var r=e.c,t=r[0]+"",n=1;n<r.length;++n){for(var i=r[n]+"",o=7-i.length;o--;)i="0"+i;t+=i}var a;for(a=t.length-1;"0"==t.charAt(a);--a);var s=e.e,u=t.slice(0,a+1||1),c=u.length;if(s>0)if(++s>c)for(s-=c;s--;u+="0");else c>s&&(u=u.slice(0,s)+"."+u.slice(s));for(var f=[0],n=0;n<u.length;){for(var l=f.length;l--;f[l]*=10);f[0]+=u.charAt(n++)<<0;for(var a=0;a<f.length;++a)f[a]>1&&(null==f[a+1]&&(f[a+1]=0),f[a+1]+=f[a]>>1,f[a]&=1)}return f.reverse()}function o(e,t){var n=t.precision,i=-(n+4),o=n+8-e.e,a=25-e.e,s=Math.max(1.442695*Math.log(n+2)|5,5);t.config({precision:a});var u=0,c=new t(Math.asin(e.toNumber())+"");do{var l=r.cos_sin_sec_csc(c,t,1,!1),p=f(l);l.isZero()||(l.s=c.s);var m=l.minus(e).div(p);c=c.minus(m),a=Math.min(2*a,o),t.config({precision:a})}while(2*m.e>=i&&!m.isZero()&&++u<=s);if(u==s)throw new Error("asin() failed to converge to the requested accuracy.Try with a higher precision.");return t.config({precision:n}),c.toDP(n-1)}function a(e,r){var t=e.constructor;t.config({precision:r+Math.log(r)|4});for(var n=new t(1),i=e,o=0/0,a=e.times(e),s=e,u=new t(n),c=new t(n),f=new t(n),l=3;!i.equals(o);l+=2)s=s.times(a),u=u.times(f),c=c.times(f.plus(n)),o=i,f=new t(l),i=i.plus(s.times(u).div(f.times(c)));return t.config({precision:r}),i.toDP(r-1)}function s(e){for(var r=e,t=0/0,n=e.times(e),i=e,o=!0,a=3;!r.equals(t);a+=2)i=i.times(n),t=r,o=!o,r=o?r.plus(i.div(a)):r.minus(i.div(a));return r}function u(e,r){for(var t=e.constructor.ONE,n=e,i=0/0,o=e.times(e),a=r?n:n=t,s=t,u=!0,c=r;!n.equals(i);c+=2)a=a.times(o),s=s.times(c+1).times(c+2),i=n,u=!u,n=u?n.plus(a.div(s)):n.minus(a.div(s));return n}function c(e,t,n){var i=r.pi(t+2),o=r.tau(t);if(e.abs().lte(i.toDP(e.dp())))return[e,!1];var a=e.constructor;if(e.div(i.toDP(e.dp())).toNumber()%2==0)return[new a(1^n),!0];var s=e.mod(o);return s.toDP(e.dp(),1).isZero()?[new a(1^n),!0]:(s.gt(i)&&(n?(s=s.minus(i),s.s=-s.s):s=o.minus(s)),s.constructor=a,[s,!1])}function f(e){var r=e.constructor,t=r.precision;r.config({precision:t+2});var n=r.ONE.minus(e.times(e)).sqrt();return r.config({precision:t}),n.toDP(t-1)}var l=t(5),p=t(3).isNumber,m=(t(3).digits,t(339).memoize);r.isBigNumber=function(e){return e instanceof l},r.e=m(function(e){var r=l.constructor({precision:e});return new r(1).exp()}),r.phi=m(function(e){var r=l.constructor({precision:e});return new r(1).plus(new r(5).sqrt()).div(2)}),r.pi=m(function(e){var r=l.constructor({precision:e+4}),t=new r(4).times(s(new r(1).div(5))).minus(s(new r(1).div(239)));return r.config({precision:e}),new r(4).times(t)}),r.tau=m(function(e){var t=r.pi(e+2),n=l.constructor({precision:e});return new n(2).times(t);

}),r.and=function(e,r){if(e.isFinite()&&!e.isInteger()||r.isFinite()&&!r.isInteger())throw new Error("Parameters in function bitAnd must be integer numbers");var t=e.constructor;if(e.isNaN()||r.isNaN())return new t(0/0);if(e.isZero()||r.eq(-1)||e.eq(r))return e;if(r.isZero()||e.eq(-1))return r;if(!e.isFinite()||!r.isFinite()){if(!e.isFinite()&&!r.isFinite())return e.isNegative()==r.isNegtive()?e:new t(0);if(!e.isFinite())return r.isNegative()?e:e.isNegative()?new t(0):r;if(!r.isFinite())return e.isNegative()?r:r.isNegative()?new t(0):e}return n(e,r,function(e,r){return e&r})},r.leftShift=function(e,r){if(e.isFinite()&&!e.isInteger()||r.isFinite()&&!r.isInteger())throw new Error("Parameters in function leftShift must be integer numbers");var t=e.constructor;return e.isNaN()||r.isNaN()||r.isNegative()&&!r.isZero()?new t(0/0):e.isZero()||r.isZero()?e:e.isFinite()||r.isFinite()?e.times(r.lt(55)?Math.pow(2,r.toNumber())+"":new t(2).pow(r)):new t(0/0)},r.not=function(e){if(e.isFinite()&&!e.isInteger())throw new Error("Parameter in function bitNot must be integer numbers");var r=e.constructor,t=r.precision;r.config({precision:1e9});var e=e.plus(r.ONE);return e.s=-e.s||null,r.config({precision:t}),e},r.or=function(e,r){if(e.isFinite()&&!e.isInteger()||r.isFinite()&&!r.isInteger())throw new Error("Parameters in function bitOr must be integer numbers");var t=e.constructor;if(e.isNaN()||r.isNaN())return new t(0/0);var i=new t(-1);return e.isZero()||r.eq(i)||e.eq(r)?r:r.isZero()||e.eq(i)?e:e.isFinite()&&r.isFinite()?n(e,r,function(e,r){return e|r}):!e.isFinite()&&!e.isNegative()&&r.isNegative()||e.isNegative()&&!r.isNegative()&&!r.isFinite()?i:e.isNegative()&&r.isNegative()?e.isFinite()?e:r:e.isFinite()?r:e},r.rightShift=function(e,r){if(e.isFinite()&&!e.isInteger()||r.isFinite()&&!r.isInteger())throw new Error("Parameters in function rightArithShift must be integer numbers");var t=e.constructor;return e.isNaN()||r.isNaN()||r.isNegative()&&!r.isZero()?new t(0/0):e.isZero()||r.isZero()?e:r.isFinite()?r.lt(55)?e.div(Math.pow(2,r.toNumber())+"").floor():e.div(new t(2).pow(r)).floor():new t(e.isNegative()?-1:e.isFinite()?0:0/0)},r.xor=function(e,t){if(e.isFinite()&&!e.isInteger()||t.isFinite()&&!t.isInteger())throw new Error("Parameters in function bitXor must be integer numbers");var i=e.constructor;if(e.isNaN()||t.isNaN())return new i(0/0);if(e.isZero())return t;if(t.isZero())return e;if(e.eq(t))return new i(0);var o=new i(-1);return e.eq(o)?r.not(t):t.eq(o)?r.not(e):e.isFinite()&&t.isFinite()?n(e,t,function(e,r){return e^r}):e.isFinite()||t.isFinite()?new i(e.isNegative()==t.isNegative()?1/0:-(1/0)):o},r.arccos_arcsec=function(e,t,n){var i=t.precision;if(n){if(e.abs().lt(t.ONE))throw new Error("asec() only has non-complex values for |x| >= 1.")}else if(e.abs().gt(t.ONE))throw new Error("acos() only has non-complex values for |x| <= 1.");if(e.eq(-1))return r.pi(i);t.config({precision:i+4}),n&&(e=t.ONE.div(e));var o=r.arctan_arccot(t.ONE.minus(e.times(e)).sqrt().div(e.plus(t.ONE)),t).times(2);return t.config({precision:i}),o.toDP(i-1)},r.arcsin_arccsc=function(e,t,n){if(e.isNaN())return new t(0/0);var i=t.precision,s=e.abs();if(n){if(s.lt(t.ONE))throw new Error("acsc() only has non-complex values for |x| >= 1.");t.config({precision:i+2}),e=t.ONE.div(e),t.config({precision:i}),s=e.abs()}else if(s.gt(t.ONE))throw new Error("asin() only has non-complex values for |x| <= 1.");if(s.gt(.8)){t.config({precision:i+4});var u=e.s,c=r.pi(i+4).div(2);return e=c.minus(r.arcsin_arccsc(t.ONE.minus(e.times(e)).sqrt(),t)),e.s=u,e.constructor=t,t.config({precision:i}),e.toDP(i-1)}var f=s.gt(.58);f&&(t.config({precision:i+8}),e=e.div(new t(2).sqrt().times(t.ONE.minus(e.times(e)).sqrt().plus(t.ONE).sqrt())),t.config({precision:i}));var l=60>=i||e.dp()<=Math.log(i)&&e.lt(.05)?a(e,i):o(e,t);return f?l.times(2):l},r.arctan_arccot=function(e,t,n){if(e.isNaN())return new t(0/0);if(!n&&e.isZero()||n&&!e.isFinite())return new t(0);var i=t.precision;if(!n&&!e.isFinite()||n&&e.isZero()){var o=r.pi(i+2).div(2).toDP(i-1);return o.constructor=t,o.s=e.s,o}t.config({precision:i+4}),n&&(e=t.ONE.div(e));var a=e.abs();if(a.lte(.875)){var u=s(e);return u.constructor=t,t.config({precision:i}),u.toDP(t.precision-1)}if(a.gte(1.143)){var o=r.pi(i+4).div(2),u=o.minus(s(t.ONE.div(a)));return u.s=e.s,u.constructor=t,t.config({precision:i}),u.toDP(t.precision-1)}return e=e.div(e.times(e).plus(1).sqrt()),t.config({precision:i}),r.arcsin_arccsc(e,t)},r.arctan2=function(e,t,n){var i=n.precision;if(t.isZero()){if(e.isZero())return new n(0/0);var o=r.pi(i+2).div(2).toDP(i-1);return o.constructor=n,o.s=e.s,o}n.config({precision:i+2});var a=r.arctan_arccot(e.div(t),n,!1);if(t.isNegative()){var s=r.pi(i+2);a=e.isNegative()?a.minus(s):a.plus(s)}return a.constructor=n,n.config({precision:i}),a.toDP(i-1)},r.acosh_asinh_asech_acsch=function(e,r,t,n){if(e.isNaN())return new r(0/0);if(n&&e.isZero())return new r(1/0);if(!t)if(n){if(e.isNegative()||e.gt(r.ONE))throw new Error("asech() only has non-complex values for 0 <= x <= 1.")}else if(e.lt(r.ONE))throw new Error("acosh() only has non-complex values for x >= 1.");var i=r.precision;r.config({precision:i+4});var o=new r(e);o.constructor=r,n&&(o=r.ONE.div(o));var a=t?o.times(o).plus(r.ONE):o.times(o).minus(r.ONE),s=o.plus(a.sqrt()).ln();return r.config({precision:i}),new r(s.toPrecision(i))},r.atanh_acoth=function(e,r,t){if(e.isNaN())return new r(0/0);var n=e.abs();if(n.eq(r.ONE))return new r(e.isNegative()?-(1/0):1/0);if(n.gt(r.ONE)){if(!t)throw new Error("atanh() only has non-complex values for |x| <= 1.")}else if(t)throw new Error("acoth() has complex values for |x| < 1.");if(e.isZero())return new r(0);var i=r.precision;r.config({precision:i+4});var o=new r(e);o.constructor=r,t&&(o=r.ONE.div(o));var a=r.ONE.plus(o).div(r.ONE.minus(o)).ln().div(2);return r.config({precision:i}),new r(a.toPrecision(i))},r.cos_sin_sec_csc=function(e,r,t,n){if(e.isNaN()||!e.isFinite())return new r(0/0);var i=r.precision,o=new r(e),a=o.isNegative();a&&(o.s=-o.s);var s=i+(0|Math.log(i))+3;if(r.config({precision:s}),o=c(o,s,t),o[0].constructor=r,o[1])return o=o[0],n&&o.isZero()&&(o=new r(1/0)),r.config({precision:i}),o;var f;if(o=o[0],t){f=u(o.div(3125),t),r.config({precision:Math.min(s,i+15)});for(var l=new r(5),p=new r(16),m=new r(20),h=0;5>h;++h){var g=f.times(f),d=g.times(f),v=d.times(g);f=p.times(v).minus(m.times(d)).plus(l.times(f))}a&&(f.s=-f.s)}else{var y,x;o.abs().lt(r.ONE)?(y=64,x=3):(y=256,x=4),f=u(o.div(y),t),r.config({precision:Math.min(s,i+8)});for(var w=new r(8);x>0;--x){var g=f.times(f),b=g.times(g);f=w.times(b.minus(g)).plus(r.ONE)}}return n&&(f=f.e<=-i?new r(1/0):r.ONE.div(f)),r.config({precision:i}),f.toDP(i-1)},r.tan_cot=function(e,t,n){if(e.isNaN())return new t(0/0);var i=t.precision,o=r.pi(i+2),a=o.div(2).toDP(i-1);o=o.toDP(i-1);var s=c(e,i,1)[0];if(s.abs().eq(o))return new t(1/0);t.config({precision:i+4});var u=r.cos_sin_sec_csc(s,t,1,!1),l=f(u);u=u.toDP(i),l=l.toDP(i),s.eq(e)?s.gt(a)&&(l.s=-l.s):o.minus(s.abs()).gt(a)&&(l.s=-l.s);var p=n?l.div(u):u.div(l);return t.config({precision:i}),new t(p.toPrecision(i))},r.cosh_sinh_csch_sech=function(e,r,t,n){if(e.isNaN())return new r(0/0);if(!e.isFinite())return new r(n?0:t?e:1/0);var i=r.precision;r.config({precision:i+4});var o=new r(e);return o.constructor=r,o=o.exp(),o=t?o.minus(r.ONE.div(o)):o.plus(r.ONE.div(o)),o=n?new r(2).div(o):o.div(2),r.config({precision:i}),new r(o.toPrecision(i))},r.tanh_coth=function(e,r,t){if(e.isNaN())return new r(0/0);if(!e.isFinite())return new r(e.s);var n=r.precision;r.config({precision:n+4});var i=new r(e);i.constructor=r;var o=i.exp(),a=r.ONE.div(o),s=o.minus(a);return s=t?o.plus(a).div(s):s.div(o.plus(a)),r.config({precision:n}),s.toDP(n-1)},r.format=function(e,t){if("function"==typeof t)return t(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var n="auto",i=void 0;switch(void 0!==t&&(t.notation&&(n=t.notation),p(t)?i=t:t.precision&&(i=t.precision)),n){case"fixed":return r.toFixed(e,i);case"exponential":return r.toExponential(e,i);case"auto":var o=.001,a=1e5;t&&t.exponential&&(void 0!==t.exponential.lower&&(o=t.exponential.lower),void 0!==t.exponential.upper&&(a=t.exponential.upper));{({toExpNeg:e.constructor.toExpNeg,toExpPos:e.constructor.toExpPos})}if(e.constructor.config({toExpNeg:Math.round(Math.log(o)/Math.LN10),toExpPos:Math.round(Math.log(a)/Math.LN10)}),e.isZero())return"0";var s,u=e.abs();return s=u.gte(o)&&u.lt(a)?e.toSignificantDigits(i).toFixed():r.toExponential(e,i),s.replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],r=arguments[4];return"."!==e?e+r:r});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", or "fixed".')}},r.toExponential=function(e,r){return void 0!==r?e.toExponential(r-1):e.toExponential()},r.toFixed=function(e,r){return e.toFixed(r||0)}},function(e,r,t){"use strict";function n(e){for(var r=[];m(e);)r.push(e.length),e=e[0];return r}function i(e,r,t){var n,o=e.length;if(o!=r[t])throw new l(o,r[t]);if(t<r.length-1){var a=t+1;for(n=0;o>n;n++){var s=e[n];if(!m(s))throw new l(r.length-1,r.length,"<");i(e[n],r,a)}}else for(n=0;o>n;n++)if(m(e[n]))throw new l(r.length+1,r.length,">")}function o(e,t,n,i){var a,s,u=e.length,c=t[n],l=Math.min(u,c);if(e.length=c,n<t.length-1){var p=n+1;for(a=0;l>a;a++)s=e[a],m(s)||(s=[s],e[a]=s),o(s,t,p,i);for(a=l;c>a;a++)s=[],e[a]=s,o(s,t,p,i)}else{for(a=0;l>a;a++)for(;m(e[a]);)e[a]=e[a][0];if(i!==r.UNINITIALIZED)for(a=l;c>a;a++)e[a]=f.clone(i)}}function a(e,r,t){var n,i;if(r>t){var o=t+1;for(n=0,i=e.length;i>n;n++)e[n]=a(e[n],r,o)}else for(;m(e);)e=e[0];return e}function s(e,r,t){var n,i;if(m(e)){var o=t+1;for(n=0,i=e.length;i>n;n++)e[n]=s(e[n],r,o)}else for(var a=t;r>a;a++)e=[e];return e}var u=t(3),c=t(176),f=t(2),l=(t(338),t(172)),p=t(173),m=Array.isArray;r.size=function(e){var t=n(e);return r.validate(e,t),t},r.validate=function(e,r){var t=0==r.length;if(t){if(m(e))throw new l(e.length,0)}else i(e,r,0)},r.validateIndex=function(e,r){if(!u.isNumber(e)||!u.isInteger(e))throw new TypeError("Index must be an integer (value: "+e+")");if(0>e)throw new p(e);if(void 0!==r&&e>=r)throw new p(e,r)},r.UNINITIALIZED={},r.resize=function(e,r,t){if(!m(e)||!m(r))throw new TypeError("Array expected");if(0===r.length)throw new Error("Resizing to scalar is not supported");r.forEach(function(e){if(!u.isNumber(e)||!u.isInteger(e)||0>e)throw new TypeError("Invalid size, must contain positive integers (size: "+c.format(r)+")")});var n=void 0!==t?t:0;return o(e,r,0,n),e},r.squeeze=function(e,t){for(var n=t||r.size(e);m(e)&&1===e.length;)e=e[0],n.shift();for(var i=n.length;1===n[i-1];)i--;return i<n.length&&(e=a(e,i,0),n.length=i),e},r.unsqueeze=function(e,t,n,i){var o=i||r.size(e);if(n)for(var a=0;n>a;a++)e=[e],o.unshift(1);for(e=s(e,t,0);o.length<t;)o.push(1);return e},r.flatten=function(e){for(var r=e,t=Array.isArray;t(r[0]);){for(var n=[],i=0,o=r.length;o>i;i++)n=n.concat.apply(n,r[i]);r=n}return r},r.argsToArray=function(e){for(var r=[],t=0,n=e.length;n>t;t++)r[t]=e[t];return r},r.isArray=m},function(e,r,t){e.exports="1.6.0"},function(e,r,t){"use strict";function n(e,r,t,i){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.count=r,this.min=t,this.max=i,this.message="Wrong number of arguments in function "+e+" ("+r+" provided, "+t+(void 0!=i?"-"+i:"")+" expected)",this.stack=(new Error).stack}n.prototype=new Error,n.prototype.constructor=Error,n.prototype.name="ArgumentsError",e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=r,this.relation=t,this.message="Dimension mismatch ("+(Array.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(Array.isArray(r)?"["+r.join(", ")+"]":r)+")",this.stack=(new Error).stack}n.prototype=new RangeError,n.prototype.constructor=RangeError,n.prototype.name="DimensionError",e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=r):(this.min=r,this.max=t),void 0!==this.min&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":void 0!==this.max&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=(new Error).stack}n.prototype=new RangeError,n.prototype.constructor=RangeError,n.prototype.name="IndexError",e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.types=Array.prototype.splice.call(arguments,1),e?0==this.types.length?this.message="Unsupported type of argument in function "+e:this.message="Function "+e+"("+this.types.join(", ")+") not supported":this.message="Unsupported type of argument",this.stack=(new Error).stack}n.prototype=new TypeError,n.prototype.constructor=TypeError,n.prototype.name="UnsupportedTypeError",e.exports=n},function(e,r,t){"use strict";r.array=t(169),r["boolean"]=t(209),r.number=t(3),r.bignumber=t(168),r.object=t(2),r.string=t(176),r.types=t(338)},function(e,r,t){"use strict";function n(e,t){if(Array.isArray(e)){for(var i="[",o=e.length,a=0;o>a;a++)0!=a&&(i+=", "),i+=n(e[a],t);return i+="]"}return r.format(e,t)}var i=t(3),o=t(168),a=t(5);r.isString=function(e){return e instanceof String||"string"==typeof e},r.endsWith=function(e,r){var t=e.length-r.length,n=e.length;return e.substring(t,n)===r},r.format=function(e,t){return i.isNumber(e)?i.format(e,t):e instanceof a?o.format(e,t):Array.isArray(e)?n(e,t):r.isString(e)?'"'+e+'"':"function"==typeof e?e.syntax?e.syntax+"":"function":e instanceof Object?"function"==typeof e.format?e.format(t):e.toString():String(e)}},function(e,r,t){"use strict";function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(this.nodes=e||[],!a(this.nodes)||!this.nodes.every(s))throw new TypeError("Array containing Nodes expected")}var i=t(189),o=t(176),a=Array.isArray,s=i.isNode;n.prototype=new i,n.prototype.type="ArrayNode",n.prototype._compile=function(e){var r="array"!==e.math.config().matrix,t=this.nodes.map(function(r){return r._compile(e)});return(r?"math.matrix([":"[")+t.join(",")+(r?"])":"]")},n.prototype.forEach=function(e){for(var r=0;r<this.nodes.length;r++){var t=this.nodes[r];e(t,"nodes["+r+"]",this)}},n.prototype.map=function(e){for(var r=[],t=0;t<this.nodes.length;t++)r[t]=this._ifNode(e(this.nodes[t],"nodes["+t+"]",this));return new n(r)},n.prototype.clone=function(){return new n(this.nodes.slice(0))},n.prototype.toString=function(){return o.format(this.nodes)},n.prototype._toTex=function(e){this.latexType=this.latexType||"bmatrix";var r="\\begin{"+this.latexType+"}";return this.nodes.forEach(function(t){r+=t.nodes?t.nodes.map(function(r){return r.toTex(e)}).join("&"):t.toTex(e),r+="\\\\"}),r+="\\end{"+this.latexType+"}"},e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!u(e))throw new TypeError('String expected for parameter "name"');if(!(r instanceof i))throw new TypeError('Node expected for parameter "expr"');if(e in o)throw new Error('Illegal symbol name, "'+e+'" is a reserved keyword');this.name=e,this.expr=r}var i=t(189),o=(t(177),t(341)),a=t(342),s=t(343),u=t(176).isString;n.prototype=new i,n.prototype.type="AssignmentNode",n.prototype._compile=function(e){return'scope["'+this.name+'"] = '+this.expr._compile(e)},n.prototype.forEach=function(e){e(this.expr,"expr",this)},n.prototype.map=function(e){return new n(this.name,this._ifNode(e(this.expr,"expr",this)))},n.prototype.clone=function(){return new n(this.name,this.expr)},n.prototype.toString=function(){var e=a.getPrecedence(this),r=a.getPrecedence(this.expr),t=this.expr.toString();return null!==r&&e>=r&&(t="("+t+")"),this.name+" = "+t},n.prototype._toTex=function(e){var r=a.getPrecedence(this),t=a.getPrecedence(this.expr),n=this.expr.toTex(e);return null!==t&&r>=t&&(n="\\left("+n+"\\right)"),s.toSymbol(this.name)+":="+n},e.exports=n},function(e,r,t){"use strict";function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!Array.isArray(e))throw new Error("Array expected");this.blocks=e.map(function(e){var r=e&&e.node,t=e&&void 0!==e.visible?e.visible:!0;if(!(r instanceof i))throw new TypeError('Property "node" must be a Node');if(!a(t))throw new TypeError('Property "visible" must be a boolean');return{node:r,visible:t}})}var i=t(189),o=t(13),a=t(209).isBoolean;n.prototype=new i,n.prototype.type="BlockNode",n.prototype._compile=function(e){e.ResultSet=o;var r=this.blocks.map(function(r){var t=r.node._compile(e);return r.visible?"results.push("+t+");":t+";"});return"(function () {var results = [];"+r.join("")+"return new ResultSet(results);})()"},n.prototype.forEach=function(e){for(var r=0;r<this.blocks.length;r++)e(this.blocks[r].node,"blocks["+r+"].node",this)},n.prototype.map=function(e){for(var r=[],t=0;t<this.blocks.length;t++){var i=this.blocks[t],o=this._ifNode(e(i.node,"blocks["+t+"].node",this));r[t]={node:o,visible:i.visible}}return new n(r)},n.prototype.clone=function(){var e=this.blocks.map(function(e){return{node:e.node,visible:e.visible}});return new n(e)},n.prototype.toString=function(){return this.blocks.map(function(e){return e.node.toString()+(e.visible?"":";")}).join("\n")},n.prototype._toTex=function(e){return this.blocks.map(function(r){return r.node.toTex(e)+(r.visible?"":";")}).join("\n")},e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof i))throw new TypeError("Parameter condition must be a Node");if(!(r instanceof i))throw new TypeError("Parameter trueExpr must be a Node");if(!(t instanceof i))throw new TypeError("Parameter falseExpr must be a Node");this.condition=e,this.trueExpr=r,this.falseExpr=t}var i=t(189),o=(t(343),t(5)),a=t(7),s=t(11),u=t(175),c=t(342),f=u.string.isString,l=u.number.isNumber,p=u["boolean"].isBoolean;n.prototype=new i,n.prototype.type="ConditionalNode",n.prototype._compile=function(e){return e.testCondition=function(r){if(l(r)||p(r)||f(r))return r?!0:!1;if(r instanceof o)return r.isZero()?!1:!0;if(r instanceof a)return r.re||r.im?!0:!1;if(r instanceof s)return r.value?!0:!1;if(null===r||void 0===r)return!1;throw new TypeError('Unsupported type of condition "'+e.math["typeof"](r)+'"')},"testCondition("+this.condition._compile(e)+") ? ( "+this.trueExpr._compile(e)+") : ( "+this.falseExpr._compile(e)+")"},n.prototype.forEach=function(e){e(this.condition,"condition",this),e(this.trueExpr,"trueExpr",this),e(this.falseExpr,"falseExpr",this)},n.prototype.map=function(e){return new n(this._ifNode(e(this.condition,"condition",this)),this._ifNode(e(this.trueExpr,"trueExpr",this)),this._ifNode(e(this.falseExpr,"falseExpr",this)))},n.prototype.clone=function(){return new n(this.condition,this.trueExpr,this.falseExpr)},n.prototype.toString=function(){var e=c.getPrecedence(this),r=this.condition.toString(),t=c.getPrecedence(this.condition);("OperatorNode"===this.condition.type||null!==t&&e>=t)&&(r="("+r+")");var n=this.trueExpr.toString(),i=c.getPrecedence(this.trueExpr);("OperatorNode"===this.trueExpr.type||null!==i&&e>=i)&&(n="("+n+")");var o=this.falseExpr.toString(),a=c.getPrecedence(this.falseExpr);return("OperatorNode"===this.falseExpr.type||null!==a&&e>=a)&&(o="("+o+")"),r+" ? "+n+" : "+o},n.prototype._toTex=function(e){return"\\left\\{\\begin{array}{l l}{"+this.trueExpr.toTex(e)+"}, &\\quad{\\text{if}\\;"+this.condition.toTex(e)+"}\\\\{"+this.falseExpr.toTex(e)+"}, &\\quad{\\text{otherwise}}\\end{array}\\right."},e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(r){if(!a(r))throw new TypeError('String expected for parameter "valueType"');if(!a(e))throw new TypeError('String expected for parameter "value"');this.value=e,this.valueType=r}else this.value=e+"",this.valueType=o(e);if(!s[this.valueType])throw new TypeError('Unsupported type of value "'+this.valueType+'"')}var i=t(189),o=(t(5),t(338).type),a=t(176).isString,s={number:!0,string:!0,"boolean":!0,undefined:!0,"null":!0};n.prototype=new i,n.prototype.type="ConstantNode",n.prototype._compile=function(e){switch(this.valueType){case"number":return"bignumber"===e.math.config().number?'math.bignumber("'+this.value+'")':this.value.replace(/^(0*)[0-9]/,function(e,r){return e.substring(r.length)});case"string":return'"'+this.value+'"';case"boolean":return this.value;case"undefined":return this.value;case"null":return this.value;default:throw new TypeError('Unsupported type of constant "'+this.valueType+'"')}},n.prototype.forEach=function(e){},n.prototype.map=function(e){return this.clone()},n.prototype.clone=function(){return new n(this.value,this.valueType)},n.prototype.toString=function(){switch(this.valueType){case"string":return'"'+this.value+'"';default:return this.value}},n.prototype._toTex=function(e){var r,t=this.value;switch(this.valueType){case"string":return"\\text{"+t+"}";case"number":return r=t.toLowerCase().indexOf("e"),-1!==r?t.substring(0,r)+"\\cdot10^{"+t.substring(r+1)+"}":t;default:return t}},e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!u(e))throw new TypeError('String expected for parameter "name"');if(!c(r)||!r.every(u))throw new TypeError('Array containing strings expected for parameter "params"');if(!(t instanceof i))throw new TypeError('Node expected for parameter "expr"');if(e in o)throw new Error('Illegal function name, "'+e+'" is a reserved keyword');this.name=e,this.params=r,this.expr=t}var i=t(189),o=t(341),a=t(343),s=t(342),u=t(176).isString,c=Array.isArray;n.prototype=new i,n.prototype.type="FunctionAssignmentNode",n.prototype._compile=function(e){return this.params.forEach(function(r){e.args[r]=!0}),'scope["'+this.name+'"] =   (function () {    var fn = function '+this.name+"("+this.params.join(",")+") {      if (arguments.length != "+this.params.length+') {        throw new SyntaxError("Wrong number of arguments in function '+this.name+' (" + arguments.length + " provided, '+this.params.length+' expected)");      }      return '+this.expr._compile(e)+'    };    fn.syntax = "'+this.name+"("+this.params.join(", ")+')";    return fn;  })();'},n.prototype.forEach=function(e){e(this.expr,"expr",this)},n.prototype.map=function(e){var r=this._ifNode(e(this.expr,"expr",this));return new n(this.name,this.params.slice(0),r)},n.prototype.clone=function(){return new n(this.name,this.params.slice(0),this.expr)},n.prototype.toString=function(){var e=s.getPrecedence(this),r=s.getPrecedence(this.expr),t=this.expr.toString();return null!==r&&e>=r&&(t="("+t+")"),"function "+this.name+"("+this.params.join(", ")+") = "+t},n.prototype._toTex=function(e){var r=s.getPrecedence(this),t=s.getPrecedence(this.expr),n=this.expr.toTex(e);return null!==t&&r>=t&&(n="\\left("+n+"\\right)"),a.toSymbol(this.name)+"\\left("+this.params.map(a.toSymbol).join(",")+"\\right):="+n},e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof i))throw new TypeError('Node expected for parameter "object"');if(!f(r)||!r.every(c))throw new TypeError('Array containing Nodes expected for parameter "ranges"');this.object=e,this.ranges=r}var i=t(189),o=t(186),a=t(187),s=t(5),u=t(8),c=i.isNode,f=Array.isArray;n.prototype=new i,n.prototype.type="IndexNode",n.prototype._compile=function(e){return this.compileSubset(e)},n.prototype.compileSubset=function(e,r){function t(e){return e instanceof a&&"end"==e.name}var n=!1,i=this.ranges.map(function(e){var r=e.filter(t).length>0;return n=r?r:n,r});e.range=function(e,r,t){return new u(e instanceof s?e.toNumber():e,r instanceof s?r.toNumber():r,t instanceof s?t.toNumber():t)};var c=this.ranges.map(function(r,t){var n=i[t];return r instanceof o?n?(e.args.end=!0,"(function () {  var end = size["+t+"];  return range(    "+r.start._compile(e)+",     "+r.end._compile(e)+",     "+(r.step?r.step._compile(e):"1")+"  );})()"):"range("+r.start._compile(e)+", "+r.end._compile(e)+", "+(r.step?r.step._compile(e):"1")+")":n?(e.args.end=!0,"(function () {  var end = size["+t+"];  return "+r._compile(e)+";})()"):r._compile(e)});return n?"(function () {  var obj = "+this.object._compile(e)+";  var size = math.size(obj).valueOf();  return math.subset(    obj,     math.index("+c.join(", ")+")    "+(r?", "+r:"")+"  );})()":"math.subset("+this.object._compile(e)+",math.index("+c.join(", ")+")"+(r?", "+r:"")+")"},n.prototype.forEach=function(e){e(this.object,"object",this);for(var r=0;r<this.ranges.length;r++)e(this.ranges[r],"ranges["+r+"]",this)},n.prototype.map=function(e){for(var r=this._ifNode(e(this.object,"object",this)),t=[],i=0;i<this.ranges.length;i++)t[i]=this._ifNode(e(this.ranges[i],"ranges["+i+"]",this));return new n(r,t)},n.prototype.objectName=function(){return this.object.name},n.prototype.clone=function(){return new n(this.object,this.ranges.slice(0))},n.prototype.toString=function(){return this.object.toString()+"["+this.ranges.join(", ")+"]"},n.prototype._toTex=function(e){var r=this.ranges.map(function(r){return r.toTex(e)});return this.object.toTex(e)+"_{\\left["+r.join(",")+"\\right]}"},e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('string expected for parameter "op"');if("string"!=typeof r)throw new TypeError('string expected for parameter "fn"');if(!u(t)||!t.every(c))throw new TypeError('Array containing Nodes expected for parameter "args"');this.op=e,this.fn=r,this.args=t||[]}function i(e,r,t){var n=s.getPrecedence(e),i=s.getAssociativity(e);switch(r.length){case 1:var o=s.getPrecedence(r[0]);if(t&&null!==o){var a=r[0].getIdentifier(),u=e.getIdentifier();if(s.properties[n][u].latexLeftParens===!1)return[!1];if(s.properties[o][a].latexParens===!1)return[!1]}return null===o?[!1]:n>=o?[!0]:[!1];case 2:var c,f=s.getPrecedence(r[0]),l=s.isAssociativeWith(e,r[0]);c=null===f?!1:f!==n||"right"!==i||l?n>f?!0:!1:!0;var p,m=s.getPrecedence(r[1]),h=s.isAssociativeWith(e,r[1]);if(p=null===m?!1:m!==n||"left"!==i||h?n>m?!0:!1:!0,t){var u=e.getIdentifier(),g=e.args[0].getIdentifier(),d=e.args[1].getIdentifier();null!==f&&(s.properties[n][u].latexLeftParens===!1&&(c=!1),s.properties[f][g].latexParens===!1&&(c=!1)),null!==m&&(s.properties[n][u].latexRightParens===!1&&(p=!1),s.properties[m][d].latexParens===!1&&(p=!1))}return[c,p];default:var v=[];return r.forEach(function(){v.push(!0)}),v}}var o=t(189),a=(t(181),t(187),t(185),t(343)),s=t(342),u=Array.isArray,c=o.isNode;n.prototype=new o,n.prototype.type="OperatorNode",n.prototype._compile=function(e){if(!(this.fn in e.math))throw new Error("Function "+this.fn+' missing in provided namespace "math"');var r=this.args.map(function(r){return r._compile(e)});return"math."+this.fn+"("+r.join(", ")+")"},n.prototype.forEach=function(e){for(var r=0;r<this.args.length;r++)e(this.args[r],"args["+r+"]",this)},n.prototype.map=function(e){for(var r=[],t=0;t<this.args.length;t++)r[t]=this._ifNode(e(this.args[t],"args["+t+"]",this));return new n(this.op,this.fn,r)},n.prototype.clone=function(){return new n(this.op,this.fn,this.args.slice(0))},n.prototype.toString=function(){var e=this.args,r=i(this,e,!1);switch(e.length){case 1:var t=s.getAssociativity(this),n=e[0].toString();return r[0]&&(n="("+n+")"),"right"===t?this.op+n:"left"===t?n+this.op:n+this.op;case 2:var o=e[0].toString(),a=e[1].toString();return r[0]&&(o="("+o+")"),r[1]&&(a="("+a+")"),o+" "+this.op+" "+a;default:return this.fn+"("+this.args.join(", ")+")"}},n.prototype._toTex=function(e){var r=this.args,t=i(this,r,!0),n=a.operators[this.fn];switch(n="undefined"==typeof n?this.op:n,r.length){case 1:var o=s.getAssociativity(this),u=r[0].toTex(e);return t[0]&&(u="\\left("+u+"\\right)"),"right"===o?n+u:"left"===o?u+n:u+n;case 2:var c=r[0],f=c.toTex(e);t[0]&&(f="\\left("+f+"\\right)");var l=r[1],p=l.toTex(e);switch(t[1]&&(p="\\left("+p+"\\right)"),this.getIdentifier()){case"OperatorNode:divide":return n+"{"+f+"}{"+p+"}";case"OperatorNode:pow":switch(f="{"+f+"}",p="{"+p+"}",c.getIdentifier()){case"ConditionalNode":case"OperatorNode:divide":f="\\left("+f+"\\right)"}}return f+n+p;default:return"\\mathrm{"+this.fn+"}\\left("+r.map(function(r){return r.toTex(e)}).join(",")+"\\right)"}},n.prototype.getIdentifier=function(){return this.type+":"+this.fn},e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if("string"!=typeof e)throw new TypeError('string expected for parameter "name"');if(!u(r)||!r.every(s))throw new TypeError('Array containing Nodes expected for parameter "args"');this.name=e,this.args=r||[]}var i=t(189),o=t(187),a=t(343),s=i.isNode,u=Array.isArray;n.prototype=new i,n.prototype.type="FunctionNode",n.prototype._compile=function(e){var r=e.math[this.name],t="function"==typeof r&&1==r.rawArgs,n=this.args.map(function(r){return r._compile(e)});if(t){var i;do i="p"+Math.round(1e4*Math.random());while(i in e);return e[i]=this.args,'("'+this.name+'" in scope ? scope["'+this.name+'"]('+n.join(", ")+') : math["'+this.name+'"]('+i+", math, scope))"}var a=new o(this.name);return a._compile(e)+"("+n.join(", ")+")"},n.prototype.forEach=function(e){for(var r=0;r<this.args.length;r++)e(this.args[r],"args["+r+"]",this)},n.prototype.map=function(e){for(var r=[],t=0;t<this.args.length;t++)r[t]=this._ifNode(e(this.args[t],"args["+t+"]",this));return new n(this.name,r)},n.prototype.clone=function(){return new n(this.name,this.args.slice(0))},n.prototype.toString=function(){return this.name+"("+this.args.join(", ")+")"},n.prototype._toTex=function(e){return a.toFunction(this,e,this.name)},n.prototype.getIdentifier=function(){return this.type+":"+this.name},e.exports=n},function(e,r,t){"use strict";function n(e,r,t){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!a(e))throw new TypeError("Node expected");if(!a(r))throw new TypeError("Node expected");if(t&&!a(t))throw new TypeError("Node expected");if(arguments.length>3)throw new Error("Too many arguments");this.start=e,this.end=r,this.step=t||null}var i=t(189),o=t(342),a=i.isNode;n.prototype=new i,n.prototype.type="RangeNode",n.prototype._compile=function(e){return"math.range("+this.start._compile(e)+", "+this.end._compile(e)+(this.step?", "+this.step._compile(e):"")+")"},n.prototype.forEach=function(e){e(this.start,"start",this),e(this.end,"end",this),this.step&&e(this.step,"step",this)},n.prototype.map=function(e){return new n(this._ifNode(e(this.start,"start",this)),this._ifNode(e(this.end,"end",this)),this.step&&this._ifNode(e(this.step,"step",this)))},n.prototype.clone=function(){return new n(this.start,this.end,this.step&&this.step)},n.prototype.toString=function(){var e,r=o.getPrecedence(this),t=this.start.toString(),n=o.getPrecedence(this.start);if(null!==n&&r>=n&&(t="("+t+")"),e=t,this.step){var i=this.step.toString(),a=o.getPrecedence(this.step);null!==a&&r>=a&&(i="("+i+")"),e+=":"+i}var s=this.end.toString(),u=o.getPrecedence(this.end);return null!==u&&r>=u&&(s="("+s+")"),e+=":"+s},n.prototype._toTex=function(e){var r=this.start.toTex(e);return this.step&&(r+=":"+this.step.toTex(e)),r+=":"+this.end.toTex(e)},e.exports=n},function(e,r,t){"use strict";

    function n(e){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!u(e))throw new TypeError('String expected for parameter "name"');this.name=e}function i(e){throw new Error("Undefined symbol "+e)}var o=t(189),a=t(11),s=t(343),u=t(176).isString;n.prototype=new o,n.prototype.type="SymbolNode",n.prototype._compile=function(e){return e.undef=i,e.Unit=a,this.name in e.args?this.name:this.name in e.math?'("'+this.name+'" in scope ? scope["'+this.name+'"] : math["'+this.name+'"])':'("'+this.name+'" in scope ? scope["'+this.name+'"] : '+(a.isValuelessUnit(this.name)?'new Unit(null, "'+this.name+'")':'undef("'+this.name+'")')+")"},n.prototype.forEach=function(e){},n.prototype.map=function(e){return this.clone()},n.prototype.clone=function(){return new n(this.name)},n.prototype.toString=function(){return this.name},n.prototype._toTex=function(e){var r=s.toSymbol(this.name);return"\\"===r[0]?r:" "+r},e.exports=n},function(e,r,t){"use strict";function n(e,r){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof o))throw new TypeError('Expected IndexNode for parameter "index"');if(!(r instanceof i))throw new TypeError('Expected Node for parameter "expr"');this.index=e,this.expr=r}var i=t(189),o=t(183);n.prototype=new i,n.prototype.type="UpdateNode",n.prototype._compile=function(e){var r=this.index.objectName()in e.args?this.name+" = ":'scope["'+this.index.objectName()+'"]',t=this.index.compileSubset(e,this.expr._compile(e));return r+" = "+t},n.prototype.forEach=function(e){e(this.index,"index",this),e(this.expr,"expr",this)},n.prototype.map=function(e){return new n(this._ifNode(e(this.index,"index",this)),this._ifNode(e(this.expr,"expr",this)))},n.prototype.clone=function(){return new n(this.index,this.expr)},n.prototype.toString=function(){return this.index.toString()+" = "+this.expr.toString()},n.prototype._toTex=function(e){return this.index.toTex(e)+":="+this.expr.toTex(e)},e.exports=n},function(e,r,t){"use strict";function n(){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator")}function i(e){for(var r in e)if(e.hasOwnProperty(r)&&r in a)throw new Error('Scope contains an illegal symbol, "'+r+'" is a reserved keyword')}function o(e){var r=Object.create(e);if(e.expression&&e.expression.transform)for(var t in e.expression.transform)e.expression.transform.hasOwnProperty(t)&&(r[t]=e.expression.transform[t]);return r}var a=t(341);n.prototype.eval=function(){throw new Error("Node.eval is deprecated. Use Node.compile(math).eval([scope]) instead.")},n.prototype.type="Node",n.prototype.compile=function(e){if(!(e instanceof Object))throw new TypeError("Object expected for parameter math");var r={math:o(e),args:{},_validateScope:i},t=this._compile(r),n=Object.keys(r).map(function(e){return"    var "+e+' = defs["'+e+'"];'}),a=n.join(" ")+'return {  "eval": function (scope) {    if (scope) _validateScope(scope);    scope = scope || {};    return '+t+";  }};",s=new Function("defs",a);return s(r)},n.prototype._compile=function(e){throw new Error("Cannot compile a Node interface")},n.prototype.forEach=function(e){throw new Error("Cannot run forEach on a Node interface")},n.prototype.map=function(e){throw new Error("Cannot run map on a Node interface")},n.prototype._ifNode=function(e){if(!(e instanceof n))throw new TypeError("Callback function must return a Node");return e},n.prototype.traverse=function(e){function r(e,t){e.forEach(function(e,n,i){t(e,n,i),r(e,t)})}e(this,null,null),r(this,e)},n.prototype.transform=function(e){function r(e,t){return e.map(function(e,n,i){var o=t(e,n,i);return o!==e?o:r(e,t)})}var t=e(this,null,null);return t!==this?t:r(this,e)},n.prototype.filter=function(e){var r=[];return this.traverse(function(t,n,i){e(t,n,i)&&r.push(t)}),r},n.prototype.find=function(){throw new Error("Function Node.find is deprecated. Use Node.filter instead.")},n.prototype.match=function(){throw new Error("Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.")},n.prototype.clone=function(){throw new Error("Cannot clone a Node interface")},n.prototype.toString=function(){return""},n.prototype.toTex=function(e){var r;if("ArrayNode"===this.type&&delete this.latexType,"object"==typeof e)"FunctionNode"===this.type&&e.hasOwnProperty(this.name)&&(r=e[this.name](this,e));else if("function"==typeof e)r=e(this,e);else if("string"==typeof e&&"ArrayNode"===this.type)this.latexType=e;else if("undefined"!=typeof e)throw new TypeError("Object or function expected as callback");return"undefined"!=typeof r?r:this._toTex(e)},n.prototype._toTex=function(){if("Node"===this.type)return"";throw new Error("_toTex not implemented for this Node")},n.prototype.getIdentifier=function(){return this.type},n.isNode=function(e){return e instanceof n},e.exports=n},function(e,r,t){e.exports={name:"e",category:"Constants",syntax:["e"],description:"Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",examples:["e","e ^ 2","exp(2)","log(e)"],seealso:["exp"]}},function(e,r,t){e.exports={name:"false",category:"Constants",syntax:["false"],description:"Boolean value false",examples:["false"],seealso:["true"]}},function(e,r,t){e.exports={name:"i",category:"Constants",syntax:["i"],description:"Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",examples:["i","i * i","sqrt(-1)"],seealso:[]}},function(e,r,t){e.exports={name:"Infinity",category:"Constants",syntax:["Infinity"],description:"Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",examples:["Infinity","1 / 0"],seealso:[]}},function(e,r,t){e.exports={name:"LN2",category:"Constants",syntax:["LN2"],description:"Returns the natural logarithm of 2, approximately equal to 0.693",examples:["LN2","log(2)"],seealso:[]}},function(e,r,t){e.exports={name:"LN10",category:"Constants",syntax:["LN10"],description:"Returns the natural logarithm of 10, approximately equal to 2.302",examples:["LN10","log(10)"],seealso:[]}},function(e,r,t){e.exports={name:"LOG2E",category:"Constants",syntax:["LOG2E"],description:"Returns the base-2 logarithm of E, approximately equal to 1.442",examples:["LOG2E","log(e, 2)"],seealso:[]}},function(e,r,t){e.exports={name:"LOG10E",category:"Constants",syntax:["LOG10E"],description:"Returns the base-10 logarithm of E, approximately equal to 0.434",examples:["LOG10E","log(e, 10)"],seealso:[]}},function(e,r,t){e.exports={name:"NaN",category:"Constants",syntax:["NaN"],description:"Not a number",examples:["NaN","0 / 0"],seealso:[]}},function(e,r,t){e.exports={name:"null",category:"Constants",syntax:["null"],description:"Value null",examples:["null"],seealso:["true","false"]}},function(e,r,t){e.exports={name:"pi",category:"Constants",syntax:["pi"],description:"The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",examples:["pi","sin(pi/2)"],seealso:["tau"]}},function(e,r,t){e.exports={name:"phi",category:"Constants",syntax:["phi"],description:"Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",examples:["tau"],seealso:[]}},function(e,r,t){e.exports={name:"SQRT1_2",category:"Constants",syntax:["SQRT1_2"],description:"Returns the square root of 1/2, approximately equal to 0.707",examples:["SQRT1_2","sqrt(1/2)"],seealso:[]}},function(e,r,t){e.exports={name:"SQRT2",category:"Constants",syntax:["SQRT2"],description:"Returns the square root of 2, approximately equal to 1.414",examples:["SQRT2","sqrt(2)"],seealso:[]}},function(e,r,t){e.exports={name:"tau",category:"Constants",syntax:["tau"],description:"Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",examples:["tau","2 * pi"],seealso:["pi"]}},function(e,r,t){e.exports={name:"true",category:"Constants",syntax:["true"],description:"Boolean value true",examples:["true"],seealso:["false"]}},function(e,r,t){e.exports={name:"version",category:"Constants",syntax:["version"],description:"A string with the version number of math.js",examples:["version"],seealso:[]}},function(e,r,t){function n(e){return t(i(e))}function i(e){return o[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var o={"./clone":158,"./clone.js":158,"./filter":159,"./filter.js":159,"./forEach":166,"./forEach.js":166,"./format":160,"./format.js":160,"./import":161,"./import.js":161,"./map":162,"./map.js":162,"./print":163,"./print.js":163,"./sort":164,"./sort.js":164,"./typeof":165,"./typeof.js":165};n.keys=function(){return Object.keys(o)},n.resolve=i,e.exports=n,n.id=207},function(e,r,t){var n=(t(172),t(173));r.transform=function(e){return e instanceof n?new n(e.index+1,e.min+1,e.max+1):e}},function(e,r,t){"use strict";r.isBoolean=function(e){return e instanceof Boolean||"boolean"==typeof e}},function(e,r,t){e.exports={name:"abs",category:"Arithmetic",syntax:["abs(x)"],description:"Compute the absolute value.",examples:["abs(3.5)","abs(-4.2)"],seealso:["sign"]}},function(e,r,t){e.exports={name:"add",category:"Operators",syntax:["x + y","add(x, y)"],description:"Add two values.",examples:["a = 2.1 + 3.6","a - 3.6","3 + 2i",'"hello" + " world"',"3 cm + 2 inch"],seealso:["subtract"]}},function(e,r,t){e.exports={name:"ceil",category:"Arithmetic",syntax:["ceil(x)"],description:"Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",examples:["ceil(3.2)","ceil(3.8)","ceil(-4.2)"],seealso:["floor","fix","round"]}},function(e,r,t){e.exports={name:"cube",category:"Arithmetic",syntax:["cube(x)"],description:"Compute the cube of a value. The cube of x is x * x * x.",examples:["cube(2)","2^3","2 * 2 * 2"],seealso:["multiply","square","pow"]}},function(e,r,t){e.exports={name:"divide",category:"Operators",syntax:["x / y","divide(x, y)"],description:"Divide two values.",examples:["a = 2 / 3","a * 3","4.5 / 2","3 + 4 / 2","(3 + 4) / 2","18 km / 4.5"],seealso:["multiply"]}},function(e,r,t){e.exports={name:"dotDivide",category:"Operators",syntax:["x ./ y","dotDivide(x, y)"],description:"Divide two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a ./ b"],seealso:["multiply","dotMultiply","divide"]}},function(e,r,t){e.exports={name:"dotMultiply",category:"Operators",syntax:["x .* y","dotMultiply(x, y)"],description:"Multiply two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a .* b"],seealso:["multiply","divide","dotDivide"]}},function(e,r,t){e.exports={name:"dotpow",category:"Operators",syntax:["x .^ y","dotpow(x, y)"],description:"Calculates the power of x to y element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","a .^ 2"],seealso:["pow"]}},function(e,r,t){e.exports={name:"exp",category:"Arithmetic",syntax:["exp(x)"],description:"Calculate the exponent of a value.",examples:["exp(1.3)","e ^ 1.3","log(exp(1.3))","x = 2.4","(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],seealso:["pow","log"]}},function(e,r,t){e.exports={name:"fix",category:"Arithmetic",syntax:["fix(x)"],description:"Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",examples:["fix(3.2)","fix(3.8)","fix(-4.2)","fix(-4.8)"],seealso:["ceil","floor","round"]}},function(e,r,t){e.exports={name:"floor",category:"Arithmetic",syntax:["floor(x)"],description:"Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",examples:["floor(3.2)","floor(3.8)","floor(-4.2)"],seealso:["ceil","fix","round"]}},function(e,r,t){e.exports={name:"gcd",category:"Arithmetic",syntax:["gcd(a, b)","gcd(a, b, c, ...)"],description:"Compute the greatest common divisor.",examples:["gcd(8, 12)","gcd(-4, 6)","gcd(25, 15, -10)"],seealso:["lcm","xgcd"]}},function(e,r,t){e.exports={name:"lcm",category:"Arithmetic",syntax:["lcm(x, y)"],description:"Compute the least common multiple.",examples:["lcm(4, 6)","lcm(6, 21)","lcm(6, 21, 5)"],seealso:["gcd"]}},function(e,r,t){e.exports={name:"log",category:"Arithmetic",syntax:["log(x)","log(x, base)"],description:"Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",examples:["log(3.5)","a = log(2.4)","exp(a)","10 ^ 4","log(10000, 10)","log(10000) / log(10)","b = log(1024, 2)","2 ^ b"],seealso:["exp","log10"]}},function(e,r,t){e.exports={name:"log10",category:"Arithmetic",syntax:["log10(x)"],description:"Compute the 10-base logarithm of a value.",examples:["log10(0.00001)","log10(10000)","10 ^ 4","log(10000) / log(10)","log(10000, 10)"],seealso:["exp","log"]}},function(e,r,t){e.exports={name:"mod",category:"Operators",syntax:["x % y","x mod y","mod(x, y)"],description:"Calculates the modulus, the remainder of an integer division.",examples:["7 % 3","11 % 2","10 mod 4","function isOdd(x) = x % 2","isOdd(2)","isOdd(3)"],seealso:["divide"]}},function(e,r,t){e.exports={name:"multiply",category:"Operators",syntax:["x * y","multiply(x, y)"],description:"multiply two values.",examples:["a = 2.1 * 3.4","a / 3.4","2 * 3 + 4","2 * (3 + 4)","3 * 2.1 km"],seealso:["divide"]}},function(e,r,t){e.exports={name:"norm",category:"Arithmetic",syntax:["norm(x)","norm(x, p)"],description:"Calculate the norm of a number, vector or matrix.",examples:["abs(-3.5)","norm(-3.5)","norm(3 - 4i))","norm([1, 2, -3], Infinity)","norm([1, 2, -3], -Infinity)","norm([3, 4], 2)","norm([[1, 2], [3, 4]], 1)","norm([[1, 2], [3, 4]], 'inf')","norm([[1, 2], [3, 4]], 'fro')"]}},function(e,r,t){e.exports={name:"nthRoot",category:"Arithmetic",syntax:["nthRoot(a)","nthRoot(a, root)"],description:'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',examples:["4 ^ 3","nthRoot(64, 3)","nthRoot(9, 2)","sqrt(9)"],seealso:["sqrt","pow"]}},function(e,r,t){e.exports={name:"pow",category:"Operators",syntax:["x ^ y","pow(x, y)"],description:"Calculates the power of x to y, x^y.",examples:["2^3 = 8","2*2*2","1 + e ^ (pi * i)"],seealso:["multiply"]}},function(e,r,t){e.exports={name:"round",category:"Arithmetic",syntax:["round(x)","round(x, n)"],description:"round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",examples:["round(3.2)","round(3.8)","round(-4.2)","round(-4.8)","round(pi, 3)","round(123.45678, 2)"],seealso:["ceil","floor","fix"]}},function(e,r,t){e.exports={name:"sign",category:"Arithmetic",syntax:["sign(x)"],description:"Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",examples:["sign(3.5)","sign(-4.2)","sign(0)"],seealso:["abs"]}},function(e,r,t){e.exports={name:"sqrt",category:"Arithmetic",syntax:["sqrt(x)"],description:"Compute the square root value. If x = y * y, then y is the square root of x.",examples:["sqrt(25)","5 * 5","sqrt(-1)"],seealso:["square","multiply"]}},function(e,r,t){e.exports={name:"square",category:"Arithmetic",syntax:["square(x)"],description:"Compute the square of a value. The square of x is x * x.",examples:["square(3)","sqrt(9)","3^2","3 * 3"],seealso:["multiply","pow","sqrt","cube"]}},function(e,r,t){e.exports={name:"subtract",category:"Operators",syntax:["x - y","subtract(x, y)"],description:"subtract two values.",examples:["a = 5.3 - 2","a + 2","2/3 - 1/6","2 * 3 - 3","2.1 km - 500m"],seealso:["add"]}},function(e,r,t){e.exports={name:"unaryMinus",category:"Operators",syntax:["-x","unaryMinus(x)"],description:"Inverse the sign of a value. Converts booleans and strings to numbers.",examples:["-4.5","-(-5.6)",'-"22"'],seealso:["add","subtract","unaryPlus"]}},function(e,r,t){e.exports={name:"unaryPlus",category:"Operators",syntax:["+x","unaryPlus(x)"],description:"Converts booleans and strings to numbers.",examples:["+true",'+"2"'],seealso:["add","subtract","unaryMinus"]}},function(e,r,t){e.exports={name:"xgcd",category:"Arithmetic",syntax:["xgcd(a, b)"],description:"Calculate the extended greatest common divisor for two values",examples:["xgcd(8, 12)","gcd(8, 12)","xgcd(36163, 21199)"],seealso:["gcd","lcm"]}},function(e,r,t){e.exports={name:"bitAnd",category:"Bitwise",syntax:["x & y","bitAnd(x, y)"],description:"Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",examples:["5 & 3","bitAnd(53, 131)","[1, 12, 31] & 42"],seealso:["bitNot","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,r,t){e.exports={name:"bitNot",category:"Bitwise",syntax:["~x","bitNot(x)"],description:"Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",examples:["~1","~2","bitNot([2, -3, 4])"],seealso:["bitAnd","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,r,t){e.exports={name:"bitOr",category:"Bitwise",syntax:["x | y","bitOr(x, y)"],description:"Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",examples:["5 | 3","bitOr([1, 2, 3], 4)"],seealso:["bitAnd","bitNot","bitXor","leftShift","rightArithShift","rightLogShift"]}},function(e,r,t){e.exports={name:"bitXor",category:"Bitwise",syntax:["bitXor(x, y)"],description:"Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",examples:["bitOr(1, 2)","bitXor([2, 3, 4], 4)"],seealso:["bitAnd","bitNot","bitOr","leftShift","rightArithShift","rightLogShift"]}},function(e,r,t){e.exports={name:"leftShift",category:"Bitwise",syntax:["x << y","leftShift(x, y)"],description:"Bitwise left logical shift of a value x by y number of bits.",examples:["4 << 1","8 >> 1"],seealso:["bitAnd","bitNot","bitOr","bitXor","rightArithShift","rightLogShift"]}},function(e,r,t){e.exports={name:"rightArithShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right arithmetic shift of a value x by y number of bits.",examples:["8 >> 1","4 << 1","-12 >> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightLogShift"]}},function(e,r,t){e.exports={name:"rightLogShift",category:"Bitwise",syntax:["x >> y","leftShift(x, y)"],description:"Bitwise right logical shift of a value x by y number of bits.",examples:["8 >>> 1","4 << 1","-12 >>> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightArithShift"]}},function(e,r,t){e.exports={name:"arg",category:"Complex",syntax:["arg(x)"],description:"Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",examples:["arg(2 + 2i)","atan2(3, 2)","arg(2 + 3i)"],seealso:["re","im","conj","abs"]}},function(e,r,t){e.exports={name:"conj",category:"Complex",syntax:["conj(x)"],description:"Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",examples:["conj(2 + 3i)","conj(2 - 3i)","conj(-5.2i)"],seealso:["re","im","abs","arg"]}},function(e,r,t){e.exports={name:"re",category:"Complex",syntax:["re(x)"],description:"Get the real part of a complex number.",examples:["re(2 + 3i)","im(2 + 3i)","re(-5.2i)","re(2.4)"],seealso:["im","conj","abs","arg"]}},function(e,r,t){e.exports={name:"im",category:"Complex",syntax:["im(x)"],description:"Get the imaginary part of a complex number.",examples:["im(2 + 3i)","re(2 + 3i)","im(-5.2i)","im(2.4)"],seealso:["re","conj","abs","arg"]}},function(e,r,t){e.exports={name:"bignumber",category:"Type",syntax:["bignumber(x)"],description:"Create a big number from a number or string.",examples:["0.1 + 0.2","bignumber(0.1) + bignumber(0.2)",'bignumber("7.2")','bignumber("7.2e500")',"bignumber([0.1, 0.2, 0.3])"],seealso:["boolean","complex","index","matrix","string","unit"]}},function(e,r,t){e.exports={name:"boolean",category:"Type",syntax:["x","boolean(x)"],description:"Convert a string or number into a boolean.",examples:["boolean(0)","boolean(1)","boolean(3)",'boolean("true")','boolean("false")',"boolean([1, 0, 1, 1])"],seealso:["bignumber","complex","index","matrix","number","string","unit"]}},function(e,r,t){e.exports={name:"complex",category:"Type",syntax:["complex()","complex(re, im)","complex(string)"],description:"Create a complex number.",examples:["complex()","complex(2, 3)",'complex("7 - 2i")'],seealso:["bignumber","boolean","index","matrix","number","string","unit"]}},function(e,r,t){e.exports={name:"index",category:"Type",syntax:["[start]","[start:end]","[start:step:end]","[start1, start 2, ...]","[start1:end1, start2:end2, ...]","[start1:step1:end1, start2:step2:end2, ...]"],description:"Create an index to get or replace a subset of a matrix",examples:["[]","[1, 2, 3]","A = [1, 2, 3; 4, 5, 6]","A[1, :]","A[1, 2] = 50","A[0:2, 0:2] = ones(2, 2)"],seealso:["bignumber","boolean","complex","matrix,","number","range","string","unit"]}},function(e,r,t){e.exports={name:"matrix",category:"Type",syntax:["[]","[a1, b1, ...; a2, b2, ...]","matrix()","matrix([...])"],description:"Create a matrix.",examples:["[]","[1, 2, 3]","[1, 2, 3; 4, 5, 6]","matrix()","matrix([3, 4])"],seealso:["bignumber","boolean","complex","index","number","string","unit"]}},function(e,r,t){e.exports={name:"number",category:"Type",syntax:["x","number(x)"],description:"Create a number or convert a string or boolean into a number.",examples:["2","2e3","4.05","number(2)",'number("7.2")',"number(true)","number([true, false, true, true])",'number("52cm", "m")'],seealso:["bignumber","boolean","complex","index","matrix","string","unit"]}},function(e,r,t){e.exports={name:"string",category:"Type",syntax:['"text"',"string(x)"],description:"Create a string or convert a value to a string",examples:['"Hello World!"',"string(4.2)","string(3 + 2i)"],seealso:["bignumber","boolean","complex","index","matrix","number","unit"]}},function(e,r,t){e.exports={name:"unit",category:"Type",syntax:["value unit","unit(value, unit)","unit(string)"],description:"Create a unit.",examples:["5.5 mm","3 inch",'unit(7.1, "kilogram")','unit("23 deg")'],seealso:["bignumber","boolean","complex","index","matrix","number","string"]}},function(e,r,t){e.exports={name:"eval",category:"Expression",syntax:["eval(expression)","eval([expr1, expr2, expr3, ...])"],description:"Evaluate an expression or an array with expressions.",examples:['eval("2 + 3")','eval("sqrt(" + 4 + ")")'],seealso:[]}},function(e,r,t){e.exports={name:"help",category:"Expression",syntax:["help(object)","help(string)"],description:"Display documentation on a function or data type.",examples:["help(sqrt)",'help("complex")'],seealso:[]}},function(e,r,t){e.exports={name:"and",category:"Logical",syntax:["x and y","and(x, y)"],description:"Logical and. Test whether two values are both defined with a nonzero/nonempty value.",examples:["true and false","true and true","2 and 4"],seealso:["not","or","xor"]}},function(e,r,t){e.exports={name:"not",category:"Logical",syntax:["!x","not x","not(x)"],description:"Logical not. Flips the boolean value of given argument.",examples:["!true","not false","!2","!0"],seealso:["and","or","xor"]}},function(e,r,t){e.exports={name:"or",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical or. Test if at least one value is defined with a nonzero/nonempty value.",examples:["true or false","false or false","0 or 4"],seealso:["not","and","xor"]}},function(e,r,t){e.exports={name:"xor",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",examples:["true xor false","false xor false","true xor true","0 or 4"],seealso:["not","and","or"]}},function(e,r,t){e.exports={name:"concat",category:"Matrix",syntax:["concat(A, B, C, ...)","concat(A, B, C, ..., dim)"],description:"Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",examples:["A = [1, 2; 5, 6]","B = [3, 4; 7, 8]","concat(A, B)","concat(A, B, 1)","concat(A, B, 2)"],seealso:["det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"cross",category:"Matrix",syntax:["cross(A, B)"],description:"Calculate the cross product for two vectors in three dimensional space.",examples:["cross([1, 1, 0],  [0, 1, 1])","cross([3, -3, 1], [4, 9, 2])","cross([2, 3, 4],  [5, 6, 7])"],seealso:["multiply","dot"]}},function(e,r,t){e.exports={name:"det",category:"Matrix",syntax:["det(x)"],description:"Calculate the determinant of a matrix",examples:["det([1, 2; 3, 4])","det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],seealso:["concat","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"diag",category:"Matrix",syntax:["diag(x)","diag(x, k)"],description:"Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",examples:["diag(1:3)","diag(1:3, 1)","a = [1, 2, 3; 4, 5, 6; 7, 8, 9]","diag(a)"],seealso:["concat","det","eye","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"dot",category:"Matrix",syntax:["dot(A, B)"],description:"Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",examples:["dot([2, 4, 1], [2, 2, 3])","[2, 4, 1] * [2, 2, 3]"],seealso:["multiply","cross"]}},function(e,r,t){e.exports={name:"eye",category:"Matrix",syntax:["eye(n)","eye(m, n)","eye([m, n])","eye"],description:"Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",examples:["eye(3)","eye(3, 5)","a = [1, 2, 3; 4, 5, 6]","eye(size(a))"],seealso:["concat","det","diag","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"flatten",category:"Matrix",syntax:["flatten(x)"],description:"Flatten a multi dimensional matrix into a single dimensional matrix.",examples:["a = [1, 2, 3; 4, 5, 6]","size(a)","b = flatten(a)","size(b)"],seealso:["concat","resize","size","squeeze"]}},function(e,r,t){e.exports={name:"inv",category:"Matrix",syntax:["inv(x)"],description:"Calculate the inverse of a matrix",examples:["inv([1, 2; 3, 4])","inv(4)","1 / 4"],seealso:["concat","det","diag","eye","ones","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"ones",category:"Matrix",syntax:["ones(m)","ones(m, n)","ones(m, n, p, ...)","ones([m])","ones([m, n])","ones([m, n, p, ...])","ones"],description:"Create a matrix containing ones.",examples:["ones(3)","ones(3, 5)","ones([2,3]) * 4.5","a = [1, 2, 3; 4, 5, 6]","ones(size(a))"],seealso:["concat","det","diag","eye","inv","range","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"range",category:"Type",syntax:["start:end","start:step:end","range(start, end)","range(start, end, step)","range(string)"],description:"Create a range. Lower bound of the range is included, upper bound is excluded.",examples:["1:5","3:-1:-3","range(3, 7)","range(0, 12, 2)",'range("4:10")',"a = [1, 2, 3, 4; 5, 6, 7, 8]","a[1:2, 1:2]"],seealso:["concat","det","diag","eye","inv","ones","size","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"resize",category:"Matrix",syntax:["resize(x, size)","resize(x, size, defaultValue)"],description:"Resize a matrix.",examples:["resize([1,2,3,4,5], [3])","resize([1,2,3], [5])","resize([1,2,3], [5], -1)","resize(2, [2, 3])",'resize("hello", [8], "!")'],seealso:["size","subset","squeeze"]}},function(e,r,t){e.exports={name:"size",category:"Matrix",syntax:["size(x)"],description:"Calculate the size of a matrix.",examples:["size(2.3)",'size("hello world")',"a = [1, 2; 3, 4; 5, 6]","size(a)","size(1:6)"],seealso:["concat","det","diag","eye","inv","ones","range","squeeze","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"squeeze",category:"Matrix",syntax:["squeeze(x)"],description:"Remove inner and outer singleton dimensions from a matrix.",examples:["a = zeros(3,2,1)","size(squeeze(a))","b = zeros(1,1,3)","size(squeeze(b))"],seealso:["concat","det","diag","eye","inv","ones","range","size","subset","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"subset",category:"Matrix",syntax:["value(index)","value(index) = replacement","subset(value, [index])","subset(value, [index], replacement)"],description:"Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.",examples:["d = [1, 2; 3, 4]","e = []","e[1, 1:2] = [5, 6]","e[2, :] = [7, 8]","f = d * e","f[2, 1]","f[:, 1]"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","trace","transpose","zeros"]}},function(e,r,t){e.exports={name:"trace",category:"Matrix",syntax:["trace(A)"],description:"Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",examples:["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]","trace(A)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e,r,t){e.exports={name:"transpose",category:"Matrix",syntax:["x'","transpose(x)"],description:"Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","transpose(a)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","zeros"]}},function(e,r,t){e.exports={name:"zeros",category:"Matrix",syntax:["zeros(m)","zeros(m, n)","zeros(m, n, p, ...)","zeros([m])","zeros([m, n])","zeros([m, n, p, ...])","zeros"],description:"Create a matrix containing zeros.",examples:["zeros(3)","zeros(3, 5)","a = [1, 2, 3; 4, 5, 6]","zeros(size(a))"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","trace","transpose"]}},function(e,r,t){e.exports={name:"combinations",category:"Probability",syntax:["combinations(n, k)"],description:"Compute the number of combinations of n items taken k at a time",examples:["combinations(7, 5)"],seealso:["permutations","factorial"]}},function(e,r,t){e.exports={name:"factorial",category:"Probability",syntax:["n!","factorial(n)"],description:"Compute the factorial of a value",examples:["5!","5 * 4 * 3 * 2 * 1","3!"],seealso:["combinations","permutations","gamma"]}},function(e,r,t){e.exports={name:"gamma",category:"Probability",syntax:["gamma(n)"],description:"Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",examples:["gamma(4)","3!","gamma(1/2)","sqrt(pi)"],seealso:["factorial"]
}},function(e,r,t){e.exports={name:"permutations",category:"Probability",syntax:["permutations(n)","permutations(n, k)"],description:"Compute the number of permutations of n items taken k at a time",examples:["permutations(5)","permutations(5, 3)"],seealso:["combinations","factorial"]}},function(e,r,t){e.exports={name:"pickRandom",category:"Probability",syntax:["pickRandom(array)"],description:"Pick a random entry from a given array.",examples:["pickRandom(0:10)","pickRandom([1, 3, 1, 6])"],seealso:["random","randomInt"]}},function(e,r,t){e.exports={name:"random",category:"Probability",syntax:["random()","random(max)","random(min, max)","random(size)","random(size, max)","random(size, min, max)"],description:"Return a random number.",examples:["random()","random(10, 20)","random([2, 3])"],seealso:["pickRandom","randomInt"]}},function(e,r,t){e.exports={name:"randInt",category:"Probability",syntax:["randInt()","randInt(max)","randInt(min, max)","randInt(size)","randInt(size, max)","randInt(size, min, max)"],description:"Return a random integer number",examples:["randInt()","randInt(10, 20)","randInt([2, 3], 10)"],seealso:["pickRandom","random"]}},function(e,r,t){e.exports={name:"compare",category:"Relational",syntax:["compare(x, y)"],description:"Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.",examples:["compare(2, 3)","compare(3, 2)","compare(2, 2)","compare(5cm, 40mm)","compare(2, [1, 2, 3])"],seealso:["equal","unequal","smaller","smallerEq","largerEq"]}},function(e,r,t){e.exports={name:"deepEqual",category:"Relational",syntax:["deepEqual(x, y)"],description:"Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",examples:["[1,3,4] == [1,3,4]","[1,3,4] == [1,3]"],seealso:["equal","unequal","smaller","larger","smallerEq","largerEq","compare"]}},function(e,r,t){e.exports={name:"equal",category:"Relational",syntax:["x == y","equal(x, y)"],description:"Check equality of two values. Returns true if the values are equal, and false if not.",examples:["2+2 == 3","2+2 == 4","a = 3.2","b = 6-2.8","a == b","50cm == 0.5m"],seealso:["unequal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,r,t){e.exports={name:"larger",category:"Relational",syntax:["x > y","larger(x, y)"],description:"Check if value x is larger than y. Returns true if x is larger than y, and false if not.",examples:["2 > 3","5 > 2*2","a = 3.3","b = 6-2.8","(a > b)","(b < a)","5 cm > 2 inch"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare"]}},function(e,r,t){e.exports={name:"largerEq",category:"Relational",syntax:["x >= y","largerEq(x, y)"],description:"Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",examples:["2 > 1+1","2 >= 1+1","a = 3.2","b = 6-2.8","(a > b)"],seealso:["equal","unequal","smallerEq","smaller","largerEq","compare"]}},function(e,r,t){e.exports={name:"smaller",category:"Relational",syntax:["x < y","smaller(x, y)"],description:"Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 3","5 < 2*2","a = 3.3","b = 6-2.8","(a < b)","5 cm < 2 inch"],seealso:["equal","unequal","larger","smallerEq","largerEq","compare"]}},function(e,r,t){e.exports={name:"smallerEq",category:"Relational",syntax:["x <= y","smallerEq(x, y)"],description:"Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 1+1","2 <= 1+1","a = 3.2","b = 6-2.8","(a < b)"],seealso:["equal","unequal","larger","smaller","largerEq","compare"]}},function(e,r,t){e.exports={name:"unequal",category:"Relational",syntax:["x != y","unequal(x, y)"],description:"Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",examples:["2+2 != 3","2+2 != 4","a = 3.2","b = 6-2.8","a != b","50cm != 0.5m","5 cm != 2 inch"],seealso:["equal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e,r,t){e.exports={name:"max",category:"Statistics",syntax:["max(a, b, c, ...)","max(A)","max(A, dim)"],description:"Compute the maximum value of a list of values.",examples:["max(2, 3, 4, 1)","max([2, 3, 4, 1])","max([2, 5; 4, 3])","max([2, 5; 4, 3], 1)","max([2, 5; 4, 3], 2)","max(2.7, 7.1, -4.5, 2.0, 4.1)","min(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["mean","median","min","prod","std","sum","var"]}},function(e,r,t){e.exports={name:"mean",category:"Statistics",syntax:["mean(a, b, c, ...)","mean(A)","mean(A, dim)"],description:"Compute the arithmetic mean of a list of values.",examples:["mean(2, 3, 4, 1)","mean([2, 3, 4, 1])","mean([2, 5; 4, 3])","mean([2, 5; 4, 3], 1)","mean([2, 5; 4, 3], 2)","mean([1.0, 2.7, 3.2, 4.0])"],seealso:["max","median","min","prod","std","sum","var"]}},function(e,r,t){e.exports={name:"median",category:"Statistics",syntax:["median(a, b, c, ...)","median(A)"],description:"Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",examples:["median(5, 2, 7)","median([3, -1, 5, 7])"],seealso:["max","mean","min","prod","std","sum","var"]}},function(e,r,t){e.exports={name:"min",category:"Statistics",syntax:["min(a, b, c, ...)","min(A)","min(A, dim)"],description:"Compute the minimum value of a list of values.",examples:["min(2, 3, 4, 1)","min([2, 3, 4, 1])","min([2, 5; 4, 3])","min([2, 5; 4, 3], 1)","min([2, 5; 4, 3], 2)","min(2.7, 7.1, -4.5, 2.0, 4.1)","max(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["max","mean","median","prod","std","sum","var"]}},function(e,r,t){e.exports={name:"prod",category:"Statistics",syntax:["prod(a, b, c, ...)","prod(A)"],description:"Compute the product of all values.",examples:["prod(2, 3, 4)","prod([2, 3, 4])","prod([2, 5; 4, 3])"],seealso:["max","mean","min","median","min","std","sum","var"]}},function(e,r,t){e.exports={name:"std",category:"Statistics",syntax:["std(a, b, c, ...)","std(A)","std(A, normalization)"],description:'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["std(2, 4, 6)","std([2, 4, 6, 8])",'std([2, 4, 6, 8], "uncorrected")','std([2, 4, 6, 8], "biased")',"std([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","sum","var"]}},function(e,r,t){e.exports={name:"sum",category:"Statistics",syntax:["sum(a, b, c, ...)","sum(A)"],description:"Compute the sum of all values.",examples:["sum(2, 3, 4, 1)","sum([2, 3, 4, 1])","sum([2, 5; 4, 3])"],seealso:["max","mean","median","min","prod","std","sum","var"]}},function(e,r,t){e.exports={name:"var",category:"Statistics",syntax:["var(a, b, c, ...)","var(A)","var(A, normalization)"],description:'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["var(2, 4, 6)","var([2, 4, 6, 8])",'var([2, 4, 6, 8], "uncorrected")','var([2, 4, 6, 8], "biased")',"var([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","std","sum"]}},function(e,r,t){e.exports={name:"acos",category:"Trigonometry",syntax:["acos(x)"],description:"Compute the inverse cosine of a value in radians.",examples:["acos(0.5)","acos(cos(2.3))"],seealso:["cos","atan","asin"]}},function(e,r,t){e.exports={name:"acosh",category:"Trigonometry",syntax:["acosh(x)"],description:"Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",examples:["acosh(1.5)"],seealso:["cosh","asinh","atanh"]}},function(e,r,t){e.exports={name:"acot",category:"Trigonometry",syntax:["acot(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acot(0.5)","acot(cot(0.5))","acot(2)"],seealso:["cot","atan"]}},function(e,r,t){e.exports={name:"acoth",category:"Trigonometry",syntax:["acoth(x)"],description:"Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",examples:["acoth(0.5)"],seealso:["acsch","asech"]}},function(e,r,t){e.exports={name:"acsc",category:"Trigonometry",syntax:["acsc(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acsc(0.5)","acsc(csc(0.5))","acsc(2)"],seealso:["csc","asin","asec"]}},function(e,r,t){e.exports={name:"acsch",category:"Trigonometry",syntax:["acsch(x)"],description:"Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",examples:["acsch(0.5)"],seealso:["asech","acoth"]}},function(e,r,t){e.exports={name:"asec",category:"Trigonometry",syntax:["asec(x)"],description:"Calculate the inverse secant of a value.",examples:["asec(0.5)","asec(sec(0.5))","asec(2)"],seealso:["acos","acot","acsc"]}},function(e,r,t){e.exports={name:"asech",category:"Trigonometry",syntax:["asech(x)"],description:"Calculate the inverse secant of a value.",examples:["asech(0.5)"],seealso:["acsch","acoth"]}},function(e,r,t){e.exports={name:"asin",category:"Trigonometry",syntax:["asin(x)"],description:"Compute the inverse sine of a value in radians.",examples:["asin(0.5)","asin(sin(2.3))"],seealso:["sin","acos","atan"]}},function(e,r,t){e.exports={name:"asinh",category:"Trigonometry",syntax:["asinh(x)"],description:"Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",examples:["asinh(0.5)"],seealso:["acosh","atanh"]}},function(e,r,t){e.exports={name:"atan",category:"Trigonometry",syntax:["atan(x)"],description:"Compute the inverse tangent of a value in radians.",examples:["atan(0.5)","atan(tan(2.3))"],seealso:["tan","acos","asin"]}},function(e,r,t){e.exports={name:"atanh",category:"Trigonometry",syntax:["atanh(x)"],description:"Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",examples:["atanh(0.5)"],seealso:["acosh","asinh"]}},function(e,r,t){e.exports={name:"atan2",category:"Trigonometry",syntax:["atan2(y, x)"],description:"Computes the principal value of the arc tangent of y/x in radians.",examples:["atan2(2, 2) / pi","angle = 60 deg in rad","x = cos(angle)","y = sin(angle)","atan2(y, x)"],seealso:["sin","cos","tan"]}},function(e,r,t){e.exports={name:"cos",category:"Trigonometry",syntax:["cos(x)"],description:"Compute the cosine of x in radians.",examples:["cos(2)","cos(pi / 4) ^ 2","cos(180 deg)","cos(60 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["acos","sin","tan"]}},function(e,r,t){e.exports={name:"cosh",category:"Trigonometry",syntax:["cosh(x)"],description:"Compute the hyperbolic cosine of x in radians.",examples:["cosh(0.5)"],seealso:["sinh","tanh","coth"]}},function(e,r,t){e.exports={name:"cot",category:"Trigonometry",syntax:["cot(x)"],description:"Compute the cotangent of x in radians. Defined as 1/tan(x)",examples:["cot(2)","1 / tan(2)"],seealso:["sec","csc","tan"]}},function(e,r,t){e.exports={name:"coth",category:"Trigonometry",syntax:["coth(x)"],description:"Compute the hyperbolic cotangent of x in radians.",examples:["coth(2)","1 / tanh(2)"],seealso:["sech","csch","tanh"]}},function(e,r,t){e.exports={name:"csc",category:"Trigonometry",syntax:["csc(x)"],description:"Compute the cosecant of x in radians. Defined as 1/sin(x)",examples:["csc(2)","1 / sin(2)"],seealso:["sec","cot","sin"]}},function(e,r,t){e.exports={name:"csch",category:"Trigonometry",syntax:["csch(x)"],description:"Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",examples:["csch(2)","1 / sinh(2)"],seealso:["sech","coth","sinh"]}},function(e,r,t){e.exports={name:"sec",category:"Trigonometry",syntax:["sec(x)"],description:"Compute the secant of x in radians. Defined as 1/cos(x)",examples:["sec(2)","1 / cos(2)"],seealso:["cot","csc","cos"]}},function(e,r,t){e.exports={name:"sech",category:"Trigonometry",syntax:["sech(x)"],description:"Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",examples:["sech(2)","1 / cosh(2)"],seealso:["coth","csch","cosh"]}},function(e,r,t){e.exports={name:"sin",category:"Trigonometry",syntax:["sin(x)"],description:"Compute the sine of x in radians.",examples:["sin(2)","sin(pi / 4) ^ 2","sin(90 deg)","sin(30 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["asin","cos","tan"]}},function(e,r,t){e.exports={name:"sinh",category:"Trigonometry",syntax:["sinh(x)"],description:"Compute the hyperbolic sine of x in radians.",examples:["sinh(0.5)"],seealso:["cosh","tanh"]}},function(e,r,t){e.exports={name:"tan",category:"Trigonometry",syntax:["tan(x)"],description:"Compute the tangent of x in radians.",examples:["tan(0.5)","sin(0.5) / cos(0.5)","tan(pi / 4)","tan(45 deg)"],seealso:["atan","sin","cos"]}},function(e,r,t){e.exports={name:"tanh",category:"Trigonometry",syntax:["tanh(x)"],description:"Compute the hyperbolic tangent of x in radians.",examples:["tanh(0.5)","sinh(0.5) / cosh(0.5)"],seealso:["sinh","cosh"]}},function(e,r,t){e.exports={name:"to",category:"Units",syntax:["x to unit","to(x, unit)"],description:"Change the unit of a value.",examples:["5 inch to cm","3.2kg to g","16 bytes in bits"],seealso:[]}},function(e,r,t){e.exports={name:"clone",category:"Utils",syntax:["clone(x)"],description:"Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",examples:["clone(3.5)","clone(2 - 4i)","clone(45 deg)","clone([1, 2; 3, 4])",'clone("hello world")'],seealso:[]}},function(e,r,t){e.exports={name:"map",category:"Utils",syntax:["map(x, callback)"],description:"Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",examples:["map([1, 2, 3], function(val) { return value * value })"],seealso:["filter","forEach"]}},function(e,r,t){e.exports={name:"filter",category:"Utils",syntax:["filter(x, test)"],description:"Filter items in a matrix.",examples:["isPositive(x) = x > 0","filter([6, -2, -1, 4, 3], isPositive)","filter([6, -2, 0, 1, 0], x != 0)"],seealso:["sort","map","forEach"]}},function(e,r,t){e.exports={name:"forEach",category:"Utils",syntax:["forEach(x, callback)"],description:"Iterates over all elements of a matrix/array, and executes the given callback function.",examples:["forEach([1, 2, 3], function(val) { console.log(val) })"],seealso:["map","sort","filter"]}},function(e,r,t){e.exports={name:"format",category:"Utils",syntax:["format(value)","format(value, precision)"],description:"Format a value of any type as string.",examples:["format(2.3)","format(3 - 4i)","format([])","format(pi, 3)"],seealso:["print"]}},function(e,r,t){e.exports={name:"import",category:"Utils",syntax:["import(string)"],description:"Import functions from a file.",examples:['import("numbers")','import("./mylib.js")'],seealso:[]}},function(e,r,t){e.exports={name:"sort",category:"Utils",syntax:["sort(x)","sort(x, compare)"],description:'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.',examples:["sort([5, 10, 1])",'sort(["C", "B", "A", "D"])',"sortByLength(a, b) = size(a)[1] - size(b)[1]",'sort(["Langdon", "Tom", "Sara"], sortByLength)'],seealso:["map","filter","forEach"]}},function(e,r,t){e.exports={name:"typeof",category:"Utils",syntax:["typeof(x)"],description:"Get the type of a variable.",examples:["typeof(3.5)","typeof(2 - 4i)","typeof(45 deg)",'typeof("hello world")'],seealso:[]}},function(e,r,t){"use strict";e.exports=function(e){function r(r){if(!s.hasOwnProperty(r))throw new Error("Unknown distribution "+r);var t=Array.prototype.slice.call(arguments,1),o=s[r].apply(this,t);return function(r){var t={random:function(r,t,i){var s,c,f;if(arguments.length>3)throw new e.error.ArgumentsError("random",arguments.length,0,3);if(1===arguments.length?a(r)?s=r:f=r:2===arguments.length?a(r)?(s=r,f=t):(c=r,f=t):(s=r,c=t,f=i),void 0===f&&(f=1),void 0===c&&(c=0),void 0!==s){var l=u(s.valueOf(),c,f,o);return s instanceof n?e.matrix(l):l}return o(c,f)},randomInt:function(r,t,i){var o,c,f;if(arguments.length>3||arguments.length<1)throw new e.error.ArgumentsError("randomInt",arguments.length,1,3);if(1===arguments.length?a(r)?o=r:f=r:2===arguments.length?a(r)?(o=r,f=t):(c=r,f=t):(o=r,c=t,f=i),void 0===c&&(c=0),void 0!==o){var l=u(o.valueOf(),c,f,s);return o instanceof n?e.matrix(l):l}return s(c,f)},pickRandom:function(r){if(1!==arguments.length)throw new e.error.ArgumentsError("pickRandom",arguments.length,1);if(r instanceof n)r=r.valueOf();else if(!Array.isArray(r))throw new e.error.UnsupportedTypeError("pickRandom",e["typeof"](r));if(i.size(r).length>1)throw new Error("Only one dimensional vectors supported");return r[Math.floor(Math.random()*r.length)]}},o=function(e,t){return e+r()*(t-e)},s=function(e,t){return Math.floor(e+r()*(t-e))},u=function(e,r,t,n){var i,o,a=[];if(e=e.slice(0),e.length>1)for(o=0,i=e.shift();i>o;o++)a.push(u(e,r,t,n));else for(o=0,i=e.shift();i>o;o++)a.push(n(r,t));return a};return t}(o)}var n=e.type.Matrix,i=t(169),o=e.collection,a=o.isCollection,s={uniform:function(){return Math.random},normal:function(){return function(){for(var e,r,t=-1;0>t||t>1;)e=Math.random(),r=Math.random(),t=1/6*Math.pow(-2*Math.log(e),.5)*Math.cos(2*Math.PI*r)+.5;return t}}};return r}},function(e,r,t){"use strict";r.type=function(e){var r=typeof e;if("object"===r){if(null===e)return"null";if(e instanceof Boolean)return"boolean";if(e instanceof Number)return"number";if(e instanceof String)return"string";if(Array.isArray(e))return"array";if(e instanceof Date)return"date";if(e instanceof Function)return"function";if(e instanceof RegExp)return"regexp"}return r}},function(e,r,t){r.memoize=function(e){return function r(){"object"!=typeof r.cache&&(r.cache={});var t=JSON.stringify(arguments);return t in r.cache?r.cache[t]:r.cache[t]=e.apply(e,arguments)}}},function(e,r,t){var n;!function(i){"use strict";function o(e){for(var r,t,n=1,i=e.length,o=e[0]+"";i>n;n++){for(r=e[n]+"",t=A-r.length;t--;)r="0"+r;o+=r}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function a(e,r,t,n){var i,o,a,s,u;for(o=1,a=e[0];a>=10;a/=10,o++);return a=r-o,0>a?(a+=A,i=0):(i=Math.ceil((a+1)/A),a%=A),o=N(10,A-a),u=e[i]%o|0,null==n?3>a?(0==a?u=u/100|0:1==a&&(u=u/10|0),s=4>t&&99999==u||t>3&&49999==u||5e4==u||0==u):s=(4>t&&u+1==o||t>3&&u+1==o/2)&&(e[i+1]/o/100|0)==N(10,a-2)-1||(u==o/2||0==u)&&0==(e[i+1]/o/100|0):4>a?(0==a?u=u/1e3|0:1==a?u=u/100|0:2==a&&(u=u/10|0),s=(n||4>t)&&9999==u||!n&&t>3&&4999==u):s=((n||4>t)&&u+1==o||!n&&t>3&&u+1==o/2)&&(e[i+1]/o/1e3|0)==N(10,a-3)-1,s}function s(e,r,t){var n=e.constructor;return null==r||((y=0>r||r>8)||0!==r&&(n.errors?parseInt:parseFloat)(r)!=r)&&!p(n,"rounding mode",r,t,0)?n.rounding:0|r}function u(e,r,t,n){var i=e.constructor;return!(y=(n||0)>r||r>=z+1)&&(0===r||(i.errors?parseInt:parseFloat)(r)==r)||p(i,"argument",r,t,0)}function c(e,r){var t,n,i,s,u,c,f,l=0,p=0,m=0,h=e.constructor,d=h.ONE,v=h.rounding,y=h.precision;if(!e.c||!e.c[0]||e.e>17)return new h(e.c?e.c[0]?e.s<0?0:1/0:d:e.s?e.s<0?0:e:0/0);for(null==r?(w=!1,u=y):u=r,f=new h(.03125);e.e>-2;)e=e.times(f),m+=5;for(n=Math.log(N(2,m))/Math.LN10*2+5|0,u+=n,t=s=c=new h(d),h.precision=u;;){if(s=g(s.times(e),u,1),t=t.times(++p),f=c.plus(U(s,t,u,1)),o(f.c).slice(0,u)===o(c.c).slice(0,u)){for(i=m;i--;)c=g(c.times(c),u,1);if(null!=r)return h.precision=y,c;if(!(3>l&&a(c.c,u-n,v,l)))return g(c,h.precision=y,v,w=!0);h.precision=u+=10,t=s=f=new h(d),p=0,l++}c=f}}function f(e,r,t,n){var i,a,s=e.constructor,u=(e=new s(e)).e;if(null==r?t=0:(g(e,++r,t),t=n?r:r+e.e-u),u=e.e,i=o(e.c),1==n||2==n&&(u>=r||u<=s.toExpNeg)){for(;i.length<t;i+="0");i.length>1&&(i=i.charAt(0)+"."+i.slice(1)),i+=(0>u?"e":"e+")+u}else{if(n=i.length,0>u){for(a=t-n;++u;i="0"+i);i="0."+i}else if(++u>n){for(a=t-u,u-=n;u--;i+="0");a>0&&(i+=".")}else a=t-n,n>u?i=i.slice(0,u)+"."+i.slice(u):a>0&&(i+=".");if(a>0)for(;a--;i+="0");}return e.s<0&&e.c[0]?"-"+i:i}function l(e){var r=e.length-1,t=r*A+1;if(r=e[r]){for(;r%10==0;r/=10,t--);for(r=e[0];r>=10;r/=10,t++);}return t}function p(e,r,t,n,i){if(e.errors){var o=new Error((n||["new Decimal","cmp","div","eq","gt","gte","lt","lte","minus","mod","plus","times","toFraction","pow","random","log","sqrt","toNearest","divToInt"][b?0>b?-b:b:0>1/b?1:0])+"() "+(["number type has more than 15 significant digits","LN10 out of digits"][r]||r+([y?" out of range":" not an integer"," not a boolean or binary digit"][i]||""))+": "+t);throw o.name="Decimal Error",y=b=0,o}}function m(e,r,t){var n=new e(e.ONE);for(w=!1;1&t&&(n=n.times(r)),t>>=1,t;)r=r.times(r);return w=!0,n}function h(e,r){var t,n,i,s,u,c,f,l,m,d,v,y=1,x=10,b=e,E=b.c,N=b.constructor,M=N.ONE,_=N.rounding,A=N.precision;if(b.s<0||!E||!E[0]||!b.e&&1==E[0]&&1==E.length)return new N(E&&!E[0]?-1/0:1!=b.s?0/0:E?0:b);if(null==r?(w=!1,f=A):f=r,N.precision=f+=x,t=o(E),n=t.charAt(0),!(Math.abs(s=b.e)<15e14))return b=new N(n+"."+t.slice(1)),f+2>q.length&&p(N,1,f+2,"ln"),b=h(b,f-x).plus(new N(q.slice(0,f+2)).times(s+"")),N.precision=A,null==r?g(b,A,_,w=!0):b;for(;7>n&&1!=n||1==n&&t.charAt(1)>3;)b=b.times(e),t=o(b.c),n=t.charAt(0),y++;for(s=b.e,n>1?(b=new N("0."+t),s++):b=new N(n+"."+t.slice(1)),d=b,l=u=b=U(b.minus(M),b.plus(M),f,1),v=g(b.times(b),f,1),i=3;;){if(u=g(u.times(v),f,1),m=l.plus(U(u,new N(i),f,1)),o(m.c).slice(0,f)===o(l.c).slice(0,f)){if(l=l.times(2),0!==s&&(f+2>q.length&&p(N,1,f+2,"ln"),l=l.plus(new N(q.slice(0,f+2)).times(s+""))),l=U(l,new N(y),f,1),null!=r)return N.precision=A,l;if(!a(l.c,f-x,_,c))return g(l,N.precision=A,_,w=!0);N.precision=f+=x,m=u=b=U(d.minus(M),d.plus(M),f,1),v=g(b.times(b),f,1),i=c=1}l=m,i+=2}}function g(e,r,t,n){var i,o,a,s,u,c,f,l,p=e.constructor;e:if(null!=r){if(!(f=e.c))return e;for(i=1,s=f[0];s>=10;s/=10,i++);if(o=r-i,0>o)o+=A,a=r,u=f[l=0],c=u/N(10,i-a-1)%10|0;else if(l=Math.ceil((o+1)/A),l>=f.length){if(!n)break e;for(;f.length<=l;f.push(0));u=c=0,i=1,o%=A,a=o-A+1}else{for(u=s=f[l],i=1;s>=10;s/=10,i++);o%=A,a=o-A+i,c=0>a?0:E(u/N(10,i-a-1)%10)}if(n=n||0>r||null!=f[l+1]||(0>a?u:u%N(10,i-a-1)),n=4>t?(c||n)&&(0==t||t==(e.s<0?3:2)):c>5||5==c&&(4==t||n||6==t&&(o>0?a>0?u/N(10,i-a):0:f[l-1])%10&1||t==(e.s<0?8:7)),1>r||!f[0])return f.length=0,n?(r-=e.e+1,f[0]=N(10,r%A),e.e=-r||0):f[0]=e.e=0,e;if(0==o?(f.length=l,s=1,l--):(f.length=l+1,s=N(10,A-o),f[l]=a>0?(u/N(10,i-a)%N(10,a)|0)*s:0),n)for(;;){if(0==l){for(o=1,a=f[0];a>=10;a/=10,o++);for(a=f[0]+=s,s=1;a>=10;a/=10,s++);o!=s&&(e.e++,f[0]==_&&(f[0]=1));break}if(f[l]+=s,f[l]!=_)break;f[l--]=0,s=1}for(o=f.length;0===f[--o];f.pop());}return w&&(e.e>p.maxE?e.c=e.e=null:e.e<p.minE&&(e.c=[e.e=0])),e}var d,v,y,x=i.crypto,w=!0,b=0,E=Math.floor,N=Math.pow,M=Object.prototype.toString,_=1e7,A=7,T="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",S={},O=9e15,z=1e9,C=3e3,q="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";S.absoluteValue=S.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),g(e)},S.ceil=function(){return g(new this.constructor(this),this.e+1,2)},S.comparedTo=S.cmp=function(e,r){var t,n=this,i=n.c,o=(b=-b,e=new n.constructor(e,r),e.c),a=n.s,s=e.s,u=n.e,c=e.e;if(!a||!s)return null;if(t=i&&!i[0],r=o&&!o[0],t||r)return t?r?0:-s:a;if(a!=s)return a;if(t=0>a,!i||!o)return u==c?0:!i^t?1:-1;if(u!=c)return u>c^t?1:-1;for(a=-1,s=(u=i.length)<(c=o.length)?u:c;++a<s;)if(i[a]!=o[a])return i[a]>o[a]^t?1:-1;return u==c?0:u>c^t?1:-1},S.decimalPlaces=S.dp=function(){var e,r,t=null;if(e=this.c){if(t=((r=e.length-1)-E(this.e/A))*A,r=e[r])for(;r%10==0;r/=10,t--);0>t&&(t=0)}return t},S.dividedBy=S.div=function(e,r){return b=2,U(this,new this.constructor(e,r))},S.dividedToIntegerBy=S.divToInt=function(e,r){var t=this,n=t.constructor;return b=18,g(U(t,new n(e,r),0,1,1),n.precision,n.rounding)},S.equals=S.eq=function(e,r){return b=3,0===this.cmp(e,r)},S.exponential=S.exp=function(){return c(this)},S.floor=function(){return g(new this.constructor(this),this.e+1,3)},S.greaterThan=S.gt=function(e,r){return b=4,this.cmp(e,r)>0},S.greaterThanOrEqualTo=S.gte=function(e,r){return b=5,r=this.cmp(e,r),1==r||0===r},S.isFinite=function(){return!!this.c},S.isInteger=S.isInt=function(){return!!this.c&&E(this.e/A)>this.c.length-2},S.isNaN=function(){return!this.s},S.isNegative=S.isNeg=function(){return this.s<0},S.isZero=function(){return!!this.c&&0==this.c[0]},S.lessThan=S.lt=function(e,r){return b=6,this.cmp(e,r)<0},S.lessThanOrEqualTo=S.lte=function(e,r){return b=7,r=this.cmp(e,r),-1==r||0===r},S.logarithm=S.log=function(e,r){var t,n,i,s,u,c,f,l,m,d=this,v=d.constructor,y=v.precision,x=v.rounding,E=5;if(null==e)e=new v(10),t=!0;else{if(b=15,e=new v(e,r),n=e.c,e.s<0||!n||!n[0]||!e.e&&1==n[0]&&1==n.length)return new v(0/0);t=e.eq(10)}if(n=d.c,d.s<0||!n||!n[0]||!d.e&&1==n[0]&&1==n.length)return new v(n&&!n[0]?-1/0:1!=d.s?0/0:n?0:1/0);if(u=t&&(s=n[0],n.length>1||1!=s&&10!=s&&100!=s&&1e3!=s&&1e4!=s&&1e5!=s&&1e6!=s),w=!1,f=y+E,l=f+10,c=h(d,f),t?(l>q.length&&p(v,1,l,"log"),i=new v(q.slice(0,l))):i=h(e,f),m=U(c,i,f,1),a(m.c,s=y,x))do if(f+=10,c=h(d,f),t?(l=f+10,l>q.length&&p(v,1,l,"log"),i=new v(q.slice(0,l))):i=h(e,f),m=U(c,i,f,1),!u){+o(m.c).slice(s+1,s+15)+1==1e14&&(m=g(m,y+1,0));break}while(a(m.c,s+=10,x));return w=!0,g(m,y,x)},S.minus=function(e,r){var t,n,i,o,a=this,s=a.constructor,u=a.s;if(b=8,e=new s(e,r),r=e.s,!u||!r)return new s(0/0);if(u!=r)return e.s=-r,a.plus(e);var c=a.c,f=e.c,l=E(e.e/A),p=E(a.e/A),m=s.precision,h=s.rounding;if(!p||!l){if(!c||!f)return c?(e.s=-r,e):new s(f?a:0/0);if(!c[0]||!f[0])return a=f[0]?(e.s=-r,e):new s(c[0]?a:3==h?-0:0),w?g(a,m,h):a}if(c=c.slice(),n=c.length,u=p-l){for((o=0>u)?(u=-u,t=c,n=f.length):(l=p,t=f),(p=Math.ceil(m/A))>n&&(n=p),u>(n+=2)&&(u=n,t.length=1),t.reverse(),r=u;r--;t.push(0));t.reverse()}else for((o=n<(i=f.length))&&(i=n),u=r=0;i>r;r++)if(c[r]!=f[r]){o=c[r]<f[r];break}if(o&&(t=c,c=f,f=t,e.s=-e.s),(r=-((i=c.length)-f.length))>0)for(;r--;c[i++]=0);for(p=_-1,r=f.length;r>u;){if(c[--r]<f[r]){for(n=r;n&&!c[--n];c[n]=p);--c[n],c[r]+=_}c[r]-=f[r]}for(;0==c[--i];c.pop());for(;0==c[0];c.shift(),--l);for(c[0]||(c=[l=0],e.s=3==h?-1:1),e.c=c,u=1,r=c[0];r>=10;r/=10,u++);return e.e=u+l*A-1,w?g(e,m,h):e},S.modulo=S.mod=function(e,r){var t,n,i=this,o=i.constructor,a=o.modulo;return b=9,e=new o(e,r),r=e.s,t=!i.c||!r||e.c&&!e.c[0],t||!e.c||i.c&&!i.c[0]?t?new o(0/0):g(new o(i),o.precision,o.rounding):(w=!1,9==a?(e.s=1,n=U(i,e,0,3,1),e.s=r,n.s*=r):n=U(i,e,0,a,1),n=n.times(e),w=!0,i.minus(n))},S.naturalLogarithm=S.ln=function(){return h(this)},S.negated=S.neg=function(){var e=new this.constructor(this);return e.s=-e.s||null,g(e)},S.plus=function(e,r){var t,n=this,i=n.constructor,o=n.s;if(b=10,e=new i(e,r),r=e.s,!o||!r)return new i(0/0);if(o!=r)return e.s=-r,n.minus(e);var a=n.c,s=e.c,u=E(e.e/A),c=E(n.e/A),f=i.precision,l=i.rounding;if(!c||!u){if(!a||!s)return new i(o/0);if(!a[0]||!s[0])return n=s[0]?e:new i(a[0]?n:0*o),w?g(n,f,l):n}if(a=a.slice(),o=c-u){for(0>o?(o=-o,t=a,r=s.length):(u=c,t=s,r=a.length),(c=Math.ceil(f/A))>r&&(r=c),o>++r&&(o=r,t.length=1),t.reverse();o--;t.push(0));t.reverse()}for(a.length-s.length<0&&(t=s,s=a,a=t),o=s.length,r=0,c=_;o;a[o]%=c)r=(a[--o]=a[o]+s[o]+r)/c|0;for(r&&(a.unshift(r),++u),o=a.length;0==a[--o];a.pop());for(e.c=a,o=1,r=a[0];r>=10;r/=10,o++);return e.e=o+u*A-1,w?g(e,f,l):e},S.precision=S.sd=function(e){var r=null,t=this;return e!=r&&e!==!!e&&1!==e&&0!==e&&p(t.constructor,"argument",e,"precision",1),t.c&&(r=l(t.c),e&&t.e+1>r&&(r=t.e+1)),r},S.round=function(){var e=this,r=e.constructor;return g(new r(e),e.e+1,r.rounding)},S.squareRoot=S.sqrt=function(){var e,r,t,n,i,a,s=this,u=s.c,c=s.s,f=s.e,l=s.constructor,p=new l(.5);if(1!==c||!u||!u[0])return new l(!c||0>c&&(!u||u[0])?0/0:u?s:1/0);for(w=!1,c=Math.sqrt(+s),0==c||c==1/0?(r=o(u),(r.length+f)%2==0&&(r+="0"),c=Math.sqrt(r),f=E((f+1)/2)-(0>f||f%2),c==1/0?r="1e"+f:(r=c.toExponential(),r=r.slice(0,r.indexOf("e")+1)+f),n=new l(r)):n=new l(c.toString()),t=(f=l.precision)+3;;)if(a=n,n=p.times(a.plus(U(s,a,t+2,1))),o(a.c).slice(0,t)===(r=o(n.c)).slice(0,t)){if(r=r.slice(t-3,t+1),"9999"!=r&&(i||"4999"!=r)){(!+r||!+r.slice(1)&&"5"==r.charAt(0))&&(g(n,f+1,1),e=!n.times(n).eq(s));break}if(!i&&(g(a,f+1,0),a.times(a).eq(s))){n=a;break}t+=4,i=1}return w=!0,g(n,f,l.rounding,e)},S.times=function(e,r){var t,n,i=this,o=i.constructor,a=i.c,s=(b=11,e=new o(e,r),e.c),u=E(i.e/A),c=E(e.e/A),f=i.s;if(r=e.s,e.s=f==r?1:-1,!((u||a&&a[0])&&(c||s&&s[0])))return new o(!f||!r||a&&!a[0]&&!s||s&&!s[0]&&!a?0/0:a&&s?0*e.s:e.s/0);for(n=u+c,f=a.length,r=s.length,r>f&&(t=a,a=s,s=t,c=f,f=r,r=c),c=f+r,t=[];c--;t.push(0));for(u=r-1;u>-1;u--){for(r=0,c=f+u;c>u;)r=t[c]+s[u]*a[c-u-1]+r,t[c--]=r%_|0,r=r/_|0;t[c]=(t[c]+r)%_|0}for(r?++n:t[0]||t.shift(),c=t.length;!t[--c];t.pop());for(e.c=t,f=1,r=t[0];r>=10;r/=10,f++);return e.e=f+n*A-1,w?g(e,o.precision,o.rounding):e},S.toDecimalPlaces=S.toDP=function(e,r){var t=this;return t=new t.constructor(t),null!=e&&u(t,e,"toDP")?g(t,(0|e)+t.e+1,s(t,r,"toDP")):t},S.toExponential=function(e,r){var t=this;return t.c?f(t,null!=e&&u(t,e,"toExponential")?0|e:null,null!=e&&s(t,r,"toExponential"),1):t.toString()},S.toFixed=function(e,r){var t,n=this,i=n.constructor,o=i.toExpNeg,a=i.toExpPos;return null!=e&&(e=u(n,e,t="toFixed")?n.e+(0|e):null,r=s(n,r,t)),i.toExpNeg=-(i.toExpPos=1/0),null!=e&&n.c?(t=f(n,e,r),n.s<0&&n.c&&(n.c[0]?t.indexOf("-")<0&&(t="-"+t):t=t.replace("-",""))):t=n.toString(),i.toExpNeg=o,i.toExpPos=a,t},S.toFormat=function(e,r){var t=this;if(!t.c)return t.toString();var n,i=t.s<0,o=t.constructor.format,a=o.groupSeparator,s=+o.groupSize,u=+o.secondaryGroupSize,c=t.toFixed(e,r).split("."),f=c[0],l=c[1],p=i?f.slice(1):f,m=p.length;if(u&&(n=s,s=u,m-=u=n),s>0&&m>0){for(n=m%s||s,f=p.substr(0,n);m>n;n+=s)f+=a+p.substr(n,s);u>0&&(f+=a+p.slice(n)),i&&(f="-"+f)}return l?f+o.decimalSeparator+((u=+o.fractionGroupSize)?l.replace(new RegExp("\\d{"+u+"}\\B","g"),"$&"+o.fractionGroupSeparator):l):f},S.toFraction=function(e){var r,t,n,i,a,s,u,c,f=this,m=f.constructor,h=r=new m(m.ONE),g=s=new m(0),d=f.c,v=new m(g);if(!d)return f.toString();for(n=v.e=l(d)-f.e-1,v.c[0]=N(10,(u=n%A)<0?A+u:u),(null==e||(!(b=12,a=new m(e)).s||(y=a.cmp(h)<0||!a.c)||m.errors&&E(a.e/A)<a.c.length-1)&&!p(m,"max denominator",e,"toFraction",0)||(e=a).cmp(v)>0)&&(e=n>0?v:h),w=!1,a=new m(o(d)),u=m.precision,m.precision=n=d.length*A*2;c=U(a,v,0,1,1),t=r.plus(c.times(g)),1!=t.cmp(e);)r=g,g=t,h=s.plus(c.times(t=h)),s=t,v=a.minus(c.times(t=v)),a=t;return t=U(e.minus(r),g,0,1,1),s=s.plus(t.times(h)),r=r.plus(t.times(g)),s.s=h.s=f.s,i=U(h,g,n,1).minus(f).abs().cmp(U(s,r,n,1).minus(f).abs())<1?[h+"",g+""]:[s+"",r+""],w=!0,m.precision=u,i},S.toNearest=function(e,r){var t=this,n=t.constructor;return t=new n(t),null==e?(e=new n(n.ONE),r=n.rounding):(b=17,e=new n(e),r=s(t,r,"toNearest")),e.c?t.c&&(e.c[0]?(w=!1,t=U(t,e,0,4>r?[4,5,7,8][r]:r,1).times(e),w=!0,g(t)):t.c=[t.e=0]):t.s&&(e.s&&(e.s=t.s),t=e),t},S.toNumber=function(){var e=this;return+e||(e.s?0*e.s:0/0)},S.toPower=S.pow=function(e,r){var t,n,i,s,u=this,f=u.constructor,l=u.s,p=(b=13,+(e=new f(e,r))),d=0>p?-p:p,v=f.precision,y=f.rounding;if(!u.c||!e.c||(i=!u.c[0])||!e.c[0])return new f(N(i?0*l:+u,p));if(u=new f(u),t=u.c.length,!u.e&&u.c[0]==u.s&&1==t)return u;

    if(r=e.c.length-1,e.e||e.c[0]!=e.s||r)if(n=E(e.e/A),i=n>=r,!i&&0>l)s=new f(0/0);else{if(i&&C>t*A*d){if(s=m(f,u,d),e.s<0)return f.ONE.div(s)}else{if(l=0>l&&1&e.c[Math.max(n,r)]?-1:1,r=N(+u,p),n=0!=r&&isFinite(r)?new f(r+"").e:E(p*(Math.log("0."+o(u.c))/Math.LN10+u.e+1)),n>f.maxE+1||n<f.minE-1)return new f(n>0?l/0:0);w=!1,f.rounding=u.s=1,d=Math.min(12,(n+"").length),s=c(e.times(h(u,v+d)),v),s=g(s,v+5,1),a(s.c,v,y)&&(n=v+10,s=g(c(e.times(h(u,n+d)),n),n+5,1),+o(s.c).slice(v+1,v+15)+1==1e14&&(s=g(s,v+1,0))),s.s=l,w=!0,f.rounding=y}s=g(s,v,y)}else s=g(u,v,y);return s},S.toPrecision=function(e,r){var t=this;return null!=e&&u(t,e,"toPrecision",1)&&t.c?f(t,0|--e,s(t,r,"toPrecision"),2):t.toString()},S.toSignificantDigits=S.toSD=function(e,r){var t=this,n=t.constructor;return t=new n(t),null!=e&&u(t,e,"toSD",1)?g(t,0|e,s(t,r,"toSD")):g(t,n.precision,n.rounding)},S.toString=function(e){var r,t,n,i=this,a=i.constructor,s=i.e;if(null===s)t=i.s?"Infinity":"NaN";else{if(e===r&&(s<=a.toExpNeg||s>=a.toExpPos))return f(i,null,a.rounding,1);if(t=o(i.c),0>s){for(;++s;t="0"+t);t="0."+t}else if(n=t.length,s>0)if(++s>n)for(s-=n;s--;t+="0");else n>s&&(t=t.slice(0,s)+"."+t.slice(s));else if(r=t.charAt(0),n>1)t=r+"."+t.slice(1);else if("0"==r)return r;if(null!=e)if((y=!(e>=2&&65>e))||e!=(0|e)&&a.errors)p(a,"base",e,"toString",0);else if(t=d(a,t,0|e,10,i.s),"0"==t)return t}return i.s<0?"-"+t:t},S.truncated=S.trunc=function(){return g(new this.constructor(this),this.e+1,1)},S.valueOf=S.toJSON=function(){return this.toString()},d=function(){function e(e,r,t){for(var n,i,o=[0],a=0,s=e.length;s>a;){for(i=o.length;i--;o[i]*=r);for(o[n=0]+=T.indexOf(e.charAt(a++));n<o.length;n++)o[n]>t-1&&(null==o[n+1]&&(o[n+1]=0),o[n+1]+=o[n]/t|0,o[n]%=t)}return o.reverse()}return function(r,t,n,i,o){var a,s,u,c,f,l,p=t.indexOf("."),h=r.precision,g=r.rounding;for(37>i&&(t=t.toLowerCase()),p>=0&&(t=t.replace(".",""),l=new r(i),c=m(r,l,t.length-p),l.c=e(c.toFixed(),10,n),l.e=l.c.length),f=e(t,i,n),a=s=f.length;0==f[--s];f.pop());if(!f[0])return"0";if(0>p?a--:(c.c=f,c.e=a,c.s=o,c=U(c,l,h,g,0,n),f=c.c,u=c.r,a=c.e),p=f[h],s=n/2,u=u||null!=f[h+1],4>g?(null!=p||u)&&(0==g||g==(c.s<0?3:2)):p>s||p==s&&(4==g||u||6==g&&1&f[h-1]||g==(c.s<0?8:7)))for(f.length=h,--n;++f[--h]>n;)f[h]=0,h||(++a,f.unshift(1));else f.length=h;for(s=f.length;!f[--s];);for(p=0,t="";s>=p;t+=T.charAt(f[p++]));if(0>a){for(;++a;t="0"+t);t="0."+t}else if(p=t.length,++a>p)for(a-=p;a--;t+="0");else p>a&&(t=t.slice(0,a)+"."+t.slice(a));return t}}();var U=function(){function e(e,r,t){var n,i=0,o=e.length;for(e=e.slice();o--;)n=e[o]*r+i,e[o]=n%t|0,i=n/t|0;return i&&e.unshift(i),e}function r(e,r,t,n){var i,o;if(t!=n)o=t>n?1:-1;else for(i=o=0;t>i;i++)if(e[i]!=r[i]){o=e[i]>r[i]?1:-1;break}return o}function t(e,r,t,n){for(var i=0;t--;)e[t]-=i,i=e[t]<r[t]?1:0,e[t]=i*n+e[t]-r[t];for(;!e[0]&&e.length>1;e.shift());}return function(n,i,o,a,s,u){var c,f,l,p,m,h,d,v,y,x,w,b,N,M,T,S,O,z,C,q=n.constructor,U=n.s==i.s?1:-1,B=n.c,I=i.c;if(!(B&&B[0]&&I&&I[0]))return new q(n.s&&i.s&&(B?!I||B[0]!=I[0]:I)?B&&0==B[0]||!I?0*U:U/0:0/0);for(u?(p=1,f=n.e-i.e):(u=_,p=A,f=E(n.e/p)-E(i.e/p)),z=I.length,S=B.length,y=new q(U),x=y.c=[],l=0;I[l]==(B[l]||0);l++);if(I[l]>(B[l]||0)&&f--,null==o?(U=o=q.precision,a=q.rounding):U=s?o+(n.e-i.e)+1:o,0>U)x.push(1),m=!0;else{if(U=U/p+2|0,l=0,1==z){for(h=0,I=I[0],U++;(S>l||h)&&U--;l++)M=h*u+(B[l]||0),x[l]=M/I|0,h=M%I|0;m=h||S>l}else{for(h=u/(I[0]+1)|0,h>1&&(I=e(I,h,u),B=e(B,h,u),z=I.length,S=B.length),T=z,w=B.slice(0,z),b=w.length;z>b;w[b++]=0);C=I.slice(),C.unshift(0),O=I[0],I[1]>=u/2&&O++;do h=0,c=r(I,w,z,b),0>c?(N=w[0],z!=b&&(N=N*u+(w[1]||0)),h=N/O|0,h>1?(h>=u&&(h=u-1),d=e(I,h,u),v=d.length,b=w.length,c=r(d,w,v,b),1==c&&(h--,t(d,v>z?C:I,v,u))):(0==h&&(c=h=1),d=I.slice()),v=d.length,b>v&&d.unshift(0),t(w,d,b,u),-1==c&&(b=w.length,c=r(I,w,z,b),1>c&&(h++,t(w,b>z?C:I,b,u))),b=w.length):0===c&&(h++,w=[0]),x[l++]=h,c&&w[0]?w[b++]=B[T]||0:(w=[B[T]],b=1);while((T++<S||null!=w[0])&&U--);m=null!=w[0]}x[0]||x.shift()}if(1==p)y.e=f,y.r=+m;else{for(l=1,U=x[0];U>=10;U/=10,l++);y.e=l+f*p-1,g(y,s?o+y.e+1:o,a,m)}return y}}();v=function(){function e(e){var r,t,n,i=this,o="config",a=i.errors?parseInt:parseFloat;return e==t||"object"!=typeof e&&!p(i,"object expected",e,o)?i:((n=e[r="precision"])!=t&&((y=1>n||n>z)||a(n)!=n?p(i,r,n,o,0):i[r]=0|n),(n=e[r="rounding"])!=t&&((y=0>n||n>8)||a(n)!=n?p(i,r,n,o,0):i[r]=0|n),(n=e[r="toExpNeg"])!=t&&((y=-O>n||n>0)||a(n)!=n?p(i,r,n,o,0):i[r]=E(n)),(n=e[r="toExpPos"])!=t&&((y=0>n||n>O)||a(n)!=n?p(i,r,n,o,0):i[r]=E(n)),(n=e[r="minE"])!=t&&((y=-O>n||n>0)||a(n)!=n?p(i,r,n,o,0):i[r]=E(n)),(n=e[r="maxE"])!=t&&((y=0>n||n>O)||a(n)!=n?p(i,r,n,o,0):i[r]=E(n)),(n=e[r="errors"])!=t&&(n===!!n||1===n||0===n?(y=b=0,i[r]=!!n):p(i,r,n,o,1)),(n=e[r="crypto"])!=t&&(n===!!n||1===n||0===n?i[r]=!(!n||!x||"object"!=typeof x):p(i,r,n,o,1)),(n=e[r="modulo"])!=t&&((y=0>n||n>9)||a(n)!=n?p(i,r,n,o,0):i[r]=0|n),(e=e[r="format"])!=t&&("object"==typeof e?i[r]=e:p(i,"format object expected",e,o)),i)}function r(e){return new this(e).exp()}function t(e){return new this(e).ln()}function n(e,r){return new this(e).log(r)}function i(e,r,t){var n,i,o=0;for("[object Array]"==M.call(r[0])&&(r=r[0]),n=new e(r[0]);++o<r.length;){if(i=new e(r[o]),!i.s){n=i;break}n[t](i)&&(n=i)}return n}function o(){return i(this,arguments,"lt")}function a(){return i(this,arguments,"gt")}function s(e,r){return new this(e).pow(r)}function c(e){var r,t,n,i=0,o=[],a=this,s=new a(a.ONE);if(null!=e&&u(s,e,"random")?e|=0:e=a.precision,t=Math.ceil(e/A),a.crypto)if(x&&x.getRandomValues)for(r=x.getRandomValues(new Uint32Array(t));t>i;)n=r[i],n>=429e7?r[i]=x.getRandomValues(new Uint32Array(1))[0]:o[i++]=n%1e7;else if(x&&x.randomBytes){for(r=x.randomBytes(t*=4);t>i;)n=r[i]+(r[i+1]<<8)+(r[i+2]<<16)+((127&r[i+3])<<24),n>=214e7?x.randomBytes(4).copy(r,i):(o.push(n%1e7),i+=4);i=t/4}else p(a,"crypto unavailable",x,"random");if(!i)for(;t>i;)o[i++]=1e7*Math.random()|0;for(t=o[--i],e%=A,t&&e&&(n=N(10,A-e),o[i]=(t/n|0)*n);0===o[i];i--)o.pop();if(0>i)o=[t=0];else{for(t=-1;0===o[0];)o.shift(),t-=A;for(i=1,n=o[0];n>=10;)n/=10,i++;A>i&&(t-=A-i)}return s.e=t,s.c=o,s}function f(e){return new this(e).sqrt()}function l(i){function u(e,r){var t=this;if(!(t instanceof u))return p(u,"Decimal called without new",e),new u(e,r);if(t.constructor=u,e instanceof u){if(null==r)return b=0,t.s=e.s,t.e=e.e,t.c=(e=e.c)?e.slice():e,t;if(10==r)return g(new u(e),u.precision,u.rounding);e+=""}return m(u,t,e,r)}return u.precision=20,u.rounding=4,u.modulo=1,u.toExpNeg=-7,u.toExpPos=21,u.minE=-O,u.maxE=O,u.errors=!0,u.crypto=!1,u.format={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0},u.prototype=S,u.ONE=new u(1),u.ROUND_UP=0,u.ROUND_DOWN=1,u.ROUND_CEIL=2,u.ROUND_FLOOR=3,u.ROUND_HALF_UP=4,u.ROUND_HALF_DOWN=5,u.ROUND_HALF_EVEN=6,u.ROUND_HALF_CEIL=7,u.ROUND_HALF_FLOOR=8,u.EUCLID=9,u.config=e,u.constructor=l,u.exp=r,u.ln=t,u.log=n,u.max=o,u.min=a,u.pow=s,u.sqrt=f,u.random=c,null!=i&&u.config(i),u}var m=function(){var e=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,r=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")};return function(t,n,i,o){var a,s,u,c,f,l;if("string"!=typeof i&&(i=(c="number"==typeof i||"[object Number]"==M.call(i))&&0===i&&0>1/i?"-0":i+""),f=i,null==o&&e.test(i))n.s=45===i.charCodeAt(0)?(i=i.slice(1),-1):1;else{if(10==o)return g(new t(i),t.precision,t.rounding);if(i=r.call(i).replace(/^\+(?!-)/,""),n.s=45===i.charCodeAt(0)?(i=i.replace(/^-(?!-)/,""),-1):1,null!=o?o!=(0|o)&&t.errors||(y=!(o>=2&&65>o))?(p(t,"base",o,0,0),l=e.test(i)):(a="["+T.slice(0,o=0|o)+"]+",i=i.replace(/\.$/,"").replace(/^\./,"0."),(l=new RegExp("^"+a+"(?:\\."+a+")?$",37>o?"i":"").test(i))?(c&&(i.replace(/^0\.0*|\./,"").length>15&&p(t,0,f),c=!c),i=d(t,i,10,o,n.s)):"Infinity"!=i&&"NaN"!=i&&(p(t,"not a base "+o+" number",f),i="NaN")):l=e.test(i),!l)return n.c=n.e=null,"Infinity"!=i&&("NaN"!=i&&p(t,"not a number",f),n.s=null),b=0,n}for((s=i.indexOf("."))>-1&&(i=i.replace(".","")),(u=i.search(/e/i))>0?(0>s&&(s=u),s+=+i.slice(u+1),i=i.substring(0,u)):0>s&&(s=i.length),u=0;48===i.charCodeAt(u);u++);for(o=i.length;48===i.charCodeAt(--o););if(i=i.slice(u,o+1)){if(o=i.length,c&&o>15&&p(t,0,f),n.e=s=s-u-1,n.c=[],u=(s+1)%A,0>s&&(u+=A),o>u){for(u&&n.c.push(+i.slice(0,u)),o-=A;o>u;)n.c.push(+i.slice(u,u+=A));i=i.slice(u),u=A-i.length}else u-=o;for(;u--;i+="0");n.c.push(+i),w&&(n.e>t.maxE?n.c=n.e=null:n.e<t.minE&&(n.c=[n.e=0]))}else n.c=[n.e=0];return b=0,n}}();return l()}(),n=function(){return v}.call(r,t,r,e),!(void 0!==n&&(e.exports=n))}(this)},function(e,r,t){"use strict";e.exports={end:!0}},function(e,r,t){"use strict";function n(e){for(var r=e.getIdentifier(),t=0;t<a.length;t++)if(r in a[t])return t;return null}function i(e){var r=e.getIdentifier(),t=n(e);if(null===t)return null;var i=a[t][r];if(i.hasOwnProperty("associativity")){if("left"===i.associativity)return"left";if("right"===i.associativity)return"right";throw Error("'"+r+"' has the invalid associativity '"+i.associativity+"'.")}return null}function o(e,r){var t=e.getIdentifier(),i=r.getIdentifier(),o=n(e);if(null===o)return null;var s=a[o][t];if(s.hasOwnProperty("associativeWith")&&s.associativeWith instanceof Array){for(var u=0;u<s.associativeWith.length;u++)if(s.associativeWith[u]===i)return!0;return!1}return null}var a=[{AssignmentNode:{},FunctionAssignmentNode:{}},{ConditionalNode:{latexLeftParens:!1,latexRightParens:!1,latexParens:!1}},{"OperatorNode:or":{associativity:"left",associativeWith:[]}},{"OperatorNode:xor":{associativity:"left",associativeWith:[]}},{"OperatorNode:and":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitOr":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitXor":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitAnd":{associativity:"left",associativeWith:[]}},{"OperatorNode:equal":{associativity:"left",associativeWith:[]},"OperatorNode:unequal":{associativity:"left",associativeWith:[]},"OperatorNode:smaller":{associativity:"left",associativeWith:[]},"OperatorNode:larger":{associativity:"left",associativeWith:[]},"OperatorNode:smallerEq":{associativity:"left",associativeWith:[]},"OperatorNode:largerEq":{associativity:"left",associativeWith:[]}},{"OperatorNode:leftShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightArithShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightLogShift":{associativity:"left",associativeWith:[]}},{"OperatorNode:to":{associativity:"left",associativeWith:[]}},{RangeNode:{}},{"OperatorNode:add":{associativity:"left",associativeWith:["OperatorNode:add","OperatorNode:subtract"]},"OperatorNode:subtract":{associativity:"left",associativeWith:[]}},{"OperatorNode:multiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","Operator:dotMultiply","Operator:dotDivide"]},"OperatorNode:divide":{associativity:"left",associativeWith:[],latexLeftParens:!1,latexRightParens:!1,latexParens:!1},"OperatorNode:dotMultiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","OperatorNode:dotMultiply","OperatorNode:doDivide"]},"OperatorNode:dotDivide":{associativity:"left",associativeWith:[]},"OperatorNode:mod":{associativity:"left",associativeWith:[]}},{"OperatorNode:unaryPlus":{associativity:"right"},"OperatorNode:unaryMinus":{associativity:"right"},"OperatorNode:bitNot":{associativity:"right"},"OperatorNode:not":{associativity:"right"}},{"OperatorNode:pow":{associativity:"right",associativeWith:[],latexRightParens:!1},"OperatorNode:dotPow":{associativity:"right",associativeWith:[]}},{"OperatorNode:factorial":{associativity:"left"}},{"OperatorNode:transpose":{associativity:"left"}}];e.exports.properties=a,e.exports.getPrecedence=n,e.exports.getAssociativity=i,e.exports.isAssociativeWith=o},function(e,r,t){"use strict";function n(e,r,t){return e=e.replace(/%name%/g,r),t.forEach(function(r,t){e=e.replace(RegExp("%"+t+"%","g"),r)}),e=e.replace("%*%",t.map(function(e){return e}).join(",")),e=e.replace("%%","%")}r.symbols={Alpha:"A",alpha:"\\alpha",Beta:"B",beta:"\\beta",Gamma:"\\Gamma",gamma:"\\gamma",Delta:"\\Delta",delta:"\\delta",Epsilon:"E",epsilon:"\\epsilon",varepsilon:"\\varepsilon",Zeta:"Z",zeta:"\\zeta",Eta:"H",eta:"\\eta",Theta:"\\Theta",theta:"\\theta",vartheta:"\\vartheta",Iota:"I",iota:"\\iota",Kappa:"K",kappa:"\\kappa",varkappa:"\\varkappa",Lambda:"\\Lambda",lambda:"\\lambda",Mu:"M",mu:"\\mu",Nu:"N",nu:"\\nu",Xi:"\\Xi",xi:"\\xi",Omicron:"O",omicron:"o",Pi:"\\Pi",pi:"\\pi",varpi:"\\varpi",Rho:"P",rho:"\\rho",varrho:"\\varrho",Sigma:"\\Sigma",sigma:"\\sigma",varsigma:"\\varsigma",Tau:"T",tau:"\\tau",Upsilon:"\\Upsilon",upsilon:"\\upsilon",Phi:"\\Phi",phi:"\\phi",varphi:"\\varphi",Chi:"X",chi:"\\chi",Psi:"\\Psi",psi:"\\psi",Omega:"\\Omega",omega:"\\omega","true":"\\mathrm{True}","false":"\\mathrm{False}",i:"i",inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:"\\lim",undefined:"\\mathbf{?}"},r.operators={transpose:"^\\top",factorial:"!",pow:"^",dotPow:".^\\wedge",unaryPlus:"+",unaryMinus:"-",bitNot:"~",not:"\\neg",multiply:"\\cdot",divide:"\\frac",dotMultiply:".\\cdot",dotDivide:".:",mod:"\\mod",add:"+",subtract:"-",to:"\\rightarrow",leftShift:"<<",rightArithShift:">>",rightLogShift:">>>",equal:"=",unequal:"\\neq",smaller:"<",larger:">",smallerEq:"\\leq",largerEq:"\\geq",bitAnd:"\\&",bitXor:"\\underline{|}",bitOr:"|",and:"\\wedge",xor:"\\veebar",or:"\\vee"};var i="\\mathrm{%name%}\\left(%*%\\right)",o={abs:"\\left|%0%\\right|",add:"\\left(%0%+%1%\\right)",ceil:"\\left\\lceil%0%\\right\\rceil",cube:"\\left(%0%\\right)^3",divide:"\\frac{%0%}{%1%}",dotDivide:"\\left(%0%"+r.operators.dotDivide+"%1%\\right)",dotMultiply:"\\left(%0%"+r.operators.dotMultiply+"%1%\\right)",dotPow:"\\left(%0%"+r.operators.dotPow+"%1%\\right)",exp:"\\exp\\left(%0%\\right)",fix:i,floor:"\\left\\lfloor%0%\\right\\rfloor",gcd:"\\gcd\\left(%*%\\right)",lcm:i,log10:"\\log_{10}\\left(%0%\\right)",log:{1:"\\ln\\left(%0%\\right)",2:"\\log_{%1%}\\left(%0%\\right)"},mod:"\\left(%0%"+r.operators.mod+"%1%\\right)",multiply:"\\left(%0%"+r.operators.multiply+"%1%\\right)",norm:{1:"\\left\\|%0%\\right\\|",2:i},nthRoot:"\\sqrt[%1%]{%0%}",pow:"\\left(%0%\\right)"+r.operators.pow+"{%1%}",round:{1:"\\left\\lfloor%0%\\right\\rceil",2:i},sign:i,sqrt:"\\sqrt{%0%}",square:"\\left(%0%\\right)^2",subtract:"\\left(%0%"+r.operators.subtract+"%1%\\right)",unaryMinus:r.operators.unaryMinus+"\\left(%0%\\right)",unaryPlus:r.operators.unaryPlus+"\\left(%0%\\right)",xgcd:i,bitAnd:"\\left(%0%"+r.operators.bitAnd+"%1%\\right)",bitOr:"\\left(%0%"+r.operators.bitOr+"%1%\\right)",bitXor:"\\left(%0%"+r.operators.bitXor+"%1%\\right)",bitNot:r.operators.bitNot+"\\left(%0%\\right)",leftShift:"\\left(%0%"+r.operators.leftShift+"%1%\\right)",rightArithShift:"\\left(%0%"+r.operators.rightArithShift+"%1%\\right)",rightLogShift:"\\left(%0%"+r.operators.rightLogShift+"%1%\\right)",arg:"\\arg\\left(%0%\\right)",conj:"\\left(%0%\\right)^*",im:"\\Im\\left\\lbrace%0%\\right\\rbrace",re:"\\Re\\left\\lbrace%0%\\right\\rbrace",bignumber:{0:"0",1:"\\left(%0%\\right)"},"boolean":i,chain:i,complex:{0:"0",1:"\\left(%0%\\right)",2:"\\left(\\left(%0%\\right)+"+r.symbols.i+"\\cdot\\left(%1%\\right)\\right)"},index:i,matrix:{0:"\\begin{bmatrix}\\end{bmatrix}",1:"\\left(%0%\\right)",2:"\\left(%0%\\right)"},number:{0:"0",1:"\\left(%0%\\right)",2:"\\left(\\left(%0%\\right)%1%\\right)"},parser:i,string:{0:'""',1:function(e){return'"'+e.args[0].toString()+'"'}},unit:{1:"\\left(%0%\\right)",2:"\\left(\\left(%0%\\right)%1%\\right)"},compile:i,eval:i,help:i,parse:i,and:"\\left(%0%"+r.operators.and+"%1%\\right)",not:r.operators.not+"\\left(%0%\\right)",or:"\\left(%0%"+r.operators.or+"%1%\\right)",xor:"\\left(%0%"+r.operators.xor+"%1%\\right)",concat:i,cross:"\\left(%0%\\right)\\times\\left(%1%\\right)",det:"\\det\\left(%0%\\right)",diag:i,dot:"\\left(%0%\\cdot%1%\\right)",eye:i,flatten:i,inv:"\\left(%0%\\right)^{-1}",ones:i,range:i,resize:i,size:i,squeeze:i,subset:i,trace:"\\mathrm{tr}\\left(%0%\\right)",transpose:"\\left(%0%\\right)"+r.operators.transpose,zeros:i,combinations:"\\binom{%0%}{%1%}",distribution:i,factorial:"\\left(%0%\\right)"+r.operators.factorial,gamma:"\\Gamma\\left(%0%\\right)",permutations:i,pickRandom:i,randomInt:i,random:i,compare:i,deepEqual:i,equal:"\\left(%0%"+r.operators.equal+"%1%\\right)",largerEq:"\\left(%0%"+r.operators.largerEq+"%1%\\right)",larger:"\\left(%0%"+r.operators.larger+"%1%\\right)",smallerEq:"\\left(%0%"+r.operators.smallerEq+"%1%\\right)",smaller:"\\left(%0%"+r.operators.smaller+"%1%\\right)",unequal:"\\left(%0%"+r.operators.unequal+"%1%\\right)",max:"\\max\\left(%*%\\right)",mean:i,median:i,min:"\\min\\left(%*%\\right)",prod:i,std:i,sum:i,"var":"\\mathrm{Var}\\left(%*%\\right)",acosh:"\\cosh^{-1}\\left(%0%\\right)",acos:"\\cos^{-1}\\left(%0%\\right)",acoth:"\\coth^{-1}\\left(%0%\\right)",acot:"\\cot^{-1}\\left(%0%\\right)",acsch:"\\mathrm{csch}^{-1}\\left(%0%\\right)",acsc:"\\csc^{-1}\\left(%0%\\right)",asech:"\\mathrm{sech}^{-1}\\left(%0%\\right)",asec:"\\sec^{-1}\\left(%0%\\right)",asinh:"\\sinh^{-1}\\left(%0%\\right)",asin:"\\sin^{-1}\\left(%0%\\right)",atan2:"\\mathrm{atan2}\\left(%*%\\right)",atanh:"\\tanh^{-1}\\left(%0%\\right)",atan:"\\tan^{-1}\\left(%0%\\right)",cosh:"\\cosh\\left(%0%\\right)",cos:"\\cos\\left(%0%\\right)",coth:"\\coth\\left(%0%\\right)",cot:"\\cot\\left(%0%\\right)",csch:"\\mathrm{csch}\\left(%0%\\right)",csc:"\\csc\\left(%0%\\right)",sech:"\\mathrm{sech}\\left(%0%\\right)",sec:"\\sec\\left(%0%\\right)",sinh:"\\sinh\\left(%0%\\right)",sin:"\\sin\\left(%0%\\right)",tanh:"\\tanh\\left(%0%\\right)",tan:"\\tan\\left(%0%\\right)",to:"\\left(%0%"+r.operators.to+"%1%\\right)",clone:i,filter:i,forEach:i,format:i,"import":i,map:i,print:i,sort:i,"typeof":i},a={deg:"^\\circ"};r.toSymbol=function(e){if(a.hasOwnProperty(e))return a[e];if(r.symbols.hasOwnProperty(e))return r.symbols[e];if(-1!==e.indexOf("_")){var t=e.indexOf("_");return r.toSymbol(e.substring(0,t))+"_{"+r.toSymbol(e.substring(t+1))+"}"}return"\\mathrm{"+e+"}"},r.toFunction=function(e,r,t){var a=o[t],s=e.args.map(function(e){return e.toTex(r)});switch(typeof a){case"function":return a(e,r);case"string":return n(a,t,s);case"object":switch(typeof a[s.length]){case"function":return a[s.length](e,r);case"string":return n(a[s.length],t,s)}default:return n(i,t,s)}}}])});
;/*!
 * Particleground
 *
 * @author Jonathan Nicol - @mrjnicol
 * @version 1.1.0
 * @description Creates a canvas based particle system background
 *
 * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
 */

;(function(window, document) {
  "use strict";
  var pluginName = 'particleground';

  // http://youmightnotneedjquery.com/#deep_extend
  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  };

  var $ = window.jQuery;

  function Plugin(element, options) {
    var canvasSupport = !!document.createElement('canvas').getContext;
    var canvas;
    var ctx;
    var particles = [];
    var raf;
    var mouseX = 0;
    var mouseY = 0;
    var winW;
    var winH;
    var desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    var orientationSupport = !!window.DeviceOrientationEvent;
    var tiltX = 0;
    var pointerX;
    var pointerY;
    var tiltY = 0;
    var paused = false;

    options = extend({}, window[pluginName].defaults, options);

    /**
     * Init
     */
    function init() {
      if (!canvasSupport) { return; }

      //Create canvas
      canvas = document.createElement('canvas');
      canvas.className = 'pg-canvas';
      canvas.style.display = 'block';
      element.insertBefore(canvas, element.firstChild);
      ctx = canvas.getContext('2d');
      styleCanvas();

      // Create particles
      var numParticles = Math.round((canvas.width * canvas.height) / options.density);
      for (var i = 0; i < numParticles; i++) {
        var p = new Particle();
        p.setStackPos(i);
        particles.push(p);
      };

      window.addEventListener('resize', function() {
        resizeHandler();
      }, false);

      document.addEventListener('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      }, false);

      if (orientationSupport && !desktop) {
        window.addEventListener('deviceorientation', function () {
          // Contrain tilt range to [-30,30]
          tiltY = Math.min(Math.max(-event.beta, -30), 30);
          tiltX = Math.min(Math.max(-event.gamma, -30), 30);
        }, true);
      }

      draw();
      hook('onInit');
    }

    /**
     * Style the canvas
     */
    function styleCanvas() {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      ctx.fillStyle = options.dotColor;
      ctx.strokeStyle = options.lineColor;
      ctx.lineWidth = options.lineWidth;
    }

    /**
     * Draw particles
     */
    function draw() {
      if (!canvasSupport) { return; }

      winW = window.innerWidth;
      winH = window.innerHeight;

      // Wipe canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions
      for (var i = 0; i < particles.length; i++) {
        particles[i].updatePosition();
      };
      // Draw particles
      for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
      };

      // Call this function next time screen is redrawn
      if (!paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    /**
     * Add/remove particles.
     */
    function resizeHandler() {
      // Resize the canvas
      styleCanvas();

      var elWidth = element.offsetWidth;
      var elHeight = element.offsetHeight;

      // Remove particles that are outside the canvas
      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].position.x > elWidth || particles[i].position.y > elHeight) {
          particles.splice(i, 1);
        }
      };

      // Adjust particle density
      var numParticles = Math.round((canvas.width * canvas.height) / options.density);
      if (numParticles > particles.length) {
        while (numParticles > particles.length) {
          var p = new Particle();
          particles.push(p);
        }
      } else if (numParticles < particles.length) {
        particles.splice(numParticles);
      }

      // Re-index particles
      for (i = particles.length - 1; i >= 0; i--) {
        particles[i].setStackPos(i);
      };
    }

    /**
     * Pause particle system
     */
    function pause() {
      paused = true;
    }

    /**
     * Start particle system
     */
    function start() {
      paused = false;
      draw();
    }

    /**
     * Particle
     */
    function Particle() {
      this.stackPos;
      this.active = true;
      this.layer = Math.ceil(Math.random() * 3);
      this.parallaxOffsetX = 0;
      this.parallaxOffsetY = 0;
      // Initial particle position
      this.position = {
        x: Math.ceil(Math.random() * canvas.width),
        y: Math.ceil(Math.random() * canvas.height)
      }
      // Random particle speed, within min and max values
      this.speed = {}
      switch (options.directionX) {
        case 'left':
          this.speed.x = +(-options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX).toFixed(2);
          break;
        case 'right':
          this.speed.x = +((Math.random() * options.maxSpeedX) + options.minSpeedX).toFixed(2);
          break;
        default:
          this.speed.x = +((-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX)).toFixed(2);
          this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
          break;
      }
      switch (options.directionY) {
        case 'up':
          this.speed.y = +(-options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY).toFixed(2);
          break;
        case 'down':
          this.speed.y = +((Math.random() * options.maxSpeedY) + options.minSpeedY).toFixed(2);
          break;
        default:
          this.speed.y = +((-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY)).toFixed(2);
          this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
          break;
      }
    }

    /**
     * Draw particle
     */
    Particle.prototype.draw = function() {
      // Draw circle
      ctx.beginPath();
      ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      // Draw lines
      ctx.beginPath();
      // Iterate over all particles which are higher in the stack than this one
      for (var i = particles.length - 1; i > this.stackPos; i--) {
        var p2 = particles[i];

        // Pythagorus theorum to get distance between two points
        var a = this.position.x - p2.position.x
        var b = this.position.y - p2.position.y
        var dist = Math.sqrt((a * a) + (b * b)).toFixed(2);

        // If the two particles are in proximity, join them
        if (dist < options.proximity) {
          ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY);
          if (options.curvedLines) {
            ctx.quadraticCurveTo(Math.max(p2.position.x, p2.position.x), Math.min(p2.position.y, p2.position.y), p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
          } else {
            ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
          }
        }
      }
      ctx.stroke();
      ctx.closePath();
    }

    /**
     * update particle position
     */
    Particle.prototype.updatePosition = function() {
      if (options.parallax) {
        if (orientationSupport && !desktop) {
          // Map tiltX range [-30,30] to range [0,winW]
          var ratioX = (winW - 0) / (30 - -30);
          pointerX = (tiltX - -30) * ratioX + 0;
          // Map tiltY range [-30,30] to range [0,winH]
          var ratioY = (winH - 0) / (30 - -30);
          pointerY = (tiltY - -30) * ratioY + 0;
        } else {
          pointerX = mouseX;
          pointerY = mouseY;
        }
        // Calculate parallax offsets
        this.parallaxTargX = (pointerX - (winW / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10; // Easing equation
        this.parallaxTargY = (pointerY - (winH / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10; // Easing equation
      }

      var elWidth = element.offsetWidth;
      var elHeight = element.offsetHeight;

      switch (options.directionX) {
        case 'left':
          if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.position.x = elWidth - this.parallaxOffsetX;
          }
          break;
        case 'right':
          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth) {
            this.position.x = 0 - this.parallaxOffsetX;
          }
          break;
        default:
          // If particle has reached edge of canvas, reverse its direction
          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.speed.x = -this.speed.x;
          }
          break;
      }

      switch (options.directionY) {
        case 'up':
          if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.position.y = elHeight - this.parallaxOffsetY;
          }
          break;
        case 'down':
          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight) {
            this.position.y = 0 - this.parallaxOffsetY;
          }
          break;
        default:
          // If particle has reached edge of canvas, reverse its direction
          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.speed.y = -this.speed.y;
          }
          break;
      }

      // Move particle
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }

    /**
     * Setter: particle stacking position
     */
    Particle.prototype.setStackPos = function(i) {
      this.stackPos = i;
    }

    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }

    function destroy() {
      console.log('destroy');
      canvas.parentNode.removeChild(canvas);
      hook('onDestroy');
      if ($) {
        $(element).removeData('plugin_' + pluginName);
      }
    }

    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(element);
      }
    }

    init();

    return {
      option: option,
      destroy: destroy,
      start: start,
      pause: pause
    };
  }

  window[pluginName] = function(elem, options) {
    return new Plugin(elem, options);
  };

  window[pluginName].defaults = {
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7,
    directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
    directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
    density: 10000, // How many particles will be generated: one particle every n pixels
    dotColor: '#666666',
    lineColor: '#666666',
    particleRadius: 7, // Dot size
    lineWidth: 1,
    curvedLines: false,
    proximity: 100, // How close two dots need to be before they join
    parallax: true,
    parallaxMultiplier: 5, // The lower the number, the more extreme the parallax effect
    onInit: function() {},
    onDestroy: function() {}
  };

  // nothing wrong with hooking into jQuery if it's there...
  if ($) {
    $.fn[pluginName] = function(options) {
      if (typeof arguments[0] === 'string') {
        var methodName = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var returnVal;
        this.each(function() {
          if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
            returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
          }
        });
        if (returnVal !== undefined){
          return returnVal;
        } else {
          return this;
        }
      } else if (typeof options === "object" || !options) {
        return this.each(function() {
          if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
          }
        });
      }
    };
  }

})(window, document);

/**
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license: MIT license
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
}());
;;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());
;var prometheus = {
  activeApp: 'startup',
  overlayIn: 'magictime vanishIn',
  overlayOut: 'magictime vanishOut',
  gridData: [],
  environment: {
    screen: {}
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    prometheus.adjustViewPort();
    $(window).on('resize', prometheus.adjustViewPort);
    $('.appMenuTrigger').on('click', prometheus.toggleMenu);
    $('.appSearchTrigger').on('click', prometheus.showSearch);
    $('#prometheusSplash').on('click', prometheus.removeSlashScreen);
    $('#appView').on('click', prometheus.closeMenu);
    $('.appLink').on('click', prometheus.handleMenuClick);
    $('#prometheusWrapper').on('click', '.app-overlay-close', prometheus.closeOverlay);
    $('#prometheusWrapper').on('click', '.overlayLink', prometheus.openOverlay);
    $('#appView').on('click', '.grindrUser', prometheus.grindr.showUserProfile);
    $('#appView').on('click', '.jackdUser', prometheus.jackd.showUserProfile);
    $('#appView').on('click', '.scruffUser', prometheus.scruff.showUserProfile);
    $('#appView').on('click', '.junkMedia', prometheus.junkcollector.showMedia);
    $('#appContainer').scroll(prometheus.scrollHandler);
    $('#desktop-app #appContainer').on('mouseover', '.gridItem.loaded', prometheus.gridItemHover);
    $('#desktop-app #appContainer').on('mouseout', '.gridItem.loaded', prometheus.gridItemHoverOut);
    $('#appView').on('click', '.navTrigger', prometheus.handleNavTrigger);
  },
  loadData: function(dataUrl, dataCallback) {
    prometheus.showSpinner();
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: dataUrl,
      error: function(data) {
        alert('Error:  Unable to retrieve data from source.');
        prometheus.hideSpinner();
      },
      success: function(data) {
        dataCallback(data);
      }
    });

  },
  displayAppViewData: function(htmlCode) {
    prometheus.showAppView();
    setTimeout(function(){
      $('#appView').html(htmlCode);
      prometheus.hideSpinner();
      prometheus.adjustViewPort();
      prometheus.resizeGrid();
      setTimeout(function(){prometheus.scrollHandler();},1000);
      prometheus.runAjaxScripts();
      prometheus.showSearch();
    }, 500);
  },
  grindr: {
    launch: function() {
      prometheus.loadData('partials/sector1.php', prometheus.grindr.displayUserGrid);
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var id = $(this).data('grid-id');
    }
  },
  jackd: {
    launch: function() {
      prometheus.loadData('partials/sector2.php', prometheus.jackd.displayUserGrid);
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var id = $(this).data('grid-id');
    }
  },
  scruff: {
    launch: function() {
      prometheus.loadData('partials/sector3.php', prometheus.scruff.displayUserGrid);
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var id = $(this).data('grid-id');
    }
  },
  junkcollector: {
    launch: function() {
      prometheus.loadData('partials/junkGrid.php', prometheus.junkcollector.displayMediaGrid);
    },
    displayMediaGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showMedia: function() {
      var id = $(this).data('grid-id');
    }
  },
  handleNavTrigger: function() {
    var thisApp = prometheus.activeApp;
    var thisUrl = $(this).data('url');
    $('#appSearch').fadeOut();
    prometheus.fadeOutGrid();
    setTimeout(function(){
      prometheus.loadData(thisUrl, prometheus[thisApp].displayUserGrid);
    },1000);
  },
  showSearch: function() {
    $('#appSearch').fadeIn();
  },
  runAjaxScripts: function() {
    if ($("#appView #ajaxScript").length != 0) {
      eval($('#appView #ajaxScript'));
    }
  },
  showSpinner: function() {
    $('#ajaxLoader').fadeIn();
  },
  hideSpinner: function() {
    $('#ajaxLoader').fadeOut();
  },
  openOverlay: function() {
    prometheus.closeAllOverlays();
    var target = $(this).data('target');
    $('#'+target).removeClass(prometheus.overlayOut);
    setTimeout(function(){
      $('#'+target).show();
      $('#'+target).addClass(prometheus.overlayIn);
      prometheus.adjustViewPort();
    }, 250);
  },
  closeOverlay: function() {
    var target = $(this).data('target');
    $('#'+target).removeClass(prometheus.overlayIn);
    $('#'+target).addClass(prometheus.overlayOut);
    setTimeout(function(){$('#'+target).hide();}, 500);
    if (target == "skynetView") {
      $('.appLink').removeClass('active');
    }
  },
  closeAllOverlays: function() {
    $('.app-overlay-window').removeClass(prometheus.overlayIn);
    $('.app-overlay-window').addClass(prometheus.overlayOut);
    setTimeout(function(){$('.app-overlay-window').hide();}, 200);
  },
  clearAppView: function() {
    $('#appView').removeClass(prometheus.overlayIn);
    $('#appView').addClass(prometheus.overlayOut);
    setTimeout(function(){$('#appView').hide();}, 250);
  },
  showAppView: function() {
    $('#appView').removeClass(prometheus.overlayOut);
    setTimeout(function(){
      $('#appView').show();
      $('#appView').addClass(prometheus.overlayIn);
      prometheus.adjustViewPort();
    }, 500);
  },
  handleMenuClick: function() {
    var appLink = $(this).data('app');
    if (appLink == prometheus.activeApp) {
      prometheus.closeMenu();
    } else {
      $('.appLink').removeClass('active');
      $(this).addClass('active');
      prometheus.closeMenu();
      prometheus.clearAppView();
      prometheus.closeAllOverlays();
      if (appLink != "skynet") {
        $('.appSearchTrigger').show();
        prometheus[appLink].launch();
        prometheus.activeApp = appLink;
      } else {
        prometheus.activeApp = "skynet";
        $('.appSearchTrigger').hide();
      }
    }
  },
  loadDefaultView: function() {
    $('#topBanner').fadeIn('slow');
    $('#appContainer').addClass(prometheus.overlayIn);
    $('.appBackground').particleground({
        dotColor: '#333',
        lineColor: '#333',
        density: 7500
    });
  },
  animateGridItem: function(el) {
    var delay = Math.random()*3000;
    $(el).addClass('animating');
    setTimeout(function() {$(el).addClass('loaded');}, delay);
    $(el).css('background-image', 'none');
  },
  removeGridItem: function(items, i) {
    var item = items[i];
    return function() {
      $(item).addClass('fallOut');
    }
  },
  fadeOutGrid: function () {
    var items = document.querySelectorAll('.gridItem');
    for ( var i=0; i < items.length; i++ ) {
      var fadeGridItem = prometheus.removeGridItem(items,i);
      var delay = Math.random()*1000;
      setTimeout(fadeGridItem, delay);
    }
  },
  slideInGrid: function() {
      var items = document.querySelectorAll('.gridItem');
      var totalDelay = (items.length *50);
      for ( var i=0; i < items.length; i++ ) {
        var moveGridItem = prometheus.getGridItem(items,i);
        var delay = (Math.floor(Math.random() * totalDelay) + 1) / 2;
        setTimeout(moveGridItem, delay);
      }
  },
  getGridItem: function(items, i) {
    var item = items[i];
     return function() {
       $(item).removeClass('grid-animation');
      }
  },
  getGridItemSize: function() {
    var columns, colWidth, marginSpace;
    if (prometheus.environment.screen.width > 768) {
      columns = 10;
    } else {
      columns = 5;
    }
    marginSpace = 0;
    colWidth = Math.floor((prometheus.environment.gridWidth / columns));
    return colWidth;
  },
  resizeGrid: function() {
    var colWidth = prometheus.getGridItemSize();
    $('.gridItem').css('width', colWidth);
    $('.gridItem').css('height', colWidth);
    prometheus.scrollHandler();
  },
  gridItemHover: function() {
    $(this).animate({  textIndent: 1.25 }, {
        step: function(now,fx) {
          $(this).css('transform','scale('+now+')');
          $(this).css('z-index', '400');
          $(this).css('box-shadow', '0px 1px 10px 1px #242424');
        },
        duration:0
    },'linear');
  },
  gridItemHoverOut: function() {
    $(this).animate({  textIndent: 1 }, {
        step: function(now,fx) {
          $(this).css('transform','scale('+now+')');
          $(this).css('z-index', 'auto');
          $(this).css('box-shadow', 'none');
        },
        duration:0
    },'linear');
  },
  adjustViewPort: function() {
    prometheus.environment.screen.height = $(window).height();
    prometheus.environment.screen.width = $(window).width();
    prometheus.environment.gridWidth = $('.appGrid').width();
    if(prometheus.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
    if(prometheus.environment.screen.width < 768) {
      $('body').addClass('mobile-view').removeClass('desktop-view');
    } else {
      $('body').addClass('desktop-view').removeClass('mobile-view');
    }
    if(prometheus.environment.screen.width > prometheus.environment.screen.height) {
      $('body').removeClass('portrait').addClass('landscape');
      prometheus.layout = 'landscape';
    } else {
      $('body').removeClass('landscape').addClass('portrait');
      prometheus.layout = 'portrait';
    }
    prometheus.resizeGrid();
    prometheus.adjustOverlay();
  },
  adjustOverlay: function() {
    var overlayWindowHeight = $('.vanishIn.app-overlay-window').height();
    var overlayBodyHeight = overlayWindowHeight - 64;
    $('.vanishIn .app-overlay-body').css('height', overlayBodyHeight);
  },
  removeSlashScreen: function() {
    $('#loader').fadeOut();
    setTimeout(function(){ $('#prometheusSplash').addClass('fadeOut'); }, 200);
    $(this).fadeOut('slow');
    setTimeout(function(){ prometheus.loadDefaultView(); }, 500);
  },
  toggleMenu: function() {
    $('#appMenu, #appContainer, #topBanner').toggleClass('open');
  },
  closeMenu: function() {
    $('#appMenu, #appContainer, #topBanner').removeClass('open');
  },
  isScrolledIntoView: function(elem) {
    var containerScroll = document.getElementById('appContainer').scrollTop;
    var containerView = $('#appContainer').height();
    var viewableArea = containerScroll + containerView;
    var elementTop = $(elem).position().top;
    var elementBottom = elementTop + ($(elem).height() / 2);
    var viewable = ((elementBottom <= viewableArea) && (elementTop >= containerScroll));
    return viewable;
  },
  scrollHandler: function () {
    clearTimeout($.data(this, 'scrollTimer'));
     $.data(this, 'scrollTimer', setTimeout(function() {
       var containerScroll = document.getElementById('appContainer').scrollTop;
       var searchPosition = containerScroll + 15;
       $('#appSearch').animate({
         top: searchPosition
       }, 500)
     }, 250));
    $('.gridItem:not(.loaded)').each(function () {
      if (prometheus.isScrolledIntoView(this) === true) {
        prometheus.animateGridItem(this);
      }
    });
  }
};

$(function() {
    FastClick.attach(document.body);
});

prometheus.init();
