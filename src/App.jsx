import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Dashboard from "@/components/pages/Dashboard"
import Tickets from "@/components/pages/Tickets"
import TicketDetail from "@/components/pages/TicketDetail"
import Customers from "@/components/pages/Customers"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-16"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App