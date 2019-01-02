import React from "react";
import { shallow } from "enzyme";
import TestRenderer from 'react-test-renderer';
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
    let __defaultProps = {
        id: 4,
        name: "Eve Holt",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
    }

    it('renders correctly UserProfile correctly', () => {
        const tree = TestRenderer
            .create( < UserProfile / > )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call on delete callback on clicking delete button', () => {
        let onDelete = jest.fn();
        let event = {
            target: {
                id: __defaultProps.id
            }
        }
        let __component = shallow( < UserProfile onDeleteClick = { onDelete } />);
		__component.find('.delete-btn a').simulate('click', event); 
		expect(onDelete).toHaveBeenCalledWith(event); 
		expect(onDelete).toHaveBeenCalledTimes(1);
    })

    it('should call on delete callback only once on clicking delete button', () => {
        let onDelete = jest.fn();
        let event = {
            target: {
                id: __defaultProps.id
            }
        }
        let __component = shallow( < UserProfile onDeleteClick = { onDelete } />);
        __component.find('.delete-btn a').simulate('click', event); 
		expect(onDelete).toHaveBeenCalledTimes(1);
    })

    it('check deafult label', () => {
        let __component = shallow( < UserProfile / > )
        expect(__component.find('.title label').prop("innerText")).toEqual(__defaultProps.names)
    })

    it('check deafult avatar', () => {
        let __component = shallow( < UserProfile / > )
        expect(__component.find('.avatar').prop("src")).toEqual(__defaultProps.avatar)
    })

    it('should render correctly when supplied props', () => {
        let props = {
            id: 5,
            name: "Charles Morris",
            avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        }
        let __component = shallow( < UserProfile { ...props } />)
        expect(__component.find('.title label').prop("innerText")).toEqual(props.names); 
        expect(__component.find('.avatar').prop("src")).toEqual(props.avatar)
    })

    it('Should render avatar', () => {
        let __component = shallow( < UserProfile / > )
        expect(__component.find('.avatar')).toHaveLength(1)
    })

    it('Should render the name', () => {
        let __component = shallow( < UserProfile / > )
        expect(__component.find('.title')).toHaveLength(1)
    })

    it('Should render the delete button', () => {
        let __component = shallow( < UserProfile / > )
        expect(__component.find('.delete-btn')).toHaveLength(1)
    })

});