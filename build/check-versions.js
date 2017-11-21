const { green, yellow, red } = require('chalk')
const { clean, satisfies } = require('semver')
const { engines } = require('../package.json')
const { which } = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: clean(process.version),
    versionRequirement: engines.node
  }
]

if (which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const { currentVersion, versionRequirement, name } = versionRequirements[i]
    if (!satisfies(currentVersion, versionRequirement)) {
      warnings.push(`${name}: ${red(currentVersion)} should be ${green(versionRequirement)}`)
    }
  }

  if (warnings.length) {
    console.log(yellow('\n  Please update the following packages:\n'))
    for (let i = 0; i < warnings.length; i++) {
      console.log('  ' + warnings[i])
    }
    console.log()
    process.exit(1)
  }
}
