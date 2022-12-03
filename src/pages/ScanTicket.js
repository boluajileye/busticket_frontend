import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
import { QrReader } from 'react-qr-reader';

const ScanTicket = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"))
    // if (user == null) {
    //     navigate("/login")
    // }
    // if (user?.role === 1) {
    //     navigate("/home");
    //     } 
    // });
    const [result, setResult] = useState('Hold your camera steady to scan');

    const scanner = useRef(null)
    const handleError = (err) => {
        console.err(err)
    }

    const handleScan = (result) => {
        if (result) {
            setResult(result)
        }
    }

    const previewStyle = {
        height: 240,
        width: 320,
    }

    const resultt = {
        height: 240,
        width: 320,
    }

    return (
        <>
            <NavBar />
            <div id="cards_landscape_wrap-2">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <div className="card-flyer">
                                    <div className="text-box">
                                        <div className="image-box">
                                            <QrReader
                                                delay={500}
                                                style={previewStyle}
                                                onError={handleError}
                                                onScan={handleScan}
                                                ref={node => { scanner = node; }}
                                            />
                                        </div>
                                        <div className="text-container">
                                            <h6>{result}</h6>
                                            <button onPress={() => scanner.reactivate()} type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">switch camera</button>
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