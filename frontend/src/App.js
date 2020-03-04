import React from 'react';
import styles from './App.css';
import CustomSearch from "./CustomSearch";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import TramIcon from '@material-ui/icons/TramTwoTone';
import TrolleybusIcon from '@material-ui/icons/DirectionsBusTwoTone';
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
import CustomToolbar from "./CustomToolbar"
import LinearProgress from "@material-ui/core/LinearProgress";

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
            schedule: [],
            isScheduleLoading: false
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
                return a.distanceRemaining - b.distanceRemaining;
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

    setIsScheduleLoading = (isLoading) => {
        this.setState({isScheduleLoading: isLoading});
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
    //todo !!! react clear search when transport type chosen using createRef
    //todo !!! last update time
    //todo ! update schedule in real time
    render() {
        return (
            <div className={styles.root}>
                <CustomToolbar/>
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

                                <IconButton style={{margin: 8}} onClick={() => {
                                    this.setState({isTrams: true});
                                }}
                                            color={this.getTramColor()}
                                            aria-label="Трамвай">
                                    <TramIcon fontSize="large"/>
                                </IconButton>
                                <IconButton style={{margin: 8}} onClick={() => {
                                    this.setState({isTrams: false});
                                }
                                }
                                            color={
                                                this.getTrolleyColor()} aria-label="Троллейбус">
                                    <TrolleybusIcon fontSize="large"/>
                                </IconButton>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid style={{marginTop: 16}} container direction="row" justify="center"
                                  alignItems="stretch">
                                <CustomSearch setScheduleLoading={this.setIsScheduleLoading}
                                              setSchedule={this.setSchedule} getStops={this.getStops}/>
                            </Grid>
                        </Grid>
                        <LinearProgress color="secondary" style={
                            {
                                visibility: this.state.isScheduleLoading ? "visible" : "hidden",
                                marginLeft: -16, marginRight: -16, marginTop: 8, marginBottom: -16
                            }
                        }/>
                    </Paper>

                    {
                        this.state.schedule.length !== 0 &&
                        <TableContainer component={Paper} elevation={2} style={{marginTop: 16}}>
                            <Table aria-label="schedule table" size="small">
                                <TableHead>
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
                        </TableContainer>}
                </Container>
                {/* //todo think about alerts
                    <Snackbar
                    anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                    open={this.state.schedule.length!==0}
                    autoHideDuration={1000}
                    onClose={()=>{}}>
                    <Alert severity="success">Данные успешно загружены!</Alert>
                </Snackbar>*/}
            </div>
        );
    }
}
