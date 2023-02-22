import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import Statistics from "./statistics/Statistics";
import Missions from "./misison/Missions";
import Account from "./account/Account";
import LeaderBoard from "./leaderboard/LeaderBoard";

export default function PrivateProfile() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="statistics" className="mb-3" fill>
            <Tab eventKey="statistics" title="Statistics">
                <Statistics/>
            </Tab>
            <Tab eventKey="levelStatistics" title="Level Statistics">
                <Missions/>
            </Tab>
            <Tab eventKey="leaderBoard" title="Leader Board">
                <LeaderBoard/>
            </Tab>
            <Tab eventKey="account" title="Account">
                <Account/>
            </Tab>
        </Tabs>
    );
}