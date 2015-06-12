/*global jQuery*/
var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};
SAMURAIPRINCIPLE.GameOfLife = function () {
	'use strict';
	var self = this,
		isAlive = {},
		cellKey = function (row, column) {
			return row + '_' + column;
		};
	SAMURAIPRINCIPLE.eventDispatcher(self);
	this.isCellAlive = function (row, column) {
		return isAlive[cellKey(row, column)] || false;
	};
	this.toggleCellState = function (row, column) {
		var key = cellKey(row, column);
		if (isAlive[key]) {
			delete isAlive[key];
		} else {
			isAlive[key] = true;
		}
		this.dispatchEvent('cellStateChanged', row, column, this.isCellAlive(row, column));
		return this;
	};
	this.tick = function () {
		var key, parts, row, column, numberOfNeighbours = {}, neighbourKey;
		for (key in isAlive) {
			parts = key.split('_');
			row = parseInt(parts[0], 10);
			column = parseInt(parts[1], 10);
			numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
			[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
				neighbourKey = cellKey(row + offset[0], column + offset[1]);
				numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
			});
		}
		for (key in numberOfNeighbours) {
			if (isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !isAlive[key] && numberOfNeighbours[key] === 3) {
				parts = key.split('_');
				row = parseInt(parts[0], 10);
				column = parseInt(parts[1], 10);
				self.toggleCellState(row, column);
			}
		}
	};
};

jQuery.fn.extend({
	gameOfLifeWidget: function (gameOfLife, rows, columns, animationDuration) {
		'use strict';
		return this.each(function () {
			var rootElement = jQuery(this);
			// rootElement.find('td').click(gameOfLife.toggleCellState.bind(gameOfLife, 3, 4));
			rootElement.find('td').each(function(index, td) {
				// console.log(index, td);
				var column = index % rows,
					row = Math.floor(index / columns);
				jQuery(td).click(gameOfLife.toggleCellState.bind(gameOfLife, row, column))
			});
			rootElement.find('.tick').click(gameOfLife.tick);
			gameOfLife.addEventListener('cellStateChanged', function(row, column, isAlive) {
				var x = row+1,
					y = column+1,
					element = rootElement.find('.grid tr:nth-child('+x+') td:nth-child('+y+')');
				element[isAlive ? 'addClass' : 'removeClass']('alive', animationDuration || 0);
			});
		});


	}
});
