import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import Statistics from "./statistics/Statistics";
import Missions from "./misison/Missions";

export default function PublicProfile() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="profile" className="mb-3" fill>
            <Tab eventKey="profile" title="Profile">
                <Statistics/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics">
                <Missions/>
            </Tab>
        </Tabs>
    );
}