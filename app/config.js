const yaml = require('js-yaml')
const fs = require('fs')

let fileContents = fs.readFileSync('./settings.yml', 'utf8')
let data = yaml.safeLoad(fileContents)

module.exports = data