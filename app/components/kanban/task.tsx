import { TaskProps } from '.'

export default function Task({ task }: { task: TaskProps }) {
  return (
    <div>
      <p>{task.todo}</p>
    </div>
  )
}
