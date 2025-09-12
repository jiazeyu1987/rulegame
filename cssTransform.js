// CSS module transformer for Jest
module.exports = {
  process(src, filename) {
    return {
      code: `module.exports = new Proxy({}, {
        get: function(target, prop) {
          return String(prop);
        }
      });`,
    };
  },
};