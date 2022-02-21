class Chess {
    /**
     * Board DOM element name.
     *
     * @type object
     */
    boardElementName;

    /**
     * List of squares with its predefined peaces.
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
     * List of square names.
     *
     * @type object
     */
    squareKeys = [];

    /**
     * Indicates whether you play as a white or black.
     *
     * @type string
     */
    side;

    /**
     * Indicates a previous side move.
     *
     * @type string
     */
    prevSideMove = "black";

    /**
     * Indicates whether moves goes by order.
     *
     * @type string
     */
    moveByOrder;

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
     * Peace looks.
     * By default every peace looks right, except knight.
     *
     * @type string
     */
    peaceLooks = 'right';

    /**
     * Events.
     *
     * @type object
     */
    events;

    /**
     * Contains the active timer data (setInterval ID, etc).
     * Timer won't work if the move by order is disabled.
     *
     * @type object
     */
    timer = {
        white: {duration: 0, timerId: undefined},
        black: {duration: 0, timerId: undefined}
    };

    /**
     * Timer duration increment, in milliseconds.
     *
     * @type number
     */
    timerDurationIncrement = 0;

    /**
     * Create a new board.
     *
     * @param name string
     * @param side string
     * @param moveByOrder boolean
     */
    constructor(name, side, moveByOrder = true) {
        this.boardElementName = name;

        this.squareKeys = Object.keys(this.squares);

        this.side = side;

        this.moveByOrder = moveByOrder;

        this.events = new ChessEvents;
    }

    /**
     * Get the squares.
     *
     * @return array
     */
    getSquares() {
        return this.squareKeys;
    }

    /**
     * Get the square.
     *
     * @param key string
     * @return array
     */
    getSquare(key) {
        return this.squareKeys[key];
    }

    /**
     * Get the active square.
     *
     * @return array
     */
    getActiveSquare() {
        return this.activeSquare;
    }

    /**
     * Get the peaces from the squares.
     *
     * @return array
     */
    getPeaces() {
        return Object.values(this.squares);
    }

    /**
     * Get the peace from the squares.
     *
     * @param square string
     * @return object
     */
    getPeace(square) {
        return square ? this.squares[square] : this.getActivePeace();
    }

    /**
     * Get the active peace from the squares.
     *
     * @return object
     */
    getActivePeace() {
        return this.squares[this.activeSquare];
    }

    /**
     * Get peace file by order.
     *
     * @param file string|object
     * @return string
     */
    getPeaceFileByOrder(file) {
        if (file.constructor === Object) {
            file = file[this.peaceLooks];

            this.peaceLooks = ((this.peaceLooks === 'right') ? 'left' : 'right');
        }

        return file;
    }

    /**
     * Set the duration of the game, in milliseconds.
     *
     * @param duration number
     * @param increment number
     */
    setTimer(duration, increment) {
        this.timer['white'].duration = duration;
        this.timer['black'].duration = duration;

        this.timerDurationIncrement = increment;

        const whiteTimerElement = document.getElementById('white-timer');
        const blackTimerElement = document.getElementById('black-timer');

        whiteTimerElement.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);
        blackTimerElement.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);
    }

    /**
     * Start the timer.
     *
     * @param side string
     */
    startTimer(side) {
        const element = document.getElementById(side + '-timer');

        let oppositeSide = (side === 'white' ? 'black' : 'white');

        let duration = this.timer[side].duration - 1;

        let timerId = setInterval(() => {
            element.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);

            if (--duration < 0) {
                stopTimer();

                this.events.onTimeout(oppositeSide);
            }

            this.timer[side].duration = duration;
        }, 1000);

        this.timer[side].timerId = timerId;

        let stopTimer = this.stopTimer(timerId);

        this.incrementTimer(oppositeSide);

        this.stopTimer(this.timer[oppositeSide].timerId)();
    }

    /**
     * Increment the timer duration.
     *
     * @param side string
     * @return boolean
     */
    incrementTimer(side) {
        if (! this.timer[side].timerId) {
            return false;
        }

        this.timer[side].duration += this.timerDurationIncrement + 1;

        document.getElementById(side + '-timer').textContent = (
            this.getMinutes(this.timer[side].duration)
            + ':' +
            this.getSeconds(this.timer[side].duration)
        );

        return true;
    }

    /**
     * Stop the timer.
     *
     * @param timerId setInterval ID
     * @return function
     */
    stopTimer(timerId) {
        return () => {
            clearInterval(timerId);
        }
    }

    /**
     * Get a minutes from the duration time.
     *
     * @param duration number
     * @param appendZero boolean
     * @return string
     */
    getMinutes(duration, appendZero = true) {
        let minutes = parseInt(duration / 60, 10);

        if (appendZero) {
            minutes = minutes < 10 ? '0' + minutes : minutes;
        }

        return minutes;
    }

    /**
     * Get a seconds from the duration time.
     *
     * @param duration number
     * @param appendZero boolean
     * @return string
     */
    getSeconds(duration, appendZero = true) {
        let minutes = parseInt(duration % 60, 10);

        if (appendZero) {
            minutes = minutes < 10 ? '0' + minutes : minutes;
        }

        return minutes;
    }

    /**
     * Create a new chess board.
     */
    createBoard() {
        if (this.side === 'black') {
            this.squareKeys.reverse();
        }

        // create a chess background element to block DOM actions at specific time
        const chessBoardBg = document.createElement('div');
        chessBoardBg.setAttribute('id', 'chessboard-bg');
        chessBoardBg.setAttribute('data-visible', 0);
        document.body.appendChild(chessBoardBg);

        // set necessary class names to the board element
        const boardElement = document.getElementById(this.boardElementName);
        boardElement.setAttribute('class', this.side + ' clearfix');

        // create captured peaces element
        boardElement.before(this.createTimerElement());

        // create captured peaces element
        boardElement.before(this.createCapturedPeacesElement(
            this.side, 'opponent'
        ));
        boardElement.after(this.createCapturedPeacesElement(
            this.side === 'white' ? 'black' : 'white', 'self'
        ));

        // draw the board with its predefined starting peaces
        this.squareKeys.forEach((square, index) => {
            const squareElement = document.createElement('div');
            squareElement.setAttribute('id', square);
            squareElement.setAttribute('data-square', square);
            squareElement.setAttribute('class', 'square');

            this.addPeace(this.getPeace(square), squareElement);

            // add the newly created element and its content into the board
            boardElement.appendChild(squareElement);

            if ((index + 1) % 8 === 0) {
                boardElement.appendChild(document.createElement('br'));
            }
        });

        this.alive();
    }

    /**
     * Add peace into the square.
     *
     * @param peace object
     * @param square HTMLElement|string
     * @return boolean
     */
    addPeace(peace, square) {
        let squareElement = square;

        if (typeof square === 'object') {
            square = squareElement.getAttribute('data-square');
        } else {
            squareElement = document.getElementById(square);
        }

        if (! (peace instanceof Peace) || ! square) {
            return false;
        }

        this.squares[square] = peace;

        peace.setSquare(square);

        let peaceFile = this.getPeaceFileByOrder(peace.getFile());

        const peaceElement = document.createElement('div');
        peaceElement.setAttribute('class',  'peace');
        peaceElement.setAttribute('data-peace', peace.name);
        peaceElement.setAttribute('data-file', peaceFile);

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
            } else if (element.hasAttribute('data-prom-peace')) {
                this.onPeacePromotion(element);
            } else {
                this.unsetSquares(element);
            }
        });
    }

    /**
     * On peace click.
     *
     * @param squareElement object
     * @return boolean
     */
    onPeaceClick(squareElement) {
        // if peace square is available it's a capture
        if (squareElement.getAttribute('data-available') === '1') {
            // if the king square is on check: do not take it
            if (squareElement.getAttribute('data-check') === '1') {
                return true;
            }

            this.onAvailableSquareClick(squareElement);

            return true;
        }

        let square = squareElement.getAttribute('data-square');

        // make available moves for the peace
        if (this.setActiveSquare(square, squareElement)) {
            this.setAvailableSquares();
        }

        return true;
    }

    /**
     * On available square click.
     *
     * @param targetSquareElement object
     */
    onAvailableSquareClick(targetSquareElement) {
        let targetSquare = targetSquareElement.getAttribute('data-square');

        if (this.activeSquare !== undefined && this.availableSquares.includes(targetSquare)) {
            this.unsetKingSquareCheck();

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
        let activePeace = this.getActivePeace();
        let targetPeace = this.getPeace(targetSquare);

        if (targetPeace instanceof King) {
            return false;
        }

        this.squares[this.activeSquare] = [];
        this.squares[targetSquare] = activePeace;

        activePeace.setSquare(targetSquare);

        if (! this.moveByOrder) {
            if (activePeace.side === 'white') {
                this.startTimer('black');
            } else {
                this.startTimer('white');
            }
        }

        this.prevSideMove = activePeace.side;

        chess.events.onTakeSquare(targetPeace, targetSquare);

        activePeace.onTakeSquare(this);

        if (targetPeace instanceof Peace) {
            this.updatePointsDiff();
        }

        this.capturePeaceElement(targetPeace, targetSquareElement)

        return true;
    }

    /**
     * On peace promotion click.
     *
     * @param peaceElement object
     */
    onPeacePromotion(peaceElement) {
        let peaceName = peaceElement.getAttribute('data-prom-peace');
        let promSquare = peaceElement.parentNode.getAttribute('data-prom-square');

        let peace = this.getPeace(promSquare);

        chess.addPeace(
            pawnPromotion.getPeaces(peace.side)[peaceName],
            document.querySelector(
                '#' + peaceElement.parentNode.getAttribute('data-prom-square')
            )
        );

        this.setBoardBgVisibility(0)

        chess.events.onPawnPromotion(peace, promSquare);

        document.getElementById('promotion').remove();
    }

    /**
     * Set active square.
     *
     * @param square string
     * @param squareElement object
     * @return boolean
     */
    setActiveSquare(square, squareElement) {
        // if the move order is enabled and trying to activate a same side peace
        if (this.moveByOrder && this.prevSideMove === this.getPeace(square).side) {
            return false;
        }

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
     * @return boolean
     */
    setAvailableSquares() {
        let peace = this.getActivePeace();

        if (peace instanceof King) {
            peace.safeMode = true;
        }

        let squares = peace.defineMoves(this);

        if (peace instanceof King) {
            peace.safeMode = false;
        }

        // if toggle click
        if (! squares.length
            || squares.every((el, index) => el === this.availableSquares[index])
        ) {
            this.unsetAvailableSquares();

            return false;
        }

        this.unsetAvailableSquares();

        this.availableSquares = squares;

        if (! (peace instanceof King)) {
            this.intersectAvailableAndCheckerSquares();
        }

        this.availableSquares.forEach(square => {
            const squareElement = document.getElementById(square);

            squareElement.setAttribute('data-available', 1);
        });

        return true;
    }

    /**
     * If the king peace is on the check, defend it from another peaces
     *
     * @return boolean
     */
    intersectAvailableAndCheckerSquares() {
        let checkerPeaces = this.imitateCheck();

        if (! checkerPeaces.length) {
            return false;
        }

        // remove all available squares rather than king cover squares
        for (let i = 0; i < checkerPeaces.length; i++) {
            this.availableSquares = this.availableSquares.filter(square => {
                return square === checkerPeaces[i].checkerPeace.getSquare()
                    || (checkerPeaces[i].checkerSquares.includes(square)
                        && ! (checkerPeaces[i].checkerPeace instanceof Knight)
                    )
            });
        }

        return true;
    }

    /**
     * Imitate king check from every peace.
     *
     * @return array
     */
    imitateCheck() {
        let checkerPeaces = [];

        let activePeace = this.getActivePeace();
        let activeSquare = this.getActiveSquare();

        if (! (activePeace instanceof King)) {
            // temporarily unset the active peace from the squares
            this.squares[activeSquare] = [];
        }

        // imitate check from every peace
        this.getSquares().forEach(square => {
            let peace = this.getPeace(square);

            if (peace instanceof Peace
                && peace.side !== activePeace.side
                && ! (peace instanceof King)
            ) {
                let checkObj = peace.check(this, peace, false);

                if (checkObj.length && checkObj[0].kingSquare) {
                    checkerPeaces.push(checkObj[0]);
                }
            }
        });

        // set back the original squares
        this.squares[activeSquare] = activePeace;

        return checkerPeaces;
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
     * Unset king square check.
     */
    unsetKingSquareCheck() {
        let kingSquare = document.querySelector('[data-check="1"]');

        if (kingSquare) {
            kingSquare.setAttribute('data-check', 0);
        }
    }

    /**
     * Update the difference of the captured peaces points.
     */
    updatePointsDiff() {
        const whitePointElement = document.querySelector('#captured-white .point');
        const blackPointElement = document.querySelector('#captured-black .point');

        let whitePoint = 0;
        let blackPoint = 0;

        this.getPeaces().filter(
            peace => peace instanceof Peace && peace.side === 'white'
        ).forEach(peace => {
            whitePoint += peace.point;
        });

        this.getPeaces().filter(
            peace => peace instanceof Peace && peace.side === 'black'
        ).forEach(peace => {
            blackPoint += peace.point;
        });

        let whitePointDiff = (blackPoint - whitePoint);
        let blackPointDiff = (whitePoint - blackPoint);

        whitePointElement.textContent = (Math.max(whitePointDiff, 0) ? '+' + whitePointDiff : '');
        blackPointElement.textContent = (Math.max(blackPointDiff, 0) ? '+' + blackPointDiff : '');
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
            this.collectCapturedPeaceElement(targetPeace, targetPeaceElement);
        }

        if (replaceWithActive) {
            const activePeaceElement = document.querySelector('#' + this.activeSquare + ' .peace');
            targetSquareElement.appendChild(activePeaceElement);
        }
    }

    /**
     * Collect the captured peace element.
     *
     * @param peace Peace
     * @param peaceElement object
     */
    collectCapturedPeaceElement(peace, peaceElement) {
        const capturedPeacesElement = document.querySelector(
            '#captured-' + peace.side + ' .' + peace.name + 's'
        );

        capturedPeacesElement.appendChild(peaceElement);
    }

    /**
     * Create a captured peaces element.
     *
     * @param side string
     * @param sideDef string
     * @return HTMLDivElement
     */
    createCapturedPeacesElement(side, sideDef) {
        const element = document.createElement('div');

        element.setAttribute('id', 'captured-' + side);
        element.setAttribute('class', 'captured-peaces ' + sideDef);

        let peaceNames = ['queens', 'rooks', 'bishops', 'knights', 'pawns'];

        peaceNames.forEach(name => {
            const peaceElement = document.createElement('div');
            peaceElement.setAttribute('class', 'peaces ' + name);

            element.appendChild(peaceElement);
        });

        const pointElement = document.createElement('div');

        pointElement.setAttribute('class', 'peaces point');

        sideDef === 'self' ? element.prepend(pointElement) : element.appendChild(pointElement);

        return element;
    }

    /**
     * Create a timer element.
     *
     * @return HTMLDivElement
     */
    createTimerElement() {
        const element = document.createElement('div');
        element.setAttribute('id', 'chess-timer');

        const whiteTimerElement = document.createElement('div');
        whiteTimerElement.setAttribute('id', 'white-timer')
        whiteTimerElement.setAttribute('class', 'chess-timer')
        whiteTimerElement.textContent = '00:00';

        const blackTimerElement = document.createElement('div');
        blackTimerElement.setAttribute('id', 'black-timer')
        blackTimerElement.setAttribute('class', 'chess-timer')
        blackTimerElement.textContent = '00:00';

        element.appendChild(whiteTimerElement);

        this.side === 'white'
            ? whiteTimerElement.before(blackTimerElement)
            : whiteTimerElement.after(blackTimerElement)

        return element;
    }

    /**
     * Set visibility of the board background.
     *
     * @param value integer
     */
    setBoardBgVisibility(value) {
        const chessBoardBg = document.getElementById('chessboard-bg');

        chessBoardBg.setAttribute('data-visible', parseInt(value));
        chessBoardBg.style.height = document.body.clientHeight + 'px';
    }

    /**
     * Get alphabet from square.
     *
     * @param square string
     * @return string
     */
    getSquareAlphabet(square) {
        if (square !== undefined) {
            return square.split('')[0];
        }

        return this.activeSquareAlphabet;
    }

    /**
     * Get number from square.
     *
     * @param square string
     * @return integer
     */
    getSquareNumber(square) {
        if (square !== undefined) {
            return parseInt(square.split('')[1]);
        }

        return this.activeSquareNumber;
    }

    /**
     * Get array key from the squares.
     *
     * @param square string
     * @param squares array|undefined
     * @return boolean|number
     */
    getSquaresArrayKey(square, squares = undefined) {
        if (square === undefined) {
            square = chess.activeSquare;
        }

        if (squares === undefined) {
            squares = this.getSquares();
        }

        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === square) {
                return i;
            }
        }

        return false;
    }
}
