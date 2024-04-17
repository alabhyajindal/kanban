import { Draggable } from '@hello-pangea/dnd'
import { TaskProps } from '.'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

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
            <div>
              <h3 className='text-gray-800 font-medium dark:text-gray-300'>
                {task.todo}
              </h3>

              <div className='flex gap-2 text-sm text-gray-500 mt-2'>
                <span>{task.dateCreated}</span>
                <span className='text-gray-400'>&bull;</span>
                <span>
                  Created by{' '}
                  <span className='font-semibold'>{task.author}</span>
                </span>
              </div>

              <div className='text-gray-500 mt-6 text-sm'>
                <p>{task.body}</p>
                {task.cover ? (
                  <img
                    className='rounded-md h-24 w-full object-cover mt-4'
                    src={task.cover}
                    alt='Chocolate cake'
                  />
                ) : null}
                <div className='flex gap-4 mt-4'>
                  {task.links
                    ? task.links.map((link, i) => (
                        <div className='flex gap-2 items-center' key={i}>
                          <LinkIcon className='h-4 w-4' />
                          <p>{link}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className='mt-4 text-gray-500 flex gap-2 items-center'>
                <ChatBubbleOvalLeftEllipsisIcon className='h-6 w-6' />
                <span className='text-sm'>{task.commentsCount}</span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}
