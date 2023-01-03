import {Tab, Tabs} from "react-bootstrap";
import Statistics from "../profile/statistics/Statistics";
import React from "react";
import NewLevel from "./newlevel/NewLevel";
import Account from "./account/Account";


export default function Admin() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="basicStatistics" className="mb-3" fill>
            <Tab eventKey="basicStatistics" title="Statistics">
                <Statistics/>
            </Tab>
            <Tab eventKey="newLevel" title="Add Level">
                <NewLevel/>
            </Tab>
            <Tab eventKey="account" title="Account">
                <Account/>
            </Tab>
        </Tabs>
    );
}
