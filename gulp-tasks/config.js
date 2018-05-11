const truePath = 'dist/'
const path = {
  templates: "src/templates/",
  data: "src/templates/data/",
  styles: "styles/",
  scripts: "src/scripts/",
  img: "img/",
  svgSprite: "src/images/svg-sprite/",
  svgPicture: "src/images/svg-picture/",
  fonts: "src/fonts/",
  dist: {
    pages: `./`,
    styles: `${truePath}/styles`,
    scripts: `${truePath}/scripts/`,
    img: `${truePath}/img/`,
    svgSprite: `${truePath}/images/svg-sprite/`,
    sprite: `${truePath}/images/sprite/`,
    fonts: `${truePath}/fonts`
  }
};

const server = {
  server: {
    baseDir: path.dist.pages
  },
  files: [
    `${path.dist.styles}**/*.css`,
    `${path.dist.scripts}**/*.js`,
    `${path.dist.fonts}**/*`,
    `${path.dist.images}**/*`,
    `${path.dist.pages}**/*.html`,
  ],
  port: 3005,
  open: false,
  notify: false
}

module.exports = {
  path: path,
  server: server
};
