/**
 * Define diagonal squares.
 *
 * @param chess object
 * @param distance integer
 * @param side string
 * @param square string
 * @param sort boolean
 * @return array
 */
const defineDiagonalSquares = (chess, distance, side, square, sort = false) => {
    let squares = chess.getSquares();
    let squareKey = chess.getSquaresArrayKey(square);
    let currentSquareAlphabet = chess.getSquareAlphabet(squares[squareKey]);

    let newSquares = [];
    let moveFunctions = [
        newSquareKey => {return newSquareKey - 7;},
        newSquareKey => {return newSquareKey - 9;},
        newSquareKey => {return newSquareKey + 7;},
        newSquareKey => {return newSquareKey + 9;}
    ];

    moveFunctions.forEach((moveFunction, line) => {
        let newSquareKey = squareKey;

        if (sort) {
            newSquares[line] = [];
        }

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveFunction(newSquareKey);

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

                if (sort) {
                    newSquares[line].push(targetSquare);
                } else {
                    newSquares.push(targetSquare);
                }

                let targetPeace = chess.getPeace(targetSquare);

                // if target square contains a peace
                if (targetPeace instanceof Peace) {
                    // if same side peace
                    if (targetPeace.side === side) {
                        sort ? newSquares[line].pop() : newSquares.pop();
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
 * @param square string
 * @param sort boolean
 * @return array
 */
const defineLinearSquares = (chess, distance, side, square, sort = false) => {
    let squares = chess.getSquares();
    let squareKey = chess.getSquaresArrayKey(square);
    let currentSquareAlphabet = chess.getSquareAlphabet(squares[squareKey]);

    let newSquares = [];
    let moveFunctions = [
        newSquareKey => {return newSquareKey - 1;},
        newSquareKey => {return newSquareKey - 8;},
        newSquareKey => {return newSquareKey + 1;},
        newSquareKey => {return newSquareKey + 8;}
    ];

    moveFunctions.forEach((moveFunction, line) => {
        let newSquareKey = squareKey;

        if (sort) {
            newSquares[line] = [];
        }

        for (let i = 1; i <= distance; i++) {
            newSquareKey = moveFunction(newSquareKey);

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

                if (sort) {
                    newSquares[line].push(targetSquare);
                } else {
                    newSquares.push(targetSquare);
                }

                let targetPeace = chess.getPeace(targetSquare);

                // if target square contains a peace
                if (targetPeace instanceof Peace) {
                    // if same side peace
                    if (targetPeace.side === side) {
                        sort ? newSquares[line].pop() : newSquares.pop();
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

/**
 * Split the array into even chunks.
 *
 * @param array
 * @param size
 * @return array
 */
function arrayChunk(array, size) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);

        result.push(chunk);
    }

    return result;
}