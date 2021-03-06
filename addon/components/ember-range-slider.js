import Ember from 'ember';

const { merge } = Ember;

export default Ember.Component.extend({

    defaultOptions : {
        type               : 'single',
        values             : [],
        step               : 1,
        min_interval       : null,
        max_interval       : null,
        drag_interval      : false,

        from_fixed         : false,
        from_shadow        : false,
        to_fixed           : false,
        to_shadow          : false,

        prettify_enabled   : true,
        prettify_separator : ' ',
        prettify           : null,

        force_edges        : false,
        keyboard           : false,
        keyboard_step      : 5,

        grid               : false,
        grid_margin        : true,
        grid_num           : 4,
        grid_snap          : false,
        hide_min_max       : false,
        hide_from_to       : false,

        prefix             : '',
        postfix            : '',
        max_postfix        : '',
        decorate_both      : true,
        values_separator   : ' - ',
        disabled           : false
    },

    tagName: 'input',
    classNames: ['ember-range-slider'],
    type: 'single', 
    _slider: null,

    ionReadOnlyOptions: Ember.computed(function(){
        var ionOptions = {};
        var ionProperties = this.get('defaultOptions');
        for (var pName in ionProperties){
            ionOptions[pName] = this.getWithDefault(pName, ionProperties[pName]);
        }
        return ionOptions;
    }),

    sliderOptions: Ember.computed(function(){
        //## Update trigger: change|finish
        var toValue = this.get('to'),
            fromValue = this.get('from'),
            minValue = this.get('min'),
            maxValue = this.get('max'),
            options = {
                to: 10,
                from: 100,
                min: 10,
                max: 100,
                to_min : 10,
                to_max : 100,
                from_min : 10,
                from_max : 100,
                onChange: Ember.run.bind(this, '_onSlideStart'),
                onFinish: Ember.run.bind(this, '_onSlideStop'),
            };

        if (fromValue || fromValue === 0) {
            options.from = fromValue;
        }
        if (toValue || toValue === 0) {
            options.to = toValue;
        }
        if (minValue || minValue === 0) {
            options.min = minValue;
            options.to_min = minValue;
            options.from_min = minValue;
        }
        if (maxValue || maxValue === 0) {
            options.max = maxValue;
            options.to_max = maxValue;
            options.from_max = maxValue;
        }

        merge(options, this.get('ionReadOnlyOptions'));
        return options;
    }),

    _onSliderValuesChanged: Ember.observer('to', 'from', function(){
      var propName = arguments[1];

      if(this._slider && !this._slider.is_active){
        this._slider.update(this.getProperties(propName));
        this._syncLabelValues({
            from: this._slider.options.from,
            to: this._slider.options.to
        });
      }
    }),

      //## Setup/destroy
    didInsertElement(){
        var options = this.get('sliderOptions');
        this.$().ionRangeSlider(options);
        this._slider = this.$().data('ionRangeSlider');
    },

    willDestroyElement(){
        this._slider.destroy();
    },

    _onSlideStart: function(changes){
        var args = [changes.from, changes.to ];
        this.sendAction('slideStart', args);
        this.sendAction('syncLabels', args);  
    },
    
    _onSlideStop: function(changes){
        var args = [changes.from, changes.to];
        this.sendAction('slideStop', args);
        this.sendAction('syncLabels', args);  
    },

    _syncLabelValues: function(changes) {
        var args = [changes.from, changes.to];
        this.sendAction('syncLabels', args);        
    }
});