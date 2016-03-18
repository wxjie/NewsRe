/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
} = React;

import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';
var GiftedListView = require('react-native-gifted-listview');
//var sss = '1';
var data = require('./data.json');
var datas = require('./datas.json');
var WebViewNews = require('./WebViewNews');
var Listviews = React.createClass( {
  getInitialState: function() {
    return {
      url:'',
      dataSource: data
    };
  },
  componentDidMount() {
     JPush.requestPermissions()
     this.pushlisteners = [
       JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
       JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
     ]
   },
   componentWillUnmount() {
     this.pushlisteners.forEach(listener => {
       JPush.removeEventListener(listener);
     });
   },
   onReceiveMessage(message) {

   },
   onOpenMessage(message) {
     var url = message._data['cn.jpush.android.ALERT'];
     this._goto(url);
   },


 //  gitJson: function (SUM_URL) {
 //   fetch(SUM_URL)
 //     .then((response) => response.json())
 //     .then((responseData) => {
 //       console.log(responseData);
 //       this.setState(
 //         {
 //
 //           dataSource:responseData
 //         }
 //       );
 //     })
 //     .done();
 //
 // },
 // _regular:function (str) {
 //      var ss =str.match(/[^\x00-\xff]/g);
 //      var titles ='';
 //      for (var i = 0; i < ss.length; i++) {
 //        if(i>=20){
 //          titles = titles +'....';
 //          break;
 //        }else {
 //          titles=titles+ss[i];
 //        }
 //
 //      };
 //      return titles;
 // },
 // _eachTitle:function(rows){
 //    for (var i = 0; i < rows.length; i++) {
 //      var title = this._regular(rows[i].Title);
 //      rows[i].Title = title;
 //    }
 //    return rows;
 // },
 _goto(URL){
   const { navigator } = this.props;
   //或者写成 const navigator = this.props.navigator;
   //为什么这里可以取得 props.navigator?请看上文:
   //<Component {...route.params} navigator={navigator} />
   //这里传递了navigator作为props
   if(navigator) {
       navigator.push({
           name: 'WebViewNews',
           component: WebViewNews,
           params:{
               url:URL
           }
       })
   }
 },
	_onFetch(page = 1, callback, options) {
    // var URLS = 'http://infospider.chunfeng.software/Viewer/GetHitList?pageNumber='+page+'&pageSize=9';
    // this.gitJson(URLS);

    setTimeout(() => {
        //var rows = this.state.dataSource;
        var rows = datas;

      //console.log(this.state.dataSource);
        if(rows.length === 0){
          callback(rows,{allLoaded: true,});
        }else {
          //callback(this._eachTitle(rows));
          callback(rows);
          //this._regular(rows[0].Title);
        };
    }, 1000); // simulating network fetching
  },

  _pressButton(rowData) {
       const { navigator } = this.props;
       //或者写成 const navigator = this.props.navigator;
       //为什么这里可以取得 props.navigator?请看上文:
       //<Component {...route.params} navigator={navigator} />
       //这里传递了navigator作为props
       if(navigator) {
           navigator.push({
               name: 'WebViewNews',
               component: WebViewNews,
               params:{
                   url:rowData.Address
               }
           })
       }
   },

  _renderRowView(rowData) {
    return (
    <TouchableHighlight
      onPress={()=>this._pressButton(rowData)}
      style={styles.row}
      underlayColor='#c8c7cc'
    >
      <View style={styles.item}>
        <Text style={styles.title}>{rowData.Title}</Text>
        <View style={styles.viewItem}>
          <Text style={styles.texts}>{rowData.pubDate} </Text>
          <Text style={styles.texts}>{rowData.Author} </Text>
        </View>
      </View>
    </TouchableHighlight>
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} >
            <Text style={styles.navBartext}>
              新闻列表
            </Text>
        </View>
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true}
          pagination={true}
          refreshable={true}
          withSections={false}
          customStyles={{
            refreshableView: {
              backgroundColor: '#eee',
            },
          }}

          PullToRefreshViewAndroidProps={{
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            progressBackgroundColor: '#c8c7cc',
          }}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navBar: {
    height: 50,
    backgroundColor: '#3ccbc1',
    justifyContent : 'center',
    alignItems : 'center',
  },
  navBartext: {
    fontSize: 20,
  },
  row: {
    padding: 10,
    height: 80,
  },
  item:{
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor :'#EAEAEA',
  },
  viewItem:{
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems :'flex-end'
  },
  title:{
    fontSize: 17,
  },

});

module.exports = Listviews;
