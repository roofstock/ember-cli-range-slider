# Ember-cli-range-slider

A different ember-cli addon for the ion.rangeslider jquery component. 
This also takes a bit from the ember-cli-ion-rangeslider addon and provides 
a data-down action-up implementation.

## Installation

ember install ember-cli-range-slider

## Running
```htmlbars
  {{ember-range-slider
    type='double'
    to=toAmount
    from=fromAmount
    min=minAmount
    max=maxAmount
    step=stepValue // ex: 10, 100, 500
    slideStart=(action 'slideStart')
    slideStop=(action 'slideStop')
  }}
```

The slideStart and slideStop events actions bubble up the to/from values as an array. From there, you can do what you please.


## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

