import { useEffect, useState } from "react"
import { PropsAlbum, PropsTrack, getData } from "./api/api"
import { Home } from "./components/Home"
import { Playlist } from "./components/Playlist"

function App() {
  const [screen,setScreen] = useState<"Home"|"Playlist">("Home")
  const [playlistId,setPlaylistId] = useState<number>()

  const [albums,setAlbums] = useState<PropsAlbum[] | null>(null)
  const [tracks,setTracks] = useState<PropsTrack[] | null>(null)

  async function getAlbumsAndTracks() {
    setAlbums(await getData("/albums"))
    setTracks(await getData("/tracks"))
  }

  useEffect(() =>{
    getAlbumsAndTracks()
  },[albums === null])

  const loading=(
    <div className="h-full flex flex-col justify-center">
      <article aria-busy="true" className=" not-sr-only shadow-none"></article>
      <p className="text-center">buscando</p>
    </div>
  )

  return (
    <div className="w-full h-screen p-5 flex justify-center items-center">
      <article className="w-full h-full  m-0 shadow-sm max-w-6x overflow-hidden ">
        {screen == "Home" ? 
          <Home loading={loading} albums={albums} tracks={tracks} setScreen={setScreen} /> :
          <Playlist loading={loading} albums={albums} tracks={tracks} setScreen={setScreen} />
        }
      </article>
    </div>
  )
}

export default App
