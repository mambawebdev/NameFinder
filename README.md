# 🎲 Random Name Picker

A fun, animated React component for randomly selecting names from a list. Features a shuffling animation that builds suspense before revealing the winner!

## ✨ Features

- **Easy Input**: Add names via textarea (one per line or comma-separated)
- **Live List Management**: View all names with hover-to-delete functionality
- **Shuffling Animation**: 2-second suspenseful animation that cycles through names
- **Clean Results**: Bold winner display with confetti-style design
- **Reusable**: Pick again without clearing your list
- **Responsive Design**: Works on mobile and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js installed
- React project setup (Create React App, Vite, Next.js, etc.)
- Tailwind CSS configured

### Installation

1. Copy `name-picker.jsx` into your project's components folder

2. Install required dependencies:
```bash
npm install lucide-react
```

3. Make sure Tailwind CSS is configured in your project

4. Import and use the component:
```jsx
import NamePicker from './components/name-picker';

function App() {
  return <NamePicker />;
}
```

## 🎯 How It Works

### Component Structure

```
NamePicker
├── State Management
│   ├── names[] - Array of all added names
│   ├── winner - The final selected name
│   ├── isSpinning - Animation state
│   └── displayName - Current name shown during shuffle
│
├── Input Section
│   └── Textarea + Add button
│
├── Name List
│   └── Removable name chips
│
├── Spin Button
│   └── Triggers the random selection
│
└── Result Display
    └── Shows shuffling animation → final winner
```

### The Random Selection Logic

```javascript
const pickRandom = () => {
  setIsSpinning(true);
  
  // Shuffle effect: change displayed name every 80ms
  const shuffleInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setDisplayName(names[randomIndex]);
  }, 80);
  
  // After 2 seconds, pick the actual winner
  setTimeout(() => {
    clearInterval(shuffleInterval);
    const finalIndex = Math.floor(Math.random() * names.length);
    setWinner(names[finalIndex]);
    setIsSpinning(false);
  }, 2000);
};
```

## 🎨 Customization

### Change Colors

The component uses an orange/rose gradient theme. To customize:

```jsx
// Find these gradient classes and replace:
from-orange-500 to-rose-500  // Main gradient
from-amber-50 via-orange-50 to-rose-50  // Background gradient
```

### Adjust Animation Speed

```javascript
// In pickRandom() function:
setInterval(() => { ... }, 80);  // Change 80 to speed up/slow down
setTimeout(() => { ... }, 2000);  // Change 2000 for longer/shorter spin
```

### Change Fonts

The component uses Google Fonts (Space Grotesk). To change:

```jsx
// Update the @import in the <style> tag at the bottom
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

// Then update the font-family
font-family: 'YourFont', sans-serif;
```

## 📦 What's Included

- **Full component code** with comments
- **Tailwind styling** (no external CSS needed)
- **Lucide icons** for visual polish
- **Responsive design** that works on all screen sizes

## 🛠️ Tech Stack

- React (Hooks: useState, useEffect)
- Tailwind CSS
- Lucide React (icons)

## 💡 Tips

- **Adding Names**: You can paste a whole list at once (one name per line)
- **Comma Support**: "Alice, Bob, Charlie" works too!
- **Quick Remove**: Hover over any name to see the delete button
- **Fair Selection**: Uses `Math.random()` for truly random picks

## 🐛 Troubleshooting

**Styles not working?**
- Make sure Tailwind CSS is properly configured
- Check that your `tailwind.config.js` includes the component path

**Icons not showing?**
- Install lucide-react: `npm install lucide-react`

**Build errors?**
- Ensure you're using React 16.8+ (hooks support)

## 📝 License

Free to use for personal projects! Customize however you like.

## 🎉 That's It!

You now have a fully functional name picker without needing complex wheel physics. Perfect for:
- Classroom random selection
- Raffle drawings  
- Team picker for games
- Chore assignment
- Giveaways

Enjoy! 🎲