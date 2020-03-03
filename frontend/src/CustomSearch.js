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
            setSchedule:this.props.setSchedule
        };
    }

    /*getStops = () =>
    {
       return this.state.getStops();
       // return [{id:100,nameWithDirection:"опа"},{id:101,nameWithDirection:"опвва"}]
    };*/

    render() {
        return (
            <Autocomplete
                id="search"
                loading={this.state.getStops().length===0}
                loadingText={"Загрузка..."}
                options={this.state.getStops()}
                onChange={(event, value) => this.getStopSchedule(value)}
                getOptionLabel={option => option.nameWithDirection}
                getOptionDisabled={option => option.id===-1}//loading option is disabled
                style={{width: "100%"}}
                renderInput={params => <TextField {...params} error ={this.state.error} label="Остановка" variant="outlined"/>}
            />
        );
    }

    getStopSchedule(value) {
        console.log(value);
        if(value!=null) {
            //todo loading icon on the bottom of the card
            fetch("https://ettu-schedule.herokuapp.com/transport-near-stops/" + value.id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.state.setSchedule(res);
                    //todo process errors
                    //todo show error dialog
                    /*if(res.length!==0&&res.name!=="error")
                        this.state.setSchedule(res);
                    else
                    {

                    }*/
                });
        }
    }
}
