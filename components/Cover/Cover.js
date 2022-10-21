import Image from "next/image";

export const Cover = (props) => {
    console.log(props.background)
    const loaderProp =({ src }) => {
        return src;
    }

    return (
    <div className="h-screen bg-slate-800 relative min-h-[400px] flex justify-center items-center">
        <Image 
            alt="Cover" 
            src={props.background} 
            layout="fill" 
            objectFit="cover" 
            className="mix-blend-soft-light"
            loader={loaderProp}
        />
        {props.children}
    </div>
    )
};