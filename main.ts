import { DynamicTimeWarping } from "./src/DynamicTimeWarping";
import { MatrixHandler } from "./src/MatrixHandler";

class Main {
    public static main(): void {
        //const serie1 = [9, 93, 15, 19, 24];
        //const serie2 = [31, 97, 81, 82, 39];
        const serie1 = [1, 2, 4, 3, 5, 3, 2, 3, 2, 5];
        const serie2 = [1, 1, 2, 4, 3, 5, 3, 2, 3, 2];
        const dwt = new DynamicTimeWarping(serie1, serie2);

        console.log("Matriz de distância\n");
        MatrixHandler.printMatrix({
            matrix: dwt.getDistanceMatrix(),
            verticalSize: serie1.length,
            horizontalSize: serie2.length,
        });

        console.log("Matriz de caminho\n");
        MatrixHandler.printMatrix({
            matrix: dwt.getBestPathMatrix(),
            verticalSize: serie1.length,
            horizontalSize: serie2.length,
        });
    }
}

Main.main();
