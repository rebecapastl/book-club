//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import User from './User.js';
import Book from './Book.js'

//the App class extends the component class
class App extends React.Component {
 
    //store a state that will be used by more than one child component 
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores all books to pass as props to the children
            allUsers:[],
            //stores all books to pass as props to the children
            allBooks:[]
            
        }
        
        this.allUsersUpdate = this.allUsersUpdate.bind(this); // refers to this of App
        this.allBooksUpdate = this.allBooksUpdate.bind(this); // refers to this of App
        
    }
    
    //method that is called only after the prop and states have been updated
    componentDidMount() {
        
        //all users
        axios.get('/api/v1/users')
        .then (usersList => {
            
            this.setState({
                
                allUsers:usersList.data
                
            });
            
        })
        //all books
        .then(() => axios.get('/api/v1/books'))
        .then (booksList => {
            
            this.setState({
                
                allBooks:booksList.data
                
            });
            
        })
        .catch(error => console.log(error));
        
    }
    
    allUsersUpdate(event){
        
        //all users
        axios.get('/api/v1/users')
        .then (newUsersList => {
            
            this.setState({
                
                allUsers:newUsersList.data
                
            });
            
        })    
        .catch(error => console.log(error));
        
    }
    
    allBooksUpdate(event){
        
        //all books
        axios.get('/api/v1/books')
        .then (newBooksList => {
            
            this.setState({
                
                allBooks:newBooksList.data
                
            });
            
        })    
        .catch(error => console.log(error));
    }

    //render method is how we create what is seen in the screen
    render() {
        //render the two main components: users and books
        return <>
            
            <Header />
            <div className='wrapper'>
                <User allUsers={this.state.allUsers} allUsersUpdate={this.allUsersUpdate}/>
                <Book allBooks={this.state.allBooks} allUsers={this.state.allUsers} allBooksUpdate={this.allBooksUpdate}/>
            </div>
            <Footer />
            
        </>;
        
    }    
    
}

export default App;