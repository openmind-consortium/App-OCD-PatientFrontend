import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  patient_name: DS.attr('string'),
  battery: DS.attr('number'),
  recording: DS.attr('boolean'),
  stimulation: DS.attr('boolean')
});
