import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  useSession, getSession, signIn, signOut
} from 'next-auth/client'

//Components
import Track from '../components/Track'
import Table from '../components/Table'

const Component = () => {
  const [session, loading] = useSession();
  const [recentTracks, setRecentTracks] = useState([])
  const [allTimeTracks, setAllTimeTracks] = useState([])
  const [sixMonthTracks, setSixMonthTracks] = useState([])
  const [lastMonthTracks, setLastMonthTracks] = useState([])
  const [currentTab, setCurrentTab] = useState("recentTracks")

  useEffect(() => {
    if (session) {
      axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: { 'Authorization': 'Bearer ' + session.accessToken }
      })
        .then(res => {
          let data = res.data.items;
          let trackData = data.map((x) => {
            return x.track;
          })
          setRecentTracks(trackData);
        })
        .catch(err => console.log(err))
    }
  }, [session])

  const getallTimeTracks = (e) => {
    e.preventDefault();
    console.log("hello");
    if (allTimeTracks.length < 1) {
      axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
        headers: { 'Authorization': 'Bearer ' + session.accessToken }
      })
        .then(res => {
          let data = res.data.items;
          setAllTimeTracks(data);
        })
        .then(setCurrentTab("allTimeTracks"))
        .catch(err => console.log(err))
    }
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />

        <ul>
          <li><a href="#">Recently Played</a></li>
          <li><a href="#" onClick={(e) => getallTimeTracks(e)}>All Time</a></li>
          <li><a href="#">6 Months</a></li>
          <li><a href="#">Last Month</a></li>
        </ul>

        {currentTab === "recentTracks" && <Table tracks={recentTracks} />}
        {currentTab === "allTimeTracks" && <Table tracks={allTimeTracks} />}

        

        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return <>
    Not signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

export default Component;