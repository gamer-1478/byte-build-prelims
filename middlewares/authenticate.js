export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else res.redirect('/auth/login');
  }

  export function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    else res.redirect('/dashboard');      
  }

export function ensureAdminAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) res.redirect('/auth/login')
  if(!req.user.admin) res.send("Unauthorized")
  else return next()
}
