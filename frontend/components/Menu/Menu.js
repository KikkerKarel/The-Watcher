import { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

class Menu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name='menu' onPress={() => this.props.navigation.openDrawer() } />}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Home Page</Text>
                </View>
          </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Menu;