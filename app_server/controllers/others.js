/* Получаем (GET) страницу About */
module.exports.about = function(req, res) {
  res.render('index', { title: 'About' });
};