# RC+S Frontend - Brown University

This README outlines the details of collaborating on this Ember-electron application.

RC+S user-facing app. The main goals of this app is to give RC+S patients a way
to monitor the status of their implanted device, start-stop recording, find help information.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/neuromotion/rcps-ember-electron.git` this repository
* `cd rcps-ember-electron`
* `npm install`

**NOTE**: Currently you need to comment out line 105 of `node_modules/electron-forge/dist/api/start.js` to get `electron ember` working as rebuilding fails.  There is a similar line in the `package.js` (198) file of the same path that also needs to be commented out.

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Committing

Please, use commitizen for your commit messages. You can find the instructions [here for the JavaScript package](http://commitizen.github.io/cz-cli/) or [here for the Python package](https://pypi.org/project/commitizen/)

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Electron

This app is built for Electron and uses the ember-electron add-on. The following documentation is from their website.
`ember electron`
Run your project in development mode. This works pretty much like ember serve except it runs in Electron. We install the Ember Inspector and Devtron for you, so just use the Developer Tools as you would in your browser. Please note that we do not restart Electron yet when you change code there.

`ember electron:test`
Test your app in Electron. Supports live reloading using the --server flag.

`ember electron:package`
Creates binaries or your app using electron-forge and electron-packager in the background. Options can be specified in ember-electron/electron-forge-config.js.

`ember electron:make`
Creates installers and distribution bundles. For Windows, that means a Squirrel Installer and a Windows Store Package; for macOS, zip/dmg files and a Mac App Store Package, while Linux users enjoy the creation of deb, rpm, and flatpak files. Again, options can be specified in ember-electron/electron-forge-config.js.

`ember electron:assemble`
Assemble Electron application project (useful for debugging builds). For more information, check out the guide on the build pipeline.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
