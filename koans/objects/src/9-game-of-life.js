var SAMURAIPRINCIPLE = {};
SAMURAIPRINCIPLE.cell = {
  'true': {
    '2': true,
    '3': true,
  },
  'false': {
    '3': true,
  }
};
SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
  return SAMURAIPRINCIPLE.cell[isCellAlive].hasOwnProperty(numberOfNeighbours);
};
