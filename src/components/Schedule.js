import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../api/Api_instance';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

const Schedule = () => {
  
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [busSchedule, setBusSchedule] = useState([]);
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
  }, []);

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
          <form className='very-dark text-white'>
            <div className="form-row">
              <div className="form-group col-md-6 mb-2">
                <label for="inputState">Bus</label>
                <select id="inputState" className="form-control bg-dark text-white">
                  {mappedOptions}
                </select>
              </div>
              <div className="form-group col-md-6 mb-2">
                <label for="inputEmail4">Take Off Time</label>
                <DateTimePicker onChange={onChange} value={value} className="bg-dark text-white"/>
              </div>
              <div className="form-group col-md-6 mb-2">
                <label for="inputPassword4">Drop Off Time</label>
                <DateTimePicker onChange={onChange} value={value} className="bg-dark text-white"/>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <label for="inputEmail4">Take Off</label>
              <input type="text" className="form-control bg-dark text-white" id="" placeholder="Ibadan" name='take_off' />
            </div>
            <div className="form-group col-md-6 mb-2">
              <label for="inputPassword4">Destination</label>
              <input type="text" className="form-control bg-dark text-white" id="inputPassword4" placeholder="lagos" name='destination' />
            </div>
            <div className="form-group col-md-6 mb-2">
              <label for="inputEmail4">Ticket Price</label>
              <input type="number" className="form-control bg-dark text-white" id="" placeholder="Input Price" name='ticketPrice' />
            </div>
            <button onClick={handleClose} type="submit" className="btn btn-secondary">Schedule</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Schedule