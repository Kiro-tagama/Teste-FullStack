import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { PropsAlbum, PropsTrack, getData } from './api';

export interface ContextType {
  albums: PropsAlbum[] | null;
  tracks: PropsTrack[] | null;
  getAlbumsAndTracks: () => Promise<void>;
}
interface ContextProviderProps {
  children: ReactNode;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [albums,setAlbums] = useState<PropsAlbum[] | null>(null)
  const [tracks,setTracks] = useState<PropsTrack[] | null>(null)

  async function getAlbumsAndTracks() {
    setAlbums(await getData("/albums"))
    setTracks(await getData("/tracks"))
  }

  useEffect(() =>{
    getAlbumsAndTracks()
  },[albums === null])

  return (
    <Context.Provider value={{
      albums,tracks, getAlbumsAndTracks
    }}>
      {children}
    </Context.Provider>
  );
};

export function useMyContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useMyContext must be used within a ContextProvider');
  }

  return context;
}
