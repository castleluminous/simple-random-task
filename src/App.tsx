import { useEffect, useState } from 'react'
import './App.css'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Bubble, Button, Popup } from 'pixel-retroui';
import Confetti from 'react-confetti-boom';
// SETUP_DEFAULT_TASKS: for if you want to import tasks from the file :)
import DefaultTasks from "./Tasks.json";
import TaskInput from "./TaskInput.tsx";

type Task = {
  name: string;
  details: string;
  size: string[];
};

function App() {
  const initString = localStorage.getItem('tasks');
  const initTasks: Task[] = initString ? JSON.parse(initString) : [];
  // SETUP_DEFAULT_TASKS: if you'd like to populate tasks from the Tasks.json file, replace the below line with
  // const [tasks, setTasks] = useState<Task[]>(DefaultTasks);
  // selecting a task will save these to localstorage if, after importing those initial tasks, you want to 
  // switch the code back to default (and add/delete/edit tasks through the app)
  const [tasks, setTasks] = useState<Task[]>(initTasks.length > 0 ? initTasks : DefaultTasks);
  const [selectedTask, setSelectedTask] = useState<Task>({ name: "Need something to do?", details: "", size: [] });
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [selectedTaskSize, setSelectedTaskSize] = useState<String>("");
  const [editTask, setEditTask] = useState<Task>({ name: "", details: "", size: [] });
  const [editTaskIndex, setEditTaskIndex] = useState(0);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(0);
  const [addTask, setAddTask] = useState<Task>({ name: "", details: "", size: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCelebrationReady, setIsCelebrationReady] = useState(true);

  const openPopup = () => {
    if (selectedTask && selectedTask.name !== "Need something to do?") setIsPopupOpen(true);
  }
  const closePopup = () => { 
    setSelectedTask(tasks[selectedTaskIndex]);
    setIsPopupOpen(false); 
  }

  const openTaskList = () => { setIsTaskListOpen(true); }
  const closeTaskList = () => { setIsTaskListOpen(false); }

  const openEditTask = (task: Task, index: number) => {
    setEditTask(task);
    setEditTaskIndex(index);
    setIsEditTaskOpen(true);
  }
  const closeEditTask = () => { setIsEditTaskOpen(false); }

  const openDeleteTask = (index: number) => { 
    setDeleteTaskIndex(index);
    setIsDeleteTaskOpen(true); 
  }
  const closeDeleteTask = () => { setIsDeleteTaskOpen(false); }

  const openAddTask = () => { setIsAddTaskOpen(true); }
  const closeAddTask = () => { setIsAddTaskOpen(false); }

  function selectRandomTask() {
    const number = Math.floor(Math.random() * tasks.length);
    setSelectedTask(tasks[number]);
    setSelectedTaskIndex(number);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // kinda extra but useful for setup
  }

  function saveSelectedTask() {
    const newTasks = tasks.map((t, i) => {
      if (i === selectedTaskIndex) {
        return selectedTask;
      } else {
        return t;
      }
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function saveEditTask() {
    const newTasks = tasks.map((t, i) => {
      if (i === editTaskIndex) {
        return editTask;
      } else {
        return t;
      }
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function saveDeleteTask() {
    const newTasks = tasks.filter((_, i) => i !== deleteTaskIndex);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    window.location.reload()
  }

  function saveAddTask() {
    const newTasks = [...tasks, addTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setIsAddTaskOpen(false);
  }

  function celebrate() {
    setIsCelebrationReady(false);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setIsCelebrationReady(true);
    }, 4200);
  }

  useEffect(() => {
    if (selectedTask.size.length > 0) {
      setSelectedTaskSize(selectedTask.size[Math.floor(Math.random() * selectedTask.size.length)]);
    }
  }, [selectedTask]);

  return (
    <>
      <div className='spaced-div'><h1>hello, friend!</h1></div>
      <div className='spaced-div'></div>
      <Bubble direction="left" onClick={openPopup}>
        {selectedTask && selectedTask.name}
        <p></p>
        {selectedTask && selectedTaskSize}
      </Bubble>
      {selectedTask && (selectedTask.details || selectedTaskSize) &&
        <div>
          <Bubble direction="right">
            {selectedTask && selectedTask.details &&
              <p>Details: {selectedTask && selectedTask.details}</p>
            }
            {selectedTask && selectedTaskSize &&
              <p>(All sizes: {selectedTask && selectedTask.size.join(", ")})</p>
            }
          </Bubble>
        </div>
      }

      <div>
        <Button onClick={selectRandomTask}>
          Click here for a random task!
        </Button>
      </div>
      {(selectedTask && selectedTask.name !== "Need something to do?") ? <div className='spaced-div'>
        <Button disabled={!isCelebrationReady} onClick={celebrate}>
          I did it!
        </Button>
        {showConfetti && <Confetti/>}
      </div> : <div className='spaced-div'></div>}
      <div className='spaced-div'>
        <Button onClick={isTaskListOpen ? closeTaskList : openTaskList}>
          {isTaskListOpen ? "Hide" : "Show"} task list
        </Button>
      </div>
      <div>
        <p>I'm glad you're here! Just take things a step at a time :)</p>
      </div>

      {/* "secret" quick edit current task popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
      >
        <TaskInput titleString="your task:" selectedTask={selectedTask} selectedString={selectedTask.name} placeholder=''
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSelectedTask({ "name": e.target.value, "details": selectedTask.details, "size": selectedTask.size })}></TaskInput>

        <TaskInput titleString="details:" selectedTask={selectedTask} selectedString={selectedTask.details} placeholder='Enter details here...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSelectedTask({ "name": selectedTask.name, "details": e.target.value, "size": selectedTask.size })}></TaskInput>

        <TaskInput titleString="size options (comma-separated):" selectedTask={selectedTask} selectedString={selectedTask.size.join(", ")} placeholder='Enter size options here (ex. 1 paragraph, 1 page, 30 min)...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSelectedTask({ "name": selectedTask.name, "details": selectedTask.details, "size": e.target.value.split(", ") })}></TaskInput>

        <Button onClick={saveSelectedTask}>save</Button>
      </Popup>

      {/* task list edit task popup */}
      <Popup
        isOpen={isEditTaskOpen}
        onClose={closeEditTask}
      >
        <TaskInput titleString="your task:" selectedTask={editTask} selectedString={editTask.name} placeholder=''
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditTask({ "name": e.target.value, "details": editTask.details, "size": editTask.size })}></TaskInput>

        <TaskInput titleString="details:" selectedTask={editTask} selectedString={editTask.details} placeholder='Enter details here...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditTask({ "name": editTask.name, "details": e.target.value, "size": editTask.size })}></TaskInput>

        <TaskInput titleString="size options (comma-separated):" selectedTask={editTask} selectedString={editTask.size.join(", ")} placeholder='Enter size options here (ex. 1 paragraph, 1 page, 30 min)...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditTask({ "name": editTask.name, "details": editTask.details, "size": e.target.value.split(", ") })}></TaskInput>

        <Button onClick={saveEditTask}>save</Button>
      </Popup>

      {/* task list add task popup */}
      <Popup
        isOpen={isAddTaskOpen}
        onClose={closeAddTask}
      >
        <TaskInput titleString="your task:" selectedTask={addTask} selectedString={addTask.name} placeholder=''
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddTask({ "name": e.target.value, "details": addTask.details, "size": addTask.size })}></TaskInput>

        <TaskInput titleString="details:" selectedTask={addTask} selectedString={addTask.details} placeholder='Enter details here...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddTask({ "name": addTask.name, "details": e.target.value, "size": addTask.size })}></TaskInput>

        <TaskInput titleString="size options (comma-separated):" selectedTask={addTask} selectedString={addTask.size.join(", ")} placeholder='Enter size options here (ex. 1 paragraph, 1 page, 30 min)...'
          setFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddTask({ "name": addTask.name, "details": addTask.details, "size": e.target.value.split(", ") })}></TaskInput>

        <Button onClick={saveAddTask}>save</Button>
      </Popup>

      {/* delete task confirmation popup */}
      <Popup
        isOpen={isDeleteTaskOpen}
        onClose={closeDeleteTask}
      >
        Are you sure you want to delete?
        <div></div>(this will refresh the page)
        <div className='spaced-div'></div>
        <Button bg='#ba7068' onClick={saveDeleteTask}>Yes</Button>
      </Popup>

      {isTaskListOpen &&
        <>
          <div className='spaced-div'></div>
          ---
          <div className='spaced-div'>your tasks!</div>
          <div>
            <Accordion bg="#ddceb4"
              textColor="#30210b"
              borderColor="#30210b"
              shadowColor="#30210b">
              {tasks.map((task, index) =>
                <AccordionItem value={task.name}>
                  <AccordionTrigger>{task.name}</AccordionTrigger>
                  <AccordionContent>
                    details: {task.details}
                    <div></div>
                    size options: {task.size.join(", ")}
                    <div className='spaced-div'></div>
                    <Button bg='#f7f3ec' onClick={() => openEditTask(task, index)}>Edit</Button><Button bg='#ba7068' onClick={() => openDeleteTask(index)}>Delete</Button>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
          <Button onClick={openAddTask}>Add a task</Button>
        </>
      }
    </>
  )
}

export default App
