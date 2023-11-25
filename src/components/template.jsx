const Template = (props) => {
    return (
        <>
            <section>
                {/* {setStateLoader(false)} */}
                <h1 className="flex text-white font-extrabold text-[2rem] font- justify-center mb-[4rem]">
                    {props.title}
                </h1>
                {props.data.map((element) => {
                    return (
                        <div
                            className="mb-[3rem] lg:w-[70rem] w-[100%] rounded-lg"
                            key={element.ISBN}
                        >
                            <h1 className="bg-sky-500 h-[3rem] p-[2rem] text-[1.5rem]">
                                <span className="font-extrabold">
                                    {props.detiles.type}:
                                </span>{" "}
                                {element.name || element.BookTitle}
                            </h1>
                            <h1 className="bg-sky-500 h-[3rem] p-[2rem] text-[1.5rem]">
                                <span className="font-extrabold">
                                    {props.detiles.author} :
                                </span>{" "}
                                {element.name || element.BookAuthor}
                            </h1>
                            <p className="bg-sky-500 p-[2rem]">
                                <img
                                    className="w-[40%] h-[450px]"
                                    src={element.Image_URL_L}
                                />
                            </p>
                            <p className="bg-sky-500 h-[3rem]  p-[2rem] ">
                                <span className="hidden">{element.ISBN}</span>{" "}
                                {/* <input type="hidden">{element.ISBN}</input> */}
                            </p>
                        </div>
                    );
                })}
            </section>
        </>
    );
};
export default Template;
