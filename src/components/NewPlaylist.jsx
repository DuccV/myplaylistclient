import React, { useRef, useState } from "react"
import axios from "axios"
import { ListUploadedMusic } from "./ListUploadedMusic"

export const NewPlaylist = () => {
    const [songs, setSongs] = useState([])
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [songName, setSongName] = useState('')
    const [data, setData] = useState([])
    const songInputRef = useRef(null)

    const submitHandler = () => {
        const fd = new FormData()
        fd.append('Image', image)
        fd.append('name', name)
        fd.append('songName', JSON.stringify(data))
        songs.forEach(song => fd.append('Songs', song))
        axios.post('https://myplaylistgiotai.onrender.com/playlist/new', fd)
            .then(response => {
                console.log('Playlist created successfully', response.data)
                setSongs([])
                setImage(null)
                setName('')
                setSongName('')
                setData([])
            })
            .catch(error => {
                console.error('Error creating playlist', error)
            })
        console.log(data);


    }

    return (
        <div>
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
                        setSongs(prev => [...prev, files])
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
            </div>

            <div>
                <label htmlFor="playlistName">Tên Playlist:</label>
                <input
                    id="playlistName"
                    placeholder="Tên playlist"
                    value={name}
                    onChange={e => {
                        setName(e.target.value)
                    }}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Chọn Hình Ảnh:</label>
                <input
                    required
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        e.preventDefault()
                        setImage(e.target.files[0])
                    }}
                />
            </div>

            <div>
                <ul>
                    {
                        data.map((dat, i) => (
                            <li key={i}>{dat}</li>
                        ))
                    }
                    <li>CCC</li>
                </ul>
            </div>

            <button onClick={submitHandler}>Submit</button>
        </div>
    )
}
