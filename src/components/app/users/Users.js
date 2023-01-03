import {Tab, Tabs} from "react-bootstrap";
import React from "react";
import Following from "./Following";
import Followers from "./Followers";

export default function Users() {
    return (
        <Tabs id="fill-tab-example" defaultActiveKey="following" className="mb-3" fill>
            <Tab eventKey="following" title="Following">
                <Following/>
            </Tab>
            <Tab eventKey="followers" title="Followers">
                <Followers/>
            </Tab>
        </Tabs>
    );
}