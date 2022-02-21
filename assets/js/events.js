class ChessEvents {
    /**
     * On checkmate.
     *
     * @param checkerPeace object
     */
    onCheckmate = checkerPeace => {}

    /**
     * On take square.
     *
     * @param checkerPeaces array
     */
    onCheck = checkerPeaces => {};

    /**
     * On take square.
     *
     * @param peace object|array
     * @param square string
     */
    onTakeSquare = (peace, square) => {};

    /**
     * On pawn promotion.
     *
     * @param peace object
     * @param square string
     */
    onPawnPromotion = (peace, square) => {};

    /**
     * On timout.
     *
     * @param side string
     */
    onTimeout = side => {};
}
