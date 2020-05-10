import React, {useState, useEffect} from "react";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import "./AdminActions.css";
import AdminPageUserList from "./AdminPageUserList";
import AdminPageChangeList from "./AdminPageChangeList";

import Button from "react-bootstrap/Button"
import ReviewHotSpotChangesForm from "../Reusable/ReviewHotSpotChangesForm";
import { useBackendAPI } from "../../utils/backendAPI";


const AdminActions = (props) => {
    const [key, setKey] = useState('View change requests')

    return <Tabs
            id="Admin actions"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="custom-tabs">
                <Tab eventKey="View change requests" title="View change requests" tabClassName="bg-darkblue">
                    <AdminPageChangeList changes={props.changes}></AdminPageChangeList>
                </Tab>
                <Tab eventKey="Manage users" title="Manage Users" tabClassName="bg-darkblue">
                    <AdminPageUserList></AdminPageUserList>
                </Tab>
            </Tabs>
}

export default AdminActions