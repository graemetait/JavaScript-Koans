var SAMURAIPRINCIPLE = {};
SAMURAIPRINCIPLE.cell = {
  'true': {
    '0': false,
    '1': false,
    '2': true,
    '3': true,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
  },
  'false': {
    '3': true,
    '2': false,
    '4': false,
  }
};
SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
  return SAMURAIPRINCIPLE.cell[isCellAlive][numberOfNeighbours];
};
