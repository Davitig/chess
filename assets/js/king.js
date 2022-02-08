class King {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "king"

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
        file: 'w_king'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_king'
    }

    /**
     * Create a new king.
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
