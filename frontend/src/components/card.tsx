
export default function Card({children, classname} : {children: React.ReactNode, classname?: string}) {
    return (

        <div className="bg-zinc-900 text-white flex flex-col justify-center items-center h-screen w-screen">
            <div className={`w-96 flex flex-col justify-center items-center rounded-2xl h-[460px] bg-white text-black py-10 px-7 ${classname}`}>
                {children}
            </div>
        </div>
    )
}
