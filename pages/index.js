import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  useSession, getSession, signIn, signOut
} from 'next-auth/client'

//Components
import Track from '../components/Track'
import Table from '../components/Table'

//Services
import userService from '../services/services'

const Component = () => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [recentTracks, setRecentTracks] = useState([])
  const [allTimeTracks, setAllTimeTracks] = useState([])
  const [sixMonthTracks, setSixMonthTracks] = useState([])
  const [lastMonthTracks, setLastMonthTracks] = useState([])
  const [currentTab, setCurrentTab] = useState("recentTracks")
  const [currentTracks, setCurrentTracks] = useState();

  useEffect(() => {
    if (session) {
      userService.getUser(session.accessToken)
      .then(res => {
        setUser(res.data);
        return res.data;
      })
      .then(res => {
        return userService.getPlaylists(session.accessToken, res.id)
      })
      .then(res => setPlaylists(res.data.items))

      console.log("test")
      updateTracksView('recentTracks');
    }
  }, [session])

  const updateTracksView = (trackType, event) => {
    
    switch(trackType){
      case 'recentTracks':
        console.log("wrtrggr")
        if(!recentTracks.length){
          userService.getRecentTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items.map(x => x.track);
              return trackData;
            }).then(res => {
              setRecentTracks(res);
              setCurrentTab("recentTracks");
              setCurrentTracks(recentTracks);
            })
        } else{
          setCurrentTab("recentTracks");
          setCurrentTracks(recentTracks);
          console.log("wfwf", currentTracks)
        }
        break;
        
      case 'allTimeTracks':
        console.log("wrtrggr")
        if(!allTimeTracks.length){
          userService.getallTimeTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setAllTimeTracks(res);
              setCurrentTab("allTimeTracks");
              setCurrentTracks(allTimeTracks);
            })
        }
        else{
          setCurrentTab("allTimeTracks");
          setCurrentTracks(allTimeTracks);
        }
        break;
      case 'sixMonthTracks':
        console.log("wrtrggr")
        if(!sixMonthTracks.length){
          userService.getSixMonthTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setSixMonthTracks(res);
              setCurrentTab("sixMonthTracks");
              setCurrentTracks(sixMonthTracks);
            })
        } else{
          setCurrentTab("sixMonthTracks");
          setCurrentTracks(sixMonthTracks);
        }
        break;
      case 'lastMonthTracks':
        console.log("wrtrggr")
        if(!lastMonthTracks.length){
          userService.getLastMonthTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setLastMonthTracks(res);
              setCurrentTab("lastMonthTracks");
              setCurrentTracks(lastMonthTracks);
            })
        } else{
          setCurrentTab("lastMonthTracks");
          setCurrentTracks(lastMonthTracks);
        }
        break;
    }
  }

  if (session && user && currentTracks) {
    return (
      <>
        Signed in as {user.display_name} <br />

        <ul>
          <li><button  onClick={(e) => updateTracksView("recentTracks", e)}>Recently Played</button></li>
          <li><button  onClick={(e) => updateTracksView("allTimeTracks", e)}>All Time</button></li>
          <li><button  onClick={(e) => updateTracksView("sixMonthTracks", e)}>6 Months</button></li>
          <li><button  onClick={(e) => updateTracksView("lastMonthTracks", e)}>Last Month</button></li>
          
        </ul>

        <button onClick={() => userService.createPlaylist(session.accessToken, user.id)}>Create Playlist </button>

        

        {currentTracks && <Table tracks={currentTracks} />}

        

        <button onClick={() => signOut(user.id)}>Sign out</button>
      </>
    )
  }

  return <>
    Not signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

export default Component;