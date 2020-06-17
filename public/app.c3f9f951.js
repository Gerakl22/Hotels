// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/infoAboutHotel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoAboutHotel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoAboutHotel = /*#__PURE__*/function () {
  function InfoAboutHotel(container) {
    _classCallCheck(this, InfoAboutHotel);

    this.container = container;
    this.data = {};
    this.deleteHotelItem = null;
    this._handleClickEditBtn = this._clickEditBtn.bind(this);
    this._handleClickDeleteBtn = this._clickDeleteBtn.bind(this); // this._init();
  } // _init() {
  // }


  _createClass(InfoAboutHotel, [{
    key: "_createEditBtn",
    value: function _createEditBtn(id) {
      var btnEditNode = document.createElement("button");
      btnEditNode.classList.value = "btn btn-warning";
      btnEditNode.textContent = "Редактировать";
      btnEditNode.setAttribute("data-id", id);
      btnEditNode.addEventListener("click", this._handleClickEditBtn);
      return btnEditNode;
    }
  }, {
    key: "_createDeleteBtn",
    value: function _createDeleteBtn(id) {
      var btnDeleteNode = document.createElement("button");
      btnDeleteNode.classList.value = "btn btn-danger";
      btnDeleteNode.textContent = "Удалить";
      btnDeleteNode.setAttribute("data-id", id);
      btnDeleteNode.addEventListener("click", this._handleClickDeleteBtn);
      return btnDeleteNode;
    }
  }, {
    key: "_createWrapBtnDiv",
    value: function _createWrapBtnDiv() {
      var divWrapBtnNode = document.createElement("div");
      divWrapBtnNode.classList.value = " btn-wrap mt-auto";
      return divWrapBtnNode;
    }
  }, {
    key: "_clickEditBtn",
    value: function _clickEditBtn(event) {
      var idEditBtn = event.currentTarget.getAttribute("data-id");
      var form = document.querySelector("#form");
      var nameHotelNode = form.querySelector('[name="nameHotel"]');
      var cityNode = form.querySelector('[name="city"]');
      var addressNode = form.querySelector('[name="address"]');
      var starsNode = form.querySelector('[name="stars"]');
      var anotherInfoNode = form.querySelector('[name="anotherInfo"]');
      var gridCheckNode = form.querySelector('[name="gridCheck"]');
      var idFormNode = form.querySelector('[name="id"]');
      var dateFormNode = form.querySelector('[name="date"]');
      form.setAttribute("data-method", "PUT");
      fetch("/api/data", {
        method: "GET"
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        data.list.forEach(function (item) {
          if (item.id == idEditBtn) {
            nameHotelNode.value = item.nameHotel;
            cityNode.value = item.city;
            addressNode.value = item.address;
            starsNode.value = item.stars;
            anotherInfoNode.value = item.anotherInfo;
            gridCheckNode.value = item.gridCheckNode;
            idFormNode.value = item.id;
            dateFormNode.value = item.date;
            $("#collapseExample").collapse("show");
          }
        });
      }).catch(function (error) {
        return console.error(error);
      });
    }
  }, {
    key: "_clickDeleteBtn",
    value: function _clickDeleteBtn(event) {
      var _this = this;

      var idDeleteBtn = event.currentTarget.getAttribute("data-id");
      fetch("/api/data/".concat(idDeleteBtn), {
        method: "DELETE"
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this._clear();

        if (_this.deleteHotelItem) {
          _this.deleteHotelItem(data.list);
        }
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this.container.innerHTML = "";
    }
  }, {
    key: "render",
    value: function render(data, deleteHotelItem) {
      this.data = data;
      this.deleteHotelItem = deleteHotelItem;

      var btnEditNode = this._createEditBtn(this.data.id);

      var btnDeleteNode = this._createDeleteBtn(this.data.id);

      var divWrapBtnNode = this._createWrapBtnDiv();

      var template = "\n          <h5 class='hotel-date'>".concat(this.data.date, "</h5>\n          <div class='hotel-address'>\u0410\u0434\u0440\u0435\u0441: ").concat(this.data.address, "</div>\n          <div class='hotel-stars'>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0432\u0435\u0437\u0434: ").concat(this.data.stars, "</div>\n          <div class='hotel-anotherInfo'>\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F: ").concat(this.data.anotherInfo, "</div>\n    ");

      this._clear();

      this.container.innerHTML = this.container.innerHTML + template;
      divWrapBtnNode.append(btnEditNode, btnDeleteNode);
      this.container.append(divWrapBtnNode);
    }
  }]);

  return InfoAboutHotel;
}();

exports.InfoAboutHotel = InfoAboutHotel;
},{}],"js/listHotels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListHotels = void 0;

