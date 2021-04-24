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

export default {getRecentTracks, getallTimeTracks, getSixMonthTracks, getLastMonthTracks};
