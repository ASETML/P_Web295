import jwt from "jsonwebtoken";
import { privateKey } from "../config.mjs";
import cookieParser from "cookie-parser";
const auth = (req, res, next) => {
  const authorizationHeader = req.cookies["authcookie"];
  //const authorizationHeader = req.headers.authorization;
  //console.log(req.headers.authorization);
  console.log(req.cookies["authcookie"]);
  if (!authorizationHeader) {
    const message = `vous n'avez pas fourni de jeton d'authentification`;
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader;
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        if (error) {
          const message = `l'utilisateur n'est pas autorisé a cette ressource`;
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;
        if (req.body.utilisateurId && req.body.utilisateurId !== userId) {
          const message = `l'identifiant de l'utilisateur est invalide`;
          res.status(401).json({ message });
        } else {
          next();
        }
      }
    );
  }
};
export { auth };
