describe('filters.capitalize', function() {
  beforeEach(module('filters.capitalize'));
  
  it('capitalizes the first letter in a word', inject(function(capitalizeFilter) {
    expect(capitalizeFilter('hello')).toEqual('Hello');
  }));

  it('capitalizes the first letter in a sentence', inject(function(capitalizeFilter) {
    expect(capitalizeFilter('hello world')).toEqual('Hello world');
  }));
});
