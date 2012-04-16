YUI.add('gallery-faulting-model-list', function(Y) {

var EVT_FAULT = 'fault';

function FaultingModelList() {
  FaultingModelList.superclass.constructor.apply(this, arguments);
}

FaultingModelList.ATTRS = {
  
  currentOffset: {
    value: 0,
    validator: Y.Lang.isNumber
  },

  length: {
    value: 0,
    validator: Y.Lang.isNumber
  }

};

Y.FaultingModelList = Y.extend(FaultingModelList, Y.ModelList, {
  
  initializer: function(config){
    this.publish(EVT_FAULT, {defaultFn: this._defFaultFn});
  },

  item: function( i ){
    var offsetIndex = i - this.get('currentOffset'),
        item = this._items[offsetIndex];

    if (!item && i < this.get('length')) {
      item = new this.model({ _fault:true });
      this.fire(EVT_FAULT, {faultedIndex: i});
    }

    return item;
  },

  // Stub. 
  _defFaultFn: function(event){}

});


}, '@VERSION@' ,{requires:['model-list']});
