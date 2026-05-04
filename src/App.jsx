import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/home'
import Archive from "./Views/archive"

export default function App() {

  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Archive />} />

      </Routes>
    </BrowserRouter>

  )
}