import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
const Navbar = () => {
    const [showNav, setShowNave] = useState(true);
    const handlerState = () => {
        setShowNave(!showNav);
    };
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get(`${import.meta.env.VITE_API}/user/authorize`).then((res) => {
            console.log(res.data);
            if (res.data.isAuth  ) {
                console.log("you are already login in");
            } else {
                navigate("/");
            }
        });
    }, []);
    // const disappear = () => {
    //     setTimeout(() => {
    //         setShowNave(false);
    //     }, 1000);
    // };

    return (
        <section className="flex flex-col items-center justify-center gap-[15rem]">
            <div className="flex justify-start mt-6">
                <button
                    // data-collapse-toggle="mega-menu-full"
                    onClick={handlerState}
                    type="button"
                    className="grid justify-items-start  p-2 w-10 h-10  text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-sky-500/100 dark:focus:hover:bg-sky-500-600"
                    aria-controls="mega-menu-full"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>
            {showNav ? (
                <nav className="flex justify-center  items-center ">
                    <ul className="lg:flex    gap-[10rem]">
                        <li className="bg-sky-500 h-[3rem] w-[7rem] flex items-center justify-center rounded-md mb-3 hover:bg-sky-700 ">
                            <Link to={"authors"} onClick={handlerState}>
                                Show Authors
                            </Link>
                        </li>
                        <li className="bg-sky-500 h-[3rem] w-[7rem] flex items-center justify-center rounded-md mb-3 hover:bg-sky-700 ">
                            <Link to={"books"} onClick={handlerState}>
                                Show Books
                            </Link>
                        </li>
                        <li className="bg-sky-500 h-[3rem] w-[7rem] flex items-center justify-center rounded-md mb-3 hover:bg-sky-700 ">
                            <Link to={"addAuthor"} onClick={handlerState}>
                                Add Author
                            </Link>
                        </li>
                        <li className="bg-sky-500 h-[3rem] w-[7rem] flex items-center justify-center rounded-md mb-3 hover:bg-sky-700 ">
                            <Link to={"addBook"} onClick={handlerState}>
                                add Book
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : undefined}
            <Outlet />
        </section>
    );
};
export default Navbar;
