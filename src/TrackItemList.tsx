import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Track} from '../ts/types';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type TrackListItemProps = {
  track: Track;
};

export default function TrackItemList({track}: TrackListItemProps) {
  const image = track.album?.images?.[0];
  return (
    <TouchableOpacity
      style={{
        marginVertical: 4,
        marginLeft: responsiveWidth(2),
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: responsiveWidth(90),
        paddingVertical: responsiveHeight(1),
      }}>
      {image && (
        <Image
          source={{uri: image.url}}
          style={{height: 60, width: 60, borderRadius: 10}}
          resizeMode="contain"
        />
      )}
      <View style={{marginLeft: responsiveWidth(4)}}>
        <Text
          style={{
            marginBottom: 5,
            fontWeight: '600',
            maxWidth: responsiveWidth(70),
          }}>
          {track.name}
        </Text>
        <Text>{track.artists[0]?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
