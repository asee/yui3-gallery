YUI.add('faulting-model-list-tests', function(Y) {

  var suite = new Y.Test.Suite('ModelList Loading'),
      faultingModelListSuite = new Y.Test.Suite('Faulting extension'),
      assert = Y.assert,
      assertEqual = Y.Assert.areEqual;

  faultingModelListSuite.add(new Y.Test.Case({
    name: 'Basic',

    setUp: function () {
      var faultingList = Y.Base.create('FaultingPeopleList', 
                                       Y.FaultingModelList, [], {});

      this.list = new faultingList({length: 50000});
    },

    'test existance': function(){
      Y.Assert.isObject(this.list);
    },

    'test attrs': function(){
      var list = this.list;
      assertEqual(0, list.get('currentOffset'));
      list.set('currentOffset', "b");
      assertEqual(0, list.get('currentOffset'));
      list.set('currentOffset', 10);
      assertEqual(10, list.get('currentOffset'));

      assertEqual(50000, list.get('length'));
      list.set('length', "b");
      assertEqual(50000, list.get('length'));
      list.set('length', 150000);
      assertEqual(150000, list.get('length'));
    },

    'test should return faulted models for item if not loaded': function(){
      var list = this.list,
          item = list.item(0);

      Y.Assert.isObject(item);
      Y.assert(item.get('_fault'));
      assertEqual(list.model.NAME, item.name);
      Y.Assert.isTypeOf("undefined", list._items[0]);
    },

    'test should return the actual item if loaded': function(){
      var list = this.list, 
          item;
      
      // Cheating...
      list._items[0] = new list.model({'foo': 'bar'});
      item = list.item(0);
      Y.Assert.isTypeOf("undefined", item.get('_fault'));
      assertEqual('bar', item.get('foo'));
    },

    'test should return undefined for an index out of range': function(){
      Y.Assert.isTypeOf('undefined', this.list.item(50000));
    },

    'test should shift the index as currentOffset changes': function(){
      var list = this.list;
      list._items[0] = new list.model({'foo': 'bar'});
      
      assertEqual(0, list.get('currentOffset'));
      Y.Assert.areSame(list._items[0], list.item(0));

      list.set('currentOffset', 10);
      Y.Assert.areNotSame(list._items[0], list.item(0));
      Y.Assert.areSame(list._items[0], list.item(10));
    },

    'test should fire a fault event when a fault is accessed': function(){
      var test = this;

      this.list.on('fault', function(e){
        test.resume(function(){
          assertEqual(0, e.details[0].faultedIndex);
        });
      });

      Y.later(10, this, function(){this.list.item(0)});
      this.wait(20);
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