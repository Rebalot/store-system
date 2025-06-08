import { useState } from "react"
import { X, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "react-bootstrap"
import { createPortal } from "react-dom"
const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  })

  const { login, register, isLoading, error } = useAuth()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.phone,
        )
      }

      if (result) {
        onClose()
        setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "" })
      }
    } catch (err) {
      console.error("Authentication error:", err)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "" })
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1050] p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{isLogin ? "Sign In" : "Create Account"}</h2>
          <p className="text-gray-600">
            {isLogin ? "Sign in to your account to continue" : "Create a new account to get started"}
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="John"
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <Button variant="dark" className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="ml-1 text-gray-800 hover:text-gray-900 font-medium">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AuthModal
