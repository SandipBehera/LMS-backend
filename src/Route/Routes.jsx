import AddBook from "../pages/Admin/AddBook/AddBook";
import AddDamage from "../pages/Admin/AddBook/Components/AddDamage";
import BookInventory from "../pages/Admin/AddBook/Components/BookInventory";
import CopyList from "../pages/Admin/AddBook/Components/CopyList";
import ViewDamage from "../pages/Admin/AddBook/Components/ViewDamages";
import ViewAllBooks from "../pages/Admin/AddBook/ViewAllBook";
import AddBookCategory from "../pages/Admin/BookCategory/AddBookCategory";
import ViewAllBookCategory from "../pages/Admin/BookCategory/ViewAllBookCategory";
import AllBookLocation from "../pages/Admin/BookLocation/AllBookLocation";
import BookLocation from "../pages/Admin/BookLocation/BookLocation";
import Dashboard from "../pages/Dashboard";


export const routes = [
    { path: `/dashboard`, Component: <Dashboard /> },

    //Book Category
    { path: `/add-category`, Component: <AddBookCategory/> },
    { path: `/all-category`, Component: <ViewAllBookCategory/> },

    //Book Location
    { path: `/add-book-location`, Component: <BookLocation/> },
    { path: `/all-book-location`, Component: <AllBookLocation/> },

    //Add Book
    { path: `/add-book`, Component: <AddBook/> },
    { path: `/view-books`, Component: <ViewAllBooks/> },
    { path: `/add-inventory`, Component: <BookInventory/> },
    { path: `/edit-book`, Component: <AddBook/> },
    { path: `/copy-list`, Component: <CopyList/> },
    { path: `/add-damage`, Component: <AddDamage/> },
    { path: `/view-damage`, Component: <ViewDamage/> },




    








];
