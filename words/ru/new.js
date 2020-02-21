const fs = require('fs')

console.time('run')

let wordsSql = `-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: crossword
-- ------------------------------------------------------
-- Server version   5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table \`default_crosswords_words_ru\`
--

DROP TABLE IF EXISTS \`default_crosswords_words_ru\`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE \`default_crosswords_words_ru\` (
  \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
  \`sort_order\` int(11) DEFAULT NULL,
  \`created_at\` datetime NOT NULL,
  \`created_by_id\` int(11) DEFAULT NULL,
  \`updated_at\` datetime DEFAULT NULL,
  \`updated_by_id\` int(11) DEFAULT NULL,
  \`word\` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT={INCR_FOR_PASTE} DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`default_crosswords_words_ru\`
--

LOCK TABLES \`default_crosswords_words_ru\` WRITE;
/*!40000 ALTER TABLE \`default_crosswords_words_ru\` DISABLE KEYS */;
INSERT INTO \`default_crosswords_words_ru\` VALUES `

let wordId = 1

fs.readdirSync('.').filter((file) => file.endsWith('json')).forEach((file) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const data = require(`./${file.replace('.json', '')}`)

  if (!Array.isArray(data)) {
    return
  }

  data.forEach((word) => {
    wordsSql += `(${wordId},${wordId},'2019-01-06 08:48:01',NULL,'2019-01-06 08:48:01',NULL,'${word.answer}')`
    wordsSql += wordId % 4000 === 0
      ? `;
INSERT INTO \`default_crosswords_words_ru\` VALUES `
      : ','
    wordId++
  })
})

wordsSql = wordsSql.replace(/,$/, '').replace('{INCR_FOR_PASTE}', wordId)

wordsSql += `;
/*!40000 ALTER TABLE \`default_crosswords_words_ru\` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-11  0:34:35
`

fs.writeFileSync('words_new.sql', wordsSql)

console.log(`Was wrote ${wordId} entries.`)
console.timeEnd('run')
