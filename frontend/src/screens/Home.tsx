import { PropsAlbum, PropsTrack, getData } from "../context/api"
import Loading from "../components/Loading"
import { useMyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export function Home() {
  const context = useMyContext()
  const nav = useNavigate()

  const [query,setQuery] = useState<string>("")
  const [data,setData] = useState<{albums:PropsAlbum[],tracks:PropsTrack[]} | null>(null)

  async function getDataByQuery() {
    setData(await getData(`/findPerName/${query}`))
  }

  useEffect(() =>{
    getDataByQuery()
  },[query])

  const {albums,tracks} = query.length == 0 ? context : data == null ? context : data 

  const areaAlbum=(
    <div className="">
    <h4>Albuns</h4>
    <div className=" flex gap-2 lg:pr-5 overflow-auto ">
      {albums?.map((album:PropsAlbum, i:number)=>(
        <article key={i} 
          onClick={()=>nav(`/album/${album.id}`)}
          className="p-0 overflow-hidden min-w-32 min-h-44 w-32 h-44 bg-cover flex cursor-pointer"
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
    <div className="h-min">
      <div className="flex justify-between items-start">
        <h4>Faixas</h4>
        {tracks?<span>{tracks?.length} Musica{tracks?.length <= 1 ? "":"s"}</span>:null}
      </div>
      <div className="max-h-[30vh] overflow-auto">
        {tracks == null ? <Loading/>:
          <>
            {tracks?.map((track:PropsTrack,i:number) =>
              <p className="mb-0" key={i}>
                {++i}. {track.title} - {albums ? 
                  albums.find((album: { id: number }) => album.id === track.album_id)?.title 
                : null}
              </p>
            )}
          </>
        }
      </div>
    </div>
  )

  return(
    <div className="h-full flex flex-col">
      <div className="flex gap-2 justify-between items-center">
        <h2 className=" text-center m-0">Discografia</h2>
        <input 
          className=" max-w-xs !m-0"
          type="search"
          name="search"
          aria-label="Search"
          placeholder="Buscar" 
          value={query} 
          onChange={txt=>setQuery(txt.target.value)} 
        />
      </div>
      <hr />
      {albums == null ? <Loading/>:
        <div className=" h-[80vh] flex flex-1 flex-col justify-between gap-6  overflow-hidden">
          {areaAlbum}
          {areaTracks}
        </div>
      }
    </div>
  )
}