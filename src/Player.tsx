import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {userPlayerContext} from './Providers/PlayerProviderTrack';
// import {tracks} from './assets/data/tracks';
// const track = tracks[0];

const Player = (props: any, {index}: any) => {
  const {currentTrack} = userPlayerContext();
  if (!currentTrack) {
    return null;
  }

  const image = currentTrack.album.images?.[0];
  const track = currentTrack;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.player}
        onPress={() =>
          props.navigation.replace('MusicPlayerScreen', {
            data: currentTrack,
          })
        }>
        {image && <Image source={{uri: image.url}} style={styles.image} />}

        <View style={{flex: 1}}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <TouchableOpacity>
          <Ionicons
            name={'heart-outline'}
            size={20}
            color={'white'}
            style={{marginHorizontal: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            disabled={!track?.preview_url}
            name={'play'}
            size={22}
            color={track?.preview_url ? 'white' : 'gray'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // width: '100%',
    // top: -75,
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: '#286660',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: 'white',
  },
  subtitle: {
    color: 'lightgray',
    fontSize: 12,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;
