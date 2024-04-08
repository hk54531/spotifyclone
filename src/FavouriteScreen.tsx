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

export default function FavouriteScreen() {
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
