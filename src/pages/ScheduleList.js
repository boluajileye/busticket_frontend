import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const ScheduleList = () => {
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
  const [busSelect, setBusSelect] = useState([]);
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

      setBusSelect(res.data.bus);
      console.log(res.data.bus);
    });

  };

  const getBusSchedule = async () => {
    await instance({
      url: "busschedule/",
      method: "GET",
    }).then((res) => {

      setBusSchedule(res.data.busschedule);
      console.log(res.data.busschedule);
    });

  };

  useEffect(() => {
    getData();
    getBusSchedule();
  }, [refresh]);

  const mappedOptions = busSelect.map((schedule) => {
    return (
      <option className='uppercase' key={schedule.id} value={schedule.id}>{schedule.companyName} {schedule.licensePlate}</option>
    );
  });

  const mappedBusSchedule = busSchedule.map((busSchedule, index) => {
    return (
      <tr key={busSchedule.id}>
        <td>{index + 1}</td>
        <td>{busSchedule.take_off}</td>
        <td>{busSchedule.destination}</td>
        <td>{busSchedule.take_off_time}</td>
        <td>{busSchedule.drop_off_time}</td>
        <td>{busSchedule.ticket_price}</td>
        <td className='text-capitalize'>{busSchedule.bus.companyName}</td>
        <td className='uppercase'>{busSchedule.bus.licensePlate}</td>
        <td>{busSchedule.bus.driverName}</td>
        <td>{busSchedule.bus.busCapacity}</td>
      </tr>
    );
  });
  return (
    <div className='container py-5'>
      {alert ?
      <Alert className='col-sm' key="success" variant="success"  onClose={() => setShow(false)} transition dismissible>
        {alert}
      </Alert>
      :<div></div>}
      <div className='mb-3'>
        <h3 className="card-header d-flex justify-content-between align-items-center text-white">
          Bus Schedule List
           <button type="button" className="btn btn-sm btn-secondary px-3 py-2" onClick={handleShow}>Add Bus</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='very-dark  text-white'>
              <Modal.Title>Add Bus Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body className='very-dark'>
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
            <button onClick={handleClose} type="submit" className="btn btn-secondary">Schedule</button>
          </form>
            </Modal.Body>
          </Modal>
        </h3>
      </div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className='bg-white text-black'>S/N</th>
            <th className='bg-white text-black'>Take Off</th>
            <th className='bg-white text-black'>Destination</th>
            <th className='bg-white text-black'>Take Off Time</th>
            <th className='bg-white text-black'>Drop Off Time</th>
            <th className='bg-white text-black'>Ticket Price</th>
            <th className='bg-white text-black'>Company Name</th>
            <th className='bg-white text-black'>License Plate</th>
            <th className='bg-white text-black'>Driver Name</th>
            <th className='bg-white text-black'>Bus Capacity</th>
          </tr>
        </thead>
        <tbody>
          {mappedBusSchedule}
        </tbody>
      </Table>
    </div>
  )
}

export default ScheduleList