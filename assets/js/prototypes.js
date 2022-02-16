/**
 * Pawn promotion peaces.
 *
 * @type object
 */
const pawnPromotion = {
    /**
     * Promotion peace names.
     *
     * @return array
     */
    getPeaceNames() {
        return ['queen', 'rook', 'bishop', 'knight'];
    },

    /**
     * Get promotion peaces.
     *
     * @param side string
     * @return object
     */
    getPeaces(side) {
        return {
            queen: new Queen(side),
            rook: new Rook(side),
            bishop: new Bishop(side),
            knight: new Knight(side)
        }
    },
}

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