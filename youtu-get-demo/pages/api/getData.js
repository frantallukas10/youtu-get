import { getYoutubeInfo, isValidId } from 'youtu-get';

module.exports = async (req, res) => {
  const youtubeId = req.query.youtubeId;
  if (!isValidId(youtubeId)) {
    const data = await getYoutubeInfo(youtubeId);
    res.send(data);
  } else {
    res.status(404).end(`Youtube id: ${youtubeId} is not valid`);
  }
};
