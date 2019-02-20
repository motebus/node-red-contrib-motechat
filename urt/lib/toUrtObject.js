const string = require('lodash/string')

module.exports = (urtString) =>  {
    const [topic, to ] = string.split(urtString, '://', 2)
    return { topic, to }
}