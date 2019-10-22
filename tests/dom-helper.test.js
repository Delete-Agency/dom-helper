import * as DOMHelper from "../src/dom-helper";

it('createFragment returns HTMLFragment', () => {
    expect(DOMHelper.createFragment('test')).toBeInstanceOf(DocumentFragment);
});

it('createFragment returns HTMLFragment with passed content', () => {
    const fragment = DOMHelper.createFragment('test');
    expect(fragment.firstChild).toBeInstanceOf(Text);
    expect(fragment.firstChild.textContent).toEqual('test');
});

it('createElement returns HTMLElement', () => {
    expect(DOMHelper.createElement('<div></div>')).toBeInstanceOf(HTMLElement);
});

it('createElement returns null in case of invalid element markup was passed', () => {
    expect(DOMHelper.createElement('string')).toEqual(null);
});
