/**
 *
 * @param {(req: import("express").Request, res:import("express").Response, next:import("express").NextFunction) => void} requestHandler
 */

const asyncHandler = async (handlingcontroller) => {
  return (req, res, next) => {
    Promise.resolve(handlingcontroller(req, res, next)).catch((err) =>
      next(err)
    );
  };
};

export { asyncHandler };
