import { useState } from "react"
import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

export const PlaylistItems = () => {
    const [data, setData] = useState([])

    axios.get('https://myplaylistserver-production.up.railway.app/')
        .then(res => {
            setData(res.data)
        })

    const navigate = useNavigate()

    return (
        <ul className="list-none relative">
            {
                data.map((li, index) => (
                    <React.Fragment>
                        <li className="relative hover:bg-cc font-kanit delay-100" _id={li._id} key={index} onClick={(e)=>{
                            const x = e.currentTarget.getAttribute('_id')
                            navigate(`/playing?id=${x}`)
                        }}>
                            <div className="h-bsh ">
                                <h3 className="relative top-3">{`${li.name} (${li.songs.length} songs)`}</h3>
                            </div>
                            <hr></hr>
                        </li>

                    </React.Fragment>
                ))
            }
        </ul>
    )
}
