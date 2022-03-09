class ChessEvent {
    /**
     * On checkmate.
     *
     * @param {Peace} checkerPeace
     */
    onCheckmate = checkerPeace => {}

    /**
     * On take square.
     *
     * @param {array} checkerPeaces
     * @param {string} side
     */
    onCheck = (checkerPeaces, side) => {};

    /**
     * On take square.
     *
     * @param {Peace|array} peace
     * @param {string} square
     */
    onTakeSquare = (peace, square) => {};

    /**
     * On pawn promotion.
     *
     * @param {Peace} promPeace
     * @param {string} promSquare
     */
    onPawnPromotion = (promPeace, promSquare) => {};

    /**
     * On timout.
     *
     * @param {string} winnerSide
     */
    onTimeout = winnerSide => {};
}
