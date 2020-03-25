import Component from '@ember/component';
const {ipcRenderer} = window.requireNode('electron');

export default Component.extend({
    actions: {
        launchTasks(taskName) {
          let taskPath;
          switch(taskName) {
            case 'beads':
              taskPath = 'beads\\beads.exe'
              break;
            case 'resting':
              taskPath = 'resting_state\\resting-state.exe'
              break;
            case 'msit':
              taskPath = 'task_msit\\task-msit.exe'
              break;
            default:
              console.log('Wrong task name selected.')
          }
          ipcRenderer.send('taskSpawn', {taskPath})
        }
      }
});
