/**
 * Get diagonal squares.
 *
 * @param squares array
 * @param squareKey integer
 * @param newSquareKeyFunc closure
 * @param side string
 * @param edgeAlphabet string
 * @return array
 */
const diagonalSquares = (squares, squareKey, newSquareKeyFunc, side, edgeAlphabet) => {
    let newSquares = [];
    let newSquareKey = squareKey;

    for (let i = 1; i <= 8; i++) {
        newSquareKey = newSquareKeyFunc(newSquareKey);

        let targetSquare = squares[newSquareKey];

        if (targetSquare !== undefined) {
            let targetSquarePeace = chess.squares[targetSquare];

            newSquares.push(targetSquare);

            // if object
            if (targetSquarePeace.length === undefined) {
                if (targetSquarePeace.side === side) {
                    newSquares.pop();
                }

                break;
            }

            if (chess.splitSquare(targetSquare)[0] === edgeAlphabet) {
                break;
            }
        }
    }

    return newSquares;
}

/**
 * Get linear squares.
 *
 * @param squares array
 * @param squareKey integer
 * @param newSquareKeyFunc closure
 * @param side string
 * @param edgeAlphabet string
 * @return array
 */
const linearSquares = (squares, squareKey, newSquareKeyFunc, side, edgeAlphabet) => {
        let newSquares = [];
        let newSquareKey = squareKey;

        for (let i = 1; i <= 8; i++) {
            newSquareKey = newSquareKeyFunc(newSquareKey);

            let targetSquare = squares[newSquareKey];

            if (targetSquare !== undefined) {
                let targetSquarePeace = chess.squares[targetSquare];

                newSquares.push(targetSquare);

                // if object
                if (targetSquarePeace.length === undefined) {
                    console.log(targetSquare);
                    if (targetSquarePeace.side === side) {
                        newSquares.pop();
                    }

                    break;
                }

                if (chess.splitSquare(targetSquare)[0] === edgeAlphabet) {
                    break;
                }
            }
        }

        return newSquares;
    }