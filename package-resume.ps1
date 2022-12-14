yarn run build

# Vite tries to reference asset files from the site root. Since this resume is a child page (subdirectory)
# of the main site, this causes problems. Make the asset links relative to the 'current site directory' so
# the correct files are loaded when this project is used as a sub-page.
(Get-Content .\dist\index.html) -replace '/assets','assets' | Set-Content .\dist\index.html -Force

yarn run make-pdf

7z a -ttar resume.tar dist
7z a -tgzip resume.tar.gz resume.tar
Remove-Item resume.tar