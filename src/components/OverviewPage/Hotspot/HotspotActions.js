import React, { useState, useEffect } from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  Col,
  Alert,
  Spinner
} from "react-bootstrap";
import ReviewHotSpotChangesForm from '../../Reusable/ReviewHotSpotChangesForm'
import { useBackendAPI } from "../../../utils/backendAPI";



const HotspotActions = (props) => {

  const { postNewHotSpotChangeRequest, hotSpotChangeRequestCreationResolved } = useBackendAPI();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);
  const [confirmationPending, setConfirmationPending] = useState(false);
  const [confirmationResolved, setConfirmationResolved] = useState(false);

  const [name, setName] = useState(props.hotspotData.name);
  const [category, setCategory] = useState(props.hotspotData.category);
  const [description, setDescription] = useState(props.hotspotData.description);
  const [address, setAddress] = useState(props.hotspotData.address.address);
  const [weekDay, setWeekDay] = useState("Monday");
  const [openingTime, setOpeningTime ] = useState('');
  const [closingTime, setClosingTime ] = useState('');
  const [savedOpeningHours, setSavedOpeningHours] = useState([]);
  const [city, setCity] = useState(props.hotspotData.address.city);
  const [zip, setZip] = useState(props.hotspotData.address.postalCode);
  const [country, setCountry] = useState(props.hotspotData.address.country);
  
  const [hotspotWithChanges, setHotspotWithChanges] = useState();

  const handleOpeningHours = () => {
    setSavedOpeningHours(savedOpeningHours => [
         ...savedOpeningHours, {weekDay, openingTime, closingTime}
    ]);
  }

  const handleWeekDayChange = (e) => {
    setWeekDay(e.target.value);
  }

  const handleOpeningTimeChange = (e) => {
      setOpeningTime(e.target.value);
  }

  const handleClosingTimeChange = (e) => {
      setClosingTime(e.target.value);
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleChangeName = (e) => {
      setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleChangeAddress = (e) => {
      setAddress(e.target.value);
  }

  const handleChangeCity = (e) => {
      setCity(e.target.value)
  }

  const handleChangeZip = (e) => {
      setZip(e.target.value)
  }

  const handleChangeCountry = (e) => {
      setCountry(e.target.value)
  }

  const _renderTooltip = (msg) => {
    return <Tooltip id="button-tooltip">{msg}</Tooltip>;
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    initializeForm();
  }

  const closeReviewForm = () => {
    setShowReviewForm(false);
    initializeForm();
  }

  const initializeForm = () => {
    setName(props.hotspotData.name);
    setCategory(props.hotspotData.category);
    setDescription(props.hotspotData.description);
    setAddress(props.hotspotData.address.address);
    setWeekDay("Monday");
    setOpeningTime('');
    setClosingTime('');
    setSavedOpeningHours([]);
    setCity(props.hotspotData.address.city);
    setZip(props.hotspotData.address.postalCode);
    setCountry(props.hotspotData.address.country);
    setHotspotWithChanges();
    setConfirmationPending(false);
    setConfirmationResolved(false);
    console.log(props.hotspotData);
  }

  const onSubmit = () => {
    setShowEditForm(false);
    let newHotSpotOpeningHours;
    if (savedOpeningHours.length > 1) {
      newHotSpotOpeningHours = savedOpeningHours;
    } else {
      newHotSpotOpeningHours = props.hotspotData.openingHours;
    }
    setHotspotWithChanges({
      name: name,
      description: description,
      address: {
          address: address,
          postalCode: zip,
          city: city,
          country: country
      },
      category: category,
      location: props.hotspotData.location,
      openingHours: newHotSpotOpeningHours
    });
    
  }

  useEffect(() => {
    if (hotspotWithChanges) {
      setShowReviewForm(true);
    }
  },[hotspotWithChanges])

  const onConfirm = () => {
    setShowReviewForm(false);
    setConfirmationPending(true);
    setShowConfirmationForm(true);
    console.log(hotspotWithChanges);
    postNewHotSpotChangeRequest(props.hotspotData.slug, hotspotWithChanges);
  }

  useEffect(() => {
    if (hotSpotChangeRequestCreationResolved) {
      setConfirmationPending(false);
      setConfirmationResolved(true);
    }
  },[hotSpotChangeRequestCreationResolved])

  const closeConfirmationForm = () => {
    setShowConfirmationForm(false);
    initializeForm();
  }

  const onCancel = () => {
    setShowReviewForm(false);
    initializeForm();
  }

  return (
    <div className="hotspot-actions">
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 100 }}
        overlay={_renderTooltip("Suggest a change")}
      >
        <Button
          onClick={() => setShowEditForm(true)}
          className="action-button"
          variant=""
        >
          <i className="fas fa-pen"></i>
        </Button>
      </OverlayTrigger>
      <Modal
        show={showEditForm}
        onHide={closeEditForm}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit hotspot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  onChange={handleChangeName}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={category} onChange={handleChangeCategory}>
                  <option value="SPORTS">SPORTS</option>
                  <option value="FOOD">FOOD</option>
                  <option value="DRINKS">DRINKS</option>
                  <option value="ARTS">ARTS</option>
                  <option value="KNOWLEDGE">KNOWLEDGE</option>
                  <option value="MUSIC"> MUSIC</option>
                  </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={description}
                onChange={handleChangeDescription}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control value={address} onChange={handleChangeAddress} />
            </Form.Group>

            <Form.Row>
              <Form.Group controlId="formWeekDay">
                <Form.Label>Day of week</Form.Label>
                <Form.Control as="select" value={weekDay} onChange={handleWeekDayChange}>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formOpeningTime" value={openingTime} onChange={handleOpeningTimeChange}>
                <Form.Label>Opening Hours</Form.Label>
                <Form.Control placeholder="XX:XX:XX" />
              </Form.Group>

              <Form.Group as={Col} controlId="formClosingTime" value={closingTime} onChange={handleClosingTimeChange}>
                <Form.Label>Closing Hours</Form.Label>
                <Form.Control placeholder="XX:XX:XX" />
              </Form.Group>

              <Button variant="primary" onClick={handleOpeningHours}>Save</Button>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={handleChangeCity} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control value={zip} onChange={handleChangeZip} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control value={country} onChange={handleChangeCountry} />
              </Form.Group>
            </Form.Row>
          </Form>
          <Button
              onClick={onSubmit}
              variant="primary"
            >
              Submit
          </Button>
        </Modal.Body>
      </Modal>

      {showReviewForm && (<ReviewHotSpotChangesForm
        slug={props.hotspotData.slug}
        newData={hotspotWithChanges}
        show={showReviewForm}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmDescription="Submit changes for review"
        cancelDescription="Cancel submissions"
        onHide={closeReviewForm}
        >
        </ReviewHotSpotChangesForm>
      )}
      <Modal
        show={showConfirmationForm}
        onHide={closeConfirmationForm}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title>Change request sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirmationPending && ( <Spinner animation="border" role="status"> </Spinner> )}

                {confirmationResolved && (
                    <Alert variant="success">
                        Your request has been sent. It will be reviewed by an administrator.
                    </Alert>
                )}
                
            </Modal.Body>
        </Modal>
                    
    </div>
  );
};

export default HotspotActions;
