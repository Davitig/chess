/**
 * En passant container.
 *
 * @type object
 */
const enPassant = {
    /**
     * List of pawns which has an en passant pawns.
     *
     * @type array
     */
    pawns: [],

    /**
     * Set pawn which has an en passant pawn.
     *
     * @param pawn object
     */
    set(pawn) {
        if (pawn instanceof Pawn) {
            this.pawns.push(pawn);
        }
    },

    /**
     * Clear pawns with its en passant pawn.
     */
    clear() {
        this.pawns.forEach(pawn => {
            pawn.enPassant = {};
        });

        this.pawns = [];
    }
}