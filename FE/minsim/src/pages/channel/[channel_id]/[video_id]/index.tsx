import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import NavBar from 'src/components/NavBar'
import VideoInfo from 'src/components/VideoInfo'

import VideoFrame from 'styles/videoDetail/VideoFrameStyle'
import { ChannelInfoContainerInnerWrapper, ChannelInfoImgTextWrapper } from 'styles/channelDetail/ChannelInfoContainerStyle'
import { BadMinsim, GoodMinsim, MinsimTextWrapper, VideoMinsim, VideoMinsimContainer } from 'styles/videoDetail/VideoMinsimStyle'
import { VideoDetailContainerInnerWrapper, VideoListContainer } from 'styles/channelDetail/VideoListContainerStyle'
import { Rank1Tag, Rank2Tag, Rank3Tag } from 'styles/videoDetail/RankTagStyle'
import CommentInfo from 'src/components/CommentInfo'
import { CommentImgContainer, VideoInfoContainer, VideoInfoImgTextWrapper } from 'styles/videoDetail/CommentInfoStyle'
import { useEffect, useState } from 'react'
import apiIniVideoDetail from 'src/pages/api/apiVideoDetail'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import apiIniVideoComments from 'src/pages/api/apiVideoComments'
import { ChannelTagWrapper } from 'styles/componentStyles/ChannelInfoStyle'
import { Tag } from 'styles/componentStyles/TagStyle'
import { VideoLoadingPage } from 'src/components/Loading'
import FetchButton from 'src/components/FetchButton'
import VideoFetchButton from 'src/components/VideoFetchButton'
import { useRecoilState } from 'recoil'
import { aVideo } from 'states/atom'


interface commentData {
  content: string;
  like: number;
  minsim: string;
  name: string;
  thumbnail: string;
  time: string;
}
interface videoData {
  text: string;
  value: number;
}

const VideoDetailPage: NextPage = (props) => {

  const router = useRouter()
  const query = router.query

  const videoId = query.video_id as string
  const videoTitle = query.title?.toString();
  const [commentList, setCommentList] = useState<Array<commentData>>([])
  const [videoData, setVideoData] = useRecoilState(aVideo)

  // const [videoList, setVideoList] = useState<Array<videoData>>([])

  const {data, status} = useQuery(["videoData", videoId], ()=>{return apiIniVideoDetail(videoId)})
  const {data: commentData, status: commentStatus} = useQuery(["commentData", videoId], ()=>{return apiIniVideoComments(videoId)},{
    enabled: !!data
  }) 
  
  
  useEffect(() => {
    // if (typeof data === 'object') {setVideoList(data?.keywords.sort(((a: videoData, b: videoData) => {return b.value - a.value;})))}
    if (commentData !== 'undefined') {setCommentList(commentData?.sort(((a: commentData, b: commentData) => {return a.like - b.like;})))};
  }, [commentData, data])    
  
  
  if (status === "loading" || commentStatus === "loading") {
    return <VideoLoadingPage />
  }  

  return (
    <div>
      <Head>
        <title>영상</title>
        <meta name="description" content={videoTitle} />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <NavBar />
        <VideoFrame src={`https://www.youtube.com/embed/${videoData.videoId}`}  title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
          <VideoInfoContainer>
            <ChannelInfoContainerInnerWrapper>
              <ChannelInfoImgTextWrapper>
                <VideoInfo title={`${videoData.title}`} sub1={`${videoData.name}`} sub2={`조회수 ${videoData.view?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${'\u00A0'}${'\u00A0'} |${'\u00A0'}${'\u00A0'}  ${videoData.time?.slice(0, 10)}`} ></VideoInfo>
              </ChannelInfoImgTextWrapper>
              <VideoFetchButton />
              {/* {typeof data === 'object' && videoList[0].text ?  <ChannelTagWrapper>
                <Tag>
                  <p>{videoList[0].text}</p>
                </Tag>
                <Tag>
                  <p>{videoList[1].text}</p>
                </Tag>
                <Tag>
                  <p>{videoList[2].text}</p>
                </Tag>
              </ChannelTagWrapper> : <>갱신 중</>} */}

            </ChannelInfoContainerInnerWrapper>
          </VideoInfoContainer>

          <VideoMinsimContainer>
          {typeof data === 'object' ? 
          <>
            <MinsimTextWrapper>
              <GoodMinsim>떡상 {data.ms.toFixed(0)}%</GoodMinsim>
              <BadMinsim>떡락 {100 - data.ms.toFixed(0)}%</BadMinsim>
            </MinsimTextWrapper>
            <VideoMinsim max={100} value={data.ms} />  
          </>
          : <>갱신 중</> }
          </VideoMinsimContainer>

          <VideoListContainer>
            <h4>Best 댓글</h4>
            {commentList ? <>
              <VideoDetailContainerInnerWrapper>
                <Rank1Tag />
                <VideoInfoImgTextWrapper>
                  <CommentImgContainer>
                    <Image src={commentList[9].thumbnail}  alt='댓글 작성자의 프로필 대표 이미지' width={'80px'} height={'80px'} objectFit='cover' style={{borderRadius: '50%'}} />
                  </CommentImgContainer>
                  <CommentInfo name={commentList[9].name} publishedTime={commentList[9].time.slice(0, 10)} comment={commentList[9].content} liked={commentList[9].like.toString()} />
                </VideoInfoImgTextWrapper>
              </VideoDetailContainerInnerWrapper>
              <VideoDetailContainerInnerWrapper>
                <Rank2Tag />
                <VideoInfoImgTextWrapper>
                  <CommentImgContainer>
                    <Image src={commentList[8].thumbnail}  alt='댓글 작성자의 프로필 대표 이미지' width={'80px'} height={'80px'} objectFit='cover' style={{borderRadius: '50%'}} />
                  </CommentImgContainer>
                  <CommentInfo name={commentList[8].name} publishedTime={commentList[8].time.slice(0, 10)} comment={commentList[8].content} liked={commentList[8].like.toString()} />
                </VideoInfoImgTextWrapper>
              </VideoDetailContainerInnerWrapper>
              <VideoDetailContainerInnerWrapper>
                <Rank3Tag />
                <VideoInfoImgTextWrapper>
                  <CommentImgContainer>
                    <Image src={commentList[7].thumbnail}  alt='댓글 작성자의 프로필 대표 이미지' width={'80px'} height={'80px'} objectFit='cover' style={{borderRadius: '50%'}} />
                  </CommentImgContainer>
                  <CommentInfo name={commentList[7].name} publishedTime={commentList[7].time.slice(0, 10)} comment={commentList[7].content} liked={commentList[7].like.toString()} />
                </VideoInfoImgTextWrapper>
              </VideoDetailContainerInnerWrapper>
            </> : <></>
            }
          </VideoListContainer>
      </main>
    </div>
  )
}

export default VideoDetailPage


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const videoId = context.params?.video_id as string

//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(["videoData", videoId], ()=>apiIniVideoDetail(videoId))
//   await queryClient.prefetchQuery(["commentData", videoId], ()=>apiIniVideoComments(videoId),
//   ) 

//   queryClient.setQueryData(["videoData", videoId], apiIniVideoDetail(videoId))
//   queryClient.setQueryData(["commentData", videoId], apiIniVideoComments(videoId))
//   console.log(queryClient.getQueryData(["commentData", videoId]))


//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 86400
//   }
// }