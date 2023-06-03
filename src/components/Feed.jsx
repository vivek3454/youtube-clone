import React, { useContext, useEffect } from "react";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(Context);
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);
  return (
    <div className='flex flex-row h-[calc(100%-56px)] bg-black'>
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 md:px-10">
          {!loading && searchResults.map((item) => {
            console.log(item);
            if (item.type !== "video") return false;
            return (
              <VideoCard
                key={item?.video?.videoId}
                video={item?.video}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Feed