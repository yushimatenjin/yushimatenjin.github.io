/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entities/slot.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entities/slot.ts":
/*!******************************!*\
  !*** ./src/entities/slot.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ \"./src/utils/createScript.ts\");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ \"./src/utils/delay.ts\");\n\n\nconst attibuteses = {\n    pattern_1: {\n        type: \"entity\"\n    },\n    pattern_2: {\n        type: \"entity\"\n    },\n    pattern_3: {\n        type: \"entity\"\n    },\n    trigger: {\n        type: \"entity\"\n    },\n    probabilityOf: {\n        type: \"number\"\n    },\n    perticles: {\n        type: \"entity\",\n        array: true\n    },\n    winningScript: {\n        type: \"entity\"\n    }\n};\nclass Slot extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__[\"ScriptTypeBase\"] {\n    initialize() {\n        this.isMoving = false;\n        if (this.app.touch) {\n            // this.app.touch.on(pc.EVENT_TOUCHSTART, this.play, this);\n        }\n        else {\n            // this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.play, this);\n        }\n        // this.trigger.collision.on(\"triggerenter\", this.play, this);\n        setInterval(() => {\n            this.play();\n        }, 2000);\n    }\n    lottery() {\n        if (Math.random() * 100 < this.probabilityOf) {\n            console.log(\"Winning!\");\n            return true;\n        }\n        return false;\n    }\n    async play() {\n        if (this.isMoving) {\n            return;\n        }\n        await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(200);\n        if (this.lottery()) {\n            this.start(true, 2);\n            this.isMoving = true;\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(2800);\n            const randomNumber = Math.round(Math.random() * 10) / 10;\n            this.stop(true, randomNumber - (randomNumber % 0.125));\n            for (let perticle of this.perticles) {\n                perticle.script.perticles.start();\n            }\n            const throwing = await this.winningScript.script.throwcoin.coinThrow();\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(5000);\n            this.isMoving = false;\n        }\n        else {\n            this.start();\n            this.isMoving = true;\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(1800);\n            this.stop();\n            for (let perticle of this.perticles) {\n                perticle.script.perticles.stop();\n            }\n            this.isMoving = false;\n        }\n    }\n    onClick() {\n        if (!this.isMoving) {\n            this.start();\n        }\n        else {\n            this.stop();\n        }\n        this.isMoving = !this.isMoving;\n    }\n    stop(win, offset) {\n        this.pattern_1.script.scrollingtexture.stop(win, offset);\n        this.pattern_2.script.scrollingtexture.stop(win, offset);\n        this.pattern_3.script.scrollingtexture.stop(win, offset);\n    }\n    start(win, offset) {\n        this.pattern_1.script.scrollingtexture.start(win, offset);\n        this.pattern_2.script.scrollingtexture.start(win, offset);\n        this.pattern_3.script.scrollingtexture.start(win, offset);\n    }\n    update() { }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__[\"createScript\"])(Slot, attibuteses);\n\n\n//# sourceURL=webpack:///./src/entities/slot.ts?");

/***/ }),

/***/ "./src/utils/createScript.ts":
/*!***********************************!*\
  !*** ./src/utils/createScript.ts ***!
  \***********************************/
/*! exports provided: createScript, ScriptTypeBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createScript\", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScriptTypeBase\", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?");

/***/ }),

/***/ "./src/utils/delay.ts":
/*!****************************!*\
  !*** ./src/utils/delay.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\n    return new Promise(resolve => setTimeout(resolve, ms));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (delay);\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?");

/***/ })

/******/ });