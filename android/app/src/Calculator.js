// src/Calculator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [input_result, setResult] = useState(''); 

  const handleClick = (value) => {
    setResult((prev) => prev + value);
  };

  const handleClear = () => {
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const calculation = calculate(input_result);
      setResult(calculation.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const calculate = (input_result) => {
    const operators = ['+', '-', '*', '/', '%'];
    const stack = [];
    let currentNumber = '';

    for (let i = 0; i < input_result.length; i++) {
      let char = input_result[i];

      if (!isNaN(char) || char === '.') {
        currentNumber += char;
      } else if (operators.includes(char)) {
        // If the next character is a '-' and it follows an operator or is at the beginning
        if (char === '-' && (i === 0 || operators.includes(input_result[i - 1]))) {
          currentNumber += char; // Treat it as part of the number
        } else {
          stack.push(parseFloat(currentNumber));
          stack.push(char);
          currentNumber = '';
        }
      }
    }

    // Push the last number in the input_result
    if (currentNumber !== '') {
      stack.push(parseFloat(currentNumber));
    }

    // Evaluate the stack
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
      const operator = stack[i];
      const nextNumber = stack[i + 1];

      switch (operator) {
        case '+':
          result += nextNumber;
          break;
        case '-':
          result -= nextNumber;
          break;
        case '*':
          result *= nextNumber;
          break;
        case '/':
          result /= nextNumber;
          break;
        case '%':
          result = (result / nextNumber) * 100;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
    return result;
  };
  

  return (

    


    <View style={styles.container}>
      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.input_result}>{input_result}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
            >
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('-')}
            >
              
              <Text style={styles.buttonText}>+-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('%')}
            >
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('/')}
            >
              <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('7')}
            >
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('8')}
            >
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('9')}
            >
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('*')}
            >
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('4')}
            >
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('5')}
            >
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('6')}
            >
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('-')}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('1')}
            >
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('2')}
            >
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('3')}
            >
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick('+')}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.zeroButton]}
              onPress={() => handleClick('0')}
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.decimalButton]}
              onPress={() => handleClick('.')}
            >
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={handleCalculate}
            >
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color for the whole screen
    
  },
  calculator: {
    borderColor:'blue',
    width: '100%',
    height:'100%',
    padding: 30,
    backgroundColor: 'black', // Background color between buttons
    borderRadius: 10,
    borderWidth: 10,


  },
  display: {
    marginBottom: 0
  },
 
  input_result: {
    fontSize: 40,
    // height:'40%',

    color: '#fff',
    backgroundColor: 'green', // Green rectangle for result
    padding: 30,
    borderRadius: 5,
    textAlign: 'right',
    marginBottom:60
  },
  buttonContainer: {
    flexDirection: 'column',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  button: {
    width:'23%',
    height: 80,
    borderRadius: 300, // Round button
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  redButton: {
    backgroundColor: 'red',
    borderRadius: 300, // Oval button
    width: '46%', // Make the "=" button wider
    height: 80,
  },
  
  clearButton: {
    backgroundColor: '#fff', // Light color for clear button
    backgroundColor: 'purple',

  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default Calculator;
