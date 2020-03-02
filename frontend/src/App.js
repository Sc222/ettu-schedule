import React from 'react';
import styles from './App.css';
import CustomSearch from "./CustomSearch";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import TramIcon from '@material-ui/icons/TramTwoTone';
import TrolleybusIcon from '@material-ui/icons/DirectionsBusTwoTone';
import ScheduleIcon from '@material-ui/icons/EventNoteTwoTone';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";

function stopsSort(stops) {
    stops.sort(function (a, b) {
        return a.nameWithDirection.localeCompare(b.nameWithDirection)
    });
    for (let i = 0; i < stops.length; i++)
        console.log(stops[i].id + ": " + stops[i].nameWithDirection);
    return stops;
}

function stopsJsonToArray(stopsJson) {
    let stops = [];
    for (let i = 0, stop; i < stopsJson.length; i++) {
        stop = stopsJson[i];
        stops.push(stop);
    }
    return stops;
}

const loading = [];

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tramStops: null,
            trolleyStops: null,
            isTrams: true, //trams or trolleys
            schedule: []
        };
    }

    componentDidMount() {

        fetch("https://ettu-schedule.herokuapp.com/tram-stops")
            .then(res => res.json())
            .then(res => stopsJsonToArray(res))
            .then(res => stopsSort(res))
            .then(res => this.setState({tramStops: res}));

        fetch("https://ettu-schedule.herokuapp.com/trolley-stops")
            .then(res => res.json())
            .then(res => stopsJsonToArray(res))
            .then(res => stopsSort(res))
            .then(res => this.setState({trolleyStops: res}));
    }

    setSchedule = (schedule) => {
        schedule.sort(function (a, b) {
                return a.distanceRemaining.localeCompare(b.distanceRemaining);
            }
        );
        console.log(schedule);
        this.setState({schedule: schedule});
        //todo debug when no schedule
        /*let tmp = [{"name": "5", "timeRemaining": "0", "distanceRemaining": "100"},
            {"name": "6", "timeRemaining": "0", "distanceRemaining": "200"},
            {"name": "5", "timeRemaining": "1", "distanceRemaining": "10"},
            {"name": "5", "timeRemaining": "0", "distanceRemaining": "300"}];

        tmp.sort(function (a, b) {
                return a.distanceRemaining.localeCompare(b.distanceRemaining);
            }
        );
        console.log("set set set");
        console.log(tmp);
        this.setState({schedule: tmp});*/
    };

    getStops = () => {
        if (this.state.isTrams) {
            if (this.state.tramStops == null)
                return loading;
            return this.state.tramStops;
        } else {
            if (this.state.trolleyStops == null)
                return loading;
            return this.state.trolleyStops;
        }
    };

    getTrolleyColor = () => {
        return this.state.isTrams ? "default" : "primary";
    };

    getTramColor = () => {
        return this.state.isTrams ? "primary" : "default";
    };

    //todo refactor
    //todo split in classes
    //todo replace margins with custom theme
    //todo custom THEME (colors, spacing, etc)
    render() {
        return (
            <div className={styles.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <ScheduleIcon edge="start" style={{marginRight: 16}}/>
                        <Typography variant="h6" className={styles.header}>
                            Ettu Schedule
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="sm" style={{marginTop: 16, marginBottom: 16}}>
                    <Paper elevation={2} style={{padding: 16}}>
                        <Grid container direction="column" justify="center">
                            <Typography variant="h4" style={{paddingBottom: 8}}>
                                Где {this.state.isTrams ? "трамвай" : "троллейбус"}?
                            </Typography>
                            <Typography color="textSecondary" variant="body1" style={{paddingBottom: 16}}>
                                Выберите интересующий вас тип транспорта, а затем введите остановку.
                            </Typography>
                            <Divider variant="middle"/>
                            <Grid container direction="row" justify="center" alignItems="center">

                                <IconButton style={{margin: 8}} onClick={() => this.setState({isTrams: true})}
                                            color={this.getTramColor()}
                                            aria-label="Трамвай">
                                    <TramIcon fontSize="large"/>
                                </IconButton>
                                <IconButton style={{margin: 8}} onClick={() => this.setState({isTrams: false})}
                                            color={this.getTrolleyColor()} aria-label="Троллейбус">
                                    <TrolleybusIcon fontSize="large"/>
                                </IconButton>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid style={{marginTop: 16}} container direction="row" justify="center"
                                  alignItems="stretch">
                                <CustomSearch setSchedule={this.setSchedule} getStops={this.getStops}/>
                            </Grid>
                        </Grid>
                    </Paper>

                    {this.state.schedule.length===0?"":<TableContainer  component={Paper} elevation={2} style={{marginTop: 16}}>
                        <Table aria-label="schedule table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{this.state.isTrams ? "Трамвай" : "Троллейбус"}</TableCell>
                                    <TableCell align="right">Время ожидания (мин)</TableCell>
                                    <TableCell align="right">Расстояние до остановки (м)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.schedule.map(tmp => (
                                    <TableRow key={tmp.name}>
                                        <TableCell component="th" scope="row">
                                            {tmp.name}
                                        </TableCell>
                                        <TableCell align="right">{tmp.timeRemaining}</TableCell>
                                        <TableCell align="right">{tmp.distanceRemaining}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Container>
            </div>
        );
    }
}
