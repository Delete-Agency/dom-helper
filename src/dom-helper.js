/**
 * Creates a new DocumentFragment based on the provided markup.
 * @param {string} htmlString
 * @return {DocumentFragment}
 */
function createFragment(htmlString) {
    if (htmlString.indexOf('<html') !== -1) {
        throw new Error(
            'Trying to create element from the complete html page. Partial html is required'
        );
    }

    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', htmlString.trim());

    const documentFragment = document.createDocumentFragment();
    [...div.childNodes].forEach(node => documentFragment.appendChild(node));

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
    const fragment = createFragment(htmlString);
    // ignore text and comment nodes
    const element = fragment.firstElementChild;
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
function querySelectorParent(target, selector, includeSelf = false) {
    if (includeSelf && isElement(target) && target.matches(selector)) {
        return target;
    }

    let parent = target.parentElement;
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
    return element !== null && typeof element === 'object' && element.nodeType === 1;
}

/**
 * Creates new Event ready for dispatching
 * @param {string} name
 * @return {Event}
 */
function createEvent(name) {
    if (typeof Event === 'function') {
        return new Event(name, { bubbles: true });
    }
    const event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
}

export {
    createFragment,
    createElement,
    querySelectorParent,
    isElement,
    createEvent
}