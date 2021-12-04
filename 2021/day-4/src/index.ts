import { readFileSync } from "fs";

function getInput(filepath: string): [number[], number[][][]] {
    const input: string = readFileSync(filepath, "utf8");
    const chunks: string[] = input.split("\n\n");

    const drawnNumbers = chunks.shift() as string;
    const boards = chunks;

    return [parseDrawnNumbers(drawnNumbers), boards.map(board => parseBoard(board))]
}

function parseBoard(str: string): number[][] {
    return str
        .split("\n")
        .map(line => line.split(" ").filter(x => x?.length).map(val => parseInt(val, 10)))
        .filter(x => x)
}

function parseDrawnNumbers(str: string): number[] {
    return str.split(",").map(str => parseInt(str, 10));
}

class Board {
    private board: number[][];
    private markedBoard: boolean[][];
    public won: boolean;

    constructor(board: number[][]) {
        this.board = board;
        this.markedBoard = [];
        this.won = false;

        for (let i = 0; i < this.board.length; ++i) {
            this.markedBoard.push([]);
            for (let j = 0; j < this.board[i].length; ++j) {
                this.markedBoard[i].push(false);
            }
        }
    }

    markNumber(num: number): void {
        for (let i = 0; i < this.board.length; ++i) {
            const boardLine = this.board[i];
            for (let j = 0; j < boardLine.length; ++j) {
                if (num === boardLine[j]) {
                    this.markedBoard[i][j] = true;
                }
            }
        }
    }

    isWinner(): boolean {
        for (let i = 0; i < this.markedBoard.length; ++i) {
            if (this.#checkRow(this.markedBoard[i])) {
                this.won = true;
                return true;
            }
        }

        for (let i = 0; i < this.markedBoard.length; ++i) {
            if (this.#checkColumn(i)) {
                this.won = true;
                return true;
            }
        }
        return false;
    }

    #checkRow(row: boolean[]): boolean {
        return row.every(x => x === true);
    }

    #checkColumn(index: number): boolean {
        return this.markedBoard.map(line => line[index]).every(x => x === true);
    }

    getScore(drawnNumber: number): number {
        let sumOfUnmarked = 0;
        for (let i = 0; i < this.board.length; ++i) {
            for (let j = 0; j < this.board[i].length; ++j) {
                if (!this.markedBoard[i][j]) {
                    sumOfUnmarked += this.board[i][j];
                }
            }
        }
        return drawnNumber * sumOfUnmarked;
    }
    
    getBoardMarked() {
        return this.markedBoard;
    }
}

(function main() {
    const [drawnNumbers, rawBoards] = getInput("./input.txt");
    const boards = rawBoards.map((board) => new Board(board));
    console.log(drawnNumbers)

    for (const drawnNumber of drawnNumbers) {
        boards.forEach((board, index) => {
            if (board.won) {
                return;
            }
            board.markNumber(drawnNumber);
            if (board.isWinner()) {
                console.log("Board", index + 1, "ganhou com", board.getScore(drawnNumber), "ao tirar o número", drawnNumber);

                let str = "";
                const marked = board.getBoardMarked();
                for (let i = 0; i < marked.length; ++i) {
                    for (let j = 0; j < marked[i].length; ++j) {
                        str += (marked[i][j]) ? 1 : 0;
                    }
                    str += "\n";
                }
                console.log(str);
            }
        });
    }
})();
