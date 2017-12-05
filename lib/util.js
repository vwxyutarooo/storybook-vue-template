export function parseStoryTemplate (html, callback) {
  const templates = html.split(/<\/template>[\n]+/g);
  templates.forEach((item) => {
    const hasName = item.match(/name="([a-zA-Z]+)"/);

    if (!hasName) return;

    const template = item.replace(/<template.*>|<\/template>/g, '').replace(/^[ ]{2}/gm, '');

    callback(hasName[1], template);
  });
}


export function camelToSnake(str) {
  const key = /(?:^|\.?)([A-Z])/g;

  return str.replace(key, (x, y) => {
    return '-' + y.toLowerCase(); }
  ).replace(/^-/, '');
}

