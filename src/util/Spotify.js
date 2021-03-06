const clientID = "a6da220db2624ca192ba9aa8a9ef5485";
const redirectURI = "http://thick-beggar.surge.sh";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //Check for an access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //This clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURI = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURI;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
      .then((response) => {
          return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
          return jsonResponse.tracks.items.map((track) => ({
            //为什么要有items??
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
      });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userID;
    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userID = jsonResponse.id;

        let playlistID;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ name: name })
        })
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            playlistID = jsonResponse.id;
            
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackURIs })
            });
          });
      });
  }

};

export default Spotify;
