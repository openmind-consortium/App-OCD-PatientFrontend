import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  battery: DS.attr('number'),
  recording: DS.attr('boolean'),
  stimulation: DS.attr('boolean'),
  error: DS.attr('string'),
});
