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

  /**
   * Save a grid to the DB
   *
   * @param {Express} app The application
   * @return {void}
   */
  save: (app) => async (request, response) => {
    const database = app.get('db')
    const id = await database('grids')
      .insert({
        name: request.body.name,
        description: request.body.description,
        blanks: request.body.blanks,
        width: request.body.width,
        height: request.body.height,
      })
      .returning('id')
    const grid = await database('grids')
      .select('*')
      .where('id', id)
      .first()

    response.json({
      success: true,
      data: { grid },
    })
    response.end()
  },
}
