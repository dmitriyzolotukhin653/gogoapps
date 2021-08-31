import React from "react";
import classes from "./App.module.scss";
import VideoItem from "./VideoItem";
import { api, API_KEY } from "./api";
import { useFormik } from "formik";
import YouTube from "react-youtube";

const VideoList: React.FC = () => {
  const [data, setData] = React.useState<any[] | null>(null);
  const [currentId, setCurrentId] = React.useState<string | null>(null);
  const [searchData, setSearchData] = React.useState<any[] | null>(null);

  const fetchData = React.useCallback(async (term: string) => {
    return api.get("/search", {
      params: {
        key: API_KEY,
        part: "snippet",
        maxResults: 48,
        q: term,
      },
    });
  }, []);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      q: "test",
    },
    async onSubmit(values) {
      if (values.q) {
        const { data } = await fetchData(values.q);
        setSearchData(data?.items);
      }
    },
  });

  React.useEffect(() => {
    if (values.q === "") {
      setSearchData([]);
    }
  }, [values.q]);

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchData(values.q);
      setData(data?.items);
      setCurrentId(data.items[0]?.id?.videoId);
    })();
  }, [fetchData]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.navbar__logo} />
        <div className={classes.navbar__search}>
          <input
            name="q"
            onChange={handleChange}
            value={values.q}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => handleSubmit()}>Search</button>
        </div>
      </div>
      <div className={classes.video}>
        <div className={classes.video__frame}>
          {currentId && (
            <YouTube
              videoId={currentId}
              onError={() => {
                console.log("eee");
              }}
              opts={{
                width: "100%",
                height: "360px",
              }}
            />
          )}
        </div>
        <div className={classes.video__list}>
          {(searchData?.length ? searchData : data)?.map((item: any) => (
            <VideoItem
              key={item.etag}
              item={item}
              onClick={() => setCurrentId(item.id?.videoId)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoList;
