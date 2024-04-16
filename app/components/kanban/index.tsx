import { useLoaderData } from '@remix-run/react'
import { s } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'
import { useEffect, useState } from 'react'
import { loader } from '~/routes/_index'

export default function Kanban() {
  // const data = useLoaderData<typeof loader>()
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

  console.log(done)

  return (
    <div className='bg-gray-200 flex-1'>
      <section className='mt-24 mx-4 flex justify-around'>
        <div>
          <h2 className='uppercase'>To do</h2>
          <div className='mt-6'>
            {done?.map((d, i) => (
              <div key={i}>
                <p>{d.todo}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='uppercase'>Done</h2>
          <div className='mt-6'>
            {todo?.map((t, i) => (
              <div key={i}>
                <p>{t.todo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
