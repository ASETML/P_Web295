@echo off
cmd /k "code . && exit"
echo "Demarrage des serveurs"
start cmd /k "cd backend/application && npm i && npm start"
echo "Demarrage du backend"
start cmd /k "cd frontend/PassionLecture && npm i && npm run dev"
echo "Demarrage du frontend"

start ./frontend/E-P_Web294-CDC.pdf
exit