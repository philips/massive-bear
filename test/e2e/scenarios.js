'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../dist/myApp/index.html');
  });

  describe('view1', function() {

    beforeEach(function() {
      browser().navigateTo('myApp/#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('myApp/#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});

describe('feedback', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html');
  });

  it('should render feedback form', function() {
    expect(element('#message').text()).
      toMatch(/I wish this page would/);
  });

  /* TODO: figure out how to test a form w/o a button
  it('should change message when submitted', function() {
    input('feedback').enter('Test 123');
    expect(element('#message').text()).
      toMatch(/Thank you for the feedback/);
  });
  */
});
