module.exports = {
  /**
   * Get all grids list
   *
   * @route /crossword/grids
   * @param {Express} app The application
   * @return {void}
   */
  all: (app) => async (request, response) => {
    const database = app.get('db')
    const result = await database('grids')
      .select(['id', 'name', 'description', 'blanks', 'width', 'height'])

    response.json(result)
    response.end()
  },
}
