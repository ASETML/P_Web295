import jwt from "jsonwebtoken";
import { privateKey } from "../config.mjs";

const auth = (req, res, next) => {
  const authorizationHeader = req.header.authorization;
  if (!authorizationHeader) {
    const message = `vous n'avez pas fourni de jeton d'authentification`;
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        //verifie que l'utilisateur a pas falcifié son droit admin
        if (req.body.admin === true && decodedToken.admin === false) {
          const message = `vous n'etes pas admin !`;
          res.status(401).json(message);
        }
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
