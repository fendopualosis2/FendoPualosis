import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
}

export function useYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      console.log(`[YouTube] Starting connection...`);
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelUrl = PORTFOLIO_DATA.youtubeConfig.YOUTUBE_CHANNEL_URL;

      console.log(`[YouTube] Channel URL: ${channelUrl || 'None'}`);
      console.log(`[YouTube] API key available: ${apiKey ? 'YES' : 'NO'}`);

      if (!apiKey) {
        const msg = "YouTube Data API key is missing. Add the key to the AI Studio Secrets/environment configuration.";
        console.log(`[YouTube] Error: ${msg}`);
        setError(msg);
        setLoading(false);
        return;
      }

      if (!channelUrl) {
        const msg = "YouTube channel URL is missing. Add it to src/data.ts.";
        console.log(`[YouTube] Error: ${msg}`);
        setError(msg);
        setLoading(false);
        return;
      }

      try {
        let channelId = "";
        let channelTitle = "";
        let uploadsPlaylistId = "";

        if (channelUrl.includes('/channel/')) {
          channelId = channelUrl.split('/channel/')[1].split('/')[0].split('?')[0];
        } else {
          let searchParam = "";
          if (channelUrl.includes('/@')) {
            const handle = '@' + channelUrl.split('/@')[1].split('/')[0].split('?')[0];
            searchParam = `forHandle=${handle}`;
          } else if (channelUrl.includes('/c/')) {
            const cName = channelUrl.split('/c/')[1].split('/')[0].split('?')[0];
            searchParam = `forUsername=${cName}`;
          } else if (channelUrl.includes('/user/')) {
            const uName = channelUrl.split('/user/')[1].split('/')[0].split('?')[0];
            searchParam = `forUsername=${uName}`;
          } else {
            const name = channelUrl.split('youtube.com/')[1].split('/')[0].split('?')[0];
            searchParam = `forHandle=@${name}`;
          }

          const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&${searchParam}&key=${apiKey}`);
          
          if (!channelRes.ok) {
            throw new Error(`YouTube API returned ${channelRes.status}: ${channelRes.statusText}`);
          }
          
          const channelData = await channelRes.json();

          if (!channelData.items || channelData.items.length === 0) {
            throw new Error(`Channel not found for URL: ${channelUrl}`);
          }
          channelId = channelData.items[0].id;
          channelTitle = channelData.items[0].snippet.title;
          
          if (channelData.items[0].contentDetails?.relatedPlaylists?.uploads) {
            uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
          }
        }

        if (!uploadsPlaylistId) {
          const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${channelId}&key=${apiKey}`);
          const channelData = await channelRes.json();
          if (!channelData.items || channelData.items.length === 0) {
            throw new Error(`Channel ID ${channelId} could not be verified.`);
          }
          channelTitle = channelData.items[0].snippet.title;
          uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
        }

        console.log(`[YouTube] Channel resolved: YES`);
        console.log(`[YouTube] Channel ID: ${channelId}`);
        console.log(`[YouTube] Channel title: ${channelTitle}`);
        console.log(`[YouTube] Uploads playlist ID: ${uploadsPlaylistId}`);

        const playlistRes = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`);
        const playlistData = await playlistRes.json();

        if (!playlistData.items) {
          throw new Error('No videos found in uploads playlist');
        }

        console.log(`[YouTube] Uploaded videos retrieved: ${playlistData.items.length}`);

        const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');
        const videosRes = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoIds}&key=${apiKey}`);
        const videosData = await videosRes.json();

        if (!videosData.items) {
          throw new Error('Failed to retrieve video details');
        }

        const isLongForm = (duration: string) => duration.includes('H') || duration.includes('M');
        const longFormVideos = videosData.items.filter((item: any) => {
          // Rule 4: Verify channel ownership (video.channelId === verifiedChannelId)
          return item.snippet.channelId === channelId && isLongForm(item.contentDetails.duration);
        });

        console.log(`[YouTube] Long-form videos: ${longFormVideos.length}`);

        longFormVideos.sort((a: any, b: any) => {
          return parseInt(b.statistics.viewCount || '0') - parseInt(a.statistics.viewCount || '0');
        });

        const top5 = longFormVideos.slice(0, 5);
        const top5Titles = top5.map((v: any) => v.snippet.title);
        
        console.log(`[YouTube] Final selected videos: ${top5Titles.join(', ')}`);

        const formattedVideos: YouTubeVideo[] = top5.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          url: `https://www.youtube.com/watch?v=${item.id}`,
          publishedAt: item.snippet.publishedAt,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle
        }));

        setVideos(formattedVideos);
        setLoading(false);

      } catch (err: any) {
        console.log(`[YouTube] Error: ${err.message}`);
        setError('YouTube connection unavailable. Check the YouTube Data API configuration.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
}
