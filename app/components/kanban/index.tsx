import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { loader } from '~/routes/_index'
import Column from './column'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

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
    data.todos[0].tags = ['Design', 'Development']
    data.todos[0].links = ['docs.google.com', 'main.psd']
    data.todos[0].cover = 'cake.jpg'
    data.todos[0].body =
      'Look up the chocolate cake recipe sent by Ankita and begin a draft.'

    // Second

    // Third

    // Fourth

    // Fifth

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

      if (sourceColumn === todo) setTodo(newTasks)
      else setDone(newTasks)
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
    }
  }

  return (
    <div className='bg-gray-200 dark:bg-slate-700 text-slate-900 flex-1'>
      <section className='mt-16 mx-4 flex justify-around'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Column title='To do' tasks={todo} />
          <Column title='Done' tasks={done} />
        </DragDropContext>
      </section>
    </div>
  )
}
