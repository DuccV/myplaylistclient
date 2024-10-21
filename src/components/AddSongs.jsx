import axios from "axios"
import { useSearchParams } from "react-router-dom"
import { useRef , useState} from "react"

export const AddSongs = () => {
    const [query,setQuery] = useSearchParams()
    const songInputRef = useRef()
    const [songs, setSongs] = useState([]) 
    const [songName, setSongName] = useState('')
    const [data,setData] = useState([])

    const id = query.get('id')

    function submitHandler(){
        const fd = new FormData()

        fd.append('songName', JSON.stringify(data))
        songs.forEach(song => fd.append('Songs', song))


        axios.post(`https://myplaylistserver-production.up.railway.app/playlist/addsongs?id=${id}`,fd)
        .then(response => {
            console.log('Playlist created successfully', response.data)
            setSongs([])
            setSongName('')
            setData([])
        })
    }

    return(
        <form method="post">
            <div>
                <label htmlFor="songs">Chọn Bài Hát:</label>
                <input
                    ref={songInputRef}
                    id="songs"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                        e.preventDefault()
                        const files = e.target.files[0]
                        setSongs(prev=>[...prev,files])
                    }}
                    required
                />
                
            </div>

            <div>
                <label htmlFor="songName">Tên Bài Hát:</label>
                <input
                    id="songName"
                    placeholder="Tên bài hát"
                    value={songName}
                    onChange={e => {
                        setSongName(e.target.value)
                    }}
                    required
                />
                <button
                    onClick={(e) => {
                        e.preventDefault()

                        setData(prev => [...prev, songName])
                        setSongName('')
                        songInputRef.current.value = null
                        console.log(songs)
                    }}
                >
                    Thêm Bài Hát
                </button>
                <ul>
                    {
                        data.map((dat, i) => (
                            <li key={i}>{dat}</li>
                        ))
                    }
                    <li>CCC</li>
                </ul>
            </div>
            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    )
}
