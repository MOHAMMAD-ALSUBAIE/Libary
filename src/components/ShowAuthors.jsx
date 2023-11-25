import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./loader.module.css";
import Template from "./template";
const ShowAuthors = () => {
    const [stateLoader, setStateLoader] = useState(true);
    const [data, setData] = useState({});
    // const { data } = useLoaderData();
    let dataRes;
    useEffect(() => {
        const asyncFn = async () => {
            const response = await fetch(`${import.meta.env.VITE_API}/authors`);
            dataRes = await response.json();
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
                    title={"Authors"}
                    data={data}
                    detiles={["Author'name", "Author's ID"]}
                />
            )}
            {}
        </>
    );

    console.log(data);
    return;
};

export default ShowAuthors;
