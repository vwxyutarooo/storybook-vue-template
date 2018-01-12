export function parser(html, callback) {
  const templates = html.split(/<\/template>[\n|\s]*/g);
  templates.forEach((item) => {
    const hasName = item.match(/name=["|']([a-zA-Z0-9]+)["|']/);

    if (!hasName) { return; }

    const template = item.replace(/<template\sname=["|']([a-zA-Z0-9]+)["|']>/g, '');

    callback(hasName[1], template);
  });
}


export function camelToSnake(str) {
  const key = /(?:^|\.?)([A-Z])/g;

  return str.replace(key, (x, y) => {
    return '-' + y.toLowerCase(); }
  ).replace(/^-/, '');
}

