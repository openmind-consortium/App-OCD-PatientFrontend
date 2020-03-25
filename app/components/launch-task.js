import Component from '@ember/component';
const {ipcRenderer} = window.requireNode('electron');

export default Component.extend({
    actions: {
        launchTasks(taskName) {
          console.log('launch beads clicked')
          ipcRenderer.send('taskSpawn', {task: taskName})
        }
      }
});
