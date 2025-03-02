import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import AnotherSamp from "./components/AnotherSamp"
import EditUserData from "./components/EditUserData"
import ReadUserData from "./components/ReadUserData"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<AnotherSamp/>}/>
        <Route path="/edit" element={<EditUserData/>}/>
        <Route path="/read" element={<ReadUserData/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
