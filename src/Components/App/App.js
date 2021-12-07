import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
        // //在本js文件中设置由Spotify API获取结果，传递给其他组件渲染
      playlistName: "My Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => {
      return savedTrack.id === track.id;
    })) {
      //find后括号内的形参代表数组中的元素，名字可以随便起，此处起为savedTrack
      return;
    } else {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
      //执行本方法后自动更新（渲染）PlaylistTracks的内容
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
      //filter后括号内的形参代表数组中的元素，名字可以随便起，此处起为currentTrack
      //当playlistTracks中的某对象的id等于选中的对象（即track）的id时，该id的track被筛出新的tracks之列，也即删去了该track
      this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
    //将输入的playlist名变为App保存的最新playlist名
  }

  savePlaylist() {
    // alert('this method is linked to the button correctly');
    // 上面一行可用来检查按钮是否与父组件中传递而来的方法成功关联 
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

 search(term) {
    Spotify.search(term).then(searchResults => {
      //作为形参的searchResults是一个自设的新变量
      this.setState({ searchResults: searchResults});
      //前一个是this.state.searchResults，后一个是自设形参的实参
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            {/* 将搜索结果传递给SearchResult.js...最终在Track组件中得到渲染 */}
            {/* 将addTrack方法作为state change method传递给SearchResult.js */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
            {/* 将playlist内容传递给Playlist.js...最终在Track组件中得到渲染 */}
            {/* 将removeTrack方法作为state change method传递给Playlist.js */}
            {/* 将onNameChange方法作为state change method传递给Playlist.js，并在该处渲染 */}
            {/* 将onSave方法传递给Playlist.js */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
