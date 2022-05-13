import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle.length !== 0){

      let idRandom = 0;
      let arrayIds: number[] = [];

      tasks.forEach(task => {
        arrayIds.push(task.id)
      })

      do {
        idRandom = Math.floor(Math.random() * (999999 - 1) + 1)
      } while ( arrayIds.includes(idRandom)) 

      const task = {
        id: idRandom,
        title: newTaskTitle,
        isComplete: false,
      }

      setTasks([... tasks, task])
      console.log("Tarefa adicionada!")
    } else {
      console.error("Tarefa sem título")
    }   
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        
        let taskChanged = {
          id: tasks[i].id,
          title: tasks[i].title,
          isComplete: !tasks[i].isComplete,
        }

        if(i === 0){
          setTasks([taskChanged, ...tasks.slice(1)])
        }else{
          setTasks([...tasks.slice(0, i), taskChanged, ...tasks.slice(i+1)])

        }
        console.log("Status tarefa alterado")  
      }
    }


  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        
        
        if(i === 0){
          setTasks([...tasks.slice(1)])
        }else{
          setTasks([...tasks.slice(0, i), ...tasks.slice(i+1)])
        }
        console.log("tarefa removida")  
      }
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}