YUI.add('faulting-model-list-tests', function(Y) {

  var suite = new Y.Test.Suite('ModelList Loading'),
      faultingModelListSuite = new Y.Test.Suite('Faulting extension');

  faultingModelListSuite.add(new Y.Test.Case({
    name: 'Lifecycle',

    'test truth': function(){
      Y.Assert.isTrue(true);
    }

  }));
  
  suite.add(faultingModelListSuite);    
  Y.Test.Runner.add(suite);
}, '@VERSION@', {
    requires: [
        'test',
        'model',
        'model-list',
        'gallery-faulting-model-list'
    ]
});