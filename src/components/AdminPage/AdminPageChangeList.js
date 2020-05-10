import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import { useBackendAPI } from "../../utils/backendAPI";
import Spinner from "react-bootstrap/Spinner"
import AdminPageViewComparisonButton from "./AdminPageViewComparisonButton"

const AdminPageChangeList = (props) => {
    const { getHotSpotChangesForAdmin, hotSpotChangesQueryResponse } = useBackendAPI();


    const [loading, setLoading] = useState();
    const [changes, setChanges] = useState(props.changes);

    const updateChangeList = () => {
        setLoading(true);
        getHotSpotChangesForAdmin();
    }

    /*useEffect(() => {
        updateChangeList();
    },[])*/

    useEffect(() => {
        if (hotSpotChangesQueryResponse) {
            setLoading(false)
            setChanges(hotSpotChangesQueryResponse.data);
            console.log(hotSpotChangesQueryResponse);
        }
    },[hotSpotChangesQueryResponse])

    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Suggested by</th>
                <th>HotSpot to change</th>
                <th>View comparison</th>
            </tr>
        </thead>

        {loading && ( <Spinner animation="border" role="status"> </Spinner> )}

        {changes && (changes.filter( (selectedChange) => {
                if (selectedChange.status == "REQUESTED") {
                    return true;
                }
                return false;
            }).map((selectedChange, index) => {
            return (<tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {selectedChange.creator.name}
                </td>
                <td>
                    {selectedChange.hotSpot.name}
                </td>
                <td>
                    <AdminPageViewComparisonButton change={selectedChange} onComplete={updateChangeList}></AdminPageViewComparisonButton>
                </td>
            </tr>)
        }))}
    </Table>
}
export default AdminPageChangeList;