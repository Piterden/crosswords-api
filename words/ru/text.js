const fs = require('fs')

const list = []

fs.readdirSync('.').filter((file) => file.endsWith('json')).forEach((file) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const data = require(`./${file.replace('.json', '')}`)

  if (!Array.isArray(data)) {
    return
  }

  list.push(...data.map(({ answer }) => answer.toLowerCase()))
})

fs.writeFileSync('words.txt', list.sort().join('\n'))
