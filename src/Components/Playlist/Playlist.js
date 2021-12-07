import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
    //将事件目标传入从App.js中获得的state change method
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        {/* 将本js文件中的handleNameChange作为event handler，以使input中输入的文字变为App保存的playlist名（注意e的触发并非点击保存，而是在输入框中输入文字） */}
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        {/* 将从App.js获得的playlist内容传递给TrackList.js，注意此处prop-name需得是TrackList.js中会获得的prop-name，并非App.js中发出的state-name */}
        {/* 将从App.js中获得的state change method传递给TrackList.js */}
        {/* 将isRemoval值传递给TrackList.js并一步传递给Track.js，以在Track.js中和-号按钮关联 */}
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        {/* 将从App.js中获得的onSave方法作为event handler用以保存playlist */}
      </div>
    );
  }
}
