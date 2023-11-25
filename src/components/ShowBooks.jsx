import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import getBooks from "./functions/getBooks";
import style from "./loader.module.css";
import Template from "./template";

const ShowBooks = () => {
    const [stateLoader, setStateLoader] = useState(true);
    const [data, setData] = useState({});
    // const { data } = useLoaderData();

    useEffect(() => {
        const asyncFn = async () => {
            let dataRes = await getBooks();
            console.log(dataRes);
            setData(dataRes.data);
            setStateLoader(false);
        };
        asyncFn();
    }, []);
    return (
        <>
            {stateLoader ? (
                <div className={style["custom-loader"]}></div>
            ) : (
                <Template
                    title={"Books"}
                    data={data}
                    detiles={{ type: "Title", author: "Author" }}
                />
            )}
            {}
        </>
    );

    console.log(data);
    return;
};

export default ShowBooks;
