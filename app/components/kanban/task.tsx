import { Draggable } from '@hello-pangea/dnd'
import { TaskProps } from '.'

export default function Task({
  task,
  index,
}: {
  task: TaskProps
  index: number
}) {
  return (
    <div>
      <Draggable index={index} draggableId={task.id.toString()}>
        {(provided) => (
          <div
            className='bg-white dark:bg-slate-800 rounded-md p-4 mt-4 border border-gray-300 dark:border-gray-700'
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <p className='text-gray-800 dark:text-gray-300'>{task.todo}</p>
          </div>
        )}
      </Draggable>
    </div>
  )
}
