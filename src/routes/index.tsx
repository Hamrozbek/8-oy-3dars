import { Route, Routes } from "react-router-dom"
import { Create, Home, More } from "../pages"

const PageRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/student/:id" element={<More/>}/>
        <Route path="/create/:id" element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default PageRoute
