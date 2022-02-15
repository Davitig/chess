class Peace {
    /**
     * Indicates whether the peace is white or black.
     *
     * @type string
     */
    side;

    /**
     * Create a new bishop.
     *
     * @param side string
     */
    constructor(side) {
        this.side = side;
    }

    /**
     * Get the peace file.
     *
     * @return string
     */
    getFile() {
        return this[this.side].file;
    }

    /**
     * Invoke on take square.
     *
     * @param chess object
     * @param targetSquare string
     */
    onTakeSquare(chess, targetSquare) {}
}