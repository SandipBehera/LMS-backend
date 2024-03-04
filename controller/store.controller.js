// Initilize express router
const connectDatabase = require("../config/dbConfig");
const logger = require("../logger");

exports.BookQuantity = async (req, res) => {
  const { vendor_id, item_code, item_quantity, book_id, branch_id } = req.body;

  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  const query = `INSERT INTO book_quantity (vendor_id, item_code, item_quantity,book_id, branch_id) VALUES (?, ?, ?, ?,?)`;
  try {
    connection.query(
      query,
      [vendor_id, item_code, item_quantity, book_id, branch_id],
      (err, result) => {
        if (err) {
          logger.error(`Error in inserting book quantity: ${err}`);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        return res
          .status(200)
          .json({ message: "Book Quantity Inserted Successfully" });
      }
    );
  } catch (err) {
    logger.error(`Error in inserting book quantity: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.end();
  }
};
exports.GetItemCode = async (req, res) => {
  const { book_id, branch_id } = req.params;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  const query = `SELECT * FROM book_quantity WHERE book_id = ? AND branch_id = ?`;
  try {
    connection.query(query, [book_id, branch_id], (err, result) => {
      if (err) {
        logger.error(`Error in getting item code: ${err}`);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ itemCode: result, duplicate: "true" });
    });
  } catch (err) {
    logger.error(`Error in getting item code: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.end();
  }
};
