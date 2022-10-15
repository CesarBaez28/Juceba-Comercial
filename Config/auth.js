module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/authentication/login');
  },

  isNotLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }
    return res.redirect('/menuPrincipal');
  }
};