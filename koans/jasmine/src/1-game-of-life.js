function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
  if (!isCellAlive && numberOfNeighbours === 3) {
    return true;
  }
  return numberOfNeighbours === 2 || numberOfNeighbours === 3;
}
