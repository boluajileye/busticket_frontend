import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import instance from '../api/Api_instance';

const Schedule = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [busSchedule, setBusSchedule] = useState([]);
  // const getData = async () => {
  //     await instance({
  //         url: "bus/",
  //         method: "GET",
  //       }).then((res) => {
          
  //         setBusSchedule(res.data.bus);
  //         console.log(res.data.bus);
  //       });
      
  //   };
    
  //   useEffect(() => {
  //     getData();
  //   }, []);

    // const mappedBusschedule = busSchedule.map((schedule) =>{
    //   return (
    //       <tr key={schedule.id}>
    //           <td>{schedule.id}</td>
    //           <td>{schedule.companyName}</td>
    //           <td>{schedule.licensePlate}</td>
    //           <td>{schedule.driverName}</td>
    //           <td>{schedule.busCapacity}</td>
    //       </tr>
    //   );
    // });

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Bus Schedule
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Schedule