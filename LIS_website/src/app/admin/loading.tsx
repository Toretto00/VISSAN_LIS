import Image from "next/image";

export default function Loading() {
    return (<div className="animate__animated animate__pulse animate__infinite">
        <div >
            <Image
                priority
                src={"/logo-vissan.png"}
                alt="loading logo"
                width={238}
                height={210}
            />
        </div>
    </div>)
}
