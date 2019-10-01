import './polyfills';

function createFragment(htmlString) {
    if (htmlString.indexOf('<html') !== -1) {
        throw new Error(
            'Trying to create element from the complete html page. Partial html is required'
        );
    }

    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', htmlString.trim());

    const documentFragment = new DocumentFragment();
    [...div.childNodes].forEach(node => documentFragment.appendChild(node));

    return documentFragment;
}

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

function getParent(target, selector, includeSelf = true) {
    if (includeSelf && isHtmlElement(target) && target.matches(selector)) {
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

function safeAddEventListener(element) {
    if (element) {
        const args = [...arguments].slice(1);
        element.addEventListener(...args);
    }
}

function hasElementParentWithClass(target, parentClass, includeSelf = true) {
    return getElementParentWithClass(target, parentClass, includeSelf) !== null;
}

function getElementParentWithClass(target, parentClass, includeSelf = true) {
    if (includeSelf && target.classList.contains(parentClass)) {
        return target;
    }

    let parent = target.parentElement;
    while (parent !== null) {
        if (parent.classList.contains(parentClass)) {
            return parent;
        }
        parent = parent.parentElement;
    }

    return null;
}

function isHtmlElement(element) {
    return typeof element === 'object' && element.nodeType === 1;
}

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
    getParent,
    hasElementParentWithClass,
    getElementParentWithClass,
    isHtmlElement,
    createEvent
}