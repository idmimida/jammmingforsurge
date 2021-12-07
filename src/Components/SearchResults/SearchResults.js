import React from "react";
import "./SearchResults.css";
import { TrackList } from "../TrackList/TrackList";

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
        {/* 将从App.js中获得的搜索结果传递给TrackList.js */}
        {/* 将从App.js中获得的state change method传递给TrackList.js */}
        {/* 将isRemoval值传递给TrackList.js并一步传递给Track.js，以在Track.js中和+号按钮关联 */}
      </div>
    );
  }
}