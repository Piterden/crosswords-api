const { all } = require('./grids')
const { find } = require('./clues')
const { count, suggestions } = require('./words')

module.exports = {
  getAllGrids: all,
  getCluesByWord: find,
  getCountByMask: count,
  getSuggestionsByMask: suggestions,
}
