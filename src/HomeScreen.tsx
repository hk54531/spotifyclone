import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {tracks} from './assets/data/tracks';
import TrackItemList from './TrackItemList';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Player from './Player';

export default function HomeScreen(props: any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tracks}
        renderItem={({item}) => <TrackItemList track={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
