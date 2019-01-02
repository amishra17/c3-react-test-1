import React from "react";
import { shallow } from "enzyme";
import TestRenderer from 'react-test-renderer';
import { PearsonUsers } from "./PearsonUsers";
import { UserProfile } from './components/UserProfile';

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow( < PearsonUsers / > );
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it("renders instances of UserProfile components equal to the number of users in the state", () => {
    expect(component.find(UserProfile)).toHaveLength(component.state().users.length)
  });

  it("onDelete() should delete the passed user from the list", () => {
    expect(component.state().users.length).toEqual(3);
    let event = {
      target: {
        id: 4
      }
    }
    component.instance().onDelete(event);
    expect(component.state().users.length).toEqual(2);
    expect(component.state().users.find(user => user.id === event.target.id)).toBe(undefined)
  })

  it("removeDuplicates() should remove the duplicates from the list", () => {
    let userList = [{
        id: 4,
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      },
      {
        id: 5,
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
      },
      {
        id: 6,
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      },
      {
        id: 1,
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
      },
      {
        id: 2,
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
      },
      {
        id: 3,
        first_name: "Emma",
        last_name: "Wong",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
      },
      {
        id: 4,
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      },
      {
        id: 5,
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
      },
      {
        id: 6,
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      },
      {
        id: 7,
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
      },
      {
        id: 8,
        first_name: "Lindsay",
        last_name: "Ferguson",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
      },
      {
        id: 9,
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"
      },
      {
        id: 10,
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
      }
    ]
    let filteredList = component.instance().removeDuplicates(userList);
    expect(filteredList.length).toEqual(10);
    expect(filteredList.filter(el => el.id === 4 || el.id === 5 || el.id === 6)).toHaveLength(3);
  })
});