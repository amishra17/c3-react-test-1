import React, { Component } from "react";
import fetch from 'isomorphic-fetch';

import { UserProfile } from "./components/UserProfile/";
import "./PearsonUsers.css";

export class PearsonUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`https://reqres.in/api/users?page=1&per_page=10`).then(response => {
      if(response.status >= 400){
        console.log('Error in fetching data')
      }
      return response.json()
    }).then(res => {
      this.updateUserList(res.data);
    })
  }

  updateUserList = responseData => {
    this.setState(
      prevState => {
      const filteredData = this.removeDuplicates(prevState.users.concat(responseData));
      return {users : filteredData}
    })
  }

  removeDuplicates = list => {
    return list.filter((user, index, thisList) => index === thisList.findIndex(el => el.id === user.id))
  }

  onDelete = event => {
    const id = event.target.id;
    this.setState(prevState => {
      return {
        users : prevState.users.filter(user => user.id !== parseInt(id, 10))
        }
    })
  }

  render() {
    const userProfileList = this.state.users.map((user) => {
      const name=`${user.first_name} ${user.last_name}`;
      return (
          <UserProfile
          key={user.id}
          id={user.id}
          avatar={user.avatar}
          name={name}
          onDeleteClick={this.onDelete}
          />
        )
      } 
    )
    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
          <div className="container">
          {userProfileList}
          </div>
      </div>
    );
  }
}
