import type { MetaFunction } from '@remix-run/node'
import Kanban from '~/components/kanban'
import Sidebar from '~/components/sidebar/index'
import { json } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Kanban' }]
}

export const loader = async () => {
  // const res = await fetch('https://dummyjson.com/todos/user/1')
  // const data = await res.json()
  // return json(data)
  return json({ ok: true })
}

export default function Index() {
  // const data = useLoaderData<typeof loader>()
  // console.log(data)

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <Kanban />
    </div>
  )
}
