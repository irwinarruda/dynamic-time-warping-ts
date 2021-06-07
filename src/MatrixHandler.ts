export interface IPrintMatrixDTO {
    matrix: Array<Array<number>>;
    verticalSize: number;
    horizontalSize: number;
}

export class MatrixHandler {
    public static printMatrix({
        matrix,
        verticalSize,
        horizontalSize,
    }: IPrintMatrixDTO): void {
        let i, j;
        for (i = 0; i < verticalSize; i++) {
            for (j = 0; j < horizontalSize - 1; j++) {
                process.stdout.write(`${matrix[i][j]} `);
            }
            process.stdout.write(`${matrix[i][j]}\n`);
        }
    }
}
