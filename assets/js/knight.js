class Knight extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "knight"

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
}
