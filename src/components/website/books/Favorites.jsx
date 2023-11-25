import { useState, useEffect } from "react";
import style from "../../loader.module.css";
import getBooks from "../../functions/getBooks";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import SVGfavorite from "/Svgfavorite.svg";
import { useNavigate } from "react-router-dom";
import isAuth from "../../functions/IsAuth";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
export default function Favorites() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [stateLoader, setStateLoader] = useState(true);

  const [pagination, setPagination] = useState(1);

  const [data, setData] = useState({});
  // const handelPaginationToServer = (pagination) => {
  //   setPagination(pagination);
  // };
  // const { data } = useLoaderData();
  useEffect(() => {
    const asyncFn = async () => {
      const res = await isAuth();
      if (!res.data.isAuth) {
        navigate("/login");
      }else{
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/FavoriteList`
        );
        console.log(response);
        setData(response.data.data);
        setStateLoader(false);
      }


    };
    asyncFn();

    
  }, []);
  const handelClick = (e) => {
    const card=e.target.parentNode.parentNode.parentNode
    console.log(card.parentNode)
    card.classList.add("hidden");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();

    const res = await isAuth();
    if (res.data.isAuth) {
      console.log("you are already login in");

      const bookID = event.target.bookId.value;
       console.log(bookID);
      if (!bookID) {
        setError("Warring ⚠️⚠️⚠️");
        
        return;
      }
      axios.defaults.withCredentials = true;

      axios
        .delete(`${import.meta.env.VITE_API}/user/FavoriteList/${bookID}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {

          console.log(err.message);
        });
    } else {
      console.log("you are not login in");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="grid justify-items-center xl:mx-[15%] lg:grid-cols-2 xl:lg:grid-cols-3 grid-cols-1  gap-4 mt-[150px] ">
        {stateLoader ? (
          <div className={style["custom-loader"]}></div>
        ) : (
          data.map((element) => {
            return (
              <Card className="mt-6 w-96 " key={element.id}>
                <CardHeader color="blue-gray" className="relative h-56 ">
                  <img
                    src={element.books.Image_URL_L}
                    alt={"card-image-" + element.books.BookTitle}
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {element.books.BookTitle}
                  </Typography>
                  <Typography className="mb-10">
                    Author : {element.books.BookAuthor}
                  </Typography>
                </CardBody>
                {/* <CardFooter className="pt-0">
                                <Button>Read More</Button>
                            </CardFooter> */}
                <form
                  onSubmit={handlerSubmit}
                  className="absolute bottom-0 left-2"
                >
                  <input name="bookId" type="hidden" value={element.id} />
                  <button id={element.id} type="submit">
                    <svg
                      onClick={handelClick}
                      id={"id" + element.id}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      className="fill-red-700"
                    >
                      <path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z" />
                    </svg>
                  </button>
                </form>
              </Card>
            );
          })
        )}
      </section>
      {/* <footer className="flex justify-center my-5">
        <Pagination onPagination={handelPaginationToServer} />
      </footer> */}
    </>
  );
}
