import { useRef, useState } from "react";
import style from "./loader.module.css";

const AddAuthor = () => {
    const [stateLoader, setStateLoader] = useState(false);
    const [BookID, setBookID] = useState(null);
    const [BookNameState, setBookNameState] = useState(null);

    const BookName = useRef();
    const AuthorID = useRef();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setStateLoader(true);
        const pattern = /[0-9]/g;
        const bookName = BookName.current.value.trim();
        const authorID = AuthorID.current.value.trim();

        console.log(pattern.test(bookName));
        if (!pattern.test(bookName)) {
            const response = await fetch(
                `${import.meta.env.VITE_API}/books/addBook`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        title: bookName,
                        authorID: authorID,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const { Date } = await response.json();
            console.log(Date);
            setBookID(Date.id);
            setBookNameState(Date.title);
        }
        setStateLoader(false);
    };
    return (
        <>
            {stateLoader ? (
                <div className={style["custom-loader"]}></div>
            ) : undefined}
            {BookID && BookNameState ? (
                <div className="text-white relative top-[150px]">
                    <h1>Book's name {BookNameState}</h1>
                    <h1> Book's ID {BookID}</h1>
                </div>
            ) : (
                <div className="mb-[3rem] lg:w-[70rem] w-[100%] flex justify-center">
                    <form
                        onSubmit={handlerSubmit}
                        className=" flex flex-col gap-[3rem]"
                    >
                        <div>
                            <label className="flex justify-center text-[2rem] text-slate-200">
                                Books's Name
                            </label>
                            <br></br>

                            <input
                                className="h-2 p-[1.5rem] mt-6 rounded-md"
                                type="text"
                                ref={BookName}
                            />
                        </div>

                        <div>
                            <label className="flex justify-center text-[2rem] text-slate-200">
                                Author's ID
                            </label>
                            <br></br>

                            <input
                                className="h-2 p-[1.5rem] mt-1 rounded-md"
                                type="text"
                                ref={AuthorID}
                            />
                        </div>
                        <input
                            className="text-[1.5rem] text-slate-700 bg-emerald-300 rounded-md hover:bg-emerald-700 "
                            type="submit"
                            value={"Submit"}
                        />
                    </form>
                </div>
            )}
        </>
    );
};
export default AddAuthor;
