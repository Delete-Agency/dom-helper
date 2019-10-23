"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = createFragment;
exports.createElement = createElement;
exports.querySelectorParent = querySelectorParent;
exports.isElement = isElement;
exports.createEvent = createEvent;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Creates a new DocumentFragment based on the provided markup.
 * @param {string} htmlString
 * @return {DocumentFragment}
 */
function createFragment(htmlString) {
  if (htmlString.indexOf('<html') !== -1) {
    throw new Error('Trying to create element from the complete html page. Partial html is required');
  }

  var div = document.createElement('div');
  div.insertAdjacentHTML('beforeend', htmlString.trim());
  var documentFragment = document.createDocumentFragment();

  _toConsumableArray(div.childNodes).forEach(function (node) {
    return documentFragment.appendChild(node);
  });

  return documentFragment;
}
/**
 * Creates a new Element based on the provided markup.
 * If markup contains more then 1 sibling elements, only first will be returned.
 * Returns `null` if markup contains zero valid elements.
 * @param {string} htmlString
 * @return {Element}
 */


function createElement(htmlString) {
  var fragment = createFragment(htmlString); // ignore text and comment nodes

  var element = fragment.firstElementChild;

  if (element) {
    // move element to current document to avoid bugs later when we insert it to DOM
    document.adoptNode(element);
  }

  return element;
}
/**
 * Searches element up the DOM tree that matches provided selector
 * @param {Element} target
 * @param {string} selector
 * @param  {boolean} includeSelf
 * @return {Element}
 */


function querySelectorParent(target, selector) {
  var includeSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (includeSelf && isElement(target) && target.matches(selector)) {
    return target;
  }

  var parent = target.parentElement;

  while (parent !== null) {
    if (parent.matches(selector)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null;
}
/**
 * Checks whether the passed value is an Element
 * @param {Element} element
 * @return {boolean}
 */


function isElement(element) {
  return element !== null && _typeof(element) === 'object' && element.nodeType === 1;
}
/**
 * Creates new Event ready for dispatching
 * @param {string} name
 * @return {Event}
 */


function createEvent(name) {
  if (typeof Event === 'function') {
    return new Event(name, {
      bubbles: true
    });
  }

  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}