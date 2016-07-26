import { expect } from 'chai';
import index from '../src/index.js';

describe('Index', () => {
  it('should export handler', () => {
    expect(index.handle).to.be.a('Function');
  });
});
