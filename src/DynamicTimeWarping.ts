type numArr = Array<number>;

export class DynamicTimeWarping {
    private readonly maxNumber = Number.MAX_VALUE;
    private timeSeries1: numArr;
    private timeSeries2: numArr;
    private distanceMatrix: Array<numArr> | null;
    private pathMatrix: Array<numArr> | null;

    constructor(ts1: numArr, ts2: numArr) {
        this.timeSeries1 = ts1;
        this.timeSeries2 = ts2;
        this.distanceMatrix = null;
        this.pathMatrix = null;
    }

    private calculateDistance = (num1: number, num2: number): number => {
        return Math.abs(num1 - num2);
    };

    private createMatrix = (n: number, m: number): Array<numArr> => {
        let matrix: Array<numArr> = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = new Array();
            for (let j = 0; j < m; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    };

    public getDistanceMatrix = () => {
        this.distanceMatrix = [];
        const timeSeries1Length = this.timeSeries1.length;
        const timeSeries2Length = this.timeSeries2.length;

        let i, j;
        var cost;
        for (i = 0; i < timeSeries1Length; i++) {
            this.distanceMatrix[i] = new Array();
            for (j = 0; j < timeSeries2Length; j++) {
                cost = this.maxNumber;
                if (i === 0) {
                    cost = 0;
                    if (j !== 0) {
                        cost = Math.min(cost, this.distanceMatrix[i][j - 1]);
                    }
                } else {
                    cost = Math.min(cost, this.distanceMatrix[i - 1][j]);
                    if (j !== 0) {
                        cost = Math.min(cost, this.distanceMatrix[i][j - 1]);
                        cost = Math.min(
                            cost,
                            this.distanceMatrix[i - 1][j - 1]
                        );
                    }
                }
                this.distanceMatrix[i][j] =
                    this.calculateDistance(
                        this.timeSeries1[i],
                        this.timeSeries2[j]
                    ) + cost;
            }
        }
        return this.distanceMatrix;
    };

    public getBestPathMatrix = (): Array<numArr> => {
        if (this.distanceMatrix === null) {
            this.getDistanceMatrix();
        }
        const timeSeries1Length = this.timeSeries1.length;
        const timeSeries2Length = this.timeSeries2.length;
        this.pathMatrix = this.createMatrix(
            timeSeries1Length,
            timeSeries2Length
        );

        let i = timeSeries1Length - 1,
            j = timeSeries2Length - 1;

        this.pathMatrix[i][j] = 1;
        while (i !== 0 || j !== 0) {
            if (i === 0) {
                j = j - 1;
            } else if (j === 0) {
                i = i - 1;
            } else {
                let minDistance = Math.min(
                    this.distanceMatrix![i - 1][j - 1],
                    this.distanceMatrix![i - 1][j],
                    this.distanceMatrix![i][j - 1]
                );
                switch (minDistance) {
                    case this.distanceMatrix![i - 1][j - 1]:
                        i = i - 1;
                        j = j - 1;
                        break;
                    case this.distanceMatrix![i - 1][j]:
                        i = i - 1;
                        break;
                    case this.distanceMatrix![i][j - 1]:
                        j = j - 1;
                        break;
                }
            }
            this.pathMatrix[i][j] = 1;
        }
        return this.pathMatrix;
    };
}
