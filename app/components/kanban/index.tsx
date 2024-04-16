import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { loader } from '~/routes/_index'
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd'

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
  const [done, setDone] = useState(null)
  const [todo, setTodo] = useState(null)

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

  return (
    <div className='bg-gray-200 flex-1'>
      <section className='mt-24 mx-4 flex justify-around'>
        <DragDropContext
          onDragEnd={() => {
            console.log('drag end')
          }}
        >
          <Column title='To do' tasks={todo} />
          <Column title='Done' tasks={done} />
        </DragDropContext>
      </section>
    </div>
  )
}
