import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class CustomSearch extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ref:this.props.ref,
            getStops: this.props.getStops,
            error:false,
            updateSchedule:this.props.updateSchedule,
        };
    }

    render() {
        return (
            <Autocomplete
                id="search"
                loading={this.state.getStops().length===0}
                loadingText={"Загрузка..."}
                options={this.state.getStops()}
                onChange={(event, value) => this.updateSchedule(value)}
                getOptionLabel={option => option.nameWithDirection}
                getOptionDisabled={option => option.id===-1}//loading option is disabled
                style={{width: "100%"}}
                renderInput={params => <TextField {...params} error ={this.state.error} label="Остановка" variant="outlined"/>}
            />
        );
    }

    updateSchedule(value) {
        if(value!==null) {
            console.log("selected stop: " + value.id + "  " + value.nameWithDirection);
            this.state.updateSchedule({id: value.id, name: value.nameWithDirection});
        }
    }
}
