import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { loader } from '~/routes/_index'
import Column from './column'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'
import { nanoid } from 'nanoid'

export interface TaskProps {
  id: number
  todo: string
  completed: boolean
  userId: number
}

interface DataProps {
  todos: TaskProps[]
  total: number
  skip: number
  limit: number
}

export default function Kanban() {
  // const data: DataProps = useLoaderData<typeof loader>()
  // console.log(data)

  const [data, setData] = useState()
  const [todo, setTodo] = useState<TaskProps[]>([])
  const [done, setDone] = useState<TaskProps[]>([])

  function addMissingData(data) {
    data.todos = data.todos.map((t) => ({
      ...t,
      dateCreated: '12th Jan',
      author: 'Prahlad',
      commentsCount: 3,
    }))
    // First
    data.todos[0].author = 'Prahlad'
    data.todos[0].tags = [
      { title: 'Design', color: 'gray' },
      { title: 'Development', color: 'green' },
    ]
    data.todos[0].links = ['docs.google.com', 'main.psd']
    data.todos[0].cover = 'cake.jpg'
    data.todos[0].body =
      'Look up the chocolate cake recipe sent by Ankita and begin a draft.'
    data.todos[0].commentProfiles = ['comment.jpg', 'comment-1.jpg']

    // Second
    data.todos[1].commentProfiles = ['comment.jpg']
    data.todos[1].links = ['main.psd']

    // Third
    data.todos[2].commentProfiles = ['comment.jpg', 'comment-1.jpg']

    // Fourth
    data.todos[3].commentProfiles = ['comment-1.jpg']
    data.todos[3].links = ['dribbble.com', 'main.psd']

    // Fifth
    data.todos[4].commentProfiles = ['comment.jpg', 'comment-1.jpg']

    return data
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch('data.json')
      let data = await res.json()
      data = addMissingData(data)
      console.log(data)
      setData(data)
      setDone(data.todos.filter((d) => d.completed))
      setTodo(data?.todos.filter((d) => !d.completed))
    }

    getData()
  }, [])

  useEffect(() => {
    setDone(data?.todos.filter((d) => d.completed))
    setTodo(data?.todos.filter((d) => !d.completed))
  }, [data])

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

  async function updateTask(task: TaskProps) {
    // Using static id because newly added todos are not persisted
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

  async function addTask(todo: string, completed: boolean) {
    const res = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo,
        completed,
        userId: 22,
      }),
    })
    const result = await res.json()
    if (result) {
      const newTodo = { ...result, id: nanoid() }
      const todos = [newTodo, ...data.todos]
      setData((d) => ({ ...d, todos }))
    }
  }

  async function deleteTask(task: TaskProps) {
    // Using static id for deletion because newly added todos are not persisted
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
