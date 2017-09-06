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
/*!******************************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib?{"presets":["react","es2015","stage-0","stage-1"],"plugins":["transform-decorators-legacy"]}!./app/util/recorderWorker.js ***!
  \******************************************************************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	var recLength = 0,
	    recBuffersL = [],
	    recBuffersR = [],
	    sampleRate;
	
	console.log(self);
	
	self.onmessage = function (e) {
	  switch (e.data.command) {
	    case 'init':
	      init(e.data.config);
	      break;
	    case 'record':
	      record(e.data.buffer);
	      break;
	    case 'exportWAV':
	      exportWAV(e.data.type);
	      break;
	    case 'getBuffer':
	      getBuffer();
	      break;
	    case 'clear':
	      clear();
	      break;
	  }
	};
	
	function init(config) {
	  sampleRate = config.sampleRate;
	}
	
	function record(inputBuffer) {
	  recBuffersL.push(inputBuffer[0]);
	  recBuffersR.push(inputBuffer[1]);
	  recLength += inputBuffer[0].length;
	}
	
	function exportWAV(type) {
	  var bufferL = mergeBuffers(recBuffersL, recLength);
	  var bufferR = mergeBuffers(recBuffersR, recLength);
	  var interleaved = interleave(bufferL, bufferR);
	  var dataview = encodeWAV(interleaved);
	  var audioBlob = new Blob([dataview], { type: type });
	
	  self.postMessage(audioBlob);
	}
	
	function getBuffer() {
	  var buffers = [];
	  buffers.push(mergeBuffers(recBuffersL, recLength));
	  buffers.push(mergeBuffers(recBuffersR, recLength));
	  self.postMessage(buffers);
	}
	
	function clear() {
	  recLength = 0;
	  recBuffersL = [];
	  recBuffersR = [];
	}
	
	function mergeBuffers(recBuffers, recLength) {
	  var result = new Float32Array(recLength);
	  var offset = 0;
	  for (var i = 0; i < recBuffers.length; i++) {
	    result.set(recBuffers[i], offset);
	    offset += recBuffers[i].length;
	  }
	  return result;
	}
	
	function interleave(inputL, inputR) {
	  var length = inputL.length + inputR.length;
	  var result = new Float32Array(length);
	
	  var index = 0,
	      inputIndex = 0;
	
	  while (index < length) {
	    result[index++] = inputL[inputIndex];
	    result[index++] = inputR[inputIndex];
	    inputIndex++;
	  }
	  return result;
	}
	
	function floatTo16BitPCM(output, offset, input) {
	  for (var i = 0; i < input.length; i++, offset += 2) {
	    var s = Math.max(-1, Math.min(1, input[i]));
	    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	  }
	}
	
	function writeString(view, offset, string) {
	  for (var i = 0; i < string.length; i++) {
	    view.setUint8(offset + i, string.charCodeAt(i));
	  }
	}
	
	function encodeWAV(samples) {
	  var buffer = new ArrayBuffer(44 + samples.length * 2);
	  var view = new DataView(buffer);
	
	  /* RIFF identifier */
	  writeString(view, 0, 'RIFF');
	  /* RIFF chunk length */
	  view.setUint32(4, 36 + samples.length * 2, true);
	  /* RIFF type */
	  writeString(view, 8, 'WAVE');
	  /* format chunk identifier */
	  writeString(view, 12, 'fmt ');
	  /* format chunk length */
	  view.setUint32(16, 16, true);
	  /* sample format (raw) */
	  view.setUint16(20, 1, true);
	  /* channel count */
	  view.setUint16(22, 2, true);
	  /* sample rate */
	  view.setUint32(24, sampleRate, true);
	  /* byte rate (sample rate * block align) */
	  view.setUint32(28, sampleRate * 4, true);
	  /* block align (channel count * bytes per sample) */
	  view.setUint16(32, 4, true);
	  /* bits per sample */
	  view.setUint16(34, 16, true);
	  /* data chunk identifier */
	  writeString(view, 36, 'data');
	  /* data chunk length */
	  view.setUint32(40, samples.length * 2, true);
	
	  floatTo16BitPCM(view, 44, samples);
	
	  return view;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=3c681a83bacc505d8025.worker.js.map