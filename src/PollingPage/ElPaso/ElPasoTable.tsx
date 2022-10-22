import React, {Component} from "react"
import data from '../Locations.json'
import '../components/table.css'

//interface used by the class. A location is a poll
export interface Cities{
    elPaso: location[],
}

//interface for the address of a poll
export interface location{
    id: string,
    locationName: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    zip: string,
}

//state starts off as an empty array
class elPasoTable extends Component<{}, Cities>{
    constructor(props: any){
        super(props);
        this.state = {
            elPaso:[]
        };
    }

    //read the JSON file and set the state to poll locations for El Paso
    componentDidMount() {
        this.setState({
            elPaso: data.elPaso,
        })
    }

    render() {
        return (
            <table id="locationTable">
                <thead>
                    <tr>{this.headerNames()}</tr>
                </thead>
                <tbody>
                    {this.dataRows()}
                </tbody>
            </table>
        )
    }

    /* function that created the header of table fo poll legend */
    private headerNames() {
        let headers: string[] = [
            "ID",
            "Location",
        ]
        return(
            headers.map(header =>
                <th key={header}>{header.toUpperCase()}</th>)
        )
    }

    /* function that parses through data in state to create table */
    private dataRows() {
        return(
            this.state.elPaso.map( row =>
                <tr>
                <td>{row.id}</td>
                <td>{row.line1} {row.line2} {row.city} {row.state} {row.zip}</td>
                </tr>
                
                )
        )
    }
}

export default elPasoTable