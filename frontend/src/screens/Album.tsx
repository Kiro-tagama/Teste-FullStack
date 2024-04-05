import { useNavigate, useParams } from "react-router-dom"
import { useMyContext } from "../context/context"
import Loading from "../components/Loading"
import { PropsTrack, deleteData } from "../context/api"
import { useState } from "react"

export function Album() {
  const {paramID} = useParams()
  const {albums,tracks,getAlbumsAndTracks} = useMyContext()
  const nav= useNavigate()

  const data={
    album: albums ? albums.find((album: { id: number }) => album.id === parseInt(paramID? paramID : '')):null,
    tracks:tracks ? tracks.filter((tracks: { album_id:number }) => tracks.album_id === parseInt(paramID? paramID : '')):null
  }
  const dataTracks = data.tracks

  const [showDeleteAlbum, setShowDeleteAlbum] = useState<boolean>(false)

  const intialState={status:false,codeToDelete:0}
  const [showDeleteTrack, setShowDeleteTrack] = useState(intialState)

  const areaTracks=(
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="flex justify-between items-start">
        <h4>Faixas</h4>
        {dataTracks?<span>{dataTracks?.length} Musica{dataTracks?.length <= 1 ? "":"s"}</span>:null}
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        {dataTracks == null ? <Loading/>:
          <>
            {dataTracks?.map((track:PropsTrack,i:number) =>
              <div className="flex justify-between items-center brightness-75 hover:brightness-125">
                <p className="mb-0" key={i}>
                  {++i}. {track.title}
                </p>
                <button className="outline border-red-500 text-red-500 scale-75"
                  onClick={()=>setShowDeleteTrack({status:true,codeToDelete:track.id})}
                >Apagar faixa</button>
              </div>
            )}
          </>
        }
      </div>
    </div>
  )

  return(
    <div className="flex flex-col sm:flex-row gap-5 h-full">
      <div className="flex justify-center items-center sm:h-full w-full sm:max-w-[270px] ">
        <div className="w-full h-min flex sm:flex-col gap-5 m-4">
          <div>
            <img src={data.album?.cover_url} alt={data.album?.title}
              className=" object-cover w-48 h-48 rounded-md mb-4" />
            <div>
              <h3>{data.album?.title}</h3>
              <p>{data.album?.year}</p>
              <small>ID: #{data.album?.id}</small>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="outline border-red-500 text-red-500" onClick={()=>setShowDeleteAlbum(true)}>Apagar Album</button>
            <a href="/" className="contrast" role="button">Voltar</a>
          </div>
        </div>
      </div>
      {areaTracks}

      <dialog open={showDeleteAlbum}>
        <article>
          <h2>Apagar album</h2>
          <p>
            Tem certeza? pois apagar um album apagará todas as musicas existentes nele 
          </p>
          <footer>
            <button className="secondary" onClick={()=>setShowDeleteAlbum(false)}>
              Cancel
            </button>
            <button
              onClick={async ()=>{
                await deleteData('/albums',data.album?.id ? data.album?.id : 0)
                await getAlbumsAndTracks()
                setShowDeleteAlbum(false)
                nav('/')
              }}
            >Confirm</button>
          </footer>
        </article>
      </dialog>

      <dialog open={showDeleteTrack.status}>
        <article>
          <h2>Apagar faixa</h2>
          <p>
            Tem certeza? não poderá recupera-la novamente
          </p>
          <footer>
            <button className="secondary" onClick={()=>setShowDeleteTrack(intialState)}>
              Cancel
            </button>
            <button
              onClick={async ()=>{
                await deleteData('/tracks',showDeleteTrack.codeToDelete)
                await getAlbumsAndTracks()
                setShowDeleteTrack(intialState)
              }}
            >Confirm</button>
          </footer>
        </article>
      </dialog>
    </div>
  )
}