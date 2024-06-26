import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { DataProps, TaskProps, loader } from '~/routes/_index'
import Column from './column'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { nanoid } from 'nanoid'

interface UpdateTaskProp {
  (task: TaskProps): Promise<void>
}

export interface AddTaskProp {
  (todo: string): Promise<void>
}

export interface DeleteTaskProp {
  (task: TaskProps): Promise<void>
}

export default function Kanban() {
  const init: DataProps = useLoaderData<typeof loader>()

  const [data, setData] = useState(init)
  const [todo, setTodo] = useState<TaskProps[]>([])
  const [done, setDone] = useState<TaskProps[]>([])

  useEffect(() => {
    setDone(data?.todos.filter((d) => d.completed))
    setTodo(data?.todos.filter((d) => !d.completed))
  }, [data])

  /**
   * Synchronous function to modify client side state for droppable items. Notice that the function which updates server state is called without the await keyword. See: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md#ondragend-required
   */
  function handleDragEnd(result: DropResult) {
    const { source, destination } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = source.droppableId === 'To do' ? todo : done
    const destinationColumn = destination.droppableId === 'To do' ? todo : done

    if (sourceColumn === destinationColumn) {
      // Moving within the same list
      const newTasks = Array.from(sourceColumn)
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)
      if (sourceColumn === todo) {
        setTodo(newTasks)
        setData((d) => ({ ...d, todos: [...done, ...newTasks] }))
      } else {
        setDone(newTasks)
        setData((d) => ({ ...d, todos: [...todo, ...newTasks] }))
      }

      updateTask(removed)
    } else {
      // Moving from one list to another
      const startTasks = Array.from(sourceColumn)
      const finishTasks = Array.from(destinationColumn)
      const [removed] = startTasks.splice(source.index, 1)

      finishTasks.splice(destination.index, 0, {
        ...removed,
        completed: destination.droppableId === 'Done',
      })

      if (sourceColumn === todo) {
        setTodo(startTasks)
        setDone(finishTasks)
      } else {
        setDone(startTasks)
        setTodo(finishTasks)
      }

      setData((d) => ({ ...d, todos: [...startTasks, ...finishTasks] }))
      updateTask(removed)
    }
  }

  /**
   * Update a task
   * Uses static id for the request because user created todos are not persisted and updating them will fail the request
   */
  const updateTask: UpdateTaskProp = async (task) => {
    const res = await fetch('https://dummyjson.com/todos/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task,
      }),
    })
    const data = await res.json()
    console.log(data)
  }

  /**
   * Addd a task
   */
  const addTask: AddTaskProp = async (todo) => {
    const res = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo,
        completed: false,
        userId: 22,
      }),
    })
    const result = await res.json()
    if (result) {
      const newTodo = {
        ...result,
        id: nanoid(),
        author: 'Alabhya',
        dateCreated: '18 Apr',
      }
      const todos = [newTodo, ...data.todos]
      setData((d) => ({ ...d, todos }))
    }
  }

  /**
   * Delete a task
   * Uses static id for the request because user created todos are not persisted and deleting them will fail the request
   */
  const deleteTask: DeleteTaskProp = async (task) => {
    const res = await fetch(`https://dummyjson.com/todos/1`, {
      method: 'DELETE',
    })
    const result = await res.json()
    console.log(result)
    if (result.isDeleted) {
      const todos = data.todos.filter((d) => d.id !== task.id)
      setData((d) => ({ ...d, todos }))
    }
  }

  return (
    <div className='bg-gray-200 dark:bg-slate-700 text-slate-900 flex-1 overflow-y-scroll'>
      <section className='my-4 mx-4 flex justify-around'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Column
            deleteTask={deleteTask}
            addTask={addTask}
            title='To do'
            tasks={todo}
          />
          <Column
            deleteTask={deleteTask}
            addTask={addTask}
            title='Done'
            tasks={done}
          />
        </DragDropContext>
      </section>
    </div>
  )
}
