/**
 * Define diagonal squares.
 *
 * @param chess object
 * @param distance integer
 * @param side string
 * @return array
 */
const defineDiagonalSquares = (chess, distance, side) => {
    let squareKeys = chess.getSquaresArray();
    let squareKey = chess.getSquaresArrayKey(chess.activeSquare, squareKeys);
    let currentSquareAlphabet = chess.getSquareAlphabet(squareKeys[squareKey]);

    let newSquares = [];
    let moveObjects = [
        newSquareKey => {return newSquareKey - 7;},
        newSquareKey => {return newSquareKey - 9;},
        newSquareKey => {return newSquareKey + 7;},
        newSquareKey => {return newSquareKey + 9;}
    ];

    moveObjects.forEach(moveObject => {
        let newSquareKey = squareKey;

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveObject(newSquareKey);

            let targetSquare = squareKeys[newSquareKey];

            if (targetSquare !== undefined) {
                let targetSquareAlphabet = chess.getSquareAlphabet(targetSquare);

                // if the peace is on the edge and target square reaches the board
                if (i === 1
                    && ['a', 'h'].includes(currentSquareAlphabet)
                    && ['a', 'h'].includes(targetSquareAlphabet)
                ) {
                    break;
                }

                newSquares.push(targetSquare);

                let targetSquarePeace = chess.squares[targetSquare];

                // if target square contains a peace
                if (targetSquarePeace.length === undefined) {
                    if (targetSquarePeace.side === side) {
                        newSquares.pop();
                    }

                    break;
                }

                // if the peace target square reaches the board edge
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
    let squareKeys = chess.getSquaresArray();
    let squareKey = chess.getSquaresArrayKey(chess.activeSquare, squareKeys);
    let currentSquareAlphabet = chess.getSquareAlphabet(squareKeys[squareKey]);

    let newSquares = [];
    let moveObjects = [
        newSquareKey => {return newSquareKey - 1;},
        newSquareKey => {return newSquareKey - 8;},
        newSquareKey => {return newSquareKey + 1;},
        newSquareKey => {return newSquareKey + 8;}
    ];

    moveObjects.forEach(moveObject => {
        let newSquareKey = squareKey;

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveObject(newSquareKey);

            let targetSquare = squareKeys[newSquareKey];

            if (targetSquare !== undefined) {
                let targetSquareAlphabet = chess.getSquareAlphabet(targetSquare);

                // if the peace is on the alphabet edge and target square reaches the board
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

                let targetSquarePeace = chess.squares[targetSquare];

                // if target square contains a peace
                if (targetSquarePeace.length === undefined) {
                    if (targetSquarePeace.side === side) {
                        newSquares.pop();
                    }

                    break;
                }

                // if the peace target square reaches the board edge
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
