import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Gallery from './pages/Gallery'
import About from './pages/About'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="hakkimda" element={<About />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
