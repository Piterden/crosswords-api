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
    const result = await database('default_crosswords_words')
      .select([
        'default_repeater_clues.id',
        'name',
      ])
      .where('word', request.params.word)
      .innerJoin(
        'default_repeater_clues',
        'default_crosswords_words.id',
        '=',
        'default_repeater_clues.word_id'
      )

    response.json({
      word: request.params.word,
      clues: result,
    })
    response.end()
  },
}
