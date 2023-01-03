import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import Statistics from "./statistics/Statistics";
import Levels from "./levels/Levels";

export default function PublicProfile() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="statistics" className="mb-3" fill>
            <Tab eventKey="statistics" title="Statistics">
                <Statistics/>
            </Tab>
            <Tab eventKey="levelStatistics" title="Level Statistics">
                <Levels/>
            </Tab>
        </Tabs>
    );
}