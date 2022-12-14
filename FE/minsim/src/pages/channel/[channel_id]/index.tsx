import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import SearchBar from "src/components/SearchBar";
import NavBar from "src/components/NavBar";
import Banner from "styles/channelDetail/BannerStyle";

import ChannelInfo from "src/components/ChannelInfo";
import {
  ChannelInfoContainer,
  ChannelInfoContainerInnerWrapper,
  ChannelInfoImgTextWrapper,
  ImgDiv,
} from "styles/channelDetail/ChannelInfoContainerStyle";
import TitleImg from "/public/images/titleImg.jpg";
import Tags from "src/components/Tags";
import ChannelMinsimText from "src/components/ChannelMinsimText";
import VideoListTitle from "styles/channelDetail/VideoListSectionTitleStyle";
import {SvgImgFrameContainer} from 'styles/mainStyles/ImgFrameStyle'

import {
  VideoListContainer,
  VideoListContainerInnerWrapper,
} from "styles/channelDetail/VideoListContainerStyle";
import VideoTags from "src/components/VideoTags";
import { useEffect, useState } from "react";
import VideoList from "src/components/VideoList";
import apiIniVideoList from "src/pages/api/apiIniVideoList";
import { useQuery } from "@tanstack/react-query";
import SearchList from "src/components/SearchList";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { aChData, chMinsim } from "states/atom";
import apiChannelMinsim from 'src/pages/api/apiChannelMinsim';
import FetchButton from 'src/components/FetchButton';
import { ChannelLoadingPage } from 'src/components/Loading';

import Rise from 'public/images/rise.svg'
import Drop from 'public/images/drop.svg'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { WordCloudContainer } from "styles/trend/WordcloudStyle";
import SimpleWordCloud from 'src/components/TrendList'

interface IVideo {
  categoryId: number;
  channelTitle: string;
  comment: number;
  description: string;
  id: string;
  like: number;
  nextToken: string;
  tag: string[];
  thumbnail: string;
  time: string;
  title: string;
  view: number;
}

interface ISearchItem {
  id: string;
  banner: string;
  name: string;
  description: string;
  subscriber: number;
  video: number;
  thumbnail: string;
  time: string;
  view: number;
}

interface minsimKeywordData {
  text: string;
  value: number;
}


const ChannelDetailPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const [resData, setResData] = useState('');
  
  const [chData, setChData] = useRecoilState<ISearchItem>(aChData);
  const [channelMinsim, setChannelMinsim] = useRecoilState(chMinsim)

  const {data: videos, status } = useQuery<IVideo[]>(["video", query.channel_id],() => {return apiIniVideoList(query.channel_id);});
  const {data: channelMinsimData, status: minsimStatus} = useQuery(["channelMinsim", query.channel_id], async ()=>{return await apiChannelMinsim(query.channel_id)})  

  useEffect(() => {
    setChannelMinsim(channelMinsimData)
    if (channelMinsimData !== '?????? ???' && channelMinsimData !== undefined && channelMinsimData.keywords !== undefined) {      
      const tmp = [...channelMinsimData.keywords]
      setResData(tmp.sort((a: minsimKeywordData, b: minsimKeywordData) => {return b.value - a.value}).slice(0, 3).map((el: minsimKeywordData) => {
        return `#${el.text}`
      }).join('  '))
    }
  }, [chData, channelMinsimData, channelMinsim])
    
  
  if (status === "loading") {
    return <ChannelLoadingPage />
  }
    
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.set("#ChartStart", {
  //     opacity: 0,
  //     ease: "none",
  //     });
  //   gsap.to("#ChartStart", {
  //     ease: "none",
  //     opacity: 1,
  //     scrollTrigger: {
  //       trigger: '#keyword',
  //       start: "+=600",
  //       end: "+=200",
  //       scrub: true,
  //       // markers: true,
  //     },
  //     });
  // })

  return (
    <div>
      <Head>
        <title>??????</title>
        <meta name="description" content={chData?.name}/>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <NavBar />
        <section>
          <Banner src={chData.banner} alt="??????" />
          <ChannelInfoContainer>
            <ChannelInfoContainerInnerWrapper>
              <ChannelInfoImgTextWrapper>
                <ImgDiv id="keyword">
                  <Image
                    src={chData.thumbnail}
                    alt="?????? ?????? ?????????"
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "50%" }}
                  />
                </ImgDiv>
                <ChannelInfo 
                  title={chData?.name}
                  subscriber={chData?.subscriber}
                  video={chData?.video}
                  description={chData?.description}
                ></ChannelInfo>
              </ChannelInfoImgTextWrapper>
              <FetchButton />
            </ChannelInfoContainerInnerWrapper>
          </ChannelInfoContainer>

          <ChannelMinsimText
            title="?????? ??????"
            mainText={channelMinsim ? `${channelMinsim.ms}% ${channelMinsim.ms >=50 ? '??????' : '??????'}` : ''}
          ></ChannelMinsimText>
          <ChannelMinsimText
            title="?????? ?????????"
            mainText={channelMinsim ? `${resData}` : ''}
          ></ChannelMinsimText>
          
          <SvgImgFrameContainer id="ChartStart">
            {channelMinsimData ? channelMinsimData.ms >=50 ? <Image src={Rise} alt="??????" layout='responsive'/> : <Image src={Drop} alt='??????' layout='responsive'/> : ''}
          </SvgImgFrameContainer>
        </section>
        <section>
          <WordCloudContainer>
            <SimpleWordCloud props={channelMinsimData?.keywords}/>
          </WordCloudContainer>
        </section>
        <section>
          <VideoListTitle>?????? ??????</VideoListTitle>

          {/* ????????? ????????? ????????? ??? - ?????? ???????????? ?????? ??????  */}
          <VideoListContainer>
            {videos ? <VideoList videos={videos} /> : <></>}
          </VideoListContainer>
        </section>
      </main>
    </div>
  );
};

export default ChannelDetailPage;



// export const getStaticPaths: GetStaticPaths = async (context) => {
  
//   return {
//     paths: [
//       {
//         params: {
//           channel_id: "UC3SyT4_WLHzN7JmHQwKQZww",
//         }
//       }
//     ],
//     fallback: true
//   }
// }


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.channel_id as string
//   const queryClient = new QueryClient()
//   await queryClient.prefetchQuery(["video", id], ()=>apiIniVideoList(id))
//   await queryClient.prefetchQuery(["channelMinsim", id], ()=>apiChannelMinsim(id))
//   console.log(queryClient)
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 86400
//   }
// }
