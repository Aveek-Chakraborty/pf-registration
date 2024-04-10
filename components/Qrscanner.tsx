"use client"



const Qrscanner = () => {
    const scanHandler = () => {
        console.log('scanHandler')
    }
    return (
        <div>
            <button onClick={scanHandler}>Scan QR code</button>
            
        </div>
    )
}

export default Qrscanner
