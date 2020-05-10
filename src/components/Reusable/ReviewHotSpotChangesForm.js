import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useBackendAPI } from "../../utils/backendAPI";

const ReviewHotSpotChangesForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [ oldData, setOldData ] = useState();

    const { findCurrentHotSpotDataFromSlug, currentHotSpotData } = useBackendAPI();

    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState();
    const [openingTime, setOpeningTime] = useState();
    const [closingTime, setClosingTime] = useState();
    const [weekDay, setWeekDay] = useState();

    useEffect(() => {
        setOldData();
        setLoading(true);
        findCurrentHotSpotDataFromSlug(props.slug);
    },[])

    useEffect(() => {
        if (currentHotSpotData) {
            setLoading(false);

            setCity(props.newData.address.city);
            setAddress(props.newData.address.address);
            setPostalCode(props.newData.address.postalCode);
            setCountry(props.newData.address.country);
            setOpeningTime(props.newData.openingHours.map(function(item){ return item.openingTime }))
            setClosingTime(props.newData.openingHours.map(function(item){ return item.closingTime }));
            setWeekDay(props.newData.openingHours.map(function(item){ return item.weekDay }));
            setOldData(currentHotSpotData)
        }
    },[currentHotSpotData])

    return (
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Review changes
            </Modal.Title>
        </Modal.Header>
        {loading && ( <Spinner animation="border" role="status"> </Spinner> )}

        { oldData && (
            <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Name:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.name}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={props.newData.name} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Description:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.description}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={props.newData.description} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Category:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.category}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={props.newData.category} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"City"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.address.city}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col} >
                  <Form.Control plaintext value={city} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Address:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.address.address}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={address} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Postal code:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.address.postalCode}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={postalCode} />
                </Form.Group>
              </Form.Row>
    
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Country:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.address.country}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={country} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Weekday:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.openingHours.map(function(item){ return item.weekDay })}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={weekDay} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Opening time:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.openingHours.map(function(item){ return item.openingTime })}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={openingTime} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={"Closing time:"} />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control
                      plaintext
                      value={oldData.openingHours.map(function(item){ return item.closingTime })}
                    />
                  </Form.Row>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Control plaintext value={">"} />
                  </Form.Row>
                </Form.Group>
    
                <Form.Group as={Col}>
                  <Form.Control plaintext value={closingTime} />
                </Form.Group>
              </Form.Row>
              
            </Form>
            <Button variant="primary" onClick={props.onConfirm}>
                {props.confirmDescription}
            </Button>
            {' '}
            <Button variant="secondary" onClick={props.onCancel}>
                {props.cancelDescription}
            </Button>
          </Modal.Body>
        )}
    </Modal>
    )
};

export default ReviewHotSpotChangesForm;
