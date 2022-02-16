/**
 * Define diagonal squares.
 *
 * @param chess object
 * @param distance integer
 * @param side string
 * @return array
 */
const defineDiagonalSquares = (chess, distance, side) => {
    let squares = chess.getSquares();
    let squareKey = chess.getSquaresArrayKey();
    let currentSquareAlphabet = chess.getSquareAlphabet(squares[squareKey]);

    let newSquares = [];
    let moveFunctions = [
        newSquareKey => {return newSquareKey - 7;},
        newSquareKey => {return newSquareKey - 9;},
        newSquareKey => {return newSquareKey + 7;},
        newSquareKey => {return newSquareKey + 9;}
    ];

    moveFunctions.forEach(moveObject => {
        let newSquareKey = squareKey;

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveObject(newSquareKey);

            let targetSquare = squares[newSquareKey];

            // if the target square reaches the actual board array
            if (targetSquare !== undefined) {
                let targetSquareAlphabet = chess.getSquareAlphabet(targetSquare);

                // if the peace is on the edge and the target square reaches the board
                if (i === 1
                    && ['a', 'h'].includes(currentSquareAlphabet)
                    && ['a', 'h'].includes(targetSquareAlphabet)
                ) {
                    break;
                }

                newSquares.push(targetSquare);

                let targetSquarePeace = chess.getPeace(targetSquare);

                // if target square contains a same side peace
                if (targetSquarePeace instanceof Peace) {
                    if (targetSquarePeace.side === side) {
                        newSquares.pop();
                    }

                    break;
                }

                // if the target square reaches the board edge
                if (['a', 'h'].includes(targetSquareAlphabet)) {
                    break;
                }
            }
        }
    });

    return newSquares;
}

/**
 * Define linear squares.
 *
 * @param chess object
 * @param distance integer
 * @param side string
 * @return array
 */
const defineLinearSquares = (chess, distance, side) => {
    let squares = chess.getSquares();
    let squareKey = chess.getSquaresArrayKey();
    let currentSquareAlphabet = chess.getSquareAlphabet(squares[squareKey]);

    let newSquares = [];
    let moveFunctions = [
        newSquareKey => {return newSquareKey - 1;},
        newSquareKey => {return newSquareKey - 8;},
        newSquareKey => {return newSquareKey + 1;},
        newSquareKey => {return newSquareKey + 8;}
    ];

    moveFunctions.forEach(moveObject => {
        let newSquareKey = squareKey;

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveObject(newSquareKey);

            let targetSquare = squares[newSquareKey];

            // if the target square reaches the actual board array
            if (targetSquare !== undefined) {
                let targetSquareAlphabet = chess.getSquareAlphabet(targetSquare);

                // if the peace is at the corner and the target square reaches the board
                if (i === 1
                    && ((
                        currentSquareAlphabet === 'a' && targetSquareAlphabet === 'h'
                    ) || (
                        currentSquareAlphabet === 'h' && targetSquareAlphabet === 'a'
                    ))
                ) {
                    break;
                }

                newSquares.push(targetSquare);

                let targetSquarePeace = chess.getPeace(targetSquare);

                // if the target square contains a same side peace
                if (targetSquarePeace instanceof Peace) {
                    if (targetSquarePeace.side === side) {
                        newSquares.pop();
                    }

                    break;
                }

                // if the target square reaches the board edge
                if (! ['a', 'h'].includes(currentSquareAlphabet)
                    && ['a', 'h'].includes(targetSquareAlphabet)
                ) {
                    break;
                }
            }
        }
    });

    return newSquares;
}
