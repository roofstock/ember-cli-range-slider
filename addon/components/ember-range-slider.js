import Ember from 'ember';

var ionProperties = {
    type               : 'single',
    values             : [],
    min                : 10,
    max                : 100,
    step               : 1,
    min_interval       : null,
    max_interval       : null,
    drag_interval      : false,

    from_fixed         : false,
    from_min           : 10,
    from_max           : 100,
    from_shadow        : false,
    to_fixed           : false,
    to_min             : 10,
    to_max             : 100,
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
};

const { merge, computed } = Ember;

export default Ember.Component.extend({

    tagName: 'input',
    classNames: ['ember-range-slider'],
    type: 'single', 
    _slider: null,

    ionReadOnlyOptions: computed(function(){
        var ionOptions = {};
        for (var pName in ionProperties){
            ionOptions[pName] = this.getWithDefault(pName, ionProperties[pName]);
        }
        return ionOptions;
    }).readOnly(),

    sliderOptions: computed.readOnly(function(){
        //## Update trigger: change|finish
        var toValue = this.get('to'),
            fromValue = this.get('from'),
            options = {
                to: 10,
                from: 100,
                to_min: this.get('min'),
                from_min: this.get('min'),
                to_max: this.get('max'),
                from_max: this.get('max'),
                onChange: Ember.run.bind(this, '_onSlideStart'),
                onFinish: Ember.run.bind(this, '_onSlideStop'),
            };

        if (fromValue || fromValue === 0) {
            options.from = fromValue;
        }
        if (toValue || toValue === 0) {
            options.to = toValue;
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
        this.setProperties({'to': changes.to, 'from': changes.from});
        var args = [changes.from, changes.to ];
        this.sendAction('slideStart', args);
    },
    
    _onSlideStop: function(changes){
        this.setProperties({'to': changes.to, 'from': changes.from});
        var args = [changes.from, changes.to];
        this.sendAction('slideStop', args);
    },
});