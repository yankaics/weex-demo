(function(s) {console.log(s)})('START WEEX HTML5: 0.3.2 Build 20160819');
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _render = __webpack_require__(1);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _root = __webpack_require__(137);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _div = __webpack_require__(138);
	
	var _div2 = _interopRequireDefault(_div);
	
	var _components = __webpack_require__(139);
	
	var _components2 = _interopRequireDefault(_components);
	
	var _api = __webpack_require__(189);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * install components and APIs
	 */
	
	
	_render2.default.install(_root2.default);
	_render2.default.install(_div2.default);
	_render2.default.install(_components2.default);
	_render2.default.install(_api2.default);
	
	exports.default = _render2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib, WebSocket */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Weex;
	
	__webpack_require__(2);
	
	__webpack_require__(6);
	
	var _config = __webpack_require__(116);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _loader = __webpack_require__(117);
	
	var _utils = __webpack_require__(83);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _bridge = __webpack_require__(118);
	
	var _component = __webpack_require__(122);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _atomic = __webpack_require__(132);
	
	var _atomic2 = _interopRequireDefault(_atomic);
	
	var _componentManager = __webpack_require__(114);
	
	var _componentManager2 = _interopRequireDefault(_componentManager);
	
	var _register = __webpack_require__(133);
	
	__webpack_require__(134);
	
	__webpack_require__(135);
	
	__webpack_require__(136);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_DESIGN_WIDTH = 750;
	
	// gesture
	
	var DEFAULT_SCALE = window.innerWidth / DEFAULT_DESIGN_WIDTH;
	var DEFAULT_ROOT_ID = 'weex';
	var DEFAULT_JSONP_CALLBACK_NAME = 'weexJsonpCallback';
	
	global.WXEnvironment = {
	  weexVersion: _config2.default.weexVersion,
	  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
	  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
	  platform: 'Web',
	  osName: lib.env.browser ? lib.env.browser.name : null,
	  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
	  deviceWidth: DEFAULT_DESIGN_WIDTH,
	  deviceHeight: window.innerHeight / DEFAULT_SCALE
	};
	
	var _weexInstance = {};
	
	function noop() {}
	
	;(function initializeWithUrlParams() {
	  // in casperjs the protocol is file.
	  if (location.protocol.match(/file/)) {
	    return;
	  }
	
	  var params = lib.httpurl(location.href).params;
	
	  // set global 'debug' config to true if there's a debug flag in current url.
	  var debug = params['debug'];
	  if (debug === true || debug === 'true') {
	    _config2.default.debug = true;
	  }
	
	  !_config2.default.debug && (console.debug = noop);
	})();
	
	function Weex(options) {
	  if (!(this instanceof Weex)) {
	    return new Weex(options);
	  }
	
	  // Width of the root container. Default is window.innerWidth.
	  this.width = options.width || window.innerWidth;
	  this.bundleUrl = options.bundleUrl || location.href;
	  this.instanceId = options.appId;
	  this.rootId = options.rootId || DEFAULT_ROOT_ID + utils.getRandom(10);
	  this.designWidth = options.designWidth || DEFAULT_DESIGN_WIDTH;
	  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSONP_CALLBACK_NAME;
	  this.source = options.source;
	  this.loader = options.loader;
	  this.embed = options.embed;
	
	  this.data = options.data;
	  this.scale = this.width / this.designWidth;
	  _bridge.receiver.init(this);
	  this.sender = new _bridge.Sender(this);
	
	  _weexInstance[this.instanceId] = this;
	
	  // load bundle.
	  (0, _loader.load)({
	    jsonpCallback: this.jsonpCallback,
	    source: this.source,
	    loader: this.loader
	  }, function (err, appCode) {
	    if (!err) {
	      this.createApp(_config2.default, appCode);
	    } else {
	      console.error('load bundle err:', err);
	    }
	  }.bind(this));
	}
	
	Weex.init = function (options) {
	  if (utils.isArray(options)) {
	    options.forEach(function (config) {
	      new Weex(config);
	    });
	  } else if (utils.getType(options) === 'object') {
	    new Weex(options);
	  }
	};
	
	Weex.getInstance = function (instanceId) {
	  return _weexInstance[instanceId];
	};
	
	Weex.prototype = {
	
	  createApp: function createApp(config, appCode) {
	    var root = document.querySelector('#' + this.rootId);
	    if (!root) {
	      root = document.createElement('div');
	      root.id = this.rootId;
	      document.body.appendChild(root);
	    }
	
	    var instance = window.createInstance(this.instanceId, appCode, {
	      bundleUrl: this.bundleUrl,
	      debug: config.debug
	    }, this.data);
	
	    if (!instance) {
	      return console.error('[h5-render] createInstance error: get void for instance.');
	    }
	
	    if (instance instanceof Error) {
	      return console.error('[h5-render]', instance);
	    }
	
	    if (instance instanceof Promise) {
	      return instance.then(function (res) {
	        this.appInstance = res;
	        // Weex._instances[this.instanceId] = this.root
	      }).catch(function (err) {
	        console.error('[h5-render]', err);
	      });
	    }
	
	    this.appInstance = instance;
	
	    // Do not destroy instance before unload, because in most browser
	    // press back button to back to this page will not refresh
	    // the window and the instance will not be recreated then.
	    // window.addEventListener('beforeunload', function (e) {
	    // })
	  },
	
	  getComponentManager: function getComponentManager() {
	    if (!this._componentManager) {
	      this._componentManager = _componentManager2.default.getInstance(this.instanceId);
	    }
	    return this._componentManager;
	  },
	
	  getRoot: function getRoot() {
	    return document.querySelector('#' + this.rootId);
	  }
	};
	
	Weex.stopTheWorld = function (instanceId) {
	  if (!instanceId) {
	    return Object.keys(_weexInstance).map(function (instanceId) {
	      Weex.stopTheWorld(instanceId);
	    });
	  }
	  window.destroyInstance(instanceId);
	}
	
	// for weex-toolkit.
	;(function startRefreshController() {
	  if (location.protocol.match(/file/)) {
	    return;
	  }
	  if (location.search.indexOf('hot-reload_controller') === -1) {
	    return;
	  }
	  if (typeof WebSocket === 'undefined') {
	    console.info('auto refresh need WebSocket support');
	    return;
	  }
	  var host = location.hostname;
	  var port = 8082;
	  var client = new WebSocket('ws://' + host + ':' + port + '/', 'echo-protocol');
	  client.onerror = function () {
	    console.log('refresh controller websocket connection error');
	  };
	  client.onmessage = function (e) {
	    console.log('Received: \'' + e.data + '\'');
	    if (e.data === 'refresh') {
	      location.reload();
	    }
	  };
	})();
	
	(0, _register.bind)(Weex);
	
	utils.extend(Weex, {
	  Component: _component2.default,
	  Atomic: _atomic2.default,
	  ComponentManager: _componentManager2.default,
	  utils: utils,
	  config: _config2.default
	});
	
	global.weex = Weex;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./base.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  text-size-adjust: none;\n}\n\nul, ol {\n  list-style: none;\n}\n\n.weex-container {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  flex-shrink: 0;\n  align-items: stretch;\n  box-align: stretch;\n  align-content: flex-start;\n  position: relative;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-element {\n  box-sizing: border-box;\n  position: relative;\n  flex-shrink: 0;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(7);
	
	var _init = __webpack_require__(76);
	
	var _init2 = _interopRequireDefault(_init);
	
	var _config = __webpack_require__(77);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _vdom = __webpack_require__(112);
	
	var _methods = __webpack_require__(113);
	
	var methods = _interopRequireWildcard(_methods);
	
	var _componentManager = __webpack_require__(114);
	
	var _componentManager2 = _interopRequireDefault(_componentManager);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import { subversion } from '../../../package.json'
	
	
	var config = {
	  Document: _vdom.Document, Element: _vdom.Element, Comment: _vdom.Comment, Listener: _componentManager2.default, frameworks: _config2.default,
	  sendTasks: function sendTasks() {
	    var _global;
	
	    (_global = global).callNative.apply(_global, arguments);
	  }
	};
	// import init from '../../runtime/init'
	
	
	var runtime = (0, _init2.default)(config);
	
	// const { native, transformer } = subversion
	
	var _loop = function _loop(methodName) {
	  global[methodName] = function () {
	    var ret = runtime[methodName].apply(runtime, arguments);
	    if (ret instanceof Error) {
	      console.error(ret.toString());
	    }
	    return ret;
	  };
	};
	
	for (var methodName in runtime) {
	  _loop(methodName);
	}
	
	// global.frameworkVersion = native
	// global.transformVersion = transformer
	
	/**
	 * register methods
	 */
	global.registerMethods(methods);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isPlainObject = exports.isObject = exports.toArray = exports.bind = exports.hasOwn = exports.remove = exports.def = exports.extend = undefined;
	
	var _utils = __webpack_require__(8);
	
	Object.defineProperty(exports, 'extend', {
	  enumerable: true,
	  get: function get() {
	    return _utils.extend;
	  }
	});
	Object.defineProperty(exports, 'def', {
	  enumerable: true,
	  get: function get() {
	    return _utils.def;
	  }
	});
	Object.defineProperty(exports, 'remove', {
	  enumerable: true,
	  get: function get() {
	    return _utils.remove;
	  }
	});
	Object.defineProperty(exports, 'hasOwn', {
	  enumerable: true,
	  get: function get() {
	    return _utils.hasOwn;
	  }
	});
	Object.defineProperty(exports, 'bind', {
	  enumerable: true,
	  get: function get() {
	    return _utils.bind;
	  }
	});
	Object.defineProperty(exports, 'toArray', {
	  enumerable: true,
	  get: function get() {
	    return _utils.toArray;
	  }
	});
	Object.defineProperty(exports, 'isObject', {
	  enumerable: true,
	  get: function get() {
	    return _utils.isObject;
	  }
	});
	Object.defineProperty(exports, 'isPlainObject', {
	  enumerable: true,
	  get: function get() {
	    return _utils.isPlainObject;
	  }
	});
	
	__webpack_require__(9);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.extend = extend;
	exports.def = def;
	exports.remove = remove;
	exports.hasOwn = hasOwn;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(target) {
	  for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    src[_key - 1] = arguments[_key];
	  }
	
	  if (typeof Object.assign === 'function') {
	    Object.assign.apply(Object, [target].concat(src));
	  } else {
	    var first = src.shift();
	    for (var key in first) {
	      target[key] = first[key];
	    }
	    if (src.length) {
	      extend.apply(undefined, [target].concat(src));
	    }
	  }
	  return target;
	}
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Remove an item from an array
	 *
	 * @param {Array} arr
	 * @param {*} item
	 */
	
	function remove(arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1);
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fix Promise Problem on JSContext of iOS7~8
	// @see https://bugs.webkit.org/show_bug.cgi?id=135866
	// global.Promise = null
	__webpack_require__(10);
	__webpack_require__(30);
	__webpack_require__(56);
	__webpack_require__(60);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(11)
	  , test    = {};
	test[__webpack_require__(13)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(17)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(12)
	  , TAG = __webpack_require__(13)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(14)('wks')
	  , uid        = __webpack_require__(16)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , hide      = __webpack_require__(18)
	  , has       = __webpack_require__(28)
	  , SRC       = __webpack_require__(16)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(29).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(31)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(34)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , defined   = __webpack_require__(33);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(35)
	  , $export        = __webpack_require__(36)
	  , redefine       = __webpack_require__(17)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(28)
	  , Iterators      = __webpack_require__(39)
	  , $iterCreate    = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(53)
	  , getPrototypeOf = __webpack_require__(54)
	  , ITERATOR       = __webpack_require__(13)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(29)
	  , hide      = __webpack_require__(18)
	  , redefine  = __webpack_require__(17)
	  , ctx       = __webpack_require__(37)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(38);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(41)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(53)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(13)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(43);
	
	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(51);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(28)
	  , toIObject    = __webpack_require__(45)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(50)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(46)
	  , defined = __webpack_require__(33);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(12);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(14)('keys')
	  , uid    = __webpack_require__(16);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(28)
	  , TAG = __webpack_require__(13)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(28)
	  , toObject    = __webpack_require__(55)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(33);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(57)
	  , redefine      = __webpack_require__(17)
	  , global        = __webpack_require__(15)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(39)
	  , wks           = __webpack_require__(13)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(58)
	  , step             = __webpack_require__(59)
	  , Iterators        = __webpack_require__(39)
	  , toIObject        = __webpack_require__(45);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(34)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(13)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(18)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(35)
	  , global             = __webpack_require__(15)
	  , ctx                = __webpack_require__(37)
	  , classof            = __webpack_require__(11)
	  , $export            = __webpack_require__(36)
	  , isObject           = __webpack_require__(21)
	  , anObject           = __webpack_require__(20)
	  , aFunction          = __webpack_require__(38)
	  , anInstance         = __webpack_require__(61)
	  , forOf              = __webpack_require__(62)
	  , setProto           = __webpack_require__(66).set
	  , speciesConstructor = __webpack_require__(69)
	  , task               = __webpack_require__(70).set
	  , microtask          = __webpack_require__(72)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(13)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(73)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(53)($Promise, PROMISE);
	__webpack_require__(74)(PROMISE);
	Wrapper = __webpack_require__(29)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(75)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(37)
	  , call        = __webpack_require__(63)
	  , isArrayIter = __webpack_require__(64)
	  , anObject    = __webpack_require__(20)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(65)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(39)
	  , ITERATOR   = __webpack_require__(13)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(11)
	  , ITERATOR  = __webpack_require__(13)('iterator')
	  , Iterators = __webpack_require__(39);
	module.exports = __webpack_require__(29).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(37)(Function.call, __webpack_require__(67).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(68)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(45)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(28)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(20)
	  , aFunction = __webpack_require__(38)
	  , SPECIES   = __webpack_require__(13)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(37)
	  , invoke             = __webpack_require__(71)
	  , html               = __webpack_require__(52)
	  , cel                = __webpack_require__(25)
	  , global             = __webpack_require__(15)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(12)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , macrotask = __webpack_require__(70).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(12)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(17);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(15)
	  , dP          = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(23)
	  , SPECIES     = __webpack_require__(13)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(13)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = init;
	var frameworks = void 0;
	
	var versionRegExp = /^\/\/ *(\{[^\}]*\}) *\r?\n/;
	
	function checkVersion(code) {
	  var info = void 0;
	  var result = versionRegExp.exec(code);
	  if (result) {
	    try {
	      info = JSON.parse(result[1]);
	    } catch (e) {}
	  }
	  return info;
	}
	
	var instanceMap = {};
	
	function createInstance(id, code, config, data) {
	  var info = instanceMap[id];
	  if (!info) {
	    info = checkVersion(code) || {};
	    if (!frameworks[info.framework]) {
	      info.framework = 'Weex';
	    }
	    instanceMap[id] = info;
	    config = config || {};
	    config.bundleVersion = info.version;
	    console.debug('[JS Framework] create an ' + info.framework + '@' + config.bundleVersion + ' instance from ' + config.bundleVersion);
	    return frameworks[info.framework].createInstance(id, code, config, data);
	  }
	  return new Error('invalid instance id "' + id + '"');
	}
	
	var methods = {
	  createInstance: createInstance
	};
	
	function genInit(methodName) {
	  methods[methodName] = function () {
	    for (var name in frameworks) {
	      var framework = frameworks[name];
	      if (framework && framework[methodName]) {
	        framework[methodName].apply(framework, arguments);
	      }
	    }
	  };
	}
	
	function genInstance(methodName) {
	  methods[methodName] = function () {
	    var id = arguments.length <= 0 ? undefined : arguments[0];
	    var info = instanceMap[id];
	    if (info && frameworks[info.framework]) {
	      var _frameworks$info$fram;
	
	      return (_frameworks$info$fram = frameworks[info.framework])[methodName].apply(_frameworks$info$fram, arguments);
	    }
	    return new Error('invalid instance id "' + id + '"');
	  };
	}
	
	function adaptInstance(methodName, nativeMethodName) {
	  methods[nativeMethodName] = function () {
	    var id = arguments.length <= 0 ? undefined : arguments[0];
	    var info = instanceMap[id];
	    if (info && frameworks[info.framework]) {
	      var _frameworks$info$fram2;
	
	      return (_frameworks$info$fram2 = frameworks[info.framework])[methodName].apply(_frameworks$info$fram2, arguments);
	    }
	    return new Error('invalid instance id "' + id + '"');
	  };
	}
	
	function init(config) {
	  frameworks = config.frameworks;
	  for (var name in frameworks) {
	    var framework = frameworks[name];
	    framework.init(config);
	  }
	
	  ;['destroyInstance', 'refreshInstance', 'receiveTasks', 'getRoot'].forEach(genInstance);['registerComponents', 'registerModules', 'registerMethods'].forEach(genInit);
	
	  adaptInstance('receiveTasks', 'callJS');
	
	  return methods;
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _default = __webpack_require__(78);
	
	var Weex = _interopRequireWildcard(_default);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  Weex: Weex
	}; // built by npm run build:config

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _create = __webpack_require__(79);
	
	Object.defineProperty(exports, 'createInstance', {
	  enumerable: true,
	  get: function get() {
	    return _create.createInstance;
	  }
	});
	
	var _life = __webpack_require__(108);
	
	Object.defineProperty(exports, 'init', {
	  enumerable: true,
	  get: function get() {
	    return _life.init;
	  }
	});
	Object.defineProperty(exports, 'refreshInstance', {
	  enumerable: true,
	  get: function get() {
	    return _life.refreshInstance;
	  }
	});
	Object.defineProperty(exports, 'destroyInstance', {
	  enumerable: true,
	  get: function get() {
	    return _life.destroyInstance;
	  }
	});
	
	var _register = __webpack_require__(109);
	
	Object.defineProperty(exports, 'registerComponents', {
	  enumerable: true,
	  get: function get() {
	    return _register.registerComponents;
	  }
	});
	Object.defineProperty(exports, 'registerModules', {
	  enumerable: true,
	  get: function get() {
	    return _register.registerModules;
	  }
	});
	Object.defineProperty(exports, 'registerMethods', {
	  enumerable: true,
	  get: function get() {
	    return _register.registerMethods;
	  }
	});
	
	var _bridge = __webpack_require__(110);
	
	Object.defineProperty(exports, 'receiveTasks', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.receiveTasks;
	  }
	});
	
	var _misc = __webpack_require__(111);
	
	Object.defineProperty(exports, 'getRoot', {
	  enumerable: true,
	  get: function get() {
	    return _misc.getRoot;
	  }
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createInstance = createInstance;
	
	var _app = __webpack_require__(80);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _map = __webpack_require__(107);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * create a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {string} code
	 * @param  {object} [options] option `HAS_LOG` enable print log
	 * @param  {object} [data]
	 */
	function createInstance(instanceId, code, options, data) {
	  var instance = _map.instanceMap[instanceId];
	  options = options || {};
	
	  var result = void 0;
	  if (!instance) {
	    instance = new _app2.default(instanceId, options);
	    _map.instanceMap[instanceId] = instance;
	    result = instance.init(code, data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  return result || instance;
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ctrl = __webpack_require__(81);
	
	var ctrl = _interopRequireWildcard(_ctrl);
	
	var _utils = __webpack_require__(83);
	
	var _instance = __webpack_require__(105);
	
	var _instance2 = _interopRequireDefault(_instance);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	(0, _utils.extend)(_instance2.default.prototype, ctrl); /**
	                                                         * @fileOverview
	                                                         * Weex instance constructor & definition
	                                                         */


	exports.default = _instance2.default;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _init = __webpack_require__(82);
	
	Object.defineProperty(exports, 'init', {
	  enumerable: true,
	  get: function get() {
	    return _init.init;
	  }
	});
	
	var _misc = __webpack_require__(104);
	
	Object.defineProperty(exports, 'updateActions', {
	  enumerable: true,
	  get: function get() {
	    return _misc.updateActions;
	  }
	});
	Object.defineProperty(exports, 'destroy', {
	  enumerable: true,
	  get: function get() {
	    return _misc.destroy;
	  }
	});
	Object.defineProperty(exports, 'getRootElement', {
	  enumerable: true,
	  get: function get() {
	    return _misc.getRootElement;
	  }
	});
	Object.defineProperty(exports, 'fireEvent', {
	  enumerable: true,
	  get: function get() {
	    return _misc.fireEvent;
	  }
	});
	Object.defineProperty(exports, 'callback', {
	  enumerable: true,
	  get: function get() {
	    return _misc.callback;
	  }
	});
	Object.defineProperty(exports, 'refreshData', {
	  enumerable: true,
	  get: function get() {
	    return _misc.refreshData;
	  }
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	
	var _utils = __webpack_require__(83);
	
	var _bundle = __webpack_require__(87);
	
	/**
	 * @fileOverview
	 * instance controls from native
	 *
	 * - init bundle
	 * - fire event
	 * - callback
	 * - destroy
	 *
	 * corresponded with the API of instance manager (framework.js)
	 */
	
	function init(code, data) {
	  var _this = this;
	
	  console.debug('[JS Framework] Intialize an instance with:\n', data);
	
	  var result = void 0;
	  // @see: lib/app/bundle.js
	  var bundleDefine = (0, _utils.bind)(_bundle.define, this);
	  var bundleBootstrap = function bundleBootstrap(name, config, _data) {
	    result = (0, _bundle.bootstrap)(_this, name, config, _data || data);
	    _this.updateActions();
	    _this.doc.listener.createFinish();
	    console.debug('[JS Framework] After intialized an instance(' + _this.id + ')');
	  };
	
	  // backward(register/render)
	  var bundleRegister = (0, _utils.bind)(_bundle.register, this);
	  var bundleRender = function bundleRender(name, _data) {
	    result = (0, _bundle.bootstrap)(_this, name, {}, _data);
	  };
	
	  var bundleRequire = function bundleRequire(name) {
	    return function (_data) {
	      result = (0, _bundle.bootstrap)(_this, name, {}, _data);
	    };
	  };
	
	  var bundleDocument = this.doc;
	
	  var functionBody = void 0;
	  /* istanbul ignore if */
	  if (typeof code === 'function') {
	    // `function () {...}` -> `{...}`
	    // not very strict
	    functionBody = code.toString().substr(12);
	  } else if (code) {
	    functionBody = code.toString();
	  }
	
	  var _global = global;
	  var WXEnvironment = _global.WXEnvironment;
	
	
	  if (WXEnvironment) {
	    var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	    '__weex_bootstrap__', // alias for bootstrap
	    functionBody);
	
	    fn(bundleDefine, bundleRequire, bundleDocument, bundleBootstrap, bundleRegister, bundleRender, bundleDefine, bundleBootstrap);
	  }
	
	  return result;
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* global Image */
	
	'use strict';
	
	// const WEAPP_STYLE_ID = 'weapp-style'
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.vendors = exports.slice = exports.isArray = exports.typof = exports.isPlainObject = exports.isObject = exports.toArray = exports.bind = exports.hasOwn = exports.remove = exports.def = exports.extend = exports.frameUpdater = undefined;
	
	var _util = __webpack_require__(84);
	
	Object.defineProperty(exports, 'extend', {
	  enumerable: true,
	  get: function get() {
	    return _util.extend;
	  }
	});
	Object.defineProperty(exports, 'def', {
	  enumerable: true,
	  get: function get() {
	    return _util.def;
	  }
	});
	Object.defineProperty(exports, 'remove', {
	  enumerable: true,
	  get: function get() {
	    return _util.remove;
	  }
	});
	Object.defineProperty(exports, 'hasOwn', {
	  enumerable: true,
	  get: function get() {
	    return _util.hasOwn;
	  }
	});
	Object.defineProperty(exports, 'bind', {
	  enumerable: true,
	  get: function get() {
	    return _util.bind;
	  }
	});
	Object.defineProperty(exports, 'toArray', {
	  enumerable: true,
	  get: function get() {
	    return _util.toArray;
	  }
	});
	Object.defineProperty(exports, 'isObject', {
	  enumerable: true,
	  get: function get() {
	    return _util.isObject;
	  }
	});
	Object.defineProperty(exports, 'isPlainObject', {
	  enumerable: true,
	  get: function get() {
	    return _util.isPlainObject;
	  }
	});
	Object.defineProperty(exports, 'typof', {
	  enumerable: true,
	  get: function get() {
	    return _util.typof;
	  }
	});
	exports.getType = getType;
	exports.appendStyle = appendStyle;
	exports.getUniqueFromArray = getUniqueFromArray;
	exports.detectWebp = detectWebp;
	exports.detectSticky = detectSticky;
	exports.getRandom = getRandom;
	exports.getRgb = getRgb;
	exports.loopArray = loopArray;
	exports.throttle = throttle;
	
	var _frameUpdater = __webpack_require__(85);
	
	var _frameUpdater2 = _interopRequireDefault(_frameUpdater);
	
	var _array = __webpack_require__(86);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.frameUpdater = _frameUpdater2.default;
	exports.isArray = _array.isArray;
	exports.slice = _array.slice;
	var vendors = exports.vendors = ['ms', 'moz', 'webkit', 'o'];
	
	var _isWebpSupported = false;(function isSupportWebp() {
	  try {
	    (function () {
	      var webP = new Image();
	      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdA' + 'SoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	      webP.onload = function () {
	        if (webP.height === 2) {
	          _isWebpSupported = true;
	        }
	      };
	    })();
	  } catch (e) {
	    // do nothing.
	  }
	})();
	
	var _isStickySupported = false;(function isSupportSticky() {
	  var element = document.createElement('div');
	  var elementStyle = element.style;
	  elementStyle.cssText = vendors.concat(['']).map(function (vendor) {
	    return 'position:' + (vendor ? '-' + vendor + '-' : '') + 'sticky';
	  }).join(';') + ';';
	  _isStickySupported = elementStyle.position.indexOf('sticky') !== -1;
	})();
	
	// export function extend (to, from) {
	//   for (const key in from) {
	//     to[key] = from[key]
	//   }
	//   return to
	// }
	
	// export function isPlainObject (obj) {
	//   return Object.prototype.toString.call(obj)
	//     .slice(8, -1).toLowerCase() === 'object'
	// }
	
	function getType(obj) {
	  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}
	
	function appendStyle(css, styleId, replace) {
	  var style = document.getElementById(styleId);
	  if (style && replace) {
	    style.parentNode.removeChild(style);
	    style = null;
	  }
	  if (!style) {
	    style = document.createElement('style');
	    style.type = 'text/css';
	    styleId && (style.id = styleId);
	    document.getElementsByTagName('head')[0].appendChild(style);
	  }
	  style.appendChild(document.createTextNode(css));
	}
	
	function getUniqueFromArray(arr) {
	  if (!(0, _array.isArray)(arr)) {
	    return [];
	  }
	  var res = [];
	  var unique = {};
	  var val = void 0;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    val = arr[i];
	    if (unique[val]) {
	      continue;
	    }
	    unique[val] = true;
	    res.push(val);
	  }
	  return res;
	}
	
	function detectWebp() {
	  return _isWebpSupported;
	}
	
	function detectSticky() {
	  return _isStickySupported;
	}
	
	function getRandom(num) {
	  var _defaultNum = 10;
	  if (typeof num !== 'number' || num <= 0) {
	    num = _defaultNum;
	  }
	  var _max = Math.pow(10, num);
	  return Math.floor(Date.now() + Math.random() * _max) % _max;
	}
	
	function getRgb(color) {
	  var match = void 0;
	  color = color + '';
	  match = color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/);
	  if (match) {
	    return {
	      r: parseInt(match[1], 16),
	      g: parseInt(match[2], 16),
	      b: parseInt(match[3], 16)
	    };
	  }
	  match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	  if (match) {
	    return {
	      r: parseInt(match[1]),
	      g: parseInt(match[2]),
	      b: parseInt(match[3])
	    };
	  }
	}
	
	// direction: 'l' | 'r', default is 'r'
	// num: how many times to loop, should be a positive integer
	function loopArray(arr, num, direction) {
	  if (!(0, _array.isArray)(arr)) {
	    return;
	  }
	  var isLeft = (direction + '').toLowerCase() === 'l';
	  var len = arr.length;
	  num = num % len;
	  if (num < 0) {
	    num = -num;
	    isLeft = !isLeft;
	  }
	  if (num === 0) {
	    return arr;
	  }
	  var lp = void 0,
	      rp = void 0;
	  if (isLeft) {
	    lp = arr.slice(0, num);
	    rp = arr.slice(num);
	  } else {
	    lp = arr.slice(0, len - num);
	    rp = arr.slice(len - num);
	  }
	  return rp.concat(lp);
	}
	
	function throttle(func, wait) {
	  var result = void 0;
	  var timerId = null;
	  var previous = 0;
	  var context = void 0;
	  var args = void 0;
	  var later = function later() {
	    previous = Date.now();
	    timerId = null;
	    result = func.apply(context, args);
	  };
	  return function () {
	    var now = Date.now();
	    var remaining = wait - (now - previous);
	    context = this;
	    args = Array.prototype.slice.call(arguments);
	    if (remaining <= 0) {
	      clearTimeout(timerId);
	      timerId = null;
	      previous = now;
	      result = func.apply(context, args);
	    } else if (!timerId) {
	      timerId = setTimeout(later, remaining);
	    }
	    return result;
	  };
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(8);
	
	Object.defineProperty(exports, 'extend', {
	  enumerable: true,
	  get: function get() {
	    return _utils.extend;
	  }
	});
	Object.defineProperty(exports, 'def', {
	  enumerable: true,
	  get: function get() {
	    return _utils.def;
	  }
	});
	Object.defineProperty(exports, 'remove', {
	  enumerable: true,
	  get: function get() {
	    return _utils.remove;
	  }
	});
	Object.defineProperty(exports, 'hasOwn', {
	  enumerable: true,
	  get: function get() {
	    return _utils.hasOwn;
	  }
	});
	Object.defineProperty(exports, 'bind', {
	  enumerable: true,
	  get: function get() {
	    return _utils.bind;
	  }
	});
	Object.defineProperty(exports, 'toArray', {
	  enumerable: true,
	  get: function get() {
	    return _utils.toArray;
	  }
	});
	Object.defineProperty(exports, 'isObject', {
	  enumerable: true,
	  get: function get() {
	    return _utils.isObject;
	  }
	});
	Object.defineProperty(exports, 'isPlainObject', {
	  enumerable: true,
	  get: function get() {
	    return _utils.isPlainObject;
	  }
	});
	exports.isReserved = isReserved;
	exports.cached = cached;
	exports.typof = typof;
	
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	// can we use __proto__?
	var hasProto = exports.hasProto = '__proto__' in {};
	
	var _Set = void 0;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  exports._Set = _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  exports._Set = _Set = function _Set() {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	exports._Set = _Set;
	
	/**
	 * Create a cached version of a pure function.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	var camelize = exports.camelize = cached(function (str) {
	  return str.replace(camelizeRE, toUpper);
	});
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	var hyphenate = exports.hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	});
	
	function typof(v) {
	  var s = Object.prototype.toString.call(v);
	  return s.substring(8, s.length - 1).toLowerCase();
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (calllback) {
	  setTimeout(calllback, 16);
	};
	
	var rafId = void 0;
	var observers = [];
	var paused = false;
	
	exports.default = {
	  start: function start() {
	    if (rafId) {
	      return;
	    }
	
	    rafId = raf(function runLoop() {
	      if (!paused) {
	        for (var i = 0; i < observers.length; i++) {
	          observers[i]();
	        }
	        raf(runLoop);
	      }
	    });
	  },
	
	  isActive: function isActive() {
	    return !paused;
	  },
	
	  pause: function pause() {
	    paused = true;
	    rafId = undefined;
	  },
	
	  resume: function resume() {
	    paused = false;
	    this.start();
	  },
	
	  addUpdateObserver: function addUpdateObserver(observeMethod) {
	    observers.push(observeMethod);
	  }
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isArray = isArray;
	exports.slice = slice;
	function isArray(arr) {
	  return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
	}
	
	function slice(arr, start, end) {
	  if (isArray(arr)) {
	    return arr.slice(start, end);
	  }
	  var slice = Array.prototype.slice;
	  return slice.call(arr, start, end);
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _bootstrap = __webpack_require__(88);
	
	Object.defineProperty(exports, 'bootstrap', {
	  enumerable: true,
	  get: function get() {
	    return _bootstrap.bootstrap;
	  }
	});
	
	var _define = __webpack_require__(103);
	
	Object.defineProperty(exports, 'clearCommonModules', {
	  enumerable: true,
	  get: function get() {
	    return _define.clearCommonModules;
	  }
	});
	Object.defineProperty(exports, 'define', {
	  enumerable: true,
	  get: function get() {
	    return _define.define;
	  }
	});
	Object.defineProperty(exports, 'register', {
	  enumerable: true,
	  get: function get() {
	    return _define.register;
	  }
	});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bootstrap = bootstrap;
	
	var _vm = __webpack_require__(89);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _utils = __webpack_require__(83);
	
	var _misc = __webpack_require__(102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import * as downgrade from '../downgrade'
	function bootstrap(app, name, config, data) {
	  console.debug('[JS Framework] bootstrap for ' + name);
	
	  var cleanName = void 0;
	
	  if ((0, _misc.isWeexComponent)(name)) {
	    cleanName = (0, _misc.removeWeexPrefix)(name);
	  } else if ((0, _misc.isNpmModule)(name)) {
	    cleanName = (0, _misc.removeJSSurfix)(name);
	    // check if define by old 'define' method
	    /* istanbul ignore if */
	    if (!app.customComponentMap[cleanName]) {
	      return new Error('It\'s not a component: ' + name);
	    }
	  } else {
	    return new Error('Wrong component name: ' + name);
	  }
	
	  config = (0, _utils.isPlainObject)(config) ? config : {};
	
	  console.log('transformerVersion: ' + config.transformerVersion + ', ' + ('available transformerVersion: ' + global.transformVersion));
	
	  // if (typeof config.transformerVersion === 'string' &&
	  //   typeof global.transformerVersion === 'string' &&
	  //   !semver.satisfies(config.transformerVersion,
	  //     global.transformerVersion)) {
	  //   return new Error(`JS Bundle version: ${config.transformerVersion} ` +
	  //     `not compatible with ${global.transformerVersion}`)
	  // }
	
	  // const _checkDowngrade = downgrade.check(config.downgrade)
	  /* istanbul ignore if */
	  // if (_checkDowngrade.isDowngrade) {
	  //   app.callTasks([{
	  //     module: 'instanceWrap',
	  //     method: 'error',
	  //     args: [
	  //       _checkDowngrade.errorType,
	  //       _checkDowngrade.code,
	  //       _checkDowngrade.errorMessage
	  //     ]
	  //   }])
	  //   return new Error(`Downgrade[${_checkDowngrade.code}]: ${_checkDowngrade.errorMessage}`)
	  // }
	
	  app.vm = new _vm2.default(cleanName, null, { _app: app }, null, data);
	} // import semver from 'semver'

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vm;
	
	var _util = __webpack_require__(84);
	
	var _state = __webpack_require__(90);
	
	var _compiler = __webpack_require__(96);
	
	var _events = __webpack_require__(100);
	
	var _register = __webpack_require__(101);
	
	/**
	 * ViewModel constructor
	 *
	 * @param {string} type
	 * @param {object} options    component options
	 * @param {object} parentVm   which contains _app
	 * @param {object} parentEl   root element or frag block
	 * @param {object} mergedData external data
	 * @param {object} externalEvents external events
	 */
	function Vm(type, options, parentVm, parentEl, mergedData, externalEvents) {
	  this._parent = parentVm._realParent ? parentVm._realParent : parentVm;
	  this._app = parentVm._app;
	  parentVm._childrenVms && parentVm._childrenVms.push(this);
	
	  if (!options) {
	    options = this._app.customComponentMap[type] || {};
	  }
	  var data = options.data || {};
	
	  this._options = options;
	  this._methods = options.methods || {};
	  this._computed = options.computed || {};
	  this._css = options.style || {};
	  this._ids = {};
	  this._vmEvents = {};
	  this._childrenVms = [];
	  this._type = type;
	
	  // bind events and lifecycles
	  (0, _events.initEvents)(this, externalEvents);
	
	  console.debug('[JS Framework] "init" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:init');
	  this._inited = true;
	
	  // proxy data and methods
	  // observe data and add this to vms
	  this._data = typeof data === 'function' ? data() : data;
	  if (mergedData) {
	    (0, _util.extend)(this._data, mergedData);
	  }
	  (0, _state.initState)(this);
	
	  console.debug('[JS Framework] "created" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:created');
	  this._created = true;
	
	  // backward old ready entry
	  if (options.methods && options.methods.ready) {
	    console.warn('"exports.methods.ready" is deprecated, ' + 'please use "exports.created" instead');
	    options.methods.ready.call(this);
	  }
	
	  // if no parentElement then specify the documentElement
	  this._parentEl = parentEl || this._app.doc.documentElement;
	  (0, _compiler.build)(this);
	} /**
	   * @fileOverview
	   * ViewModel Constructor & definition
	   */
	
	(0, _events.mixinEvents)(Vm.prototype);
	
	(0, _util.extend)(Vm, {
	  registerModules: _register.registerModules,
	  registerMethods: _register.registerMethods
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initState = initState;
	exports.initData = initData;
	exports.initComputed = initComputed;
	exports.initMethods = initMethods;
	
	var _watcher = __webpack_require__(91);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _dep = __webpack_require__(93);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _observer = __webpack_require__(94);
	
	var _util = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	function initState(vm) {
	  vm._watchers = [];
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	}
	
	function initData(vm) {
	  var data = vm._data;
	
	  if (!(0, _util.isPlainObject)(data)) {
	    data = {};
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    (0, _observer.proxy)(vm, keys[i]);
	  }
	  // observe data
	  (0, _observer.observe)(data, vm);
	}
	
	function noop() {}
	
	function initComputed(vm) {
	  var computed = vm._computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, vm);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _util.bind)(userDef.get, vm) : noop;
	        def.set = userDef.set ? (0, _util.bind)(userDef.set, vm) : noop;
	      }
	      Object.defineProperty(vm, key, def);
	    }
	  }
	}
	
	function makeComputedGetter(getter, owner) {
	  var watcher = new _watcher2.default(owner, getter, null, {
	    lazy: true
	  });
	  return function computedGetter() {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (_dep2.default.target) {
	      watcher.depend();
	    }
	    return watcher.value;
	  };
	}
	
	function initMethods(vm) {
	  var methods = vm._methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key];
	    }
	  }
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Watcher;
	
	var _dep = __webpack_require__(93);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _util = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	var uid = 0;
	// import { pushWatcher } from './batcher'
	
	var prevTarget = void 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    (0, _util.extend)(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _util._Set();
	  this.newDepIds = new _util._Set();
	  // parse expression for getter
	  if (isFn) {
	    this.getter = expOrFn;
	  } else {
	    this.getter = (0, _util.parsePath)(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && (0, _util.warn)('Failed watching path: ' + expOrFn + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	    }
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  prevTarget = _dep2.default.target;
	  _dep2.default.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  _dep2.default.target = prevTarget;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else {
	    this.run();
	  }
	  // } else if (this.sync) {
	  //   this.run()
	  // } else {
	  //   // if queued, only overwrite shallow with non-shallow,
	  //   // but not the other way around.
	  //   this.shallow = this.queued
	  //     ? shallow
	  //       ? this.shallow
	  //       : false
	  //     : !!shallow
	  //   this.queued = true
	  //   pushWatcher(this)
	  // }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    ((0, _util.isObject)(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      this.cb.call(this.vm, value, oldValue);
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = _dep2.default.target;
	  this.value = this.get();
	  this.dirty = false;
	  _dep2.default.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      (0, _util.remove)(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 * @param {Set} seen
	 */
	
	var seenObjects = new _util._Set();
	function traverse(val, seen) {
	  var i = void 0,
	      keys = void 0,
	      isA = void 0,
	      isO = void 0;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  isA = Array.isArray(val);
	  isO = (0, _util.isObject)(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i], seen);
	      }
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        traverse(val[keys[i]], seen);
	      }
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92)))

/***/ },
/* 92 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dep;
	
	var _util = __webpack_require__(84);
	
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Dep() {
	  this.id = uid++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  (0, _util.remove)(this.subs, sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = Observer;
	exports.observe = observe;
	exports.defineReactive = defineReactive;
	exports.set = set;
	exports.del = del;
	exports.proxy = proxy;
	exports.unproxy = unproxy;
	
	var _dep = __webpack_require__(93);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _array = __webpack_require__(95);
	
	var _util = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new _dep2.default();
	  (0, _util.def)(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = _util.hasProto ? protoAugment : copyAugment;
	    augment(value, _array.arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  for (var key in obj) {
	    this.convert(key, obj[key]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  (0, _util.remove)(this.vms, vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    (0, _util.def)(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!(0, _util.isObject)(value)) {
	    return;
	  }
	  var ob = void 0;
	  if ((0, _util.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((Array.isArray(value) || (0, _util.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (_dep2.default.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	function set(obj, key, val) {
	  if (Array.isArray(obj)) {
	    return obj.splice(key, 1, val);
	  }
	  if ((0, _util.hasOwn)(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      proxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!(0, _util.hasOwn)(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj.$forceUpdate();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      unproxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	}
	
	var KEY_WORDS = ['$index', '$value', '$event'];
	function proxy(vm, key) {
	  if (KEY_WORDS.indexOf(key) > -1 || !(0, _util.isReserved)(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter() {
	        return vm._data[key];
	      },
	      set: function proxySetter(val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	function unproxy(vm, key) {
	  if (!(0, _util.isReserved)(key)) {
	    delete vm[key];
	  }
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.arrayMethods = undefined;
	
	var _util = __webpack_require__(84);
	
	var arrayProto = Array.prototype; /* eslint-disable */
	
	var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  (0, _util.def)(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted = void 0;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	(0, _util.def)(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	(0, _util.def)(arrayProto, '$remove', function $remove(index) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  if (typeof index !== 'number') {
	    index = this.indexOf(index);
	  }
	  if (index > -1) {
	    this.splice(index, 1);
	  }
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.build = build;
	
	var _util = __webpack_require__(84);
	
	var _state = __webpack_require__(90);
	
	var _directive = __webpack_require__(97);
	
	var _domHelper = __webpack_require__(99);
	
	/**
	 * build(externalDirs)
	 *   createVm()
	 *   merge(externalDirs, dirs)
	 *   compile(template, parentNode)
	 *     if (type is content) create contentNode
	 *     else if (dirs have v-for) foreach -> create context
	 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
	 *     else if (dirs have v-if) assert
	 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
	 *     else if (type is dynamic)
	 *       -> compile(templateWithoutDynamicType, parentNode): watch(type) onchange
	 *     else if (type is custom)
	 *       addChildVm(vm, parentVm)
	 *       build(externalDirs)
	 *       foreach childNodes -> compile(childNode, template)
	 *     else if (type is native)
	 *       set(dirs): update(id/attr/style/class) onchange
	 *       append(template, parentNode)
	 *       foreach childNodes -> compile(childNode, template)
	 */
	/**
	 * @fileOverview
	 * ViewModel template parser & data-binding process
	 *
	 * required:
	 * index.js: Vm
	 * dom-helper.js: createElement, createBlock
	 * dom-helper.js: attachTarget, moveTarget, removeTarget
	 * directive.js: bindElement, bindSubVm, setId, watch
	 * events.js: $on
	 */
	
	function build(vm) {
	  var opt = vm._options || {};
	  var template = opt.template || {};
	
	  if (opt.replace) {
	    if (template.children && template.children.length === 1) {
	      compile(vm, template.children[0], vm._parentEl);
	    } else {
	      compile(vm, template.children, vm._parentEl);
	    }
	  } else {
	    compile(vm, template, vm._parentEl);
	  }
	
	  console.debug('[JS Framework] "ready" lifecycle in Vm(' + vm._type + ')');
	  vm.$emit('hook:ready');
	  vm._ready = true;
	}
	
	/**
	 * Generate elements by child or children and append to parent elements.
	 * Root element info would be merged if has. The first argument may be an array
	 * if the root element with options.replace has not only one child.
	 *
	 * @param {object|array} target
	 * @param {object}       dest
	 * @param {object}       meta
	 */
	function compile(vm, target, dest, meta) {
	  var app = vm._app || {};
	
	  if (app.lastSignal === -1) {
	    return;
	  }
	
	  if (targetIsFragment(target)) {
	    compileFragment(vm, target, dest, meta);
	    return;
	  }
	  meta = meta || {};
	  if (targetIsContent(target)) {
	    console.debug('[JS Framework] compile "content" block by', target);
	    vm._content = (0, _domHelper.createBlock)(vm, dest);
	    return;
	  }
	
	  if (targetNeedCheckRepeat(target, meta)) {
	    console.debug('[JS Framework] compile "repeat" logic by', target);
	    compileRepeat(vm, target, dest);
	    return;
	  }
	  if (targetNeedCheckShown(target, meta)) {
	    console.debug('[JS Framework] compile "if" logic by', target);
	    compileShown(vm, target, dest, meta);
	    return;
	  }
	  var typeGetter = meta.type || target.type;
	  if (targetNeedCheckType(typeGetter, meta)) {
	    compileType(vm, target, dest, typeGetter, meta);
	    return;
	  }
	  var type = typeGetter;
	  var component = targetIsComposed(vm, target, type);
	  if (component) {
	    console.debug('[JS Framework] compile composed component by', target);
	    compileCustomComponent(vm, component, target, dest, type, meta);
	    return;
	  }
	  console.debug('[JS Framework] compile native component by', target);
	  compileNativeComponent(vm, target, dest, type);
	}
	
	/**
	 * Check if target is a fragment (an array).
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function targetIsFragment(target) {
	  return Array.isArray(target);
	}
	
	/**
	 * Check if target type is content/slot.
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function targetIsContent(target) {
	  return target.type === 'content' || target.type === 'slot';
	}
	
	/**
	 * Check if target need to compile by a list.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function targetNeedCheckRepeat(target, meta) {
	  return !meta.hasOwnProperty('repeat') && target.repeat;
	}
	
	/**
	 * Check if target need to compile by a boolean value.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function targetNeedCheckShown(target, meta) {
	  return !meta.hasOwnProperty('shown') && target.shown;
	}
	
	/**
	 * Check if target need to compile by a dynamic type.
	 *
	 * @param  {string|function} typeGetter
	 * @param  {object}          meta
	 * @return {boolean}
	 */
	function targetNeedCheckType(typeGetter, meta) {
	  return typeof typeGetter === 'function' && !meta.hasOwnProperty('type');
	}
	
	/**
	 * Check if this kind of component is composed.
	 *
	 * @param  {string}  type
	 * @return {boolean}
	 */
	function targetIsComposed(vm, target, type) {
	  var component = void 0;
	  if (vm._app && vm._app.customComponentMap) {
	    component = vm._app.customComponentMap[type];
	  }
	  if (vm._options && vm._options.components) {
	    component = vm._options.components[type];
	  }
	  if (target.component) {
	    component = component || {};
	  }
	  return component;
	}
	
	/**
	 * Compile a list of targets.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function compileFragment(vm, target, dest, meta) {
	  var fragBlock = (0, _domHelper.createBlock)(vm, dest);
	  target.forEach(function (child) {
	    compile(vm, child, fragBlock, meta);
	  });
	}
	
	/**
	 * Compile a target with repeat directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 */
	function compileRepeat(vm, target, dest) {
	  var repeat = target.repeat;
	  var oldStyle = typeof repeat === 'function';
	  var getter = repeat.getter || repeat.expression || repeat;
	  if (typeof getter !== 'function') {
	    getter = function getter() {
	      return [];
	    };
	  }
	  var key = repeat.key || '$index';
	  var value = repeat.value || '$value';
	  var trackBy = repeat.trackBy || target.trackBy || target.attr && target.attr.trackBy;
	
	  var fragBlock = (0, _domHelper.createBlock)(vm, dest);
	  fragBlock.children = [];
	  fragBlock.data = [];
	  fragBlock.vms = [];
	
	  bindRepeat(vm, target, fragBlock, { getter: getter, key: key, value: value, trackBy: trackBy, oldStyle: oldStyle });
	}
	
	/**
	 * Compile a target with if directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function compileShown(vm, target, dest, meta) {
	  var newMeta = { shown: true };
	  var fragBlock = (0, _domHelper.createBlock)(vm, dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  if (meta.repeat) {
	    newMeta.repeat = meta.repeat;
	  }
	
	  bindShown(vm, target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a target with dynamic component type.
	 *
	 * @param {object}   target
	 * @param {object}   dest
	 * @param {function} typeGetter
	 */
	function compileType(vm, target, dest, typeGetter, meta) {
	  var type = typeGetter.call(vm);
	  var newMeta = (0, _util.extend)({ type: type }, meta);
	  var fragBlock = (0, _domHelper.createBlock)(vm, dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  (0, _directive.watch)(vm, typeGetter, function (value) {
	    var newMeta = (0, _util.extend)({ type: value }, meta);
	    (0, _domHelper.removeTarget)(vm, fragBlock, true);
	    compile(vm, target, fragBlock, newMeta);
	  });
	
	  compile(vm, target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a composed component.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {string} type
	 */
	function compileCustomComponent(vm, component, target, dest, type, meta) {
	  var Ctor = vm.constructor;
	  var subVm = new Ctor(type, component, vm, dest, undefined, {
	    'hook:init': function hookInit() {
	      (0, _directive.setId)(vm, null, target.id, this);
	      // bind template earlier because of lifecycle issues
	      this._externalBinding = {
	        parent: vm,
	        template: target
	      };
	    },
	    'hook:created': function hookCreated() {
	      (0, _directive.bindSubVm)(vm, this, target, meta.repeat);
	    },
	    'hook:ready': function hookReady() {
	      if (this._content) {
	        compileChildren(vm, target, this._content);
	      }
	    }
	  });
	  (0, _directive.bindSubVmAfterInitialized)(vm, subVm, target);
	}
	
	/**
	 * Generate element from template and attach to the dest if needed.
	 * The time to attach depends on whether the mode status is node or tree.
	 *
	 * @param {object} template
	 * @param {object} dest
	 * @param {string} type
	 */
	function compileNativeComponent(vm, template, dest, type) {
	  (0, _directive.applyNaitveComponentOptions)(template);
	
	  var element = void 0;
	  if (dest.ref === '_documentElement') {
	    // if its parent is documentElement then it's a body
	    console.debug('[JS Framework] compile to create body for ' + type);
	    element = (0, _domHelper.createBody)(vm, type);
	  } else {
	    console.debug('[JS Framework] compile to create element for ' + type);
	    element = (0, _domHelper.createElement)(vm, type);
	  }
	
	  if (!vm._rootEl) {
	    vm._rootEl = element;
	    // bind event earlier because of lifecycle issues
	    var binding = vm._externalBinding || {};
	    var target = binding.template;
	    var parentVm = binding.parent;
	    if (target && target.events && parentVm && element) {
	      for (var _type in target.events) {
	        var handler = parentVm[target.events[_type]];
	        if (handler) {
	          element.addEvent(_type, (0, _util.bind)(handler, parentVm));
	        }
	      }
	    }
	  }
	
	  (0, _directive.bindElement)(vm, element, template);
	
	  if (template.attr && template.attr.append) {
	    // backward, append prop in attr
	    template.append = template.attr.append;
	  }
	
	  if (template.append) {
	    // give the append attribute for ios adaptation
	    element.attr = element.attr || {};
	    element.attr.append = template.append;
	  }
	
	  var treeMode = template.append === 'tree';
	  var app = vm._app || {};
	  if (app.lastSignal !== -1 && !treeMode) {
	    console.debug('[JS Framework] compile to append single node for', element);
	    app.lastSignal = (0, _domHelper.attachTarget)(vm, element, dest);
	  }
	  if (app.lastSignal !== -1) {
	    compileChildren(vm, template, element);
	  }
	  if (app.lastSignal !== -1 && treeMode) {
	    console.debug('[JS Framework] compile to append whole tree for', element);
	    app.lastSignal = (0, _domHelper.attachTarget)(vm, element, dest);
	  }
	}
	
	/**
	 * Set all children to a certain parent element.
	 *
	 * @param {object} template
	 * @param {object} dest
	 */
	function compileChildren(vm, template, dest) {
	  var app = vm._app || {};
	  var children = template.children;
	  if (children && children.length) {
	    children.every(function (child) {
	      compile(vm, child, dest);
	      return app.lastSignal !== -1;
	    });
	  }
	}
	
	/**
	 * Watch the list update and refresh the changes.
	 *
	 * @param {object} target
	 * @param {object} fragBlock {vms, data, children}
	 * @param {object} info      {getter, key, value, trackBy, oldStyle}
	 */
	function bindRepeat(vm, target, fragBlock, info) {
	  var vms = fragBlock.vms;
	  var children = fragBlock.children;
	  var getter = info.getter;
	  var trackBy = info.trackBy;
	  var oldStyle = info.oldStyle;
	
	  var keyName = info.key;
	  var valueName = info.value;
	
	  function compileItem(item, index, context) {
	    var mergedData = void 0;
	    if (oldStyle) {
	      mergedData = item;
	      if ((0, _util.isObject)(item)) {
	        mergedData[keyName] = index;
	        if (!mergedData.hasOwnProperty('INDEX')) {
	          Object.defineProperty(mergedData, 'INDEX', {
	            value: function value() {
	              console.warn('[JS Framework] "INDEX" in repeat is deprecated, ' + 'please use "$index" instead');
	            }
	          });
	        }
	      } else {
	        console.warn('[JS Framework] Each list item must be an object in old-style repeat, ' + 'please use `repeat={{v in list}}` instead.');
	        mergedData = {};
	        mergedData[keyName] = index;
	        mergedData[valueName] = item;
	      }
	    } else {
	      mergedData = {};
	      mergedData[keyName] = index;
	      mergedData[valueName] = item;
	    }
	    var newContext = mergeContext(context, mergedData);
	    vms.push(newContext);
	    compile(newContext, target, fragBlock, { repeat: item });
	  }
	
	  var list = watchBlock(vm, fragBlock, getter, 'repeat', function (data) {
	    console.debug('[JS Framework] the "repeat" item has changed', data);
	    if (!fragBlock) {
	      return;
	    }
	
	    var oldChildren = children.slice();
	    var oldVms = vms.slice();
	    var oldData = fragBlock.data.slice();
	    // 1. collect all new refs track by
	    var trackMap = {};
	    var reusedMap = {};
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      /* istanbul ignore if */
	      if (key == null || key === '') {
	        return;
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldData.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      if (trackMap.hasOwnProperty(key)) {
	        reusedMap[key] = {
	          item: item, index: index, key: key,
	          target: oldChildren[index],
	          vm: oldVms[index]
	        };
	        reusedList.push(item);
	      } else {
	        (0, _domHelper.removeTarget)(vm, oldChildren[index]);
	      }
	    });
	
	    // 3. create new element foreach new item
	    children.length = 0;
	    vms.length = 0;
	    fragBlock.data = data.slice();
	    fragBlock.updateMark = fragBlock.start;
	
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      var reused = reusedMap[key];
	      if (reused) {
	        if (reused.item === reusedList[0]) {
	          reusedList.shift();
	        } else {
	          reusedList.$remove(reused.item);
	          (0, _domHelper.moveTarget)(vm, reused.target, fragBlock.updateMark, true);
	        }
	        children.push(reused.target);
	        vms.push(reused.vm);
	        if (oldStyle) {
	          reused.vm = item;
	        } else {
	          reused.vm[valueName] = item;
	        }
	        reused.vm[keyName] = index;
	        fragBlock.updateMark = reused.target;
	      } else {
	        compileItem(item, index, vm);
	      }
	    });
	
	    delete fragBlock.updateMark;
	  });
	
	  fragBlock.data = list.slice(0);
	  list.forEach(function (item, index) {
	    compileItem(item, index, vm);
	  });
	}
	
	/**
	 * Watch the display update and add/remove the element.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 * @param  {object} context
	 */
	function bindShown(vm, target, fragBlock, meta) {
	  var display = watchBlock(vm, fragBlock, target.shown, 'shown', function (display) {
	    console.debug('[JS Framework] the "if" item was changed', display);
	
	    if (!fragBlock || !!fragBlock.display === !!display) {
	      return;
	    }
	    fragBlock.display = !!display;
	    if (display) {
	      compile(vm, target, fragBlock, meta);
	    } else {
	      (0, _domHelper.removeTarget)(vm, fragBlock, true);
	    }
	  });
	
	  fragBlock.display = !!display;
	  if (display) {
	    compile(vm, target, fragBlock, meta);
	  }
	}
	
	/**
	 * Watch calc value changes and append certain type action to differ.
	 * It is used for if or repeat data-binding generator.
	 *
	 * @param  {object}   fragBlock
	 * @param  {function} calc
	 * @param  {string}   type
	 * @param  {function} handler
	 * @return {any}      init value of calc
	 */
	function watchBlock(vm, fragBlock, calc, type, handler) {
	  var differ = vm && vm._app && vm._app.differ;
	  var config = {};
	  var depth = (fragBlock.element.depth || 0) + 1;
	
	  return (0, _directive.watch)(vm, calc, function (value) {
	    config.latestValue = value;
	    if (differ && !config.recorded) {
	      differ.append(type, depth, fragBlock.blockId, function () {
	        var latestValue = config.latestValue;
	        handler(latestValue);
	        config.recorded = false;
	        config.latestValue = undefined;
	      });
	    }
	    config.recorded = true;
	  });
	}
	
	/**
	 * Clone a context and merge certain data.
	 *
	 * @param  {object} mergedData
	 * @return {object}
	 */
	function mergeContext(context, mergedData) {
	  var newContext = Object.create(context);
	  newContext._data = mergedData;
	  (0, _state.initData)(newContext);
	  (0, _state.initComputed)(newContext);
	  newContext._realParent = context;
	  return newContext;
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * Directive Parser
	                                                                                                                                                                                                                                                   */
	
	exports.applyNaitveComponentOptions = applyNaitveComponentOptions;
	exports.bindElement = bindElement;
	exports.bindSubVm = bindSubVm;
	exports.bindSubVmAfterInitialized = bindSubVmAfterInitialized;
	exports.setId = setId;
	exports.watch = watch;
	
	var _util = __webpack_require__(84);
	
	var _watcher = __webpack_require__(91);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _config = __webpack_require__(98);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	
	var SETTERS = {
	  attr: 'setAttr',
	  style: 'setStyle',
	  event: 'addEvent'
	};
	
	/**
	 * apply the native component's options(specified by template.type)
	 * to the template
	 */
	function applyNaitveComponentOptions(template) {
	  var type = template.type;
	
	  var options = nativeComponentMap[type];
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    for (var key in options) {
	      if (template[key] == null) {
	        template[key] = options[key];
	      } else if ((0, _util.typof)(template[key]) === 'object' && (0, _util.typof)(options[key]) === 'object') {
	        for (var subkey in options[key]) {
	          if (template[key][subkey] == null) {
	            template[key][subkey] = options[key][subkey];
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * bind all id, attr, classnames, style, events to an element
	 */
	function bindElement(vm, el, template) {
	  setId(vm, el, template.id, vm);
	  setAttr(vm, el, template.attr);
	  setClass(vm, el, template.classList);
	  setStyle(vm, el, template.style);
	  bindEvents(vm, el, template.events);
	}
	
	/**
	 * bind all props to sub vm and bind all style, events to the root element
	 * of the sub vm if it doesn't have a replaced multi-node fragment
	 */
	function bindSubVm(vm, subVm, template, repeatItem) {
	  subVm = subVm || {};
	  template = template || {};
	
	  var options = subVm._options || {};
	
	  // bind props
	  var props = options.props;
	
	  if (Array.isArray(props)) {
	    props = props.reduce(function (result, value) {
	      result[value] = true;
	      return result;
	    }, {});
	  }
	
	  mergeProps(repeatItem, props, vm, subVm);
	  mergeProps(template.attr, props, vm, subVm);
	}
	
	function bindSubVmAfterInitialized(vm, subVm, template) {
	  mergeClassStyle(template.classList, vm, subVm);
	  mergeStyle(template.style, vm, subVm);
	}
	
	function mergeProps(target, props, vm, subVm) {
	  if (!target) {
	    return;
	  }
	
	  var _loop = function _loop(key) {
	    if (!props || props[key]) {
	      var value = target[key];
	      if (typeof value === 'function') {
	        var returnValue = watch(vm, value, function (v) {
	          subVm[key] = v;
	        });
	        subVm[key] = returnValue;
	      } else {
	        subVm[key] = value;
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop(key);
	  }
	}
	
	function mergeStyle(target, vm, subVm) {
	  var _loop2 = function _loop2(key) {
	    var value = target[key];
	    if (typeof value === 'function') {
	      var returnValue = watch(vm, value, function (v) {
	        if (subVm._rootEl) {
	          subVm._rootEl.setStyle(key, v);
	        }
	      });
	      subVm._rootEl.setStyle(key, returnValue);
	    } else {
	      if (subVm._rootEl) {
	        subVm._rootEl.setStyle(key, value);
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop2(key);
	  }
	}
	
	function mergeClassStyle(target, vm, subVm) {
	  var css = vm._options && vm._options.style || {};
	
	  /* istanbul ignore if */
	  if (!subVm._rootEl) {
	    return;
	  }
	
	  if (typeof target === 'function') {
	    var _value = watch(vm, target, function (v) {
	      setClassStyle(subVm._rootEl, css, v);
	    });
	    setClassStyle(subVm._rootEl, css, _value);
	  } else if (target != null) {
	    setClassStyle(subVm._rootEl, css, target);
	  }
	}
	
	/**
	 * bind id to an element
	 * each id is unique in a whole vm
	 */
	function setId(vm, el, id, target) {
	  var map = Object.create(null);
	
	  Object.defineProperties(map, {
	    vm: {
	      value: target,
	      writable: false,
	      configurable: false
	    },
	    el: {
	      get: function get() {
	        return el || target._rootEl;
	      },
	      configurable: false
	    }
	  });
	
	  if (typeof id === 'function') {
	    var handler = id;
	    id = handler.call(vm);
	    if (id) {
	      vm._ids[id] = map;
	    }
	    watch(vm, handler, function (newId) {
	      if (newId) {
	        vm._ids[newId] = map;
	      }
	    });
	  } else if (id && typeof id === 'string') {
	    vm._ids[id] = map;
	  }
	}
	
	/**
	 * bind attr to an element
	 */
	function setAttr(vm, el, attr) {
	  bindDir(vm, el, 'attr', attr);
	}
	
	function setClassStyle(el, css, classList) {
	  var classStyle = {};
	  var length = classList.length;
	
	  for (var i = 0; i < length; i++) {
	    var style = css[classList[i]];
	    if (style) {
	      for (var key in style) {
	        classStyle[key] = style[key];
	      }
	    }
	  }
	  el.setClassStyle(classStyle);
	}
	
	/**
	 * bind classnames to an element
	 */
	function setClass(vm, el, classList) {
	  if (typeof classList !== 'function' && !Array.isArray(classList)) {
	    return;
	  }
	  if (Array.isArray(classList) && !classList.length) {
	    el.setClassStyle({});
	    return;
	  }
	
	  var style = vm._options && vm._options.style || {};
	  if (typeof classList === 'function') {
	    var _value2 = watch(vm, classList, function (v) {
	      setClassStyle(el, style, v);
	    });
	    setClassStyle(el, style, _value2);
	  } else {
	    setClassStyle(el, style, classList);
	  }
	}
	
	/**
	 * bind style to an element
	 */
	function setStyle(vm, el, style) {
	  bindDir(vm, el, 'style', style);
	}
	
	/**
	 * add an event type and handler to an element and generate a dom update
	 */
	function setEvent(vm, el, type, handler) {
	  el.addEvent(type, (0, _util.bind)(handler, vm));
	}
	
	/**
	 * add all events of an element
	 */
	function bindEvents(vm, el, events) {
	  if (!events) {
	    return;
	  }
	  var keys = Object.keys(events);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var handler = events[key];
	    if (typeof handler === 'string') {
	      handler = vm[handler];
	      /* istanbul ignore if */
	      if (!handler) {
	        console.debug('[JS Framework] The method "' + handler + '" is not defined.');
	      }
	    }
	    setEvent(vm, el, key, handler);
	  }
	}
	
	/**
	 * set a series of members as a kind of an element
	 * for example: style, attr, ...
	 * if the value is a function then bind the data changes
	 */
	function bindDir(vm, el, name, data) {
	  if (!data) {
	    return;
	  }
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var _value3 = data[key];
	    if (typeof _value3 === 'function') {
	      bindKey(vm, el, name, key, _value3);
	    } else {
	      el[SETTERS[name]](key, _value3);
	    }
	  }
	}
	
	/**
	 * bind data changes to a certain key to a name series in an element
	 */
	function bindKey(vm, el, name, key, calc) {
	  var methodName = SETTERS[name];
	  // watch the calc, and returns a value by calc.call()
	  var value = watch(vm, calc, function (value) {
	    function handler() {
	      el[methodName](key, value);
	    }
	    var differ = vm && vm._app && vm._app.differ;
	    if (differ) {
	      differ.append('element', el.depth, el.ref, handler);
	    } else {
	      handler();
	    }
	  });
	
	  el[methodName](key, value);
	}
	
	/**
	 * watch a calc function and callback if the calc value changes
	 */
	function watch(vm, calc, callback) {
	  var watcher = new _watcher2.default(vm, calc, function (value, oldValue) {
	    /* istanbul ignore if */
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && value === oldValue) {
	      return;
	    }
	    callback(value);
	  });
	
	  return watcher.value;
	}

/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  nativeComponentMap: {
	    text: true,
	    image: true,
	    container: true,
	    slider: {
	      type: 'slider',
	      append: 'tree'
	    },
	    cell: {
	      type: 'cell',
	      append: 'tree'
	    }
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.createBody = createBody;
	exports.createElement = createElement;
	exports.createBlock = createBlock;
	exports.attachTarget = attachTarget;
	exports.moveTarget = moveTarget;
	exports.removeTarget = removeTarget;
	/**
	 * @fileOverview Document & Element Helpers.
	 *
	 * required:
	 * Document#: createElement, createComment, getRef
	 * Element#: appendChild, insertBefore, removeChild, nextSibling
	 */
	
	/**
	 * Create a body by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function createBody(vm, type) {
	  var doc = vm._app.doc;
	  return doc.createBody(type);
	}
	
	/**
	 * Create an element by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function createElement(vm, type) {
	  var doc = vm._app.doc;
	  return doc.createElement(type);
	}
	
	/**
	 * Create and return a frag block for an element.
	 * The frag block has a starter, ender and the element itself.
	 *
	 * @param  {object} element
	 */
	function createBlock(vm, element) {
	  var start = createBlockStart(vm);
	  var end = createBlockEnd(vm);
	  var blockId = lastestBlockId++;
	  if (element.element) {
	    var updateMark = element.updateMark;
	    if (updateMark) {
	      if (updateMark.element) {
	        updateMark = updateMark.end;
	      }
	      element.element.insertAfter(end, updateMark);
	      element.element.insertAfter(start, updateMark);
	      element.updateMark = end;
	    } else {
	      element.element.insertBefore(start, element.end);
	      element.element.insertBefore(end, element.end);
	    }
	    element = element.element;
	  } else {
	    element.appendChild(start);
	    element.appendChild(end);
	  }
	  return { start: start, end: end, element: element, blockId: blockId };
	}
	
	var lastestBlockId = 1;
	
	/**
	 * Create and return a block starter.
	 * Using this._app.doc
	 */
	function createBlockStart(vm) {
	  var doc = vm._app.doc;
	  var anchor = doc.createComment('start');
	  return anchor;
	}
	
	/**
	 * Create and return a block ender.
	 * Using this._app.doc
	 */
	function createBlockEnd(vm) {
	  var doc = vm._app.doc;
	  var anchor = doc.createComment('end');
	  return anchor;
	}
	
	/**
	 * Attach target to a certain dest using appendChild by default.
	 * If the dest is a frag block then insert before the ender.
	 * If the target is a frag block then attach the starter and ender in order.
	 *
	 * @param  {object} target
	 * @param  {object} dest
	 */
	function attachTarget(vm, target, dest) {
	  if (dest.element) {
	    var before = dest.end;
	    var after = dest.updateMark;
	    // push new target for watch list update later
	    if (dest.children) {
	      dest.children.push(target);
	    }
	    // for check repeat case
	    if (after) {
	      var signal = moveTarget(vm, target, after);
	      dest.updateMark = target.element ? target.end : target;
	      return signal;
	    } else if (target.element) {
	      dest.element.insertBefore(target.start, before);
	      dest.element.insertBefore(target.end, before);
	    } else {
	      return dest.element.insertBefore(target, before);
	    }
	  } else {
	    if (target.element) {
	      dest.appendChild(target.start);
	      dest.appendChild(target.end);
	    } else {
	      return dest.appendChild(target);
	    }
	  }
	}
	
	/**
	 * Move target before a certain element. The target maybe block or element.
	 *
	 * @param  {object} target
	 * @param  {object} before
	 */
	function moveTarget(vm, target, after) {
	  if (target.element) {
	    return moveBlock(target, after);
	  }
	  return moveElement(target, after);
	}
	
	/**
	 * Move element before a certain element.
	 *
	 * @param  {object} element
	 * @param  {object} before
	 */
	function moveElement(element, after) {
	  var parent = after.parentNode;
	  if (parent) {
	    return parent.insertAfter(element, after);
	  }
	}
	
	/**
	 * Move all elements of the block before a certain element.
	 *
	 * @param  {object} fragBlock
	 * @param  {object} before
	 */
	function moveBlock(fragBlock, after) {
	  var parent = after.parentNode;
	
	  if (parent) {
	    var _ret = function () {
	      var el = fragBlock.start;
	      var signal = void 0;
	      var group = [el];
	
	      while (el && el !== fragBlock.end) {
	        el = el.nextSibling;
	        group.push(el);
	      }
	
	      var temp = after;
	      group.every(function (el) {
	        signal = parent.insertAfter(el, temp);
	        temp = el;
	        return signal !== -1;
	      });
	
	      return {
	        v: signal
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	
	/**
	 * Remove target from DOM tree.
	 * If the target is a frag block then call _removeBlock
	 *
	 * @param  {object} target
	 */
	function removeTarget(vm, target) {
	  var preserveBlock = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	  if (target.element) {
	    removeBlock(target, preserveBlock);
	  } else {
	    removeElement(target);
	  }
	}
	
	/**
	 * Remove a certain element.
	 * Using this._app.doc
	 *
	 * @param  {object} target
	 */
	function removeElement(target) {
	  var parent = target.parentNode;
	
	  if (parent) {
	    parent.removeChild(target);
	  }
	}
	
	/**
	 * Remove a frag block.
	 * The second param decides whether the block self should be removed too.
	 *
	 * @param  {object}  fragBlock
	 * @param  {Boolean} preserveBlock=false
	 */
	function removeBlock(fragBlock) {
	  var preserveBlock = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var result = [];
	  var el = fragBlock.start.nextSibling;
	
	  while (el && el !== fragBlock.end) {
	    result.push(el);
	    el = el.nextSibling;
	  }
	
	  if (!preserveBlock) {
	    removeElement(fragBlock.start);
	  }
	  result.forEach(function (el) {
	    removeElement(el);
	  });
	  if (!preserveBlock) {
	    removeElement(fragBlock.end);
	  }
	}

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$emit = $emit;
	exports.$dispatch = $dispatch;
	exports.$broadcast = $broadcast;
	exports.$on = $on;
	exports.$off = $off;
	exports.initEvents = initEvents;
	exports.mixinEvents = mixinEvents;
	function Evt(type, detail) {
	  if (detail instanceof Evt) {
	    return detail;
	  }
	
	  this.timestamp = Date.now();
	  this.detail = detail;
	  this.type = type;
	
	  var shouldStop = false;
	  this.stop = function () {
	    shouldStop = true;
	  };
	  this.hasStopped = function () {
	    return shouldStop;
	  };
	}
	
	function $emit(type, detail) {
	  var _this = this;
	
	  var events = this._vmEvents;
	  var handlerList = events[type];
	  if (handlerList) {
	    (function () {
	      var evt = new Evt(type, detail);
	      handlerList.forEach(function (handler) {
	        handler.call(_this, evt);
	      });
	    })();
	  }
	}
	
	function $dispatch(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
	    this._parent.$dispatch(type, evt);
	  }
	}
	
	function $broadcast(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._childrenVms) {
	    this._childrenVms.forEach(function (subVm) {
	      subVm.$broadcast(type, evt);
	    });
	  }
	}
	
	function $on(type, handler) {
	  if (!type || typeof handler !== 'function') {
	    return;
	  }
	  var events = this._vmEvents;
	  var handlerList = events[type] || [];
	  handlerList.push(handler);
	  events[type] = handlerList;
	
	  // fixed old version lifecycle design
	  if (type === 'hook:ready' && this._ready) {
	    this.$emit('hook:ready');
	  }
	}
	
	function $off(type, handler) {
	  if (!type) {
	    return;
	  }
	  var events = this._vmEvents;
	  if (!handler) {
	    delete events[type];
	    return;
	  }
	  var handlerList = events[type];
	  if (!handlerList) {
	    return;
	  }
	  handlerList.$remove(handler);
	}
	
	var LIFE_CYCLE_TYPES = ['init', 'created', 'ready'];
	
	function initEvents(vm, externalEvents) {
	  var options = vm._options || {};
	  var events = options.events || {};
	  for (var type1 in events) {
	    vm.$on(type1, events[type1]);
	  }
	  for (var type2 in externalEvents) {
	    vm.$on(type2, externalEvents[type2]);
	  }
	  LIFE_CYCLE_TYPES.forEach(function (type) {
	    vm.$on('hook:' + type, options[type]);
	  });
	}
	
	function mixinEvents(vm) {
	  vm.$emit = $emit;
	  vm.$dispatch = $dispatch;
	  vm.$broadcast = $broadcast;
	  vm.$on = $on;
	  vm.$off = $off;
	}

/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearModules = clearModules;
	exports.getModule = getModule;
	exports.requireModule = requireModule;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.requireComponent = requireComponent;
	exports.registerComponent = registerComponent;
	var nativeModules = {};
	
	function assignModules(modules, ifReplace) {
	  var _loop = function _loop(moduleName) {
	    // init `modules[moduleName][]`
	    var methods = nativeModules[moduleName];
	    if (!methods) {
	      methods = {};
	      nativeModules[moduleName] = methods;
	    }
	
	    // push each non-existed new method
	    modules[moduleName].forEach(function (method) {
	      if (typeof method === 'string') {
	        method = {
	          name: method
	        };
	      }
	
	      if (!methods[method.name] || ifReplace) {
	        methods[method.name] = method;
	      }
	    });
	  };
	
	  for (var moduleName in modules) {
	    _loop(moduleName);
	  }
	}
	
	function assignApis(Ctor, apis) {
	  var p = Ctor.prototype;
	
	  for (var apiName in apis) {
	    if (!p.hasOwnProperty(apiName)) {
	      p[apiName] = apis[apiName];
	    }
	  }
	}
	
	function clearModules() {
	  nativeModules = {};
	}
	
	function getModule(moduleName) {
	  return nativeModules[moduleName];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireModule(moduleName) {
	  var _this = this;
	
	  var methods = nativeModules[moduleName];
	  var target = {};
	
	  var _loop2 = function _loop2(methodName) {
	    target[methodName] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _this.callTasks({
	        module: moduleName,
	        method: methodName,
	        args: args
	      });
	    };
	  };
	
	  for (var methodName in methods) {
	    _loop2(methodName);
	  }
	
	  return target;
	}
	
	/**
	 * @context Vm
	 */
	function registerModules(modules, ifReplace) {
	  assignModules(modules, ifReplace);
	}
	
	/**
	 * @context Vm
	 */
	function registerMethods(apis) {
	  assignApis(this, apis);
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireComponent(name) {
	  var customComponentMap = this.customComponentMap;
	
	  return customComponentMap[name];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function registerComponent(name, def) {
	  var customComponentMap = this.customComponentMap;
	
	
	  if (customComponentMap[name]) {
	    console.error('[JS Framework] define a component(' + name + ') that already exists');
	    return;
	  }
	
	  customComponentMap[name] = def;
	}

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeWeexPrefix = removeWeexPrefix;
	exports.removeJSSurfix = removeJSSurfix;
	var WEEX_COMPONENT_REG = /^@weex-component\//;
	var WEEX_MODULE_REG = /^@weex-module\//;
	var NORMAL_MODULE_REG = /^\.{1,2}\//;
	var JS_SURFIX_REG = /\.js$/;
	
	var isWeexComponent = exports.isWeexComponent = function isWeexComponent(name) {
	  return !!name.match(WEEX_COMPONENT_REG);
	};
	var isWeexModule = exports.isWeexModule = function isWeexModule(name) {
	  return !!name.match(WEEX_MODULE_REG);
	};
	var isNormalModule = exports.isNormalModule = function isNormalModule(name) {
	  return !!name.match(NORMAL_MODULE_REG);
	};
	var isNpmModule = exports.isNpmModule = function isNpmModule(name) {
	  return !isWeexComponent(name) && !isWeexModule(name) && !isNormalModule(name);
	};
	
	function removeWeexPrefix(str) {
	  return str.replace(WEEX_COMPONENT_REG, '').replace(WEEX_MODULE_REG, '');
	}
	
	function removeJSSurfix(str) {
	  return str.replace(JS_SURFIX_REG, '');
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	exports.clearCommonModules = clearCommonModules;
	exports.register = register;
	
	var _util = __webpack_require__(84);
	
	var _vm = __webpack_require__(89);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _misc = __webpack_require__(102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var commonModules = {};
	
	function clearCommonModules() {
	  commonModules = {};
	}
	
	// define(name, factory) for primary usage
	// or
	// define(name, deps, factory) for compatibility
	// Notice: DO NOT use function define() {},
	// it will cause error after builded by webpack
	var define = exports.define = function define(name, deps, factory) {
	  var _this = this;
	
	  console.debug('[JS Framework] define a component ' + name);
	
	  if ((0, _util.typof)(deps) === 'function') {
	    factory = deps;
	    deps = [];
	  }
	
	  var _require = function _require(name) {
	    var cleanName = void 0;
	
	    if ((0, _misc.isWeexComponent)(name)) {
	      cleanName = (0, _misc.removeWeexPrefix)(name);
	      return _this.requireComponent(cleanName);
	    }
	    if ((0, _misc.isWeexModule)(name)) {
	      cleanName = (0, _misc.removeWeexPrefix)(name);
	      return _this.requireModule(cleanName);
	    }
	    if ((0, _misc.isNormalModule)(name)) {
	      cleanName = (0, _misc.removeJSSurfix)(name);
	      return commonModules[name];
	    }
	    if ((0, _misc.isNpmModule)(name)) {
	      cleanName = (0, _misc.removeJSSurfix)(name);
	      return commonModules[name];
	    }
	  };
	  var _module = { exports: {} };
	
	  var cleanName = void 0;
	  if ((0, _misc.isWeexComponent)(name)) {
	    cleanName = (0, _misc.removeWeexPrefix)(name);
	
	    factory(_require, _module.exports, _module);
	
	    this.registerComponent(cleanName, _module.exports);
	  } else if ((0, _misc.isWeexModule)(name)) {
	    cleanName = (0, _misc.removeWeexPrefix)(name);
	
	    factory(_require, _module.exports, _module);
	
	    _vm2.default.registerModules(_defineProperty({}, cleanName, _module.exports));
	  } else if ((0, _misc.isNormalModule)(name)) {
	    cleanName = (0, _misc.removeJSSurfix)(name);
	
	    factory(_require, _module.exports, _module);
	
	    commonModules[cleanName] = _module.exports;
	  } else if ((0, _misc.isNpmModule)(name)) {
	    cleanName = (0, _misc.removeJSSurfix)(name);
	
	    factory(_require, _module.exports, _module);
	
	    var exports = _module.exports;
	    if (exports.template || exports.style || exports.methods) {
	      // downgrade to old define method (define('componentName', factory))
	      // the exports contain one key of template, style or methods
	      // but it has risk!!!
	      this.registerComponent(cleanName, exports);
	    } else {
	      commonModules[cleanName] = _module.exports;
	    }
	  }
	};
	
	/**
	 * @deprecated
	 */
	function register(type, options) {
	  console.warn('[JS Framework] Register is deprecated, please install lastest transformer.');
	  this.registerComponent(type, options);
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateActions = updateActions;
	exports.destroy = destroy;
	exports.getRootElement = getRootElement;
	exports.fireEvent = fireEvent;
	exports.callback = callback;
	exports.refreshData = refreshData;
	
	var _util = __webpack_require__(84);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * @fileOverview
	                                                                                                                                                                                                     * instance controls from native
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * - fire event
	                                                                                                                                                                                                     * - callback
	                                                                                                                                                                                                     * - destroy
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * corresponded with the API of instance manager (framework.js)
	                                                                                                                                                                                                     */
	
	
	function updateActions() {
	  this.differ.flush();
	  var tasks = [];
	  if (this.doc && this.doc.listener && this.doc.listener.updates.length) {
	    tasks.push.apply(tasks, _toConsumableArray(this.doc.listener.updates));
	    this.doc.listener.updates = [];
	  }
	  if (tasks.length) {
	    return this.callTasks(tasks);
	  }
	}
	
	function destroy() {
	  console.debug('[JS Framework] Destory an instance(' + this.id + ')');
	
	  this.id = '';
	  this.options = null;
	  this.blocks = null;
	  this.vm = null;
	  this.doc = null;
	  this.customComponentMap = null;
	  this.callbacks = null;
	}
	
	function getRootElement() {
	  var doc = this.doc || {};
	  var body = doc.body || {};
	  return body.toJSON ? body.toJSON() : {};
	}
	
	function fireEvent(ref, type, e, domChanges) {
	  var _this = this;
	
	  console.debug('[JS Framework] Fire a "' + type + '" event on an element(' + ref + ') in instance(' + this.id + ')');
	  if (Array.isArray(ref)) {
	    ref.some(function (ref) {
	      return _this.fireEvent(ref, type, e) !== false;
	    });
	    return;
	  }
	
	  var el = this.doc.getRef(ref);
	
	  if (el) {
	    this.doc.close();
	    var result = this.doc.fireEvent(el, type, e, domChanges);
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return result;
	  }
	
	  return new Error('invalid element reference "' + ref + '"');
	}
	
	function callback(callbackId, data, ifKeepAlive) {
	  console.debug('[JS Framework] Invoke a callback(' + callbackId + ') with', data, 'in instance(' + this.id + ')');
	
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    this.doc.close();
	    callback(data); // data is already a object, @see: lib/runtime/index.js
	
	    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
	      this.callbacks[callbackId] = undefined;
	    }
	
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid callback id "' + callbackId + '"');
	}
	
	function refreshData(data) {
	  console.debug('[JS Framework] Refresh with', data, 'in instance[' + this.id + ']');
	
	  var vm = this.vm;
	
	  if (vm && data) {
	    this.doc.close();
	    if (typeof vm.refreshData === 'function') {
	      vm.refreshData(data);
	    } else {
	      (0, _util.extend)(vm, data);
	    }
	    this.updateActions();
	    this.doc.listener.refreshFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid data "' + data + '"');
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AppInstance;
	
	var _util = __webpack_require__(84);
	
	var _differ = __webpack_require__(106);
	
	var _differ2 = _interopRequireDefault(_differ);
	
	var _config = __webpack_require__(98);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _register = __webpack_require__(101);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function AppInstance(instanceId, options) {
	  this.id = instanceId;
	  this.options = options || {};
	  this.vm = null;
	  this.customComponentMap = {};
	  this.callbacks = {};
	  this.doc = new _config2.default.Document(instanceId, this.options.bundleUrl, null, _config2.default.Listener);
	  this.differ = new _differ2.default(instanceId);
	  this.uid = 0;
	}
	
	function normalize(app, v) {
	  var type = (0, _util.typof)(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	      if (v instanceof _config2.default.Element) {
	        return v.ref;
	      }
	      return v;
	    case 'function':
	      app.callbacks[++app.uid] = v;
	      return app.uid.toString();
	    default:
	      return JSON.stringify(v);
	  }
	}
	
	AppInstance.prototype.callTasks = function (tasks) {
	  var _this = this;
	
	  if ((0, _util.typof)(tasks) !== 'array') {
	    tasks = [tasks];
	  }
	
	  tasks.forEach(function (task) {
	    task.args = task.args.map(function (arg) {
	      return normalize(_this, arg);
	    });
	  });
	
	  return _config2.default.sendTasks(this.id, tasks, '-1');
	};
	
	(0, _util.extend)(AppInstance.prototype, {
	  registerComponent: _register.registerComponent,
	  requireComponent: _register.requireComponent,
	  requireModule: _register.requireModule
	});

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Differ = function () {
	  function Differ(id) {
	    _classCallCheck(this, Differ);
	
	    this.id = id;
	    this.map = [];
	    this.hooks = [];
	  }
	
	  _createClass(Differ, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.map.length === 0;
	    }
	  }, {
	    key: 'append',
	    value: function append(type, depth, ref, handler) {
	      var _this = this;
	
	      if (!this.hasTimer) {
	        this.hasTimer = true;
	        setTimeout(function () {
	          _this.hasTimer = false;
	          _this.flush(true);
	        }, 0);
	      }
	      var map = this.map;
	      if (!map[depth]) {
	        map[depth] = {};
	      }
	      var group = map[depth];
	      if (!group[type]) {
	        group[type] = {};
	      }
	      if (type === 'element') {
	        if (!group[type][ref]) {
	          group[type][ref] = [];
	        }
	        group[type][ref].push(handler);
	      } else {
	        group[type][ref] = handler;
	      }
	    }
	  }, {
	    key: 'flush',
	    value: function flush(isTimeout) {
	      var map = this.map.slice();
	      this.map.length = 0;
	      map.forEach(function (group) {
	        callTypeMap(group, 'repeat');
	        callTypeMap(group, 'shown');
	        callTypeList(group, 'element');
	      });
	
	      var hooks = this.hooks.slice();
	      this.hooks.length = 0;
	      hooks.forEach(function (fn) {
	        fn();
	      });
	
	      if (!this.isEmpty()) {
	        this.flush();
	      }
	    }
	  }, {
	    key: 'then',
	    value: function then(fn) {
	      this.hooks.push(fn);
	    }
	  }]);
	
	  return Differ;
	}();
	
	exports.default = Differ;
	
	
	function callTypeMap(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    map[ref]();
	  }
	}
	
	function callTypeList(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    var list = map[ref];
	    list.forEach(function (handler) {
	      handler();
	    });
	  }
	}

/***/ },
/* 107 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var instanceMap = exports.instanceMap = {};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	exports.refreshInstance = refreshInstance;
	exports.destroyInstance = destroyInstance;
	
	var _config = __webpack_require__(98);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _map = __webpack_require__(107);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init(cfg) {
	  _config2.default.Document = cfg.Document;
	  _config2.default.Element = cfg.Element;
	  _config2.default.Comment = cfg.Comment;
	  _config2.default.sendTasks = cfg.sendTasks;
	  _config2.default.Listener = cfg.Listener;
	}
	
	/**
	 * refresh a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {object} data
	 */
	function refreshInstance(instanceId, data) {
	  var instance = _map.instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.refreshData(data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	/**
	 * destroy a Weex instance
	 * @param  {string} instanceId
	 */
	function destroyInstance(instanceId) {
	  var instance = _map.instanceMap[instanceId];
	  if (!instance) {
	    return new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  instance.destroy();
	  delete _map.instanceMap[instanceId];
	  return _map.instanceMap;
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.registerComponents = registerComponents;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	
	var _vm = __webpack_require__(89);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _config = __webpack_require__(98);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	/**
	 * register the name of each native component
	 * @param  {array} components array of name
	 */
	
	function registerComponents(components) {
	  if (Array.isArray(components)) {
	    components.forEach(function register(name) {
	      /* istanbul ignore if */
	      if (!name) {
	        return;
	      }
	      if (typeof name === 'string') {
	        nativeComponentMap[name] = true;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && typeof name.type === 'string') {
	        nativeComponentMap[name.type] = name;
	      }
	    });
	  }
	}
	
	/**
	 * register the name and methods of each module
	 * @param  {object} modules a object of modules
	 */
	function registerModules(modules) {
	  if ((typeof modules === 'undefined' ? 'undefined' : _typeof(modules)) === 'object') {
	    _vm2.default.registerModules(modules);
	  }
	}
	
	/**
	 * register the name and methods of each api
	 * @param  {object} apis a object of apis
	 */
	function registerMethods(apis) {
	  if ((typeof apis === 'undefined' ? 'undefined' : _typeof(apis)) === 'object') {
	    _vm2.default.registerMethods(apis);
	  }
	}
	global.registerMethods = registerMethods;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.receiveTasks = receiveTasks;
	
	var _map = __webpack_require__(107);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var jsHandlers = {
	  fireEvent: function fireEvent(instanceId, ref, type, data, domChanges) {
	    var instance = _map.instanceMap[instanceId];
	    return instance.fireEvent(ref, type, data, domChanges);
	  },
	
	  callback: function callback(instanceId, funcId, data, ifLast) {
	    var instance = _map.instanceMap[instanceId];
	    return instance.callback(funcId, data, ifLast);
	  }
	};
	
	/**
	 * accept calls from native (event or callback)
	 *
	 * @param  {string} instanceId
	 * @param  {array} tasks list with `method` and `args`
	 */
	function receiveTasks(instanceId, tasks) {
	  var instance = _map.instanceMap[instanceId];
	  if (instance && Array.isArray(tasks)) {
	    var _ret = function () {
	      var results = [];
	      tasks.forEach(function (task) {
	        var handler = jsHandlers[task.method];
	        var args = [].concat(_toConsumableArray(task.args));
	        if (typeof handler === 'function') {
	          args.unshift(instanceId);
	          results.push(handler.apply(undefined, _toConsumableArray(args)));
	        }
	      });
	      return {
	        v: results
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return new Error('invalid instance id "' + instanceId + '" or tasks');
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRoot = getRoot;
	
	var _map = __webpack_require__(107);
	
	/**
	 * get a whole element tree of an instance
	 * for debugging
	 * @param  {string} instanceId
	 * @return {object} a virtual dom tree
	 */
	function getRoot(instanceId) {
	  var instance = _map.instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.getRootElement();
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.instanceMap = undefined;
	exports.Document = Document;
	exports.Node = Node;
	exports.Element = Element;
	exports.Comment = Comment;
	
	var _utils = __webpack_require__(8);
	
	var DEFAULT_TAG_NAME = 'div'; /**
	                               * @fileOverview
	                               * A simple virtual dom implementation
	                               */
	// import { extend } from '../shared'
	
	
	var instanceMap = exports.instanceMap = {};
	var nextNodeRef = 1;
	
	function Document(id, url, handler, Listener) {
	  id = id ? id.toString() : '';
	  this.id = id;
	  this.URL = url;
	
	  instanceMap[id] = this;
	  this.nodeMap = {};
	  Listener && (this.listener = new Listener(id, handler || genCallTasks(id)));
	  this.createDocumentElement();
	}
	
	function genCallTasks(id) {
	  return function (tasks) {
	    if (!Array.isArray(tasks)) {
	      tasks = [tasks];
	    }
	    return callNative(id, tasks, '-1');
	  };
	}
	
	Document.prototype.destroy = function () {
	  delete this.listener;
	  delete this.nodeMap;
	  delete instanceMap[this.id];
	};
	
	Document.prototype.open = function () {
	  this.listener.batched = false;
	};
	
	Document.prototype.close = function () {
	  this.listener.batched = true;
	};
	
	Document.prototype.createDocumentElement = function () {
	  var _this = this;
	
	  if (!this.documentElement) {
	    var el = new Element('document');
	    el.docId = this.id;
	    el.ownerDocument = this;
	    el.role = 'documentElement';
	    el.depth = 0;
	    el.ref = '_documentElement';
	    this.nodeMap._documentElement = el;
	    this.documentElement = el;
	    el.appendChild = function (node) {
	      appendBody(_this, node);
	    };
	    el.insertBefore = function (node, before) {
	      appendBody(_this, node, before);
	    };
	  }
	
	  return this.documentElement;
	};
	
	function appendBody(doc, node, before) {
	  var documentElement = doc.documentElement;
	
	
	  if (documentElement.pureChildren.length > 0 || node.parentNode) {
	    return;
	  }
	  var children = documentElement.children;
	  var beforeIndex = children.indexOf(before);
	  if (beforeIndex < 0) {
	    children.push(node);
	  } else {
	    children.splice(beforeIndex, 0, node);
	  }
	
	  if (node.nodeType === 1) {
	    if (node.role === 'body') {
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      node.parentNode = documentElement;
	    } else {
	      node.children.forEach(function (child) {
	        child.parentNode = node;
	      });
	      setBody(doc, node);
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      linkParent(node, documentElement);
	      delete doc.nodeMap[node.nodeId];
	    }
	    documentElement.pureChildren.push(node);
	    doc.listener.createBody(node);
	  } else {
	    node.parentNode = documentElement;
	    doc.nodeMap[node.ref] = node;
	  }
	}
	
	function setBody(doc, el) {
	  el.role = 'body';
	  el.depth = 1;
	  delete doc.nodeMap[el.nodeId];
	  el.ref = '_root';
	  doc.nodeMap._root = el;
	  doc.body = el;
	}
	
	Document.prototype.createBody = function (type, props) {
	  if (!this.body) {
	    var el = new Element(type, props);
	    setBody(this, el);
	  }
	
	  return this.body;
	};
	
	Document.prototype.createElement = function (tagName, props) {
	  return new Element(tagName, props);
	};
	
	Document.prototype.createComment = function (text) {
	  return new Comment(text);
	};
	
	Document.prototype.fireEvent = function (el, type, e, domChanges) {
	  if (!el) {
	    return;
	  }
	  e = e || {};
	  e.type = type;
	  e.target = el;
	  e.timestamp = Date.now();
	  if (domChanges) {
	    updateElement(el, domChanges);
	  }
	  return el.fireEvent(type, e);
	};
	
	Document.prototype.getRef = function (ref) {
	  return this.nodeMap[ref];
	};
	
	function updateElement(el, changes) {
	  var attrs = changes.attrs || {};
	  for (var name in attrs) {
	    el.setAttr(name, attrs[name], true);
	  }
	  var style = changes.style || {};
	  for (var _name in style) {
	    el.setStyle(_name, style[_name], true);
	  }
	}
	
	function Node() {
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.children = [];
	  this.pureChildren = [];
	  this.parentNode = null;
	  this.nextSibling = null;
	  this.previousSibling = null;
	}
	
	Node.prototype.destroy = function () {
	  var doc = instanceMap[this.docId];
	  if (doc) {
	    delete this.docId;
	    delete doc.nodeMap[this.nodeId];
	  }
	  this.children.forEach(function (child) {
	    child.destroy();
	  });
	};
	
	function Element() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_TAG_NAME : arguments[0];
	  var props = arguments[1];
	
	  props = props || {};
	  this.nodeType = 1;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = type;
	  this.attr = props.attr || {};
	  this.classStyle = props.classStyle || {};
	  this.style = props.style || {};
	  this.event = {};
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Element.prototype = new Node();
	
	Element.prototype.appendChild = function (node) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.length, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      insertIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, -1);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.length, true);
	    if (node.nodeType === 1) {
	      var index = moveIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId && index >= 0) {
	        var _listener = instanceMap[this.docId].listener;
	        return _listener.moveElement(node.ref, this.ref, index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertBefore = function (node, before) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === before || node.nextSibling === before) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(before), true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var pureBefore = nextElement(before);
	      var index = insertIndex(node, this.pureChildren, pureBefore ? this.pureChildren.indexOf(pureBefore) : this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(before), true);
	    if (node.nodeType === 1) {
	      var _pureBefore = nextElement(before);
	      var _index = moveIndex(node, this.pureChildren, _pureBefore ? this.pureChildren.indexOf(_pureBefore) : this.pureChildren.length);
	      if (this.docId && _index >= 0) {
	        var _listener2 = instanceMap[this.docId].listener;
	        return _listener2.moveElement(node.ref, this.ref, _index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertAfter = function (node, after) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === after || node.previousSibling === after) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var index = insertIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (node.nodeType === 1) {
	      var _index2 = moveIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId && _index2 >= 0) {
	        var _listener3 = instanceMap[this.docId].listener;
	        return _listener3.moveElement(node.ref, this.ref, _index2);
	      }
	    }
	  }
	};
	
	Element.prototype.removeChild = function (node, preserved) {
	  if (node.parentNode) {
	    removeIndex(node, this.children, true);
	    if (node.nodeType === 1) {
	      removeIndex(node, this.pureChildren);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        listener.removeElement(node.ref);
	      }
	    }
	  }
	  if (!preserved) {
	    node.destroy();
	  }
	};
	
	Element.prototype.clear = function () {
	  var _this2 = this;
	
	  if (this.docId) {
	    (function () {
	      var listener = instanceMap[_this2.docId].listener;
	      _this2.pureChildren.forEach(function (node) {
	        listener.removeElement(node.ref);
	      });
	    })();
	  }
	  this.children.forEach(function (node) {
	    node.destroy();
	  });
	  this.children.length = 0;
	  this.pureChildren.length = 0;
	};
	
	function nextElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.nextSibling;
	  }
	}
	
	function previousElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.previousSibling;
	  }
	}
	
	function linkParent(node, parent) {
	  node.parentNode = parent;
	  if (parent.docId) {
	    node.docId = parent.docId;
	    node.ownerDocument = parent.ownerDocument;
	    node.ownerDocument.nodeMap[node.nodeId] = node;
	    node.depth = parent.depth + 1;
	  }
	  node.children.forEach(function (child) {
	    linkParent(child, node);
	  });
	}
	
	function registerNode(docId, node) {
	  var doc = instanceMap[docId];
	  doc.nodeMap[node.nodeId] = node;
	}
	
	function insertIndex(target, list, newIndex, changeSibling) {
	  if (newIndex < 0) {
	    newIndex = 0;
	  }
	  var before = list[newIndex - 1];
	  var after = list[newIndex];
	  list.splice(newIndex, 0, target);
	  if (changeSibling) {
	    before && (before.nextSibling = target);
	    target.previousSibling = before;
	    target.nextSibling = after;
	    after && (after.previousSibling = target);
	  }
	  return newIndex;
	}
	
	function moveIndex(target, list, newIndex, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return -1;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	  var newIndexAfter = newIndex;
	  if (index <= newIndex) {
	    newIndexAfter = newIndex - 1;
	  }
	  var beforeNew = list[newIndexAfter - 1];
	  var afterNew = list[newIndexAfter];
	  list.splice(newIndexAfter, 0, target);
	  if (changeSibling) {
	    beforeNew && (beforeNew.nextSibling = target);
	    target.previousSibling = beforeNew;
	    target.nextSibling = afterNew;
	    afterNew && (afterNew.previousSibling = target);
	  }
	  if (index === newIndexAfter) {
	    return -1;
	  }
	  return newIndex;
	}
	
	function removeIndex(target, list, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	}
	
	Element.prototype.setAttr = function (key, value, silent) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  this.attr[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setAttr(this.ref, key, value);
	  }
	};
	
	Element.prototype.setStyle = function (key, value, silent) {
	  if (this.style[key] === value) {
	    return;
	  }
	  this.style[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyle(this.ref, key, value);
	  }
	};
	
	Element.prototype.setClassStyle = function (classStyle) {
	  this.classStyle = classStyle;
	  if (this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyles(this.ref, this.toStyle());
	  }
	};
	
	Element.prototype.addEvent = function (type, handler) {
	  if (!this.event[type]) {
	    this.event[type] = handler;
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.addEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.removeEvent = function (type) {
	  if (this.event[type]) {
	    delete this.event[type];
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.removeEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.fireEvent = function (type, e) {
	  var handler = this.event[type];
	  if (handler) {
	    return handler.call(this, e);
	  }
	};
	
	Element.prototype.toStyle = function () {
	  return (0, _utils.extend)({}, this.classStyle, this.style);
	};
	
	Element.prototype.toJSON = function () {
	  var result = {
	    ref: this.ref.toString(),
	    type: this.type,
	    attr: this.attr,
	    style: this.toStyle()
	  };
	  var event = Object.keys(this.event);
	  if (event.length) {
	    result.event = event;
	  }
	  if (this.pureChildren.length) {
	    result.children = this.pureChildren.map(function (child) {
	      return child.toJSON();
	    });
	  }
	  return result;
	};
	
	Element.prototype.toString = function () {
	  return '<' + this.type + ' attr=' + JSON.stringify(this.attr) + ' style=' + JSON.stringify(this.toStyle()) + '>' + this.pureChildren.map(function (child) {
	    return child.toString();
	  }).join('') + '</' + this.type + '>';
	};
	
	function Comment(value) {
	  this.nodeType = 8;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = 'comment';
	  this.value = value;
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Comment.prototype = new Node();
	
	Comment.prototype.toString = function () {
	  return '<!-- ' + this.value + ' -->';
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$ = $;
	exports.$el = $el;
	exports.$vm = $vm;
	exports.$renderThen = $renderThen;
	exports.$scrollTo = $scrollTo;
	exports.$transition = $transition;
	exports.$getConfig = $getConfig;
	exports.$sendHttp = $sendHttp;
	exports.$openURL = $openURL;
	exports.$setTitle = $setTitle;
	exports.$call = $call;
	
	var _util = __webpack_require__(84);
	
	/**
	 * ==========================================================
	 * common
	 * ==========================================================
	 */
	
	/**
	 * @deprecated use $vm instead
	 * find the vm by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $(id) {
	  console.warn('[JS Framework] Vm#$ is deprecated, please use Vm#$vm instead');
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * find the element by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Element}
	 */
	/**
	 * @fileOverview The api for invoking with "$" prefix
	 */
	function $el(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.el;
	  }
	}
	
	/**
	 * find the vm of the custom component by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $vm(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * Fire when differ rendering finished
	 *
	 * @param  {Function} fn
	 */
	function $renderThen(fn) {
	  var app = this._app;
	  var differ = app.differ;
	  return differ.then(function () {
	    fn();
	  });
	}
	
	/**
	 * scroll an element specified by id into view,
	 * moreover specify a number of offset optionally
	 * @param  {string} id
	 * @param  {number} offset
	 */
	function $scrollTo(id, offset) {
	  console.warn('[JS Framework] Vm#$scrollTo is deprecated, ' + 'please use "require(\'@weex-module/dom\')' + '.scrollTo(el, options)" instead');
	  var el = this.$el(id);
	  if (el) {
	    var dom = this._app.requireModule('dom');
	    dom.scrollToElement(el.ref, { offset: offset });
	  }
	}
	
	/**
	 * perform transition animation on an element specified by id
	 * @param  {string}   id
	 * @param  {object}   options
	 * @param  {object}   options.styles
	 * @param  {object}   options.duration(ms)
	 * @param  {object}   [options.timingFunction]
	 * @param  {object}   [options.delay=0(ms)]
	 * @param  {Function} callback
	 */
	function $transition(id, options, callback) {
	  var _this = this;
	
	  var el = this.$el(id);
	  if (el && options && options.styles) {
	    var animation = this._app.requireModule('animation');
	    animation.transition(el.ref, options, function () {
	      _this._setStyle(el, options.styles);
	      callback && callback.apply(undefined, arguments);
	    });
	  }
	}
	
	/**
	 * get some config
	 * @return {object} some config for app instance
	 * @property {string} bundleUrl
	 * @property {boolean} debug
	 * @property {object} env
	 * @property {string} env.weexVersion(ex. 1.0.0)
	 * @property {string} env.appName(ex. TB/TM)
	 * @property {string} env.appVersion(ex. 5.0.0)
	 * @property {string} env.platform(ex. iOS/Android)
	 * @property {string} env.osVersion(ex. 7.0.0)
	 * @property {string} env.deviceModel **native only**
	 * @property {number} env.[deviceWidth=750]
	 * @property {number} env.deviceHeight
	 */
	function $getConfig(callback) {
	  var config = (0, _util.extend)({
	    env: global.WXEnvironment || {}
	  }, this._app.options);
	  if ((0, _util.typof)(callback) === 'function') {
	    console.warn('[JS Framework] the callback of Vm#$getConfig(callback) is deprecated, ' + 'this api now can directly RETURN config info.');
	    callback(config);
	  }
	  return config;
	}
	
	/**
	 * @deprecated
	 * request network via http protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendHttp(params, callback) {
	  console.warn('[JS Framework] Vm#$sendHttp is deprecated, ' + 'please use "require(\'@weex-module/stream\')' + '.sendHttp(params, callback)" instead');
	  var stream = this._app.requireModule('stream');
	  stream.sendHttp(params, callback);
	}
	
	/**
	 * @deprecated
	 * open a url
	 * @param  {string} url
	 */
	function $openURL(url) {
	  console.warn('[JS Framework] Vm#$openURL is deprecated, ' + 'please use "require(\'@weex-module/event\')' + '.openURL(url)" instead');
	  var event = this._app.requireModule('event');
	  event.openURL(url);
	}
	
	/**
	 * @deprecated
	 * set a title for page
	 * @param  {string} title
	 */
	function $setTitle(title) {
	  console.warn('[JS Framework] Vm#$setTitle is deprecated, ' + 'please use "require(\'@weex-module/pageInfo\')' + '.setTitle(title)" instead');
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setTitle(title);
	}
	
	/**
	 * @deprecated use "require('@weex-module/moduleName') instead"
	 * invoke a native method by specifing the name of module and method
	 * @param  {string} moduleName
	 * @param  {string} methodName
	 * @param  {...*} the rest arguments
	 */
	function $call(moduleName, methodName) {
	  console.warn('[JS Framework] Vm#$call is deprecated, ' + 'please use "require(\'@weex-module/moduleName\')" instead');
	  var module = this._app.requireModule(moduleName);
	  if (module && module[methodName]) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    module[methodName].apply(module, args);
	  }
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/* global Event */
	
	'use strict';
	
	// const FrameUpdater = require('./frameUpdater')
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ComponentManager;
	
	var _appearWatcher = __webpack_require__(115);
	
	var _utils = __webpack_require__(83);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// const lazyload = require('./lazyload')
	// const animation = require('./animation')
	
	var RENDERING_INDENT = 800;
	
	var _instanceMap = {};
	var typeMap = {};
	var scrollableTypes = ['scroller', 'hscroller', 'vscroller', 'list', 'hlist', 'vlist'];
	
	function ComponentManager(id) {
	  this.id = id;
	  this.batched = false;
	  this.updates = [];
	  this.componentMap = {};
	  _instanceMap[this.id] = this;
	}
	
	ComponentManager.getInstance = function (instanceId) {
	  return _instanceMap[instanceId];
	};
	
	ComponentManager.registerComponent = function (type, definition) {
	  typeMap[type] = definition;
	};
	
	ComponentManager.getScrollableTypes = function () {
	  return scrollableTypes;
	};
	
	ComponentManager.prototype = {
	  getWeexInstance: function getWeexInstance() {
	    if (!this._weexInstance) {
	      this._weexInstance = global.weex ? global.weex.getInstance(this.id) : null;
	    }
	    return this._weexInstance;
	  },
	
	
	  // Fire a event 'renderbegin'/'renderend' on body element.
	  rendering: function rendering() {
	    function _renderingEnd() {
	      // get weex instance root
	      window.dispatchEvent(new Event('renderend'));
	      this._renderingTimer = null;
	    }
	    if (this._renderingTimer) {
	      clearTimeout(this._renderingTimer);
	      this._renderingTimer = setTimeout(_renderingEnd.bind(this), RENDERING_INDENT);
	    } else {
	      window.dispatchEvent(new Event('renderbegin'));
	      this._renderingTimer = setTimeout(_renderingEnd.bind(this), RENDERING_INDENT);
	    }
	  },
	  getComponent: function getComponent(ref) {
	    return this.componentMap[ref];
	  },
	  removeComponent: function removeComponent(ref) {
	    var self = this;
	    if (!ref || !this.componentMap[ref]) {
	      return;
	    }
	    // remove from this.componentMap cursively
	    (function _removeCursively(_ref) {
	      var child = self.componentMap[_ref];
	      var listeners = child._listeners;
	      var children = child.data.children;
	      if (children && children.length) {
	        for (var i = 0, l = children.length; i < l; i++) {
	          _removeCursively(children[i].ref);
	        }
	      }
	      // remove events from _ref component
	      if (listeners) {
	        for (var type in listeners) {
	          child.node.removeEventListener(type, listeners[type]);
	        }
	      }
	      delete child._listeners;
	      delete child.node._listeners;
	      // remove _ref component
	      delete self.componentMap[_ref];
	    })(ref);
	  },
	  createElement: function createElement(data, nodeType) {
	    var ComponentType = typeMap[data.type];
	    if (!ComponentType) {
	      ComponentType = typeMap['div'];
	    }
	
	    data.instanceId = this.id;
	    data.scale = this.getWeexInstance().scale;
	    var component = new ComponentType(data, nodeType);
	    var ref = data.ref;
	    this.componentMap[ref] = component;
	    component.node.setAttribute('data-ref', ref);
	
	    return component;
	  },
	
	
	  /**
	   * createBody: generate root component
	   * @param  {object} element
	   */
	  createBody: function createBody(element) {
	    console.log('[h5-render] createBody', element);
	    if (this.componentMap['_root']) {
	      return;
	    }
	    element = element.toJSON();
	
	    var nodeType = element.type;
	    element.type = 'root';
	    element.rootId = this.getWeexInstance().rootId;
	    element.ref = '_root';
	
	    var root = this.createElement(element, nodeType);
	    var body = document.querySelector('#' + this.getWeexInstance().rootId) || document.body;
	    body.appendChild(root.node);
	    root._appended = true;
	
	    this.handleAppend(root);
	  },
	  appendChild: function appendChild(parentRef, data) {
	    var parent = this.componentMap[parentRef];
	
	    if (this.componentMap[data.ref] || !parent) {
	      return;
	    }
	
	    if (parentRef === '_root' && !parent) {
	      parent = this.createElement({
	        type: 'root',
	        rootId: this.getWeexInstance().rootId,
	        ref: '_root'
	      });
	      parent._appended = true;
	    }
	
	    var child = parent.appendChild(data);
	
	    // In some parent component the implementation of method
	    // appendChild didn't return the component at all, therefor
	    // child maybe a undefined object.
	    if (child) {
	      child.parentRef = parentRef;
	    }
	
	    if (child && parent._appended) {
	      this.handleAppend(child);
	    }
	  },
	
	
	  // appendChildren (ref, elements) {
	  //   for (let i = 0; i < elements.length; i++) {
	  //     this.appendChild(ref, elements[i])
	  //   }
	  // },
	
	  removeElement: function removeElement(ref) {
	    var _this = this;
	
	    if ((0, _utils.isArray)(ref)) {
	      return ref.map(function (r) {
	        return _this.removeElement(r);
	      });
	    }
	    var component = this.componentMap[ref];
	    // fire event for rendering dom on body elment.
	    this.rendering();
	
	    if (component && component.parentRef) {
	      var parent = this.componentMap[component.parentRef];
	      component.onRemove && component.onRemove();
	      parent.removeChild(component);
	    } else if (!component) {
	      console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    } else {
	      console.error('[h5-render] parent component \'' + component.parentRef + '\' does not exist.');
	    }
	  },
	  moveElement: function moveElement(ref, parentRef, index) {
	    var component = this.componentMap[ref];
	    var newParent = this.componentMap[parentRef];
	    var oldParentRef = component.parentRef;
	    var children = void 0,
	        before = void 0,
	        i = void 0,
	        l = void 0;
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    if (!newParent) {
	      return console.error('[h5-render] parent component \'' + parentRef + '\' does not exist.');
	    }
	
	    if (index < -1) {
	      index = -1;
	      return console.error('[h5-render] index cannot be less than -1.');
	    }
	
	    // fire event for rendering.
	    this.rendering();
	
	    children = newParent.data.children;
	    if (children && children.length && index !== -1 && index < children.length) {
	      before = this.componentMap[newParent.data.children[index].ref];
	    }
	
	    // remove from oldParent.data.children
	    if (oldParentRef && this.componentMap[oldParentRef]) {
	      children = this.componentMap[oldParentRef].data.children;
	      if (children && children.length) {
	        for (i = 0, l = children.length; i < l; i++) {
	          if (children[i].ref === ref) {
	            break;
	          }
	        }
	        if (l > i) {
	          children.splice(i, 1);
	        }
	      }
	    }
	
	    newParent.insertBefore(component, before);
	
	    component.onMove && component.onMove(parentRef, index);
	  },
	  insertBefore: function insertBefore(ref, data) {
	    var child = void 0,
	        parent = void 0;
	    var before = this.componentMap[ref];
	    child = this.componentMap[data.ref];
	    before && (parent = this.componentMap[before.parentRef]);
	    if (child || !parent || !before) {
	      return;
	    }
	
	    child = this.createElement(data);
	    if (child) {
	      child.parentRef = before.parentRef;
	      parent.insertBefore(child, before);
	    } else {
	      return;
	    }
	
	    if (this.componentMap[before.parentRef]._appended) {
	      this.handleAppend(child);
	    }
	  },
	
	
	  /**
	   * addElement
	   * If index is larget than any child's index, the
	   * element will be appended behind.
	   * @param {string} parentRef
	   * @param {obj} element (data of the component)
	   * @param {number} index
	   */
	  addElement: function addElement(element, parentRef, index) {
	    // fire event for rendering dom on body elment.
	    element = element.toJSON();
	    this.rendering();
	
	    var parent = this.componentMap[parentRef];
	    if (!parent) {
	      return;
	    }
	    var children = parent.data.children;
	    // -1 means append as the last.
	    if (index < -1) {
	      index = -1;
	      return console.error('[h5-render] index cannot be less than -1.');
	    }
	    if (children && children.length && children.length > index && index !== -1) {
	      this.insertBefore(children[index].ref, element);
	    } else {
	      this.appendChild(parentRef, element);
	    }
	  },
	  addEvent: function addEvent(ref, type) {
	    var component = this.componentMap[ref];
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    component.bindEvents([type]);
	  },
	  removeEvent: function removeEvent(ref, type) {
	    var component = this.componentMap[ref];
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    component.unbindEvents([type]);
	  },
	  setAttr: function setAttr(ref, key, value) {
	    var component = this.componentMap[ref];
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    component.updateAttrs(_defineProperty({}, key, value));
	    // if (component.data.type === 'image' && key === 'src') {
	    //  component.fire
	    //  lazyload.startIfNeeded(component)
	    // }
	  },
	  setStyle: function setStyle(ref, key, value) {
	    var component = this.componentMap[ref];
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    component.updateStyle(_defineProperty({}, key, value));
	  },
	  setStyles: function setStyles(ref, style) {
	    var component = this.componentMap[ref];
	    if (!component) {
	      return console.error('[h5-render] component of ref \'' + ref + '\' does not exist.');
	    }
	    component.updateStyle(style);
	  },
	  handleAppend: function handleAppend(component) {
	    component._appended = true;
	    component.onAppend && component.onAppend();
	
	    // invoke onAppend on children recursively
	    var children = component.data.children;
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        var child = this.componentMap[children[i].ref];
	        if (child) {
	          this.handleAppend(child);
	        }
	      }
	    }
	
	    // watch appear/disappear of the component if needed
	    (0, _appearWatcher.watchIfNeeded)(component);
	
	    // do lazyload if needed
	    component.fireLazyload();
	    // lazyload.startIfNeeded(component);
	  },
	  createFinish: function createFinish(callback) {
	    // TODO
	  },
	  updateFinish: function updateFinish(callback) {
	    // TODO
	  },
	  refreshFinish: function refreshFinish(callback) {
	    // TODO
	  }
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.watchIfNeeded = watchIfNeeded;
	
	var _utils = __webpack_require__(83);
	
	var componentsInScroller = [];
	var componentsOutOfScroller = [];
	var listened = false;
	var direction = 'up';
	var scrollY = 0;
	
	function watchIfNeeded(component) {
	  if (needWatch(component)) {
	    if (component.isInScrollable()) {
	      componentsInScroller.push(component);
	    } else {
	      componentsOutOfScroller.push(component);
	    }
	    if (!listened) {
	      listened = true;
	      // const handler = throttle(onScroll, 25)
	      var handler = throttle(onScroll, 100);
	      window.addEventListener('scroll', handler, false);
	    }
	  }
	}
	
	function needWatch(component) {
	  var events = component.data.event;
	  if (events && (events.indexOf('appear') !== -1 || events.indexOf('disappear') !== -1)) {
	    return true;
	  }
	  return false;
	}
	
	function onScroll(e) {
	  // If the scroll event is dispatched from a scrollable component
	  // implemented through scrollerjs, then the appear/disappear events
	  // should be treated specially by handleScrollerScroll.
	  if (e.originalType === 'scrolling') {
	    handleScrollerScroll(e);
	  } else {
	    handleWindowScroll();
	  }
	}
	
	function handleScrollerScroll(e) {
	  var cmps = componentsInScroller;
	  var len = cmps.length;
	  direction = e.direction;
	  for (var i = 0; i < len; i++) {
	    var component = cmps[i];
	    var appear = isComponentInScrollerAppear(component);
	    if (appear && !component._appear) {
	      component._appear = true;
	      fireEvent(component, 'appear');
	    } else if (!appear && component._appear) {
	      component._appear = false;
	      fireEvent(component, 'disappear');
	    }
	  }
	}
	
	function handleWindowScroll() {
	  var y = window.scrollY;
	  direction = y >= scrollY ? 'up' : 'down';
	  scrollY = y;
	
	  var len = componentsOutOfScroller.length;
	  if (len === 0) {
	    return;
	  }
	  for (var i = 0; i < len; i++) {
	    var component = componentsOutOfScroller[i];
	    var appear = isComponentInWindow(component);
	    if (appear && !component._appear) {
	      component._appear = true;
	      fireEvent(component, 'appear');
	    } else if (!appear && component._appear) {
	      component._appear = false;
	      fireEvent(component, 'disappear');
	    }
	  }
	}
	
	function isComponentInScrollerAppear(component) {
	  var parentScroller = component._parentScroller;
	  var cmpRect = component.node.getBoundingClientRect();
	  if (!isComponentInWindow(component)) {
	    return false;
	  }
	  while (parentScroller) {
	    var parentRect = parentScroller.node.getBoundingClientRect();
	    if (!(cmpRect.right > parentRect.left && cmpRect.left < parentRect.right && cmpRect.bottom > parentRect.top && cmpRect.top < parentRect.bottom)) {
	      return false;
	    }
	    parentScroller = parentScroller._parentScroller;
	  }
	  return true;
	}
	
	function isComponentInWindow(component) {
	  var rect = component.node.getBoundingClientRect();
	  return rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
	}
	
	function fireEvent(component, type) {
	  var evt = document.createEvent('HTMLEvents');
	  var data = { direction: direction };
	  evt.initEvent(type, false, false);
	  evt.data = data;
	  (0, _utils.extend)(evt, data);
	  component.node.dispatchEvent(evt);
	}
	
	function throttle(func, wait) {
	  var context = void 0,
	      args = void 0,
	      result = void 0;
	  var timeout = null;
	  var previous = 0;
	  var later = function later() {
	    previous = Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	  };
	  return function () {
	    var now = Date.now();
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0) {
	      clearTimeout(timeout);
	      timeout = null;
	      previous = now;
	      result = func.apply(context, args);
	    } else if (!timeout) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	}

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  weexVersion: '0.5.0',
	  debug: false,
	  validRoots: ['div', 'list', 'vlist', 'scroller']
	};
	
	exports.default = config;

/***/ },
/* 117 */
/***/ function(module, exports) {

	/* global XMLHttpRequest */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.load = load;
	exports.registerLoader = registerLoader;
	function loadByXHR(config, callback) {
	  if (!config.source) {
	    callback(new Error('xhr loader: missing config.source.'));
	  }
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', config.source);
	  xhr.onload = function () {
	    callback(null, this.responseText);
	  };
	  xhr.onerror = function (error) {
	    callback(error);
	  };
	  xhr.send();
	}
	
	function loadByJsonp(config, callback) {
	  if (!config.source) {
	    callback(new Error('jsonp loader: missing config.source.'));
	  }
	  var callbackName = config.jsonpCallback || 'weexJsonpCallback';
	  window[callbackName] = function (code) {
	    if (code) {
	      callback(null, code);
	    } else {
	      callback(new Error('load by jsonp error'));
	    }
	  };
	  var script = document.createElement('script');
	  script.src = decodeURIComponent(config.source);
	  script.type = 'text/javascript';
	  document.body.appendChild(script);
	}
	
	function loadBySourceCode(config, callback) {
	  // src is the jsbundle.
	  // no need to fetch from anywhere.
	  if (config.source) {
	    callback(null, config.source);
	  } else {
	    callback(new Error('source code laoder: missing config.source.'));
	  }
	}
	
	var callbackMap = {
	  xhr: loadByXHR,
	  jsonp: loadByJsonp,
	  source: loadBySourceCode
	};
	
	function load(options, callback) {
	  var loadFn = callbackMap[options.loader];
	  loadFn(options, callback);
	}
	
	function registerLoader(name, loaderFunc) {
	  if (typeof loaderFunc === 'function') {
	    callbackMap[name] = loaderFunc;
	  }
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sender = exports.receiver = exports.protocol = undefined;
	
	var _protocol = __webpack_require__(119);
	
	var _protocol2 = _interopRequireDefault(_protocol);
	
	var _receiver = __webpack_require__(120);
	
	var _receiver2 = _interopRequireDefault(_receiver);
	
	var _sender = __webpack_require__(121);
	
	var _sender2 = _interopRequireDefault(_sender);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.protocol = _protocol2.default;
	exports.receiver = _receiver2.default;
	exports.Sender = _sender2.default;

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  // weex instances
	  _instances: {},
	
	  // api meta info
	  _meta: {},
	
	  // Weex.registerApiModule used this to register and access apiModules.
	  apiModule: {},
	
	  // get the api method meta info array for the module.
	  getApiModuleMeta: function getApiModuleMeta(moduleName) {
	    var metaObj = {};
	    metaObj[moduleName] = this._meta[moduleName];
	    return metaObj;
	  },
	
	  // Set meta info for a api module.
	  // If there is a same named api, just replace it.
	  // opts:
	  // - metaObj: meta object like
	  // {
	  //    dom: [{
	  //      name: 'addElement',
	  //      args: ['string', 'object']
	  //    }]
	  // }
	  setApiModuleMeta: function setApiModuleMeta(metaObj) {
	    var moduleName = void 0;
	    for (var k in metaObj) {
	      if (metaObj.hasOwnProperty(k)) {
	        moduleName = k;
	      }
	    }
	    var metaArray = this._meta[moduleName];
	    if (!metaArray) {
	      this._meta[moduleName] = metaObj[moduleName];
	    } else {
	      (function () {
	        var nameObj = {};
	        metaObj[moduleName].forEach(function (api) {
	          nameObj[api.name] = api;
	        });
	        metaArray.forEach(function (api, i) {
	          if (nameObj[api.name]) {
	            metaArray[i] = nameObj[api.name];
	            delete nameObj[api.name];
	          }
	        });
	        for (var _k in metaObj) {
	          if (metaObj.hasOwnProperty(_k)) {
	            metaArray.push(metaObj[_k]);
	          }
	        }
	      })();
	    }
	    this._meta[moduleName] = metaObj[moduleName];
	  },
	
	  // Set meta info for a single api.
	  // opts:
	  //  - moduleName: api module name.
	  //  - meta: a meta object like:
	  //  {
	  //    name: 'addElement',
	  //    args: ['string', 'object']
	  //  }
	  setApiMeta: function setApiMeta(moduleName, meta) {
	    var metaArray = this._meta[moduleName];
	    if (!metaArray) {
	      this._meta[moduleName] = [meta];
	    } else {
	      var metaIdx = -1;
	      metaArray.forEach(function (api, i) {
	        var name = void 0; // todo
	        if (meta.name === name) {
	          metaIdx = i;
	        }
	      });
	      if (metaIdx !== -1) {
	        metaArray[metaIdx] = meta;
	      } else {
	        metaArray.push(meta);
	      }
	    }
	  }
	};
	
	// _registerModules([{
	//   modal: [{
	//     name: 'toast',
	//     args: ['object', 'function']
	//   }, {
	//     name: 'alert',
	//     args: ['object', 'function']
	//   }, {
	//     name: 'confirm',
	//     args: ['object', 'function']
	//   }, {
	//     name: 'prompt',
	//     args: ['object', 'function']
	//   }]
	// }, {
	//   animation: [{
	//     name: 'transition',
	//     args: ['string', 'object', 'function']
	//   }]
	// }])

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _config = __webpack_require__(116);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _protocol = __webpack_require__(119);
	
	var _protocol2 = _interopRequireDefault(_protocol);
	
	var _utils = __webpack_require__(83);
	
	var _sender = __webpack_require__(121);
	
	var _sender2 = _interopRequireDefault(_sender);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var callQueue = [];
	// Need a task counter?
	// When frameUpdater is not activated, tasks will not be push
	// into callQueue and there will be no trace for situation of
	// execution of tasks.
	
	// give 10ms for call handling, and rest 6ms for others
	var MAX_TIME_FOR_EACH_FRAME = 10;
	
	// callNative: jsFramework will call this method to talk to
	// this renderer.
	// params:
	//  - instanceId: string.
	//  - tasks: array of object.
	//  - callbackId: number.
	function callNative(instanceId, tasks, callbackId) {
	  var calls = [];
	  if (typeof tasks === 'string') {
	    try {
	      calls = JSON.parse(tasks);
	    } catch (e) {
	      console.error('invalid tasks:', tasks);
	    }
	  } else if ((0, _utils.isArray)(tasks)) {
	    calls = tasks;
	  }
	  var len = calls.length;
	  calls[len - 1].callbackId = !callbackId && callbackId !== 0 ? -1 : callbackId;
	  // To solve the problem of callapp, the two-way time loop rule must
	  // be replaced by calling directly except the situation of page loading.
	  // 2015-11-03
	  for (var i = 0; i < len; i++) {
	    if (_utils.frameUpdater.isActive()) {
	      callQueue.push({
	        instanceId: instanceId,
	        call: calls[i]
	      });
	    } else {
	      processCall(instanceId, calls[i]);
	    }
	  }
	}
	
	function processCallQueue() {
	  var len = callQueue.length;
	  if (len === 0) {
	    return;
	  }
	  var start = Date.now();
	  var elapsed = 0;
	
	  while (--len >= 0 && elapsed < MAX_TIME_FOR_EACH_FRAME) {
	    var callObj = callQueue.shift();
	    processCall(callObj.instanceId, callObj.call);
	    elapsed = Date.now() - start;
	  }
	}
	
	function processCall(instanceId, call) {
	  var moduleName = call.module;
	  var methodName = call.method;
	  var module = void 0,
	      method = void 0;
	  var args = call.args || call.arguments || [];
	
	  if (!(module = _protocol2.default.apiModule[moduleName])) {
	    return;
	  }
	  if (!(method = module[methodName])) {
	    return;
	  }
	
	  method.apply(global.weex.getInstance(instanceId), args);
	
	  var callbackId = call.callbackId;
	  if ((callbackId || callbackId === 0 || callbackId === '0') && callbackId !== '-1' && callbackId !== -1) {
	    performNextTick(instanceId, callbackId);
	  }
	}
	
	function performNextTick(instanceId, callbackId) {
	  _sender2.default.getSender(instanceId).performCallback(callbackId);
	}
	
	function nativeLog() {
	  if (_config2.default.debug) {
	    if (arguments[0].match(/^perf/)) {
	      console.info.apply(console, arguments);
	      return;
	    }
	    console.debug.apply(console, arguments);
	  }
	}
	
	function exportsBridgeMethodsToGlobal() {
	  global.callNative = callNative;
	  global.nativeLog = nativeLog;
	}
	
	exports.default = {
	  init: function init() {
	    // process callQueue every 16 milliseconds.
	    _utils.frameUpdater.addUpdateObserver(processCallQueue);
	    _utils.frameUpdater.start();
	
	    // exports methods to global(window).
	    exportsBridgeMethodsToGlobal();
	  }
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Sender;
	
	var _utils = __webpack_require__(83);
	
	var _senderMap = {};
	
	function Sender(instance) {
	  if (!(this instanceof Sender)) {
	    return new Sender(instance);
	  }
	  this.instanceId = instance.instanceId;
	  this.weexInstance = instance;
	  _senderMap[this.instanceId] = this;
	}
	
	function _send(instanceId, msg) {
	  callJS(instanceId, [msg]);
	}
	
	Sender.getSender = function (instanceId) {
	  return _senderMap[instanceId];
	};
	
	Sender.prototype = {
	
	  // perform a callback to jsframework.
	  performCallback: function performCallback(callbackId, data, keepAlive) {
	    var args = [callbackId];
	    data && args.push(data);
	    keepAlive && args.push(keepAlive);
	    _send(this.instanceId, {
	      method: 'callback',
	      args: args
	    });
	  },
	
	  fireEvent: function fireEvent(ref, type, func, event) {
	    func.extra && (0, _utils.extend)(event, func.extra());
	    _send(this.instanceId, {
	      method: 'fireEvent',
	      args: [ref, type, event, func.updator && func.updator()]
	    });
	  }
	
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Component;
	
	var _utils = __webpack_require__(83);
	
	var _dom = __webpack_require__(123);
	
	var _operate = __webpack_require__(124);
	
	var operate = _interopRequireWildcard(_operate);
	
	var _position = __webpack_require__(126);
	
	var position = _interopRequireWildcard(_position);
	
	var _flexbox = __webpack_require__(128);
	
	var _flexbox2 = _interopRequireDefault(_flexbox);
	
	var _lazyload = __webpack_require__(129);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function hasIntersection(rect, ctRect) {
	  return rect.left < ctRect.right && rect.right > ctRect.left && rect.top < ctRect.bottom && rect.bottom > ctRect.top;
	}
	
	function Component(data, nodeType) {
	  this.data = data;
	  this.node = this.create(nodeType);
	  this.createChildren();
	  this.updateAttrs(this.data.attr || {});
	  // issue: when add element to a list in lifetime hook 'ready', the
	  // styles is set to the classStyle, not style. This is a issue
	  // that jsframework should do something about.
	  var classStyle = this.data.classStyle;
	  classStyle && this.updateStyle(this.data.classStyle);
	  this.updateStyle(this.data.style || {});
	  this.bindEvents(this.data.event || []);
	}
	
	Component.prototype = {
	  getComponentManager: function getComponentManager() {
	    return _dom.ComponentManager.getInstance(this.data.instanceId);
	  },
	  getWeexInstance: function getWeexInstance() {
	    return this.getComponentManager().getWeexInstance();
	  },
	  getParent: function getParent() {
	    return this.getComponentManager().componentMap[this.parentRef];
	  },
	  getParentScroller: function getParentScroller() {
	    if (this.isInScrollable()) {
	      return this._parentScroller;
	    }
	    return null;
	  },
	  getRootScroller: function getRootScroller() {
	    if (this.isInScrollable()) {
	      var scroller = this._parentScroller;
	      var parent = scroller._parentScroller;
	      while (parent) {
	        scroller = parent;
	        parent = scroller._parentScroller;
	      }
	      return scroller;
	    }
	    return null;
	  },
	  getRootContainer: function getRootContainer() {
	    var root = this.getWeexInstance().getRoot() || document.body;
	    return root;
	  },
	  isScrollable: function isScrollable() {
	    var t = this.data.type;
	    return _dom.ComponentManager.getScrollableTypes().indexOf(t) !== -1;
	  },
	  isInScrollable: function isInScrollable() {
	    if (typeof this._isInScrollable === 'boolean') {
	      return this._isInScrollable;
	    }
	    var parent = this.getParent();
	    if (parent && typeof parent._isInScrollable !== 'boolean' && !parent.isScrollable()) {
	      if (parent.data.ref === '_root') {
	        this._isInScrollable = false;
	        return false;
	      }
	      this._isInScrollable = parent.isInScrollable();
	      this._parentScroller = parent._parentScroller;
	      return this._isInScrollable;
	    }
	    if (parent && typeof parent._isInScrollable === 'boolean') {
	      this._isInScrollable = parent._isInScrollable;
	      this._parentScroller = parent._parentScroller;
	      return this._isInScrollable;
	    }
	    if (parent && parent.isScrollable()) {
	      this._isInScrollable = true;
	      this._parentScroller = parent;
	      return true;
	    }
	    if (!parent) {
	      console && console.warn('[h5-render] isInScrollable - parent not exist.');
	      return;
	    }
	  },
	
	
	  // dispatch a specified event on this.node
	  //  - type: event type
	  //  - data: event data
	  //  - config: event config object
	  //     - bubbles
	  //     - cancelable
	  dispatchEvent: function dispatchEvent(type, data, config) {
	    var event = document.createEvent('HTMLEvents');
	    config = config || {};
	    event.initEvent(type, config.bubbles || false, config.cancelable || false);
	    !data && (data = {});
	    event.data = (0, _utils.extend)({}, data);
	    (0, _utils.extend)(event, data);
	    this.node.dispatchEvent(event);
	  },
	
	
	  onAppend: function onAppend() {
	    var rect = this.node.getBoundingClientRect();
	    var parent = this.getParentScroller();
	    var parentNode = parent ? parent.node : this.getRootContainer();
	    var ctRect = parentNode.getBoundingClientRect();
	    if (hasIntersection(rect, ctRect)) {
	      this.dispatchEvent('appear', { direction: '' });
	    }
	  },
	
	  addAppendHandler: function addAppendHandler(cb) {
	    var pre = void 0;
	    if (this.onAppend) {
	      pre = this.onAppend.bind(this);
	    }
	    this.onAppend = function () {
	      pre && pre.call(this);
	      cb && cb.call(this);
	    }.bind(this);
	  },
	
	
	  // change src to img-src for lib.img to fire lazyload later.
	  enableLazyload: function enableLazyload(src) {
	    if (this.node) {
	      (0, _lazyload.makeImageLazy)(this.node, src);
	    } else {
	      console.error('[h5-render] this.node does not exist.');
	    }
	  },
	
	
	  // element can be both weex component and dom element.
	  fireLazyload: function fireLazyload(element) {
	    !element && (element = this);
	    (0, _lazyload.fireLazyload)(element);
	  },
	
	
	  attr: {}, // attr setters
	
	  style: {}, // style setters
	
	  // event funcs
	  //  - 1. 'updator' for updating attrs or styles with out triggering messages.
	  //  - 2. 'extra' for binding extra data.
	  //  - 3. 'setter' set a specified event handler.
	  // funcs should be functions like this: (take 'change' event as a example)
	  // {
	  //   change: {
	  //     updator () {
	  //       return {
	  //         attrs: {
	  //           checked: this.checked
	  //         }
	  //       }
	  //     },
	  //     extra () {
	  //       return {
	  //         value: this.checked
	  //       }
	  //     }
	  //   }
	  // }
	  event: {},
	
	  clearAttr: function clearAttr() {},
	  clearStyle: function clearStyle() {
	    this.node.cssText = '';
	  }
	};
	
	// extend operations.
	(0, _utils.extend)(Component.prototype, operate);
	
	// extend attr and style setters from 'position' and 'flexbox'.
	(0, _utils.extend)(Component.prototype, position);
	(0, _utils.extend)(Component.prototype.style, _flexbox2.default.style);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ComponentManager = undefined;
	
	var _componentManager = __webpack_require__(114);
	
	var _componentManager2 = _interopRequireDefault(_componentManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.ComponentManager = _componentManager2.default; /**
	                                                        * @fileOverview
	                                                        * A simple virtual dom implementation
	                                                        */

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.create = create;
	exports.createChildren = createChildren;
	exports.appendChild = appendChild;
	exports.insertBefore = insertBefore;
	exports.removeChild = removeChild;
	exports.updateAttrs = updateAttrs;
	exports.updateStyle = updateStyle;
	exports.bindEvents = bindEvents;
	exports.unbindEvents = unbindEvents;
	
	var _utils = __webpack_require__(83);
	
	var _valueFilter = __webpack_require__(125);
	
	function create(nodeType) {
	  var node = document.createElement(nodeType || 'div');
	  return node;
	}
	
	function createChildren() {
	  var children = this.data.children;
	  var parentRef = this.data.ref;
	  var componentManager = this.getComponentManager();
	  if (children && children.length) {
	    var fragment = document.createDocumentFragment();
	    var isFlex = false;
	    for (var i = 0; i < children.length; i++) {
	      children[i].instanceId = this.data.instanceId;
	      children[i].scale = this.data.scale;
	      var child = componentManager.createElement(children[i]);
	      fragment.appendChild(child.node);
	      child.parentRef = parentRef;
	      if (!isFlex && child.data.style && child.data.style.hasOwnProperty('flex')) {
	        isFlex = true;
	      }
	    }
	    this.node.appendChild(fragment);
	  }
	}
	
	function appendChild(data) {
	  var children = this.data.children;
	  var componentManager = this.getComponentManager();
	  var child = componentManager.createElement(data);
	  this.node.appendChild(child.node);
	  // update this.data.children
	  if (!children || !children.length) {
	    this.data.children = [data];
	  } else {
	    children.push(data);
	  }
	  return child;
	}
	
	function insertBefore(child, before) {
	  var children = this.data.children;
	  var i = 0;
	  var l = void 0;
	  var isAppend = false;
	
	  // update this.data.children
	  if (!children || !children.length || !before) {
	    isAppend = true;
	  } else {
	    for (l = children.length; i < l; i++) {
	      if (children[i].ref === before.data.ref) {
	        break;
	      }
	    }
	    if (i === l) {
	      isAppend = true;
	    }
	  }
	
	  if (isAppend) {
	    this.node.appendChild(child.node);
	    children.push(child.data);
	  } else {
	    if (before.fixedPlaceholder) {
	      this.node.insertBefore(child.node, before.fixedPlaceholder);
	    } else if (before.stickyPlaceholder) {
	      this.node.insertBefore(child.node, before.stickyPlaceholder);
	    } else {
	      this.node.insertBefore(child.node, before.node);
	    }
	    children.splice(i, 0, child.data);
	  }
	}
	
	function removeChild(child) {
	  var children = this.data.children;
	  // remove from this.data.children
	  var i = 0;
	  var componentManager = this.getComponentManager();
	  if (children && children.length) {
	    var l = void 0;
	    for (l = children.length; i < l; i++) {
	      if (children[i].ref === child.data.ref) {
	        break;
	      }
	    }
	    if (i < l) {
	      children.splice(i, 1);
	    }
	  }
	  // remove from componentMap recursively
	  componentManager.removeComponent(child.data.ref);
	  child.unsetPosition();
	  child.node.parentNode.removeChild(child.node);
	}
	
	function updateAttrs(attrs) {
	  // Note：attr must be injected into the dom element because
	  // it will be accessed from the outside developer by event.target.attr.
	  if (!this.node.attr) {
	    this.node.attr = {};
	  }
	  for (var key in attrs) {
	    var value = attrs[key];
	    var attrSetter = this.attr[key];
	    if (typeof attrSetter === 'function') {
	      attrSetter.call(this, value);
	    } else {
	      if (typeof value === 'boolean') {
	        this.node[key] = value;
	      } else {
	        this.node.setAttribute(key, value);
	      }
	      this.node.attr[key] = value;
	    }
	  }
	}
	
	function updateStyle(style) {
	  for (var key in style) {
	    var value = style[key];
	    var styleSetter = this.style[key];
	    if (typeof styleSetter === 'function') {
	      styleSetter.call(this, value);
	      continue;
	    }
	    var parser = (0, _valueFilter.getFilters)(key, { scale: this.data.scale })[typeof value === 'undefined' ? 'undefined' : _typeof(value)];
	    if (typeof parser === 'function') {
	      value = parser(value);
	    }
	    this.node.style[key] = value;
	  }
	}
	
	function bindEvents(evts) {
	  var self = this;
	  var weexInstance = this.getWeexInstance();
	  evts.map(function (evt) {
	    var func = self.event[evt] || {};
	    var setter = func.setter;
	    if (setter) {
	      self.node.addEventListener(evt, setter);
	      return;
	    }
	    var sender = weexInstance.sender;
	    var listener = function listener(e) {
	      // do stop bubbling.
	      // do not prevent default, otherwise the touchstart
	      // event will no longer trigger a click event
	      if (e._alreadyTriggered) {
	        return;
	      }
	      e._alreadyTriggered = true;
	      var event = (0, _utils.extend)({}, e);
	      event.target = self.data;
	      sender.fireEvent(self.data.ref, evt, {
	        extra: func.extra && func.extra.bind(self),
	        updator: func.updator && func.updator.bind(self)
	      }, event);
	    };
	    self.node.addEventListener(evt, listener, false, false);
	    var listeners = self._listeners;
	    if (!listeners) {
	      listeners = self._listeners = {};
	      self.node._listeners = {};
	    }
	    listeners[evt] = listener;
	    self.node._listeners[evt] = listener;
	  });
	}
	
	function unbindEvents(evts) {
	  var self = this;
	  evts.map(function (evt) {
	    var listener = this._listeners;
	    if (listener) {
	      self.node.removeEventListener(evt, listener);
	      self._listeners[evt] = null;
	      self.node._listeners[evt] = null;
	    }
	  });
	}

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.filterStyles = filterStyles;
	exports.getFilters = getFilters;
	var NOT_PX_NUMBER_PROPERTIES = ['flex', 'opacity', 'zIndex', 'fontWeight'];
	
	function filterStyles(styles, config) {
	  for (var key in styles) {
	    var value = styles[key];
	    var parser = this.getFilters(key, config)[typeof value === 'undefined' ? 'undefined' : _typeof(value)];
	    if (typeof parser === 'function') {
	      styles[key] = parser(value);
	    }
	  }
	}
	
	function getFilters(key, config) {
	  if (NOT_PX_NUMBER_PROPERTIES.indexOf(key) !== -1) {
	    return {};
	  }
	  return {
	    number: function number(val) {
	      return val * config.scale + 'px';
	    },
	    string: function string(val) {
	      // string of a pure number or a number suffixed with a 'px' unit
	      if (val.match(/^\-?\d*\.?\d+(?:px)?$/)) {
	        return parseFloat(val) * config.scale + 'px';
	      }
	      if (key.match(/transform/) && val.match(/translate/)) {
	        return val.replace(/\d*\.?\d+px/g, function (match) {
	          return parseInt(parseFloat(match) * config.scale) + 'px';
	        });
	      }
	      return val;
	    }
	  };
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.style = undefined;
	exports.setFixed = setFixed;
	exports.unsetFixed = unsetFixed;
	exports.setSticky = setSticky;
	exports.unsetSticky = unsetSticky;
	exports.unsetPosition = unsetPosition;
	
	var _sticky = __webpack_require__(127);
	
	var _sticky2 = _interopRequireDefault(_sticky);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Set positon to fixed, with a placeholder if it's in a
	// scrollable component.
	function setFixed() {
	  // delay processing in case the node is not appended yet.
	  setTimeout(function () {
	    this.node.style.position = 'fixed';
	    if (!this.isInScrollable()) {
	      return;
	    }
	    var parent = this.node.parentNode;
	    if (parent) {
	      // For the elements who are fixed: this fixedPlaceholder
	      // shoud be inserted, and the fixed element itself should
	      // be moved to the root container.
	      this.fixedPlaceholder = document.createElement('div');
	      this.fixedPlaceholder.classList.add('weex-fixed-placeholder');
	      this.fixedPlaceholder.style.cssText = ['display:none;', 'width:0px;', 'height:0px;'].join('');
	      parent.insertBefore(this.fixedPlaceholder, this.node);
	      this.getRootContainer().appendChild(this.node);
	    }
	  }.bind(this), 0);
	}
	
	// unset a fixed node to the pecified 'position' or 'relative' by default.
	function unsetFixed(position) {
	  // For the elements who are fixed elements before, now
	  // are not fixed: the fixedPlaceholder has to be replaced
	  // by this element.
	  position = position ? position + '' : 'relative';
	  if (this.fixedPlaceholder) {
	    var parent = this.fixedPlaceholder.parentNode;
	    parent.insertBefore(this.node, this.fixedPlaceholder);
	    parent.removeChild(this.fixedPlaceholder);
	    this.fixedPlaceholder = null;
	    this.node.style.position = position;
	  }
	}
	
	function setSticky() {
	  this.node.style.zIndex = 100;
	  setTimeout(function () {
	    this.sticky = new _sticky2.default(this);
	  }.bind(this), 0);
	}
	
	function unsetSticky() {
	  if (this.sticky) {
	    this.sticky.destroy();
	    this.sticky = null;
	  }
	}
	
	// usally used to unset sticky and fixed
	function unsetPosition(position) {
	  this.style.position.call(this, position);
	}
	
	var style = exports.style = {
	  position: function position(value) {
	    // This is a peace of hacking to fix the problem about
	    // mixing fixed and transform. See 'http://stackoverflo
	    // w.com/questions/15194313/webkit-css-transform3d-posi
	    // tion-fixed-issue' for more info.
	    value !== 'fixed' && this.unsetFixed();
	    value !== 'sticky' && this.unsetSticky();
	    if (value === 'fixed') {
	      return this.setFixed();
	    }
	    if (value === 'sticky') {
	      return this.setSticky();
	    }
	    this.node.style.position = value;
	  }
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Sticky;
	
	var _utils = __webpack_require__(83);
	
	var ua = navigator.userAgent;
	var isFirefox = !!ua.match(/Firefox/i);
	var isIEMobile = !!ua.match(/IEMobile/i);
	var cssPrefix = isFirefox ? '-moz-' : isIEMobile ? '-ms-' : '-webkit-';
	var stylePrefix = isFirefox ? 'Moz' : isIEMobile ? 'ms' : 'webkit';
	
	var supportSticky = (0, _utils.detectSticky)();
	
	function createStickyLayer(sticky) {
	  var parent = sticky.parentElement;
	  var sl = parent._stickyLayer;
	  if (sl) {
	    return;
	  }
	  sl = document.createElement('div');
	  sl.classList.add('weex-sticky-layer');
	  sl.style.cssText = ['position:fixed;', 'top:' + parent.getBoundingClientRect().top + 'px;', 'box-sizing:border-box;', 'width:100%;'].join('');
	  parent._stickyLayer = sl;
	  parent.appendChild(sl);
	}
	
	function destroyStickyLayer(sticky) {
	  var parent = sticky.parentElement;
	  var sl = parent._stickyLayer;
	  if (!sl || sl.children.length > 0) {
	    return;
	  }
	  sl && parent.removeChild(sl);
	  parent._stickyLayer = null;
	}
	
	function bindParent(sticky) {
	  if (!sticky instanceof Sticky) {
	    return;
	  }
	  var scroller = sticky.component.getParentScroller();
	  var pt = void 0;
	  if (scroller) {
	    pt = sticky.parent = scroller;
	    sticky.parentElement = pt.node;
	  } else {
	    pt = sticky.parent = sticky.component.getRootContainer();
	    sticky.parentElement = pt;
	  }
	}
	
	function setSticky(sticky) {
	  var comp = sticky.component;
	  comp.stickyPlaceholder = sticky.element.cloneNode(true);
	  comp.stickyPlaceholder.classList.add('weex-sticky-placeholder');
	  sticky.element.classList.add('weex-sticky');
	  sticky.preMarginTop = sticky.element.style.marginTop;
	  sticky.element.style.marginTop = sticky.top + 'px';
	  sticky.element.parentNode.insertBefore(comp.stickyPlaceholder, sticky.element);
	  var pt = sticky.parentElement;
	  !pt.stickys && (pt.stickys = []);
	  pt.stickys.push(sticky);
	  createStickyLayer(sticky);
	  pt._stickyLayer.appendChild(sticky.element);
	}
	
	/**
	 * unsetSticky
	 * @param  {Sticky} sticky : a sticky instance.
	 * @param  {string} position : position replacing with (default: 'relative').
	 */
	function unsetSticky(sticky, position) {
	  var comp = sticky.component;
	  var element = sticky.element;
	  position = position ? position + '' : sticky.prePosition;
	  element.style.position = position;
	  element.style.marginTop = sticky.preMarginTop || '';
	  element.classList.remove('weex-sticky');
	  if (comp.stickyPlaceholder) {
	    var parent = comp.stickyPlaceholder.parentNode;
	    parent.insertBefore(sticky.element, comp.stickyPlaceholder);
	    parent.removeChild(comp.stickyPlaceholder);
	    comp.stickyPlaceholder = null;
	  }
	  var stks = sticky.parentElement.stickys;
	  var idx = stks.indexOf(sticky);
	  stks.splice(idx, 1);
	  destroyStickyLayer(sticky);
	}
	
	/**
	 * @class  Sticky
	 * @param {Component} component: a weex component.
	 * @param {object} options config options.
	 *  - options.component (optional) incase the component param is missing, it can
	 *    be specified in this options.
	 *  - options.withinParent=false（optional，only for Android）the sticky effect is
	 *    limited within the parent element only.
	 */
	function Sticky(component, options) {
	  options = options || {};
	  this.component = component;
	  this.element = component.node;
	  this.prePosition = this.element.style.position;
	  this.withinParent = options.withinParent || false;
	  this.parent = null;
	  this.init();
	}
	
	Sticky.prototype = {
	
	  constructor: Sticky,
	
	  init: function init() {
	    var elementStyle = this.element.style;
	    elementStyle[stylePrefix + 'Transform'] = 'translateZ(0)'; // fix flickering
	    elementStyle['transform'] = 'translateZ(0)';
	    bindParent(this);
	    if (supportSticky) {
	      elementStyle.position = cssPrefix + 'sticky';
	      elementStyle.position = 'sticky';
	    } else {
	      this._simulateSticky();
	      this._bindResize();
	    }
	  },
	  _bindResize: function _bindResize() {
	    var self = this;
	    var isAndroid = /android/gi.test(navigator.appVersion);
	    var resizeEvent = self._resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
	    var resizeHandler = self._resizeHandler = function () {
	      setTimeout(function () {
	        self.refresh();
	      }, isAndroid ? 200 : 0);
	    };
	    window.addEventListener(resizeEvent, resizeHandler, false);
	  },
	
	
	  /**
	   * Refresh a instance.
	   * If withParent is true and the parent' height altered, this
	   * method should be called.
	   */
	  refresh: function refresh() {
	    if (supportSticky) {
	      return;
	    }
	    this._detach();
	    this._simulateSticky();
	  },
	  _simulateSticky: function _simulateSticky() {
	    var self = this;
	    var isInScrollable = this.isInScrollable();
	    // the initial y offset.
	    this.offset = (isInScrollable ? this.getParentScroller().offset : window.pageYOffset) || 0;
	    var rectTop = this.element.getBoundingClientRect().top;
	    var wrapperTop = 0;
	    if (isInScrollable) {
	      wrapperTop = this.parentElement.getBoundingClientRect().top;
	    }
	    var withinParent = this.withinParent;
	    var thresholdBase = rectTop - wrapperTop + this.offset;
	    /**
	     * curState:
	     *   1 - normal
	     *   2 - sticky
	     *   3 - exceed parent
	     * @type {Number}
	     */
	    this.curState = 1;
	    var scrollHandler = this._scrollHandler = (0, _utils.throttle)(function (e) {
	      var sl = self.parentElement._stickyLayer;
	      var layerHeight = sl ? sl.getBoundingClientRect().height : 0;
	      var selfHeight = self.element.getBoundingClientRect().height;
	      var selfOffset = self.curState === 2 ? selfHeight : 0;
	      var thresholdTop = thresholdBase - layerHeight + selfOffset;
	      var ypos = self.isInScrollable() ? e.offset : window.pageYOffset;
	      self.offset = ypos;
	      if (ypos < thresholdTop) {
	        if (self.curState !== 1) {
	          unsetSticky(self);
	          self.curState = 1;
	        }
	      } else if (!withinParent && ypos >= thresholdTop || withinParent && ypos >= thresholdTop /* && ypos < thresholdBottom*/) {
	          if (self.curState !== 2) {
	            setSticky(self);
	            self.curState = 2;
	          }
	        }
	    }, 100);
	    window.addEventListener('scroll', scrollHandler, false);
	
	    // take effect once inited after a destroyment.
	    if (this.offset >= thresholdBase) {
	      var dummyEvent = document.createEvent('HTMLEvents');
	      dummyEvent.initEvent('scroll', true, true);
	      window.dispatchEvent(dummyEvent);
	    }
	  },
	  _detach: function _detach(position) {
	    position = position ? position + '' : 'relative';
	    if (!supportSticky) {
	      if (this.curState === 2) {
	        unsetSticky(this);
	      }
	      window.removeEventListener('scroll', this._scrollHandler, false);
	    }
	  },
	  isInScrollable: function isInScrollable() {
	    if (!this._isInScrollable) {
	      try {
	        this._isInScrollable = this.component.isInScrollable();
	      } catch (err) {
	        // The parentRef is not in componentManager's componentMap yet, so
	        // it's invalid to get the parent and test if it's scrollable.
	        // This is most likely to happen in the case that the parent
	        // component's 'append' attribute is set to 'tree'.
	        console.error('isInScrollable is not yet available to call', err);
	      }
	    }
	    return this._isInScrollable;
	  },
	  getParentScroller: function getParentScroller() {
	    return this.component.getParentScroller();
	  },
	  destroy: function destroy(position) {
	    this._detach(position);
	    var elementStyle = this.element.style;
	    elementStyle.removeProperty(cssPrefix + 'transform');
	    elementStyle.removeProperty('transform');
	    if (!supportSticky) {
	      window.removeEventListener(this._resizeEvent, this._resizeHandler, false);
	    }
	  }
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var boxAlignMap = {
	  stretch: 'stretch',
	  'flex-start': 'start',
	  'flex-end': 'end',
	  center: 'center'
	};
	
	var boxOrientMap = {
	  row: 'horizontal',
	  column: 'vertical'
	};
	
	var boxPackMap = {
	  'flex-start': 'start',
	  'flex-end': 'end',
	  center: 'center',
	  'space-between': 'justify',
	  'space-around': 'justify' // Just same as `space-between`
	};
	
	exports.default = {
	  style: {
	    flex: function flex(value) {
	      this.node.style.webkitBoxFlex = value;
	      this.node.style.webkitFlex = value;
	      this.node.style.flex = value;
	    },
	    alignItems: function alignItems(value) {
	      this.node.style.webkitBoxAlign = boxAlignMap[value];
	      this.node.style.webkitAlignItems = value;
	      this.node.style.alignItems = value;
	    },
	    alignSelf: function alignSelf(value) {
	      this.node.style.webkitAlignSelf = value;
	      this.node.style.alignSelf = value;
	    },
	    flexDirection: function flexDirection(value) {
	      this.node.style.webkitBoxOrient = boxOrientMap[value];
	      this.node.style.webkitFlexDirection = value;
	      this.node.style.flexDirection = value;
	    },
	    justifyContent: function justifyContent(value) {
	      this.node.style.webkitBoxPack = boxPackMap[value];
	      this.node.style.webkitJustifyContent = value;
	      this.node.style.justifyContent = value;
	    }
	  }
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib, HTMLElement */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeImageLazy = makeImageLazy;
	exports.fireLazyload = fireLazyload;
	__webpack_require__(130);
	
	var lazyloadTimer = void 0;
	
	// fire lazyimg on images.
	function fire() {
	  lib.img.fire();
	}
	
	// we don't know when all images are appended
	// just use setTimeout to do delay lazyload
	//
	// -- actually everytime we add a element or update styles,
	// the component manager will call startIfNeed to fire
	// lazyload once again in the handleAppend function. so there
	// is no way that any image element can miss it. See source
	// code in componentMangager.js.
	
	// component is not a dom element but a weex component.
	function startIfNeeded(component) {
	  if (component.data.type === 'image') {
	    if (!lazyloadTimer) {
	      lazyloadTimer = setTimeout(function () {
	        fire();
	        clearTimeout(lazyloadTimer);
	        lazyloadTimer = null;
	      }, 16);
	    }
	  }
	}
	
	// elementScope is a dom element.
	function loadIfNeeded(elementScope) {
	  var notPreProcessed = elementScope.querySelectorAll('[img-src]');
	  // image elements which have attribute 'i-lazy-src' were elements
	  // that had been preprocessed by lib-img-core, but not loaded yet, and
	  // must be loaded when 'appear' events were fired. It turns out the
	  // 'appear' event was not fired correctly in the css-translate-transition
	  // situation, so 'i-lazy-src' must be checked and lazyload must be
	  // fired manually.
	  var preProcessed = elementScope.querySelectorAll('[i-lazy-src]');
	  if (notPreProcessed.length > 0 || preProcessed.length > 0) {
	    fire();
	  }
	}
	
	function makeImageLazy(image, src) {
	  image.removeAttribute('img-src');
	  image.removeAttribute('i-lazy-src');
	  image.removeAttribute('src');
	  image.setAttribute('img-src', src);
	  fire();
	}
	
	function fireLazyload(component) {
	  if (component instanceof HTMLElement) {
	    loadIfNeeded(component);
	  } else {
	    startIfNeeded(component);
	  }
	}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    lib-img-adpter 
	    Author: kongshi.wl@alibaba-inc.com 
	    Date:   Dec,2015
	*/
	;
	
	(function (win, lib) {
	    __webpack_require__(131);
	
	    var adapter = {};
	    var appearInstance;
	    var runtimeFlags = {};
	
	    var config = {
	        'dataSrc': 'img-src', //指定图片地址的attribute名, 兼做lazy-class的作用
	        'lazyHeight': 0, //以此高度提前触发懒加载
	        'lazyWidth': 0 //以此宽度提前触发懒加载
	    };
	
	
	    function extendStrict(main, sub) {
	        var ret = {};
	        for (var k in main) {
	            if (main.hasOwnProperty(k)) {
	                ret[k] = sub.hasOwnProperty(k) ? sub[k] : main[k];
	            }
	        }
	        return ret;
	    }
	
	    function applySrc(item, processedSrc) {
	        if (!processedSrc) {
	            return;
	        }
	        if (item.nodeName.toUpperCase() == 'IMG') {
	            item.setAttribute('src', processedSrc);
	        } else {
	            item.style.backgroundImage = 'url("' + processedSrc + '")';
	        }
	    }
	
	    function init() {
	        appearInstance = lib.appear.init({
	            cls: 'imgtmp', //可选，需要遍历的元素
	            once: true, //可选，是否只触发一次
	            x: config.lazyWidth, //可选，容器右边距离x以内的元素加载，默认为0
	            y: config.lazyHeight, //可选，容器底部距离y以内的元素加载，默认为0
	            onAppear: function (evt) {
	                var item = this;
	                applySrc(item, item.getAttribute('i-lazy-src'));
	                item.removeAttribute('i-lazy-src');
	            }
	        });
	    }
	
	
	    adapter.logConfig = function () {
	        console.log('lib-img Config\n', config);
	    }
	
	
	    adapter.fire = function () {
	
	        if (!appearInstance) {
	            init();
	        }
	
	        var label = 'i_' + Date.now() % 100000;
	        var domList = document.querySelectorAll('[' + config.dataSrc + ']');
	
	        [].forEach.call(domList, function (item) {
	            if (item.dataset.lazy == 'false' && item.dataset.lazy != 'true') {
	                applySrc(item, processSrc(item, item.getAttribute(config.dataSrc)));
	            } else {
	                item.classList.add(label);
	                item.setAttribute('i-lazy-src', item.getAttribute(config.dataSrc));
	            }
	            item.removeAttribute(config.dataSrc);
	        });
	
	        appearInstance.bind('.' + label);
	        appearInstance.fire();
	    }
	
	
	
	    adapter.defaultSrc = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
	
	
	
	    lib.img = adapter;
	    
	    module.exports = adapter;
	
	})(window, window['lib'] || (window['lib'] = {}));


/***/ },
/* 131 */
/***/ function(module, exports) {

	;
	(function (win, lib) {
	  var doc = document;
	  var appearEvt;
	  var disappearEvt;
	
	  function createEvent() {
	    appearEvt = doc.createEvent("HTMLEvents");//创建自定义显示事件  
	    disappearEvt = doc.createEvent("HTMLEvents");//创建自定义消失事件  
	    appearEvt.initEvent('_appear', false, true);      
	    disappearEvt.initEvent('_disappear', false, true);      
	  }
	
	  /**
	   * [throttle 节流函数]
	   * @param  {[function]} func [执行函数]
	   * @param  {[int]} wait [等待时长]
	   * @return {[type]}      [description]
	   */
	  function throttle(func, wait) {
	    var latest = Date.now(),
	      previous = 0,//上次执行的时间
	      timeout = null,//setTimout任务
	      context,//上下文
	      args,//参数
	      result;//结果
	    var later = function () {
	      previous = Date.now();
	      timeout = null;//清空计时器
	      func.apply(context, args);
	    }
	    return function () {
	      var now = Date.now();
	      context = this;
	      args = arguments;
	
	      var remaining = wait - (now - previous);
	      if (remaining <= 0 || remaining >= wait) {
	        //如果没有剩余时间，或者存在修改过系统时间导致剩余时间增大的情况，则执行
	        clearTimeout(timeout);
	        timeout = null;
	        result = func.apply(context, args);
	      } else if (timeout == null) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    }
	  }
	
	  /**
	   * [getOffset 获取边距尺寸]
	   * @param  {[type]} el   [description]
	   * @param  {[type]} param [description]
	   * @return {[type]}       [description]
	   */
	  function getOffset(el, param) {
	    var el, l,  r, b, t;
	    if (!el) {
	      return;
	    }
	    if (!param) {
	      param = {x: 0, y: 0};
	    }
	
	    if (el != window) {
	      el = el.getBoundingClientRect();
	      l = el.left;
	      t = el.top;
	      r = el.right;
	      b = el.bottom;
	    } else {
	      l = 0;
	      t = 0;
	      r = l + el.innerWidth;
	      b = t + el.innerHeight;
	    }
	    return {
	      'left': l,
	      'top': t,
	      'right': r + param.x,
	      'bottom': b + param.y
	    };
	  }
	  //元素位置比较
	  function compareOffset(d1, d2) {
	    var left = d2.right > d1.left && d2.left < d1.right;
	    var top = d2.bottom > d1.top && d2.top < d1.bottom;
	    return left && top;
	  }
	  //获取移动方向
	  function getDirection(beforeOffset, nowOffset) {
	    var direction = 'none';
	    var horizental = beforeOffset.left - nowOffset.left;
	    var vertical = beforeOffset.top - nowOffset.top;
	    if (vertical == 0) {
	      if (horizental != 0) {
	        direction = horizental > 0 ? 'left' : 'right';
	      } else {
	        direction = 'none'
	      }
	    }
	    if (horizental == 0) {
	      if (vertical != 0) {
	        direction = vertical > 0 ? 'up' : 'down';
	      } else {
	        direction = 'none';
	      }
	    }
	    return direction;
	  }
	
	  function extend(target, el) {
	    for (var k in el) {
	      if (el.hasOwnProperty(k)) {
	        target[k] = el[k];
	      }
	    }
	    return target;
	  }
	
	  /**
	   * [__bindEvent 绑定事件，包括滚动、touchmove、transform、resize等]
	   * @return {[type]}      [description]
	   */
	  function __bindEvent() {
	    var self = this;
	    var handle = throttle(function () {
	      __fire.apply(self, arguments);
	    }, this.options.wait);
	    if (this.__handle) {
	      //避免重复绑定
	      this.container.removeEventListener('scroll', this.__handle);
	      this.__handle = null;
	    }
	    this.__handle = handle;
	    this.container.addEventListener('scroll', handle, false);
	    this.container.addEventListener('resize', function(ev) {
	      __fire.apply(self, arguments);
	    }, false);
	    this.container.addEventListener('animationEnd', function() {
	      __fire.apply(self, arguments);
	    }, false);
	    // android4.0以下
	    this.container.addEventListener('webkitAnimationEnd', function() {
	      __fire.apply(self, arguments);
	    }, false);
	    this.container.addEventListener('transitionend', function() {
	      __fire.apply(self, arguments);
	    }, false);
	  }
	
	  //获取容器内所有的加载元素
	  function __getElements(selector) {
	    var self = this;
	    //获取容器
	    var container = this.options.container;
	    if (typeof container == 'string') {
	      //如果是字符串，则选择器
	      this.container = doc.querySelector(container);
	    } else {
	      //对象传值
	      this.container = container;
	    }
	    //获取容器内的所有目标元素
	    if (this.container == window) {
	      var appearWatchElements = doc.querySelectorAll(selector);            
	    } else {
	      var appearWatchElements = this.container.querySelectorAll(selector);
	    }
	    var appearWatchElements = [].slice.call(appearWatchElements, null);
	
	    appearWatchElements = appearWatchElements.filter(function(ele) {
	      // 如果已经绑定过，清除appear状态，不再加入到数组里
	      if (ele.dataset['bind'] == '1') {
	        delete ele._hasAppear;
	        delete ele._hasDisAppear;
	        delete ele._appear;      
	        ele.classList.remove(self.options.cls);
	        return false;
	      } else {
	        return true;
	      }
	    });
	
	    return appearWatchElements;
	  }
	
	  function __initBoundingRect(elements) {
	    var self = this;
	    if (elements && elements.length > 0) {
	      [].forEach.call(elements, function (ele) {
	        ele._eleOffset = getOffset(ele); 
	        //移除类名
	        ele.classList.remove(self.options.cls);
	        // 标志已经绑定
	        ele.dataset['bind'] = 1;
	      });
	    }        
	  }
	
	  // 触发加载
	  function __fire() {
	    var container = this.container,
	      elements = this.appearWatchElements,
	      appearCallback = this.options.onAppear,//appear的执行函数
	      disappearCallback = this.options.onDisappear,//disappear的执行函数
	      containerOffset = getOffset(container, {
	        x: this.options.x,
	        y: this.options.y
	      }),
	      isOnce = this.options.once,//是否只执行一次
	      ev = arguments[0] || {};
	    if (elements && elements.length > 0) {
	      [].forEach.call(elements, function (ele, i) {
	        //获取左右距离
	        var eleOffset = getOffset(ele);
	        var direction = getDirection(ele._eleOffset, eleOffset);
	        //保存上个时段的位置信息
	        ele._eleOffset = eleOffset;
	        //查看是否在可视区域范围内
	        var isInView = compareOffset(containerOffset, eleOffset);
	        var appear = ele._appear;
	        var _hasAppear = ele._hasAppear;
	        var _hasDisAppear = ele._hasDisAppear;
	        appearEvt.data = {
	          direction: direction
	        }
	        disappearEvt.data = {
	          direction: direction
	        }
	        if (isInView && !appear) {
	          if ((isOnce && !_hasAppear) || !isOnce) {
	            //如果只触发一次并且没有触发过或者允许触发多次
	            //如果在可视区域内，并且是从disppear进入appear，则执行回调
	            appearCallback && appearCallback.call(ele, ev);
	            //触发自定义事件
	            ele.dispatchEvent(appearEvt);
	            ele._hasAppear = true;
	            ele._appear = true;
	          }
	        } else if (!isInView && appear) {
	          if ((isOnce && !_hasDisAppear) || !isOnce) {
	            //如果不在可视区域内，并且是从appear进入disappear，执行disappear回调
	            disappearCallback && disappearCallback.call(ele, ev);
	            //触发自定义事件
	            ele.dispatchEvent(disappearEvt);
	            ele._hasDisAppear = true;
	            ele._appear = false;
	          }
	        }
	      });
	    }
	  }
	
	  // proto = extend(proto, listener);
	
	  function __init(opts) {
	    //扩展参数
	    extend(this.options, opts || (opts = {}));
	    //获取目标元素
	    this.appearWatchElements = this.appearWatchElements || __getElements.call(this, '.' + this.options.cls);
	    //初始化位置信息
	    __initBoundingRect.call(this, this.appearWatchElements);
	    //绑定事件
	    __bindEvent.call(this);
	  }
	  
	  var Appear = function () {
	    __init.apply(this, arguments);
	  }
	
	
	  var appear = {
	    instances: [],
	    init: function (opts) {
	      var proto = {
	        //默认参数
	        options: {
	          container: window,
	          wait: 100,
	          x: 0,
	          y: 0,
	          cls: 'lib-appear',
	          once: false,
	          onReset: function () {},
	          onAppear: function () {},
	          onDisappear: function () {}
	        },
	        container: null,
	        appearWatchElements: null,
	        bind: function (node) {
	          var cls = this.options.cls;
	          // 添加需要绑定的appear元素
	          if (typeof node == 'string') {
	            var elements = __getElements.call(this, node);
	            [].forEach.call(elements, function (ele, i) {
	              if (!ele.classList.contains(cls)) {
	                ele.classList.add(cls);
	              }
	            });
	            
	          } else if (node.nodeType == 1 && this.container.contains(node)) {
	            //如果传入的是元素并且在包含在容器中，直接添加类名
	            if (!node.classList.contains(cls)) {
	              //添加类名
	              node.classList.add(cls);
	            }
	          } else {
	            return this;
	          }
	          //新增的子元素
	          var newElements = __getElements.call(this, '.' + this.options.cls);
	          //对缓存的子元素做增量
	          this.appearWatchElements = this.appearWatchElements.concat(newElements);
	          //初始化新子元素的位置信息
	          __initBoundingRect.call(this, newElements);
	          return this;
	        },
	        // 重置函数
	        reset: function (opts) {
	          __init.call(this, opts);
	          this.appearWatchElements.forEach(function(ele) {
	            delete ele._hasAppear;
	            delete ele._hasDisAppear;
	            delete ele._appear;
	          });
	          return this;
	        },
	        fire: function () {
	          if (!this.appearWatchElements) {
	            this.appearWatchElements = [];
	          }
	          var newElements = __getElements.call(this, '.' + this.options.cls);
	          this.appearWatchElements = this.appearWatchElements.concat(newElements);
	          //初始化位置信息
	          __initBoundingRect.call(this, newElements);
	          __fire.call(this);
	          return this;
	        }
	      }
	      Appear.prototype = proto;
	      var instance = new Appear(opts);
	      this.instances.push(instance);
	      return instance;
	    },
	    fireAll: function () {
	      var instances = this.instances;
	      instances.forEach(function (instance) {
	        instance.fire();
	      });
	    }
	  }
	  //注册事件
	  createEvent();
	
	  lib.appear = appear;
	
	})(window, window.lib || (window.lib = {}));

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Atomic;
	
	var _component = __webpack_require__(122);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Component which can have no subcomponents.
	// This component should not be instantiated directly, since
	// it is designed to be used as a base class to extend from.
	function Atomic(data) {
	  _component2.default.call(this, data);
	}
	
	Atomic.prototype = Object.create(_component2.default.prototype);
	
	Atomic.prototype.createChildren = function (data) {
	  // do nonthing
	  return;
	};
	
	Atomic.prototype.appendChild = function (data) {
	  // do nothing
	  return;
	};
	
	Atomic.prototype.insertBefore = function (child, before) {
	  // do nothing
	  return;
	};
	
	Atomic.prototype.removeChild = function (child) {
	  // do nothing
	  return;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bind = bind;
	
	var _componentManager = __webpack_require__(114);
	
	var _componentManager2 = _interopRequireDefault(_componentManager);
	
	var _loader = __webpack_require__(117);
	
	var _bridge = __webpack_require__(118);
	
	var _utils = __webpack_require__(83);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var methods = {
	  // Register a new component with the specified name.
	
	  registerComponent: function registerComponent(name, comp) {
	    _componentManager2.default.registerComponent(name, comp);
	  },
	
	
	  // Register a new api module.
	  // If the module already exists, just add methods from the
	  // new module to the old one.
	  registerApiModule: function registerApiModule(name, module, meta) {
	    if (!_bridge.protocol.apiModule[name]) {
	      _bridge.protocol.apiModule[name] = module;
	    } else {
	      for (var key in module) {
	        if (module.hasOwnProperty(key)) {
	          _bridge.protocol.apiModule[name][key] = module[key];
	        }
	      }
	    }
	    // register API module's meta info to jsframework
	    if (meta) {
	      _bridge.protocol.setApiModuleMeta(meta);
	      global.registerModules(_bridge.protocol.getApiModuleMeta(name), true);
	    }
	  },
	
	
	  // Register a new api method for the specified module.
	  // opts:
	  //  - args: type of arguments the API method takes such
	  //    as ['string', 'function']
	  registerApi: function registerApi(moduleName, name, method, args) {
	    if (typeof method !== 'function') {
	      return;
	    }
	    if (!_bridge.protocol.apiModule[moduleName]) {
	      _bridge.protocol.apiModule[moduleName] = {};
	      _bridge.protocol._meta[moduleName] = [];
	    }
	    _bridge.protocol.apiModule[moduleName][name] = method;
	    if (!args) {
	      return;
	    }
	    // register API meta info to jsframework
	    _bridge.protocol.setApiMeta(moduleName, {
	      name: name,
	      args: args
	    });
	    global.registerModules(_bridge.protocol.getApiModuleMeta(moduleName), true);
	  },
	
	
	  // Register a new weex-bundle-loader.
	  registerLoader: function registerLoader(name, loaderFunc) {
	    (0, _loader.registerLoader)(name, loaderFunc);
	  }
	};
	
	// To install components and plugins.
	function install(mod) {
	  mod.init(this);
	}
	
	function bind(Weex) {
	  Weex.install = install.bind(Weex);
	  (0, _utils.extend)(Weex, methods);
	}

/***/ },
/* 134 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){Object.defineProperty(this,"val",{value:a.toString(),enumerable:!0}),this.gt=function(a){return c.compare(this,a)>0},this.gte=function(a){return c.compare(this,a)>=0},this.lt=function(a){return c.compare(this,a)<0},this.lte=function(a){return c.compare(this,a)<=0},this.eq=function(a){return 0===c.compare(this,a)}}b.env=b.env||{},c.prototype.toString=function(){return this.val},c.prototype.valueOf=function(){for(var a=this.val.split("."),b=[],c=0;c<a.length;c++){var d=parseInt(a[c],10);isNaN(d)&&(d=0);var e=d.toString();e.length<5&&(e=Array(6-e.length).join("0")+e),b.push(e),1===b.length&&b.push(".")}return parseFloat(b.join(""))},c.compare=function(a,b){a=a.toString().split("."),b=b.toString().split(".");for(var c=0;c<a.length||c<b.length;c++){var d=parseInt(a[c],10),e=parseInt(b[c],10);if(window.isNaN(d)&&(d=0),window.isNaN(e)&&(e=0),e>d)return-1;if(d>e)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))b.env.os={name:"Windows Phone",isWindowsPhone:!0,version:c[1]};else if(d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/)))b.env.os={version:c[1]},d.match(/Mobile\s+Safari/)?(b.env.os.name="Android",b.env.os.isAndroid=!0):(b.env.os.name="AndroidPad",b.env.os.isAndroidPad=!0);else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")}}else b.env.os={name:"unknown",version:"0.0.0"};b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/Firefox\/([\d\.]+)/))?b.env.browser={name:"Firefox",isFirefox:!0,version:c[1]}:(c=d.match(/MSIE\s([\d\.]+)/))||(c=d.match(/IEMobile\/([\d\.]+)/))?(b.env.browser={version:c[1]},d.match(/IEMobile/)?(b.env.browser.name="IEMobile",b.env.browser.isIEMobile=!0):(b.env.browser.name="IE",b.env.browser.isIE=!0),d.match(/Android|iPhone/)&&(b.env.browser.isIELikeWebkit=!0)):(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?(b.env.browser={name:"Chrome",isChrome:!0,version:c[1]},d.match(/Version\/[\d+\.]+\s*Chrome/)&&(b.env.browser.name="Chrome Webview",b.env.browser.isWebview=!0)):d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/g,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.navigator.userAgent;c.match(/Weibo/i)?b.env.thirdapp={appname:"Weibo",isWeibo:!0}:c.match(/MicroMessenger/i)?b.env.thirdapp={appname:"Weixin",isWeixin:!0}:b.env.thirdapp=!1}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d,e=a.navigator.userAgent;(d=e.match(/WindVane[\/\s]([\d\.\_]+)/))&&(c=d[1]);var f=!1,g="",h="",i="";(d=e.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))&&(f=!0,g=d[1],i=d[2],h=g.indexOf("-PD")>0?b.env.os.isIOS?"iPad":b.env.os.isAndroid?"AndroidPad":b.env.os.name:b.env.os.name),!g&&e.indexOf("TBIOS")>0&&(g="TB"),f?b.env.aliapp={windvane:b.version(c||"0.0.0"),appname:g||"unkown",version:b.version(i||"0.0.0"),platform:h||b.env.os.name}:b.env.aliapp=!1,b.env.taobaoApp=b.env.aliapp}(window,window.lib||(window.lib={}));;module.exports = window.lib['env'];

/***/ },
/* 135 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function(a){if("object"==typeof a){for(var c in b)delete b[c];for(var c in a)b[c]=a[c]}},get:function(){return b},enumerable:!0}),Object.defineProperty(this,"search",{set:function(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b)delete b[d];for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0])try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}catch(g){b[f[0]]=f[1]}}}},get:function(){var a=[];for(var c in b)if(void 0!==b[c])if(""!==b[c])try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]))}catch(d){a.push(c+"="+b[c])}else try{a.push(encodeURIComponent(c))}catch(d){a.push(c)}return a.length?"?"+a.join("&"):""},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"")},get:function(){return c},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i"))))throw new Error("Wrong uri scheme.");this.protocol=b[1]||("object"==typeof location?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a},a&&this.set(a.toString())}b.httpurl=function(a){return new c(a)}}(window,window.lib||(window.lib={}));;module.exports = window.lib['httpurl'];

/***/ },
/* 136 */
/***/ function(module, exports) {

	/* eslint-disable */
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var isInitialized = false;
	
	// major events supported:
	//   panstart
	//   panmove
	//   panend
	//   swipe
	//   longpress
	// extra events supported:
	//   dualtouchstart
	//   dualtouch
	//   dualtouchend
	//   tap
	//   doubletap
	//   pressend
	
	var doc = window.document;
	var docEl = doc.documentElement;
	var slice = Array.prototype.slice;
	var gestures = {};
	var lastTap = null;
	
	/**
	 * find the closest common ancestor
	 * if there's no one, return null
	 *
	 * @param  {Element} el1 first element
	 * @param  {Element} el2 second element
	 * @return {Element}     common ancestor
	 */
	function getCommonAncestor(el1, el2) {
	  var el = el1;
	  while (el) {
	    if (el.contains(el2) || el == el2) {
	      return el;
	    }
	    el = el.parentNode;
	  }
	  return null;
	}
	
	/**
	 * fire a HTMLEvent
	 *
	 * @param  {Element} element which element to fire a event on
	 * @param  {string}  type    type of event
	 * @param  {object}  extra   extra data for the event object
	 */
	function fireEvent(element, type, extra) {
	  var event = doc.createEvent('HTMLEvents');
	  event.initEvent(type, true, true);
	
	  if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
	    for (var p in extra) {
	      event[p] = extra[p];
	    }
	  }
	
	  element.dispatchEvent(event);
	}
	
	/**
	 * calc the transform
	 * assume 4 points ABCD on the coordinate system
	 * > rotate：angle rotating from AB to CD
	 * > scale：scale ratio from AB to CD
	 * > translate：translate shift from A to C
	 *
	 * @param  {number} x1 abscissa of A
	 * @param  {number} y1 ordinate of A
	 * @param  {number} x2 abscissa of B
	 * @param  {number} y2 ordinate of B
	 * @param  {number} x3 abscissa of C
	 * @param  {number} y3 ordinate of C
	 * @param  {number} x4 abscissa of D
	 * @param  {number} y4 ordinate of D
	 * @return {object}    transform object like
	 *   {rotate, scale, translate[2], matrix[3][3]}
	 */
	function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
	  var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1);
	  var scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)));
	  var translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
	
	  return {
	    rotate: rotate,
	    scale: scale,
	    translate: translate,
	    matrix: [[scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]], [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]], [0, 0, 1]]
	  };
	}
	
	/**
	 * take over the touchstart events. Add new touches to the gestures.
	 * If there is no previous records, then bind touchmove, tochend
	 * and touchcancel events.
	 * new touches initialized with state 'tapping', and within 500 milliseconds
	 * if the state is still tapping, then trigger gesture 'press'.
	 * If there are two touche points, then the 'dualtouchstart' is triggerd. The
	 * node of the touch gesture is their cloest common ancestor.
	 *
	 * @event
	 * @param  {event} event
	 */
	function touchstartHandler(event) {
	
	  if (Object.keys(gestures).length === 0) {
	    docEl.addEventListener('touchmove', touchmoveHandler, false);
	    docEl.addEventListener('touchend', touchendHandler, false);
	    docEl.addEventListener('touchcancel', touchcancelHandler, false);
	  }
	
	  // record every touch
	  for (var i = 0; i < event.changedTouches.length; i++) {
	    var touch = event.changedTouches[i];
	    var touchRecord = {};
	
	    for (var p in touch) {
	      touchRecord[p] = touch[p];
	    }
	
	    var gesture = {
	      startTouch: touchRecord,
	      startTime: Date.now(),
	      status: 'tapping',
	      element: event.srcElement || event.target,
	      pressingHandler: setTimeout(function (element, touch) {
	        return function () {
	          if (gesture.status === 'tapping') {
	            gesture.status = 'pressing';
	
	            fireEvent(element, 'longpress', {
	              // add touch data for weex
	              touch: touch,
	              touches: event.touches,
	              changedTouches: event.changedTouches,
	              touchEvent: event
	            });
	          }
	
	          clearTimeout(gesture.pressingHandler);
	          gesture.pressingHandler = null;
	        };
	      }(event.srcElement || event.target, event.changedTouches[i]), 500)
	    };
	    gestures[touch.identifier] = gesture;
	  }
	
	  if (Object.keys(gestures).length == 2) {
	    var elements = [];
	
	    for (var p in gestures) {
	      elements.push(gestures[p].element);
	    }
	
	    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
	      touches: slice.call(event.touches),
	      touchEvent: event
	    });
	  }
	}
	
	/**
	 * take over touchmove events, and handle pan and dual related gestures.
	 *
	 * 1. traverse every touch point：
	 * > if 'tapping' and the shift is over 10 pixles, then it's a 'panning'.
	 * 2. if there are two touch points, then calc the tranform and trigger
	 *   'dualtouch'.
	 *
	 * @event
	 * @param  {event} event
	 */
	function touchmoveHandler(event) {
	  for (var i = 0; i < event.changedTouches.length; i++) {
	    var touch = event.changedTouches[i];
	    var gesture = gestures[touch.identifier];
	
	    if (!gesture) {
	      return;
	    }
	
	    if (!gesture.lastTouch) {
	      gesture.lastTouch = gesture.startTouch;
	    }
	    if (!gesture.lastTime) {
	      gesture.lastTime = gesture.startTime;
	    }
	    if (!gesture.velocityX) {
	      gesture.velocityX = 0;
	    }
	    if (!gesture.velocityY) {
	      gesture.velocityY = 0;
	    }
	    if (!gesture.duration) {
	      gesture.duration = 0;
	    }
	
	    var time = Date.now() - gesture.lastTime;
	    var vx = (touch.clientX - gesture.lastTouch.clientX) / time;
	    var vy = (touch.clientY - gesture.lastTouch.clientY) / time;
	
	    var RECORD_DURATION = 70;
	    if (time > RECORD_DURATION) {
	      time = RECORD_DURATION;
	    }
	    if (gesture.duration + time > RECORD_DURATION) {
	      gesture.duration = RECORD_DURATION - time;
	    }
	
	    gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
	    gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
	    gesture.duration += time;
	
	    gesture.lastTouch = {};
	
	    for (var p in touch) {
	      gesture.lastTouch[p] = touch[p];
	    }
	    gesture.lastTime = Date.now();
	
	    var displacementX = touch.clientX - gesture.startTouch.clientX;
	    var displacementY = touch.clientY - gesture.startTouch.clientY;
	    var distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
	    var isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));
	    var direction = isVertical ? displacementY >= 0 ? 'down' : 'up' : displacementX >= 0 ? 'right' : 'left';
	
	    // magic number 10: moving 10px means pan, not tap
	    if ((gesture.status === 'tapping' || gesture.status === 'pressing') && distance > 10) {
	      gesture.status = 'panning';
	      gesture.isVertical = isVertical;
	      gesture.direction = direction;
	
	      fireEvent(gesture.element, 'panstart', {
	        touch: touch,
	        touches: event.touches,
	        changedTouches: event.changedTouches,
	        touchEvent: event,
	        isVertical: gesture.isVertical,
	        direction: direction
	      });
	    }
	
	    if (gesture.status === 'panning') {
	      gesture.panTime = Date.now();
	
	      fireEvent(gesture.element, 'panmove', {
	        displacementX: displacementX,
	        displacementY: displacementY,
	        touch: touch,
	        touches: event.touches,
	        changedTouches: event.changedTouches,
	        touchEvent: event,
	        isVertical: gesture.isVertical,
	        direction: direction
	      });
	    }
	  }
	
	  if (Object.keys(gestures).length == 2) {
	    var position = [];
	    var current = [];
	    var elements = [];
	    var transform;
	
	    for (var i = 0; i < event.touches.length; i++) {
	      var touch = event.touches[i];
	      var gesture = gestures[touch.identifier];
	      position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
	      current.push([touch.clientX, touch.clientY]);
	    }
	
	    for (var p in gestures) {
	      elements.push(gestures[p].element);
	    }
	
	    transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
	    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
	      transform: transform,
	      touches: event.touches,
	      touchEvent: event
	    });
	  }
	}
	
	/**
	 * handle touchend event
	 *
	 * 1. if there are tow touch points, then trigger 'dualtouchend'如
	 *
	 * 2. traverse every touch piont：
	 * > if tapping, then trigger 'tap'.
	 * If there is a tap 300 milliseconds before, then it's a 'doubletap'.
	 * > if padding, then decide to trigger 'panend' or 'swipe'
	 * > if pressing, then trigger 'pressend'.
	 *
	 * 3. remove listeners.
	 *
	 * @event
	 * @param  {event} event
	 */
	function touchendHandler(event) {
	
	  if (Object.keys(gestures).length == 2) {
	    var elements = [];
	    for (var p in gestures) {
	      elements.push(gestures[p].element);
	    }
	    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	      touches: slice.call(event.touches),
	      touchEvent: event
	    });
	  }
	
	  for (var i = 0; i < event.changedTouches.length; i++) {
	    var touch = event.changedTouches[i];
	    var id = touch.identifier;
	    var gesture = gestures[id];
	
	    if (!gesture) {
	      continue;
	    }
	
	    if (gesture.pressingHandler) {
	      clearTimeout(gesture.pressingHandler);
	      gesture.pressingHandler = null;
	    }
	
	    if (gesture.status === 'tapping') {
	      gesture.timestamp = Date.now();
	      fireEvent(gesture.element, 'tap', {
	        touch: touch,
	        touchEvent: event
	      });
	
	      if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
	        fireEvent(gesture.element, 'doubletap', {
	          touch: touch,
	          touchEvent: event
	        });
	      }
	
	      lastTap = gesture;
	    }
	
	    if (gesture.status === 'panning') {
	      var now = Date.now();
	      var duration = now - gesture.startTime;
	      var displacementX = touch.clientX - gesture.startTouch.clientX;
	      var displacementY = touch.clientY - gesture.startTouch.clientY;
	
	      var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
	      var isSwipe = velocity > 0.5 && now - gesture.lastTime < 100;
	      var extra = {
	        duration: duration,
	        isSwipe: isSwipe,
	        velocityX: gesture.velocityX,
	        velocityY: gesture.velocityY,
	        displacementX: displacementX,
	        displacementY: displacementY,
	        touch: touch,
	        touches: event.touches,
	        changedTouches: event.changedTouches,
	        touchEvent: event,
	        isVertical: gesture.isVertical,
	        direction: gesture.direction
	      };
	
	      fireEvent(gesture.element, 'panend', extra);
	      if (isSwipe) {
	        fireEvent(gesture.element, 'swipe', extra);
	      }
	    }
	
	    if (gesture.status === 'pressing') {
	      fireEvent(gesture.element, 'pressend', {
	        touch: touch,
	        touchEvent: event
	      });
	    }
	
	    delete gestures[id];
	  }
	
	  if (Object.keys(gestures).length === 0) {
	    docEl.removeEventListener('touchmove', touchmoveHandler, false);
	    docEl.removeEventListener('touchend', touchendHandler, false);
	    docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	  }
	}
	
	/**
	 * handle touchcancel
	 *
	 * 1. if there are two touch points, then trigger 'dualtouchend'
	 *
	 * 2. traverse everty touch point:
	 * > if pannnig, then trigger 'panend'
	 * > if pressing, then trigger 'pressend'
	 *
	 * 3. remove listeners
	 *
	 * @event
	 * @param  {event} event
	 */
	function touchcancelHandler(event) {
	
	  if (Object.keys(gestures).length == 2) {
	    var elements = [];
	    for (var p in gestures) {
	      elements.push(gestures[p].element);
	    }
	    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	      touches: slice.call(event.touches),
	      touchEvent: event
	    });
	  }
	
	  for (var i = 0; i < event.changedTouches.length; i++) {
	    var touch = event.changedTouches[i];
	    var id = touch.identifier;
	    var gesture = gestures[id];
	
	    if (!gesture) {
	      continue;
	    }
	
	    if (gesture.pressingHandler) {
	      clearTimeout(gesture.pressingHandler);
	      gesture.pressingHandler = null;
	    }
	
	    if (gesture.status === 'panning') {
	      fireEvent(gesture.element, 'panend', {
	        touch: touch,
	        touches: event.touches,
	        changedTouches: event.changedTouches,
	        touchEvent: event
	      });
	    }
	    if (gesture.status === 'pressing') {
	      fireEvent(gesture.element, 'pressend', {
	        touch: touch,
	        touchEvent: event
	      });
	    }
	    delete gestures[id];
	  }
	
	  if (Object.keys(gestures).length === 0) {
	    docEl.removeEventListener('touchmove', touchmoveHandler, false);
	    docEl.removeEventListener('touchend', touchendHandler, false);
	    docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	  }
	}
	
	if (!isInitialized) {
	  docEl.addEventListener('touchstart', touchstartHandler, false);
	  isInitialized = true;
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _componentManager = __webpack_require__(114);
	
	var _componentManager2 = _interopRequireDefault(_componentManager);
	
	var _config = __webpack_require__(116);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function detectRootHeight(root) {
	  var rootQuery = '#' + root.getWeexInstance().rootId;
	  var rootContainer = document.querySelector(rootQuery) || document.body;
	  var height = rootContainer.getBoundingClientRect().height;
	  if (height > global.innerHeight) {
	    console.warn(['[h5-render] for scrollable root like \'list\' and \'scroller\', the height of ', 'the root container must be a user-specified value. Otherwise ', 'the scrollable element may not be able to work correctly. ', 'Current height of the root element \'' + rootQuery + '\' is ', height + 'px, and mostly its height should be less than the ', 'viewport\'s height ' + global.innerHeight + 'px. Please ', 'make sure the height is correct.'].join(''));
	  }
	}
	
	function init(Weex) {
	  var Component = Weex.Component;
	
	  function RootComponent(data, nodeType) {
	    var id = data.rootId + '-root';
	    var cm = _componentManager2.default.getInstance(data.instanceId);
	
	    this.data = data;
	
	    // In some situation the root component should be implemented as
	    // its own type, otherwise it has to be a div component as a root.
	    if (!nodeType) {
	      nodeType = 'div';
	    } else if (_config2.default.validRoots.indexOf(nodeType) === -1) {
	      console.warn('[h5-render] the root component type \'' + nodeType + '\' is not one of ' + 'the types in [' + _config2.default.validRoots + '] list. It is auto downgraded ' + 'to \'div\'.');
	      nodeType = 'div';
	    } else {
	      if (!global.weex.getInstance(data.instanceId).embed) {
	        window.addEventListener('renderend', function () {
	          detectRootHeight(this);
	        }.bind(this));
	      }
	      !this.data.style.height && (this.data.style.height = '100%');
	    }
	
	    data.type = nodeType;
	    var cmp = cm.createElement(data);
	    cmp.node.id = id;
	    return cmp;
	  }
	
	  RootComponent.prototype = Object.create(Component.prototype);
	
	  Weex.registerComponent('root', RootComponent);
	}
	
	exports.default = { init: init };

/***/ },
/* 138 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function init(Weex) {
	  var Component = Weex.Component;
	
	  function Div(data, nodeType) {
	    Component.call(this, data, nodeType);
	    this.node.classList.add('weex-container');
	  }
	  Div.prototype = Object.create(Component.prototype);
	
	  Weex.registerComponent('div', Div);
	  Weex.registerComponent('container', Div);
	}
	
	exports.default = { init: init };

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _image = __webpack_require__(140);
	
	var _image2 = _interopRequireDefault(_image);
	
	var _text = __webpack_require__(143);
	
	var _text2 = _interopRequireDefault(_text);
	
	var _scrollable = __webpack_require__(144);
	
	var _scrollable2 = _interopRequireDefault(_scrollable);
	
	var _slider = __webpack_require__(161);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _indicator = __webpack_require__(170);
	
	var _indicator2 = _interopRequireDefault(_indicator);
	
	var _tabheader = __webpack_require__(173);
	
	var _tabheader2 = _interopRequireDefault(_tabheader);
	
	var _input = __webpack_require__(176);
	
	var _input2 = _interopRequireDefault(_input);
	
	var _video = __webpack_require__(177);
	
	var _video2 = _interopRequireDefault(_video);
	
	var _switch = __webpack_require__(180);
	
	var _switch2 = _interopRequireDefault(_switch);
	
	var _a = __webpack_require__(183);
	
	var _a2 = _interopRequireDefault(_a);
	
	var _embed = __webpack_require__(184);
	
	var _embed2 = _interopRequireDefault(_embed);
	
	var _spinner = __webpack_require__(185);
	
	var _spinner2 = _interopRequireDefault(_spinner);
	
	var _web = __webpack_require__(188);
	
	var _web2 = _interopRequireDefault(_web);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Refresh from './refresh'
	// import Loading from './loading'
	
	// import Select from './select'
	// import Datepicker from './datepicker'
	// import Timepicker from './timepicker'
	// TODO
	// import Countdown from './countdown'
	// import Marquee from './marquee'
	exports.default = {
	  init: function init(Weex) {
	    Weex.install(_image2.default);
	    Weex.install(_text2.default);
	    Weex.install(_scrollable2.default); // TODO
	    // Weex.install(Countdown)
	    // Weex.install(Marquee)
	    Weex.install(_slider2.default);
	    Weex.install(_indicator2.default);
	    Weex.install(_tabheader2.default); // TODO
	    Weex.install(_input2.default);
	    // Weex.registerComponent('list', Vlist)
	    // Weex.registerComponent('vlist', Vlist)
	    // Weex.registerComponent('hlist', Hlist)
	    // Weex.registerComponent('scroller', Scroller)
	    // Weex.registerComponent('select', Select)
	    // Weex.registerComponent('datepicker', Datepicker)
	    // Weex.registerComponent('timepicker', Timepicker)
	    Weex.install(_video2.default);
	    Weex.install(_switch2.default);
	    Weex.install(_a2.default);
	    Weex.install(_embed2.default);
	    // Weex.install(Refresh)
	    // Weex.install(Loading)
	    Weex.install(_spinner2.default);
	    Weex.install(_web2.default);
	  }
	}; // TODO
	// import Scroller from './scroller'

	// import Vlist from './vlist'
	// import Hlist from './hlist'

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(141);
	
	var DEFAULT_SIZE = 200;
	var RESIZE_MODES = ['stretch', 'cover', 'contain'];
	var DEFAULT_RESIZE_MODE = 'stretch';
	
	/**
	 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
	 * src: url
	 */
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-img', 'weex-element');
	    return node;
	  },
	  clearAttr: function clearAttr() {
	    this.src = '';
	    this.node.style.backgroundImage = '';
	  }
	};
	
	var attr = {
	  src: function src(val) {
	    if (!this.src) {
	      this.src = lib.img.defaultSrc;
	      this.node.style.backgroundImage = 'url(' + this.src + ')';
	    }
	    this.enableLazyload(val);
	  },
	
	  resize: function resize(val) {
	    if (RESIZE_MODES.indexOf(val) === -1) {
	      val = 'stretch';
	    }
	    this.node.style.backgroundSize = val === 'stretch' ? '100% 100%' : val;
	  }
	};
	
	var style = {
	  width: function width(val) {
	    val = parseFloat(val) * this.data.scale;
	    if (val < 0 || isNaN(val)) {
	      val = DEFAULT_SIZE;
	    }
	    this.node.style.width = val + 'px';
	  },
	
	  height: function height(val) {
	    val = parseFloat(val) * this.data.scale;
	    if (val < 0 || isNaN(val)) {
	      val = DEFAULT_SIZE;
	    }
	    this.node.style.height = val + 'px';
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  function Image(data) {
	    this.resize = DEFAULT_RESIZE_MODE;
	    Atomic.call(this, data);
	  }
	  Image.prototype = Object.create(Atomic.prototype);
	  extend(Image.prototype, proto);
	  extend(Image.prototype, { attr: attr });
	  extend(Image.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	
	  Weex.registerComponent('image', Image);
	}
	
	exports.default = { init: init };

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./image.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./image.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-img {\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  background-position: 50%;\n}", ""]);
	
	// exports


/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEFAULT_FONT_SIZE = 32;
	var DEFAULT_TEXT_OVERFLOW = 'ellipsis';
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-container');
	    node.style.fontSize = DEFAULT_FONT_SIZE * this.data.scale + 'px';
	    this.textNode = document.createElement('span');
	    // Give the developers the ability to control space
	    // and line-breakers.
	    this.textNode.style.whiteSpace = 'pre-wrap';
	    this.textNode.style.wordWrap = 'break-word';
	    this.textNode.style.display = '-webkit-box';
	    this.textNode.style.webkitBoxOrient = 'vertical';
	    this.style.lines.call(this, this.data.style.lines);
	    node.appendChild(this.textNode);
	    return node;
	  },
	  clearAttr: function clearAttr() {
	    this.node.firstChild.textContent = '';
	  }
	};
	
	var attr = {
	  value: function value(_value) {
	    var span = this.node.firstChild;
	    span.innerHTML = '';
	    if (_value == null || _value === '') {
	      return;
	    }
	    span.textContent = _value;
	    /**
	     * Developers are supposed to have the ability to break text
	     * lines manually. Using ``&nbsp;`` to replace text space is
	     * not compatible with the ``-webkit-line-clamp``. Therefor
	     * we use ``white-space: no-wrap`` instead (instead of the
	     * code bellow).
	       const frag = document.createDocumentFragment()
	        text.split(' ').forEach(function(str) {
	          const textNode = document.createTextNode(str)
	          const space = document.createElement('i')
	          space.innerHTML = '&nbsp;'
	          frag.appendChild(space)
	          frag.appendChild(textNode)
	        })
	        frag.removeChild(frag.firstChild)
	        span.appendChild(document.createElement('br'))
	        span.appendChild(frag)
	      })
	      span.removeChild(span.firstChild)
	     */
	  }
	};
	
	var style = {
	  lines: function lines(val) {
	    val = parseInt(val);
	    if (isNaN(val)) {
	      return;
	    }
	    if (val <= 0) {
	      this.textNode.style.textOverflow = '';
	      this.textNode.style.overflow = 'visible';
	      this.textNode.style.webkitLineClamp = '';
	    } else {
	      var _style = this.data ? this.data.style : null;
	      this.textNode.style.overflow = 'hidden';
	      this.textNode.style.textOverflow = _style ? _style.textOverflow : DEFAULT_TEXT_OVERFLOW;
	      this.textNode.style.webkitLineClamp = val;
	    }
	  },
	
	  textOverflow: function textOverflow(val) {
	    this.textNode.style.textOverflow = val;
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  // attr
	  //  - value: text content.
	  // style
	  //  - lines: maximum lines of the text.
	  function Text(data) {
	    Atomic.call(this, data);
	  }
	  Text.prototype = Object.create(Atomic.prototype);
	  extend(Text.prototype, proto);
	  extend(Text.prototype, { attr: attr });
	  extend(Text.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	
	  Weex.registerComponent('text', Text);
	}
	
	exports.default = { init: init };

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _list = __webpack_require__(145);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _scroller = __webpack_require__(154);
	
	var _scroller2 = _interopRequireDefault(_scroller);
	
	var _refresh = __webpack_require__(155);
	
	var _refresh2 = _interopRequireDefault(_refresh);
	
	var _loading = __webpack_require__(158);
	
	var _loading2 = _interopRequireDefault(_loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.install(_list2.default);
	    Weex.install(_scroller2.default);
	    Weex.install(_refresh2.default);
	    Weex.install(_loading2.default);
	  }
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vlist = __webpack_require__(146);
	
	var _vlist2 = _interopRequireDefault(_vlist);
	
	var _hlist = __webpack_require__(153);
	
	var _hlist2 = _interopRequireDefault(_hlist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init(Weex) {
	  Weex.install(_vlist2.default);
	  Weex.install(_hlist2.default);
	}
	
	exports.default = { init: init };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _list = __webpack_require__(147);
	
	var _list2 = _interopRequireDefault(_list);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init(Weex) {
	  var List = _list2.default.init(Weex);
	
	  function Vlist(data, nodeType) {
	    data.attr.direction = 'v';
	    List.call(this, data, nodeType);
	  }
	  Vlist.prototype = Object.create(List.prototype);
	
	  Weex.registerComponent('list', Vlist);
	  Weex.registerComponent('vlist', Vlist);
	}
	
	exports.default = { init: init };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _scrollable = __webpack_require__(148);
	
	var _scrollable2 = _interopRequireDefault(_scrollable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var availableChildrenTypes = ['cell', 'loading', 'refresh'];
	
	function getProto(Scrollable) {
	  return {
	    create: function create() {
	      var node = Scrollable.prototype.create.call(this);
	      node.classList.add('list-wrap');
	      this.scrollElement.classList.add('list-element');
	      return node;
	    },
	    createChildren: function createChildren() {
	      var children = this.data.children || [];
	      children.forEach(function (data) {
	        var type = data.type;
	        if (availableChildrenTypes.indexOf(type) === -1) {
	          // throw new Error('[h5-render] invalid child type "'
	          //   + type + '" for list.')
	          console.warn('[h5-render] invalid child type "' + type + '" for list.');
	        }
	      });
	      return Scrollable.prototype.createChildren.call(this);
	    },
	    appendChild: function appendChild(data) {
	      var type = data.type;
	      if (availableChildrenTypes.indexOf(type) === -1) {
	        // throw new Error('[h5-render] invalid child type "'
	        //   + type + '" for list.')
	        console.warn('[h5-render] invalid child type "' + type + '" for list.');
	      }
	      return Scrollable.prototype.appendChild.call(this, data);
	    },
	    insertBefore: function insertBefore(child, before) {
	      var type = child.data.type;
	      if (availableChildrenTypes.indexOf(type) === -1) {
	        // throw new Error('[h5-render] invalid child type "'
	        //   + type + '" for list.')
	        console.warn('[h5-render] invalid child type "' + type + '" for list.');
	      }
	      return Scrollable.prototype.insertBefore.call(this, child, before);
	    }
	  };
	}
	
	function init(Weex) {
	  var Scrollable = _scrollable2.default.init(Weex);
	  function List(data, nodeType) {
	    Scrollable.call(this, data, nodeType);
	  }
	  var extend = Weex.utils.extend;
	
	  List.prototype = Object.create(Scrollable.prototype);
	  extend(List.prototype, getProto(Scrollable));
	
	  return List;
	}
	
	exports.default = { init: init };

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(149);
	__webpack_require__(151);
	
	// lib.scroll events:
	//  - scrollstart
	//  - scrolling
	//  - pulldownend
	//  - pullupend
	//  - pullleftend
	//  - pullrightend
	//  - pulldown
	//  - pullup
	//  - pullleft
	//  - pullright
	//  - contentrefresh
	
	var directionMap = {
	  h: ['row', 'horizontal', 'h', 'x'],
	  v: ['column', 'vertical', 'v', 'y']
	};
	
	var DEFAULT_DIRECTION = 'column';
	var DEFAULT_LOAD_MORE_OFFSET = 0;
	
	function refreshWhenDomRenderend(comp) {
	  if (!comp.renderendHandler) {
	    comp.renderendHandler = function () {
	      comp.scroller.refresh();
	    };
	  }
	  window.addEventListener('renderend', comp.renderendHandler);
	}
	
	function removeEvents(comp) {
	  if (comp.renderendHandler) {
	    window.removeEventListener('renderend', comp.renderendHandler);
	  }
	}
	
	function getProto(Weex) {
	  var Component = Weex.Component;
	
	  function create(nodeType) {
	    var Scroll = lib.scroll;
	    var node = Component.prototype.create.call(this, nodeType);
	    node.classList.add('weex-container', 'scrollable-wrap');
	    this.scrollElement = document.createElement('div');
	    this.scrollElement.classList.add('weex-container', 'scrollable-element', 'dir-' + this.direction);
	
	    this.scrollElement.style.webkitBoxOrient = directionMap[this.direction][1];
	    this.scrollElement.style.webkitFlexDirection = directionMap[this.direction][0];
	    this.scrollElement.style.flexDirection = directionMap[this.direction][0];
	
	    node.appendChild(this.scrollElement);
	    this.scroller = new Scroll({
	      // if the direction is x, then the bounding rect of the scroll element
	      // should be got by the 'Range' API other than the 'getBoundingClientRect'
	      // API, because the width outside the viewport won't be count in by
	      // 'getBoundingClientRect'.
	      // Otherwise should use the element rect in case there is a child scroller
	      // or list in this scroller. If using 'Range', the whole scroll element
	      // including the hiding part will be count in the rect.
	      useElementRect: this.direction === 'v',
	      scrollElement: this.scrollElement,
	      direction: this.direction === 'h' ? 'x' : 'y'
	    });
	    this.scroller.init();
	    this.offset = 0;
	    return node;
	  }
	
	  function createChildren() {
	    var children = this.data.children;
	    var parentRef = this.data.ref;
	    var componentManager = this.getComponentManager();
	    if (children && children.length) {
	      var fragment = document.createDocumentFragment();
	      var isFlex = false;
	      for (var i = 0; i < children.length; i++) {
	        children[i].instanceId = this.data.instanceId;
	        children[i].scale = this.data.scale;
	        var child = componentManager.createElement(children[i]);
	        fragment.appendChild(child.node);
	        child.parentRef = parentRef;
	        if (!isFlex && child.data.style && child.data.style.hasOwnProperty('flex')) {
	          isFlex = true;
	        }
	      }
	      this.scrollElement.appendChild(fragment);
	    }
	    // wait for fragment to appended on scrollElement on UI thread.
	    setTimeout(function () {
	      this.scroller.refresh();
	    }.bind(this), 0);
	  }
	
	  function appendChild(data) {
	    var children = this.data.children;
	    var componentManager = this.getComponentManager();
	    var child = componentManager.createElement(data);
	    this.scrollElement.appendChild(child.node);
	
	    // wait for UI thread to update.
	    setTimeout(function () {
	      this.scroller.refresh();
	    }.bind(this), 0);
	
	    // update this.data.children
	    if (!children || !children.length) {
	      this.data.children = [data];
	    } else {
	      children.push(data);
	    }
	
	    return child;
	  }
	
	  function insertBefore(child, before) {
	    var children = this.data.children;
	    var i = 0;
	    var isAppend = false;
	
	    // update this.data.children
	    if (!children || !children.length || !before) {
	      isAppend = true;
	    } else {
	      var l = void 0;
	      for (l = children.length; i < l; i++) {
	        if (children[i].ref === before.data.ref) {
	          break;
	        }
	      }
	      if (i === l) {
	        isAppend = true;
	      }
	    }
	
	    if (isAppend) {
	      this.scrollElement.appendChild(child.node);
	      children.push(child.data);
	    } else {
	      var refreshLoadingPlaceholder = before.refreshPlaceholder || before.loadingPlaceholder;
	      if (refreshLoadingPlaceholder) {
	        this.scrollElement.insertBefore(child.node, refreshLoadingPlaceholder);
	      } else if (before.fixedPlaceholder) {
	        this.scrollElement.insertBefore(child.node, before.fixedPlaceholder);
	      } else if (before.stickyPlaceholder) {
	        this.scrollElement.insertBefore(child.node, before.stickyPlaceholder);
	      } else {
	        this.scrollElement.insertBefore(child.node, before.node);
	      }
	      children.splice(i, 0, child.data);
	    }
	
	    // wait for UI thread to update.
	    setTimeout(function () {
	      this.scroller.refresh();
	    }.bind(this), 0);
	  }
	
	  function removeChild(child) {
	    var children = this.data.children;
	    // remove from this.data.children
	    var i = 0;
	    var componentManager = this.getComponentManager();
	    if (children && children.length) {
	      var l = void 0;
	      for (l = children.length; i < l; i++) {
	        if (children[i].ref === child.data.ref) {
	          break;
	        }
	      }
	      if (i < l) {
	        children.splice(i, 1);
	      }
	    }
	    // remove from componentMap recursively
	    componentManager.removeComponent(child.data.ref);
	    var refreshLoadingPlaceholder = child.refreshPlaceholder || child.loadingPlaceholder;
	    child.unsetPosition();
	    if (refreshLoadingPlaceholder) {
	      this.scrollElement.removeChild(refreshLoadingPlaceholder);
	    }
	    child.node.parentNode.removeChild(child.node);
	
	    // wait for UI thread to update.
	    setTimeout(function () {
	      this.scroller.refresh();
	    }.bind(this), 0);
	  }
	
	  function bindEvents(evts) {
	    Component.prototype.bindEvents.call(this, evts);
	    // to enable lazyload for Images
	    this.scroller.addEventListener('scrolling', function (e) {
	      var so = e.scrollObj;
	      var scrollTop = so.getScrollTop();
	      var scrollLeft = so.getScrollLeft();
	      var offset = this.direction === 'v' ? scrollTop : scrollLeft;
	      var diff = offset - this.offset;
	      var dir = void 0;
	      if (diff >= 0) {
	        dir = this.direction === 'v' ? 'up' : 'left';
	      } else {
	        dir = this.direction === 'v' ? 'down' : 'right';
	      }
	      this.dispatchEvent('scroll', {
	        originalType: 'scrolling',
	        scrollTop: so.getScrollTop(),
	        scrollLeft: so.getScrollLeft(),
	        offset: offset,
	        direction: dir
	      }, {
	        bubbles: true
	      });
	      this.offset = offset;
	
	      // fire loadmore event.
	      var leftDist = Math.abs(so.maxScrollOffset) - this.offset;
	      if (leftDist <= this.loadmoreoffset && this.isAvailableToFireloadmore) {
	        this.isAvailableToFireloadmore = false;
	        this.dispatchEvent('loadmore');
	      } else if (leftDist > this.loadmoreoffset && !this.isAvailableToFireloadmore) {
	        this.isAvailableToFireloadmore = true;
	      }
	    }.bind(this));
	  }
	
	  function onAppend() {
	    refreshWhenDomRenderend(this);
	  }
	
	  function onRemove() {
	    removeEvents(this);
	  }
	
	  return {
	    create: create,
	    createChildren: createChildren,
	    appendChild: appendChild,
	    insertBefore: insertBefore,
	    removeChild: removeChild,
	    bindEvents: bindEvents,
	    onAppend: onAppend,
	    onRemove: onRemove
	  };
	}
	
	var attr = {
	  loadmoreoffset: function loadmoreoffset(val) {
	    val = parseFloat(val);
	    if (val < 0 || isNaN(val)) {
	      console.warn('[h5-render] invalida');
	      return;
	    }
	    this.loadmoreoffset = val;
	  }
	};
	
	function init(Weex) {
	  var Component = Weex.Component;
	  var extend = Weex.utils.extend;
	
	  // attrs:
	  //  - loadmoreoffset: updatable
	  //  - scroll-direciton: none|vertical|horizontal (default is vertical)
	  //  - show-scrollbar: true|false (default is true)
	  function Scrollable(data, nodeType) {
	    this.loadmoreoffset = DEFAULT_LOAD_MORE_OFFSET;
	    this.isAvailableToFireloadmore = true;
	    var attrs = data.attr || {};
	    var direction = attrs.scrollDirection || attrs.direction || DEFAULT_DIRECTION;
	    this.direction = directionMap.h.indexOf(direction) === -1 ? 'v' : 'h';
	    this.showScrollbar = attrs.showScrollbar || true;
	    Component.call(this, data, nodeType);
	  }
	  Scrollable.prototype = Object.create(Component.prototype);
	  extend(Scrollable.prototype, getProto(Weex));
	  extend(Scrollable.prototype, { attr: attr });
	  return Scrollable;
	}
	
	exports.default = { init: init };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(150);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./scrollable.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./scrollable.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".scrollable-wrap {\n  display: block;\n  overflow: hidden;\n}\n\n.scrollable-element.horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.scrollable-element.vertical {\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/* eslint-disable */
	
	__webpack_require__(152);
	
	var doc = window.document;
	var ua = window.navigator.userAgent;
	var scrollObjs = {};
	var plugins = {};
	var dpr = window.dpr || (!!window.navigator.userAgent.match(/iPhone|iPad|iPod/) ? document.documentElement.clientWidth / window.screen.availWidth : 1);
	var inertiaCoefficient = {
	  normal: [2 * dpr, 0.0015 * dpr],
	  slow: [1.5 * dpr, 0.003 * dpr],
	  veryslow: [1.5 * dpr, 0.005 * dpr]
	};
	var timeFunction = {
	  ease: [.25, .1, .25, 1],
	  liner: [0, 0, 1, 1],
	  'ease-in': [.42, 0, 1, 1],
	  'ease-out': [0, 0, .58, 1],
	  'ease-in-out': [.42, 0, .58, 1]
	};
	var Firefox = !!ua.match(/Firefox/i);
	var IEMobile = !!ua.match(/IEMobile/i);
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-';
	var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit';
	
	function debugLog() {
	  if (lib.scroll.outputDebugLog) {
	    console.log.apply(console, arguments);
	  }
	}
	
	function getBoundingClientRect(el) {
	  var rect = el.getBoundingClientRect();
	  if (!rect) {
	    rect = {};
	    rect.width = el.offsetWidth;
	    rect.height = el.offsetHeight;
	
	    rect.left = el.offsetLeft;
	    rect.top = el.offsetTop;
	    var parent = el.offsetParent;
	    while (parent) {
	      rect.left += parent.offsetLeft;
	      rect.top += parent.offsetTop;
	      parent = parent.offsetParent;
	    }
	
	    rect.right = rect.left + rect.width;
	    rect.bottom = rect.top + rect.height;
	  }
	  return rect;
	}
	
	function getMinScrollOffset(scrollObj) {
	  return 0 - scrollObj.options[scrollObj.axis + 'PaddingTop'];
	}
	
	function getMaxScrollOffset(scrollObj) {
	  var rect = getBoundingClientRect(scrollObj.element);
	  var pRect = getBoundingClientRect(scrollObj.viewport);
	  var min = getMinScrollOffset(scrollObj);
	  if (scrollObj.axis === 'y') {
	    var max = 0 - rect.height + pRect.height;
	  } else {
	    var max = 0 - rect.width + pRect.width;
	  }
	  return Math.min(max + scrollObj.options[scrollObj.axis + 'PaddingBottom'], min);
	}
	
	function _getBoundaryOffset(scrollObj, offset) {
	  if (offset > scrollObj.minScrollOffset) {
	    return offset - scrollObj.minScrollOffset;
	  }
	  if (offset < scrollObj.maxScrollOffset) {
	    return offset - scrollObj.maxScrollOffset;
	  }
	}
	
	function touchBoundary(scrollObj, offset) {
	  if (offset > scrollObj.minScrollOffset) {
	    offset = scrollObj.minScrollOffset;
	  } else if (offset < scrollObj.maxScrollOffset) {
	    offset = scrollObj.maxScrollOffset;
	  }
	  return offset;
	}
	
	function fireEvent(scrollObj, eventName, extra) {
	  debugLog(scrollObj.element.scrollId, eventName, extra);
	  var event = doc.createEvent('HTMLEvents');
	  event.initEvent(eventName, false, true);
	  event.scrollObj = scrollObj;
	  if (extra) {
	    for (var key in extra) {
	      event[key] = extra[key];
	    }
	  }
	  scrollObj.element.dispatchEvent(event);
	  scrollObj.viewport.dispatchEvent(event);
	}
	
	function getTransformOffset(scrollObj) {
	  var offset = { x: 0, y: 0 };
	  var transform = getComputedStyle(scrollObj.element)[stylePrefix + 'Transform'];
	  var matched;
	  var reg1 = new RegExp('^matrix3d' + '\\((?:[-\\d.]+,\\s*){12}([-\\d.]+),' + '\\s*([-\\d.]+)(?:,\\s*[-\\d.]+){2}\\)');
	  var reg2 = new RegExp('^matrix' + '\\((?:[-\\d.]+,\\s*){4}([-\\d.]+),\\s*([-\\d.]+)\\)$');
	  if (transform !== 'none') {
	    if (matched = transform.match(reg1) || transform.match(reg2)) {
	      offset.x = parseFloat(matched[1]) || 0;
	      offset.y = parseFloat(matched[2]) || 0;
	    }
	  }
	
	  return offset;
	}
	
	var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
	var has3d = !!Firefox || CSSMatrix in window && 'm11' in new window[CSSMatrix]();
	function getTranslate(x, y) {
	  x = parseFloat(x);
	  y = parseFloat(y);
	
	  if (x != 0) {
	    x += 'px';
	  }
	
	  if (y != 0) {
	    y += 'px';
	  }
	
	  if (has3d) {
	    return 'translate3d(' + x + ', ' + y + ', 0)';
	  }
	  return 'translate(' + x + ', ' + y + ')';
	}
	
	function setTransitionStyle(scrollObj, duration, timingFunction) {
	  if (duration === '' && timingFunction === '') {
	    scrollObj.element.style[stylePrefix + 'Transition'] = '';
	  } else {
	    scrollObj.element.style[stylePrefix + 'Transition'] = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s';
	  }
	}
	
	function setTransformStyle(scrollObj, offset) {
	  var x = 0;
	  var y = 0;
	  if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) === 'object') {
	    x = offset.x;
	    y = offset.y;
	  } else {
	    if (scrollObj.axis === 'y') {
	      y = offset;
	    } else {
	      x = offset;
	    }
	  }
	  scrollObj.element.style[stylePrefix + 'Transform'] = getTranslate(x, y);
	}
	
	var panning = false;
	doc.addEventListener('touchmove', function (e) {
	  if (panning) {
	    e.preventDefault();
	    return false;
	  }
	  return true;
	}, false);
	
	function Scroll(element, options) {
	  var that = this;
	
	  options = options || {};
	  options.noBounce = !!options.noBounce;
	  options.padding = options.padding || {};
	
	  if (options.isPrevent == null) {
	    options.isPrevent = true;
	  } else {
	    options.isPrevent = !!options.isPrevent;
	  }
	
	  if (options.isFixScrollendClick == null) {
	    options.isFixScrollendClick = true;
	  } else {
	    options.isFixScrollendClick = !!options.isFixScrollendClick;
	  }
	
	  if (options.padding) {
	    options.yPaddingTop = -options.padding.top || 0;
	    options.yPaddingBottom = -options.padding.bottom || 0;
	    options.xPaddingTop = -options.padding.left || 0;
	    options.xPaddingBottom = -options.padding.right || 0;
	  } else {
	    options.yPaddingTop = 0;
	    options.yPaddingBottom = 0;
	    options.xPaddingTop = 0;
	    options.xPaddingBottom = 0;
	  }
	
	  options.direction = options.direction || 'y';
	  options.inertia = options.inertia || 'normal';
	
	  this.options = options;
	  that.axis = options.direction;
	  this.element = element;
	  this.viewport = element.parentNode;
	  this.plugins = {};
	
	  this.element.scrollId = setTimeout(function () {
	    scrollObjs[that.element.scrollId + ''] = that;
	  }, 1);
	
	  this.viewport.addEventListener('touchstart', touchstartHandler, false);
	  this.viewport.addEventListener('touchend', touchendHandler, false);
	  this.viewport.addEventListener('touchcancel', touchendHandler, false);
	  this.viewport.addEventListener('panstart', panstartHandler, false);
	  this.viewport.addEventListener('panmove', panHandler, false);
	  this.viewport.addEventListener('panend', panendHandler, false);
	
	  if (options.isPrevent) {
	    this.viewport.addEventListener('touchstart', function (e) {
	      panning = true;
	    }, false);
	    that.viewport.addEventListener('touchend', function (e) {
	      panning = false;
	    }, false);
	  }
	
	  // if (options.isPrevent) {
	  //   var d = this.axis === 'y'?'vertical':'horizontal'
	  //   this.viewport.addEventListener(d + 'panstart', function (e) {
	  //     panning = true
	  //   }, false)
	  //   that.viewport.addEventListener('panend', function (e) {
	  //     panning = false
	  //   }, false)
	  // }
	
	  if (options.isFixScrollendClick) {
	    var preventScrollendClickHandler = function preventScrollendClickHandler(e) {
	      if (preventScrollendClick || isScrolling) {
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	      }
	      return true;
	    };
	
	    var fireNiceTapEventHandler = function fireNiceTapEventHandler(e) {
	      if (!preventScrollendClick && !isScrolling) {
	        setTimeout(function () {
	          var niceTapEvent = document.createEvent('HTMLEvents');
	          niceTapEvent.initEvent('niceclick', true, true);
	          e.target.dispatchEvent(niceTapEvent);
	        }, 300);
	      }
	    };
	
	    var preventScrollendClick;
	    var fixScrollendClickTimeoutId;
	
	    this.viewport.addEventListener('scrolling', function () {
	      preventScrollendClick = true;
	      fixScrollendClickTimeoutId && clearTimeout(fixScrollendClickTimeoutId);
	      fixScrollendClickTimeoutId = setTimeout(function (e) {
	        preventScrollendClick = false;
	      }, 400);
	    }, false);
	
	    this.viewport.addEventListener('click', preventScrollendClickHandler);
	    this.viewport.addEventListener('tap', fireNiceTapEventHandler);
	  }
	
	  function setTransitionEndHandler(h, t) {
	    if (options.useFrameAnimation) {
	      return;
	    }
	    transitionEndHandler = null;
	    clearTimeout(transitionEndTimeoutId);
	
	    transitionEndTimeoutId = setTimeout(function () {
	      if (transitionEndHandler) {
	        transitionEndHandler = null;
	        lib.animation.requestFrame(h);
	      }
	    }, t || 400);
	
	    transitionEndHandler = h;
	  }
	
	  if (options.useFrameAnimation) {
	    var scrollAnimation;
	
	    Object.defineProperty(this, 'animation', {
	      get: function get() {
	        return scrollAnimation;
	      }
	    });
	  } else {
	    var transitionEndHandler;
	    var transitionEndTimeoutId = 0;
	
	    element.addEventListener(Firefox ? 'transitionend' : stylePrefix + 'TransitionEnd', function (e) {
	      if (transitionEndHandler) {
	        var handler = transitionEndHandler;
	
	        transitionEndHandler = null;
	        clearTimeout(transitionEndTimeoutId);
	
	        lib.animation.requestFrame(function () {
	          handler(e);
	        });
	      }
	    }, false);
	  }
	
	  var panFixRatio;
	  var isScrolling;
	  var isFlickScrolling;
	  var cancelScrollEnd;
	
	  Object.defineProperty(this, 'isScrolling', {
	    get: function get() {
	      return !!isScrolling;
	    }
	  });
	
	  function isEnabled(e) {
	    if (!that.enabled) {
	      return false;
	    }
	
	    if (typeof e.isVertical != 'undefined') {
	      if (that.axis === 'y' && e.isVertical || that.axis === 'x' && !e.isVertical) {
	        // gesture in same direction, stop bubbling up
	        e.stopPropagation();
	      } else {
	        // gesture in different direction, bubbling up
	        // to the top, without any other process
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  function touchstartHandler(e) {
	    if (!isEnabled(e)) {
	      return;
	    }
	
	    if (isScrolling) {
	      scrollEnd();
	    }
	
	    if (options.useFrameAnimation) {
	      scrollAnimation && scrollAnimation.stop();
	      scrollAnimation = null;
	    } else {
	      var transform = getTransformOffset(that);
	      setTransformStyle(that, transform);
	      setTransitionStyle(that, '', '');
	      transitionEndHandler = null;
	      clearTimeout(transitionEndTimeoutId);
	    }
	  }
	
	  function touchendHandler(e) {
	    if (!isEnabled(e)) {
	      return;
	    }
	
	    var s0 = getTransformOffset(that)[that.axis];
	    var boundaryOffset = _getBoundaryOffset(that, s0);
	
	    if (boundaryOffset) {
	      // dragging out of boundray, bounce is needed
	      var s1 = touchBoundary(that, s0);
	
	      if (options.useFrameAnimation) {
	        // frame
	        var _s = s1 - s0;
	        scrollAnimation = new lib.animation(400, lib.cubicbezier.ease, 0, function (i1, i2) {
	          var offset = (s0 + _s * i2).toFixed(2);
	          setTransformStyle(that, offset);
	          fireEvent(that, 'scrolling');
	        });
	        scrollAnimation.onend(scrollEnd);
	        scrollAnimation.play();
	      } else {
	        // css
	        var offset = s1.toFixed(0);
	        setTransitionEndHandler(scrollEnd, 400);
	        setTransitionStyle(that, '0.4s', 'ease');
	        setTransformStyle(that, offset);
	
	        lib.animation.requestFrame(function doScroll() {
	          if (isScrolling && that.enabled) {
	            fireEvent(that, 'scrolling');
	            lib.animation.requestFrame(doScroll);
	          }
	        });
	      }
	
	      if (boundaryOffset > 0) {
	        fireEvent(that, that.axis === 'y' ? 'pulldownend' : 'pullrightend');
	      } else if (boundaryOffset < 0) {
	        fireEvent(that, that.axis === 'y' ? 'pullupend' : 'pullleftend');
	      }
	    } else if (isScrolling) {
	      // without exceeding the boundary, just end it
	      scrollEnd();
	    }
	  }
	
	  var lastDisplacement;
	  function panstartHandler(e) {
	    if (!isEnabled(e)) {
	      return;
	    }
	
	    that.transformOffset = getTransformOffset(that);
	    that.minScrollOffset = getMinScrollOffset(that);
	    that.maxScrollOffset = getMaxScrollOffset(that);
	    panFixRatio = 2.5;
	    cancelScrollEnd = true;
	    isScrolling = true;
	    isFlickScrolling = false;
	    fireEvent(that, 'scrollstart');
	
	    lastDisplacement = e['displacement' + that.axis.toUpperCase()];
	  }
	
	  function panHandler(e) {
	    if (!isEnabled(e)) {
	      return;
	    }
	
	    // finger move less than 5 px. just ignore that.
	    var displacement = e['displacement' + that.axis.toUpperCase()];
	    if (Math.abs(displacement - lastDisplacement) < 5) {
	      e.stopPropagation();
	      return;
	    }
	    lastDisplacement = displacement;
	
	    var offset = that.transformOffset[that.axis] + displacement;
	    if (offset > that.minScrollOffset) {
	      offset = that.minScrollOffset + (offset - that.minScrollOffset) / panFixRatio;
	      panFixRatio *= 1.003;
	    } else if (offset < that.maxScrollOffset) {
	      offset = that.maxScrollOffset - (that.maxScrollOffset - offset) / panFixRatio;
	      panFixRatio *= 1.003;
	    }
	    if (panFixRatio > 4) {
	      panFixRatio = 4;
	    }
	
	    // tell whether or not reach the fringe
	    var boundaryOffset = _getBoundaryOffset(that, offset);
	    if (boundaryOffset) {
	      fireEvent(that, boundaryOffset > 0 ? that.axis === 'y' ? 'pulldown' : 'pullright' : that.axis === 'y' ? 'pullup' : 'pullleft', {
	        boundaryOffset: Math.abs(boundaryOffset)
	      });
	      if (that.options.noBounce) {
	        offset = touchBoundary(that, offset);
	      }
	    }
	
	    setTransformStyle(that, offset.toFixed(2));
	    fireEvent(that, 'scrolling');
	  }
	
	  function panendHandler(e) {
	    if (!isEnabled(e)) {
	      return;
	    }
	
	    if (e.isSwipe) {
	      flickHandler(e);
	    }
	  }
	
	  function flickHandler(e) {
	    cancelScrollEnd = true;
	
	    var v0, a0, t0, s0, s, motion0;
	    var v1, a1, t1, s1, motion1, sign;
	    var v2, a2, t2, s2, motion2, ft;
	
	    s0 = getTransformOffset(that)[that.axis];
	    var boundaryOffset0 = _getBoundaryOffset(that, s0);
	    if (!boundaryOffset0) {
	      // when fingers left the range of screen, let touch end handler
	      // to deal with it.
	      // when fingers left the screen, but still in the range of
	      // screen, calculate the intertia.
	      v0 = e['velocity' + that.axis.toUpperCase()];
	
	      var maxV = 2;
	      var friction = 0.0015;
	      if (options.inertia && inertiaCoefficient[options.inertia]) {
	        maxV = inertiaCoefficient[options.inertia][0];
	        friction = inertiaCoefficient[options.inertia][1];
	      }
	
	      if (v0 > maxV) {
	        v0 = maxV;
	      }
	      if (v0 < -maxV) {
	        v0 = -maxV;
	      }
	      a0 = friction * (v0 / Math.abs(v0));
	      motion0 = new lib.motion({
	        v: v0,
	        a: -a0
	      });
	      t0 = motion0.t;
	      s = s0 + motion0.s;
	
	      var boundaryOffset1 = _getBoundaryOffset(that, s);
	      if (boundaryOffset1) {
	        debugLog('inertial calculation has exceeded the boundary', boundaryOffset1);
	
	        v1 = v0;
	        a1 = a0;
	        if (boundaryOffset1 > 0) {
	          s1 = that.minScrollOffset;
	          sign = 1;
	        } else {
	          s1 = that.maxScrollOffset;
	          sign = -1;
	        }
	        motion1 = new lib.motion({
	          v: sign * v1,
	          a: -sign * a1,
	          s: Math.abs(s1 - s0)
	        });
	        t1 = motion1.t;
	        var timeFunction1 = motion1.generateCubicBezier();
	
	        v2 = v1 - a1 * t1;
	        a2 = 0.03 * (v2 / Math.abs(v2));
	        motion2 = new lib.motion({
	          v: v2,
	          a: -a2
	        });
	        t2 = motion2.t;
	        s2 = s1 + motion2.s;
	        var timeFunction2 = motion2.generateCubicBezier();
	
	        if (options.noBounce) {
	          debugLog('no bounce effect');
	
	          if (s0 !== s1) {
	            if (options.useFrameAnimation) {
	              // frame
	              var _s = s1 - s0;
	              var bezier = lib.cubicbezier(timeFunction1[0][0], timeFunction1[0][1], timeFunction1[1][0], timeFunction1[1][1]);
	              scrollAnimation = new lib.animation(t1.toFixed(0), bezier, 0, function (i1, i2) {
	                var offset = s0 + _s * i2;
	                getTransformOffset(that, offset.toFixed(2));
	                fireEvent(that, 'scrolling', {
	                  afterFlick: true
	                });
	              });
	
	              scrollAnimation.onend(scrollEnd);
	
	              scrollAnimation.play();
	            } else {
	              // css
	              var offset = s1.toFixed(0);
	              setTransitionEndHandler(scrollEnd, (t1 / 1000).toFixed(2) * 1000);
	              setTransitionStyle(that, (t1 / 1000).toFixed(2) + 's', 'cubic-bezier(' + timeFunction1 + ')');
	              setTransformStyle(that, offset);
	            }
	          } else {
	            scrollEnd();
	          }
	        } else if (s0 !== s2) {
	          debugLog('scroll for inertia', 's=' + s2.toFixed(0), 't=' + ((t1 + t2) / 1000).toFixed(2));
	
	          if (options.useFrameAnimation) {
	            var _s = s2 - s0;
	            var bezier = lib.cubicbezier.easeOut;
	            scrollAnimation = new lib.animation((t1 + t2).toFixed(0), bezier, 0, function (i1, i2) {
	              var offset = s0 + _s * i2;
	              setTransformStyle(that, offset.toFixed(2));
	              fireEvent(that, 'scrolling', {
	                afterFlick: true
	              });
	            });
	
	            scrollAnimation.onend(function () {
	              if (!that.enabled) {
	                return;
	              }
	
	              var _s = s1 - s2;
	              var bezier = lib.cubicbezier.ease;
	              scrollAnimation = new lib.animation(400, bezier, 0, function (i1, i2) {
	                var offset = s2 + _s * i2;
	                setTransformStyle(that, offset.toFixed(2));
	                fireEvent(that, 'scrolling', {
	                  afterFlick: true
	                });
	              });
	
	              scrollAnimation.onend(scrollEnd);
	
	              scrollAnimation.play();
	            });
	
	            scrollAnimation.play();
	          } else {
	            var offset = s2.toFixed(0);
	            setTransitionEndHandler(function (e) {
	              if (!that.enabled) {
	                return;
	              }
	
	              debugLog('inertial bounce', 's=' + s1.toFixed(0), 't=400');
	
	              if (s2 !== s1) {
	                var offset = s1.toFixed(0);
	                setTransitionStyle(that, '0.4s', 'ease');
	                setTransformStyle(that, offset);
	                setTransitionEndHandler(scrollEnd, 400);
	              } else {
	                scrollEnd();
	              }
	            }, ((t1 + t2) / 1000).toFixed(2) * 1000);
	
	            setTransitionStyle(that, ((t1 + t2) / 1000).toFixed(2) + 's', 'ease-out');
	            setTransformStyle(that, offset);
	          }
	        } else {
	          scrollEnd();
	        }
	      } else {
	        debugLog('inertial calculation hasn\'t exceeded the boundary');
	        var timeFunction = motion0.generateCubicBezier();
	
	        if (options.useFrameAnimation) {
	          // frame
	          var _s = s - s0;
	          var bezier = lib.cubicbezier(timeFunction[0][0], timeFunction[0][1], timeFunction[1][0], timeFunction[1][1]);
	          scrollAnimation = new lib.animation(t0.toFixed(0), bezier, 0, function (i1, i2) {
	            var offset = (s0 + _s * i2).toFixed(2);
	            setTransformStyle(that, offset);
	            fireEvent(that, 'scrolling', {
	              afterFlick: true
	            });
	          });
	
	          scrollAnimation.onend(scrollEnd);
	
	          scrollAnimation.play();
	        } else {
	          // css
	          var offset = s.toFixed(0);
	          setTransitionEndHandler(scrollEnd, (t0 / 1000).toFixed(2) * 1000);
	          setTransitionStyle(that, (t0 / 1000).toFixed(2) + 's', 'cubic-bezier(' + timeFunction + ')');
	          setTransformStyle(that, offset);
	        }
	      }
	
	      isFlickScrolling = true;
	      if (!options.useFrameAnimation) {
	        lib.animation.requestFrame(function doScroll() {
	          if (isScrolling && isFlickScrolling && that.enabled) {
	            fireEvent(that, 'scrolling', {
	              afterFlick: true
	            });
	            lib.animation.requestFrame(doScroll);
	          }
	        });
	      }
	    }
	  }
	
	  function scrollEnd() {
	    if (!that.enabled) {
	      return;
	    }
	
	    cancelScrollEnd = false;
	
	    setTimeout(function () {
	      if (!cancelScrollEnd && isScrolling) {
	        isScrolling = false;
	        isFlickScrolling = false;
	
	        if (options.useFrameAnimation) {
	          scrollAnimation && scrollAnimation.stop();
	          scrollAnimation = null;
	        } else {
	          setTransitionStyle(that, '', '');
	        }
	        fireEvent(that, 'scrollend');
	      }
	    }, 50);
	  }
	
	  var proto = {
	    init: function init() {
	      this.enable();
	      this.refresh();
	      this.scrollTo(0);
	      return this;
	    },
	
	    enable: function enable() {
	      this.enabled = true;
	      return this;
	    },
	
	    disable: function disable() {
	      var el = this.element;
	      this.enabled = false;
	
	      if (this.options.useFrameAnimation) {
	        scrollAnimation && scrollAnimation.stop();
	      } else {
	        lib.animation.requestFrame(function () {
	          el.style[stylePrefix + 'Transform'] = getComputedStyle(el)[stylePrefix + 'Transform'];
	        });
	      }
	
	      return this;
	    },
	
	    getScrollWidth: function getScrollWidth() {
	      return getBoundingClientRect(this.element).width;
	    },
	
	    getScrollHeight: function getScrollHeight() {
	      return getBoundingClientRect(this.element).height;
	    },
	
	    getScrollLeft: function getScrollLeft() {
	      return -getTransformOffset(this).x - this.options.xPaddingTop;
	    },
	
	    getScrollTop: function getScrollTop() {
	      return -getTransformOffset(this).y - this.options.yPaddingTop;
	    },
	
	    getMaxScrollLeft: function getMaxScrollLeft() {
	      return -that.maxScrollOffset - this.options.xPaddingTop;
	    },
	
	    getMaxScrollTop: function getMaxScrollTop() {
	      return -that.maxScrollOffset - this.options.yPaddingTop;
	    },
	
	    getBoundaryOffset: function getBoundaryOffset() {
	      return Math.abs(_getBoundaryOffset(this, getTransformOffset(this)[this.axis]) || 0);
	    },
	
	    refresh: function refresh() {
	      var el = this.element;
	      var isVertical = this.axis === 'y';
	      var type = isVertical ? 'height' : 'width';
	      var size, rect, extraSize;
	
	      function getExtraSize(el, isVertical) {
	        var extraType = isVertical ? ['top', 'bottom'] : ['left', 'right'];
	        return parseFloat(getComputedStyle(el.firstElementChild)['margin-' + extraType[0]]) + parseFloat(getComputedStyle(el.lastElementChild)['margin-' + extraType[1]]);
	      }
	
	      if (this.options[type] != null) {
	        // use options
	        size = this.options[type];
	      } else if (el.childElementCount <= 0) {
	        el.style[type] = 'auto';
	        size = null;
	      } else if (!!this.options.useElementRect) {
	        el.style[type] = 'auto';
	        rect = getBoundingClientRect(el);
	        size = rect[type];
	        size += getExtraSize(el, isVertical);
	      } else {
	        var range, rect;
	        var firstEl = el.firstElementChild;
	        var lastEl = el.lastElementChild;
	
	        if (document.createRange && !this.options.ignoreOverflow) {
	          // use range
	          range = document.createRange();
	          range.selectNodeContents(el);
	          rect = getBoundingClientRect(range);
	        }
	
	        if (rect) {
	          size = rect[type];
	        } else {
	          // use child offsets
	          while (firstEl) {
	            if (getBoundingClientRect(firstEl)[type] === 0 && firstEl.nextElementSibling) {
	              firstEl = firstEl.nextElementSibling;
	            } else {
	              break;
	            }
	          }
	
	          while (lastEl && lastEl !== firstEl) {
	            if (getBoundingClientRect(lastEl)[type] === 0 && lastEl.previousElementSibling) {
	              lastEl = lastEl.previousElementSibling;
	            } else {
	              break;
	            }
	          }
	
	          size = getBoundingClientRect(lastEl)[isVertical ? 'bottom' : 'right'] - getBoundingClientRect(firstEl)[isVertical ? 'top' : 'left'];
	        }
	
	        size += getExtraSize(el, isVertical);
	      }
	
	      el.style[type] = size ? size + 'px' : 'auto';
	
	      this.transformOffset = getTransformOffset(this);
	      this.minScrollOffset = getMinScrollOffset(this);
	      this.maxScrollOffset = getMaxScrollOffset(this);
	
	      this.scrollTo(-this.transformOffset[this.axis] - this.options[this.axis + 'PaddingTop']);
	      fireEvent(this, 'contentrefresh');
	
	      return this;
	    },
	
	    offset: function offset(childEl) {
	      var elRect = getBoundingClientRect(this.element);
	      var childRect = getBoundingClientRect(childEl);
	      if (this.axis === 'y') {
	        var offsetRect = {
	          top: childRect.top - elRect.top - this.options.yPaddingTop,
	          left: childRect.left - elRect.left,
	          right: elRect.right - childRect.right,
	          width: childRect.width,
	          height: childRect.height
	        };
	
	        offsetRect.bottom = offsetRect.top + offsetRect.height;
	      } else {
	        var offsetRect = {
	          top: childRect.top - elRect.top,
	          bottom: elRect.bottom - childRect.bottom,
	          left: childRect.left - elRect.left - this.options.xPaddingTop,
	          width: childRect.width,
	          height: childRect.height
	        };
	
	        offsetRect.right = offsetRect.left + offsetRect.width;
	      }
	      return offsetRect;
	    },
	
	    getRect: function getRect(childEl) {
	      var viewRect = getBoundingClientRect(this.viewport);
	      var childRect = getBoundingClientRect(childEl);
	      if (this.axis === 'y') {
	        var offsetRect = {
	          top: childRect.top - viewRect.top,
	          left: childRect.left - viewRect.left,
	          right: viewRect.right - childRect.right,
	          width: childRect.width,
	          height: childRect.height
	        };
	
	        offsetRect.bottom = offsetRect.top + offsetRect.height;
	      } else {
	        var offsetRect = {
	          top: childRect.top - viewRect.top,
	          bottom: viewRect.bottom - childRect.bottom,
	          left: childRect.left - viewRect.left,
	          width: childRect.width,
	          height: childRect.height
	        };
	
	        offsetRect.right = offsetRect.left + offsetRect.width;
	      }
	      return offsetRect;
	    },
	
	    isInView: function isInView(childEl) {
	      var viewRect = this.getRect(this.viewport);
	      var childRect = this.getRect(childEl);
	      if (this.axis === 'y') {
	        return viewRect.top < childRect.bottom && viewRect.bottom > childRect.top;
	      }
	      return viewRect.left < childRect.right && viewRect.right > childRect.left;
	    },
	
	    scrollTo: function scrollTo(offset, isSmooth) {
	      var that = this;
	      var element = this.element;
	
	      offset = -offset - this.options[this.axis + 'PaddingTop'];
	      offset = touchBoundary(this, offset);
	
	      isScrolling = true;
	      if (isSmooth === true) {
	        if (this.options.useFrameAnimation) {
	          var s0 = getTransformOffset(that)[this.axis];
	          var _s = offset - s0;
	          scrollAnimation = new lib.animation(400, lib.cubicbezier.easeInOut, 0, function (i1, i2) {
	            var offset = (s0 + _s * i2).toFixed(2);
	            setTransformStyle(that, offset);
	            fireEvent(that, 'scrolling');
	          });
	
	          scrollAnimation.onend(scrollEnd);
	
	          scrollAnimation.play();
	        } else {
	          (function () {
	            var _cancelScroll = function _cancelScroll() {
	              if (isScrolling && that.enabled) {
	                fireEvent(that, 'scrolling');
	                lib.animation.requestFrame(_cancelScroll);
	              }
	            };
	
	            setTransitionEndHandler(scrollEnd, 400);
	            setTransitionStyle(that, '0.4s', 'ease-in-out');
	            setTransformStyle(that, offset);
	
	            lib.animation.requestFrame(_cancelScroll);
	          })();
	        }
	      } else {
	        if (!this.options.useFrameAnimation) {
	          setTransitionStyle(that, '', '');
	        }
	        setTransformStyle(that, offset);
	        scrollEnd();
	      }
	
	      return this;
	    },
	
	    scrollToElement: function scrollToElement(childEl, isSmooth, topOffset) {
	      var offset = this.offset(childEl);
	      offset = offset[this.axis === 'y' ? 'top' : 'left'];
	      topOffset && (offset += topOffset);
	      return this.scrollTo(offset, isSmooth);
	    },
	
	    getViewWidth: function getViewWidth() {
	      return getBoundingClientRect(this.viewport).width;
	    },
	
	    getViewHeight: function getViewHeight() {
	      return getBoundingClientRect(this.viewport).height;
	    },
	
	    addPulldownHandler: function addPulldownHandler(handler) {
	      var that = this;
	      this.element.addEventListener('pulldownend', function (e) {
	        that.disable();
	        handler.call(that, e, function () {
	          that.scrollTo(0, true);
	          that.refresh();
	          that.enable();
	        });
	      }, false);
	
	      return this;
	    },
	
	    addPullupHandler: function addPullupHandler(handler) {
	      var that = this;
	
	      this.element.addEventListener('pullupend', function (e) {
	        that.disable();
	        handler.call(that, e, function () {
	          that.scrollTo(that.getScrollHeight(), true);
	          that.refresh();
	          that.enable();
	        });
	      }, false);
	
	      return this;
	    },
	
	    addScrollstartHandler: function addScrollstartHandler(handler) {
	      var that = this;
	      this.element.addEventListener('scrollstart', function (e) {
	        handler.call(that, e);
	      }, false);
	
	      return this;
	    },
	
	    addScrollingHandler: function addScrollingHandler(handler) {
	      var that = this;
	      this.element.addEventListener('scrolling', function (e) {
	        handler.call(that, e);
	      }, false);
	
	      return this;
	    },
	
	    addScrollendHandler: function addScrollendHandler(handler) {
	      var that = this;
	      this.element.addEventListener('scrollend', function (e) {
	        handler.call(that, e);
	      }, false);
	
	      return this;
	    },
	
	    addContentrenfreshHandler: function addContentrenfreshHandler(handler) {
	      var that = this;
	      this.element.addEventListener('contentrefresh', function (e) {
	        handler.call(that, e);
	      }, false);
	    },
	
	    addEventListener: function addEventListener(name, handler, useCapture) {
	      var that = this;
	      this.element.addEventListener(name, function (e) {
	        handler.call(that, e);
	      }, !!useCapture);
	    },
	
	    removeEventListener: function removeEventListener(name, handler) {
	      var that = this;
	      this.element.removeEventListener(name, function (e) {
	        handler.call(that, e);
	      });
	    },
	
	    enablePlugin: function enablePlugin(name, options) {
	      var plugin = plugins[name];
	      if (plugin && !this.plugins[name]) {
	        this.plugins[name] = true;
	        options = options || {};
	        plugin.call(this, name, options);
	      }
	      return this;
	    }
	  };
	
	  for (var k in proto) {
	    this[k] = proto[k];
	  }
	  // delete proto
	}
	
	lib.scroll = function (el, options) {
	  if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	    options = arguments[0];
	    if (options.scrollElement) {
	      el = options.scrollElement;
	    } else if (options.scrollWrap) {
	      el = options.scrollWrap.firstElementChild;
	    } else {
	      throw new Error('no scroll element');
	    }
	  }
	
	  if (!el.parentNode) {
	    throw new Error('wrong dom tree');
	  }
	  if (options && options.direction && ['x', 'y'].indexOf(options.direction) < 0) {
	    throw new Error('wrong direction');
	  }
	
	  var scroll;
	  if (options.downgrade === true && lib.scroll.downgrade) {
	    scroll = lib.scroll.downgrade(el, options);
	  } else {
	    if (el.scrollId) {
	      scroll = scrollObjs[el.scrollId];
	    } else {
	      scroll = new Scroll(el, options);
	    }
	  }
	  return scroll;
	};
	
	lib.scroll.plugin = function (name, constructor) {
	  if (constructor) {
	    name = name.split(',');
	    name.forEach(function (n) {
	      plugins[n] = constructor;
	    });
	  } else {
	    return plugins[name];
	  }
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	/* global lib: true */
	
	'use strict';
	
	/**
	 * transfer Quadratic Bezier Curve to Cubic Bezier Curve
	 *
	 * @param  {number} a abscissa of p1
	 * @param  {number} b ordinate of p1
	 * @return {Array} parameter matrix for cubic bezier curve
	 *   like [[p1x, p1y], [p2x, p2y]]
	 */
	
	function quadratic2cubicBezier(a, b) {
	  return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)], [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
	}
	
	/**
	 * derive position data from knowing motion parameters
	 * base on Newton's second law: s = vt + at^2/2
	 *
	 * @param {object} config object of { v, a, s, t }
	 *   - v: initial velocity
	 *   - a: accelerate speed
	 *   - t: time
	 *   - s: shifting
	 */
	function Motion(config) {
	  this.v = config.v || 0;
	  this.a = config.a || 0;
	
	  if (typeof config.t !== 'undefined') {
	    this.t = config.t;
	  }
	
	  if (typeof config.s !== 'undefined') {
	    this.s = config.s;
	  }
	
	  // derive time from shifting
	  if (typeof this.t === 'undefined') {
	    if (typeof this.s === 'undefined') {
	      this.t = -this.v / this.a;
	    } else {
	      var t1 = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
	      var t2 = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
	      this.t = Math.min(t1, t2);
	    }
	  }
	
	  // derive shifting from time
	  if (typeof this.s === 'undefined') {
	    this.s = this.a * this.t * this.t / 2 + this.v * this.t;
	  }
	}
	
	/**
	 * derive cubic bezier parameters from motion parameters
	 * @return {Array} parameter matrix for cubic bezier curve
	 *   like [[p1x, p1y], [p2x, p2y]]
	 */
	Motion.prototype.generateCubicBezier = function () {
	  return quadratic2cubicBezier(this.v / this.a, this.t + this.v / this.a);
	};
	
	!lib && (lib = {});
	lib.motion = Motion;
	
	module.exports = Motion;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _list = __webpack_require__(147);
	
	var _list2 = _interopRequireDefault(_list);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init(Weex) {
	  var List = _list2.default.init(Weex);
	
	  function Hlist(data, nodeType) {
	    data.attr.direction = 'h';
	    List.call(this, data, nodeType);
	  }
	
	  Hlist.prototype = Object.create(List.prototype);
	
	  Weex.registerComponent('hlist', Hlist);
	}
	
	exports.default = { init: init };

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _scrollable = __webpack_require__(148);
	
	var _scrollable2 = _interopRequireDefault(_scrollable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init(Weex) {
	  var Scrollable = _scrollable2.default.init(Weex);
	  function Scroller(data, nodeType) {
	    Scrollable.call(this, data, nodeType);
	  }
	  var extend = Weex.utils.extend;
	
	  Scroller.prototype = Object.create(Scrollable.prototype);
	  extend(Scroller.prototype, {
	    create: function create() {
	      var node = Scrollable.prototype.create.call(this);
	      node.classList.add('scroller-wrap');
	      this.scrollElement.classList.add('scroller-element');
	      return node;
	    }
	  });
	
	  Weex.registerComponent('scroller', Scroller);
	}
	
	exports.default = { init: init };

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(156);
	
	var parents = ['scroller', 'list', 'vlist'];
	
	// Only if pulldown offset is larger than this value can this
	// component trigger the 'refresh' event, otherwise just recover
	// to the start point.
	var DEFAULT_CLAMP = 130;
	var DEFAULT_ALIGN_ITEMS = 'center';
	var DEFAULT_JUSTIFY_CONTENT = 'center';
	
	function adjustHeight(refresh, val) {
	  refresh.node.style.height = val + 'px';
	}
	
	// function adJustPosition (refresh, val) {
	//   refresh.node.style.top = -val + 'px'
	// }
	
	function handleRefresh(refresh, e) {
	  refresh.node.style.height = refresh.clamp + 'px';
	  refresh.dispatchEvent('refresh');
	  refresh.isRefreshing = true;
	}
	
	function show(refresh) {
	  refresh.display = true;
	  refresh.node.style.display = '-webkit-box';
	  refresh.node.style.display = '-webkit-flex';
	  refresh.node.style.display = 'flex';
	}
	
	function hide(refresh) {
	  refresh.display = false;
	  refresh.node.style.display = 'none';
	  refresh.isRefreshing = false;
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-container', 'weex-refresh');
	    return node;
	  },
	  onAppend: function onAppend() {
	    var parent = this.getParent();
	    var self = this;
	    if (parents.indexOf(parent.data.type) === -1) {
	      // not in a scroller or a list
	      return;
	    }
	    this.refreshPlaceholder = document.createElement('div');
	    this.refreshPlaceholder.classList.add('weex-refresh-placeholder');
	    this.refreshPlaceholder.style.display = 'none';
	    this.refreshPlaceholder.style.width = '0px';
	    this.refreshPlaceholder.style.height = '0px';
	    var scrollElement = parent.scrollElement || parent.listElement;
	    scrollElement.insertBefore(this.refreshPlaceholder, this.node);
	    parent.node.appendChild(this.node);
	    parent.scroller.addEventListener('pulldown', function (e) {
	      if (self.isRefreshing) {
	        return;
	      }
	      adjustHeight(self, Math.abs(e.scrollObj.getScrollTop()));
	      if (!self.display) {
	        show(self);
	      }
	    });
	    parent.scroller.addEventListener('pulldownend', function (e) {
	      if (self.isRefreshing) {
	        return;
	      }
	      var top = Math.abs(e.scrollObj.getScrollTop());
	      if (top > self.clamp) {
	        handleRefresh(self, e);
	      } else {
	        hide(self);
	      }
	    });
	  }
	};
	
	var attr = {
	  display: function display(val) {
	    if (val === 'show') {
	      setTimeout(function () {
	        show(this);
	      }.bind(this), 0);
	    } else if (val === 'hide') {
	      setTimeout(function () {
	        hide(this);
	      }.bind(this), 0);
	    } else {
	      console.error('[h5-render] attr \'display\' of <refresh>\': value ' + val + ' is invalid. Should be \'show\' or \'hide\'');
	    }
	  }
	};
	
	var style = {
	  height: function height(val) {
	    val = parseFloat(val);
	    if (isNaN(val) || val < 0) {
	      return console.warn('[h5-render] <refresh>\'s height (' + val + ') is invalid.');
	    }
	    this.clamp = val * this.data.scale;
	  }
	};
	
	function init(Weex) {
	  var Component = Weex.Component;
	  var extend = Weex.utils.extend;
	
	  function Refresh(data) {
	    this.isRefreshing = false;
	    this.clamp = (data.style.height || DEFAULT_CLAMP) * data.scale;
	    !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS);
	    !data.style.justifyContent && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT);
	    Component.call(this, data);
	  }
	  Refresh.prototype = Object.create(Component.prototype);
	  extend(Refresh.prototype, proto);
	  extend(Refresh.prototype, { attr: attr });
	  extend(Refresh.prototype, {
	    style: extend(Object.create(Component.prototype.style), style)
	  });
	
	  Weex.registerComponent('refresh', Refresh);
	}
	
	exports.default = { init: init };

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(157);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./refresh.css", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./refresh.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-refresh {\n  // -webkit-box-align: center;\n  // -webkit-align-items: center;\n  // align-items: center;\n  // -webkit-box-pack: center;\n  // -webkit-justify-content: center;\n  // justify-content: center;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n  z-index: 999999;\n  background-color: #666;\n}", ""]);
	
	// exports


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(159);
	
	var parents = ['scroller', 'list', 'vlist'];
	
	var DEFAULT_CLAMP = 130;
	var DEFAULT_ALIGN_ITEMS = 'center';
	var DEFAULT_JUSTIFY_CONTENT = 'center';
	
	function adjustHeight(loading, val) {
	  loading.node.style.height = val + 'px';
	}
	
	function handleLoading(loading, e) {
	  loading.node.style.height = loading.clamp + 'px';
	  loading.dispatchEvent('loading');
	  loading.isLoading = true;
	}
	
	function show(loading) {
	  loading.display = true;
	  loading.node.style.display = '-webkit-box';
	  loading.node.style.display = '-webkit-flex';
	  loading.node.style.display = 'flex';
	}
	
	function hide(loading) {
	  loading.display = false;
	  loading.node.style.display = 'none';
	  loading.isLoading = false;
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-container', 'weex-loading');
	    return node;
	  },
	  onAppend: function onAppend() {
	    var parent = this.getParent();
	    var self = this;
	    var scrollWrapHeight = parent.node.getBoundingClientRect().height;
	    if (parents.indexOf(parent.data.type) === -1) {
	      // not in a scroller or a list
	      return;
	    }
	    this.loadingPlaceholder = document.createElement('div');
	    this.loadingPlaceholder.classList.add('weex-loading-placeholder');
	    this.loadingPlaceholder.style.display = 'none';
	    this.loadingPlaceholder.style.width = '0px';
	    this.loadingPlaceholder.style.height = '0px';
	    var scrollElement = parent.scrollElement || parent.listElement;
	    scrollElement.insertBefore(this.loadingPlaceholder, this.node);
	    parent.node.appendChild(this.node);
	    parent.scroller.addEventListener('pullup', function (e) {
	      if (self.isLoading) {
	        return;
	      }
	      var obj = e.scrollObj;
	      adjustHeight(self, Math.abs(obj.getScrollHeight() - obj.getScrollTop() - scrollWrapHeight));
	      if (!self.display) {
	        show(self);
	      }
	    });
	    parent.scroller.addEventListener('pullupend', function (e) {
	      if (self.isLoading) {
	        return;
	      }
	      handleLoading(self, e);
	    });
	  }
	};
	
	var attr = {
	  display: function display(val) {
	    if (val === 'show') {
	      setTimeout(function () {
	        show(this);
	      }.bind(this), 0);
	    } else if (val === 'hide') {
	      setTimeout(function () {
	        hide(this);
	      }.bind(this), 0);
	    } else {
	      console.error('[h5-render] attr \'display\' of <refresh>\': value ' + val + ' is invalid. Should be \'show\' or \'hide\'');
	    }
	  }
	};
	
	var style = {
	  height: function height(val) {
	    val = parseFloat(val);
	    if (Number.isNaN(val) || val < 0) {
	      return console.warn('[h5-render] <loading>\'s height (' + val + ') is invalid.');
	    }
	    this.clamp = val * this.data.scale;
	  }
	};
	
	function init(Weex) {
	  var Component = Weex.Component;
	  var extend = Weex.utils.extend;
	
	  function Loading(data) {
	    this.clamp = (data.style.height || DEFAULT_CLAMP) * data.scale;
	    !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS);
	    !data.style.justifyContent && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT);
	    Component.call(this, data);
	  }
	  Loading.prototype = Object.create(Component.prototype);
	  extend(Loading.prototype, proto);
	  extend(Loading.prototype, { attr: attr });
	  extend(Loading.prototype, {
	    style: extend(Object.create(Component.prototype.style), style)
	  });
	
	  Weex.registerComponent('loading', Loading);
	}
	
	exports.default = { init: init };

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(160);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./loading.css", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./loading.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-loading {\n  // -webkit-box-align: center;\n  // -webkit-align-items: center;\n  // align-items: center;\n  // -webkit-box-pack: center;\n  // -webkit-justify-content: center;\n  // justify-content: center;\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n  background-color: #666;\n}", ""]);
	
	// exports


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(162);
	
	__webpack_require__(168);
	
	var DEFAULT_INTERVAL = 3000;
	
	var extend = void 0,
	    Component = void 0;
	
	function idleWhenPageDisappear(slider) {
	  function handlePageShow() {
	    slider.isPageShow = true;
	    slider.autoPlay && !slider.isDomRendering && slider.play();
	  }
	  function handlePageHide() {
	    slider.isPageShow = false;
	    slider.stop();
	  }
	  global.addEventListener('pageshow', handlePageShow);
	  global.addEventListener('pagehide', handlePageHide);
	  document.addEventListener('visibilitychange', function () {
	    if (document.visibilityState === 'visible') {
	      handlePageShow();
	    } else if (document.visibilityState === 'hidden') {
	      handlePageHide();
	    }
	  });
	}
	
	function idleWhenDomRendering(slider) {
	  global.addEventListener('renderend', function () {
	    slider.isDomRendering = false;
	    slider.autoPlay && slider.isPageShow && slider.play();
	  });
	  global.addEventListener('renderbegin', function () {
	    slider.isDomRendering = true;
	    slider.stop();
	  });
	}
	
	function updateIndicators(slider) {
	  slider.indicator && slider.indicator.setIndex(slider.currentIndex);
	}
	
	function getSliderChangeHandler(slider) {
	  if (!slider._sliderChangeHandler) {
	    slider._sliderChangeHandler = function (e) {
	      var index = this.carrousel.items.index;
	      this.currentIndex = index;
	      updateIndicators(this);
	      this.dispatchEvent('change', { index: index });
	    }.bind(slider);
	  }
	  return slider._sliderChangeHandler;
	}
	
	function doRender(slider) {
	  slider.createChildren();
	  slider.onAppend();
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('slider');
	    node.style.position = 'relative';
	    node.style.overflow = 'hidden';
	    return node;
	  },
	  createChildren: function createChildren() {
	    var componentManager = this.getComponentManager();
	
	    // recreate slider container.
	    if (this.sliderContainer) {
	      this.node.removeChild(this.sliderContainer);
	    }
	    if (this.indicator) {
	      this.indicator.node.parentNode.removeChild(this.indicator.node);
	    }
	    this.children = [];
	
	    var sliderContainer = document.createElement('ul');
	    sliderContainer.style.listStyle = 'none';
	    this.node.appendChild(sliderContainer);
	    this.sliderContainer = sliderContainer;
	
	    var children = this.data.children;
	    var scale = this.data.scale;
	    var fragment = document.createDocumentFragment();
	    var indicatorData = void 0,
	        width = void 0,
	        height = void 0;
	    var childWidth = 0;
	    var childHeight = 0;
	
	    if (children && children.length) {
	      for (var i = 0; i < children.length; i++) {
	        var child = void 0;
	        children[i].scale = this.data.scale;
	        children[i].instanceId = this.data.instanceId;
	        if (children[i].type === 'indicator') {
	          indicatorData = extend(children[i], {
	            extra: {
	              amount: children.length - 1,
	              index: 0
	            }
	          });
	        } else {
	          child = componentManager.createElement(children[i], 'li');
	          this.children.push(child);
	          fragment.appendChild(child.node);
	          width = child.data.style.width || 0;
	          height = child.data.style.height || 0;
	          width > childWidth && (childWidth = width);
	          height > childHeight && (childHeight = height);
	          child.parentRef = this.data.ref;
	        }
	      }
	      // append indicator
	      if (indicatorData) {
	        indicatorData.extra.width = this.data.style.width || childWidth;
	        indicatorData.extra.height = this.data.style.height || childHeight;
	        this.indicator = componentManager.createElement(indicatorData);
	        this.indicator.parentRef = this.data.ref;
	        this.indicator.slider = this;
	        this.node.appendChild(this.indicator.node);
	      }
	
	      sliderContainer.style.height = scale * this.data.style.height + 'px';
	      sliderContainer.appendChild(fragment);
	    }
	  },
	  appendChild: function appendChild(data) {
	    var children = this.data.children || (this.data.children = []);
	    children.push(data);
	    doRender(this);
	    if (this.children.length > 0) {
	      return this.children[this.children.length - 1];
	    }
	  },
	  insertBefore: function insertBefore(child, before) {
	    var children = this.data.children;
	    var childIndex = -1;
	    for (var i = 0, l = children.length; i < l; i++) {
	      if (children[i].ref === before.data.ref) {
	        childIndex = i;
	        break;
	      }
	    }
	    children.splice(childIndex, 0, child.data);
	    doRender(this);
	    if (this.children.length > 0) {
	      return this.children[this.children.length - 1];
	    }
	  },
	  removeChild: function removeChild(child) {
	    var children = this.data.children;
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        if (child.data.ref === children[i].ref) {
	          children.splice(i, 1);
	          break;
	        }
	      }
	    }
	    doRender(this);
	  },
	  onAppend: function onAppend() {
	    if (this.carrousel) {
	      this.carrousel.removeEventListener('change', getSliderChangeHandler(this));
	      this.carrousel.stop();
	      this.carrousel = null;
	    }
	    var Carrousel = lib.carrousel;
	    this.carrousel = new Carrousel(this.sliderContainer, {
	      autoplay: this.autoPlay,
	      useGesture: true
	    });
	
	    this.carrousel.playInterval = this.interval;
	    this.carrousel.addEventListener('change', getSliderChangeHandler(this));
	    this.currentIndex = 0;
	
	    // preload all images for slider
	    // because:
	    // 1. lib-img doesn't listen to event transitionend
	    // 2. even if we fire lazy load in slider's change event handler,
	    //    the next image still won't be preloaded utill the moment it
	    //    slides into the view, which is too late.
	    if (this.preloadImgsTimer) {
	      clearTimeout(this.preloadImgsTimer);
	    }
	    // The time just before the second slide appear and enough
	    // for all child elements to append is ok.
	    var preloadTime = 0.8;
	    this.preloadImgsTimer = setTimeout(function () {
	      var imgs = this.carrousel.element.querySelectorAll('.weex-img');
	      for (var i = 0, l = imgs.length; i < l; i++) {
	        var img = imgs[i];
	        var iLazySrc = img.getAttribute('i-lazy-src');
	        var imgSrc = img.getAttribute('img-src');
	        if (iLazySrc) {
	          img.style.backgroundImage = 'url(' + iLazySrc + ')';
	        } else if (imgSrc) {
	          img.style.backgroundImage = 'url(' + imgSrc + ')';
	        }
	        img.removeAttribute('i-lazy-src');
	        img.removeAttribute('img-src');
	      }
	    }.bind(this), preloadTime * 1000);
	
	    // avoid page scroll when panning
	    var panning = false;
	    this.carrousel.element.addEventListener('panstart', function (e) {
	      if (!e.isVertical) {
	        panning = true;
	      }
	    });
	    this.carrousel.element.addEventListener('panend', function (e) {
	      if (!e.isVertical) {
	        panning = false;
	      }
	    });
	
	    document.addEventListener('touchmove', function (e) {
	      if (panning) {
	        e.preventDefault();
	        return false;
	      }
	      return true;
	    });
	
	    Component.prototype.onAppend.call(this);
	  },
	  play: function play() {
	    this.carrousel.play();
	  },
	  stop: function stop() {
	    this.carrousel.stop();
	  },
	  slideTo: function slideTo(index) {
	    var offset = index - this.currentIndex;
	    this.carrousel.items.slide(offset);
	  }
	};
	
	var attr = {
	  interval: function interval(val) {
	    this.interval = parseInt(val) || DEFAULT_INTERVAL;
	    if (this.carrousel) {
	      this.carrousel.playInterval = this.interval;
	    }
	  },
	
	  index: function index(val) {
	    var _this = this;
	    function doSlide(index) {
	      index = parseInt(index);
	      if (index < 0 || isNaN(index)) {
	        return console.error('[h5-render] invalid index ', index);
	      }
	      _this.slideTo(index);
	      if (_this._updateIndex) {
	        window.removeEventListener('renderend', _this._updateIndex);
	      }
	    }
	    if (this.isDomRendering) {
	      var pre = !!this._updateIndex;
	      this._updateIndex = function () {
	        _this.autoPlay && _this.isPageShow && _this.play();
	        doSlide(val);
	      };
	      !pre && window.addEventListener('renderend', this._updateIndex);
	    } else {
	      doSlide(val);
	    }
	  },
	
	  playstatus: function playstatus(val) {
	    this.playstatus = val && val !== 'false';
	    this.autoPlay = this.playstatus;
	    if (this.carrousel) {
	      if (this.playstatus) {
	        this.play();
	      } else {
	        this.stop();
	      }
	    }
	  },
	
	  // support playstatus' alias auto-play for compatibility
	  autoPlay: function autoPlay(val) {
	    this.attr.playstatus.call(this, val);
	  }
	};
	
	var event = {
	  change: {
	    updator: function updator() {
	      return {
	        attrs: {
	          index: this.currentIndex
	        }
	      };
	    }
	  }
	};
	
	function init(Weex) {
	  Component = Weex.Component;
	  extend = Weex.utils.extend;
	
	  function Slider(data) {
	    this.autoPlay = false; // default value is false.
	    this.interval = DEFAULT_INTERVAL;
	    this.direction = 'row'; // 'column' is not temporarily supported.
	    this.children = [];
	    this.isPageShow = true;
	    this.isDomRendering = true;
	
	    // bind event 'pageshow', 'pagehide' and 'visibilitychange' on window.
	    idleWhenPageDisappear(this);
	    // bind event 'renderBegin' and 'renderEnd' on window.
	    idleWhenDomRendering(this);
	
	    Component.call(this, data);
	  }
	  Slider.prototype = Object.create(Component.prototype);
	  extend(Slider.prototype, proto);
	  extend(Slider.prototype, { attr: attr });
	  extend(Slider.prototype, { event: event });
	
	  Weex.registerComponent('slider', Slider);
	}
	
	exports.default = { init: init };

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable */
	
	'use strict';
	
	// require('./gesture')
	
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	
	var doc = window.document;
	var ua = window.navigator.userAgent;
	var Firefox = !!ua.match(/Firefox/i);
	var IEMobile = !!ua.match(/IEMobile/i);
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-';
	var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit';
	
	var timer = __webpack_require__(167);
	var setTimeout = timer.setTimeout;
	var clearTimeout = timer.clearTimeout;
	
	function getTransformOffset(element) {
	  var offset = { x: 0, y: 0 };
	  var transform = getComputedStyle(element)[stylePrefix + 'Transform'];
	  var regMatrix3d = new RegExp('^matrix3d\\((?:[-\\d.]+,\\s*){12}([-\\d.]+),' + '\\s*([-\\d.]+)(?:,\\s*[-\\d.]+){2}\\)');
	  var regMatrix = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/;
	  var matched;
	
	  if (transform !== 'none') {
	    if (matched = transform.match(regMatrix3d) || transform.match(regMatrix)) {
	      offset.x = parseFloat(matched[1]) || 0;
	      offset.y = parseFloat(matched[2]) || 0;
	    }
	  }
	
	  return offset;
	}
	
	var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix';
	var has3d = !!Firefox || CSSMatrix in window && 'm11' in new window[CSSMatrix]();
	function getTranslate(x, y) {
	  x = parseFloat(x);
	  y = parseFloat(y);
	
	  if (x != 0) {
	    x += 'px';
	  }
	
	  if (y != 0) {
	    y += 'px';
	  }
	
	  if (has3d) {
	    return 'translate3d(' + x + ', ' + y + ', 0)';
	  }
	
	  return 'translate(' + x + ', ' + y + ')';
	}
	
	var slice = Array.prototype.slice;
	function ArrayFrom(a) {
	  return slice.call(a);
	}
	
	var incId = 0;
	function Carrousel(element, options) {
	  var that = this;
	  var views = [];
	  var pages = {};
	  var id = Date.now() + '-' + ++incId;
	  var root = document.createDocumentFragment();
	
	  if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	    options = arguments[0];
	    element = null;
	  }
	
	  if (!element) {
	    element = document.createElement('ul');
	    root.appendChild(element);
	  }
	  options = options || {};
	
	  element.setAttribute('data-ctrl-name', 'carrousel');
	  element.setAttribute('data-ctrl-id', id);
	
	  function fireEvent(name, extra) {
	    var ev = doc.createEvent('HTMLEvents');
	    ev.initEvent(name, false, false);
	    if (extra) {
	      for (var key in extra) {
	        ev[key] = extra[key];
	      }
	    }
	    root.dispatchEvent(ev);
	  }
	
	  element.style.position = 'relative';
	  element.style[stylePrefix + 'Transform'] = getTranslate(0, 0);
	
	  var transformOffset = 0;
	  var items = {};
	  var itemLength = 0;
	  var itemStep = options.step || element.getBoundingClientRect().width;
	  var itemIndex = 0;
	
	  items.add = function (html) {
	    var li = document.createElement('li');
	    li.style.display = 'none';
	    li.style.float = 'left';
	    li.index = itemLength;
	    if (typeof html === 'string') {
	      li.innerHTML = html;
	    } else if (html instanceof HTMLElement) {
	      li.appendChild(html);
	    }
	    element.appendChild(li);
	
	    Object.defineProperty(items, itemLength + '', {
	      get: function get() {
	        return li;
	      }
	    });
	
	    itemLength++;
	    return li;
	  };
	
	  function normalizeIndex(index) {
	    while (index < 0) {
	      index += itemLength;
	    }
	
	    while (index >= itemLength) {
	      index -= itemLength;
	    }
	
	    return index;
	  }
	
	  items.get = function (index) {
	    return items[normalizeIndex(index)];
	  };
	
	  items.getCloned = function (index) {
	    var index = normalizeIndex(index);
	    var item = element.querySelector('[cloned="cloned-' + index + '"]');
	    var originalItem = items[index];
	
	    // If there a _listeners attribute on the dom element
	    // then clone the _listeners as well for the events' binding
	    function cloneEvents(origin, clone, deep) {
	      var listeners = origin._listeners;
	      if (listeners) {
	        clone._listeners = listeners;
	        for (var type in listeners) {
	          clone.addEventListener(type, listeners[type]);
	        }
	      }
	      if (deep && origin.children && origin.children.length) {
	        for (var i = 0, l = origin.children.length; i < l; i++) {
	          cloneEvents(origin.children[i], clone.children[i], deep);
	        }
	      }
	    }
	
	    if (!item) {
	      item = originalItem.cloneNode(true);
	      cloneEvents(originalItem, item, true);
	
	      element.appendChild(item);
	      item.setAttribute('cloned', 'cloned-' + index);
	      item.index = index;
	    }
	
	    return item;
	  };
	
	  function activate(index) {
	    if (itemLength === 0) {
	      return;
	    }
	
	    var curItem = items.get(index);
	    var prevItem;
	    var nextItem;
	
	    if (itemLength > 1) {
	      prevItem = items.get(index - 1);
	
	      if (itemLength === 2) {
	        nextItem = items.getCloned(index + 1);
	      } else {
	        nextItem = items.get(index + 1);
	      }
	
	      curItem.style.left = -transformOffset + 'px';
	      prevItem.style.left = -transformOffset - itemStep + 'px';
	      nextItem.style.left = -transformOffset + itemStep + 'px';
	    }
	
	    itemIndex = curItem.index;
	
	    fireEvent('change', {
	      prevItem: prevItem,
	      curItem: curItem,
	      nextItem: nextItem
	    });
	  }
	
	  items.slide = function (index) {
	    if (itemLength === 0) {
	      return;
	    }
	
	    if (itemLength === 1) {
	      index = 0;
	    }
	
	    var startOffset = getTransformOffset(element).x;
	    var endOffset = transformOffset + itemStep * -index;
	    var interOffset = endOffset - startOffset;
	
	    if (interOffset === 0) {
	      return;
	    }
	
	    var anim = new lib.animation(400, lib.cubicbezier.ease, function (i1, i2) {
	      element.style[stylePrefix + 'Transform'] = getTranslate(startOffset + interOffset * i2, 0);
	    }).play().then(function () {
	      transformOffset = endOffset;
	      element.style[stylePrefix + 'Transform'] = getTranslate(endOffset, 0);
	      index && activate(itemIndex + index);
	    });
	  };
	
	  items.next = function () {
	    items.slide(1);
	  };
	
	  items.prev = function () {
	    items.slide(-1);
	  };
	
	  ArrayFrom(element.children).forEach(function (el) {
	    el.style.position = 'absolute';
	    el.style.top = '0';
	    el.style.left = itemLength * itemStep + 'px';
	    el.style.float = 'left';
	    el.index = itemLength;
	    Object.defineProperty(items, itemLength + '', {
	      get: function get() {
	        return el;
	      }
	    });
	
	    itemLength++;
	  });
	
	  Object.defineProperty(this, 'items', {
	    get: function get() {
	      return items;
	    }
	  });
	
	  Object.defineProperty(items, 'length', {
	    get: function get() {
	      return itemLength;
	    }
	  });
	
	  Object.defineProperty(items, 'index', {
	    get: function get() {
	      return itemIndex;
	    }
	  });
	
	  Object.defineProperty(items, 'step', {
	    get: function get() {
	      return itemStep;
	    },
	
	    set: function set(v) {
	      itemStep = v;
	    }
	  });
	
	  var starting = false;
	  var playing = false;
	  var isSliding = false;
	  this.play = function () {
	    if (!starting) {
	      starting = true;
	      return activate(0);
	    }
	
	    if (!!playing) {
	      return;
	    }
	
	    playing = setTimeout(function play() {
	      isSliding = true;
	      items.next();
	      setTimeout(function () {
	        isSliding = false;
	      }, 500);
	      playing = setTimeout(play, 400 + playInterval);
	    }, 400 + playInterval);
	  };
	
	  this.stop = function () {
	    if (!playing) {
	      return;
	    }
	    clearTimeout(playing);
	    setTimeout(function () {
	      playing = false;
	    }, 500);
	  };
	
	  var autoplay = false;
	  var readyToPlay = false;
	  Object.defineProperty(this, 'autoplay', {
	    get: function get() {
	      return autoplay;
	    },
	    set: function set(v) {
	      autoplay = !!v;
	      if (readyToPlay) {
	        clearTimeout(readyToPlay);
	        readyToPlay = false;
	      }
	      if (autoplay) {
	        readyToPlay = setTimeout(function () {
	          that.play();
	        }, 2000);
	      } else {
	        that.stop();
	      }
	    }
	  });
	  this.autoplay = !!options.autoplay;
	
	  var playInterval = 1500;
	  Object.defineProperty(this, 'playInterval', {
	    get: function get() {
	      return playInterval;
	    },
	    set: function set(n) {
	      playInterval = n;
	    }
	  });
	  this.playInterval = !!options.playInterval || 1500;
	
	  if (options.useGesture) {
	    var panning = false;
	    var displacement;
	    element.addEventListener('panstart', function (e) {
	      if (!e.isVertical && !(panning && isSliding)) {
	        e.preventDefault();
	        e.stopPropagation();
	
	        if (autoplay) {
	          that.stop();
	        }
	
	        displacement = 0;
	        panning = true;
	      }
	    });
	
	    element.addEventListener('panmove', function (e) {
	      if (!e.isVertical && panning) {
	        e.preventDefault();
	        e.stopPropagation();
	        displacement = e.displacementX;
	        element.style[stylePrefix + 'Transform'] = getTranslate(transformOffset + displacement, 0);
	      }
	    });
	
	    element.addEventListener('panend', function (e) {
	      if (!e.isVertical && panning) {
	        e.preventDefault();
	        e.stopPropagation();
	        panning = false;
	        if (e.isSwipe) {
	          if (displacement < 0) {
	            items.next();
	          } else {
	            items.prev();
	          }
	        } else {
	          if (Math.abs(displacement) < itemStep / 2) {
	            items.slide(0);
	          } else {
	            items.slide(displacement < 0 ? 1 : -1);
	          }
	        }
	
	        if (autoplay) {
	          setTimeout(function () {
	            that.play();
	          }, 2000);
	        }
	      }
	    }, false);
	
	    element.addEventListener('swipe', function (e) {
	      if (!e.isVertical) {
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    });
	  }
	
	  this.addEventListener = function (name, handler) {
	    this.root.addEventListener(name, handler, false);
	  };
	
	  this.removeEventListener = function (name, handler) {
	    this.root.removeEventListener(name, handler, false);
	  };
	
	  this.root = root;
	  this.element = element;
	}
	
	!lib && (lib = {});
	lib.carrousel = Carrousel;

/***/ },
/* 163 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a,b,c,d){function e(a){return(3*k*a+2*l)*a+m}function f(a){return((k*a+l)*a+m)*a}function g(a){return((n*a+o)*a+p)*a}function h(a){for(var b,c,d=a,g=0;8>g;g++){if(c=f(d)-a,Math.abs(c)<j)return d;if(b=e(d),Math.abs(b)<j)break;d-=c/b}var h=1,i=0;for(d=a;h>i;){if(c=f(d)-a,Math.abs(c)<j)return d;c>0?h=d:i=d,d=(h+i)/2}return d}function i(a){return g(h(a))}var j=1e-6,k=3*a-3*c+1,l=3*c-6*a,m=3*a,n=3*b-3*d+1,o=3*d-6*b,p=3*b;return i}b.cubicbezier=c,b.cubicbezier.linear=c(0,0,1,1),b.cubicbezier.ease=c(.25,.1,.25,1),b.cubicbezier.easeIn=c(.42,0,1,1),b.cubicbezier.easeOut=c(0,0,.58,1),b.cubicbezier.easeInOut=c(.42,0,.58,1)}(window,window.lib||(window.lib={}));;module.exports = window.lib['cubicbezier'];

/***/ },
/* 164 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){return setTimeout(a,l)}function d(a){clearTimeout(a)}function e(){var a={},b=new m(function(b,c){a.resolve=b,a.reject=c});return a.promise=b,a}function f(a,b){return["then","catch"].forEach(function(c){b[c]=function(){return a[c].apply(a,arguments)}}),b}function g(b){var c,d,h=!1;this.request=function(){h=!1;var g=arguments;return c=e(),f(c.promise,this),d=n(function(){h||c&&c.resolve(b.apply(a,g))}),this},this.cancel=function(){return d&&(h=!0,o(d),c&&c.reject("CANCEL")),this},this.clone=function(){return new g(b)}}function h(a,b){"function"==typeof b&&(b={0:b});for(var c=a/l,d=1/c,e=[],f=Object.keys(b).map(function(a){return parseInt(a)}),h=0;c>h;h++){var i=f[0],j=d*h;if(null!=i&&100*j>=i){var k=b[""+i];k instanceof g||(k=new g(k)),e.push(k),f.shift()}else e.length&&e.push(e[e.length-1].clone())}return e}function i(a){var c;return"string"==typeof a||a instanceof Array?b.cubicbezier?"string"==typeof a?b.cubicbezier[a]&&(c=b.cubicbezier[a]):a instanceof Array&&4===a.length&&(c=b.cubicbezier.apply(b.cubicbezier,a)):console.error("require lib.cubicbezier"):"function"==typeof a&&(c=a),c}function j(a,b,c){var d,g=h(a,c),j=1/(a/l),k=0,m=i(b);if(!m)throw new Error("unexcept timing function");var n=!1;this.play=function(){function a(){var c=j*(k+1).toFixed(10),e=g[k];e.request(c.toFixed(10),b(c).toFixed(10)).then(function(){n&&(k===g.length-1?(n=!1,d&&d.resolve("FINISH"),d=null):(k++,a()))},function(){})}if(!n)return n=!0,d||(d=e(),f(d.promise,this)),a(),this},this.stop=function(){return n?(n=!1,g[k]&&g[k].cancel(),this):void 0}}var k=60,l=1e3/k,m=a.Promise||b.promise&&b.promise.ES6Promise,n=window.requestAnimationFrame||window.msRequestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||c,o=window.cancelAnimationFrame||window.msCancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||d;(n===c||o===d)&&(n=c,o=d),b.animation=function(a,b,c){return new j(a,b,c)},b.animation.frame=function(a){return new g(a)},b.animation.requestFrame=function(a){var b=new g(a);return b.request()}}(window,window.lib||(window.lib={}));;module.exports = window.lib['animation'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(166);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./carrousel.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./carrousel.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "[data-ctrl-name=\"carrousel\"] {\n  position: relative;\n  -webkit-transform: translateZ(1px);\n  -ms-transform: translateZ(1px);\n  transform: translateZ(1px);\n}", ""]);
	
	// exports


/***/ },
/* 167 */
/***/ function(module, exports) {

	/* eslint-disable */
	
	'use strict';
	
	var _fallback = false;
	
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
	if (!raf) {
	  _fallback = true;
	  raf = function raf(callback) {
	    return setTimeout(callback, 16);
	  };
	}
	var caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
	if (!caf && _fallback) {
	  caf = function caf(id) {
	    return clearTimeout(id);
	  };
	} else if (!caf) {
	  caf = function caf() {};
	}
	
	var MAX = (Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1) - 1;
	
	var _idMap = {};
	var _globalId = 0;
	
	function _getGlobalId() {
	  _globalId = (_globalId + 1) % MAX;
	  if (_idMap[_globalId]) {
	    return _getGlobalId();
	  }
	  return _globalId;
	}
	
	var timer = {
	
	  setTimeout: function setTimeout(cb, ms) {
	    var id = _getGlobalId();
	    var start = Date.now();
	    _idMap[id] = raf(function loop() {
	      if (!_idMap[id] && _idMap[id] !== 0) {
	        return;
	      }
	      var ind = Date.now() - start;
	      if (ind < ms) {
	        _idMap[id] = raf(loop);
	      } else {
	        delete _idMap[id];
	        cb();
	      }
	    });
	    return id;
	  },
	
	  clearTimeout: function clearTimeout(id) {
	    var tid = _idMap[id];
	    tid && caf(tid);
	    delete _idMap[id];
	  }
	
	};
	
	module.exports = timer;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(169);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./slider.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./slider.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".slider {\n  position: relative;\n}\n\n.slider .indicator-container {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  font-size: 0;\n}\n.slider .indicator-container .indicator {\n  border-radius: 50%;\n}\n.slider .indicator-container.row {\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.slider .indicator-container.column {\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(171);
	
	var DEFAULT_ITEM_COLOR = '#999';
	var DEFAULT_ITEM_SELECTED_COLOR = '#0000ff';
	var DEFAULT_ITEM_SIZE = 20;
	var DEFAULT_MARGIN_SIZE = 10;
	
	function resetColor(indicator) {
	  var len = indicator.items.length;
	  if (typeof indicator.index !== 'undefined' && len > indicator.index) {
	    for (var i = 0; i < len; i++) {
	      var item = indicator.items[i];
	      if (indicator.index === i) {
	        item.classList.add('active');
	        item.style.backgroundColor = indicator.itemSelectedColor;
	      } else {
	        item.style.backgroundColor = indicator.itemColor;
	      }
	    }
	  }
	}
	
	function handleClick(indicator, idx, e) {
	  indicator.slider.slideTo(idx);
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-indicators');
	    node.classList.add('weex-element');
	    node.style.position = 'absolute';
	    this.node = node;
	    this.style.itemSize.call(this, 0);
	    this.updateStyle({
	      left: 0,
	      top: 0,
	      itemSize: 0
	    });
	    return node;
	  },
	  createChildren: function createChildren() {
	    var root = document.createDocumentFragment();
	    for (var i = 0; i < this.amount; i++) {
	      var indicator = document.createElement('div');
	      indicator.classList.add('weex-indicator');
	      indicator.style.boxSizing = 'border-box';
	      indicator.style.margin = '0 ' + DEFAULT_MARGIN_SIZE * this.data.scale + 'px';
	      indicator.style.width = this.itemSize + 'px';
	      indicator.style.height = this.itemSize + 'px';
	      indicator.setAttribute('index', i);
	      if (this.index === i) {
	        indicator.classList.add('active');
	        indicator.style.backgroundColor = this.itemSelectedColor;
	      } else {
	        indicator.style.backgroundColor = this.itemColor;
	      }
	      indicator.addEventListener('click', handleClick.bind(null, this, i));
	      this.items[i] = indicator;
	      root.appendChild(indicator);
	    }
	    this.node.appendChild(root);
	  },
	  setIndex: function setIndex(idx) {
	    if (idx >= this.amount) {
	      return;
	    }
	    var prev = this.items[this.index];
	    var cur = this.items[idx];
	    prev.classList.remove('active');
	    prev.style.backgroundColor = this.itemColor;
	    cur.classList.add('active');
	    cur.style.backgroundColor = this.itemSelectedColor;
	    this.index = idx;
	  }
	};
	
	var style = {
	  itemColor: function itemColor(val) {
	    this.itemColor = val || DEFAULT_ITEM_COLOR;
	    resetColor(this);
	  },
	  itemSelectedColor: function itemSelectedColor(val) {
	    this.itemSelectedColor = val || DEFAULT_ITEM_SELECTED_COLOR;
	    resetColor(this);
	  },
	  itemSize: function itemSize(val) {
	    val = parseInt(val) * this.data.scale || DEFAULT_ITEM_SIZE * this.data.scale;
	    this.itemSize = val;
	    this.node.style.height = val + 'px';
	    for (var i = 0, l = this.items.length; i < l; i++) {
	      this.items[i].style.width = val + 'px';
	      this.items[i].style.height = val + 'px';
	    }
	  },
	  width: function width(val) {
	    val = parseInt(val) * this.data.scale || parseInt(this.sliderWidth);
	    this.virtualWrapperWidth = val;
	  },
	  height: function height(val) {
	    val = parseInt(val) * this.data.scale || parseInt(this.sliderHeight);
	    this.virtualWrapperHeight = val;
	  },
	  top: function top(val) {
	    val = this.virtualWrapperHeight / 2 - this.itemSize / 2 + val * this.data.scale;
	    this.node.style.bottom = '';
	    this.node.style.top = val + 'px';
	  },
	  bottom: function bottom(val) {
	    val = this.virtualWrapperHeight / 2 - this.itemSize / 2 + val * this.data.scale;
	    this.node.style.top = '';
	    this.node.style.bottom = val + 'px';
	  },
	  left: function left(val) {
	    val = this.virtualWrapperWidth / 2 - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale) * this.amount / 2 + val * this.data.scale;
	    this.node.style.right = '';
	    this.node.style.left = val + 'px';
	  },
	  right: function right(val) {
	    val = this.virtualWrapperWidth / 2 - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale) * this.amount / 2 + val * this.data.scale;
	    this.node.style.left = '';
	    this.node.style.right = val + 'px';
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  // Style supported:
	  //   position: (default - absolute)
	  //   itemColor: color of indicator dots
	  //   itemSelectedColor: color of the selected indicator dot
	  //   itemSize: size of indicators
	  //   other layout styles
	  function Indicator(data) {
	    this.direction = 'row'; // 'column' is not temporarily supported.
	    this.amount = data.extra.amount;
	    this.index = data.extra.index;
	    this.sliderWidth = data.extra.width;
	    this.sliderHeight = data.extra.height;
	    var styles = data.style || {};
	    this.data = data;
	    this.style.width.call(this, styles.width);
	    this.style.height.call(this, styles.height);
	    this.itemColor = styles.itemColor || DEFAULT_ITEM_COLOR;
	    this.itemSelectedColor = styles.itemSelectedColor || DEFAULT_ITEM_SELECTED_COLOR;
	    this.items = [];
	    Atomic.call(this, data);
	  }
	  Indicator.prototype = Object.create(Atomic.prototype);
	  extend(Indicator.prototype, proto);
	  extend(Indicator.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	
	  Weex.registerComponent('indicator', Indicator);
	}
	
	exports.default = { init: init };

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(172);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./indicator.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./indicator.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-indicators {\n  position: absolute;\n  white-space: nowrap;\n}\n.weex-indicators .weex-indicator {\n  float: left;\n  border-radius: 50%;\n}\n", ""]);
	
	// exports


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// TODO: refactor this scss code since this is strongly
	// dependent on lib.flexible other than the value of
	// scale.
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(174);
	
	function initFoldBtn(tabheader) {
	  var node = tabheader.node;
	  var btn = document.createElement('span');
	  btn.className = 'fold-toggle iconfont';
	  btn.innerHTML = '&#xe661;';
	  node.appendChild(btn);
	
	  btn.addEventListener('click', function () {
	    if (tabheader.unfolding) {
	      folding(tabheader);
	    } else {
	      unfolding(tabheader);
	    }
	  });
	}
	
	function initMask(tabheader) {
	  var mask = document.createElement('div');
	  mask.className = 'tabheader-mask';
	  tabheader.mask = mask;
	  // stop default behavior: page moving.
	  mask.addEventListener('touchmove', function (evt) {
	    evt.preventDefault();
	  });
	  // click to unfold.
	  mask.addEventListener('click', function () {
	    folding(tabheader);
	  });
	
	  document.body.appendChild(mask);
	}
	
	function unfolding(tabheader) {
	  // mark the initial posiiton of tabheader
	  if (!tabheader.flag) {
	    var flag = document.createComment('tabheader');
	    tabheader.flag = flag;
	    tabheader.node.parentNode.insertBefore(flag, tabheader.node);
	  }
	  if (!tabheader.mask) {
	    initMask(tabheader);
	  }
	
	  // record the scroll position.
	  tabheader._scrollVal = tabheader._body.scrollLeft;
	  // record the position in document.
	  tabheader._topVal = tabheader.node.getBoundingClientRect().top;
	  tabheader._styleTop = tabheader.node.style.top;
	
	  document.body.appendChild(tabheader.node);
	  tabheader.node.classList.add('unfold-header');
	  tabheader.node.style.height = 'auto';
	  // recalc the position when it is unfolded.
	  var thHeight = tabheader.node.getBoundingClientRect().height;
	  if (thHeight + tabheader._topVal > window.innerHeight) {
	    tabheader._topVal = tabheader._topVal + (window.innerHeight - thHeight - tabheader._topVal);
	  }
	
	  tabheader.node.style.top = tabheader._topVal + 'px';
	  // process mask style
	  tabheader.mask.classList.add('unfold-header');
	  tabheader.mask.style.height = window.innerHeight + 'px';
	  tabheader.unfolding = true;
	}
	
	function folding(tabheader) {
	  if (tabheader.unfolding !== true) {
	    return;
	  }
	
	  tabheader.mask.classList.remove('unfold-header');
	  tabheader.node.classList.remove('unfold-header');
	
	  tabheader.node.style.height = '';
	  tabheader.node.style.top = tabheader._styleTop;
	
	  // recover the position of tabheader.
	  tabheader.flag.parentNode.insertBefore(tabheader.node, tabheader.flag);
	  // recover the position of scoller.
	  tabheader._body.scrollLeft = tabheader._scrollVal;
	
	  scrollToView(tabheader);
	  tabheader.unfolding = false;
	}
	
	function initEvent(tabheader) {
	  initClickEvent(tabheader);
	  initSelectEvent(tabheader);
	}
	
	// init events.
	function initClickEvent(tabheader) {
	  var box = tabheader.box;
	
	  box.addEventListener('click', function (evt) {
	    var target = evt.target;
	    if (target.nodeName === 'UL') {
	      return;
	    }
	
	    if (target.parentNode.nodeName === 'LI') {
	      target = target.parentNode;
	    }
	
	    var floor = target.getAttribute('data-floor');
	    /* eslint-disable eqeqeq */
	    if (tabheader.data.attr.selectedIndex == floor) {
	      // Duplicated clicking, not to trigger select event.
	      return;
	    }
	    /* eslint-enable eqeqeq */
	
	    fireEvent(target, 'select', { index: floor });
	  });
	}
	
	function initSelectEvent(tabheader) {
	  var node = tabheader.node;
	  node.addEventListener('select', function (evt) {
	    var index = void 0;
	    if (evt.index !== undefined) {
	      index = evt.index;
	    } else if (evt.data && evt.data.index !== undefined) {
	      index = evt.data.index;
	    }
	
	    if (index === undefined) {
	      return;
	    }
	
	    tabheader.attr.selectedIndex.call(tabheader, index);
	  });
	}
	
	function scrollToView(tabheader, node) {
	  if (!node) {
	    var _attr = tabheader.data.attr;
	    node = tabheader.node.querySelector('[data-floor="' + _attr.selectedIndex + '"]');
	  }
	  if (!node) {
	    return;
	  }
	
	  // const defaultVal = tabheader._body.scrollLeft
	  // const leftVal = defaultVal - node.offsetLeft + 300
	
	  var scrollVal = getScrollVal(tabheader._body.getBoundingClientRect(), node);
	  doScroll(tabheader._body, scrollVal);
	}
	
	// scroll the tabheader.
	// positive val means to scroll right.
	// negative val means to scroll left.
	function doScroll(node, val, finish) {
	  if (!val) {
	    return;
	  }
	  if (finish === undefined) {
	    finish = Math.abs(val);
	  }
	
	  if (finish <= 0) {
	    return;
	  }
	
	  setTimeout(function () {
	    if (val > 0) {
	      node.scrollLeft += 2;
	    } else {
	      node.scrollLeft -= 2;
	    }
	    finish -= 2;
	
	    doScroll(node, val, finish);
	  });
	}
	
	// get scroll distance.
	function getScrollVal(rect, node) {
	  var left = node.previousSibling;
	  var right = node.nextSibling;
	  var scrollVal = void 0;
	
	  // process left-side element first.
	  if (left) {
	    var leftRect = left.getBoundingClientRect();
	    // only need to compare the value of left.
	    if (leftRect.left < rect.left) {
	      scrollVal = leftRect.left;
	      return scrollVal;
	    }
	  }
	
	  if (right) {
	    var rightRect = right.getBoundingClientRect();
	    // compare the value of right.
	    if (rightRect.right > rect.right) {
	      scrollVal = rightRect.right - rect.right;
	      return scrollVal;
	    }
	  }
	
	  // process current node, from left to right.
	  var nodeRect = node.getBoundingClientRect();
	  if (nodeRect.left < rect.left) {
	    scrollVal = nodeRect.left;
	  } else if (nodeRect.right > rect.right) {
	    scrollVal = nodeRect.right - rect.right;
	  }
	
	  return scrollVal;
	}
	
	// trigger and broadcast events.
	function fireEvent(element, type, data) {
	  var evt = document.createEvent('Event');
	  evt.data = data;
	  for (var k in data) {
	    if (data.hasOwnProperty(k)) {
	      evt[k] = data[k];
	    }
	  }
	  // need bubble.
	  evt.initEvent(type, true, true);
	
	  element.dispatchEvent(evt);
	}
	
	function createHighlightIcon(code) {
	  var html = '<i class="hl-icon iconfont">' + '&#xe650' + '</i>';
	  return html;
	}
	
	function isValidColor(color) {
	  if (!color) {
	    return false;
	  }
	
	  if (color.charAt(0) !== '#') {
	    return false;
	  }
	
	  if (color.length !== 7) {
	    return false;
	  }
	
	  return true;
	}
	
	var proto = {
	  create: function create() {
	    // outside container.
	    var node = document.createElement('div');
	    node.className = 'tab-header';
	    // tip on the top.
	    var bar = document.createElement('div');
	    bar.className = 'header-bar';
	    bar.textContent = 'CHANGE FLOOR';
	    // middle layer.
	    var body = document.createElement('div');
	    body.className = 'header-body';
	    var box = document.createElement('ul');
	    box.className = 'tabheader';
	
	    body.appendChild(box);
	    node.appendChild(bar);
	    node.appendChild(body);
	    this._bar = bar;
	    this._body = body;
	    this.box = box;
	    this.node = node;
	    // init events.
	    initFoldBtn(this);
	    initEvent(this);
	    return node;
	  }
	};
	
	var attr = {
	  highlightIcon: function highlightIcon() {
	    return createHighlightIcon();
	  },
	  data: function data() {
	    var attr = this.data.attr;
	    // Ensure there is a default selected value.
	    if (attr.selectedIndex === undefined) {
	      attr.selectedIndex = 0;
	    }
	
	    var list = attr.data || [];
	    var curItem = attr.selectedIndex;
	
	    var ret = [];
	    var itemTmpl = '<li class="th-item" data-floor="{{floor}}">' + '{{hlIcon}}{{floorName}}</li>';
	
	    list.forEach(function (item, idx) {
	      var html = itemTmpl.replace('{{floor}}', idx);
	      /* eslint-disable eqeqeq */
	      if (curItem == idx) {
	        html = html.replace('{{hlIcon}}', createHighlightIcon());
	      } else {
	        html = html.replace('{{hlIcon}}', '');
	      }
	      /* eslint-enable eqeqeq */
	
	      html = html.replace('{{floorName}}', item);
	
	      ret.push(html);
	    }, this);
	
	    this.box.innerHTML = ret.join('');
	  },
	  selectedIndex: function selectedIndex(val) {
	    var attr = this.data.attr;
	
	    if (val === undefined) {
	      val = 0;
	    }
	
	    // if (val == attr.selectedIndex) {
	    //   return
	    // }
	
	    attr.selectedIndex = val;
	
	    this.attr.data.call(this);
	
	    folding(this);
	    this.style.textHighlightColor.call(this, this.textHighlightColor);
	  }
	};
	
	var style = {
	  opacity: function opacity(val) {
	    if (val === undefined || val < 0 || val > 1) {
	      val = 1;
	    }
	
	    this.node.style.opacity = val;
	  },
	  textColor: function textColor(val) {
	    if (!isValidColor(val)) {
	      return;
	    }
	
	    this.node.style.color = val;
	  },
	  textHighlightColor: function textHighlightColor(val) {
	    if (!isValidColor(val)) {
	      return;
	    }
	    this.textHighlightColor = val;
	    var attr = this.data.attr;
	
	    var node = this.node.querySelector('[data-floor="' + attr.selectedIndex + '"]');
	    if (node) {
	      node.style.color = val;
	      scrollToView(this, node);
	    }
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  function TabHeader(data) {
	    Atomic.call(this, data);
	  }
	  TabHeader.prototype = Object.create(Atomic.prototype);
	  extend(TabHeader.prototype, proto);
	  extend(TabHeader.prototype, { attr: attr });
	  extend(TabHeader.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	
	  Weex.registerComponent('tabHeader', TabHeader);
	}
	
	exports.default = { init: init };

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(175);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./tabheader.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./tabheader.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".tab-header {\n  position: relative;\n  width: 10rem;\n  font-size: 14px;\n  color: #333;\n}\n.tab-header .header-bar {\n  height: 1.17rem;\n  line-height: 1.17rem;\n  display: none;\n  color: #999;\n  padding-left: 0.4rem;\n}\n.tab-header .header-body {\n  margin-right: 1.07rem;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n.tab-header .header-body::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n  overflow: hidden;\n}\n.tab-header .fold-toggle {\n  position: absolute;\n  top: 0.59rem;\n  -webkit-transform: translateY(-50%);\n  right: 0.29rem;\n  width: 0.48rem;\n  height: 0.48rem;\n  line-height: 0.48rem;\n  text-align: center;\n  z-index: 99;\n  font-size: 14px;\n}\n.tab-header.unfold-header {\n  position: fixed !important;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n\n.tabheader {\n  list-style: none;\n  white-space: nowrap;\n  height: 1.17rem;\n  line-height: 1.17rem;\n}\n.tabheader .th-item {\n  padding-left: 0.72rem;\n  position: relative;\n  display: inline-block;\n}\n.tabheader .hl-icon {\n  width: 0.4rem;\n  height: 0.4rem;\n  line-height: 0.4rem;\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  left: 0.24rem;\n  font-size: 14px;\n}\n\n.unfold-header .header-bar {\n  display: block;\n}\n.unfold-header .fold-toggle {\n  -webkit-transform: translateY(-50%) rotate(180deg);\n}\n.unfold-header .header-body {\n  margin-right: 0;\n  padding: 0.24rem;\n}\n.unfold-header .tabheader {\n  display: block;\n  height: auto;\n}\n.unfold-header .th-item {\n  box-sizing: border-box;\n  float: left;\n  width: 33.3333%;\n  height: 1.01rem;\n  line-height: 1.01rem;\n}\n.unfold-header .hl-icon {\n  margin-right: 0;\n  position: absolute;\n}\n.unfold-header.tabheader-mask {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.tabheader-mask {\n  display: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n}\n\n@font-face {\n  font-family: \"iconfont\";\n  src: url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAPAIAAAwBwRkZUTXBD98UAAAD8AAAAHE9TLzJXL1zIAAABGAAAAGBjbWFws6IHbgAAAXgAAAFaY3Z0IAyV/swAAApQAAAAJGZwZ20w956VAAAKdAAACZZnYXNwAAAAEAAACkgAAAAIZ2x5ZuxoPFIAAALUAAAEWGhlYWQHA5h3AAAHLAAAADZoaGVhBzIDcgAAB2QAAAAkaG10eAs2AW0AAAeIAAAAGGxvY2EDcAQeAAAHoAAAABBtYXhwASkKKwAAB7AAAAAgbmFtZQl/3hgAAAfQAAACLnBvc3Tm7f0bAAAKAAAAAEhwcmVwpbm+ZgAAFAwAAACVAAAAAQAAAADMPaLPAAAAANIDKnoAAAAA0gMqewAEA/oB9AAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAgAGAwAAAAAAAAAAAAEQAAAAAAAAAAAAAABQZkVkAMAAeObeAyz/LABcAxgAlAAAAAEAAAAAAxgAAAAAACAAAQAAAAMAAAADAAAAHAABAAAAAABUAAMAAQAAABwABAA4AAAACgAIAAIAAgB45lDmYebe//8AAAB45lDmYebe////ixm0GaQZKAABAAAAAAAAAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACACIAAAEyAqoAAwAHAClAJgAAAAMCAANXAAIBAQJLAAICAU8EAQECAUMAAAcGBQQAAwADEQUPKzMRIREnMxEjIgEQ7szMAqr9ViICZgAAAAUALP/hA7wDGAAWADAAOgBSAF4Bd0uwE1BYQEoCAQANDg0ADmYAAw4BDgNeAAEICAFcEAEJCAoGCV4RAQwGBAYMXgALBAtpDwEIAAYMCAZYAAoHBQIECwoEWRIBDg4NUQANDQoOQhtLsBdQWEBLAgEADQ4NAA5mAAMOAQ4DXgABCAgBXBABCQgKCAkKZhEBDAYEBgxeAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CG0uwGFBYQEwCAQANDg0ADmYAAw4BDgNeAAEICAFcEAEJCAoICQpmEQEMBgQGDARmAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CG0BOAgEADQ4NAA5mAAMOAQ4DAWYAAQgOAQhkEAEJCAoICQpmEQEMBgQGDARmAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CWVlZQChTUzs7MjEXF1NeU15bWDtSO1JLQzc1MToyOhcwFzBRETEYESgVQBMWKwEGKwEiDgIdASE1NCY1NC4CKwEVIQUVFBYUDgIjBiYrASchBysBIiciLgI9ARciBhQWMzI2NCYXBgcOAx4BOwYyNicuAScmJwE1ND4COwEyFh0BARkbGlMSJRwSA5ABChgnHoX+SgKiARUfIw4OHw4gLf5JLB0iFBkZIBMIdwwSEgwNEhKMCAYFCwQCBA8OJUNRUEAkFxYJBQkFBQb+pAUPGhW8HykCHwEMGScaTCkQHAQNIBsSYYg0Fzo6JRcJAQGAgAETGyAOpz8RGhERGhF8GhYTJA4QDQgYGg0jERMUAXfkCxgTDB0m4wAAAgCg/2wDYALsABIAGgAhQB4AAAADAgADWQACAQECTQACAgFRAAECAUUTFjkQBBIrACAGFRQeAxcWOwEyPwESNTQAIiY0NjIWFAKS/tzORFVvMRAJDgEOCW3b/uKEXl6EXgLszpI1lXyJNhEKC30BDIyS/s5ehF5ehAAAAAEAggBJA4QB6AAdABtAGBIRAgEAAUAFAQA+AAABAGgAAQFfEx8CECsBJgcGBwkBLgEGBwYUFwEwMxcVFjI3AT4DLgIDehEWAwP+uP60BhEQBgoKAWEBAQoaCQFeAwQCAQECBAHhEg0DAv61AUkHBAUGCRsJ/qIBAQkJAWICBwYHCAYGAAEAfwCLA4ECJwAhAB1AGhYPAgEAAUAFAQA+AAABAGgCAQEBXyQuEwMRKyUBMCcjNSYHBgcBDgEUFhceAjMyNwkBFjMyNjc+Ai4BA3f+nwEBEhUEAv6iBQUFBQMHCAQOCQFIAUwKDQYMBQMFAQEFwwFeAQERDQID/p8FDAwMBAMEAgkBS/62CQUFAwoJCgkAAAEAAAABAAALIynoXw889QALBAAAAAAA0gMqewAAAADSAyp7ACL/bAO8AxgAAAAIAAIAAAAAAAAAAQAAAxj/bABcBAAAAAAAA7wAAQAAAAAAAAAAAAAAAAAAAAUBdgAiAAAAAAFVAAAD6QAsBAAAoACCAH8AAAAoACgAKAFkAaIB5AIsAAEAAAAHAF8ABQAAAAAAAgAmADQAbAAAAIoJlgAAAAAAAAAMAJYAAQAAAAAAAQAIAAAAAQAAAAAAAgAGAAgAAQAAAAAAAwAkAA4AAQAAAAAABAAIADIAAQAAAAAABQBGADoAAQAAAAAABgAIAIAAAwABBAkAAQAQAIgAAwABBAkAAgAMAJgAAwABBAkAAwBIAKQAAwABBAkABAAQAOwAAwABBAkABQCMAPwAAwABBAkABgAQAYhpY29uZm9udE1lZGl1bUZvbnRGb3JnZSAyLjAgOiBpY29uZm9udCA6IDI2LTgtMjAxNWljb25mb250VmVyc2lvbiAxLjAgOyB0dGZhdXRvaGludCAodjAuOTQpIC1sIDggLXIgNTAgLUcgMjAwIC14IDE0IC13ICJHIiAtZiAtc2ljb25mb250AGkAYwBvAG4AZgBvAG4AdABNAGUAZABpAHUAbQBGAG8AbgB0AEYAbwByAGcAZQAgADIALgAwACAAOgAgAGkAYwBvAG4AZgBvAG4AdAAgADoAIAAyADYALQA4AC0AMgAwADEANQBpAGMAbwBuAGYAbwBuAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwACAAOwAgAHQAdABmAGEAdQB0AG8AaABpAG4AdAAgACgAdgAwAC4AOQA0ACkAIAAtAGwAIAA4ACAALQByACAANQAwACAALQBHACAAMgAwADAAIAAtAHgAIAAxADQAIAAtAHcAIAAiAEcAIgAgAC0AZgAgAC0AcwBpAGMAbwBuAGYAbwBuAHQAAAACAAAAAAAA/4MAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAABAAIAWwECAQMBBAd1bmlFNjUwB3VuaUU2NjEHdW5pRTZERQABAAH//wAPAAAAAAAAAAAAAAAAAAAAAAAyADIDGP/hAxj/bAMY/+EDGP9ssAAssCBgZi2wASwgZCCwwFCwBCZasARFW1ghIyEbilggsFBQWCGwQFkbILA4UFghsDhZWSCwCkVhZLAoUFghsApFILAwUFghsDBZGyCwwFBYIGYgiophILAKUFhgGyCwIFBYIbAKYBsgsDZQWCGwNmAbYFlZWRuwACtZWSOwAFBYZVlZLbACLCBFILAEJWFkILAFQ1BYsAUjQrAGI0IbISFZsAFgLbADLCMhIyEgZLEFYkIgsAYjQrIKAAIqISCwBkMgiiCKsAArsTAFJYpRWGBQG2FSWVgjWSEgsEBTWLAAKxshsEBZI7AAUFhlWS2wBCywCCNCsAcjQrAAI0KwAEOwB0NRWLAIQyuyAAEAQ2BCsBZlHFktsAUssABDIEUgsAJFY7ABRWJgRC2wBiywAEMgRSCwACsjsQQEJWAgRYojYSBkILAgUFghsAAbsDBQWLAgG7BAWVkjsABQWGVZsAMlI2FERC2wByyxBQVFsAFhRC2wCCywAWAgILAKQ0qwAFBYILAKI0JZsAtDSrAAUlggsAsjQlktsAksILgEAGIguAQAY4ojYbAMQ2AgimAgsAwjQiMtsAosS1RYsQcBRFkksA1lI3gtsAssS1FYS1NYsQcBRFkbIVkksBNlI3gtsAwssQANQ1VYsQ0NQ7ABYUKwCStZsABDsAIlQrIAAQBDYEKxCgIlQrELAiVCsAEWIyCwAyVQWLAAQ7AEJUKKiiCKI2GwCCohI7ABYSCKI2GwCCohG7AAQ7ACJUKwAiVhsAgqIVmwCkNHsAtDR2CwgGIgsAJFY7ABRWJgsQAAEyNEsAFDsAA+sgEBAUNgQi2wDSyxAAVFVFgAsA0jQiBgsAFhtQ4OAQAMAEJCimCxDAQrsGsrGyJZLbAOLLEADSstsA8ssQENKy2wECyxAg0rLbARLLEDDSstsBIssQQNKy2wEyyxBQ0rLbAULLEGDSstsBUssQcNKy2wFiyxCA0rLbAXLLEJDSstsBgssAcrsQAFRVRYALANI0IgYLABYbUODgEADABCQopgsQwEK7BrKxsiWS2wGSyxABgrLbAaLLEBGCstsBsssQIYKy2wHCyxAxgrLbAdLLEEGCstsB4ssQUYKy2wHyyxBhgrLbAgLLEHGCstsCEssQgYKy2wIiyxCRgrLbAjLCBgsA5gIEMjsAFgQ7ACJbACJVFYIyA8sAFgI7ASZRwbISFZLbAkLLAjK7AjKi2wJSwgIEcgILACRWOwAUViYCNhOCMgilVYIEcgILACRWOwAUViYCNhOBshWS2wJiyxAAVFVFgAsAEWsCUqsAEVMBsiWS2wJyywByuxAAVFVFgAsAEWsCUqsAEVMBsiWS2wKCwgNbABYC2wKSwAsANFY7ABRWKwACuwAkVjsAFFYrAAK7AAFrQAAAAAAEQ+IzixKAEVKi2wKiwgPCBHILACRWOwAUViYLAAQ2E4LbArLC4XPC2wLCwgPCBHILACRWOwAUViYLAAQ2GwAUNjOC2wLSyxAgAWJSAuIEewACNCsAIlSYqKRyNHI2EgWGIbIVmwASNCsiwBARUUKi2wLiywABawBCWwBCVHI0cjYbAGRStlii4jICA8ijgtsC8ssAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgsAlDIIojRyNHI2EjRmCwBEOwgGJgILAAKyCKimEgsAJDYGQjsANDYWRQWLACQ2EbsANDYFmwAyWwgGJhIyAgsAQmI0ZhOBsjsAlDRrACJbAJQ0cjRyNhYCCwBEOwgGJgIyCwACsjsARDYLAAK7AFJWGwBSWwgGKwBCZhILAEJWBkI7ADJWBkUFghGyMhWSMgILAEJiNGYThZLbAwLLAAFiAgILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA==\") format(\"truetype\");\n}\n.iconfont {\n  font-family: iconfont !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n[data-dpr=\"2\"] .tab-header {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tab-header {\n  font-size: 42px;\n}\n\n[data-dpr=\"2\"] .tabheader .hl-icon {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tabheader .hl-icon {\n  font-size: 42px;\n}\n\n[data-dpr=\"2\"] .tab-header .fold-toggle {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tab-header .fold-toggle {\n  font-size: 42px;\n}\n", ""]);
	
	// exports


/***/ },
/* 176 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var appendStyle = void 0;
	
	var availableTypes = ['text', 'password', 'tel', 'email', 'url'];
	var DEFAULT_TYPE = 'text';
	
	function setPlaceholderColor(input, placeholderColor) {
	  if (!placeholderColor) {
	    return;
	  }
	  var vendors = ['::-webkit-input-placeholder', ':-moz-placeholder', '::-moz-placeholder', ':-ms-input-placeholder', ':placeholder-shown'];
	  var css = '';
	  var cssRule = 'color: ' + placeholderColor + ';';
	  for (var i = 0, l = vendors.length; i < l; i++) {
	    css += '.' + input.className + vendors[i] + '{' + cssRule + '}';
	  }
	  appendStyle(css, input.styleId, true);
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('input');
	    var uuid = Math.floor(10000000000000 * Math.random()) + Date.now();
	    this.className = 'weex-ipt-' + uuid;
	    this.styleId = 'weex-style-' + uuid;
	    node.classList.add(this.className);
	    node.classList.add('weex-element');
	    this.placeholder && (node.placeholder = this.placeholder);
	    return node;
	  }
	};
	
	// updatable attributes
	var attr = {
	  disabled: function disabled(val) {
	    this.node.disabled = !!val;
	  },
	  placeholder: function placeholder(val) {
	    this.node.placeholder = val || '';
	  },
	  value: function value(val) {
	    this.node.value = val || '';
	  },
	  autofocus: function autofocus(val) {
	    this.node.autofocus = !!val;
	  },
	  type: function type(val) {
	    this.node.type = availableTypes.indexOf(val) !== -1 ? val : DEFAULT_TYPE;
	  }
	};
	
	// updatable styles
	var style = {
	  placeholderColor: function placeholderColor(val) {
	    setPlaceholderColor(this, val);
	  }
	};
	
	// events configurations
	var event = {
	  input: {
	    updator: function updator() {
	      return {
	        attrs: {
	          value: this.node.value
	        }
	      };
	    },
	    extra: function extra() {
	      return {
	        value: this.node.value,
	        timestamp: Date.now()
	      };
	    }
	  },
	
	  change: {
	    updator: function updator() {
	      return {
	        attrs: {
	          value: this.node.value
	        }
	      };
	    },
	    extra: function extra() {
	      return {
	        value: this.node.value,
	        timestamp: Date.now()
	      };
	    }
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	  appendStyle = Weex.utils.appendStyle;
	
	  // attrs:
	  //   - type: text|password|tel|email|url
	  //   - value
	  //   - placeholder
	  //   - disabled
	  //   - autofocus
	  function Input(data) {
	    Atomic.call(this, data);
	  }
	  Input.prototype = Object.create(Atomic.prototype);
	  extend(Input.prototype, proto);
	  extend(Input.prototype, { attr: attr });
	  extend(Input.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	  extend(Input.prototype, { event: event });
	
	  Weex.registerComponent('input', Input);
	}
	
	exports.default = { init: init };

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(178);
	
	function getProto(Weex) {
	  var Atomic = Weex.Atomic;
	  return {
	    create: function create() {
	      var node = document.createElement('video');
	      node.classList.add('weex-video', 'weex-element');
	      node.controls = true;
	      node.autoplay = this.autoPlay;
	      node.setAttribute('play-status', this.playStatus);
	      this.node = node;
	      if (this.autoPlay && this.playStatus === 'play') {
	        this.play();
	      }
	      return node;
	    },
	    bindEvents: function bindEvents(evts) {
	      Atomic.prototype.bindEvents.call(this, evts);
	
	      // convert w3c-video events to weex-video events.
	      var evtsMap = {
	        start: 'play',
	        finish: 'ended',
	        fail: 'error'
	      };
	      for (var evtName in evtsMap) {
	        this.node.addEventListener(evtsMap[evtName], function (type, e) {
	          this.dispatchEvent(type, e.data);
	        }.bind(this, evtName));
	      }
	    },
	    play: function play() {
	      var src = this.node.getAttribute('src');
	      if (!src) {
	        src = this.node.getAttribute('data-src');
	        src && this.node.setAttribute('src', src);
	      }
	      this.node.play();
	    },
	    pause: function pause() {
	      this.node.pause();
	    },
	    stop: function stop() {
	      this.node.pause();
	      this.node.autoplay = false;
	      this.node.setAttribute('data-src', this.node.src);
	      this.node.src = '';
	    }
	  };
	}
	
	var attr = {
	  playStatus: function playStatus(val) {
	    if (val !== 'play' && val !== 'stop' && val !== 'pause') {
	      val = 'pause';
	    }
	    if (this.playStatus === val) {
	      return;
	    }
	    this.playStatus = val;
	    this.node.setAttribute('play-status', val);
	    this[this.playStatus]();
	  },
	  autoPlay: function autoPlay(val) {
	    // DO NOTHING
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  // attrs:
	  //   - autoPlay: true | false (default: false)
	  //   - playStatus: play | pause | stop
	  //   - src: {string}
	  //   - poster: {string}
	  //   - loop: true | false (default: false)
	  //   - muted: true | false (default: false)
	  // events:
	  //   - start
	  //   - pause
	  //   - finish
	  //   - fail
	  function Video(data) {
	    var autoPlay = data.attr.autoPlay;
	    var playStatus = data.attr.playStatus;
	    this.autoPlay = autoPlay === true || autoPlay === 'true';
	    if (playStatus !== 'play' && playStatus !== 'stop' && playStatus !== 'pause') {
	      this.playStatus = 'pause';
	    } else {
	      this.playStatus = playStatus;
	    }
	    Atomic.call(this, data);
	  }
	  Video.prototype = Object.create(Atomic.prototype);
	  extend(Video.prototype, getProto(Weex));
	  extend(Video.prototype, { attr: attr });
	
	  Weex.registerComponent('video', Video);
	}
	
	exports.default = { init: init };

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(179);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./video.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./video.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-video {\n\tbackground-color: #000;\n}", ""]);
	
	// exports


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(181);
	
	var defaults = {
	  color: '#64bd63',
	  secondaryColor: '#dfdfdf',
	  jackColor: '#fff',
	  jackSecondaryColor: null,
	  className: 'weex-switch',
	  disabledOpacity: 0.5,
	  speed: '0.4s',
	  width: 100,
	  height: 60,
	  // is width and height scalable ?
	  scalable: false
	};
	
	function transitionize(element, props) {
	  var transitions = [];
	  for (var key in props) {
	    transitions.push(key + ' ' + props[key]);
	  }
	  element.style.transition = transitions.join(', ');
	  element.style.webkitTransition = transitions.join(', ');
	}
	
	function setSize(comp) {
	  var min = Math.min(comp.width, comp.height);
	  var max = Math.max(comp.width, comp.height);
	  comp.node.style.width = max + 'px';
	  comp.node.style.height = min + 'px';
	  comp.node.style.borderRadius = min / 2 + 'px';
	  comp.jack.style.width = comp.jack.style.height = min + 'px';
	}
	
	function setPosition(comp, clicked) {
	  var checked = comp.checked;
	  var node = comp.node;
	  var jack = comp.jack;
	
	  if (clicked && checked) {
	    checked = false;
	  } else if (clicked && !checked) {
	    checked = true;
	  }
	
	  if (checked === true) {
	    comp.checked = true;
	
	    if (window.getComputedStyle) {
	      jack.style.left = parseInt(window.getComputedStyle(node).width) - parseInt(window.getComputedStyle(jack).width) + 'px';
	    } else {
	      jack.style.left = parseInt(node.currentStyle['width']) - parseInt(jack.currentStyle['width']) + 'px';
	    }
	
	    comp.options.color && colorize(comp);
	    setSpeed(comp);
	  } else {
	    comp.checked = false;
	    jack.style.left = 0;
	    node.style.boxShadow = 'inset 0 0 0 0 ' + comp.options.secondaryColor;
	    node.style.borderColor = comp.options.secondaryColor;
	    node.style.backgroundColor = comp.options.secondaryColor !== defaults.secondaryColor ? comp.options.secondaryColor : '#fff';
	    jack.style.backgroundColor = comp.options.jackSecondaryColor !== comp.options.jackColor ? comp.options.jackSecondaryColor : comp.options.jackColor;
	    setSpeed(comp);
	  }
	}
	
	function setSpeed(comp) {
	  var switcherProp = {};
	  var jackProp = {
	    'background-color': comp.options.speed,
	    left: comp.options.speed.replace(/[a-z]/, '') / 2 + 's'
	  };
	
	  if (comp.checked) {
	    switcherProp = {
	      border: comp.options.speed,
	      'box-shadow': comp.options.speed,
	      'background-color': comp.options.speed.replace(/[a-z]/, '') * 3 + 's'
	    };
	  } else {
	    switcherProp = {
	      border: comp.options.speed,
	      'box-shadow': comp.options.speed
	    };
	  }
	
	  transitionize(comp.node, switcherProp);
	  transitionize(comp.jack, jackProp);
	}
	
	function colorize(comp) {
	  var nodeHeight = comp.node.offsetHeight / 2;
	
	  comp.node.style.backgroundColor = comp.options.color;
	  comp.node.style.borderColor = comp.options.color;
	  comp.node.style.boxShadow = 'inset 0 0 0 ' + nodeHeight + 'px ' + comp.options.color;
	  comp.jack.style.backgroundColor = comp.options.jackColor;
	}
	
	function getClickHandler(comp) {
	  if (!comp._clickHandler) {
	    comp._clickHandler = function () {
	      setPosition(comp, true);
	      comp.dispatchEvent('change', {
	        value: comp.checked
	      });
	    };
	  }
	  return comp._clickHandler;
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('span');
	    this.jack = document.createElement('small');
	    node.appendChild(this.jack);
	    node.className = this.options.className;
	    this.node = node;
	    this.attr.disabled.call(this, this.data.attr.disabled);
	    return node;
	  },
	  onAppend: function onAppend() {
	    setSize(this);
	    setPosition(this);
	  },
	  enable: function enable() {
	    this.disabled && (this.disabled = false);
	    this.node.style.opacity = 1;
	    this.node.addEventListener('click', getClickHandler(this));
	  },
	  disable: function disable() {
	    !this.disabled && (this.disabled = true);
	    this.node.style.opacity = defaults.disabledOpacity;
	    this.node.removeEventListener('click', getClickHandler(this));
	  }
	};
	
	var attr = {
	  disabled: function disabled(val) {
	    this.disabled = val && val !== 'false';
	    this.disabled ? this.disable() : this.enable();
	  }
	};
	
	var style = {
	  width: function width(val) {
	    if (!this.options.scalable) {
	      return;
	    }
	    val = parseFloat(val);
	    if (isNaN(val) || val < 0) {
	      val = this.options.width;
	    }
	    this.width = val * this.data.scale;
	    this.setSize();
	  },
	
	  height: function height(val) {
	    if (!this.options.scalable) {
	      return;
	    }
	    val = parseFloat(val);
	    if (isNaN(val) || val < 0) {
	      val = this.options.height;
	    }
	    this.height = val * this.data.scale;
	    this.setSize();
	  }
	};
	
	var event = {
	  change: {
	    updator: function updator() {
	      return {
	        attrs: {
	          checked: this.checked
	        }
	      };
	    },
	    extra: function extra() {
	      return {
	        value: this.checked
	      };
	    }
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	
	  // attrs:
	  //   - checked: if is checked.
	  //   - disabled: if true, this component is not available for interaction.
	  function Switch(data) {
	    this.options = extend({}, defaults);
	    this.checked = data.attr.checked && data.attr.checked !== 'false';
	    this.data = data;
	    this.width = this.options.width * data.scale;
	    this.height = this.options.height * data.scale;
	    Atomic.call(this, data);
	  }
	  Switch.prototype = Object.create(Atomic.prototype);
	  extend(Switch.prototype, proto);
	  extend(Switch.prototype, { attr: attr });
	  extend(Switch.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	  extend(Switch.prototype, { event: event });
	
	  Weex.registerComponent('switch', Switch);
	}
	
	exports.default = { init: init };

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(182);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./switch.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./switch.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/* switch defaults. */\n.weex-switch {\n  background-color: #fff;\n  border: 1px solid #dfdfdf;\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  -moz-user-select: none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  box-sizing: content-box;\n  background-clip: content-box;\n}\n\n.weex-switch > small {\n  background: #fff;\n  border-radius: 100%;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getProto(Weex) {
	  var Component = Weex.Component;
	  return {
	    create: function create() {
	      var node = document.createElement('a');
	      node.classList.add('weex-container');
	      node.style.textDecoration = 'none';
	      return node;
	    },
	    bindEvents: function bindEvents(evts) {
	      // event handler for click event will be processed
	      // before the url redirection.
	      Component.prototype.bindEvents.call(this, evts);
	      this.node.addEventListener('click', function (evt) {
	        if (evt._alreadyFired && evt.target !== this.node) {
	          // if the event target is this.node, then this is
	          // just another click event handler for the same
	          // target, not a handler for a bubbling up event,
	          // otherwise it is a bubbling up event, and it
	          // should be disregarded.
	          return;
	        }
	        evt._alreadyFired = true;
	        location.href = this.href;
	      }.bind(this));
	    }
	  };
	}
	
	var attr = {
	  href: function href(val) {
	    if (!val) {
	      return console.warn('[web-render] href of <a> should not be a null value.');
	    }
	    this.href = val;
	    this.node.setAttribute('data-href', val);
	  }
	};
	
	function init(Weex) {
	  var Component = Weex.Component;
	  var extend = Weex.utils.extend;
	
	  // attrs:
	  //   - href
	  function A(data) {
	    Component.call(this, data);
	  }
	
	  A.prototype = Object.create(Component.prototype);
	  extend(A.prototype, getProto(Weex));
	  extend(A.prototype, { attr: attr });
	
	  Weex.registerComponent('a', A);
	}
	
	exports.default = { init: init };

/***/ },
/* 184 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ID_PREFIX = 'weex_embed_';
	
	var getRandom = void 0;
	
	function _generateId() {
	  return ID_PREFIX + getRandom(10);
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.id = this.id;
	    node.style.overflow = 'scroll';
	    return node;
	  },
	  initWeex: function initWeex() {
	    this.id = _generateId();
	    this.node.id = this.id;
	    var config = {
	      appId: this.id,
	      source: this.source,
	      bundleUrl: this.source,
	      loader: this.loader,
	      jsonpCallback: this.jsonpCallback,
	      width: this.node.getBoundingClientRect().width,
	      rootId: this.id,
	      embed: true
	    };
	    window.weex.init(config);
	  },
	  destroyWeex: function destroyWeex() {
	    this.id && window.destroyInstance(this.id);
	    // TODO: unbind events and clear doms.
	    this.node.innerHTML = '';
	  },
	  reloadWeex: function reloadWeex() {
	    if (this.id) {
	      this.destroyWeex();
	      this.id = null;
	      this.node.id = null;
	      this.node.innerHTML = '';
	    }
	    this.initWeex();
	  }
	};
	
	// not recommended, because of the leak of memory.
	var attr = {
	  src: function src(value) {
	    this.source = value;
	    this.reloadWeex();
	  }
	};
	
	function init(Weex) {
	  var Component = Weex.Component;
	  var extend = Weex.utils.extend;
	  getRandom = Weex.utils.getRandom;
	
	  function Embed(data, nodeType) {
	    var attr = data.attr;
	    if (attr) {
	      this.source = attr.src;
	      this.loader = attr.loader || 'xhr';
	      this.jsonpCallback = attr.jsonpCallback;
	    }
	    Component.call(this, data, nodeType);
	  }
	
	  Embed.prototype = Object.create(Component.prototype);
	  extend(Embed.prototype, proto);
	  extend(Embed.prototype, { attr: attr });
	
	  Weex.registerComponent('embed', Embed);
	}
	
	exports.default = { init: init };

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/* global CSSRule */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(186);
	
	var loopArray = void 0,
	    getRgb = void 0;
	
	function getStyleSheet(spinner) {
	  if (spinner.styleSheet) {
	    return;
	  }
	  var styles = document.styleSheets;
	  var i = void 0,
	      l = void 0,
	      j = void 0,
	      m = void 0;
	  /* eslint-disable no-labels */
	  outer: for (i = 0, l = styles.length; i < l; i++) {
	    var rules = styles[i].rules;
	    for (j = 0, m = rules.length; j < m; j++) {
	      var item = rules.item(j);
	      if ((item.type === CSSRule.KEYFRAMES_RULE || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE) && item.name === 'spinner') {
	        break outer;
	      }
	    }
	  }
	  /* eslint-enable no-labels */
	  spinner.styleSheet = styles[i];
	}
	
	function setKeyframeColor(spinner, val) {
	  getStyleSheet(spinner);
	  var keyframeRules = computeKeyFrameRules(val);
	  var rules = spinner.styleSheet.rules;
	  for (var i = 0, l = rules.length; i < l; i++) {
	    var item = rules.item(i);
	    if ((item.type === CSSRule.KEYFRAMES_RULE || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE) && item.name === 'spinner') {
	      var cssRules = item.cssRules;
	      for (var j = 0, m = cssRules.length; j < m; j++) {
	        var keyframe = cssRules[j];
	        if (keyframe.type === CSSRule.KEYFRAME_RULE || keyframe.type === CSSRule.WEBKIT_KEYFRAME_RULE) {
	          keyframe.style.boxShadow = keyframeRules[j];
	        }
	      }
	    }
	  }
	}
	
	function computeKeyFrameRules(rgb) {
	  if (!rgb) {
	    return;
	  }
	  var scaleArr = ['0em -2.6em 0em 0em', '1.8em -1.8em 0 0em', '2.5em 0em 0 0em', '1.75em 1.75em 0 0em', '0em 2.5em 0 0em', '-1.8em 1.8em 0 0em', '-2.6em 0em 0 0em', '-1.8em -1.8em 0 0em'];
	  var colorArr = ['1', '0.2', '0.2', '0.2', '0.2', '0.2', '0.5', '0.7'].map(function (e) {
	    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + e + ')';
	  });
	  var rules = [];
	
	  var _loop = function _loop(i) {
	    var tmpColorArr = loopArray(colorArr, i, 'r');
	    rules.push(scaleArr.map(function (scaleStr, i) {
	      return scaleStr + ' ' + tmpColorArr[i];
	    }).join(', '));
	  };
	
	  for (var i = 0; i < scaleArr.length; i++) {
	    _loop(i);
	  }
	  return rules;
	}
	
	var proto = {
	  create: function create() {
	    var node = document.createElement('div');
	    node.classList.add('weex-container', 'weex-spinner-wrap');
	    this.spinner = document.createElement('div');
	    this.spinner.classList.add('weex-element', 'weex-spinner');
	    node.appendChild(this.spinner);
	    return node;
	  }
	};
	
	var style = {
	  color: function color(val) {
	    var rgb = getRgb(val);
	    if (!rgb) {
	      return console.error('[web-render] invalid color value:', val);
	    }
	    setKeyframeColor(this, rgb);
	  }
	};
	
	// Spinner.prototype.updateStyle = function (style) {
	//   Atomic.prototype.updateStyle.call(this, style)
	//   if (style && style.color) {
	//     this.setKeyframeColor(global.weex.utils.getRgb(this.node.style.color))
	//   }
	// }
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	  getRgb = Weex.utils.getRgb;
	  loopArray = Weex.utils.loopArray;
	
	  function Spinner(data) {
	    Atomic.call(this, data);
	  }
	  Spinner.prototype = Object.create(Atomic.prototype);
	  extend(Spinner.prototype, proto);
	  extend(Spinner.prototype, {
	    style: extend(Object.create(Atomic.prototype.style), style)
	  });
	
	  Weex.registerComponent('spinner', Spinner);
	  Weex.registerComponent('loading-indicator', Spinner);
	}
	
	exports.default = { init: init };

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(187);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./spinner.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./spinner.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-spinner-wrap {\n  width: 1.013333rem; /* 76px */\n  height: 1.013333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  overflow: visible;\n}\n\n.weex-spinner {\n  font-size: 0.16rem; /* 12px */\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: spinner 1.1s infinite ease;\n  animation: spinner 1.1s infinite ease;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n}\n@-webkit-keyframes spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n@keyframes spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 188 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = void 0;
	
	function handleMsg(web, evt) {
	  var msg = evt.data;
	  if (typeof msg === 'string') {
	    try {
	      msg = JSON.parse(msg);
	    } catch (e) {}
	  }
	  if (!msg) {
	    return;
	  }
	  if (msg.type === 'weex') {
	    if (!isArray(msg.content)) {
	      return console.error('[h5-render] weex msg received by web component.' + ' msg.content should be a array:', msg.content);
	    }
	    callNative(web.getComponentManager().instanceId, msg.content);
	  }
	}
	
	function getProto(Weex) {
	  var Atomic = Weex.Atomic;
	  return {
	    create: function create() {
	      // Iframe's defect: can't use position:absolute and top, left, right,
	      // bottom all setting to zero and use margin to leave specified
	      // height for a blank area, and have to use 100% to fill the parent
	      // container, otherwise it will use a unwanted default size instead.
	      // Therefore a div as a iframe wrapper is needed here.
	      var node = document.createElement('div');
	      node.classList.add('weex-container');
	      this.web = document.createElement('iframe');
	      node.appendChild(this.web);
	      this.web.classList.add('weex-element');
	      this.web.style.width = '100%';
	      this.web.style.height = '100%';
	      this.web.style.border = 'none';
	      return node;
	    },
	    bindEvents: function bindEvents(evts) {
	      Atomic.prototype.bindEvents.call(this, evts);
	      var that = this;
	      this.web.addEventListener('load', function (e) {
	        that.dispatchEvent('pagefinish', {
	          url: that.web.src
	        });
	      });
	      window.addEventListener('message', handleMsg.bind(null, this));
	    },
	    goBack: function goBack() {
	      this.web.contentWindow.history.back();
	    },
	    goForward: function goForward() {
	      this.web.contentWindow.history.forward();
	    },
	    reload: function reload() {
	      this.web.contentWindow.location.reload();
	    }
	  };
	}
	
	var attr = {
	  src: function src(val) {
	    this.web.src = val;
	    setTimeout(function () {
	      this.dispatchEvent('pagestart', { url: val });
	    }.bind(this), 0);
	  }
	};
	
	function init(Weex) {
	  var Atomic = Weex.Atomic;
	  var extend = Weex.utils.extend;
	  isArray = Weex.utils.isArray;
	
	  // A component to import web pages, which works like
	  // a iframe element or a webview.
	  // attrs:
	  //   - src
	  // events:
	  //   - pagestart
	  //   - pagefinish
	  //   - error
	  function Web(data) {
	    Atomic.call(this, data);
	  }
	  Web.prototype = Object.create(Atomic.prototype);
	  extend(Web.prototype, getProto(Weex));
	  extend(Web.prototype, { attr: attr });
	
	  Weex.registerComponent('web', Web);
	}
	
	exports.default = { init: init };

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(190);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _event = __webpack_require__(198);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _pageInfo = __webpack_require__(199);
	
	var _pageInfo2 = _interopRequireDefault(_pageInfo);
	
	var _stream = __webpack_require__(200);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	var _modal = __webpack_require__(201);
	
	var _modal2 = _interopRequireDefault(_modal);
	
	var _animation = __webpack_require__(218);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	var _webview = __webpack_require__(220);
	
	var _webview2 = _interopRequireDefault(_webview);
	
	var _navigator = __webpack_require__(221);
	
	var _navigator2 = _interopRequireDefault(_navigator);
	
	var _storage = __webpack_require__(222);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _clipboard = __webpack_require__(223);
	
	var _clipboard2 = _interopRequireDefault(_clipboard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.install(_dom2.default);
	    Weex.install(_event2.default);
	    Weex.install(_pageInfo2.default);
	    Weex.install(_stream2.default);
	    Weex.install(_modal2.default);
	    Weex.install(_animation2.default);
	    Weex.install(_webview2.default);
	    // Weex.install(timer)
	    Weex.install(_navigator2.default);
	    Weex.install(_storage2.default);
	    Weex.install(_clipboard2.default);
	  }
	};
	// import timer from './timer'

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _scrollTo = __webpack_require__(191);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var dom = {
	  /**
	   * scrollToElement
	   * @param  {string} ref
	   * @param  {obj} options {offset:Number}
	   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
	   */
	  scrollToElement: function scrollToElement(ref, options) {
	    !options && (options = {});
	    var offset = (Number(options.offset) || 0) * this.scale;
	    var elem = this.getComponentManager().getComponent(ref);
	    if (!elem) {
	      return console.error('[h5-render] component of ref ' + ref + ' doesn\'t exist.');
	    }
	    var parentScroller = elem.getParentScroller();
	    if (parentScroller) {
	      parentScroller.scroller.scrollToElement(elem.node, true, offset);
	    } else {
	      var offsetTop = elem.node.getBoundingClientRect().top + document.body.scrollTop;
	      var tween = (0, _scrollTo2.default)(0, offsetTop + offset, options);
	      tween.on('end', function () {
	        console.log('scroll end.');
	      });
	    }
	  }
	};
	
	var meta = {
	  dom: [{
	    name: 'scrollToElement',
	    args: ['string', 'object']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('dom', dom, meta);
	  }
	};

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Tween = __webpack_require__(192);
	var raf = __webpack_require__(197);
	
	/**
	 * Expose `scrollTo`.
	 */
	
	module.exports = scrollTo;
	
	/**
	 * Scroll to `(x, y)`.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @api public
	 */
	
	function scrollTo(x, y, options) {
	  options = options || {};
	
	  // start position
	  var start = scroll();
	
	  // setup tween
	  var tween = Tween(start)
	    .ease(options.ease || 'out-circ')
	    .to({ top: y, left: x })
	    .duration(options.duration || 1000);
	
	  // scroll
	  tween.update(function(o){
	    window.scrollTo(o.left | 0, o.top | 0);
	  });
	
	  // handle end
	  tween.on('end', function(){
	    animate = function(){};
	  });
	
	  // animate
	  function animate() {
	    raf(animate);
	    tween.update();
	  }
	
	  animate();
	  
	  return tween;
	}
	
	/**
	 * Return scroll position.
	 *
	 * @return {Object}
	 * @api private
	 */
	
	function scroll() {
	  var y = window.pageYOffset || document.documentElement.scrollTop;
	  var x = window.pageXOffset || document.documentElement.scrollLeft;
	  return { top: y, left: x };
	}


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(193);
	var clone = __webpack_require__(194);
	var type = __webpack_require__(195);
	var ease = __webpack_require__(196);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 193 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(195);
	} catch (_) {
	  type = __webpack_require__(195);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 195 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 196 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var event = {
	  /**
	   * openUrl
	   * @param  {string} url
	   */
	  openURL: function openURL(url) {
	    location.href = url;
	  }
	
	};
	
	var meta = {
	  event: [{
	    name: 'openURL',
	    args: ['string']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('event', event, meta);
	  }
	};

/***/ },
/* 199 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pageInfo = {
	
	  setTitle: function setTitle(title) {
	    title = title || 'Weex HTML5';
	    try {
	      title = decodeURIComponent(title);
	    } catch (e) {}
	    document.title = title;
	  }
	};
	
	var meta = {
	  pageInfo: [{
	    name: 'setTitle',
	    args: ['string']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('pageInfo', pageInfo, meta);
	  }
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	/* global lib, XMLHttpRequest */
	/* deps: httpurl */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(135);
	
	var utils = void 0;
	
	var jsonpCnt = 0;
	var ERROR_STATE = -1;
	
	var TYPE_JSON = 'application/json;charset=UTF-8';
	var TYPE_FORM = 'application/x-www-form-urlencoded';
	
	var REG_FORM = /^(?:[^&=]+=[^&=]+)(?:&[^&=]+=[^&=]+)*$/;
	
	function _jsonp(config, callback, progressCallback) {
	  var cbName = 'jsonp_' + ++jsonpCnt;
	  var url = void 0;
	
	  if (!config.url) {
	    console.error('[h5-render] config.url should be set in _jsonp for \'fetch\' API.');
	  }
	
	  global[cbName] = function (cb) {
	    return function (response) {
	      callback(response);
	      delete global[cb];
	    };
	  }(cbName);
	
	  var script = document.createElement('script');
	  try {
	    url = lib.httpurl(config.url);
	  } catch (err) {
	    console.error('[h5-render] invalid config.url in _jsonp for \'fetch\' API: ' + config.url);
	  }
	  url.params.callback = cbName;
	  script.type = 'text/javascript';
	  script.src = url.toString();
	  // script.onerror is not working on IE or safari.
	  // but they are not considered here.
	  script.onerror = function (cb) {
	    return function (err) {
	      console.error('[h5-render] unexpected error in _jsonp for \'fetch\' API', err);
	      callback(err);
	      delete global[cb];
	    };
	  }(cbName);
	  var head = document.getElementsByTagName('head')[0];
	  head.insertBefore(script, null);
	}
	
	function _xhr(config, callback, progressCallback) {
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = config.type;
	  xhr.open(config.method, config.url, true);
	
	  var headers = config.headers || {};
	  for (var k in headers) {
	    xhr.setRequestHeader(k, headers[k]);
	  }
	
	  xhr.onload = function (res) {
	    callback({
	      status: xhr.status,
	      ok: xhr.status >= 200 && xhr.status < 300,
	      statusText: xhr.statusText,
	      data: xhr.response,
	      headers: xhr.getAllResponseHeaders().split('\n').reduce(function (obj, headerStr) {
	        var headerArr = headerStr.match(/(.+): (.+)/);
	        if (headerArr) {
	          obj[headerArr[1]] = headerArr[2];
	        }
	        return obj;
	      }, {})
	    });
	  };
	
	  if (progressCallback) {
	    xhr.onprogress = function (e) {
	      progressCallback({
	        readyState: xhr.readyState,
	        status: xhr.status,
	        length: e.loaded,
	        total: e.total,
	        statusText: xhr.statusText,
	        headers: xhr.getAllResponseHeaders().split('\n').reduce(function (obj, headerStr) {
	          var headerArr = headerStr.match(/(.+): (.+)/);
	          if (headerArr) {
	            obj[headerArr[1]] = headerArr[2];
	          }
	          return obj;
	        }, {})
	      });
	    };
	  }
	
	  xhr.onerror = function (err) {
	    console.error('[h5-render] unexpected error in _xhr for \'fetch\' API', err);
	    callback({
	      status: ERROR_STATE,
	      ok: false,
	      statusText: '',
	      data: '',
	      headers: {}
	    });
	  };
	
	  xhr.send(config.body);
	}
	
	var stream = {
	
	  /**
	   * sendHttp
	   * @deprecated
	   * Note: This API is deprecated. Please use stream.fetch instead.
	   * send a http request through XHR.
	   * @param  {obj} params
	   *  - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH',
	   *  - url: url requested
	   * @param  {string} callbackId
	   */
	  sendHttp: function sendHttp(param, callbackId) {
	    if (typeof param === 'string') {
	      try {
	        param = JSON.parse(param);
	      } catch (e) {
	        return;
	      }
	    }
	    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) !== 'object' || !param.url) {
	      return console.error('[h5-render] invalid config or invalid config.url for sendHttp API');
	    }
	
	    var sender = this.sender;
	    var method = param.method || 'GET';
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, param.url, true);
	    xhr.onload = function () {
	      sender.performCallback(callbackId, this.responseText);
	    };
	    xhr.onerror = function (error) {
	      return console.error('[h5-render] unexpected error in sendHttp API', error);
	      // sender.performCallback(
	      //   callbackId,
	      //   new Error('unexpected error in sendHttp API')
	      // )
	    };
	    xhr.send();
	  },
	
	  /**
	   * fetch
	   * use stream.fetch to request for a json file, a plain text file or
	   * a arraybuffer for a file stream. (You can use Blob and FileReader
	   * API implemented by most modern browsers to read a arraybuffer.)
	   * @param  {object} options config options
	   *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH'
	   *   - headers {obj}
	   *   - url {string}
	   *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
	   *   - body
	   *   - type {string} 'json' | 'jsonp' | 'text'
	   * @param  {string} callbackId
	   * @param  {string} progressCallbackId
	   */
	  fetch: function fetch(options, callbackId, progressCallbackId) {
	    var DEFAULT_METHOD = 'GET';
	    var DEFAULT_MODE = 'cors';
	    var DEFAULT_TYPE = 'text';
	
	    var methodOptions = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'];
	    var modeOptions = ['cors', 'no-cors', 'same-origin', 'navigate'];
	    var typeOptions = ['text', 'json', 'jsonp', 'arraybuffer'];
	
	    // const fallback = false  // fallback from 'fetch' API to XHR.
	    var sender = this.sender;
	
	    var config = utils.extend({}, options);
	
	    // validate options.method
	    if (typeof config.method === 'undefined') {
	      config.method = DEFAULT_METHOD;
	      console.warn('[h5-render] options.method for \'fetch\' API has been set to ' + 'default value \'' + config.method + '\'');
	    } else if (methodOptions.indexOf((config.method + '').toUpperCase()) === -1) {
	      return console.error('[h5-render] options.method \'' + config.method + '\' for \'fetch\' API should be one of ' + methodOptions + '.');
	    }
	
	    // validate options.url
	    if (!config.url) {
	      return console.error('[h5-render] options.url should be set for \'fetch\' API.');
	    }
	
	    // validate options.mode
	    if (typeof config.mode === 'undefined') {
	      config.mode = DEFAULT_MODE;
	    } else if (modeOptions.indexOf((config.mode + '').toLowerCase()) === -1) {
	      return console.error('[h5-render] options.mode \'' + config.mode + '\' for \'fetch\' API should be one of ' + modeOptions + '.');
	    }
	
	    // validate options.type
	    if (typeof config.type === 'undefined') {
	      config.type = DEFAULT_TYPE;
	      console.warn('[h5-render] options.type for \'fetch\' API has been set to ' + 'default value \'' + config.type + '\'.');
	    } else if (typeOptions.indexOf((config.type + '').toLowerCase()) === -1) {
	      return console.error('[h5-render] options.type \'' + config.type + '\' for \'fetch\' API should be one of ' + typeOptions + '.');
	    }
	
	    // validate options.headers
	    config.headers = config.headers || {};
	    if (!utils.isPlainObject(config.headers)) {
	      return console.error('[h5-render] options.headers should be a plain object');
	    }
	
	    // validate options.body
	    var body = config.body;
	    if (!config.headers['Content-Type'] && body) {
	      if (utils.isPlainObject(body)) {
	        // is a json data
	        try {
	          config.body = JSON.stringify(body);
	          config.headers['Content-Type'] = TYPE_JSON;
	        } catch (e) {}
	      } else if (utils.getType(body) === 'string' && body.match(REG_FORM)) {
	        // is form-data
	        config.body = encodeURI(body);
	        config.headers['Content-Type'] = TYPE_FORM;
	      }
	    }
	
	    // validate options.timeout
	    config.timeout = parseInt(config.timeout, 10) || 2500;
	
	    var _callArgs = [config, function (res) {
	      sender.performCallback(callbackId, res);
	    }];
	    if (progressCallbackId) {
	      _callArgs.push(function (res) {
	        // Set 'keepAlive' to true for sending continuous callbacks
	        sender.performCallback(progressCallbackId, res, true);
	      });
	    }
	
	    if (config.type === 'jsonp') {
	      _jsonp.apply(this, _callArgs);
	    } else {
	      _xhr.apply(this, _callArgs);
	    }
	  }
	
	};
	
	var meta = {
	  stream: [{
	    name: 'sendHttp',
	    args: ['object', 'function']
	  }, {
	    name: 'fetch',
	    args: ['object', 'function', 'function']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    utils = Weex.utils;
	    Weex.registerApiModule('stream', stream, meta);
	  }
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _modals = __webpack_require__(202);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var msg = {
	
	  // duration: default is 0.8 seconds.
	  toast: function toast(config) {
	    _modals2.default.toast(config.message, config.duration);
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - callback
	  alert: function alert(config, callbackId) {
	    var sender = this.sender;
	    config.callback = function () {
	      sender.performCallback(callbackId);
	    };
	    _modals2.default.alert(config);
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - cancelTitle: title of cancel button
	  //  - callback
	  confirm: function confirm(config, callbackId) {
	    var sender = this.sender;
	    config.callback = function (val) {
	      sender.performCallback(callbackId, val);
	    };
	    _modals2.default.confirm(config);
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - cancelTitle: title of cancel button
	  //  - callback
	  prompt: function prompt(config, callbackId) {
	    var sender = this.sender;
	    config.callback = function (val) {
	      sender.performCallback(callbackId, val);
	    };
	    _modals2.default.prompt(config);
	  }
	};
	
	var meta = {
	  modal: [{
	    name: 'toast',
	    args: ['object']
	  }, {
	    name: 'alert',
	    args: ['object', 'function']
	  }, {
	    name: 'confirm',
	    args: ['object', 'function']
	  }, {
	    name: 'prompt',
	    args: ['object', 'function']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('modal', msg, meta);
	  }
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Alert = __webpack_require__(203)
	var Confirm = __webpack_require__(209)
	var Prompt = __webpack_require__(212)
	var toast = __webpack_require__(215)
	
	var modal = {
	
	  toast: function (msg, duration) {
	    toast.push(msg, duration)
	  },
	
	  alert: function (config) {
	    new Alert(config).show()
	  },
	
	  prompt: function (config) {
	    new Prompt(config).show()
	  },
	
	  confirm: function (config) {
	    new Confirm(config).show()
	  }
	
	}
	
	!window.lib && (window.lib = {})
	window.lib.modal = modal
	
	module.exports = modal

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(204)
	__webpack_require__(207)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	
	function Alert(config) {
	  this.msg = config.message || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  Modal.call(this)
	  this.node.classList.add('amfe-alert')
	}
	
	Alert.prototype = Object.create(Modal.prototype)
	
	Alert.prototype.createNodeContent = function () {
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  this.node.appendChild(buttonGroup)
	  var button = document.createElement('div')
	  button.classList.add(BUTTON_CLASS, 'alert-ok')
	  button.appendChild(document.createTextNode(this.okTitle))
	  buttonGroup.appendChild(button)
	}
	
	Alert.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var button = this.node.querySelector('.' + BUTTON_CLASS)
	  button.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback()
	  }.bind(this))
	}
	
	module.exports = Alert


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(205)
	
	// there will be only one instance of modal.
	var MODAL_WRAP_CLASS = 'amfe-modal-wrap'
	var MODAL_NODE_CLASS = 'amfe-modal-node'
	
	function Modal() {
	  this.wrap = document.querySelector(MODAL_WRAP_CLASS)
	  this.node = document.querySelector(MODAL_NODE_CLASS)
	  if (!this.wrap) {
	    this.createWrap()
	  }
	  if (!this.node) {
	    this.createNode()
	  }
	  this.clearNode()
	  this.createNodeContent()
	  this.bindEvents()
	}
	
	Modal.prototype = {
	
	  show: function () {
	    this.wrap.style.display = 'block'
	    this.node.classList.remove('hide')
	  },
	
	  destroy: function () {
	    document.body.removeChild(this.wrap)
	    document.body.removeChild(this.node)
	    this.wrap = null
	    this.node = null
	  },
	
	  createWrap: function () {
	    this.wrap = document.createElement('div')
	    this.wrap.className = MODAL_WRAP_CLASS
	    document.body.appendChild(this.wrap)
	  },
	
	  createNode: function () {
	    this.node = document.createElement('div')
	    this.node.classList.add(MODAL_NODE_CLASS, 'hide')
	    document.body.appendChild(this.node)
	  },
	
	  clearNode: function () {
	    this.node.innerHTML = ''
	  },
	
	  createNodeContent: function () {
	
	    // do nothing.
	    // child classes can override this method.
	  },
	
	  bindEvents: function () {
	    this.wrap.addEventListener('click', function (e) {
	      e.preventDefault()
	      e.stopPropagation()
	    })
	  }
	}
	
	module.exports = Modal


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(206);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./modal.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.amfe-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n.amfe-modal-node.hide {\n  display: none;\n}\n.amfe-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 1px solid #ddd;\n}\n.amfe-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n.amfe-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(208);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./alert.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./alert.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-alert .amfe-alert-ok {\n  width: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(204)
	__webpack_require__(210)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	
	function Confirm(config) {
	  this.msg = config.message || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  this.cancelTitle = config.cancelTitle || 'Cancel'
	  Modal.call(this)
	  this.node.classList.add('amfe-confirm')
	}
	
	Confirm.prototype = Object.create(Modal.prototype)
	
	Confirm.prototype.createNodeContent = function () {
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  this.node.appendChild(buttonGroup)
	  var btnOk = document.createElement('div')
	  btnOk.appendChild(document.createTextNode(this.okTitle))
	  btnOk.classList.add('btn-ok', BUTTON_CLASS)
	  var btnCancel = document.createElement('div')
	  btnCancel.appendChild(document.createTextNode(this.cancelTitle))
	  btnCancel.classList.add('btn-cancel', BUTTON_CLASS)
	  buttonGroup.appendChild(btnOk)
	  buttonGroup.appendChild(btnCancel)
	  this.node.appendChild(buttonGroup)
	}
	
	Confirm.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
	  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
	  btnOk.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback(this.okTitle)
	  }.bind(this))
	  btnCancel.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback(this.cancelTitle)
	  }.bind(this))
	}
	
	module.exports = Confirm


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(211);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./confirm.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./confirm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-confirm .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
	
	// exports


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(204)
	__webpack_require__(213)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	var INPUT_WRAP_CLASS = 'input-wrap'
	var INPUT_CLASS = 'input'
	
	function Prompt(config) {
	  this.msg = config.message || ''
	  this.defaultMsg = config.default || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  this.cancelTitle = config.cancelTitle || 'Cancel'
	  Modal.call(this)
	  this.node.classList.add('amfe-prompt')
	}
	
	Prompt.prototype = Object.create(Modal.prototype)
	
	Prompt.prototype.createNodeContent = function () {
	
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var inputWrap = document.createElement('div')
	  inputWrap.classList.add(INPUT_WRAP_CLASS)
	  content.appendChild(inputWrap)
	  var input = document.createElement('input')
	  input.classList.add(INPUT_CLASS)
	  input.type = 'text'
	  input.autofocus = true
	  input.placeholder = this.defaultMsg
	  inputWrap.appendChild(input)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  var btnOk = document.createElement('div')
	  btnOk.appendChild(document.createTextNode(this.okTitle))
	  btnOk.classList.add('btn-ok', BUTTON_CLASS)
	  var btnCancel = document.createElement('div')
	  btnCancel.appendChild(document.createTextNode(this.cancelTitle))
	  btnCancel.classList.add('btn-cancel', BUTTON_CLASS)
	  buttonGroup.appendChild(btnOk)
	  buttonGroup.appendChild(btnCancel)
	  this.node.appendChild(buttonGroup)
	}
	
	Prompt.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
	  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
	  var that = this
	  btnOk.addEventListener('click', function () {
	    var val = document.querySelector('input').value
	    this.destroy()
	    this.callback && this.callback({
	      result: that.okTitle,
	      data: val
	    })
	  }.bind(this))
	  btnCancel.addEventListener('click', function () {
	    var val = document.querySelector('input').value
	    this.destroy()
	    this.callback && this.callback({
	      result: that.cancelTitle,
	      data: val
	    })
	  }.bind(this))
	}
	
	module.exports = Prompt


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(214);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./prompt.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./prompt.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  // padding: 0.24rem 0.213333rem 0.213333rem;\n  height: 0.96rem;\n}\n.amfe-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.32rem;\n  border: 1px solid #999;\n}\n.amfe-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-prompt .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
	
	// exports


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(216)
	
	var queue = []
	var timer
	var isProcessing = false
	var toastWin
	var TOAST_WIN_CLASS_NAME = 'amfe-toast'
	
	var DEFAULT_DURATION = 0.8
	
	function showToastWindow(msg, callback) {
	  var handleTransitionEnd = function () {
	    toastWin.removeEventListener('transitionend', handleTransitionEnd)
	    callback && callback()
	  }
	  if (!toastWin) {
	    toastWin = document.createElement('div')
	    toastWin.classList.add(TOAST_WIN_CLASS_NAME, 'hide')
	    document.body.appendChild(toastWin)
	  }
	  toastWin.innerHTML = msg
	  toastWin.addEventListener('transitionend', handleTransitionEnd)
	  setTimeout(function () {
	    toastWin.classList.remove('hide')
	  }, 0)
	}
	
	function hideToastWindow(callback) {
	  var handleTransitionEnd = function () {
	    toastWin.removeEventListener('transitionend', handleTransitionEnd)
	    callback && callback()
	  }
	  if (!toastWin) {
	    return
	  }
	  toastWin.addEventListener('transitionend', handleTransitionEnd)
	  toastWin.classList.add('hide')
	}
	
	var toast = {
	
	  push: function (msg, duration) {
	    queue.push({
	      msg: msg,
	      duration: duration || DEFAULT_DURATION
	    })
	    this.show()
	  },
	
	  show: function () {
	    var that = this
	
	    // All messages had been toasted already, so remove the toast window,
	    if (!queue.length) {
	      toastWin && toastWin.parentNode.removeChild(toastWin)
	      toastWin = null
	      return
	    }
	
	    // the previous toast is not ended yet.
	    if (isProcessing) {
	      return
	    }
	    isProcessing = true
	
	    var toastInfo = queue.shift()
	    showToastWindow(toastInfo.msg, function () {
	      timer = setTimeout(function () {
	        timer = null
	        hideToastWindow(function () {
	          isProcessing = false
	          that.show()
	        })
	      }, toastInfo.duration * 1000)
	    })
	  }
	
	}
	
	module.exports = {
	  push: toast.push.bind(toast)
	}


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(217);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./toast.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./toast.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-toast {\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 2.666667rem;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.6;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.amfe-toast.hide {\n  opacity: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lib = __webpack_require__(219);
	
	var _data = {};
	
	var animation = {
	
	  /**
	   * transition
	   * @param  {string} ref        [description]
	   * @param  {obj} config     [description]
	   * @param  {string} callbackId [description]
	   */
	  transition: function transition(ref, config, callbackId) {
	    var refData = _data[ref];
	    var stylesKey = JSON.stringify(config.styles);
	    var weexInstance = this;
	    // If the same component perform a animation with exactly the same
	    // styles in a sequence with so short interval that the prev animation
	    // is still in playing, then the next animation should be ignored.
	    if (refData && refData[stylesKey]) {
	      return;
	    }
	    if (!refData) {
	      refData = _data[ref] = {};
	    }
	    refData[stylesKey] = true;
	
	    var component = this.getComponentManager().getComponent(ref);
	    return (0, _lib.transitionOnce)(component, config, function () {
	      // Remove the stylesKey in refData so that the same animation
	      // can be played again after current animation is already finished.
	      delete refData[stylesKey];
	      weexInstance.sender.performCallback(callbackId);
	    });
	  }
	};
	
	var meta = {
	  animation: [{
	    name: 'transition',
	    args: ['string', 'object', 'function']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('animation', animation, meta);
	  }
	};

/***/ },
/* 219 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	
	  /**
	   * config:
	   *   - styles
	   *   - duration [Number] milliseconds(ms)
	   *   - timingFunction [string]
	   *   - dealy [Number] milliseconds(ms)
	   */
	  transitionOnce: function transitionOnce(comp, config, callback) {
	    var styles = config.styles || {};
	    var duration = config.duration || 1000; // ms
	    var timingFunction = config.timingFunction || 'ease';
	    var delay = config.delay || 0; // ms
	    var transitionValue = 'all ' + duration + 'ms ' + timingFunction + ' ' + delay + 'ms';
	    var dom = comp.node;
	    var transitionEndHandler = function transitionEndHandler(e) {
	      e.stopPropagation();
	      dom.removeEventListener('webkitTransitionEnd', transitionEndHandler);
	      dom.removeEventListener('transitionend', transitionEndHandler);
	      dom.style.transition = '';
	      dom.style.webkitTransition = '';
	      callback();
	    };
	    dom.style.transition = transitionValue;
	    dom.style.webkitTransition = transitionValue;
	    dom.addEventListener('webkitTransitionEnd', transitionEndHandler);
	    dom.addEventListener('transitionend', transitionEndHandler);
	    comp.updateStyle(styles);
	  }
	
	};

/***/ },
/* 220 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var webview = {
	
	  // ref: ref of the web component.
	  goBack: function goBack(ref) {
	    var webComp = this.getComponentManager().getComponent(ref);
	    if (!webComp.goBack) {
	      console.error('error: the specified component has no method of' + ' goBack. Please make sure it is a webview component.');
	      return;
	    }
	    webComp.goBack();
	  },
	
	  // ref: ref of the web component.
	  goForward: function goForward(ref) {
	    var webComp = this.getComponentManager().getComponent(ref);
	    if (!webComp.goForward) {
	      console.error('error: the specified component has no method of' + ' goForward. Please make sure it is a webview component.');
	      return;
	    }
	    webComp.goForward();
	  },
	
	  // ref: ref of the web component.
	  reload: function reload(ref) {
	    var webComp = this.getComponentManager().getComponent(ref);
	    if (!webComp.reload) {
	      console.error('error: the specified component has no method of' + ' reload. Please make sure it is a webview component.');
	      return;
	    }
	    webComp.reload();
	  }
	
	};
	
	var meta = {
	  webview: [{
	    name: 'goBack',
	    args: ['string']
	  }, {
	    name: 'goForward',
	    args: ['string']
	  }, {
	    name: 'reload',
	    args: ['string']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('webview', webview, meta);
	  }
	};

/***/ },
/* 221 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var navigator = {
	
	  // config
	  //  - url: the url to push
	  //  - animated: this configuration item is native only
	  //  callback is not currently supported
	  push: function push(config, callbackId) {
	    window.location.href = config.url;
	    this.sender.performCallback(callbackId);
	  },
	
	  // config
	  //  - animated: this configuration item is native only
	  //  callback is note currently supported
	  pop: function pop(config, callbackId) {
	    window.history.back();
	    this.sender.performCallback(callbackId);
	  }
	
	};
	
	var meta = {
	  navigator: [{
	    name: 'push',
	    args: ['object', 'function']
	  }, {
	    name: 'pop',
	    args: ['object', 'function']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('navigator', navigator, meta);
	  }
	};

/***/ },
/* 222 */
/***/ function(module, exports) {

	/* global localStorage */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var supportLocalStorage = typeof localStorage !== 'undefined';
	var SUCCESS = 'success';
	var FAILED = 'failed';
	var INVALID_PARAM = 'invalid_param';
	var UNDEFINED = 'undefined';
	
	var storage = {
	
	  /**
	   * When passed a key name and value, will add that key to the storage,
	   * or update that key's value if it already exists.
	   * @param {string} key
	   * @param {string} value
	   * @param {function} callbackId
	   */
	  setItem: function setItem(key, value, callbackId) {
	    if (!supportLocalStorage) {
	      console.error('your browser is not support localStorage yet.');
	      return;
	    }
	    var sender = this.sender;
	    if (!key || !value) {
	      sender.performCallback(callbackId, {
	        result: 'failed',
	        data: INVALID_PARAM
	      });
	      return;
	    }
	    try {
	      localStorage.setItem(key, value);
	      sender.performCallback(callbackId, {
	        result: SUCCESS,
	        data: UNDEFINED
	      });
	    } catch (e) {
	      // accept any exception thrown during a storage attempt as a quota error
	      sender.performCallback(callbackId, {
	        result: FAILED,
	        data: UNDEFINED
	      });
	    }
	  },
	
	  /**
	   * When passed a key name, will return that key's value.
	   * @param {string} key
	   * @param {function} callbackId
	   */
	  getItem: function getItem(key, callbackId) {
	    if (!supportLocalStorage) {
	      console.error('your browser is not support localStorage yet.');
	      return;
	    }
	    var sender = this.sender;
	    if (!key) {
	      sender.performCallback(callbackId, {
	        result: FAILED,
	        data: INVALID_PARAM
	      });
	      return;
	    }
	    var val = localStorage.getItem(key);
	    sender.performCallback(callbackId, {
	      result: val ? SUCCESS : FAILED,
	      data: val || UNDEFINED
	    });
	  },
	
	  /**
	   *When passed a key name, will remove that key from the storage.
	   * @param {string} key
	   * @param {function} callbackId
	   */
	  removeItem: function removeItem(key, callbackId) {
	    if (!supportLocalStorage) {
	      console.error('your browser is not support localStorage yet.');
	      return;
	    }
	    var sender = this.sender;
	    if (!key) {
	      sender.performCallback(callbackId, {
	        result: FAILED,
	        data: INVALID_PARAM
	      });
	      return;
	    }
	    localStorage.removeItem(key);
	    sender.performCallback(callbackId, {
	      result: SUCCESS,
	      data: UNDEFINED
	    });
	  },
	
	  /**
	   * Returns an integer representing the number of data items stored in the Storage object.
	   * @param {function} callbackId
	   */
	  length: function length(callbackId) {
	    if (!supportLocalStorage) {
	      console.error('your browser is not support localStorage yet.');
	      return;
	    }
	    var sender = this.sender;
	    var len = localStorage.length;
	    sender.performCallback(callbackId, {
	      result: SUCCESS,
	      data: len
	    });
	  },
	
	  /**
	   * Returns an array that contains all keys stored in Storage object.
	   * @param {function} callbackId
	   */
	  getAllKeys: function getAllKeys(callbackId) {
	    if (!supportLocalStorage) {
	      console.error('your browser is not support localStorage yet.');
	      return;
	    }
	    var sender = this.sender;
	    var _arr = [];
	    for (var i = 0; i < localStorage.length; i++) {
	      _arr.push(localStorage.key(i));
	    }
	    sender.performCallback(callbackId, {
	      result: SUCCESS,
	      data: _arr
	    });
	  }
	};
	
	var meta = {
	  storage: [{
	    name: 'setItem',
	    args: ['string', 'string', 'function']
	  }, {
	    name: 'getItem',
	    args: ['string', 'function']
	  }, {
	    name: 'removeItem',
	    args: ['string', 'function']
	  }, {
	    name: 'length',
	    args: ['function']
	  }, {
	    name: 'getAllKeys',
	    args: ['function']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('storage', storage, meta);
	  }
	};

/***/ },
/* 223 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	
	AUCTION:
	taskQueue
	Clipboard.setString()  NOW not works, facing to user-act lose of taskQueue.
	
	works in Chrome Firefox Opera. but not in Safari.
	@see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility
	
	Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.
	
	So look out your app behavior, when downgrade to html5 render.
	Any idea is welcome.
	**/
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WEEX_CLIPBOARD_ID = '__weex_clipboard_id__';
	
	var clipboard = {
	
	  getString: function getString(callbackId) {
	    // not supported in html5
	    console.log('clipboard.getString() is not supported now.');
	  },
	
	  setString: function setString(text) {
	    // not support safari
	    if (typeof text === 'string' && text !== '' && document.execCommand) {
	      var tempInput = element();
	      tempInput.value = text;
	
	      tempInput.select();
	      document.execCommand('copy');
	      // var out = document.execCommand('copy');
	      // console.log("execCommand out is " + out);
	      tempInput.value = '';
	      tempInput.blur();
	    } else {
	      console.log('only support string input now');
	    }
	  }
	
	};
	
	function element() {
	  var tempInput = document.getElementById(WEEX_CLIPBOARD_ID);
	  if (tempInput === undefined) {
	    tempInput = document.createElement('input');
	    tempInput.setAttribute('id', WEEX_CLIPBOARD_ID);
	    tempInput.style.cssText = 'height:1px;width:1px;border:none;';
	    // tempInput.style.cssText = "height:40px;width:300px;border:solid;"
	    document.body.appendChild(tempInput);
	  }
	  return tempInput;
	}
	
	var meta = {
	  clipboard: [{
	    name: 'getString',
	    args: ['function']
	  }, {
	    name: 'setString',
	    args: ['string']
	  }]
	};
	
	exports.default = {
	  init: function init(Weex) {
	    Weex.registerApiModule('clipboard', clipboard, meta);
	  }
	};

/***/ }
/******/ ]);
module.exports = global.weex;