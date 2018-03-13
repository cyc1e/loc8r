/* Получаем (GET) страницу About */
module.exports.about = function(req, res) {
  res.render('generic-text', { title: 'About' });
};