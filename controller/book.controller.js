// Initilize express router
const connectDatabase = require("../config/dbConfig");
const logger = require("../logger");

exports.CreateBookCategory = async (req, res) => {
  const { category_name, category_description, status, branch_id } = req.body;
  const query = `INSERT INTO lms_book_category (category_name,category_description,status,branch_id) VALUES (?,?,?,?)`;
  const duplicateCheckQuery = `SELECT * FROM lms_book_category WHERE category_name = ?`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

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
  const { branch_id } = req.params;
  const query = `SELECT * FROM lms_book_category where branch_id = ?`;
  const Auth = req.session.Auth;
  console.log("Auth", Auth);
  const connection = await connectDatabase(Auth);

  try {
    connection.query(query, [branch_id], (error, rows) => {
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
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

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
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

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

  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

  try {
    const query =
      "INSERT INTO lms_book_category (category_name, category_description, status, brach_id) VALUES (?, ?, ?, ?)";
    const values = [];

    for (const row of rows) {
      const [category_name, category_description, status, branch_id] = row;
      values.push([category_name, category_description, status, branch_id]);
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

exports.AddBook = async (req, res) => {
  const {
    book_name,
    book_location,
    book_category,
    book_author,
    book_publisher,
    book_vendor,
    book_isbn_code,
    published_year,
    program,
    department,
    program_year,
    book_volume,
    pages,
    subject,
    language,
    book_edition,
    book_material_type,
    book_sub_material_type,
    book_class_no,
    book_year_of_publication,
    book_page_no,
    book_place_publication,
    book_accession_register,
    date_of_entry,
    financial_year,
    branch_id,
  } = req.body;
  const duplicateCheckQuery = `SELECT * FROM lms_book WHERE book_name = ?`;
  const query = `INSERT INTO lms_book (book_name,book_location,book_category,book_author,book_publisher,book_vendor,book_isbn_code,published_year,program,department,program_year,book_volume,pages,subject,language,book_edition,book_material_type,book_sub_material_type,book_class_no,book_year_of_publication,book_page_no,book_place_publication,book_accession_register,date_of_entry,financial_year,branch_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(duplicateCheckQuery, [book_name], (error, rows) => {
    if (error) {
      res.status(500).json({ message: "Internal server error" });
      logger.error("Error fetching book categories: ", error);
      return;
    }
    if (rows.length > 0) {
      res.status(200).json({ message: "Book already exists" });
      return;
    }
    connection.query(
      query,
      [
        book_name,
        book_location,
        book_category,
        book_author,
        book_publisher,
        book_vendor,
        book_isbn_code,
        published_year,
        program,
        department,
        program_year,
        book_volume,
        pages,
        subject,
        language,
        book_edition,
        book_material_type,
        book_sub_material_type,
        book_class_no,
        book_year_of_publication,
        book_page_no,
        book_place_publication,
        book_accession_register,
        date_of_entry,
        financial_year,
        branch_id,
      ],
      (error, rows) => {
        if (error) {
          res.status(500).json({ message: "Internal server error" });
          logger.error("Error fetching book categories: ", error);
          return;
        }
        res.status(200).json({ message: "Book added successfully" });
      }
    );
  });
};

exports.GetBooks = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT * FROM lms_book where branch_id = ?`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

  try {
    connection.query(query, [branch_id], (error, rows) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        logger.error("Error fetching book categories: ", error);
        return;
      }
      res.status(200).json({ books: rows });
    });
  } catch (error) {
    logger.error("Error fetching book categories: ", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};

exports.UpdateBooks = async (req, res) => {
  const {
    book_name,
    book_location,
    book_category,
    book_author,
    book_publisher,
    book_vendor,
    book_isbn_code,
    published_year,
    program,
    department,
    program_year,
    book_volume,
    pages,
    subject,
    language,
    book_edition,
    book_material_type,
    book_sub_material_type,
    book_class_no,
    book_year_of_publication,
    book_page_no,
    book_place_publication,
    book_accession_register,
    date_of_entry,
    financial_year,
    branch_id,
  } = req.body;
  const query = `UPDATE lms_book SET book_location = ?, book_category = ?, book_author = ?, book_publisher = ?, book_vendor = ?, book_isbn_code = ?, published_year = ?, program = ?, department = ?, program_year = ?, book_volume = ?, pages = ?, subject = ?, language = ?, book_edition = ?, book_material_type = ?, book_sub_material_type = ?, book_class_no = ?, book_year_of_publication = ?, book_page_no = ?, book_place_publication = ?, book_accession_register = ?, date_of_entry = ?, financial_year = ?, branch_id = ? WHERE book_name = ?`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

  try {
    connection.query(
      query,
      [
        book_location,
        book_category,
        book_author,
        book_publisher,
        book_vendor,
        book_isbn_code,
        published_year,
        program,
        department,
        program_year,
        book_volume,
        pages,
        subject,
        language,
        book_edition,
        book_material_type,
        book_sub_material_type,
        book_class_no,
        book_year_of_publication,
        book_page_no,
        book_place_publication,
        book_accession_register,
        date_of_entry,
        financial_year,
        branch_id,
        book_name,
      ],
      (error, rows) => {
        if (error) {
          res.status(500).json({ message: "Internal server error" });
          logger.error("Error fetching book categories: ", error);
          return;
        }
        res.status(200).json({ message: "Book updated successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.end();
  }
};
