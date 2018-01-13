import { bold, green, red } from 'chalk'

import { seekDiffs } from './utils'
import { SUPPORTED_LANGUAGES } from '../src/constants'
import english from '../src/locales/en'

let languagesMissingKeys = false

console.log()

// Remove English
SUPPORTED_LANGUAGES.splice(SUPPORTED_LANGUAGES.indexOf('en'), 1)
SUPPORTED_LANGUAGES.sort().forEach(language => {
  const locale = require(`../src/locales/${language}`).default
  const missing = seekDiffs(english, locale)

  if (missing.length > 0) {
    languagesMissingKeys = true
    const messageBadge = bold.bgRed(` ${language.toUpperCase()} `)
    const messageText = red(`${locale.lang} is missing the following keys:`)
    console.log(`  ${messageBadge} ${messageText}\n`)
  }

  missing.forEach(string => {
    const path = string.join`.`
    console.log(`  ${path}`)
  })

  if (missing.length > 0) console.log()
})

if (!languagesMissingKeys) {
  const messageBadge = bold.bgGreen(` OK `)
  const messageText = green(`No languages are missing keys`)
  console.log(`  ${messageBadge} ${messageText}\n`)
}
