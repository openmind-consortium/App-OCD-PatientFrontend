import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      isDark: true,
      userName: 'Fer',
      fontSize: 1
    };
  }
});

export default Storage;
