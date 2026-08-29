import { useState, useEffect } from "react";
import { getContent, getVideos, getPhotos, type CmsContent, type CmsVideo, type CmsPhoto } from "@/lib/cms";
import { SITE, BIO } from "@/data/site";

export function useCms() {
  const [content, setContent] = useState<CmsContent>({});
  const [videos, setVideos] = useState<CmsVideo[]>([]);
  const [photos, setPhotos] = useState<CmsPhoto[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadCmsData() {
      const c = getContent();
      const v = getVideos();
      const p = await getPhotos();
      
      setContent(c);
      setVideos(v);
      setPhotos(p);
      setLoaded(true);
    }
    
    void loadCmsData();
  }, []);

  // Compute merged site data
  const email = content.email || SITE.email;
  const basedIn = content.basedIn || "Damak, Jhapa, Nepal";
  const bio = content.bio || BIO;
  const instagram = content.socialInstagram || SITE.socials.instagram;
  const tiktok = content.socialTiktok || SITE.socials.tiktok;
  const youtube = content.socialYoutube || SITE.socials.youtubeChannel;
  const featuredVideoEmbedId = content.featuredVideoId 
    ? (content.featuredVideoId.includes("youtube.com") || content.featuredVideoId.includes("youtu.be") 
        ? (content.featuredVideoId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|\&v=))([^#\&\?]{11})/)?.[1] || content.featuredVideoId)
        : content.featuredVideoId)
    : SITE.socials.featuredVideoEmbedId;

  return {
    loaded,
    email,
    basedIn,
    bio,
    instagram,
    tiktok,
    youtube,
    featuredVideoEmbedId,
    videos,
    photos,
  };
}
