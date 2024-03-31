import { PropsAlbum, PropsTrack } from "../api/api"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Home(params:any) {
  const {albums,loading,tracks,setScreen} = params

  const areaAlbum=(
    <div className="">
    <h4>Albuns</h4>
    <div className=" flex lg:h-[80%] gap-2  overflow-auto lg:pr-5 lg:flex-col">
      {albums?.map((album:PropsAlbum, i:number)=>(
        <article key={i} 
          onClick={()=>{
            setScreen("Playlist")
          }}
          className="p-0 overflow-hidden min-w-32 min-h-44 w-32 h-44 bg-cover flex "
          style={{backgroundImage: `url(${album.cover_url})`}}>
          <article className="p-2 mb-0 mt-auto w-full rounded-none">
            <h5 className="m-0 break-normal">{album.title}</h5>
            <small className="m-0">{album.year}</small>
          </article>
        </article>
      ))}
    </div>
    </div>
  )

  const areaTracks=(
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4>Faixas</h4>
        <span>{tracks?.length} Musica{tracks?.length <= 1 ? "":"s"}</span>
      </div>
      <div className="h-[42%] sm:h-[30%] md:h-[25%] lg:h-[90%] overflow-auto">
        {tracks == null ? loading:
          <>
            {tracks?.map((track:PropsTrack,i:number) =>
              <p className="mb-0" key={i}>
                {++i}. {track.title} - {albums.find((album: { id: string }) => album.id === track.album_id)?.title}
              </p>
            )}
          </>
        }
      </div>
    </div>
  )

  return(
    <div>
    <h2 className=" text-center">Discografia</h2>
      {albums == null ? loading:
        <div className=" h-[80vh] flex flex-1 flex-col justify-between gap-6 lg:flex-row overflow-hidden">
          {areaAlbum}
          {areaTracks}
        </div>
      }
    </div>
  )
}