if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

function createFragment(htmlString) {
    if (htmlString.indexOf('<html') !== -1) {
        throw new Error(
            'Trying to create element from the complete html page. Partial html is required'
        );
    }

    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content;
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

function querySelectorParent(target, selector, includeSelf = false) {
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
    querySelectorParent,
    isHtmlElement,
    createEvent
}