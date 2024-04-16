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

  useEffect(() => {
    async function getData() {
      const res = await fetch('data.json')
      const data = await res.json()
      setData(data)
      setDone(data.todos.filter((d) => d.completed))
      setTodo(data?.todos.filter((d) => !d.completed))
    }

    getData()
  }, [])

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result
    if (!destination) {
      return
    }

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

      if (source.droppableId === 'To do') {
        setTodo(newTasks)
      } else {
        setDone(newTasks)
      }
    } else {
      // Moving from one list to another
      const startTasks = Array.from(sourceColumn)
      const finishTasks = Array.from(destinationColumn)
      const [removed] = startTasks.splice(source.index, 1)

      finishTasks.splice(destination.index, 0, {
        ...removed,
        completed: destination.droppableId === 'Done',
      })

      if (source.droppableId === 'To do') {
        setTodo(startTasks)
        setDone(finishTasks)
      } else {
        setDone(startTasks)
        setTodo(finishTasks)
      }
    }
  }

  return (
    <div className='bg-gray-200 text-slate-900 flex-1'>
      <section className='mt-16 mx-4 flex justify-around'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Column title='To do' tasks={todo} />
          <Column title='Done' tasks={done} />
        </DragDropContext>
      </section>
    </div>
  )
}
