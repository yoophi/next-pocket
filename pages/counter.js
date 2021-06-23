import { Counter } from '../features/counter/Counter.js'
import WithNavigation from '../shared/layouts/WithNavigation'

export default function Home() {
  return (
    <WithNavigation>
      <Counter />
    </WithNavigation>
  )
}
