class Knight {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "knight"

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
        file: {
            right: 'w_knight_r',
            left: 'w_knight_l'
        }
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: {
            right: 'b_knight_r',
            left: 'b_knight_l'
        }
    }

    /**
     * Create a new knight.
     *
     * @param side string
     */
    constructor(side) {
        this.side = side;
    }

    /**
     * Get the peace file.
     *
     * @return object
     */
    getFile() {
        return this[this.side].file;
    }
}
