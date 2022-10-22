import React from "react";
import { pages } from "../App";

interface PoliticianProps {
    name: string
    changePage: (page: pages) => void;
}


export class PoliticiansPage extends React.Component<PoliticianProps> {
    render() {
        
        return (
            <div>
                <h1> Hello World</h1> 
            </div>
        );
    }


}


