import { useRef, useState } from "react";
import style from "./loader.module.css";

const AddAuthor = () => {
    const [stateLoader, setStateLoader] = useState(false);
    const [authorID, setAuthorID] = useState(null);

    const AuthorName = useRef();
    const handlerSubmit = async (e) => {
        e.preventDefault();
        setStateLoader(true);
        const pattern = /[0-9]/g;
        const authorName = AuthorName.current.value.trim();
        console.log(pattern.test(authorName));
        if (!pattern.test(authorName)) {
            const response = await fetch(
                `${import.meta.env.VITE_API}/authors/addAuthor`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: authorName,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const { Date } = await response.json();
            setAuthorID(Date.id);
            console.log(Date.id);
        }
        setStateLoader(false);
        console.log(authorName);
    };
    return (
        <>
            {stateLoader ? (
                <div className={style["custom-loader"]}></div>
            ) : undefined}
            {authorID ? (
                <div className="text-white relative top-[150px]">
                    Author's ID {authorID}
                </div>
            ) : (
                <div className="mb-[3rem] lg:w-[70rem] w-[100%] flex justify-center">
                    <form
                        onSubmit={handlerSubmit}
                        className=" flex flex-col gap-[3rem]"
                    >
                        <div>
                            <label className="flex justify-center text-[2rem] text-slate-200">
                                Author's Name
                            </label>
                            <br></br>

                            <input
                                className="h-2 p-[1.5rem] mt-6 rounded-md"
                                type="text"
                                ref={AuthorName}
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
