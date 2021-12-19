const fs = require("fs");

function main() {
    const parsedLines = lines(readFile("./input.txt")).map((line) => parseLine(line)).map(([from, to]) => ({ from, to }));
    const maxX = Math.max(Math.max(...parsedLines.map((l) => l.from.x)), Math.max(...parsedLines.map((l) => l.to.x)));
    const maxY = Math.max(Math.max(...parsedLines.map((l) => l.from.y)), Math.max(...parsedLines.map((l) => l.to.y)));

    const matrix = createMatrix(maxX + 1, maxY + 1, 0);

    parsedLines.forEach((line) => {
        applyLine(matrix, line);
    });

    let sum = 0;
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            if (matrix[i][j] >= 2) {
                sum += 1;
            }
        }
    }
    console.log(sum);
}

function applyLine(matrix, { from, to }) {
    if (from.x === to.x) {
        const x = from.x;

        const start = Math.min(from.y, to.y);
        const end = Math.max(from.y, to.y);

        for (let i = start; i <= end; i++) {
            applyCell(matrix, x, i);
        }
        return;
    }
    if (from.y === to.y) {
        const y = from.y;

        const start = Math.min(from.x, to.x);
        const end = Math.max(from.x, to.x);

        for (let i = start; i <= end; i++) {
            applyCell(matrix, i, y);
        }
        return;
    }

    function minX(a, b) {
        return (a.x < b.x) ? a : b;
    }

    function maxX(a, b) {
        return (a.x > b.x) ? a : b;
    }

    const start = minX(from, to);
    const end = maxX(from, to);

    const coef  = (start.y < end.y) ? 1 : -1;

    let j = start.y;
    for (let i = start.x; i <= end.x; ++i) {
        applyCell(matrix, i, j);
        j += coef;
    }
}

function applyCell(matrix, x, y) {
    matrix[y][x]++;
}

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; ++i) {
        console.log(matrix[i].join("").replaceAll("0", "."));
    }
}

function createMatrix(x, y, initialValue) {
    const matrix = [];
    for (let i = 0; i < x; ++i) {
        matrix.push([]);
        for (let j = 0; j < y; ++j) {
            matrix[i].push(initialValue);
        }
    }
    return matrix;
}

function readFile(filepath) {
    return fs.readFileSync(filepath, "utf8");
}

function lines(str) {
    return str.split("\n");
}

function parseLine(line) {
    return line.split("->").map((chunk) => chunk.trim()).map((chunk) => parseCoordinate(chunk));
}

function parseCoordinate(coordinateStr) {
    const [x, y] = coordinateStr.split(",").map((coordinateValue) => parseInt(coordinateValue, 10));
    return {x, y};
}

main();
