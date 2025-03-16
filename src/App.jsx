import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [NumbersAllow, setNumbersAllow] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumbersAllow) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+()-?@[]{}(){}/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, NumbersAllow, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, NumbersAllow, passwordGenerator]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <div className="w-full max-w-md mx-auto relative p-6 bg-gray-900 text-orange-500 rounded-lg shadow-xl backdrop-blur-lg bg-opacity-30 border-2 border-transparent animate-borderGradient">
        <h1 className="text-center text-white text-3xl font-bold mb-5 tracking-wide">
          🔐 Password Generator
        </h1>

        <div className="flex items-center shadow-md rounded-lg overflow-hidden bg-gray-100 mb-5 relative">
          <input
            ref={passwordRef}
            type="text"
            value={Password}
            placeholder="Password"
            className="outline-none w-full py-3 px-4 text-gray-700 text-lg bg-transparent"
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all duration-300 focus:ring-2 focus:ring-blue-400"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between text-white text-sm gap-y-4 md:gap-x-4">
          <div className="flex items-center gap-x-2 w-full">
            <label className="whitespace-nowrap text-lg">🔢 Length: {length}</label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer w-full accent-orange-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 w-full">
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={NumbersAllow}
                id="numberInput"
                onChange={() => setNumbersAllow((prev) => !prev)}
                className="cursor-pointer w-5 h-5 accent-orange-500"
              />
              <label htmlFor="numberInput" className="text-lg">🔢 Numbers</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer w-5 h-5 accent-orange-500"
              />
              <label htmlFor="charInput" className="text-lg">✨ Characters</label>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes borderAnimation {
            0% { border-color: #ff0080; }
            25% { border-color: #ffbf00; }
            50% { border-color: #00ffbf; }
            75% { border-color: #8000ff; }
            100% { border-color: #ff0080; }
          }

          .animate-borderGradient {
            border-width: 3px;
            border-style: solid;
            animation: borderAnimation 3s infinite linear;
          }
        `}
      </style>
    </div>
  );
}

export default App;
