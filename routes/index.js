// require('es6-promise').polyfill();
// require('isomorphic-fetch');
const home = require('./home');
const api = require('./api');
const apiHistrory = require('./apiHistory');
const product = require('./product');
const project = require('./project');
const user = require('./user');
const tag = require('./tag');
const page = require('./page');
const productVersion = require('./productVersion');
const favourite = require('./favourite');
// const log = require('./log');
const multipart = require('connect-multiparty'); // 文件上传模块
const multipartMiddleware = multipart();
const createRestfulApi = (app, model) => {
  const name = model.name;
  console.log('创建接口：' + name);
  app.get(`/${name}`, model.getAll);
  app.get(`/${name}/:id`, model.get);
  app.post(`/${name}`, multipartMiddleware, model.create);
  app.put(`/${name}/:id`, multipartMiddleware, model.update);
  app.delete(`/${name}/:id`, model.del);
};
exports.init = app => {
  app.get('/', home.get);
  // app.post('/', multipartMiddleware, home.send);
  app.post('/api/search', api.search);
  // app.get('/logs/:api', log.getAllByApi);
  // app.get('/logs', log.getAll);
  // api.distinctionFields.forEach(field => app.get(`/api/${field}`, api[field]));
  app.get('/logout', multipartMiddleware, user.logout);
  app.get('/checklogin', user.checklogin);
  app.post('/login', multipartMiddleware, user.login);
  app.get('/pages/:projectId', page.getAllByProjectId);
  app.get('/checkUnique/product/:name', product.getByName);
  app.get('/productPageList/:pageSize/:currPage', product.pageList);
  app.get('/productTotalCount', product.totalCount);
  app.get('/userPageList/:pageSize/:currPage', user.pageList);
  app.get('/userTotalCount', user.totalCount);
  app.get('/tagPageList/:pageSize/:currPage', tag.pageList);
  app.get('/tagTotalCount', tag.totalCount);
  app.get('/checkUnique/user/:name', user.getByName);
  app.get('/checkUnique/uemail/:name', user.getByEmail);
  app.get('/checkUnique/tag/:name', tag.getByName);
  app.get('/checkUnique/version/:name', productVersion.getByNameAndProductId);
  app.get('/apis/:projectId', api.getAllByProjectId);
  app.get('/versions/:productId', productVersion.getAllByProductId);
  app.get('/apiHistory/:apiId', apiHistrory.findByApiId);

  // app.post('/logout', multipartMiddleware, user.logout);
  // app.get('/favourite/clean', favourite.clean);
  createRestfulApi(app, api);
  // createRestfulApi(app, log);
  createRestfulApi(app, product);
  createRestfulApi(app, project);
  createRestfulApi(app, user);
  createRestfulApi(app, tag);
  createRestfulApi(app, page);
  createRestfulApi(app, productVersion);
  createRestfulApi(app, favourite);
};
