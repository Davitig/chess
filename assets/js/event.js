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
     */
    onCheck = checkerPeaces => {};

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
