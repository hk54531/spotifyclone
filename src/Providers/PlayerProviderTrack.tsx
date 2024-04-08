import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import {Track} from '../../ts/types';

type PlayerContextType = {
  currentTrack?: Track;
  setCurrentTrack: (currentTrack: Track) => void;
};

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: undefined,
  setCurrentTrack: () => {},
});

export default function PlayerProvider({children}: PropsWithChildren) {
  // Define your state and functions here
  const [currentTrack, setCurrentTrack] = useState<Track>();
  //   const [isPlaying, setIsPlaying] = useState(false);

  //   // Create an object containing the state and functions to pass as the value
  const contextValue = {
    currentTrack,
    setCurrentTrack,
    // isPlaying,
    // setIsPlaying,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
}

export const userPlayerContext = () => useContext(PlayerContext);
