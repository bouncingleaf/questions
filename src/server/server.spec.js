import { addNewTask, updateTask } from './server';

(async () => {
  await addNewTask({
    name: "my task",
    id: "12346"
  });

  await updateTask({
    name: "my task is UPDATED!",
    id: "12346"
  });
})();
