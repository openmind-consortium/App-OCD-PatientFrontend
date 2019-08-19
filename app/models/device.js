import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  battery: DS.attr(),
  recording: DS.attr(),
  stimulation: DS.attr()
});
