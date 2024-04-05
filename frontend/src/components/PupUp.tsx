import { useState } from "react"
import { PropsAlbum, PropsTrack, postData } from "../context/api"
import { useMyContext } from "../context/context"

export function PopUp(){
  const {albums,getAlbumsAndTracks} = useMyContext()
  const [showAlbum, setShowAlbum] = useState<boolean>(false)
  const [showTrack, setShowTrack] = useState<boolean>(false)

  const data = new Date()
  const initialStateFormAlbum = {title:"",year:data.getFullYear(),cover_url:"",id:0}
  const initialStateFormTrack = {album_id: 0, title:"",id:0}
  const [formAlbum, setFormAlbum] = useState<PropsAlbum>(initialStateFormAlbum)
  const [formTrack, setFormTrack] = useState<PropsTrack>(initialStateFormTrack)

  console.log(formTrack);
  

  return(
    <>
      <details className="dropdown m-0">
        <summary>options</summary>
        <ul>
          <li className=" cursor-pointer"><a onClick={()=>setShowAlbum(true)}>Add Album</a></li>
          <li className=" cursor-pointer"><a onClick={()=>setShowTrack(true)}>Add Faixa</a></li>
        </ul>
      </details>
      {/*  */}
      <dialog open={showAlbum}>
        <article>
          <header>
            <button onClick={()=>{setShowAlbum(false);setFormAlbum(initialStateFormAlbum)}} aria-label="Close" rel="prev"></button>
            <p>
              <strong>Novo Album</strong>
            </p>
          </header>
          <input type="text" name="text" placeholder="Titulo" aria-label="Text" 
            value={formAlbum.title} 
            onChange={(txt)=>setFormAlbum({...formAlbum,title:txt.target.value})}/>
          <input type="number" name="number" placeholder="Ano" aria-label="Number" 
            value={formAlbum.year} 
            onChange={(txt)=>setFormAlbum({...formAlbum,year:parseInt(txt.target.value)})}/>
          <input type="url" name="url" placeholder="Url imagem" aria-label="Url" 
            value={formAlbum.cover_url} 
            onChange={(txt)=>setFormAlbum({...formAlbum,cover_url:txt.target.value})}/>
            <br />
            <br />
            <input type="button" value="Salvar" 
              onClick={async ()=>{
                await postData("/albums",formAlbum)
                await getAlbumsAndTracks()
                setShowAlbum(false)
                setFormAlbum(initialStateFormAlbum)
              }}
            />
        </article>
      </dialog>

      <dialog open={showTrack}>
        <article>
          <header>
            <button onClick={()=>{setShowTrack(false);setFormTrack(initialStateFormTrack)}} aria-label="Close" rel="prev"></button>
            <p>
              <strong>Nova Faixa</strong>
            </p>
          </header>
          {
            albums?.length == 0 ? <h3>Nem um album encontrado, por favor crie um album antes</h3> :
            <>
            <input type="text" name="text" placeholder="Titulo" aria-label="Text"
            value={formTrack.title}
            onChange={(txt) => setFormTrack({ ...formTrack, title: txt.target.value })} />
            
            <details className="dropdown">
              <summary>{formTrack.album_id == 0 ? "Selecione um album" : albums?.find(album => album.id === formTrack.album_id)?.title}</summary>
              <ul className=" overflow-auto max-h-32 absolute">
                {albums?.map(album =>(
                  <li key={album.id}>
                    <label>
                      <input type="radio" name="phase" value={formTrack.album_id} 
                      checked={formTrack.album_id === album.id}
                      onChange={() => setFormTrack({ ...formTrack, album_id: album.id })}
                      />
                      {album.title}
                    </label>
                  </li>
                ))}
              </ul>
            </details>
            <br /><br />
            <input type="button" value="Salvar Música"
              onClick={async () => {
                await postData("/tracks", formTrack)
                await getAlbumsAndTracks()
                setShowTrack(false)
                setFormTrack(initialStateFormTrack)
              } } />
            </>
          }
        </article>
      </dialog>
    </>
  )
}