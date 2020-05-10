import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useBackendAPI } from "../../utils/backendAPI";
import Spinner from "react-bootstrap/Spinner"
import UserDeletionButton from "./UserDeletionButton"
import { useAuth0 } from "../../react-auth0-spa";


const AdminPageUserList = () => {
    const { findUsersForAdmin, userQueryResponse } = useBackendAPI();


    const [loading, setLoading] = useState();
    const [users, setUsers] = useState();

    const { user } = useAuth0();

    const updateUserList = () => {
        setLoading(true);
        findUsersForAdmin();
    }

    useEffect(() => {
        updateUserList();
    },[])

    useEffect(() => {
        if (userQueryResponse && userQueryResponse.status == 200) {
            if (userQueryResponse.status == 200) {
                setLoading(false)
                setUsers(userQueryResponse.data);
            }
        }
    },[userQueryResponse])

    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Nickname</th>
                <th>Action</th>
            </tr>
        </thead>

        {loading && ( <Spinner animation="border" role="status"> </Spinner> )}

        {users && users.filter( (selectedUser) => {
            if (user.sub == selectedUser.sub) {
                return false;
            }
            return true;
        }).map((selectedUser, index) => {
            return (<tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {selectedUser.name}
                </td>
                <td>
                    {selectedUser.nickname}
                </td>
                <td>
                    <UserDeletionButton user={selectedUser} onComplete={updateUserList}></UserDeletionButton>
                </td>
            </tr>)
        })}
    </Table>
}
export default AdminPageUserList;