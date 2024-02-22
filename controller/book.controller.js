const e = require("express");
const connectDatabase = require("../config/dbConfig");
const logger = require("../logger");

exports.CreateBookCategory = async (req, res) => {
  const { category_name, category_description, status } = req.body;
  const query = `INSERT INTO lms_book_category (category_name,category_description,status) VALUES (?,?,?)`;
  const duplicateCheckQuery = `SELECT * FROM lms_book_category WHERE category_name = ?`;
  const connection = await connectDatabase();

  try {
    const duplicateCheckResult = await new Promise((resolve, reject) => {
      connection.query(duplicateCheckQuery, [category_name], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });

    if (duplicateCheckResult.length > 0) {
      res.send({ message: "Book Category Already exists", status: "error" });
      return;
    }

    const insertResult = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [category_name, category_description, status],
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });

    res.status(200).json({
      message: "Book category created successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Error in CreateBookCategory:", error);
  } finally {
    connection.end(); // Always release the connection, whether the query succeeds or fails.
  }
};

exports.GetAllBookCategories = async (req, res) => {
  const query = `SELECT * FROM lms_book_category`;
  const connection = await connectDatabase();

  try {
    connection.query(query, (error, rows) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        logger.error("Error fetching book categories: ", error);
        return;
      }
      res.status(200).json({ categories: rows });
    });
  } catch (error) {
    logger.error("Error fetching book categories: ", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};

exports.GetBookCategory = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM lms_book_category WHERE id = ?`;
  const connection = await connectDatabase();

  try {
    connection.query(query, [id], (error, rows) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        logger.error("Error fetching book categories: ", error);
      }
      res.status(200).json({ category: rows });
    });
  } catch (error) {
    logger.error("Error fetching book categories: ", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};

exports.UpdateBookCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, category_description, status } = req.body;
  const query = `UPDATE lms_book_category SET category_name = ?, category_description = ?, status = ? WHERE id = ?`;
  const connection = await connectDatabase();

  try {
    connection.query(query, [category_name, category_description, status, id]);
    res.status(200).json({
      message: "Book category updated successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};

exports.UploadBulkCategory = async (req, res) => {
  const fileBuffer = req.file.buffer.toString(); // Assuming the file is CSV
  const rows = fileBuffer.split("\n").map((row) => row.split(","));

  const connection = await connectDatabase();

  try {
    const query =
      "INSERT INTO lms_book_category (category_name, category_description, status) VALUES (?, ?, ?)";
    const values = [];

    for (const row of rows) {
      const [category_name, category_description, status] = row;
      values.push([category_name, category_description, status]);
    }

    await connection.query(query, values);

    res.status(200).json({ message: "Bulk upload successful" });
  } catch (error) {
    console.error("Error during bulk upload:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};
