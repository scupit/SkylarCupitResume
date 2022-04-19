# Skylar Cupit Resume

My resume, written as a single web page. The finished product can be viewed at
[skylarcupit.com/resume](https://skylarcupit.com/resume/)

## Before building

Run `npm install` to install all needed dependencies.

## Running and Packaging

> NOTE: Packaging this site with the provided scripts requires [7Zip](https://www.7-zip.org/) and *npm* to be
> installed and available on the system PATH.

`npm run dev` starts a local dev server on port 3000.

`./package-resume.sh` or `./package-resume.ps1` will make a production build of the site, then package
the output *dist* directory into *resume.tar.gz*. Make sure to run scripts from the project root.
