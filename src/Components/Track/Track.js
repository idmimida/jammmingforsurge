import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction = () => {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>;
      //将本js文件中的removeTrack方法作为event handler挂在-号按钮上
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>;
      //将本js文件中的addTrack方法作为event handler挂在+号按钮上
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
    //将选中的track传递进自App.js->SearchResults.js->TrackList.js获得的state change方法onAdd中，以验证其id是否与现有id相同，不同则添加，相同则不添加（详见App.js中的addTrack方法）
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
    //将选中的track传递进自App.js->Playlist.js->TrackList.js获得的state change方法onRemove中，以验证id其是否与选中的曲目相同，相同则不添加（详见App.js中的removeTrack方法）
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          {/* 将从App.js->SearchResults.js->TrackList.js中获得的搜索结果按prop-name分项渲染 */}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}