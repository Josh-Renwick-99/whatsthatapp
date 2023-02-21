import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Message from 'components\Message.js'

class Chats extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false,
        }
    }
    
    componentDidMount(){
        this.setState({isLoading: true});
        fetch('http://localhost:3333/api/1.0.0/chat')
            .then(response => response.json())
            .then(data => this.setState({data}));
    }

    render(){
        const {data, isLoading} = this.state;
        if (isLoading){
            return <View><Text>Loading...</Text></View>
        }


        return (
            <View>
                {data.map(({name_, author_, time_}) => (
                    <Message name ={name_} author = {author_} time = {time_}/>
                ))}
            </View>
        );
    }
}

export default Chats;