module.exports = require('./gatsby/browser');
const { QueryClientProvider } = require('react-query')

exports.wrapRootElement = ({ element }) =>  (
  <QueryClientProvider>
    { element }
  </QueryClientProvider>
)
