import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const PhantomJS = 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.0.0 Safari/538.1';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', {
  userAgent: PhantomJS,
});
const win = doc.defaultView;

global.document = doc;
global.window = win;

function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

propagateToGlobal(win);

chai.use(chaiImmutable);
