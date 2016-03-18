'use strict';
import React,{
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Text,
  WebView,
  TouchableHighlight,
} from 'react-native';
var DEMO_URL = 'https://www.baidu.com';
class WebViewNews extends Component {
  constructor(props) {
        super(props);
        this.state = {
            url:DEMO_URL
        };
    }

  componentDidMount() {
            //这里获取从FirstPageComponent传递过来的参数: id
            this.setState({
                url:this.props.url
            });
    }

    _pressButton() {
         const { navigator } = this.props;
         if(navigator) {
             //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
             navigator.pop();
         }
     }
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.navBar} >
      <TouchableHighlight
        onPress={this._pressButton.bind(this)}
        underlayColor='#c8c7cc'
        >
          <Text style={styles.navBartext1}>
              返回
          </Text>
          </TouchableHighlight>
          <Text style={styles.navBartext}>
            新闻详情
            </Text>
          <Text style={styles.navBartext3}>
            返回
          </Text>
      </View>
        <WebView style={styles.webview}
        source={{uri:this.state.url}}
        startInLoadingState={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    height: 200,
  },
  navBar: {
    height: 50,
    backgroundColor: '#3ccbc1',
    justifyContent : 'space-between',
    flexDirection: 'row',

  },
  navBartext1:{
    fontSize: 20,
    marginTop:10,
  },
  navBartext: {
    fontSize: 20,
    marginTop:10,
  },
  navBartext3: {
    fontSize: 20,
    color: '#3ccbc1',
  }
});
module.exports = WebViewNews;
