import { Droppable } from '@hello-pangea/dnd'
import { TaskProps } from '.'
import Task from './task'
import { useState } from 'react'

export default function Column({
  tasks,
  title,
  deleteTask,
  addTask,
}: {
  tasks: TaskProps[]
  title: string
}) {
  const [inputValue, setInputValue] = useState('')

  function handleTaskAdd() {
    if (inputValue === '') return
    addTask(inputValue, false)
    setInputValue('')
  }

  function handleKeyDown(e) {
    if (e.key == 'Enter') handleTaskAdd()
  }

  return (
    <div>
      <h2 className='uppercase text-gray-600 dark:text-gray-300 font-semibold text-sm'>
        {title}
      </h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className='w-96 min-h-96 mt-4 rounded-md'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {title === 'To do' ? (
                <div className='flex'>
                  <input
                    placeholder='Add a task'
                    autoComplete='off'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='flex-1 py-2 px-2 text-sm font-medium rounded-md border border-gray-300'
                    type='text'
                  />
                </div>
              ) : null}
              {tasks?.map((task, index) => (
                <div key={task.id}>
                  <Task deleteTask={deleteTask} task={task} index={index} />
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
