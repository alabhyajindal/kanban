import { TaskProps } from '.'
import Task from './task'

export default function Column({
  tasks,
  title,
}: {
  tasks: TaskProps[]
  title: string
}) {
  return (
    <div>
      <h2 className='uppercase text-gray-600 font-medium'>{title}</h2>
      <div className='mt-6'>
        {tasks?.map((task) => (
          <div key={task.id}>
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  )
}
