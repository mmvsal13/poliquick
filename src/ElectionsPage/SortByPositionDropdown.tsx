 import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {filterType} from "../App"

export interface DropDownProps {
	buttonText: string;
    item1: string;
    item2?: string;
    item3?: string;
    changeFilter: (filter: filterType) => void 
    
}

 class DropDown extends React.Component<DropDownProps> {

    render() {
        return (
            <>
                <Dropdown>
                    {/* Button text */}
                    <Dropdown.Toggle variant="secondary">
                        {this.props.buttonText}
                    </Dropdown.Toggle>

                    {/* Dropdown Items */}
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onSelect={_=>this.props.changeFilter(filterType.Mayor)}>
                            {this.props.item1}
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onSelect={_=>this.props.changeFilter(filterType.CityCouncil)}>
                            {this.props.item2}
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onSelect={_=>this.props.changeFilter(filterType.All)}>
                            {this.props.item3}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    }
}

export default DropDown;
