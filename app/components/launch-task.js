import Component from '@ember/component';
const {ipcRenderer} = window.requireNode('electron');

export default Component.extend({
    actions: {
        launchTasks(taskName) {
          let taskPath;
          if (taskName === 'beads') {
            taskPath = 'beads\\beads.exe'
          }
          if (taskName === 'resting') {
            taskPath = 'resting_state\\resting-state.exe'
          }
          if (taskName === 'msit') {
            taskPath = 'task_msit\\task-msit.exe'
          }
          ipcRenderer.send('taskSpawn', {taskPath})
        }
      }
});
