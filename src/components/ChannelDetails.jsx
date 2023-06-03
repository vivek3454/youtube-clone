import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../context/contextApi';
import { fetchDataFromApi } from '../utils/api';
import LeftNav from './LeftNav';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ChannelVideoCard from './ChannelVideoCard';

const ChannelDetails = () => {
    const [channelDetails, setChannelDetails] = useState();
    const { id } = useParams();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        fetchChannelDetails();
    }, [id]);

    const fetchChannelDetails = async () => {
        setLoading(true);
        const res = await fetchDataFromApi(`channel/details/?id=${id}`)
        setChannelDetails(res);
        setLoading(false);
    }

    return (
        <div className='flex flex-row h-[calc(100%-56px)]'>
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black text-white">
                <div className='w-full relative'>
                    <img src={channelDetails?.banner?.desktop[4]?.url} className='h-32 md:h-52' alt="" />
                    <div className="bg-slate-800 flex gap-2 absolute right-0 bottom-0 px-5 py-2">
                        {channelDetails?.links?.map((link) =>
                        (
                            <a href={link?.targetUrl} key={link.targetUrl} className='text-white inline-flex gap-1'>
                                <img src={link?.icon} className='h-5 w-5' alt="" />
                                <p className='text-sm hidden lg:block'>{link?.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center px-5 items-center gap-7 max-w-5xl m-auto mt-5'>
                    <div>
                        <div className='h-36 w-36 overflow-hidden rounded-full'>
                            <img src={channelDetails?.avatar[2]?.url} className='h-full w-full' alt="" />
                        </div>
                    </div>
                    <div className='px-7'>
                        <h2 className='text-lg md:text-2xl justify-center md:justify-normal font-medium flex items-center gap-2'>
                            {channelDetails?.title}
                            <span>{channelDetails?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                            </span>
                        </h2>
                        <div className='flex gap-3 text-[11px] md:text-sm'>
                            <p>{channelDetails?.username}</p>
                            <p>{channelDetails?.stats?.subscribersText}</p>
                            <p>{channelDetails?.stats?.videosText}</p>
                        </div>
                        <p className='line-clamp-1 text-[11px] md:text-sm'>{channelDetails?.description}</p>
                    </div>
                </div>
                <div className='px-8'>
                    <h3 className='mt-7 text-lg md:text-2xl md:ml-12 text-center md:text-left'>All Videos</h3>
                    <ChannelVideoCard id={channelDetails?.channelId} />
                </div>
            </div>
        </div>
    )
}

export default ChannelDetails