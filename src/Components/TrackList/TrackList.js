import React from "react";
import './TrackList.css';
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
    render() {
        return (
          <div className="TrackList">
            {
              this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />)
              //.map()返回一个新的数组
              //将从App.js->SearchResults.js及Playlist.js中获得的搜索结果传递给Track.js，并且让结果中的对象分别在Track.js中得到渲染
              //将从App.js->SearchResults.js中获得的state change method传递给Track.js，以用作Track.js中event handler的回调函数
              //将从App.js->Playlist.js中获得的state change method传递给Track.js，以用作Track.js中event handler的回调函数
              //将从ASearchResults及Playlist.js中获得的isRemoval值传递给Track.js，以在Track.js中和+号或-号按钮关联
            }
          </div>
        );
    }
}