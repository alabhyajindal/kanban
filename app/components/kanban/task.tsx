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

              {task.body ? (
                <p className='text-gray-500 mt-4 text-sm'>{task.body}</p>
              ) : null}

              {task.cover ? (
                <img
                  className='rounded-md h-24 w-full object-cover mt-4'
                  src={task.cover}
                  alt='Chocolate cake'
                />
              ) : null}

              {task.links ? (
                <div className='flex gap-4 mt-4 text-gray-500'>
                  {task.links.map((link, i) => (
                    <div className='flex gap-2 items-center text-sm' key={i}>
                      <LinkIcon className='h-4 w-4' />
                      <p>{link}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {task.tags ? (
                <div className='flex gap-4 mt-4'>
                  {task.tags.map((tag, i) => (
                    <div key={i}>
                      <div
                        className={`px-2 py-1 rounded-sm font-medium text-xs ${
                          tag.color === 'gray'
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-green-200 text-green-700'
                        }`}
                      >
                        {tag.title}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className='mt-6 text-gray-500 flex gap-1 items-center'>
                <ChatBubbleOvalLeftEllipsisIcon className='h-4 w-4' />
                <span className='text-xs font-medium'>
                  {task.commentsCount}
                </span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}
