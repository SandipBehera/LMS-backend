// Initilize express router
const connectDatabase = require("../config/dbConfig");
const logger = require("../logger");

exports.CreateBookCategory = async (req, res) => {
  const { category_name, category_description, status, branch_id } = req.body;
  const query = `INSERT INTO lms_book_category (category_name,category_description,status,branch_id) VALUES (?,?,?,?)`;
  const duplicateCheckQuery = `SELECT * FROM lms_book_category WHERE category_name = ? AND branch_id = ?`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

  try {
    const duplicateCheckResult = await new Promise((resolve, reject) => {
      connection.query(
        duplicateCheckQuery,
        [category_name, branch_id],
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });

    if (duplicateCheckResult.length > 0) {
      res.send({ message: "Book Category Already exists", status: "error" });
      return;
    }

    const insertResult = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [category_name, category_description, status, branch_id],
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
  const duplicateCheckQuery = `SELECT * FROM lms_books WHERE book_name = ? AND branch_id = ?`;
  const query = `INSERT INTO lms_books (book_name,book_location,book_category,book_author,book_publisher,book_vendor,book_isbn_code,published_year,program,department,program_year,book_volume,pages,subject,language,book_edition,book_material_type,book_sub_material_type,book_class_no,book_year_of_publication,book_page_no,book_place_publication,book_accession_register,date_of_entry,financial_year,branch_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(
    duplicateCheckQuery,
    [book_name, branch_id],
    (error, rows) => {
      if (error) {
        res
          .status(500)
          .json({ message: "Internal server error", status: "error" });
        logger.error("Error fetching books: ", error);
        return;
      }
      if (rows.length > 0) {
        res
          .status(200)
          .json({ message: "Book already exists", status: "error" });
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
            res
              .status(500)
              .json({ message: "Internal server error", status: "error" });
            logger.error("Error storing books: ", error);
            return;
          }
          res
            .status(200)
            .json({ message: "Book added successfully", status: "success" });
        }
      );
    }
  );
};

exports.GetBooks = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT * FROM lms_books where branch_id = ?`;
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
  const { id } = req.params;
  const query = `UPDATE lms_books SET book_location = ?, book_category = ?, book_author = ?, book_publisher = ?, book_vendor = ?, book_isbn_code = ?, published_year = ?, program = ?, department = ?, program_year = ?, book_volume = ?, pages = ?, subject = ?, language = ?, book_edition = ?, book_material_type = ?, book_sub_material_type = ?, book_class_no = ?, book_year_of_publication = ?, book_page_no = ?, book_place_publication = ?, book_accession_register = ?, date_of_entry = ?, financial_year = ?, branch_id = ? WHERE id = ?`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);

  try {
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
        id,
      ],
      (error, rows) => {
        if (error) {
          res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
          logger.error("Error fetching book categories: ", error);
          return;
        }
        res
          .status(200)
          .json({ message: "Book updated successfully", status: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: "error" });
  } finally {
    connection.end();
  }
};

exports.GetActiveBooks = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT * FROM lms_books where branch_id = ? and status = active`;
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

exports.GetActiveLocation = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT * FROM lms_book_location where branch_id = ? and status = active`;
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

exports.GetPrograms = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT course_id,course_type FROM course where branch_id = ? AND course_status = 'Active'`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, [branch_id], (error, rows) => {
    if (error) {
      console.log("first", error);
      logger.error("Error fetching course_types: ", error);
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });

      return;
    }
    res.status(200).json({ programs: rows });
  });
};

exports.GetVendor = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT vendor_name FROM vendors where branch_id = ? AND status = 'Active'`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, [branch_id], (error, rows) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });
      logger.error("Error fetching vendor_name: ", error);
      return;
    }
    res.status(200).json({ vendors: rows });
  });
};
exports.GetProgramYear = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT course_year.id, course_year.course_year, semester.semester
  FROM course_year
  LEFT JOIN semester ON semester.program_year_id = course_year.id
  WHERE course_year.branch_id = ? AND course_year.status = 'Active'`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, [branch_id], (error, rows) => {
    if (error) {
      logger.error("Error fetching course_year: ", error);
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });

      return;
    }
    res.status(200).json({ program_years: rows });
  });
};
exports.GetDepartment = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT class_name FROM class where branch_id = ? AND status = 'Active'`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, [branch_id], (error, rows) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });
      logger.error("Error fetching class_name: ", error);
      return;
    }
    res.status(200).json({ departments: rows });
  });
};

exports.GetSubjectList = async (req, res) => {
  const { branch_id } = req.params;
  const query = `SELECT id, subject,subject_code FROM subjects where branch_id = ? AND status = 'Active'`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, [branch_id], (error, rows) => {
    if (error) {
      logger.error("Error fetching subject_name: ", error);
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });

      return;
    }
    res.status(200).json({ subjects: rows });
  });
};

// exports.GetfinancialYear = async (req, res) => {
//   const { branch_id } = req.params;
//   const query = `SELECT financial_year FROM financial_year where branch_id = ? AND status = 'Active'`;
//   const Auth = req.session.Auth;
//   const connection = await connectDatabase(Auth);
//   connection.query(query, [branch_id], (error, rows) => {
//     if (error) {
//       res
//         .status(500)
//         .json({ message: "Internal server error", status: "error" });
//       logger.error("Error fetching financial_year: ", error);
//       return;
//     }
//     res.status(200).json({ financial_years: rows });
//   });
// };

exports.GetLanguages = async (req, res) => {
  const query = `SELECT * FROM languages`;
  const Auth = req.session.Auth;
  const connection = await connectDatabase(Auth);
  connection.query(query, (error, rows) => {
    if (error) {
      logger.error("Error fetching languages: ", error);
      res
        .status(500)
        .json({ message: "Internal server error", status: "error" });

      return;
    }
    res.status(200).json({ languages: rows });
  });
};
