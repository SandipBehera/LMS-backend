import AddBook from "../pages/Admin/AddBook/AddBook";
import BookLocation from "../pages/Admin/AddBook/BookLocation";
import Dashboard from "../pages/Dashboard";


export const routes = [
    { path: `/dashboard`, Component: <Dashboard /> },

    //Add Books
    { path: `/add-books`, Component: <AddBook/> },
    { path: `/book-location`, Component: <BookLocation/> },

];
