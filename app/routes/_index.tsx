import type { MetaFunction } from '@remix-run/node'
import Kanban from '~/components/kanban'
import Sidebar from '~/components/sidebar/index'
import { json } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Kanban' }]
}

function modifyData(data) {
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
  data.todos[1].completed = true
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

export const loader = async () => {
  const res = await fetch('https://dummyjson.com/todos/user/1')
  let data = await res.json()
  data = modifyData(data)
  return json(data)
}

export default function Index() {
  return (
    <div className='flex max-h-screen overflow-hidden'>
      <Sidebar />
      <Kanban />
    </div>
  )
}
