import { useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList } from "react-native";
import useMarketList from '../../hooks/useMarketList';

const Main = () => {

  const [product, setProduct] = useState('');
  const [state, addItem, removeItem, checkItem] = useMarketList();

  return(
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Adicionar produto'
          value={product}
          onChangeText={text => {setProduct(text)}}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            addItem(product);
            setProduct('');
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state}
        renderItem={({item}) => {
          return(
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.itemCheckButton} 
                onPress={() => {
                  checkItem(item.id);
                }
              }>
                <Text style={[styles.listItem, item.check ? styles.itemChecked : '']}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeItem}
                onPress={() => {
                  removeItem(item.id);
                }}
              >
                <Text>Remover</Text>
              </TouchableOpacity>
            </View>
          );
        }}>
      </FlatList> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10
  },
  itemContainer: {
    flexDirection: 'row'
  },
  itemCheckButton: {
    flex: 1
  },
  input: {
    width: '80%',
    fontSize: 30,
    color: '#000'
  },
  addButton: {
    flex: 1,
    width: '20%',
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center'
  },
  addButtonText: {
    color: 'red',
    fontSize: 60
  },
  listItem: {
    fontSize: 22,
    padding: 10
  },
  itemChecked: {
    textDecorationLine: 'line-through'
  },
  removeItem: {
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10
  }
});

export default Main;

