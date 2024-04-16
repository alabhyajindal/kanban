import { ChevronDownIcon } from '@heroicons/react/24/solid'
import {
  Squares2X2Icon,
  BellIcon,
  ChartBarSquareIcon,
  UserIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline'
import ListItem from './ListItem'

const ITEMS = [
  {
    title: 'Tasks',
    icon: <Squares2X2Icon className='h-6 w-6' />,
    count: 4,
    isActive: true,
  },
  {
    title: 'Notifications',
    icon: <BellIcon className='h-6 w-6' />,
    count: 7,
    isActive: false,
  },
  {
    title: 'Analytics',
    icon: <ChartBarSquareIcon className='h-6 w-6' />,
    count: 0,
    isActive: false,
  },
  {
    title: 'Team',
    icon: <UserIcon className='h-6 w-6' />,
    count: 2,
    isActive: false,
  },
]

const SETTINGS_ITEM = {
  title: 'Settings',
  icon: <Cog8ToothIcon className='h-6 w-6' />,
  count: 0,
  isActive: false,
}

export default function Sidebar() {
  return (
    <aside className='bg-white dark:bg-slate-800 w-1/4 p-4 text-slate-600 dark:text-slate-300 flex flex-col justify-between'>
      <section>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex gap-2'>
            <div className='h-6 w-6 bg-black dark:bg-slate-200 rounded-sm'></div>
            <h2 className='font-medium text-sm text-slate-900 dark:text-slate-100'>
              Company
            </h2>
          </div>
          <ChevronDownIcon className='h-4 w-4 text-slate-600 dark:text-slate-400' />
        </div>
        <section className='mt-8'>
          {ITEMS.map((item, i) => (
            <div key={i}>
              <ListItem item={item} />
            </div>
          ))}
        </section>
      </section>

      <div>
        <ListItem item={SETTINGS_ITEM} />
      </div>
    </aside>
  )
}
