import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../api/Api_instance';
import Alert from 'react-bootstrap/Alert';

const Schedule = () => {
  const [bus, setBus] = useState("");
  const [takeOffTime, setTakeOffTime] = useState("")
  const [dropOffTime, setDropOffTime] = useState("")
  const [ticketPrice, setTicketPrice] = useState("")
  const [takeOff, setTakeOff] = useState("")
  const [destination, setDestination] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [busSchedule, setBusSchedule] = useState([]);
  const [alert, setAlert] = useState("");
  const [refresh, setRefresh] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify({
      "bus_id": bus,
      "take_off_time": takeOffTime,
      "drop_off_time": dropOffTime,
      "take_off": takeOff,
      "destination": destination,
      "ticket_price": ticketPrice
    });
    console.log(data);
    await instance({
      url: "busschedule-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }).then((res) => {
      console.log(res);
      setAlert(res.data.message)
      setRefresh(true);
      setBus('');
      setTakeOffTime('');
      setDropOffTime('');
      setDestination('');
      setTakeOff('');
      setTicketPrice('');
    });
  }


  const getData = async () => {
    await instance({
      url: "bus/",
      method: "GET",
    }).then((res) => {

      setBusSchedule(res.data.bus);
      console.log(res.data.bus);
    });

  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const mappedOptions = busSchedule.map((schedule) => {
    return (
      <option className='uppercase' key={schedule.id} value={schedule.id}>{schedule.companyName} {schedule.licensePlate}</option>
    );
  });




  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Bus Schedule
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='very-dark  text-white'>
          <Modal.Title>Make Bus Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body className='very-dark'>
          {alert ?
            <Alert className='col-sm' key="success" variant="success" onClose={() => setShow(false)} transition dismissible>
              {alert}
            </Alert>
            : <div></div>}
          <form className='very-dark text-white' onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6 mb-2">
                <label>Bus</label>
                <select id="" className="form-control bg-dark text-white" name='bus' value={bus} onChange={e => setBus(e.target.value)}>
                  <option>Choose a Bus</option>
                  {mappedOptions}
                </select>
              </div>
              <div className="form-group col-md-6 mb-2">
                <label>Take Off Time</label>
                <input className="form-control bg-dark text-white" name='take_off_time' value={takeOffTime} onChange={e => setTakeOffTime(e.target.value)} />
              </div>
              <div className="form-group col-md-6 mb-2">
                <label>Drop Off Time</label>
                <input className="form-control bg-dark text-white" name='drop_off_time' value={dropOffTime} onChange={e => setDropOffTime(e.target.value)} />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>Take Off</label>
              <input type="text" className="form-control bg-dark text-white" id="" placeholder="Ibadan" name='take_off' value={takeOff} onChange={e => setTakeOff(e.target.value)} />
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>Destination</label>
              <input type="text" className="form-control bg-dark text-white" id="" placeholder="lagos" name='destination' value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>Ticket Price</label>
              <input type="number" className="form-control bg-dark text-white" id="" placeholder="Input Price" name='ticketPrice' value={ticketPrice} onChange={e => setTicketPrice(e.target.value)} />
            </div>
            <button  onClick={handleSubmit} type="submit" className="btn btn-secondary">Schedule</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Schedule