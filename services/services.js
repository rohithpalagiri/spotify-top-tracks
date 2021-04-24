import axios from "axios";

const baseUrl = "https://api.spotify.com/v1/me/";

const getRecentTracks = (token) => {
  const request = axios.get(baseUrl + "player/recently-played?limit=50", {
    headers: { Authorization: "Bearer " + token },
  });

  return request.then((response) => response);
};

const getallTimeTracks = (token) => {
    const request = axios.get(baseUrl + "top/tracks?time_range=long_term&limit=50", {
      headers: { Authorization: "Bearer " + token },
    });
  
    return request.then((response) => response);
  };


  const getSixMonthTracks = (token) => {
    const request = axios.get(baseUrl + "top/tracks?time_range=medium_term&limit=50", {
      headers: { Authorization: "Bearer " + token },
    });
  
    return request.then((response) => response);
  };

  const getLastMonthTracks = (token) => {
    const request = axios.get(baseUrl + "top/tracks?time_range=short_term&limit=50", {
      headers: { Authorization: "Bearer " + token },
    });
  
    return request.then((response) => response);
  };

  const getUser = (token) => {
    const request = axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token },
    });

    return request.then((response) => response);
  }

  const getPlaylists = (token, userId) => {
    const request = axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: { Authorization: "Bearer " + token },
    });

    return request.then((response) => response);
  }

  const createPlaylist = (token, userId) => {

    const request = axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      data: {
        "name": "New Playlist",
        "description": "New playlist description",
      },
      headers: { Authorization: "Bearer " + token },
    });

    return request.then((response) => response);
  }

export default {getRecentTracks, getallTimeTracks, getSixMonthTracks, getLastMonthTracks, getUser, getPlaylists, createPlaylist};
