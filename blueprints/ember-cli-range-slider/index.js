module.exports = {
  description: 'loads ion-range-slider dependencies',
  normalizeEntityName: function(){}, 

  afterInstall: function(){
    return this.addBowerPackageToProject('ionrangeslider', '^2.1.4');
  }
};