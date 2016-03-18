/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Navigator,
} from 'react-native';
var ListView = require('./ListViews');

class NewsRe extends Component {

  render() {
    var defaultName = 'ListView';
    var defaultComponent = ListView;
    return (
      <View  style={styles.natives}>

          <Navigator style={styles.natives}
                initialRoute={{ name: defaultName, component: defaultComponent }}
                configureScene={(route) => {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
            }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
            }}/>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  natives:{
    flex: 1,
  },

});

AppRegistry.registerComponent('NewsRe', () => NewsRe);
