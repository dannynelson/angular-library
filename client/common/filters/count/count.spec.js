describe('filters.count', function() {
  beforeEach(module('filters.count'));
  
  it('returns 0 when an array has no elements', inject(function(countFilter) {
    expect(countFilter([])).toEqual(0);
  }));

  it('returns 3 when an array has three elements', inject(function(countFilter) {
    expect(countFilter(['one', 'two', 'three'])).toEqual(3);
  }));
});
