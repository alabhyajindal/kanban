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
          ? 'bg-slate-200 text-slate-900'
          : 'bg-white text-slate-600'
      } flex justify-between items-center cursor-pointer py-2 mt-2 px-2 rounded-md`}
    >
      <div className='flex gap-2 items-center'>
        {item.icon}
        <h3 className='font-semibold text-sm'>{item.title}</h3>
      </div>
      {item.count ? (
        <div
          className={`${
            item.isActive ? 'bg-black text-white' : 'bg-slate-200'
          } px-2 py-1 rounded-md text-xs font-semibold`}
        >
          {item.count}
        </div>
      ) : null}
    </div>
  )
}
