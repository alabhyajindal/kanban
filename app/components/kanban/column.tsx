import { Droppable } from '@hello-pangea/dnd'
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
      <h2 className='uppercase text-gray-600 dark:text-gray-300 font-medium'>
        {title}
      </h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className='w-96 min-h-96 mt-6 p-2 rounded-md'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {tasks?.map((task, index) => (
                <div key={task.id}>
                  <Task task={task} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}
