import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Message extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                <Text>Name: (this.props.name)</Text>
                <Text>Author: (this.props.author)</Text>
                <Text>Time: (this.props.name)</Text>
            </View>
        )
    }

}