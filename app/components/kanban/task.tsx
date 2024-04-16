import { Task } from './column'

export default function Task({ task }: { task: Task }) {
  return (
    <div>
      <p>{task.todo}</p>
    </div>
  )
}
