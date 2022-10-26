import Image from "next/image";

export const Cover = (props) => {
    const loaderProp =({ src }) => {
        return src;
    }

    return (
    <div className="h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center">
        <Image 
            alt="Cover" 
            src={props.background} 
            layout="fill" 
            objectFit="cover" 
            className="mix-blend-soft-light"
            loader={loaderProp}
        />
        <div className="max-w-5xl z-10">
            {props.children}
        </div>
    </div>
    )
};