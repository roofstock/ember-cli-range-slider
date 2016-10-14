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
            min = this.get('min'),
            max = this.get('max'),
            options = {
                to: 10,
                from: 100,
                to_min: 10,
                from_min: 10,
                to_max: 100,
                from_max: 100,
                onChange: Ember.run.bind(this, '_onSlideStart'),
                onFinish: Ember.run.bind(this, '_onSlideStop'),
            };

        if (fromValue || fromValue === 0) {
            options.from = fromValue;
        }
        if (toValue || toValue === 0) {
            options.to = toValue;
        }
        if (min || min === 0) {
            options.to_min = min;
            options.from_min = min;
        }
        if (max || max === 0) {
            options.to_max = max;
            options.from_max = max;
        }
            
        merge(options, this.get('ionReadOnlyOptions'));
        return options;
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
    },
    
    _onSlideStop: function(changes){
        var args = [changes.from, changes.to];
        this.sendAction('slideStop', args);
    },
});