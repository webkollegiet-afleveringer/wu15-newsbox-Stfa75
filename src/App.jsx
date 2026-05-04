import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/home'
import Archive from "./Views/archive"
import Popular from './Views/popular'
import Settings from "./Views/settings"

export default function App() {

  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/setings" element={<Settings />} />

      </Routes>
    </BrowserRouter>

  )
}