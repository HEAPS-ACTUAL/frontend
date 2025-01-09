import BeatLoader from "react-spinners/BeatLoader";

function Spinner({ message }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <BeatLoader color="grey" size={20} />
            </div>

            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                {message}
            </div>
        </div>
    )
}

export default Spinner