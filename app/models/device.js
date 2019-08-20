import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  battery: DS.attr('float'),
  recording: DS.attr('boolean'),
  stimulation: DS.attr('boolean')
});
