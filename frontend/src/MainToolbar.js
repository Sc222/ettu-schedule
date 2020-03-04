import ScheduleIcon from "@material-ui/icons/EventNoteTwoTone";
import Typography from "@material-ui/core/Typography";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default class MainToolbar extends React.Component{

    render() {
        return <AppBar position="static">
            <Toolbar variant="dense">
                <ScheduleIcon edge="start" style={{marginRight: 16}}/>
                <Typography variant="h6" style={{flexGrow:1}}>
                    Ettu Schedule
                </Typography>
            </Toolbar>
        </AppBar>
    }
}