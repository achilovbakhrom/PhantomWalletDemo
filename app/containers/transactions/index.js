import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Transaction extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Hello Transaction! </Text>
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        width: '100%',
        height: '100%'
    }
});

export default Transaction;