import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
// import { Html5Qrcode } from "html5-qrcode";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

const ScanTicket = (props) => {
    // const navigate = useNavigate()
    // useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"))
    // if (user == null) {
    //     navigate("/login")
    // }
    // if (user?.role === 1) {
    //     navigate("/home");
    //     } 
    // });

    useEffect(() => {
        // html5QrCode = new Html5Qrcode("reader");
    }, []);

    const handleClickAdvanced = () => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            props.onResult(decodedText);
            handleStop();
        };
        html5QrCode.start(
            { facingMode: "environment" },
            props.type === "QR" ? qrConfig : brConfig,
            qrCodeSuccessCallback
        );
    };

    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <NavBar />
            <div id="cards_landscape_wrap-2">
                <div className="container">
                <div style={{ position: "relative" }}>
                                            <div id="reader" width="100%" />
                                            <button onClick={() => handleClickAdvanced()}>
                                                click pro {props.type}
                                            </button>
                                            <button onClick={() => handleStop()}>stop pro</button>
                                        </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                            <div className="card-flyer">
                                <div className="text-box">
                                    <div className="image-box">
                                        <div style={{ position: "relative" }}>
                                            <div id="reader" width="100%" />
                                            <button onClick={() => handleClickAdvanced()}>
                                                click pro {props.type}
                                            </button>
                                            <button onClick={() => handleStop()}>stop pro</button>
                                        </div>
                                    </div>
                                    <div className="text-container">
                                        {/* <span className='text-white'>{result}</span>
                                        <button onClick={closeCam} type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">switch camera</button> */}
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container">

			<QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			onScan={handleScan}
			/>
			<div className={resultt}>{result}</div>		
		</div> */}
            <Footer />
        </>
    )
}

export default ScanTicket