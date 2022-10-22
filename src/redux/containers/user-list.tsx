import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IPoliquickState, Person} from '../types'

// interface IUserListProps {
//     listOfPeople: Array<Person>

// }
  


// class UserList extends Component<IUserListProps> {

//     createListItems() {
//         return this.props.listOfPeople.map((person:Person) => {
//             return (
//                 <li 
//                     key = {person.id}
//                 >
//                     {person.username} {person.age}
//                 </li>
//             )
//         });
//     }

//     render () {
//         return (
//             <ul>
//                 {this.createListItems()}
//             </ul>
//         );
//     }

// }

// //takes piece of store, passes in to component as a prop
// function mapStateToProps (state :any) {
//     return {
//         listOfPeople: state.users
//     }
// }

// //map redux actions to component props
// function matchDispatchToProps (dispatch: any) {
// }

// export default connect(mapStateToProps, matchDispatchToProps)(UserList);