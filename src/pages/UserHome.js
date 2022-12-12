import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../api/Api_instance';
import { QRCode } from 'react-qrcode-logo';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserNav from '../components/UserNav';

const UserHome = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if (user == null) {
      navigate("/login")
    }
  });
  const userId = user?.user.id


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ticket, setTicket] = useState();
  const getData = async () => {
    // setLoading(true);
    await instance({
      url: `busticket/${userId}/user`,
      method: "GET",
    }).then((res) => {
      setTicket(res.data.bus)
    });

  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const [active, handleActive] = useState(false);


  const mappedTicket = ticket?.map((t, index) => {
    return (
      <div key={t.id}
        id="cardContainer"
        style={{
          height: active ? `300px` : `100px`,
          transition: "0.9s"
        }}
        onClick={() => {
          handleActive(!active);
        }}
      >
        <div id="firstDisplay">
          <div id="flightDetail">
            <div
              id="detailLabel"
              style={{ fontWeight: "bold", color: "rgb(13, 28, 83)" }}
            >
              From
            </div>
            {t.bus_schedule.take_off}
            <div id="detailLabel">{t.bus_schedule.take_off}</div>
          </div>
          <div
            id="flightDetail"
            style={{
              marginTop: "15px"
            }}
          >
            <div id="animContainer">
              <div id="anim">
                <div id="circle" />
                <div id="circle" />
                <div id="circle" />
              </div>
            </div>
            <div id="animContainer" style={{ left: "62px" }}>
              <div id="anim">
                <div id="circle" />
                <div id="circle" />
                <div id="circle" />
              </div>
            </div>
            <img
              alt=''
              style={{ width: "30px" }}
              src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
            />
          </div>
          <div id="flightDetail">
            <div
              id="detailLabel"
              style={{ fontWeight: "bold", color: "rgb(13, 28, 83)" }}
            >
              To
            </div>
            {t.bus_schedule.destination}
            <div id="detailLabel">{t.bus_schedule.destination}</div>
          </div>
        </div>
        <div
          id="first"
          style={{
            transform: active
              ? `rotate3d(1, 0, 0, -180deg)`
              : `rotate3d(1, 0, 0, 0deg)`,
            transitionDelay: active ? "0s" : "0.3s"
          }}
        >
          <div id="firstTop">
            <h2 className='pt-4' style={{ color: "red" }}>
              {/* {ticket.status} */}
            </h2>
            <div id="timecontainer">
              <div id="detailDate">

                <div id="detailTime" className='uppercase'>
                  {(t.bus_schedule.take_off).substring(0, 3)}</div>
                {t.bus_schedule.take_off_time}
              </div>
              <img
                alt=''
                style={{
                  width: "30px",
                  height: "26px",
                  marginTop: "22px",
                  marginLeft: "16px",
                  marginRight: "16px"
                }}
                src="data:image/jpeg;base64,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"
              />
              <div id="detailDate">

                <div id="detailTime" className='uppercase'>
                  {(t.bus_schedule.destination).substring(0, 3)}
                </div>
                {t.bus_schedule.drop_off_time}
              </div>
            </div>
          </div>
          <div id="firstBehind">
            <div id="firstBehindDisplay">
              <div id="firstBehindRow">
                <div id="detail">
                  {(t.bus_schedule.take_off_time).slice(-5)} - {(t.bus_schedule.drop_off_time).slice(-5)}
                  <div id="detailLabel">Travel Time</div>
                </div>
                <div id="detail">
                  1
                  <div id="detailLabel">Admit</div>
                </div>
              </div>
              <div id="firstBehindRow">
                <div id="detail">
                  100 min
                  <div id="detailLabel">Duration</div>
                </div>
                <div id="detail">
                  {t.reference}<div id="detailLabel">Reference</div>
                </div>
              </div>
              <div id="firstBehindRow">
                <div id="detail">
                  {(t.bus_schedule.take_off_time).slice(-5)}
                  <div id="detailLabel">Boarding</div>
                </div>
                <div id="detail">
                  {Math.floor(Math.random() * 50) + 1}
                  <div id="detailLabel">Seat</div>
                </div>
              </div>
            </div>
            <div
              id="second"
              style={{
                transform: active
                  ? `rotate3d(1, 0, 0, -180deg)`
                  : `rotate3d(1, 0, 0, 0deg)`,
                transitionDelay: active ? "0.2s" : "0.2s"
              }}
            >
              <div id="secondTop" />
              <div id="secondBehind">
                <div id="secondBehindDisplay">
                  <div id="price">
                    ₦{t.price}
                    <div id="priceLabel">Price</div>
                  </div>
                  <div id="price">
                    {t.status}
                    <div id="priceLabel">Status</div>
                  </div>
                </div>
                <div
                  id="third"
                  style={{
                    transform: active
                      ? `rotate3d(1, 0, 0, -180deg)`
                      : `rotate3d(1, 0, 0, 0deg)`,
                    transitionDelay: active ? "0.4s" : "0s"
                  }}
                >
                  <div id="thirdTop" />
                  <div id="secondBehindBottom">
                    <Popup trigger={<button id="button"
                      style={{
                        color: "rgb(13, 28, 83)",
                        border: `1px solid rgb(13, 28, 83)`
                      }}
                    >
                      View</button>} position="top center">
                      <QRCode qrStyle="dots" value={t.reference} fgColor="#5D54A4" includeMargin imageSettings={{ src: "/Logo.png", excavate: true }} />

                    </Popup>
                    {/* <button
                      id="button"
                      style={{
                        color: "rgb(13, 28, 83)",
                        border: `1px solid rgb(13, 28, 83)`
                      }}
                      onClick={handleShoww}
                    >
                      View
                    </button>
                    <Modal show={show} onHide={handleClosee}>
                      <Modal.Body className='mx-auto'>
                        </Modal.Body>
                    </Modal> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });


  return (
    <>
      <UserNav />
      <div className="container pt-2">
        <Button variant="primary" onClick={handleShow}>
          Buy Ticket
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className='card-color text-white'>
            <Modal.Title>Buy a Bus Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body className='card-color'>
            <form className='card-color text-white'>
              <div className="form-group col-md-6 mb-2">
              </div>
              <div className="form-group col-md-6 mb-2">
                <label>Take Off</label>
                <input type="text" className="form-control bg-dark text-white" id="" placeholder="Ibadan" name='take_off' />
              </div>
              <div className="form-group col-md-6 mb-2">
                <label>Destination</label>
                <input type="text" className="form-control bg-dark text-white" id="" placeholder="lagos" name='destination' />
              </div>
              <div className="form-group col-md-6 mb-2">
                <label>Ticket Price</label>
                <input type="number" className="form-control bg-dark text-white" id="" placeholder="Input Price" name='ticketPrice' />
              </div>
              <button type="submit" className="btn btn-secondary">Schedule</button>
            </form>
          </Modal.Body>
        </Modal>
        <div className="card card-header">
          <h3 className='text-white text-center underline'>Your Available Tickets</h3>
          <div className="row py-3">
            {mappedTicket}
          </div>
        </div>
      </div>
      <div className='mb-6'></div>
      <Footer />
    </>
  )
}

export default UserHome