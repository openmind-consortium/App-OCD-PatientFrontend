const path = require('path');
const rootPath = path.join('./');

module.exports = {
  "packagerConfig": {
    "ignore": [
      "/ember-test(/|$)",
      "/tests(/|$)"
    ],
    icon: path.join(rootPath, 'resources', 'icons', 'icon')
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "rcps_ember"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
};
