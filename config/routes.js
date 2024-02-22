const Express = require("express");
const router = Express.Router();

const BookController = require("../controller/book.controller");

router.post("/create-book-category", BookController.CreateBookCategory);
router.get(
  "/get-all-book-categories/:branch_id",
  BookController.GetAllBookCategories
);
router.post("/get-book-category/:id", BookController.GetBookCategory);
router.put("/update-book-category/:id", BookController.UpdateBookCategory);
router.post("/upload-bulk-category", BookController.UploadBulkCategory);

module.exports = router;
