const { buildCard } = require('./buildCard')

const formEncode = data => Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(
        typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
          ))
      .join("&")

module.exports = { formEncode, buildCard }