var _infoAboutHotel = require("./infoAboutHotel");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ListHotels = /*#__PURE__*/function () {
  function ListHotels(container) {
    _classCallCheck(this, ListHotels);

    this.container = container;
    this.data = [];
    this.idActiveHotelItem = null;
    this.infoAboutHotelContainer = document.querySelector("#infoAboutHotel");
    this.infoAboutHotel = new _infoAboutHotel.InfoAboutHotel(this.infoAboutHotelContainer);
    this._handleClickListHotels = this._clickListHotels.bind(this);

    this._init();
  }

  _createClass(ListHotels, [{
    key: "_init",
    value: function _init() {
      this.container.addEventListener("click", this._handleClickListHotels);
    }
  }, {
    key: "_removeActive",
    value: function _removeActive() {
      var target = this.container.querySelector("[data-id=\"".concat(this.idActiveHotelItem, "\"]"));

      if (target) {
        target.classList.remove("active");
      } else {
        this.idActiveHotelItem = null;
      }
    }
  }, {
    key: "_selectListHotels",
    value: function _selectListHotels(idHotelItem) {
      var _this = this;

      var target = this.container.querySelector("[data-id=\"".concat(idHotelItem, "\"]"));

      if (target) {
        this._removeActive();

        this.idActiveHotelItem = idHotelItem;
        target.classList.add("active");
      } else {
        this.idActiveHotelItem = null;
      }

      this.data.forEach(function (item) {
        if (idHotelItem == item.id) {
          _this.infoAboutHotel.render(item, _this.render.bind(_this));
        }
      });
    }
  }, {
    key: "_clickListHotels",
    value: function _clickListHotels(event) {
      var target = event.target;

      if (target.classList.value.includes("hotel-item")) {
        var idHotelItem = target.getAttribute("data-id");

        this._selectListHotels(idHotelItem);
      }
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this.container.innerHTML = "";
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this2 = this;

      this.data = data;

      this._clear();

      this.data.forEach(function (item) {
        var template = "\n            <div class=\"hotel-item p-2\" data-id=\"".concat(item.id, "\"> \n              <h6>").concat(item.nameHotel, " \u0432 \u0433\u043E\u0440\u043E\u0434\u0435 ").concat(item.city, "</h6>\n              <h6 class='hotel-date-item'>").concat(item.date, "</h6>\n            </div>  \n       ");
        _this2.container.innerHTML = _this2.container.innerHTML + template;
      });

      if (this.idActiveHotelItem) {
        this._selectListHotels(this.idActiveHotelItem);
      }
    }
  }]);

  return ListHotels;
}();

exports.ListHotels = ListHotels;
},{"./infoAboutHotel":"js/infoAboutHotel.js"}],"js/reset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetForm = resetForm;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resetForm(form) {
  form.reset();

  _toConsumableArray(form.querySelectorAll('[type="hidden"]')).forEach(function (input) {
    input.value = "";
  });
}
},{}],"js/form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _listHotels = require("./listHotels");

var _reset = require("./reset");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(form) {
    _classCallCheck(this, Form);

    this.form = form;
    this.idForm = this.form.querySelector('[name="id"]');
    this.dateForm = this.form.querySelector('[name="date"]');
    this.button = document.querySelector('[type="submit"]');
    this.listHotelsContainer = document.querySelector("#listHotels");
    this.listHotels = new _listHotels.ListHotels(this.listHotelsContainer);
    this._handleSubmitBtn = this._submit.bind(this);

    this._init();
  }

  _createClass(Form, [{
    key: "_init",
    value: function _init() {
      this.button.addEventListener("click", this._handleSubmitBtn);
    }
  }, {
    key: "_createIndexDate",
    value: function _createIndexDate() {
      var index = new Date().getTime();
      return index;
    }
  }, {
    key: "_createLocalDate",
    value: function _createLocalDate() {
      var date = new Date();
      return date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, -3);
    }
  }, {
    key: "_send",
    value: function _send(data, method) {
      var _this = this;

      var url = "/api/data";
      if (method == "PUT") url = url + "/".concat(data.id);
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.listHotels.render(data.list);
      }).catch(function (error) {
        return console.error(error);
      });
    }
  }, {
    key: "_setMetaData",
    value: function _setMetaData(id, date) {
      if (this.idForm.value && this.dateForm.value) return;
      this.idForm.value = id;
      this.dateForm.value = date;
    }
  }, {
    key: "_submit",
    value: function _submit(event) {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.classList.add("invalid");
      } else {
        this.form.classList.remove("invalid");

        this._setMetaData(this._createIndexDate(), this._createLocalDate());

        var currentMethod = this.form.getAttribute("data-method");
        var formData = new FormData(this.form);
        var data = {};

        var _iterator = _createForOfIteratorHelper(formData),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                name = _step$value[0],
                value = _step$value[1];

            data[name] = value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this._send(data, currentMethod);

        (0, _reset.resetForm)(this.form);
        $("#collapseExample").collapse("hide");
      }
    }
  }]);

  return Form;
}();

exports.Form = Form;
},{"./listHotels":"js/listHotels.js","./reset":"js/reset.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _form = require("./form");

var _listHotels = require("./listHotels");

var _reset = require("./reset");

var formHotelNode = document.querySelector("#form");
new _form.Form(formHotelNode);
var listHotelsContainer = document.querySelector("#listHotels");
var listHotels = new _listHotels.ListHotels(listHotelsContainer);
var addInfoBtnNode = document.querySelector("#addInfoBtn");
addInfoBtnNode.addEventListener("click", function () {
  formHotelNode.setAttribute("data-method", "POST");
  (0, _reset.resetForm)(formHotelNode);
  $("#collapseExample").collapse("show");
});
fetch("/api/data", {
  method: "GET"
}).then(function (response) {
  return response.json();
}).then(function (data) {
  return listHotels.render(data.list);
}).catch(function (error) {
  return console.error(error);
});
},{"./form":"js/form.js","./listHotels":"js/listHotels.js","./reset":"js/reset.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "2438" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=app.c3f9f951.js.map