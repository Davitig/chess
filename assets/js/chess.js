class Chess {
    /**
     * DOM Element Name.
     *
     * @type object
     */
    domElementName;

    /**
     * List of all squares with its predefined peaces.
     *
     * @type object
     */
    squares = {
        a8: new Rook('black'),
        b8: new Knight('black'),
        c8: new Bishop('black'),
        d8: new Queen('black'),
        e8: new King('black'),
        f8: new Bishop('black'),
        g8: new Knight('black'),
        h8: new Rook('black'),
        a7: new Pawn('black'),
        b7: new Pawn('black'),
        c7: new Pawn('black'),
        d7: new Pawn('black'),
        e7: new Pawn('black'),
        f7: new Pawn('black'),
        g7: new Pawn('black'),
        h7: new Pawn('black'),
        a6: [], b6: [], c6: [], d6: [], e6: [], f6: [], g6: [], h6: [],
        a5: [], b5: [], c5: [], d5: [], e5: [], f5: [], g5: [], h5: [],
        a4: [], b4: [], c4: [], d4: [], e4: [], f4: [], g4: [], h4: [],
        a3: [], b3: [], c3: [], d3: [], e3: [], f3: [], g3: [], h3: [],
        a2: new Pawn('white'),
        b2: new Pawn('white'),
        c2: new Pawn('white'),
        d2: new Pawn('white'),
        e2: new Pawn('white'),
        f2: new Pawn('white'),
        g2: new Pawn('white'),
        h2: new Pawn('white'),
        a1: new Rook('white'),
        b1: new Knight('white'),
        c1: new Bishop('white'),
        d1: new Queen('white'),
        e1: new King('white'),
        f1: new Bishop('white'),
        g1: new Knight('white'),
        h1: new Rook('white')
    };

    /**
     * Indicates whether you play as a white or black.
     *
     * @type string
     */
    side;

    /**
     * Active square.
     *
     * @type string|undefined
     */
    activeSquare;

    /**
     * Alphabet of the active square.
     *
     * @type string|undefined
     */
    activeSquareAlphabet;

    /**
     * Number of the active square.
     *
     * @type string|undefined
     */
    activeSquareNumber;

    /**
     * List of available squares.
     *
     * @type array
     */
    availableSquares = [];

    /**
     * Last move.
     *
     * @type object
     */
    lastMove = {
        peace: undefined, square: undefined, prevSquares: []
    }

    /**
     * Peace looks.
     * By default every peace looks right, except knight.
     *
     * @type string
     */
    peaceLooks = 'right';

    /**
     * Create a new board.
     *
     * @param name string
     * @param side string
     */
    constructor(name, side) {
        this.domElementName = name;

        this.side = side;
    }

    /**
     * Create a new chess board.
     */
    createBoard() {
        let squares = this.getSquaresArray();

        if (this.side === 'black') {
            squares.reverse();
        }

        squares.forEach((square, index) => {
            const squareElement = document.createElement('div');
            squareElement.setAttribute('id', square);
            squareElement.setAttribute('data-square', square);
            squareElement.setAttribute('class', 'square');

            this.addPeace(this.squares[square], squareElement);

            // add the newly created element and its content into the board
            const domElement = document.getElementById(this.domElementName);
            domElement.appendChild(squareElement);
            domElement.setAttribute('class', this.side === 'white' ? 'white' : 'black');

            if ((index + 1) % 8 === 0) {
                domElement.appendChild(document.createElement('br'));
            }
        });

        this.alive();
    }

    /**
     * Add peace into the square.
     *
     * @param peace object
     * @param squareElement object
     * @return boolean
     */
    addPeace(peace, squareElement) {
        let square = squareElement.getAttribute('data-square');

        if (! (peace instanceof Peace) || ! square) {
            return false;
        }

        this.squares[square] = peace;

        let peaceFile = peace.getFile();

        if (peaceFile.constructor === Object) {
            peaceFile = peaceFile[this.peaceLooks];

            this.peaceLooks = ((this.peaceLooks === 'right') ? 'left' : 'right');
        }

        const peaceElement = document.createElement('div');
        peaceElement.setAttribute('data-peace', peace.name);
        peaceElement.setAttribute('class',  'peace ' + peaceFile);

        const activePeaceElement = squareElement.querySelector('.peace');

        if (activePeaceElement) {
            squareElement.replaceChild(peaceElement, activePeaceElement);
        } else {
            squareElement.appendChild(peaceElement);
        }

        return true;
    }

    /**
     * Make each peace alive.
     */
    alive() {
        document.addEventListener('click', e => {
            const element = e.target;

            if (element.hasAttribute('data-peace')) {
                this.onPeaceClick(element.parentNode);
            } else if (element.getAttribute('data-available') === '1') {
                this.onAvailableSquareClick(element);
            } else {
                this.unsetSquares(element);
            }
        });
    }

    /**
     * On peace click.
     *
     * @param squareElement object
     */
    onPeaceClick(squareElement) {
        if (squareElement.getAttribute('data-available') === '1') {
            this.onAvailableSquareClick(squareElement);

            return false;
        }

        let square = squareElement.getAttribute('data-square');

        if (this.setActiveSquare(square, squareElement)) {
            this.setAvailableSquares(square);
        }
    }

    /**
     * On available square click.
     *
     * @param targetSquareElement object
     */
    onAvailableSquareClick(targetSquareElement) {
        let targetSquare = targetSquareElement.getAttribute('data-square');

        if (this.activeSquare !== undefined && this.availableSquares.includes(targetSquare)) {
            this.takeSquare(targetSquare, targetSquareElement);
        }

        this.unsetSquares();
    }

    /**
     * Take the square.
     *
     * @param targetSquare string
     * @param targetSquareElement object|undefined
     * @return boolean
     */
    takeSquare(targetSquare, targetSquareElement) {
        let activePeace = this.squares[this.activeSquare];
        let targetPeace = this.squares[targetSquare];

        this.squares[this.activeSquare] = [];
        this.squares[targetSquare] = activePeace;

        activePeace.afterTakeSquare(this);

        this.setLastMove(activePeace, this.activeSquare, targetSquare);

        this.capturePeaceElement(targetPeace, targetSquareElement)

        return true;
    }

    /**
     * Set active square.
     *
     * @param square string
     * @param squareElement object
     * @return boolean
     */
    setActiveSquare(square, squareElement) {
        // if peace switch
        if (this.activeSquare && this.activeSquare !== square) {
            this.unsetActiveSquare();
        }

        // if same peace
        if (this.activeSquare && this.activeSquare === square) {
            this.unsetSquares();

            return false;
        }

        this.activeSquare = square;
        this.activeSquareAlphabet = this.getSquareAlphabet(square);
        this.activeSquareNumber = this.getSquareNumber(square);

        squareElement.setAttribute('data-active', 1);

        return true;
    }

    /**
     * Set available squares.
     *
     * @param square string
     * @return boolean
     */
    setAvailableSquares(square) {
        let squares = this.squares[square].defineMoves(this);

        // if toggle click
        if (! squares.length || squares.every((el, index) => el === this.availableSquares[index])) {
            this.unsetAvailableSquares();

            return false;
        }

        this.unsetAvailableSquares();

        this.availableSquares = squares;

        squares.forEach(square => {
            const squareElement = document.querySelector('#' + square);

            squareElement.setAttribute('data-available', 1);
        });

        return true;
    }

    /**
     * Set last move.
     *
     * @param activePeace object
     * @param activeSquare string
     * @param targetSquare string
     */
    setLastMove(activePeace, activeSquare, targetSquare) {
        this.lastMove.peace = activePeace;
        this.lastMove.activeSquare = targetSquare;

        let prevSquares = this.availableSquares;
        prevSquares.pop();
        prevSquares.push(activeSquare)

        this.lastMove.prevSquares = prevSquares;
    }

    /**
     * Unset squares.
     *
     * @param element object
     */
    unsetSquares(element) {
        this.unsetActiveSquare();
        this.unsetAvailableSquares();
    }

    /**
     * Unset active square.
     */
    unsetActiveSquare() {
        this.activeSquare = this.activeSquareAlphabet = this.activeSquareNumber = undefined;

        document.querySelectorAll('[data-active="1"]').forEach(el => {
            el.setAttribute('data-active', 0);
        });
    }

    /**
     * Unset available squares.
     */
    unsetAvailableSquares() {
        this.availableSquares = [];

        document.querySelectorAll('[data-available="1"]').forEach(el => {
            el.setAttribute('data-available', 0);
        });
    }

    /**
     * Capture the peace element with an active one.
     *
     * @param targetPeace object
     * @param targetSquareElement object
     * @param replaceWithActive boolean
     */
    capturePeaceElement(targetPeace, targetSquareElement, replaceWithActive = true) {
        const targetPeaceElement = targetSquareElement.querySelector('.peace');

        if (targetPeace instanceof Peace && targetPeaceElement) {
            this.collectCapturedPeaceElement(targetPeace.name, targetPeaceElement);
        }

        if (replaceWithActive) {
            const activePeaceElement = document.querySelector('#' + this.activeSquare + ' .peace');
            targetSquareElement.appendChild(activePeaceElement);
        }
    }

    /**
     * Collect the captured peace element.
     *
     * @param peaceName string
     * @param peaceElement object
     */
    collectCapturedPeaceElement(peaceName, peaceElement) {
        const capturedPeacesElement = document.querySelector('#self .' + peaceName + 's');

        capturedPeacesElement.appendChild(peaceElement);
    }

    /**
     * Get alphabet from square.
     *
     * @param square string
     * @return string
     */
    getSquareAlphabet(square) {
        return square.split('')[0];
    }

    /**
     * Get number from square.
     *
     * @param square string
     * @return integer
     */
    getSquareNumber(square) {
        return parseInt(square.split('')[1]);
    }

    /**
     * Get squares array.
     *
     * @return array
     */
    getSquaresArray() {
        return Object.keys(this.squares);
    }

    /**
     * Get squares array key.
     *
     * @param square string
     * @param squares array|undefined
     * @return boolean|number
     */
    getSquaresArrayKey(square, squares = undefined) {
        let array = ((squares === undefined) ? this.getSquaresArray() : squares);

        for (let i = 0; i < array.length; i++) {
            if (array[i] === square) {
                return i;
            }
        }

        return false;
    }
}
