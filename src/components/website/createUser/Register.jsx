import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import isAuth from "../../functions/IsAuth";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const firstName = useRef();
  const lastName = useRef();

  const email = useRef();
  const password = useRef();
  const passwordAgin = useRef();

  useEffect(() => {
    const asyncFn = async () => {
      const res = await isAuth();
      console.log(res);
      if (res.data.isAuth) {
        console.log("you are already login in");
        navigate("/");
      } else {
      }
    };
    asyncFn();
  }, []);
  const handlerSubmit = async (event) => {
    event.preventDefault();
    const firstNameInput = firstName.current.value;
    const lastNameInput = lastName.current.value;
    console.log(email.current.value);
    const emailInput = email.current.value;
    const passwordInput = password.current.value;
    const enterPassAgin = passwordAgin.current.value;
    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailInput ||
      !passwordInput ||
      !passwordAgin
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (passwordInput !== enterPassAgin) {
      setError("Password not match");
      return;
    }
    console.log(import.meta.env.VITE_API);
    axios.defaults.withCredentials = true;
    axios
      .post(`${import.meta.env.VITE_API}/user/register`, {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
        passwordAgin: enterPassAgin,
      })
      .then((response) => {
        setError("");
        if (response.status === 201) {
          navigate("/Login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className=" flex justify-center mt-[100px]">
      {error && <p className="text-red-500">{error}</p>}
      <div className="block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form onSubmit={handlerSubmit}>
          <div className=" md:flex gap-5">
            <div>
              <label htmlFor="email">First Name</label>
              <input
                className="border-[#3B71CA] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-100"
                type="text"
                id="firstName"
                name="firstName"
                ref={firstName}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Last Name</label>
              <input
                className="border-[#3B71CA] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-100"
                type="text"
                id="LastName"
                name="LastName"
                ref={lastName}
                required
              />
            </div>
          </div>
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
          <div>
            <label htmlFor="email">Confirm password</label>
            <input
              className="border-[#3B71CA] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-100"
              type="password"
              id="password"
              name="password"
              ref={passwordAgin}
              required
            />
          </div>

          <div className="mb-6  flex items-center justify-between">
            <div className="block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck2"
              />
            </div>

            {/* <!--Forgot password link--> */}
            {/* still in progress */}
            <a
              href="#!"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Forgot password?
            </a>
          </div>

          {/* <!--Submit button--> */}
          <input
            type="submit"
            className="cursor-pointer  block w-full rounded bg-[#3B71CA] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
            value={"Sing up"}
          />

          {/* <!--Register link--> */}
          <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
            Already have an account ?{" "}
            <Link
              to={"/Login"}
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Sing in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
