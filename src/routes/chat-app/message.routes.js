import { Router } from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../../controllers/chat-app/message.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { sendMessageValidator } from "../../validators/apps/chat-app/message.validator.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validator.js";
import { validate } from "../../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/:chatId")
  .get(mongoIdPathVariableValidator("chatId"), validate, getAllMessages)
  .post(
    upload.fields([{ name: "attachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),
    validate,
    sendMessage
  );
router
  .route("/:chatId/:messageId/:attachmentId")
  .delete(
    mongoIdPathVariableValidator("chatId"),
    mongoIdPathVariableValidator("messageId"),
    mongoIdPathVariableValidator("attachmentId"),
    validate,
    deleteMessage
  );

export default router;
