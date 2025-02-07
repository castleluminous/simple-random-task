# simple-random-task
this app was built (for me) for all those repeatable small things you can't decide when to do.
- for non-urgent, unimportant tasks you don't want to regularly schedule in your day-to-day
- for tasks that repeat, and you're tired of writing them in your to-do list over and over again
- for projects when you don't want to create a dedicated tracker detailing every block of work
- for when you just want to be told which cool thing to do in the moment!

## usage
bring your own tasks :) if you want to input tasks with a json file rather than the app, follow the comments with SETUP_DEFAULT_TASKS: to see those tasks.

for each task, you can set the name, details, and different sizes of the task (do I want to do 1 page of reading, or 30 minutes?)- task size can be chosen for you, but you can always just pick the task size you're feeling up to :)

![sample-2](https://github.com/user-attachments/assets/bcce07f8-0f4d-436c-ae16-66f8d49dcbbc)

you can press the speech bubble with the randomly selected task to edit that specific task. Or, you can edit, add and delete tasks by opening the task list. The "add task" button is at the bottom of the task list.

![sample-1](https://github.com/user-attachments/assets/02159c59-5699-4bca-b457-aa839f335060)

the "i did it!" button just throws some confetti. that's all it does. use it!

tasks are saved via localstorage, so if you're using this online, beware of messing with cookies and such!

## to run locally:
npm run dev

## future work on this?
i don't plan on adding more big features to this because it's meant to be simple.
feel free to make your own fork if you want to implement changes/want to fix my code!
if you use this site online, i may be convinced to add the following:
- import and export tasks to file
- greeting and flavor text customizable (and saved to local storage)

## extra
this was made using 
- retro.ui: https://www.retroui.io
- react-confetti-boom: https://github.com/almond-bongbong/react-confetti-boom
- vite: https://vite.dev/
