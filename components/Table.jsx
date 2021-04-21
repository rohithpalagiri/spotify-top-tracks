import React from 'react'
import Track from './Track'

const Table = ({tracks}) => {
    return(
        <table className="table-auto">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((x, idx) => {
              return <Track key={x.id + "-" + idx} trackData={x} />
            })}
          </tbody>
        </table>
    )
}

export default Table;