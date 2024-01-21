export function convertShortLinkToEmbedLink(shortLink: string) {
  const videoId = shortLink.split("https://www.youtube.com/watch?v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}
