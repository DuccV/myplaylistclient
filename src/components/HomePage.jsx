import axios from "axios"
import { PlaylistItems } from "./PlaylistItems"
import { Search } from "./Search"

export const HomePage = () => {

    return (
        <div className="h-sc bg-gradient-to-b from-aqua to-pink ">
            <div className="relative w-fill flex justify-center h-scscl">
                <Search />
            </div>
            <div className="w-fill flex justify-center">
                <div className="bg-whaqua w-content rounded-srch p-5">
                    <h3 className="font-proteststrike">Playlist</h3>
                    <hr className="m-0"></hr>
                    <PlaylistItems/>
                </div>
            </div>
        </div>
    )
}