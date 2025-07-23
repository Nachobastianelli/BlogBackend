import { getCurrentFormattedDate } from "../utils/date";
import { logger } from "../utils/logger";
import { appEvents } from "./events";

//escuchar evento de cuando se crea un nuevo usuario
appEvents.on("userCreated", (user) => {
  const now = getCurrentFormattedDate(); // fecha y hora local legible
  logger.info(`Se creo un nuevo usuario: ${user.mail} a las: ${now}`);
});

//evento que escucha cuando se crea un nuevo articulo
appEvents.on("postCreated", (post) => {
  const now = getCurrentFormattedDate(); // fecha y hora local legible
  logger.info(`Se creo un nuevo articulo ${post.title} a las: ${now}`);
});

appEvents.on("mandarMails", (subscribers, content) => {
  //Funcion para llamar al gateway de emails
});
