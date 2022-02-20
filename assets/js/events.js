class ChessEvents {
    /**
     * On checkmate.
     *
     * @param checkerPeace object
     */
    onCheckmate = function (checkerPeace) {}

    /**
     * On take square.
     *
     * @param checkerPeaces array
     */
    onCheck = function (checkerPeaces) {};

    /**
     * On take square.
     *
     * @param square string
     * @param peace object|array
     */
    onTakeSquare = function (square, peace) {};

    /**
     * On pawn promotion.
     *
     * @param peace object
     * @param square string
     */
    onPawnPromotion = function (peace, square) {};
}
