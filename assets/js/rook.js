class Rook {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "rook"

    /**
     * Indicates whether the peace is white or black.
     *
     * @type string
     */
    side;

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_rook'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_rook'
    }

    /**
     * Create a new rook.
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
}
