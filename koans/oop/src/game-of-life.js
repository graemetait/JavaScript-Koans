var SAMURAIPRINCIPLE = {};

(function() {
    SAMURAIPRINCIPLE.GameOfLife = function() {
        var cellMatrix = [];
        var neighbourCountMatrix = [];

        for (var i=0; i<9; i++) {
            cellMatrix[i] = new Array(9);
            neighbourCountMatrix[i] = new Array(9);
        }

        this.isCellAlive = function(x, y) {
            return cellMatrix[x][y] || false;
        };

        this.toggleCellState = function(x, y) {
            if (cellMatrix[x][y]) {
                cellMatrix[x][y] = false;
            } else {
                cellMatrix[x][y] = true;
            }
            return this;
        };

        this.tick = function() {
            for (var i=0; i<cellMatrix.length; i++) {
                for (var j=0; j<cellMatrix[i].length; j++) {
                    neighbourCountMatrix[i][j] = this.countNeighbours(i, j);
                }
            }

            for (var i=0; i<cellMatrix.length; i++) {
                for (var j=0; j<cellMatrix[i].length; j++) {
                    neighbourCount = neighbourCountMatrix[i][j];
                    if (cellMatrix[i][j]) {
                        if (neighbourCount < 2) {
                            cellMatrix[i][j] = false;
                        } else if (neighbourCount == 2 || neighbourCount == 3) {
                            cellMatrix[i][j] = true;
                        } else if (neighbourCount > 3) {
                            cellMatrix[i][j] = false;
                        }
                    } else {
                        if (neighbourCount == 3) {
                            cellMatrix[i][j] = true;
                        }
                    }

                }
            }
        };

        this.countNeighbours = function(x, y) {
            return [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].reduce(function (result, delta) {
                return result + (cellMatrix[x + delta[0]] && cellMatrix[x + delta[0]][y + delta[1]] ? 1 : 0);
            }, 0);
        };
    };
})();