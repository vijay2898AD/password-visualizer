import { useState } from 'react';

// 1. CONSTANTS & TYPES
type StrengthState = 'empty' | 'weak' | 'medium' | 'strong';

// We define our specific rules here
const REQUIREMENTS = [
  { id: 1, label: "At least 9 characters", test: (p: string) => p.length > 8 },
  { id: 2, label: "Includes a number",     test: (p: string) => /\d/.test(p) },
  { id: 3, label: "Includes a symbol",     test: (p: string) => /[!@#$%^&*]/.test(p) },
  { id: 4, label: "Includes uppercase",    test: (p: string) => /[A-Z]/.test(p) },
];

function App() {
  const [password, setPassword] = useState('');

  // 2. LOGIC: Calculate overall strength based on how many requirements passed
  const calculateStrength = (pass: string): StrengthState => {
    if (pass.length === 0) return 'empty';

    // We count how many tests return "true"
    const score = REQUIREMENTS.filter(req => req.test(pass)).length;

    if (score < 2) return 'weak';
    if (score < 4) return 'medium';
    return 'strong';
  };

  const strength = calculateStrength(password);

  // 3. STYLES: Helper functions for UI
  const getInputStyles = (s: StrengthState) => {
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
    <div className={`
      flex flex-col items-center justify-center min-h-screen 
      transition-colors duration-700 
      ${getBackgroundStyles(strength)}
    `}>
      
      <h1 className="text-3xl font-bold mb-2 text-slate-700">
        Password Visualizer
      </h1>
      <p className="text-slate-500 mb-10">Make the box big and bold!</p>

      {/* INPUT SECTION */}
      <div className="h-24 flex items-center justify-center">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password..."
          className={`
            transition-all duration-500 ease-in-out
            rounded-xl px-6 py-3 text-center text-lg outline-none shadow-sm
            ${getInputStyles(strength)}
          `}
        />
      </div>

      {/* 4. NEW: REQUIREMENTS LIST */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md px-6">
        {REQUIREMENTS.map((req) => {
          // Check if this specific requirement is met
          const isMet = req.test(password);

          return (
            <div 
              key={req.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300
                ${isMet 
                  ? 'bg-green-100 border-green-200 text-green-700 translate-x-2' // Style when MET
                  : 'bg-white border-gray-100 text-gray-400' // Style when NOT MET
                }
              `}
            >
              {/* Icon Area */}
              <span className={`text-xl ${isMet ? 'scale-125' : ''} transition-transform duration-300`}>
                {isMet ? '✓' : '○'}
              </span>
              
              <span className="text-sm font-semibold">
                {req.label}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;