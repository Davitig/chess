/**
 * Get diagonal squares.
 *
 * @param squares array
 * @param squareKey integer
 * @param newSquareKeyFunc closure
 * @param edgeAlphabet string
 * @return array
 */
const diagonalSquares = (squares, squareKey, newSquareKeyFunc, edgeAlphabet) => {
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
                if (targetSquarePeace.side === this.side) {
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