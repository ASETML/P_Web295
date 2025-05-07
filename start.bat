@echo off
echo "Demarrage des serveurs"
start cmd /k "cd backend/application && npm i && npm start"
echo "Demarrage du backend"
start cmd /k "cd frontend/PassionLecture && npm i && npm run dev"
echo "Demarrage du frontend"
pause
exit