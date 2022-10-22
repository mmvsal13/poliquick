import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';

export interface DropDownProps {
	buttonText: string;
    item1: string;
    item2: string;
    item3: string;
}

 class DropDown extends React.Component<DropDownProps> {

    render() {
        return (
            <>
                <Dropdown className="generic-dropdown">
                    {/* Button text */}
                    <Dropdown.Toggle variant="secondary">
                        {this.props.buttonText}
                    </Dropdown.Toggle>

                    {/* Dropdown Items */}
                    <Dropdown.Menu >
                        <Dropdown.Item name = 'value' href="" >
                            {this.props.item1}
                        </Dropdown.Item>
                        <Dropdown.Item href="">
                            {this.props.item2}
                        </Dropdown.Item>
                        <Dropdown.Item href="">
                            {this.props.item3}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    }
}

export default DropDown;