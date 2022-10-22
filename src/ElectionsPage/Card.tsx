import React from 'react';
import "./ElectionsPage.css";
/*
Card serves the purpose of grouping together politicians 
who are running in the same election and displaying information 
above the politician components such as the date the election takes place
*/

interface CProps {
    //Takes in election to display the title that candidates are running for
    election: string
    //Takes in date to display when an election takes place
    date: string
    //children refers to the politicians that will be nested within a card for a certain election
    children: any;
    
}

export default class CardCombined extends React.Component<CProps> {
render() {
    return (
    <div className="Card">
            <h3 className='Election'> 
                <b>Election:</b> 
                <small> {this.props.election}</small>
            </h3>
        <h3 className='Date'> 
            <b>Date: </b>
            <small>{this.props.date}</small>
        </h3>
        <h3 className="Candidates">Candidates:</h3>
        <div className ="politicians">

        {/*
        children given as prop and used here so the Poli component 
        (which contains all the politicians) can be nested within a Card 
        */}
        {this.props.children}
        </div>
    </div>
    );
}
}
