const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');

const roles = new Map(
  JSON.parse(
    fs.readFileSync(ROLES_FILE, 'utf8').trim()
  ).map(r => [r.role, r.scopes])
);

module.exports = scope => {
  const [scopeName, actionName] = scope.split('.');

  return (req, res, next) => {
    const role = String(req.get('x-role') || '').trim();
    const scopes = roles.get(role);

    if (scopes && scopes[scopeName] && scopes[scopeName].includes(actionName)) {
      return next();
    }

    return res.status(403).send();
  };
};
