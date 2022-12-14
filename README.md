# Skylar Cupit Resume

My resume, written as a single web page. The finished product can be viewed at
[skylarcupit.com/resume](https://skylarcupit.com/resume/)

## Requirements

- [Yarn](https://yarnpkg.com/getting-started/install), ideally Yarn 3 or higher.
- [7Zip](https://www.7-zip.org/) is only required when running the site packager scripts.

## Initial Setup

1. `git clone git@github.com:scupit/SkylarCupitResume.git`
2. `cd SkylarCupitResume`
3. Run `yarn install` to install all needed dependencies.
4. Run the correct [editor setup command](https://yarnpkg.com/getting-started/editor-sdks). For VSCode, `yarn sdks vscode` is what you want.

## Build and Run

`yarn run dev` starts a local dev server on port 3000.

## Production Build

1. Make sure both [7Zip](https://www.7-zip.org/) and [Yarn](https://yarnpkg.com/getting-started/install)
  are available.
2. **With the project root as the current working directory**, run `./package-resume.ps1`
  (Windows + PowerShell) or `./package-resume.sh` (everywhere else).

Upon success, the final build will be in the *dist/* directory, and will be compressed into
*resume.tar.gz* in the project root.
