import { Draggable } from '@hello-pangea/dnd'
import { DeleteTaskProp } from '.'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  LinkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { TaskProps } from '~/routes/_index'

export default function Task({
  task,
  index,
  deleteTask,
}: {
  task: TaskProps
  index: number
  deleteTask: DeleteTaskProp
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
            <div className='text-gray-500 dark:text-gray-400'>
              <div className='flex justify-between items-center'>
                <h3 className='text-gray-800 font-medium dark:text-gray-100'>
                  {task.todo}
                </h3>
                <XMarkIcon
                  onClick={() => deleteTask(task)}
                  className='h-5 w-5 cursor-pointer hover:text-black dark:hover:text-white'
                />
              </div>

              {task.dateCreated && task.author ? (
                <div className='flex gap-2 text-sm mt-2'>
                  <span>{task.dateCreated}</span>
                  <span className='text-gray-400'>&bull;</span>
                  <span>
                    Created by{' '}
                    <span className='font-semibold'>{task.author}</span>
                  </span>
                </div>
              ) : null}

              {task.body ? <p className='mt-4 text-sm'>{task.body}</p> : null}

              {task.cover ? (
                <img
                  className='rounded-md h-24 w-full object-cover mt-4'
                  src={task.cover}
                  alt='Chocolate cake'
                />
              ) : null}

              {task.links ? (
                <div className='flex gap-4 mt-4 '>
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
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            : 'bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-200'
                        }`}
                      >
                        {tag.title}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {task.commentProfiles && task.commentsCount ? (
                <div className='mt-4 flex justify-between items-center'>
                  <div className='flex gap-1'>
                    <ChatBubbleOvalLeftEllipsisIcon className='h-4 w-4' />
                    <span className='text-xs font-medium'>
                      {task.commentsCount}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    {task.commentProfiles.map((c, i) => (
                      <div key={i}>
                        <img
                          className='h-6 w-6 rounded-full'
                          src={c}
                          alt='Author profile'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}
