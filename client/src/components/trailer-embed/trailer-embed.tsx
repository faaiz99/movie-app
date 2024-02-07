import { convertShortLinkToEmbedLink } from "../../utils/youtube-link-converter";
type TrailerEmbedProps = {
  link: string;
  title: string;
};

export const TrailerEmbed = ({ link, title }: TrailerEmbedProps) => {
  return (
    <iframe
      // width="853"
      // height="480"
      className="h-[65vh] w-full bg-gray-50 px-5 py-5 dark:bg-gray-900 lg:w-6/12"
      loading="lazy"
      src={convertShortLinkToEmbedLink(link)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  );
};
