import { useParams } from "react-router-dom"
import { useMyContext } from "../context/context"
import Loading from "../components/Loading"
import { PropsTrack } from "../context/api"

export function Album() {
  const {paramID} = useParams()
  const {albums,tracks} = useMyContext()

  const data={
    album: albums ? albums.find((album: { id: number }) => album.id === parseInt(paramID? paramID : '')):null,
    tracks:tracks ? tracks.filter((tracks: { album_id:number }) => tracks.album_id === parseInt(paramID? paramID : '')):null
  }
  const dataTracks = data.tracks

  const areaTracks=(
    <div className="w-full h-full">
      <div className="flex justify-between items-start">
        <h4>Faixas</h4>
        {dataTracks?<span>{dataTracks?.length} Musica{dataTracks?.length <= 1 ? "":"s"}</span>:null}
      </div>
      <div className="overflow-auto">
        {dataTracks == null ? <Loading/>:
          <>
            {dataTracks?.map((track:PropsTrack,i:number) =>
              <p className="mb-0" key={i}>
                {++i}. {track.title}
              </p>
            )}
          </>
        }
      </div>
    </div>
  )

  return(
    <div className="flex gap-5">
      <div className="h-min flex justify-center items-center ">
        <div className="w-min h-min flex flex-col gap-5 m-4">
          <img src={data.album?.cover_url} alt={data.album?.title}
            className=" object-cover w-48 h-48 rounded-md" />
          <div>
            <h3>{data.album?.title}</h3>
            <p>{data.album?.year}</p>
            <small>ID: #{data.album?.id}</small>
          </div>
        </div>
      </div>
      {areaTracks}
    </div>
  )
}