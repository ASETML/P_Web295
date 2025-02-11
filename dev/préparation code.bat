

set "NODEJS_PATH=C:\Program Files\nodejs"

set "PATH=%NODEJS_PATH%;%PATH%"

set /p chemin=<input.txt
start cmd /k "cd /d %chemin% && code . && npm i && npm run antoine"

::start http://localhost:3000 changer le 3000 par le port de votre serveur

exit