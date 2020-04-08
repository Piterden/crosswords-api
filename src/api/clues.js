module.exports = {
  /**
   * Searches for all the clues for given word.
   *
   * @route /crossword/clues/find/:word
   * @param {Express} app The application
   * @return {void}
   */
  find: (app) => async (request, response) => {
    const database = app.get('db')
    const result = await database('words_ru')
      .select([
        'clues_ru.id',
        'name',
      ])
      .where('word', request.params.word)
      .innerJoin(
        'clues_ru',
        'words_ru.id',
        '=',
        'clues_ru.word_id',
      )

    response.json({
      word: request.params.word,
      clues: result,
    })
    response.end()
  },
}
