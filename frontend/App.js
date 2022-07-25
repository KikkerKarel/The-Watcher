// import React, { Component } from 'react';
// import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
// import { Icon, NativeBaseProvider } from 'native-base';
// import Menu from './components/Menu/Menu';

import { View, StyleSheet } from "react-native";
import ListPage from "./components/List/List";

// const { width } = Dimensions.get("window");

// const CustomDrawerNavigation = (props) => {
//   return (
//     <NativeBaseProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
//           <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
//             <Image source={require('./assets/icon.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
//           </View>
//           <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
//             <Text>John Doe</Text>
//           </View>
//         </View>
//         <ScrollView>
//           <DrawerItems {...props} />
//         </ScrollView>
//         <View style={{ alignItems: "center", bottom: 20 }}>
//           <View style={{ flexDirection: 'row' }}>
//             <View style={{ flexDirection: 'column', marginRight: 15 }}>
//               <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
//             </View>
//             <View style={{ flexDirection: 'column' }}>
//               <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     </NativeBaseProvider>
//   );
// }


// const Drawer = createDrawerNavigator({
//   Home: {
//     screen: Menu,
//     navigationOptions: {
//       title: 'Homepage'
//     }
//   },
//   // Settings: {
//   //   screen: SettingsPage,
//   //   navigationOptions: {
//   //     title: 'Settings'
//   //   }
//   // },
//   // Notifications: {
//   //   screen: NotificationPage,
//   //   navigationOptions: {
//   //     title: 'Notifications'
//   //   }
//   // },
//   // News: {
//   //   screen: NewsPage,
//   //   navigationOptions: {
//   //     title: 'News'
//   //   }
//   // }
// },
//   {
//     drawerPosition: 'left',
//     contentComponent: CustomDrawerNavigation,
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//     drawerWidth: (width / 3) * 2
//   });

// const App = createAppContainer(Drawer);

// export default App;

export default function App() {
  return (
    <View style={styles.container}>
      <ListPage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
  }
});