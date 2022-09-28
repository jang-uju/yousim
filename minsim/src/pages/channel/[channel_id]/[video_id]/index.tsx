import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import TitleImg from '/public/images/titleImg.jpg'
import NavBar from 'src/components/NavBar'
import Tags from 'src/components/Tags'
import VideoInfo from 'src/components/VideoInfo'

import VideoFrame from 'styles/videoDetail/VideoFrameStyle'
import { ChannelInfoContainerInnerWrapper, ChannelInfoImgTextWrapper } from 'styles/channelDetail/ChannelInfoContainerStyle'
import { BadMinsim, GoodMinsim, MinsimTextWrapper, VideoMinsim, VideoMinsimContainer } from 'styles/videoDetail/VideoMinsimStyle'
import { VideoDetailContainerInnerWrapper, VideoListContainer } from 'styles/channelDetail/VideoListContainerStyle'
import { Rank1Tag, Rank2Tag, Rank3Tag } from 'styles/videoDetail/RankTagStyle'
import CommentInfo from 'src/components/CommentInfo'
import { VideoInfoContainer, VideoInfoImgTextWrapper } from 'styles/videoDetail/CommentInfoStyle'

const VideoDetailPage: NextPage = () => {
  const router = useRouter()
  const query = router.query
  console.log(query);
  
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar />
        <VideoFrame src={`https://www.youtube.com/watch?v=${query.id}`} title=''/>
          <VideoInfoContainer>
            <ChannelInfoContainerInnerWrapper>
              <ChannelInfoImgTextWrapper>
                <VideoInfo title={`${query.title}`} sub1='아이유' sub2={`조회수 ${query.view}${'\u00A0'}${'\u00A0'} |${'\u00A0'}${'\u00A0'}  ${query.time}`} ></VideoInfo>
              </ChannelInfoImgTextWrapper>
              <Tags />
            </ChannelInfoContainerInnerWrapper>
          </VideoInfoContainer>

          <VideoMinsimContainer>
            <MinsimTextWrapper>
              {/* text에 값 넣기 */}
              <GoodMinsim>떡상 60%</GoodMinsim>
              <BadMinsim>떡락 40%</BadMinsim>
            </MinsimTextWrapper>
            {/* value에 값 넣기 */}
            <VideoMinsim max={100} value={60} />  
          </VideoMinsimContainer>

          <VideoListContainer>
            <h4>Best 댓글</h4>
            <VideoDetailContainerInnerWrapper>
              <Rank1Tag />
              <VideoInfoImgTextWrapper>
                <Image src={TitleImg}  alt='채널 대표 이미지' width={'77px'} height={'77px'} objectFit='cover' style={{borderRadius: '50%'}} />
                <CommentInfo name='아이유' publishedTime='5분 전' comment='반갑습니다. 오늘도 즐거운 날입니다.' liked='96' />
              </VideoInfoImgTextWrapper>
            </VideoDetailContainerInnerWrapper>
            <VideoDetailContainerInnerWrapper>
              <Rank2Tag />
              <VideoInfoImgTextWrapper>
                <Image src={TitleImg}  alt='채널 대표 이미지' width={'77px'} height={'77px'} objectFit='cover' style={{borderRadius: '50%'}} />
                <CommentInfo name='아이유' publishedTime='5분 전' comment='반갑습니다. 오늘도 즐거운 날입니다.' liked='96' />
              </VideoInfoImgTextWrapper>
            </VideoDetailContainerInnerWrapper>
            <VideoDetailContainerInnerWrapper>
              <Rank3Tag />
              <VideoInfoImgTextWrapper>
                <Image src={TitleImg}  alt='채널 대표 이미지' width={'77px'} height={'77px'} objectFit='cover' style={{borderRadius: '50%'}} />
                <CommentInfo name='아이유' publishedTime='5분 전' comment='반갑습니다. 오늘도 즐거운 날입니다.' liked='96' />
              </VideoInfoImgTextWrapper>
            </VideoDetailContainerInnerWrapper>
          </VideoListContainer>
      </main>
    </div>
  )
}

export default VideoDetailPage
