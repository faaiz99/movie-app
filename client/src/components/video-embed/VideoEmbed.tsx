import { convertShortLinkToEmbedLink } from "../../utils/youtubeLinkConverter";

type VideoEmbedProps = {
  youtubeTrailerLink: string;
  movieTitle: string;
};

export const VideoEmbed = ({
  youtubeTrailerLink,
  movieTitle,
}: VideoEmbedProps) => {
  return (
    <div>
      <iframe
        // width="853"
        // height="480"
        loading="lazy"
        src={convertShortLinkToEmbedLink(youtubeTrailerLink)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={movieTitle}
      />
    </div>
  );
};
