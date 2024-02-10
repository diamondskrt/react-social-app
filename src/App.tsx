import './global.css'
import { Routes, Route } from "react-router-dom";
import SignIn from '@/_auth/pages/SignIn'
import SignUp from "@/_auth/pages/SignUp";
import Home from "@/_root/pages/Home";
import AuthLayout from "@/_auth/AuthLayout";
import RootLayout from "@/_root/RootLayout";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
      <main className="h-screen">
        <Routes>        
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>

        <Toaster richColors />
      </main>
  )
}

export default App