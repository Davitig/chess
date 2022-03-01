class ChessEvent {
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
     * @param promPeace object
     * @param promSquare string
     */
    onPawnPromotion = (promPeace, promSquare) => {};

    /**
     * On timout.
     *
     * @param winnerSide string
     */
    onTimeout = winnerSide => {};
}
