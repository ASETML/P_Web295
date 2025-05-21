@echo off
cmd /k "code . && exit"
echo "Demarrage des serveurs"
echo "Demarrage du backend"
start cmd /k "cd backend/application && npm i && npm start"

echo "Demarrage du frontend"
start cmd /k "cd frontend/PassionLecture && npm i && npm run dev"

echo "Ouverture du repo et du projet"
start https://github.com/ASETML/P_Web295 && start https://github.com/users/ASETML/projects/7

echo "Ouverture du CDC"
start ./frontend/E-P_Web294-CDC.pdf

echo "Ouverture de Gitmoji"
start https://gitmoji.dev

echo "Ouverture de l'application"
start http://localhost:5173

echo "Prêt à travailler"
pause && exit