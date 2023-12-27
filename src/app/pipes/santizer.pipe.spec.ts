import { SantizerPipe } from './sanitizer.pipe';

describe('SantizerPipe', () => {
  it('create an instance', () => {
    const pipe = new SantizerPipe();
    expect(pipe).toBeTruthy();
  });
});
