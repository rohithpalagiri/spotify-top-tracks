import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  useSession, getSession, signIn, signOut
} from 'next-auth/client'

//Components
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
      updateTracksView('recentTracks');
    }
  }, [session])

  const playlistAlias = {
    recentTracks: "Recently Played",
    lastMonthTracks: "Last Month",
    sixMonthTracks: "Last Six Months",
    allTimeTracks: "All Time",
  }

  const updateTracksView = (trackType, event) => {
    
    switch(trackType){
      case 'recentTracks':
        if(!recentTracks.length){
          userService.getRecentTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items.map(x => x.track);
              return trackData;
            }).then(res => {
              setRecentTracks(res);
              setCurrentTracks(res);
            })
        } else{
          setCurrentTab("recentTracks");
          setCurrentTracks(recentTracks);
        }
        break;
        
      case 'allTimeTracks':
        if(!allTimeTracks.length){
          userService.getallTimeTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setAllTimeTracks(res);
              setCurrentTab("allTimeTracks");
              setCurrentTracks(res);
            })
        }
        else{
          setCurrentTab("allTimeTracks");
          setCurrentTracks(allTimeTracks);
        }
        break;
      case 'sixMonthTracks':
        if(!sixMonthTracks.length){
          userService.getSixMonthTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setSixMonthTracks(res);
              setCurrentTab("sixMonthTracks");
              setCurrentTracks(res);
            })
        } else{
          setCurrentTab("sixMonthTracks");
          setCurrentTracks(sixMonthTracks);
        }
        break;
      case 'lastMonthTracks':
        if(!lastMonthTracks.length){
          userService.getLastMonthTracks(session.accessToken)
            .then( res => {
              let trackData = res.data.items;
              return trackData;
            }).then(res => {
              setLastMonthTracks(res);
              setCurrentTab("lastMonthTracks");
              setCurrentTracks(res);
            })
        } else{
          setCurrentTab("lastMonthTracks");
          setCurrentTracks(lastMonthTracks);
        }
        break;
    }
  }

  const playlistHandler = () => {
      let plName = playlistAlias[currentTab];

      let foundPlaylist = playlists.find((x) => x.name === plName);

      let tracks = currentTracks.map((x) => x.uri);

      if(foundPlaylist !== undefined){
        userService.updatePlaylist(session.accessToken, foundPlaylist.id, tracks);
      } else{
        userService.createPlaylist(session.accessToken, user.id, plName)
        .then(res => userService.updatePlaylist(session.accessToken, res.data.id, tracks))
        .catch(err => console.log(err))
      }
  }

  if (session && user && currentTracks) {
    return (
      <>
        Signed in as {user.display_name} <br />
        <button onClick={() => signOut(user.id)}>Sign out</button>

        <ul>
          <li><button  onClick={(e) => updateTracksView("recentTracks", e)}>Recently Played</button></li>
          <li><button  onClick={(e) => updateTracksView("allTimeTracks", e)}>All Time</button></li>
          <li><button  onClick={(e) => updateTracksView("sixMonthTracks", e)}>6 Months</button></li>
          <li><button  onClick={(e) => updateTracksView("lastMonthTracks", e)}>Last Month</button></li>
          
        </ul>

        <button onClick={playlistHandler}>Create Playlist </button>

        <Table tracks={currentTracks} />
      </>
    )
  }

  return <>
    Not signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

export default Component;