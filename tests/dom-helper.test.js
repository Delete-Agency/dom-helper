import * as DOMHelper from "../src/dom-helper";

it('createFragment returns HTMLFragment', () => {
    expect(DOMHelper.createFragment('test')).toBeInstanceOf(DocumentFragment);
});

it('createFragment returns HTMLFragment with passed content', () => {
    const fragment = DOMHelper.createFragment('test');
    expect(fragment.firstChild).toBeInstanceOf(Text);
    expect(fragment.firstChild.textContent).toEqual('test');
});

it('createElement returns null in case of invalid element markup was passed', () => {
    expect(DOMHelper.createElement('string')).toEqual(null);
});

it('createElement returns HTMLElement', () => {
    expect(DOMHelper.createElement('<div></div>')).toBeInstanceOf(HTMLElement);
});

it('createElement returns HTMLElement with the proper content', () => {
    const innerHtml = '<p>123</p>';
    const outerHtml = `<div>${innerHtml}</div>`;
    const element = DOMHelper.createElement(outerHtml);
    expect(element.outerHTML).toEqual(outerHtml);
    expect(element.innerHTML).toEqual(innerHtml);
});


it('querySelectorParent returns null when no parent matches selector', () => {
    const testElement = document.createElement('div');
    expect(DOMHelper.querySelectorParent(testElement, 'any')).toEqual(null);
});

it('querySelectorParent returns parent that matches selector', () => {
    const classNameToCheck = 'check';
    const parentElement = document.createElement('div');
    parentElement.className = classNameToCheck;
    const childElement = document.createElement('div');
    parentElement.appendChild(childElement);

    expect(DOMHelper.querySelectorParent(childElement, `.${classNameToCheck}`)).toEqual(parentElement);
});

it('querySelectorParent takes includeSelf into account', () => {
    const classNameToCheck = 'check';
    const testElement = document.createElement('div');
    testElement.className = classNameToCheck;

    expect(DOMHelper.querySelectorParent(testElement, `.${classNameToCheck}`)).toEqual(null);
    expect(DOMHelper.querySelectorParent(testElement, `.${classNameToCheck}`, true)).toEqual(testElement);
});


it('querySelectorParent ignores self returning parent matches selector', () => {
    const classNameToCheck = 'check';
    const parentElement = document.createElement('div');
    parentElement.className = classNameToCheck;
    const childElement = document.createElement('div');
    childElement.className = classNameToCheck;
    parentElement.appendChild(childElement);

    expect(DOMHelper.querySelectorParent(childElement, `.${classNameToCheck}`)).toEqual(parentElement);
});

it('isHtmlElement returns false for invalid elements', () => {
    const textNode = document.createTextNode('test');

    expect(DOMHelper.isElement(null)).toEqual(false);
    expect(DOMHelper.isElement({})).toEqual(false);
    expect(DOMHelper.isElement(textNode)).toEqual(false);
});

it('isHtmlElement returns true for valid element', () => {
    expect(DOMHelper.isElement(document.createElement('div'))).toEqual(true);
    expect(DOMHelper.isElement(document.createElement('form'))).toEqual(true);
});

it('createEvent triggers change event on input', () => {
    const input = document.createElement('input');

    const event = DOMHelper.createEvent('change');
    expect(event).toBeInstanceOf(Event);

    const onChangeListener = jest.fn();
    input.addEventListener('change', onChangeListener);
    input.dispatchEvent(event);
    expect(onChangeListener).toBeCalled();
});

