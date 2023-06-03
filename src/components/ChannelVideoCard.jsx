import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/contextApi';
import { fetchDataFromApi } from '../utils/api';
import { Link } from 'react-router-dom';
import VideoLength from '../shared/VideoLength';
import { abbreviateNumber } from 'js-abbreviation-number';

const ChannelVideoCard = ({ id }) => {
    const [channelVideos, setChannelVideos] = useState();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        fetchChannelVideos();
    }, [id]);

    const fetchChannelVideos = async () => {
        setLoading(true);
        const { contents } = await fetchDataFromApi(`channel/videos/?id=${id}`)
        setChannelVideos(contents);
        setLoading(false);
    }
    return (
        <div className='flex flex-wrap gap-4 mt-10 justify-center'>
            {channelVideos?.map((item) => (
                item.type === 'video' &&
                <Link to={`/video/${item?.video?.videoId}`} key={item.video.videoId}>
                    <div className="h-36 w-64 rounded-lg overflow-hidden relative">
                        <img src={item.video.thumbnails[3].url} className='h-full w-full' alt="" />
                        {item?.video?.lengthSeconds && (
                            <VideoLength time={item?.video?.lengthSeconds} />
                        )}
                    </div>
                    <div className='mt-5 mb-8'>
                        <p className='line-clamp-2 max-w-[260px]'>
                            {item.video.title}
                        </p>
                        <div className='flex text-gray-400 gap-2'>
                            <span>
                                {`${abbreviateNumber(item?.video?.stats?.views, 2)} views`}
                            </span>
                            <span className="flex text-[22px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">
                                {item?.video?.publishedTimeText}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ChannelVideoCard