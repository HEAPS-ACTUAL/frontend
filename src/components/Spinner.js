import BeatLoader from "react-spinners/BeatLoader";

function Spinner({message}){
    return (
        <div className="space-y-5">
            <div className="flex justify-center mt-40">
                <BeatLoader color="grey" size={20} />
            </div>

            <div className="text-center text-xl font-bold"> {message} </div>
        </div>
    )
}

export default Spinner