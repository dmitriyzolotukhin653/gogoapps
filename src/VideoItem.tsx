import React from "react";
import classes from "./App.module.scss";

interface VideoItemProps {
  item: any;
  onClick?: any;
}

const VideoItem: React.FC<VideoItemProps> = ({ item, onClick }) => {
  return (
    <div className={classes.video__list__item} onClick={onClick}>
      <div
        className={classes.video__list__item__thumb}
        style={{
          backgroundImage: `url("${item.snippet.thumbnails.high.url}")`,
        }}
      />
      <h3>{item.snippet.title}</h3>
      <span className={classes.video__list__item__datetime}>
        {new Date(item.snippet.publishedAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default VideoItem;
