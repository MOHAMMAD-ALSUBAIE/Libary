import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/website/auth/Login";
import Register from "./components/website/createUser/Register";
import "./App.css";
import CardBook from "./components/website/books/cardBook";
import ShowAuthors from "./components/ShowAuthors";
import ShowBooks from "./components/ShowBooks";
import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import HomeNavbar from "./components/website/home/HomeNavbar";
import Favorites from "./components/website/books/Favorites";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeNavbar />,
            children: [
                {
                    path: "Login",
                    element: <Login />,
                },
                {
                    path:"Register",
                    element:<Register/>
                },
                {
                    path: "books",
                    element: <CardBook />,
                },
                {
                    path: "Favorites",
                    element: <Favorites />,
                }
            ],
            errorElement: <ErrorPage />,
        },
        {
            path: "/adminPanel/",
            element: <Navbar />,
            children: [
                {
                    path: "authors",
                    element: <ShowAuthors />,
                },
                {
                    path: "books",
                    element: <ShowBooks />,
                },
                {
                    path: "addAuthor",
                    element: <AddAuthor />,
                },
                {
                    path: "addBook",
                    element: <AddBook />,
                },
            ],
            errorElement: <ErrorPage />,
        },
    ]);
    return <RouterProvider router={router} />;
    //
}

export default App;
