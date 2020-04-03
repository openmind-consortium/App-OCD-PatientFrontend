import Component from '@ember/component';
const {ipcRenderer} = window.requireNode('electron');
import { later } from '@ember/runloop';

export default Component.extend({
    launched: false,
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
            case 'provocation':
              taskPath = 'provocation\\provocation.exe'
            default:
              console.log('Wrong task name selected.')
          }
          ipcRenderer.send('taskSpawn', {taskPath})
          this.set('launched', true)
          later(this, function() {
            this.set('launched', false)
          }, 3000);
        }
      }
});
