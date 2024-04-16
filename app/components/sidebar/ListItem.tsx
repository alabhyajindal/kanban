import { ReactNode } from 'react'

interface ItemProps {
  title: string
  icon: ReactNode
  count: number
  isActive: boolean
}

export default function ListItem({ item }: { item: ItemProps }) {
  return (
    <div
      className={`${
        item.isActive
          ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100'
          : 'bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300'
      } flex justify-between items-center cursor-pointer py-2 mt-2 px-2 rounded-md transition-colors duration-300`}
    >
      <div className='flex gap-2 items-center'>
        {item.icon}
        <h3 className='font-semibold text-sm'>{item.title}</h3>
      </div>
      {item.count ? (
        <div
          className={`${
            item.isActive
              ? 'bg-black text-white dark:bg-slate-700 dark:text-slate-200'
              : 'bg-slate-200 text-black dark:bg-slate-700 dark:text-slate-300'
          } px-2 py-1 rounded-md text-xs font-semibold transition-colors duration-300`}
        >
          {item.count}
        </div>
      ) : null}
    </div>
  )
}
