import { useRef, useEffect, useContext } from "react";
import {IsLoginContext} from "../home/Context"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import isAuth from "../../functions/IsAuth";

export default function LoginForm(props) {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const isLoginContext=useContext(IsLoginContext)
    useEffect(  () => {

       const asyncFn = async () => {
              const res = await isAuth()
              console.log(res);
              if (res.data.isAuth) {
                  console.log("you are already login in");
                  isLoginContext(true)
                  console.log(isLoginContext)
                  navigate("/");
              } else {
                isLoginContext(false)
              }
       }
       asyncFn();
        
       
    }, []);
    const handlerSubmit = async (event) => {
        event.preventDefault();
        const emailInput = email.current.value;
        const passwordInput = password.current.value;
        console.log(import.meta.env.VITE_API);
        let res;
        axios.defaults.withCredentials = true;
        axios
            .post(`${import.meta.env.VITE_API}/user/login`, {
                email: emailInput,
                password: passwordInput,
            })
            .then((response) => {
                console.log(response);
                res = response.data.isAuth;
                if (res&& response.data.role==="ADMIN") {
                    isLoginContext(true)

                    navigate("/adminPanel/");
                }
                else if(res){
                    isLoginContext(true)

                    navigate("/books")
                }
            })
            .catch((err) => console.log(err));

        // const response = await fetch(`${import.meta.env.VITE_API}/user/login`, {
        //     method: "POST",

        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: emailInput,
        //         password: passwordInput,
        //     }),
        // });
        // const data = await response.json();
        // console.log(data);
    };
    return (
        <section className=" flex justify-center mt-[200px]">
            <div className="block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <form onSubmit={handlerSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="border-[#3B71CA] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-100"
                            type="email"
                            id="email"
                            name="email"
                            ref={email}
                            required
                        />
                    </div>
                    {/* <!--Password input--> */}
                    <div>
                        <label htmlFor="email">password</label>
                        <input
                            className="border-[#3B71CA] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-100"
                            type="password"
                            id="password"
                            name="password"
                            ref={password}
                            required
                        />
                    </div>

                    {/* <!--Remember me checkbox--> */}
                    <div className="mb-6  flex items-center justify-between">
                        <div className="block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="checkbox"
                                value=""
                                id="exampleCheck2"
                            />
                            <label
                                className="inline-block pl-[0.15rem] hover:cursor-pointer mr-5"
                                htmlFor="exampleCheck2"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* <!--Forgot password link--> */}
                        <a
                            href="#!"
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* <!--Submit button--> */}
                    {/* <TERipple rippleColor="light" className="w-full"> */}
                    <input
                        type="submit"
                        className="cursor-pointer  block w-full rounded bg-[#3B71CA] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                        value={"Sign in"}
                    />

                    {/* </TERipple> */}

                    {/* <!--Register link--> */}
                    <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
                        Not a member?{" "}
                        <Link
                            to={"/register"}
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
