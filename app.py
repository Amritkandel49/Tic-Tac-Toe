from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def is_winner(bo, player):
    win_combinations = [
        (0,1,2), (3,4,5), (6,7,8),
        (0,3,6), (1,4,7), (2,5,8),
        (0,4,8), (2,4,6)
    ]
    return any(bo[i] == bo[j] == bo[k] == player for i, j, k in win_combinations)

def is_draw(bo):
    return ' ' not in bo


def minimax(bo, depth, is_maximizing, alpha, beta):
    if is_winner(bo, 'O'):  # AI wins
        return 1
    elif is_winner(bo, 'X'):  # Human wins
        return -1
    elif is_draw(bo):
        return 0

    if is_maximizing:
        max_eval = float('-inf')
        for i in range(9):
            if bo[i] == ' ':
                bo[i] = 'O'
                eval = minimax(bo, depth + 1, False, alpha, beta)
                bo[i] = ' '
                max_eval = max(max_eval, eval)
                alpha = max(alpha, eval)
                if beta <= alpha:
                    break
        return max_eval
    else:
        min_eval = float('inf')
        for i in range(9):
            if bo[i] == ' ':
                bo[i] = 'X'
                eval = minimax(bo, depth + 1, True, alpha, beta)
                bo[i] = ' '
                min_eval = min(min_eval, eval)
                beta = min(beta, eval)
                if beta <= alpha:
                    break
        return min_eval
    

def best_move(bo):
    best_score = float('-inf')
    move = -1
    for i in range(9):
        if bo[i] == ' ':
            bo[i] = 'O'
            score = minimax(bo, 0, False, float('-inf'), float('inf'))
            bo[i] = ' '
            if score > best_score:
                best_score = score
                move = i
    return move

# --- Routes ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ai-move', methods=['POST'])
def ai_move():
    board = request.get_json()['board']
    move = best_move(board)
    board[move] = 'O'
    return jsonify({'board': board, 'move': move})

if __name__ == '__main__':
    app.run(debug=True)