import React, { useEffect, useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';

export default function NamePicker() {
  const [inputValue, setInputValue] = useState('');
  const [names, setNames] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [spinMode, setSpinMode] = useState(false);

    // Load on first render
    useEffect(() => {
    const savedNames = localStorage.getItem('namePickerNames');
    if (savedNames) {
        setNames(JSON.parse(savedNames));
    }
    }, []);

    // Save whenever names changes
    useEffect(() => {
    localStorage.setItem('namePickerNames', JSON.stringify(names));
    }, [names]);

  const addNames = () => {
    if (!inputValue.trim()) return;

    const newNames = inputValue
      .split(/[\n,]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    setNames([...names, ...newNames]);
    setInputValue('');
  };

  const removeName = (indexToRemove) => {
    setNames(names.filter((_, index) => index !== indexToRemove));
    if (winner && names[indexToRemove] === winner) {
      setWinner(null);
      setDisplayName('');
    }
  };

  const pickRandom = () => {
    if (names.length === 0) return;

    setSpinMode(true);
    setIsSpinning(true);
    setWinner(null);

    const shuffleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setDisplayName(names[randomIndex]);
    }, 80);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      const finalIndex = Math.floor(Math.random() * names.length);
      const finalWinner = names[finalIndex];
      setWinner(finalWinner);
      setDisplayName(finalWinner);
      setIsSpinning(false);
    }, 2000);
  };

  const reset = () => {
    setWinner(null);
    setDisplayName('');
    setSpinMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-blue-900 p-8 text-white">
      
      {!spinMode && (
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-400 mb-3">
              NAME PICKER
            </h1>
            <p className="text-gray-300 text-lg">
              Add names, spin, and let fate decide
            </p>
          </div>

          {/* Input */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-400/30">
            <label className="block text-sm font-bold text-gray-200 mb-3 uppercase">
              Add Names
            </label>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter names..."
              className="w-full p-4 bg-black/40 border border-gray-500 rounded-xl focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
              rows="4"
            />

            <button
              onClick={addNames}
              className="mt-4 w-full bg-gradient-to-r from-gray-400 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-gray-300 transition-all"
            >
              Add to List
            </button>
          </div>

          {/* Names List */}
          {names.length > 0 && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-400/30">
              <h2 className="text-sm font-bold text-gray-200 mb-4 uppercase">
                Current Names ({names.length})
              </h2>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-200 text-gray-900 rounded-lg"
                  >
                    <span>{name}</span>
                    <button onClick={() => removeName(index)}>
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spin Button */}
          {names.length > 0 && (
            <button
              onClick={pickRandom}
              disabled={isSpinning}
              className={`w-full bg-gradient-to-r from-gray-400 to-blue-600 text-white font-black text-2xl py-8 rounded-3xl border-2 border-gray-300 transition-all ${
                isSpinning
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-105'
              }`}
            >
              {isSpinning ? (
                <span className="flex justify-center items-center gap-3">
                  <Sparkles className="animate-spin" size={32} />
                  SPINNING...
                </span>
              ) : (
                '🎲 PICK RANDOM NAME'
              )}
            </button>
          )}

          {/* Result */}
          {(displayName || winner) && (
            <div className="mt-8 bg-gradient-to-br from-gray-400 to-blue-600 rounded-3xl p-12 text-center border-2 border-gray-200">
              <p className="text-white/80 uppercase mb-4">
                {isSpinning ? 'Picking...' : 'Winner'}
              </p>

              <p className="text-white text-5xl font-black mb-6">
                {displayName}
              </p>

              {winner && !isSpinning && (
                <button
                  onClick={reset}
                  className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200"
                >
                  Pick Again
                </button>
              )}
            </div>
          )}

        </div>
      )}

      {/* FULLSCREEN MODE */}
      {spinMode && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-700 to-blue-900 text-center px-6">

          <h1 className="text-7xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-400">
            NAME PICKER
          </h1>

          <div className="bg-gradient-to-br from-gray-400 to-blue-600 rounded-3xl p-16 border border-gray-200">

            <p className="text-white/80 mb-6">
              {isSpinning ? "Picking..." : "Winner"}
            </p>

            <p className="text-white text-6xl font-black mb-8">
              {displayName}
            </p>

            {!isSpinning && (
              <button
                onClick={reset}
                className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full hover:bg-gray-200"
              >
                Pick Again
              </button>
            )}

          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&display=swap');
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
    </div>
  );
}