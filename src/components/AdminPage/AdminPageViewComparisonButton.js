import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import ReviewHotSpotChangesForm from "../Reusable/ReviewHotSpotChangesForm"
import { useBackendAPI } from "../../utils/backendAPI";

const AdminPageViewComparisonButton = (props) => {

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);
    const [confirmationPending, setConfirmationPending] = useState(false);
    const [confirmationResolved, setConfirmationResolved] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const {submitHotSpotChangeRequestStatus, hotSpotChangeUpdateQueryResponse} = useBackendAPI();

    const onApprove = () => {
        console.log("approved");
        setShowReviewForm(false);
        setShowConfirmationForm(true);
        setConfirmationPending(true);
        setConfirmationMessage("Change request has been successfully approved.")
        submitHotSpotChangeRequestStatus(props.change.id, "ACCEPTED");
    }

    const onDeny = () => {
        console.log("denied");
        setShowReviewForm(false);
        setShowConfirmationForm(true);
        setConfirmationPending(true);
        setConfirmationMessage("Change request has been successfully denied.")
        submitHotSpotChangeRequestStatus(props.change.id, "DENIED");
    }

    useEffect(() => {
        console.log(hotSpotChangeUpdateQueryResponse)
        if (hotSpotChangeUpdateQueryResponse && hotSpotChangeUpdateQueryResponse.status == 200 && confirmationPending) {
            setConfirmationPending(false);
            setConfirmationResolved(true);
        }
    },[hotSpotChangeUpdateQueryResponse]);

    const closeReviewForm = () => {
        setShowReviewForm(false);
        setShowConfirmationForm(false);
        setConfirmationPending(false);
        setConfirmationResolved(false);
        setConfirmationMessage("");
        props.onComplete();
    }

    const closeConfirmationForm = () => {
        setShowReviewForm(false);
        setShowConfirmationForm(false);
        setConfirmationPending(false);
        setConfirmationResolved(false);
        setConfirmationMessage("");
        props.onComplete();
    }

    return (
        <>
            <Button onClick={() => {setShowReviewForm(true)}}>Review Changes</Button>

            {showReviewForm && (<ReviewHotSpotChangesForm
                slug={props.change.hotSpot.slug}
                newData={props.change}
                show={showReviewForm}
                onConfirm={onApprove}
                onCancel={onDeny}
                confirmDescription="Approve changes"
                cancelDescription="Deny changes"
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
                    <Modal.Title>Status updating</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {confirmationPending && ( <Spinner animation="border" role="status"> </Spinner> )}

                    {confirmationResolved && (
                        <Alert variant="success">
                            {confirmationMessage}
                        </Alert>
                    )}

                </Modal.Body>
            </Modal>
            
        </>
    )
    
}

export default AdminPageViewComparisonButton;

