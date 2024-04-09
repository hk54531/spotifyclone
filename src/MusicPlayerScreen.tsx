import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {tracks} from './assets/data/tracks';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';

export default function MusicPlayerScreen(props: any) {
  const params = props.route.params.data;
  const [currentSong, setCurrentSong] = useState(0);
  const [playBtn, setPlayBtn] = useState(false);
  const ref = useRef<any>();
  const playBackState = usePlaybackState();
  const progess = useProgress();
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  useEffect(() => {
    const updatedTracks: any = tracks.map((item: any) => {
      return {
        id: item.id,
        url: item.preview_url,
        name: item.name,
        artist: item.artists[0]?.name,
        imageUrl: item.album.images[0]?.url,
      };
    });
    // Call addedTracks function only once when the component mounts
    if (!isPlayerInitialized) {
      setUpPlayer(updatedTracks); // Call setUpPlayer function only once when the component mounts
    }
  }, []);

  useEffect(() => {
    if (progess.position === progess.duration) {
      playNextSong();
    } else {
      console.log('do nothing');
    }
  }, [progess.position, progess.duration]);

  const togglePlayBack = async (playBackState: any) => {
    if (
      playBackState.state === State.Paused ||
      playBackState.state === State.Ready ||
      playBackState.state === State.Loading ||
      playBackState.state === State.Buffering
    ) {
      await TrackPlayer.play();
      setPlayBtn(!playBtn);
    } else {
      await TrackPlayer.pause();
      setPlayBtn(!playBtn);
    }
  };
  const playNextSong = async () => {
    if (tracks.length - 1 > currentSong) {
      setCurrentSong(currentSong + 1);
      ref?.current?.scrollToIndex({
        animated: true,
        index: currentSong + 1,
      });
      await TrackPlayer.skip(currentSong + 1);
      togglePlayBack(playBackState);
    }
  };

  const setUpPlayer = async (updatedTracks: any) => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      if (updatedTracks && updatedTracks.length > 0) {
        await TrackPlayer.add(updatedTracks);
        setIsPlayerInitialized(true);
      } else {
        console.warn('No tracks to add to the player.');
      }
    } catch (error) {
      console.error('An error occurred during player setup:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />

      <View style={{}}>
        <TouchableOpacity
          onPress={() => props.navigation.replace('TabNavigationHome')}>
          <Ionicons name="chevron-down" size={responsiveWidth(7)} />
        </TouchableOpacity>

        <FlatList
          data={tracks}
          horizontal
          ref={ref}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / responsiveWidth(100);
            setCurrentSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
            togglePlayBack(playBackState);
          }}
          renderItem={({item, index}) => {
            if (
              !item.album ||
              !item.album.images ||
              item.album.images.length === 0
            ) {
              return null;
            }

            return (
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: item.album.images[0]?.url}}
                  resizeMode="contain"
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.artist}>{item.artists[0]?.name}</Text>
                </View>
              </View>
            );
          }}
        />

        <View style={{paddingHorizontal: responsiveWidth(4)}}>
          <Slider
            style={styles.slider}
            value={progess.position}
            minimumValue={0}
            maximumValue={progess.duration}
            minimumTrackTintColor="green"
            maximumTrackTintColor="#000000"
            onValueChange={async e => {
              await TrackPlayer.seekTo(e);
            }}
          />

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={async () => {
                if (currentSong > 0) {
                  setCurrentSong(currentSong - 1);
                  ref?.current?.scrollToIndex({
                    animated: true,
                    index: currentSong - 1,
                  });
                  await TrackPlayer.skip(currentSong - 1);

                  togglePlayBack(playBackState);
                }
              }}>
              <Ionicons name="play-skip-back" size={responsiveWidth(10)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={async () => {
                togglePlayBack(playBackState);
              }}>
              {
                <Ionicons
                  name={
                    playBackState.state === State.Playing
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  size={responsiveWidth(15)}
                />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={async () => {
                if (tracks.length - 1 > currentSong) {
                  setCurrentSong(currentSong + 1);
                  ref?.current?.scrollToIndex({
                    animated: true,
                    index: currentSong + 1,
                  });
                  await TrackPlayer.skip(currentSong + 1);
                  togglePlayBack(playBackState);
                }
              }}>
              <Ionicons name="play-skip-forward" size={responsiveWidth(10)} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="repeat-outline" size={responsiveWidth(12)} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="shuffle-outline" size={responsiveWidth(12)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(100) / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  textContainer: {
    marginVertical: responsiveHeight(1),
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: responsiveWidth(5),
  },
  artist: {
    textAlign: 'center',
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: responsiveHeight(3),
    marginTop: responsiveHeight(3),
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  controlButton: {
    paddingHorizontal: responsiveWidth(5),
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: responsiveWidth(5),
  },
});
