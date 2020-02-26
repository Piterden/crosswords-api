const { find } = require('./clues')
const { all, save } = require('./grids')
const { count, suggestions } = require('./words')

module.exports = {
  saveGrid: save,
  getAllGrids: all,
  getCluesByWord: find,
  getCountByMask: count,
  getSuggestionsByMask: suggestions,
}
