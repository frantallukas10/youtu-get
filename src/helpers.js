const isSpinnerVisible = async page => {
  return await page.evaluate(() => Boolean(document.getElementById('spinner')));
};

const scrollToBottom = async page => {
  await page.evaluate(() => {
    window.scrollTo(
      0,
      document.getElementsByTagName('ytd-app')[0].getBoundingClientRect().height
    );
  });
};

const getData = async page => {
  return await page.evaluate(() => {
    const playlist = [];

    const itemSubString = (item, startIndexOf, endIndexOf) =>
      item.substring(
        item.indexOf(startIndexOf) + startIndexOf.length,
        item.indexOf(endIndexOf)
      );

    document
      .querySelectorAll('div ytd-playlist-video-renderer')
      .forEach((element, index) => {
        playlist.push({
          id: itemSubString(
            document
              .querySelectorAll(
                'div ytd-playlist-video-renderer > #content > a'
              )
              [index].getAttribute('href'),
            '/watch?v=',
            '&list='
          ),
          name: document
            .querySelectorAll(
              'div ytd-playlist-video-renderer #meta #video-title'
            )
            [index].getAttribute('title')
            .replace(/\*/g, '')
            .replace('//', '')
            .replace(/\:|\"|\./g, '')
            .replace(/\//g, '')
            .replace(/_/g, '')
            .trim()
            .replace(/ /g, '_')
        });
      });
    return playlist;
  });
};

module.exports = { isSpinnerVisible, scrollToBottom, getData };
