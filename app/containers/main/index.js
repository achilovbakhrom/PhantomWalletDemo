import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, Dimensions, TextInput, Picker} from 'react-native';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import {generateMnemonicsAction, getBalanceAction} from '../../redux/main/actions';
import {connect} from "react-redux";
import { FlatList } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window')

class Main extends Component {

    state = {
        sendModalVisible: false,
        selectedCurrency: 'bitcoin',
        mnemonics: 'project nasty dose grunt ritual price gap prison degree agent satisfy across',        
        bitcoinBalance: 0
    }

    constructor(props) {
        super(props)
        this.handleSendModal = this.handleSendModal.bind(this);
        this.sendTransactionModal = this.sendTransactionModal.bind(this);
    }

    handleSendModal() {
        this.setState({
            sendModalVisible: !this.state.sendModalVisible
        })
    }

    sendTransactionModal() {
        return(
            <Modal
                animationType="slide"
                transparent={true}                
                visible={this.state.sendModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View 
                    style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Send Transaction</Text>
                        <View>
                            <Picker 
                                selectedValue={this.state.selectedCurrency} 
                                style={styles.modalPicker}
                                onValueChange={(loc) => this.setState({selectedCurrency: loc})}
                                itemStyle={styles.modelPickerItem}>
                                <Picker.Item label = "Bitcoin" value = "bitcoin" />
                                <Picker.Item label = "NEM" value = "nem" />
                                <Picker.Item label = "Ethereum" value = "ether" />
                            </Picker>
                        </View>
                        <View style={styles.modalToContainer}>
                            <TextInput 
                            multiline={false} 
                            style={styles.modalToInputStyle}
                            placeholder='To: '
                            />
                        </View>
                        <View style={styles.modalToContainer}>
                            <TextInput 
                                multiline={false} 
                                style={styles.modalToInputStyle}
                                placeholder='Fee: '
                                />
                        </View>
                        <View style={styles.modalToContainer}>
                            <Button 
                                    style={styles.modalSendButton}
                                    onPress={() => {this.handleSendModal()}}
                                    title='send'
                                />
                        </View>
                    </View>
                </View>                        
          </Modal>
        )
    }

    render() {        
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.mnemmonicsCenterText}>Mnemonics</Text>
                    <TextArea 
                    editable={true}
                    value={this.state.mnemonics}
                    onChangeText={(text) => {
                        this.setState({
                            mnemonics: text
                        })
                    }}
                    style={styles.textArea}/>                    
                    <View style={styles.mnemonicsButtonsContainer}>
                        <Button style={styles.mnemonicsButton} title='Generate' onPress={() => this.props.generateMnemonics()}/>
                        <Button style={styles.mnemonicsButton} title='Verify' onPress={() => this.props.getBalance(this.state.mnemonics)}/>
                    </View>
                    <View style = {styles.lineStyle} />
                    <View style={styles.balance}>
                        <Text style={styles.balanceTitle}> Balance </Text>
                        <View style={styles.balanceRowContainer}>
                            <Text style={styles.balanceRow}>Bitcoin: {this.props.bitcoinBalance || 0} BTC </Text>
                        </View>
                        <View style={styles.balanceRowContainer}>
                            <Text style={styles.balanceRow}>NEM: 100,2 XEM </Text>
                        </View>
                        <View style={styles.balanceRowContainer}>
                            <Text style={styles.balanceRow}>Bistox: 1110,61 BSX </Text>
                        </View>                        
                    </View>
                    <View style = {styles.lineStyle} />
                    <View style={styles.addressesContainer}>
                        <View
                            style={styles.createAddressButtonContainer}>
                            <Button 
                            title='Create Address'
                            style={styles.mnemonicsButton}  />
                        </View>                        
                        <FlatList style={styles.addressesList} />
                    </View>
                    <View style = {styles.lineStyle} />
                    <View>
                        <Button 
                            onPress={() => {this.handleSendModal()}}
                            style={styles.sendButton}
                            title='Send'
                        />
                    </View>
                    {this.sendTransactionModal()}
                </View>
            </ScrollView>            
        )
    }    
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        flex: 1,
        width: '100%',
        height: 'auto'
    },
    mnemmonicsCenterText: {
        margin: 15,
        fontWeight: 'bold',
        fontSize: 20
    },
    textArea: {
        backgroundColor: 'white',
        minHeight: 200,
        margin: 10
    },
    mnemonicsButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mnemonicsButton: {
        flex: 1,
        margin: 10        
    },
    balance: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        
    }, 
    balanceRowContainer: {
        width: '100%',        
        flex: 1,
        alignItems: 'flex-start',
        padding: 10
    },
    balanceTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    balanceRow: {
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 15,
        color: 'gray'
    },
    addressesContainer: {
        width: '100%',
        height: 250,
        padding: 10
    },
    createAddressButtonContainer: {
        height: 60,
        width: '100%'
    },
    addressesList: {        
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    },
    sendButton: {
        margin: 10
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',        
        width: width*0.7,
        height: 300,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {width: 1, height: 1},
        alignItems: 'center',
        padding: 15, 
    },
    modalTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalPicker: {
        height: 50,
        marginTop: 20,
        width: 120,
        marginBottom: 20
    },
    modelPickerItem: {
        height: 50
    },
    modalToContainer: {
        marginTop: 10,
        flexDirection: 'row'
    },
    modalToInputStyle: {
        borderWidth: 0.5,
        borderColor: 'gray',
        flex: 1,
        padding: 10        
    },
    modalSendButton: {
        width: '100%',
        flex: 1
    }

});


const mapStateToProps = (state) => {
    return {
        mnemonics: state.main.mnemonics,
        bitcoinBalance: state.main.bitcoinBalance
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        generateMnemonics: () => {dispatch(generateMnemonicsAction())},
        getBalance: (mnemonics) => {dispatch(getBalanceAction(mnemonics))}
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);