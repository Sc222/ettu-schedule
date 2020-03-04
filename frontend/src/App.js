import React from 'react';
import styles from './App.css';
import CustomSearch from "./CustomSearch";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import TramIcon from '@material-ui/icons/TramTwoTone';
import TrolleybusIcon from '@material-ui/icons/DirectionsBusTwoTone';
import UpdateIcon from '@material-ui/icons/RefreshTwoTone';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";
import MainToolbar from "./MainToolbar"
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

function stopsSort(stops) {
    stops.sort(function (a, b) {
        return a.nameWithDirection.localeCompare(b.nameWithDirection)
    });
    return stops;
}

function stopsJsonToArray(stopsJson) {
    let stops = [];
    for (let i = 0; i < stopsJson.length; i++)
        stops.push(stopsJson[i]);
    return stops;
}

function getCurrentTimeStr() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes;
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tramStops: [],
            trolleyStops: [],
            isTrams: true, //trams or trolleys
            schedule: null, //null - start, "error" - error, [] - no schedule for stop
            scheduleInfo: null,
            isScheduleLoading: false,
            lastUpdateTime: ""
        };
    }

    componentDidMount() {
        this.loadTramStops();
        this.loadTrolleyStops();
    }

    loadTramStops() {
        fetch("https://ettu-schedule.herokuapp.com/tram-stops")
            .then(res => res.json())
            .then(res => stopsJsonToArray(res))
            .then(res => stopsSort(res))
            .then(res => this.setState({tramStops: res}))
            .catch(err => console.log(err.toString()));
    }

    loadTrolleyStops() {
        fetch("https://ettu-schedule.herokuapp.com/trolley-stops")
            .then(res => res.json())
            .then(res => stopsJsonToArray(res))
            .then(res => stopsSort(res))
            .then(res => this.setState({trolleyStops: res}))
            .catch(err => console.log(err.toString()));
    }

    loadSchedule(scheduleInfo) {
        if (scheduleInfo == null)
            return;
        console.log("loading: " + scheduleInfo);
        this.setState({isScheduleLoading: true});
        fetch("https://ettu-schedule.herokuapp.com/transport-near-stops/" + scheduleInfo.id)
            .then(res => res.json())
            .then(res => {
                this.setState({isScheduleLoading: false});
                if (res.length === 0)
                    return [];
                if (res[0].name !== "error")
                    return res;
                else
                    throw new Error("error getting schedule: " + res);
            })
            .then(res => {
                res.sort(function (a, b) {
                        return a.distanceRemaining - b.distanceRemaining;
                    }
                );
                this.setState({schedule: res});
                this.setState({lastUpdateTime: getCurrentTimeStr()})
            })
            .catch(err => {
                //todo process getting schedule errors
                this.setState({schedule: "error"});
                console.log(err.toString());
            });
    }


    updateSchedule = (scheduleInfo) => {
        console.log("update sched: " + scheduleInfo.id + " " + scheduleInfo.name);
        this.setState({scheduleInfo: scheduleInfo});
        this.loadSchedule(scheduleInfo);
    };

    getStops = () => {
        if (this.state.isTrams)
            return this.state.tramStops;
        else
            return this.state.trolleyStops;
    };

    getTrolleyColor = () => {
        return this.state.isTrams ? "default" : "primary";
    };

    getTramColor = () => {
        return this.state.isTrams ? "primary" : "default";
    };
    
    onTrolleyIcClick() {
        if (this.state.trolleyStops.length === null) //load stops if they weren't
            this.loadTrolleyStops();
        this.setState({isTrams: false});
    }

    onTramIcClick() {
        if (this.state.tramStops === null) //load stops if they weren't
            this.loadTramStops();
        this.setState({isTrams: true});
    }

    //todo refactor
    //todo split in classes
    //todo replace margins with custom theme
    //todo custom THEME (colors, spacing, etc)
    //todo !!! react clear search when transport type chosen using createRef
    //todo !!! last update time
    //todo ! update schedule in real time
    //todo !!! error snackbar
    //todo !! REFACTOR TABLES, EXTRACT CLASSES
    render() {
        return (
            <div className={styles.root}>
                <MainToolbar/>
                <Container maxWidth="sm" style={{marginTop: 16, marginBottom: 16}}>
                    <Paper elevation={2} style={{paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16}}>
                        <Grid container direction="column" justify="center">
                            <Typography variant="h5" style={{paddingBottom: 8}}>
                                Где {this.state.isTrams ? "трамвай" : "троллейбус"}?
                            </Typography>
                            <Typography color="textSecondary" variant="body2" style={{paddingBottom: 16}}>
                                Выберите интересующий вас тип транспорта и укажите остановку.
                            </Typography>
                            <Divider variant="middle"/>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <IconButton style={{margin: 8}} onClick={() => this.onTramIcClick()}
                                            color={this.getTramColor()} aria-label="Трамвай">
                                    <TramIcon fontSize="large"/>
                                </IconButton>
                                <IconButton style={{margin: 8}} onClick={() => this.onTrolleyIcClick()}
                                            color={this.getTrolleyColor()} aria-label="Троллейбус">
                                    <TrolleybusIcon fontSize="large"/>
                                </IconButton>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid style={{marginTop: 16}} container direction="row" justify="center"
                                  alignItems="stretch">
                                <CustomSearch updateSchedule={this.updateSchedule} getStops={this.getStops}/>
                            </Grid>
                        </Grid>
                        <LinearProgress color="secondary" style={
                            {
                                visibility: this.state.isScheduleLoading ? "visible" : "hidden",
                                marginLeft: -16, marginRight: -16, marginTop: 8, marginBottom: -16
                            }
                        }/>
                    </Paper>
                    {(this.state.schedule !== null && this.state.schedule.length === 0)
                    &&
                    <Paper elevation={2} style={{marginTop: 16}}>
                        <TableContainer>
                            <Table aria-label="schedule table" size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                                <Typography variant="body2"
                                                            style={{flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                    <Box fontWeight="fontWeightMedium">{this.state.scheduleInfo.name}</Box>
                                                </Typography>
                                                <Typography variant="body2"
                                                            color="primary"
                                                            style={{display: "inline-block"}}>
                                                    <Box fontWeight="fontWeightMedium">{this.state.lastUpdateTime}</Box>
                                                </Typography>
                                                <IconButton style={{display: "inline-block"}} aria-label="update"
                                                            size="small" color="primary">
                                                    <UpdateIcon onClick={() => this.updateSchedule(this.state.scheduleInfo)}/>
                                                </IconButton>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3}>Нет данных</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    }
                    {
                        (this.state.schedule !== null && this.state.schedule !== "error" && this.state.schedule.length !== 0)
                        &&
                        <Paper elevation={2} style={{marginTop: 16}}>
                            <TableContainer>
                                <Table aria-label="schedule table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            {/*todo extract to table header class*/}
                                            <TableCell colSpan={3}>
                                                <Grid container direction="row" justify="flex-end" alignItems="center">
                                                    <Typography variant="body2"
                                                                style={{flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                        <Box fontWeight="fontWeightMedium">{this.state.scheduleInfo.name}</Box>
                                                    </Typography>
                                                    <Typography variant="body2"
                                                                color="primary"
                                                                style={{display: "inline-block"}}>
                                                        <Box fontWeight="fontWeightMedium">{this.state.lastUpdateTime}</Box>
                                                    </Typography>
                                                    <IconButton style={{display: "inline-block"}} aria-label="update"
                                                                size="small" color="primary">
                                                        <UpdateIcon onClick={() => this.updateSchedule(this.state.scheduleInfo)}/>
                                                    </IconButton>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>№</TableCell>
                                            <TableCell align="right">Время (мин)</TableCell>
                                            <TableCell align="right">Расстояние (м)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/*todo table row needs key*/}
                                        {this.state.schedule.map(tmp => (
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {tmp.name}
                                                </TableCell>
                                                <TableCell align="right">{tmp.timeRemaining}</TableCell>
                                                <TableCell align="right">{tmp.distanceRemaining}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    }
                </Container>
            </div>
        );
    }
}
