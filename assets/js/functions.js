/**
 * Define diagonal squares.
 *
 * @param {Chess} chess
 * @param {number} distance
 * @param {string} side
 * @param {string} square
 * @param {boolean} sort
 * @param {boolean} fullDef
 * @return {array}
 */
const defineDiagonalSquares = (chess, distance, side, square, sort = false, fullDef = false) => {
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

        let fullDefs = [];

        fullDefs[line] = fullDef;

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

                if (! sortSquaresByLine(newSquares, targetSquare, side, sort, line, fullDefs)) {
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
 * @param {Chess} chess
 * @param {number} distance
 * @param {string} side
 * @param {string} square
 * @param {boolean} sort
 * @param {boolean} fullDef
 * @return {array}
 */
const defineLinearSquares = (chess, distance, side, square, sort = false, fullDef = false) => {
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

        let fullDefs = [];

        fullDefs[line] = fullDef;

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

                if (! sortSquaresByLine(newSquares, targetSquare, side, sort, line, fullDefs)) {
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
 * Sort squares by the lines.
 *
 * @param {array} squares
 * @param {string} targetSquare
 * @param {string} side
 * @param {boolean} sort
 * @param {number} line
 * @param {boolean} fullDefs
 * @return {boolean}
 */
function sortSquaresByLine(squares, targetSquare, side, sort, line, fullDefs) {
    if (sort) {
        squares[line].push(targetSquare);
    } else {
        squares.push(targetSquare);
    }

    let targetPeace = chess.getPeace(targetSquare);

    if (targetPeace instanceof Peace) {
        if (targetPeace.side === side) {
            // fullDef to protect the peace from the king
            if (! fullDefs[line]) {
                sort ? squares[line].pop() : squares.pop();
            } else {
                fullDefs[line] = false
            }
        }

        // fullDef to continue checking squares through the king
        if (! fullDefs[line]
            && ! (targetPeace instanceof King && targetPeace.side !== side)
        ) {
            return false;
        }
    }

    return true
}

/**
 * Split the array into even chunks.
 *
 * @param {array} array
 * @param {number} size
 * @return {array}
 */
function arrayChunk(array, size) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);

        result.push(chunk);
    }

    return result;
}