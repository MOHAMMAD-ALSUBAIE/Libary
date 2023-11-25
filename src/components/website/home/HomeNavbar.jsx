import React from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import isAuth from "../../functions/IsAuth";
import axios from "axios";
import { IsLoginContext } from "./Context";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList(props) {
const [isLogin,SetIsLogin]=useState(false);
const navigate=useNavigate()

useEffect(()=>{
    console.log("context helped to pass me props")
    SetIsLogin(props.login);
},[props])
  // (function changeState(){
   // SetIsLogin(props.isLogin);
   //})()
   useEffect(()=>{

    const asyncFn = async () => {
        const res = await isAuth();
        if (res.data.isAuth) {
            console.log("you are already login in");
            SetIsLogin(true);
        }
    };
    asyncFn();
},[])
const  handelLogOut= async ()=>{
    try { 
    axios.defaults.withCredentials = true;
   await axios.delete(`${import.meta.env.VITE_API}/user/logout`)
   document.cookie="connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
   navigate('/login')
    } catch (error) {
        console.error(error)
    }
}
    return (
        <ul id="Up" className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold "
            >
                <Link
                    to={"/Favorites"}
                    className="flex items-center text-base hover:text-blue-500 transition-colors font-bold"
                >
                    Favorites
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold "
            >
                <Link
                    to={"/books"}
                    className="flex items-center text-base hover:text-blue-500 transition-colors font-bold"
                >
                    Books
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold"
            >

                {isLogin?<button onClick={handelLogOut} className="font-extrabold hover:text-blue-500">LogOut</button>:<Link
                    to={"login"}
                    className="flex items-center text-base hover:text-blue-500 transition-colors font-bold"
                >
                    Sing in
                </Link>}
                
            </Typography>
        </ul>
    );
}

export default function HomeNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const [isLogin,SetIsLogin]=useState(false);
   const handelIsLogin=(state)=>{
    console.log("context called me")
       SetIsLogin(state);
   }
    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <>
            <Navbar id="Up" className="mx-auto max-w-screen-2xl mt-2  px-6 py-3 ">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 text-xl cursor-pointer py-1.5 font-black"
                    >
                        Library
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList login={isLogin} />
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList login={isLogin} />
                </Collapse>
            </Navbar>
            <IsLoginContext.Provider value={handelIsLogin}>

            <Outlet  />

            </IsLoginContext.Provider>
        </>
    );
}
