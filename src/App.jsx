
import './App.css'
import { AppRouter } from './mvp/presenters/AppRouter'


function App() {
  return (
    <div className="app-shell">
      <main className="app-content">
      <AppRouter/>
      </main>
    </div>
  )
}

export default App
