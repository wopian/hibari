export const DEFAULT_LANGUAGE = 'en'
export const FALLBACK_LANGUAGE = DEFAULT_LANGUAGE

export const SUPPORTED_LANGUAGES = ['ja', 'nl', 'es']

// Alpabetically sort with English as first option
SUPPORTED_LANGUAGES.sort((a, b) => a.localeCompare(b)).unshift(DEFAULT_LANGUAGE)
