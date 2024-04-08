import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {tracks} from './assets/data/tracks';
import TrackItemList from './TrackItemList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function SearchScreen() {
  const [text, setText] = useState('');
  const changeText = (e: string) => {
    setText(e);
  };
  const resetSearch = () => {
    setText('');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: responsiveHeight(1),
          paddingVertical: responsiveHeight(2),
        }}>
        <Ionicons name={'search'} size={20} color={'gray'} />
        <TextInput
          placeholder="what you want to listen"
          onChangeText={e => changeText(e)}
          value={text}
          style={{flex: 1, marginLeft: responsiveWidth(3)}}
        />
        <TouchableOpacity onPress={() => resetSearch()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tracks}
        renderItem={({item}) => <TrackItemList track={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
