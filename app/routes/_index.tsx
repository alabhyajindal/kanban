import type { MetaFunction } from '@remix-run/node'
import Sidebar from '~/components/sidebar/index'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='bg-gray-200 flex-1'>main</main>
    </div>
  )
}
