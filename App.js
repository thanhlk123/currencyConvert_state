import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ConversionTypeButton = props => {
  const fromFlag = props.from === 'usd' ? {'flag':'🇺🇲','name':"USD"} : {'flag':'🇻🇳','name':'VND'};
  const toFlag = props.to === 'usd' ? {'flag':'🇺🇲','name':'USD'} : {'flag':'🇻🇳','name':'VND'};
  return (
    <TouchableOpacity style={[styles.button,props.style]}
      onPress={props.onPressX}
    >
      <Text style={styles.titleText}>
        {fromFlag.flag} {fromFlag.name} to {toFlag.flag} {toFlag.name}
      </Text>
    </TouchableOpacity>
  );
};
export default class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      'value': 0,
      'type':'usd',
      'result':0,
      'styleUSD':{backgroundColor:'#54c246'},
      'styleVND':{}
    }
  }
  setValueConvert = (val) => {
    let result = this.state.type === 'usd'? (this.convertToUSD(val)):(this.convertToVND(val))
    this.setState({
      'value':val===''?0:val,
      'result':result
    })
  }
  convertToUSD = (val) => {
    return Math.round(val/230)/100
  }
  convertToVND = (val) => {
    return Math.round(val*2300000)/100
  }
  setTypeConvert (val) {
    let result = val === 'usd'? (this.convertToUSD(this.state.value)):(this.convertToVND(this.state.value))
    this.setState ({
      'type':val,
      'styleUSD': val==='usd'?{backgroundColor:'#54c246'}:{},
      'styleVND':val==='vnd'?{backgroundColor:'#54c246'}:{},
      'result':result,
      'value':this.state.value===''?0:this.state.value
    })
  }

  render (){
  return (
    <View style={styles.container}>
      <View style={{height:24,backgroundColor:"blue",width:"100%"}}></View>
      <Text style={{marginTop:50}}>Please enter the value of currency you want to convert</Text>
      <TextInput
        keyboardType="number-pad"
        textAlign="center"
        placeholder="100,000,000 VND"
        selectionColor="red"
        style={styles.input}
        onChangeText = {val => this.setValueConvert(val)}
      />
    <ConversionTypeButton style ={this.state.styleUSD} to="usd" from="vnd" onPressX = {()=>{this.setTypeConvert('usd')}}/>
    <ConversionTypeButton style ={this.state.styleVND} to="vnd" from="usd" onPressX = {()=>{this.setTypeConvert('vnd')}}/>
    <Text>Current currency:</Text>
  <Text style={styles.currencyText}>{this.state.value}</Text>
    <Text>Conversion currenecy:</Text>
  <Text style={styles.currencyText}>{this.state.result}</Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent:'flex-start'

  },
  input: {
    height: 60,
    padding: 5,
    width: 300,
    fontSize: 35,
    borderWidth: 1,
    borderColor: 'lightblue'
  },
  button: {
    height: 35,
    width: 200,
    margin:10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',

  }
});
