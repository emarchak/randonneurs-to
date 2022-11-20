const fs = jest.createMockFromModule('fs');
const mockFiles = {
  './public/event': ''
}

fs.existsSync = (directoryPath) => mockFiles[directoryPath] || [];
fs.mkdirSync = jest.fn();
fs.writeFileSync = jest.fn();

module.exports = fs;
