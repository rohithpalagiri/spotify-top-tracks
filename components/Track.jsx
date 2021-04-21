import React from 'react'


const Track = ({trackData}) => {
    const convertMStoMin = (ms) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);

        return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`
    }

    return(
        <tr className="odd:bg-green-200 even:bg-green-500"> 
            <td className="pl-4"><img className="max-w-4rem" src={trackData.album.images[0].url} /></td>
            <td>{trackData.name}</td>
            <td>{trackData.artists.map((x) => {
                return x.name
            })}</td>
            <td>{trackData.album.name}</td>
            <td className="pr-4">{convertMStoMin(trackData.duration_ms)}</td>
        </tr>
    )
}

export default Track;