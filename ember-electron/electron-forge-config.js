const path = require('path');
const rootPath = path.join('./');

module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "zip"
    ],
    "linux": [
      "deb",
      "rpm"
    ]
  },
  "electronPackagerConfig": {
    "packageManager": "npm",
    icon: path.join(rootPath, 'ember-electron', 'resources', 'icons', 'icon')
  },
  "electronWinstallerConfig": {
    "name": "rcps_ember"
  },
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {
    "owner": "",
    "name": ""
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "rcpsember"
  }
};
