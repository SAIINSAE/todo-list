import { ProjectCollection } from "./projectcollection";
import { viewTask } from "./viewtask";
import { taskManager } from "./taskmanager";
import { displayContent } from "./displayproject";


export function activateTaskButtons() {
  const tasks = document.querySelectorAll("button.task");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].className !== 'view-button' || tasks[i].className !== 'delete-task') {
      tasks[i].addEventListener('click', crossOut);
      const viewButton = tasks[i].querySelector('.view-button');
      viewButton.addEventListener('click', viewTask);
      const deleteButton = tasks[i].querySelector('.delete-task');
      deleteButton.addEventListener('click', deleteTask);
    }

  }

}

function deleteTask(e) {
  let target = e.target;
  let taskId = target.closest('.task').className.split(' ')[1];
  let projectId = target.closest('.display-project-container').className.split(' ')[1];
  let displayType = document.querySelector('.workspace');
  displayType = displayType.className.split(' ')[1];

  taskManager.deleteTask(parseInt(projectId), parseInt(taskId));


  if (!displayType) {
    console.log('displaying project')
    displayContent.project(projectId);
  } else if (displayType === 'today') {
    displayContent.today();
  } else if (displayType === 'all') {
    displayContent.all();
  } else if (displayType === 'important') {
    displayContent.important();
  }

}


function crossOut(e) {
  let target = e.target;
  if (target.tagName === 'BUTTON') {
  } else {
    target = target.closest('button');
  }
  if (target.className === 'view-button' || target.className === 'delete-task') {
    return;
  }

  let projectId = target.closest('div.display-project-container');
  projectId = projectId.className.split(" ")[1];
  let taskId = target.className.split(" ")[1];

  let project, task;
  for (let i = 0; i < ProjectCollection.projects.length; i++) {
    if (ProjectCollection.projects[i].id == projectId) {
      project = ProjectCollection.projects[i];
      console.log(project);
      for (let j = 0; j < project.tasks.length; j++) {
        console.log('Checking task:', j, project.tasks[j].id, '===', taskId);
        if (project.tasks[j].id == taskId){
          task = project.tasks[j];
          console.log(task);
        }
      }
    }
  }

  if (!target.className.split(" ")[2]) {
    target.classList.add('done');
    task.status = "done";
  } else {
    target.classList.remove('done');
    task.status = "active";
  }


}