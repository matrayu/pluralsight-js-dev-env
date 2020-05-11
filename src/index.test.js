import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () =>{
  it('should have H1 that says Users', (done) => {
    const index = fs.readFileSync('./src/index.html', "utf-8");
    // doing an async test that has a cb, you must add the done parameter
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Users");
      done();
      window.close();
    })
  });
});
