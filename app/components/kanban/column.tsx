import { Droppable } from 'react-beautiful-dnd'
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
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <h2 className='uppercase text-gray-600 font-medium'>{title}</h2>
            <div className='mt-6'>
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
