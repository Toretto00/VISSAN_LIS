// NEXT Imports
import Image from "next/image";

// Third-party Imports
import 'animate.css';

const LoadingLogo = () => {
    return (
        <div className="animate__animated animate__pulse animate__infinite">
            <div style={{
                display: "flex",
                height: "100vh",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image
                    src={"/logo-vissan.png"}
                    alt="loading logo"
                    width={178}
                    height={150}
                />
            </div>
        </div>
    )
}

export default LoadingLogo
