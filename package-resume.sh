yarn run build

# Vite tries to reference asset files from the site root. Since this resume is a child page (subdirectory)
# of the main site, this causes problems. Make the asset links relative to the 'current site directory' so
# the correct files are loaded when this project is used as a sub-page.
sed -i -e 's/\/assets/assets/g' ./dist/index.html

yarn run make-pdf

7z a -ttar resume.tar dist
7z a -tgzip resume.tar.gz resume.tar
rm resume.tar