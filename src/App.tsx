import { useState } from 'react';

// --- ICONS (Simple SVGs) ---
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

// --- CONSTANTS ---
type StrengthState = 'empty' | 'weak' | 'medium' | 'strong';

const REQUIREMENTS = [
  { id: 1, label: "At least 9 characters", test: (p: string) => p.length > 8 },
  { id: 2, label: "Includes a number",     test: (p: string) => /\d/.test(p) },
  { id: 3, label: "Includes a symbol",     test: (p: string) => /[!@#$%^&*]/.test(p) },
  { id: 4, label: "Includes uppercase",    test: (p: string) => /[A-Z]/.test(p) },
];

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // NEW STATE

  // --- LOGIC ---
  const calculateStrength = (pass: string): StrengthState => {
    if (pass.length === 0) return 'empty';
    const score = REQUIREMENTS.filter(req => req.test(pass)).length;
    if (score < 2) return 'weak';
    if (score < 4) return 'medium';
    return 'strong';
  };

  const strength = calculateStrength(password);

  // --- STYLES ---
  // Now these styles apply to the WRAPPER DIV, not the input directly
  const getWrapperStyles = (s: StrengthState) => {
    switch (s) {
      case 'weak':
        return 'w-48 border-red-500 text-red-500 animate-shake border-2 bg-white';
      case 'medium':
        return 'w-64 border-yellow-500 text-yellow-600 border-2 bg-white';
      case 'strong':
        return 'w-80 border-green-500 text-green-600 border-4 font-extrabold scale-110 bg-white shadow-lg shadow-green-200';
      default:
        return 'w-64 border-gray-300 text-gray-400 border bg-white';
    }
  };

  const getBackgroundStyles = (s: StrengthState) => {
    switch (s) {
      case 'weak': return 'bg-red-50';
      case 'medium': return 'bg-yellow-50';
      case 'strong': return 'bg-green-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-700 ${getBackgroundStyles(strength)}`}>
      
      <h1 className="text-4xl font-bold mb-2 text-slate-700">Password Visualizer</h1>
      <p className="text-slate-500 mb-10">Make the box big and bold!</p>

      {/* INPUT CONTAINER AREA */}
      <div className="h-24 flex items-center justify-center">
        
        {/* 1. THE WRAPPER: This controls the size, border, and shake */}
        <div className={`
          relative flex items-center justify-between
          transition-all duration-500 ease-in-out
          rounded-xl shadow-sm overflow-hidden
          ${getWrapperStyles(strength)}
        `}>
          
          {/* 2. THE INPUT: Transparent background, fills the wrapper */}
          <input
            type={showPassword ? "text" : "password"} // Toggles between text/password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
            className="w-full h-full px-6 py-3 text-lg bg-transparent outline-none placeholder-gray-400 text-center"
          />

          {/* 3. THE BUTTON: Absolute positioned to the right */}
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>

        </div>
      </div>

      {/* REQUIREMENTS LIST (Same as before) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md px-6">
        {REQUIREMENTS.map((req) => {
          const isMet = req.test(password);
          return (
            <div key={req.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${isMet ? 'bg-green-100 border-green-200 text-green-700 translate-x-2' : 'bg-white border-gray-100 text-gray-400'}`}>
              <span className={`text-xl ${isMet ? 'scale-125' : ''} transition-transform duration-300`}>{isMet ? '✓' : '○'}</span>
              <span className="text-sm font-semibold">{req.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;