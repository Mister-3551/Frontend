import {Tab, Tabs} from "react-bootstrap";
import React from "react";
import Account from "./account/Account";
import AdminStatistics from "./statistics/AdminStatistics";


export default function Admin() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="basicStatistics" className="mb-3" fill>
            <Tab eventKey="basicStatistics" title="Statistics">
                <AdminStatistics/>
            </Tab>
            <Tab eventKey="account" title="Account">
                <Account/>
            </Tab>
        </Tabs>
    );
}
