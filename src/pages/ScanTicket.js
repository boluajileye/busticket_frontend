import React from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const ScanTicket = (props) => {
    


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
                                    </div>
                                    <div className="text-container">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ScanTicket