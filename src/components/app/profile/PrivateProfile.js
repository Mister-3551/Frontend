import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import Statistics from "./statistics/Statistics";
import Missions from "./misison/Missions";
import Account from "./account/Account";
import LeaderBoard from "./leaderboard/LeaderBoard";

export default function PrivateProfile() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="profile" className="mb-3" fill>
            <Tab eventKey="profile" title="Profile">
                <Statistics/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics">
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