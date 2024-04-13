import { body } from "express-validator";

const createAGroupChatValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Group name is required"),
    body("participants")
      .isArray({
        min: 2,
        max: 100,
      })
      .withMessage(
        "Participant array must be atleast of 2 members and atmost 100 members"
      ),
  ];
};

const updateGroupChatNameValidator = () => {
  return [body("name").trim().notEmpty().withMessage("Group Name is Required")];
};

export { createAGroupChatValidator, updateGroupChatNameValidator };
