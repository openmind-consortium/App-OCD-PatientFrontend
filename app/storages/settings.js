import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      userName: 'Nicole',
      checked: true,
      isDark: false
    };
  }
});


export default Storage;
