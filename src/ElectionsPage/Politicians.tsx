import React from 'react';
import "./ElectionsPage.css"
import { pages } from "../App";

//Redux
import {Person} from '../redux/types';

//Data that each politician component will have
export interface politician {

    //politician's name to display
    name: string
    //politician's picture to display
    picture: string
    //politicians match to display
    match: number
    //politicians city which will be used to present local officials to the user
    city: string
    //title the politician is running for so candidates running in the same race can be grouped together
    runningFor: string
    //current position (if they have one) to be included on their profile page
    currentPosition?: string
    /*
    Nums array that stores their quiz results
    Each element can be int from 1-4 
    the exception to this is the last questions which are 1-7 
    1 means strongly disagree, 2 means disagree, 3 means agree and 4 means strongly agree
    index indicates question #
    */
    quizResults: number[]
    pg:pages

    
}


/*
changePage is given as props so when a user clicks on a politician it can redirect to that politician page
politicianArr stores all the politicians in the system and is traversed in Poli 
to group by representatives from the same city and even further by the position they are running for
*/
interface ScreenProps {
    changePage: (page: pages) => void;
    politicianArr: politician[]
    you: Person;
}

//Need a constructor to set state

/* 
Class Poli sorts politicians by higher to lower match, 
then finds the locals using user's city
finally it prints the users politicians  
*/
export class Poli extends React.Component<ScreenProps> {
    
    render() {
        
        return (
        <div>
    {/*sort politicians which reorders the array from highest to lowest match is called here*/}
           {this.sortPoliticians()}
    {/*print politicians which displays local politicians in that users city*/}
           {this.printLocalPoliticians(this.props.you.city)}
        </div>
        )
    }

    //Sorts politicians from highest to lowest match
    private sortPoliticians() {  
        let arr = this.props.politicianArr.sort((a,b) => b.match - a.match);

    }

    //First finds local politicians then returns the html needed to render them and make them clickable
    private printLocalPoliticians(city:string) {
        let arr = this.props.politicianArr;
        const localArr = arr.filter(p => p.city.localeCompare(city) === 0);
        
     return (
        /*Map function is used to run through the array of politicians
        one by one and display their name, picture, and match percentage
        */ 
        localArr.map(politician=>
        <div key={politician.name} className="politician-info" onClick={(e) => this.props.changePage(politician.pg)}>
            
            <div className="politicianPicture">
                <img src={politician.picture} alt="Didn't display"></img>
            </div>
            <div className="NameNMatch">
                <h3 className="Name">
                <b>{politician.name}</b>
                </h3>
                <h4 className="Match">Match: {politician.match}%</h4>
            </div> 
        </div>
                )
            );
        }
    }


