module.exports = {
  /**
   * Get count of suggestions by mask.
   *
   * @route /crossword/words/count/:word
   * @param {Express} app The application
   * @return {void}
   */
  count: (app) => async (request, response) => {
    const database = app.get('db')
    const result = await database('words_ru')
      .where('word', 'like', request.params.word)
      .count('* as count')

    response.json(result[0])
    response.end()
  },

  /**
   * Get suggestions by mask.
   *
   * @route /crossword/words/find/:word
   * @param {Express} app The application
   * @return {void}
   */
  suggestions: (app) => async (request, response) => {
    const database = app.get('db')
    const words = await database('words_ru')
      .select(['id', 'word'])
      .where('word', 'like', request.params.word)

    response.json({ words })
    response.end()
  },
}
