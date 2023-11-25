import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Pagination(props) {
    const [active, setActive] = React.useState(1);
    console.log(active);
    console.log(1);
    props.onPagination(active)
    const getItemProps = (index,check=true) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
    });

    const next = () => {
      //  if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex items-center max-[450px]:my-[5rem]">
         <a href={"#Up"}>  <Button
                variant="text"
                className="flex items-center md:gap-2 text-white"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button> </a>
            <div className="flex items-center md:gap-2 text-white ">
              
            <a href={"#Up"}>  <IconButton className=" text-white" {...getItemProps(1)}>
                    1
                </IconButton> </a>
                <a href={"#Up"}>   <IconButton className=" text-white" {...getItemProps(2)}>
                    2
                </IconButton> </a>
                <a href={"#Up"}>  <IconButton className=" text-white" {...getItemProps(3)}>
                    3
                </IconButton> </a>
                <a href={"#Up"}>  <IconButton className=" text-white" {...getItemProps(4)}>
                    4
                </IconButton> </a>
                <a href={"#Up"}>   <IconButton className=" text-white" {...getItemProps(5)}>
                    5
                </IconButton> </a>
              {active>5? <a href={"#Up"}><IconButton className=" text-white" {...getItemProps(active)}>
                    {active}
                </IconButton> </a>:undefined}
               {
                active>=5? <a href={"#Up"}><IconButton className=" text-white" {...getItemProps(active+1)}>
                {active+1}
            </IconButton></a>:undefined
               }
            </div>
            <a href={"#Up"}>
            <Button
            
                variant="text"
                className="flex items-center md:gap-2 text-white"
                onClick={next}
              //  disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
            </a>
        </div>
    );
}
export default Pagination;
