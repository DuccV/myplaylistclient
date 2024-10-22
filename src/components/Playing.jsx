import axios from "axios"; 
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

export const Playing = () => {
    const [params] = useSearchParams();
    const [list, setList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [url, setURL] = useState("");
    const [img, setImg] = useState("");
    const playBtn = useRef(null);
    const [data, setData] = useState("");
    const progRef = useRef(null);
    const [time, setTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);

    const id = params.get('id');

    useEffect(() => {
        axios.get(`https://myplaylistserver-production.up.railway.app/playlist/findbyid?id=${id}`)
            .then(result => {
                setList(result.data.songs);
                setImg(result.data.image);
                setData(result.data.name);
                if (result.data.songs.length > 0) {
                    setURL(result.data.songs[0].url);
                }
            });
    }, [id]);

    useEffect(() => {
        if (list.length > 0) {
            setURL(list[index]?.url);
        }
    }, [index, list]);

    const togglePlay = () => {
        if (isPlaying) {
            playBtn.current.classList.replace('fa-pause', 'fa-play');
            audioRef.current.pause();
        } else {
            playBtn.current.classList.replace('fa-play', 'fa-pause');
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (url) {
            audioRef.current.play();
            setIsPlaying(true);
            playBtn.current.classList.replace('fa-play', 'fa-pause');
        }
    }, [url]);

    const formatTime = (time) => {
        return String(Math.floor(time)).padStart(2, '0');
    };

    useEffect(() => {
        if (audioRef.current) {
            const timeUpdateHandler = () => {
                const { currentTime, duration } = audioRef.current;
                setTime((currentTime / duration) * 100);
                setCurrentTime(currentTime);
                setDuration(duration);
                audioRef.current.volume = 0.3;
            };

            audioRef.current.addEventListener('timeupdate', timeUpdateHandler);

            return () => {
                audioRef.current.removeEventListener('timeupdate', timeUpdateHandler);
            };
        }
    }, [volume]);

    const handleProgressChange = (e) => {
        const progress = e.target.value;
        setTime(progress);
        if (audioRef.current) {
            audioRef.current.currentTime = (progress / 100) * audioRef.current.duration;
        }
    };

    const handleAudioEnded = () => {
        setIndex((i) => (i + 1) % list.length);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleAudioEnded);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleAudioEnded);
            }
        };
    }, [list]);

    useEffect(() => {
        if (index >= 0 && index < list.length) {
            setURL(list[index]?.url);
        }
    }, [index]);

    return (
        <div className="h-sc bg-gradient-to-b from-aqua to-pink fixed w-fill flex items-center justify-center">
            <div className="m-10">
                <img src={`https://myplaylistgiotai.onrender.com/uploads/${img}`} className="w-img rounded-srch right-20 bottom-0 relative" alt="Playlist Cover" />
                <div className="rounded-srch h-scscl w-img right-20 relative top-3 flex justify-center items-center">
                    <i className="fa-solid fa-backward relative bottom-5 -left-5 cursor-pointer" onClick={() => {
                        setIndex((i) => (i - 1 + list.length) % list.length);
                    }}></i>
                    <i className="fa-solid fa-play relative bottom-5 cursor-pointer" ref={playBtn} onClick={togglePlay}></i>
                    <i className="fa-solid fa-forward relative bottom-5 left-5 cursor-pointer" onClick={() => {
                        setIndex((i) => (i + 1) % list.length);
                    }}></i>
                    <input type="range" className="fixed m-5 w-img h-1 rounded-srch cursor-pointer" value={time || 0} ref={progRef} onChange={handleProgressChange} />
                    <h6 className="font-kanit text-start left-0 absolute bottom-8">{`${Math.floor(currentTime / 60)}:${formatTime(currentTime % 60)}/${Math.floor(duration / 60)}:${formatTime(duration % 60)}`}</h6>
                </div>
                <audio ref={audioRef} src={`https://myplaylistserver-production.up.railway.app/uploads/${url}`} />
            </div>
            <div className="bg-whaqua w-li h-li relative left-32 rounded-srch">
                <div className="w-fill font-kanit text-center relative top-2 overflow-auto">
                    <h3>{data}</h3>
                    <hr />
                </div>
                <ul className="list-none">
                    {list.map((li, i) => (
                        <li key={i} onClick={() => setIndex(i)}>
                            <div>
                                <h4 className={`font-kanit cursor-pointer m-2 text-${i === index ? 'pink' : 'black'}`}>{`${i + 1}. ${li.name} ${index === i ? '👈' : ''}`}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
