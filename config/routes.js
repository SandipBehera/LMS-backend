const Express = require("express");
const router = Express.Router();

const BookController = require("../controller/book.controller");
const userController = require("../controller/user.controller");
const locationController = require("../controller/location.controller");

router.get("/users/:userId/campus/:campus_name", userController.users);

router.post("/create-book-category", BookController.CreateBookCategory);
router.get(
  "/get-all-book-categories/:branch_id",
  BookController.GetAllBookCategories
);
router.post("/get-book-category/:id", BookController.GetBookCategory);
router.put("/update-book-category/:id", BookController.UpdateBookCategory);
router.post("/upload-bulk-category", BookController.UploadBulkCategory);

router.post("/create-book-location", locationController.AddLocation);
router.get("/get-all-locations/:branch_id", locationController.GetBookLocation);
router.get("/get-blocks/:branch_id", locationController.GetLocations);
router.put("/update-book-location/:id", locationController.UpdateLocation);

module.exports = router;
