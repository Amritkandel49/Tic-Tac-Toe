# Tic-Tac-Toe Game

A modern, interactive tic-tac-toe game built with Flask and JavaScript featuring an intelligent AI opponent using the minimax algorithm with alpha-beta pruning.

## Play Tic-Tac-Toe

🎮 **[Play the Game Live!](https://tic-tac-toe-lgrv.onrender.com/)** 🎮

*Click the link above to play the game directly in your browser - no installation required!*

## Features

- **Smart AI Opponent**: Uses minimax algorithm with alpha-beta pruning for optimal gameplay
- **Random First Move**: Either the player or AI randomly gets the first move each game
- **Visual Win Indicators**: Red lines appear through winning combinations
- **Responsive Design**: Clean, modern interface that works on all devices
- **Play Again Functionality**: Easy game reset with new random first player selection

## Game Rules

- Players take turns placing X's and O's on a 3x3 grid
- The player uses 'X' and the AI uses 'O'
- First to get three marks in a row (horizontally, vertically, or diagonally) wins
- If all squares are filled without a winner, the game ends in a draw

## Technical Features

### AI Implementation
- **Minimax Algorithm**: Ensures the AI plays optimally
- **Alpha-Beta Pruning**: Optimizes AI decision-making speed
- **Difficulty**: The AI is unbeatable when playing optimally

### Visual Enhancements
- **Winning Line Display**: Red lines highlight the winning combination
- **Different Line Types**: 
  - Horizontal lines for row wins
  - Vertical lines for column wins
  - Diagonal lines for diagonal wins
- **Game State Management**: Proper turn handling and game over detection

## Installation & Setup

### Prerequisites
- Python 3.6 or higher
- Flask

### Installation Steps

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install Flask** (if not already installed)
   ```bash
   pip install flask
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   - Navigate to `http://127.0.0.1:5000`
   - If port 5000 is busy, the app will suggest an alternative port

## File Structure

```
tic-tac-toe/
│
├── app.py                 # Flask backend with AI logic
├── templates/
│   └── index.html        # HTML template
├── static/
│   ├── style.css         # Styling and visual effects
│   └── script.js         # Frontend game logic
└── README.md             # This file
```

## How to Play

1. **Start the Game**: Open the application in your browser
2. **Random First Move**: The game randomly decides who goes first
3. **Make Your Move**: Click on any empty cell to place your 'X'
4. **AI Response**: The AI will automatically make its move with 'O'
5. **Win Condition**: Get three in a row to win - a red line will highlight your winning combination
6. **Play Again**: Click the "Play Again" button to start a new game with random first player

## AI Strategy

The AI uses the **minimax algorithm** with **alpha-beta pruning**:
- Evaluates all possible future game states
- Chooses the move that maximizes its chances of winning
- Minimizes the player's chances of winning
- Results in an unbeatable AI opponent

## Developers

- **Amrit Kandel**
- **Prasish Timalsina**

## Technologies Used

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Algorithm**: Minimax with Alpha-Beta Pruning
- **Styling**: CSS Grid, Flexbox, CSS Animations

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript support

## Contributing

Feel free to fork this project and submit pull requests for improvements such as:
- Additional difficulty levels
- Score tracking
- Sound effects
- Animations
- Mobile responsiveness improvements

## License

This project is open source. Feel free to use, modify, and distribute as needed.

---

*Enjoy playing against our unbeatable AI! 🎮*
