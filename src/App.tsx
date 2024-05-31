import { ThemeProvider } from "@/components/ui/Darkmode/theme-provider";
import { Toaster } from "@/components/ui/sonner"

import Home from "./components/Home"

function App() {

  return (
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen p-2">
          <Home/>
      </div>
      <Toaster />
   </ThemeProvider>
  )
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { ThemeProvider } from "@/components/ui/Darkmode/theme-provider";
// import { Toaster } from "@/components/ui/sonner"

// import Home from "./components/Home"
// import Welcome from "./components/Welcome"

// function App() {

//   return (
//    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <div className="h-screen p-2">
//         <BrowserRouter >
//           <Routes>
//             <Route index element={<Welcome />} />
//             <Route path="home" index element={<Home />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//       <Toaster />
//    </ThemeProvider>
//   )
// }

// export default App;