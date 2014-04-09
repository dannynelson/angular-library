describe('directives.fileread', function() {
  beforeEach(module('directives.fileread'));

  it('should print current version', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<input type="file" fileread="fileData"></input>')($rootScope);
      console.log(element)
      // expect(element.text()).toEqual();
    });
  });
});
