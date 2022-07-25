module.exports = {
  index:function(req, res){
    res.render('users/index', {
      title: 'Usuarios' 
    }); 
  },

  myProfile:function(req, res){
    res.render('users/myPerfil', {
      title: 'Mi perfil de usuario'
    });
  },

  editProfile:function(req, res){
    res.render('users/editProfile', {
      title: 'Editar perfil de usuario'
    });
  },

  createUser:function(req, res){
    res.render('users/createUser', {
      title: 'Crear nuevo usuario'
    });
  },

  changePassword:function(req, res){
    res.render('users/changePassword', {
      title: 'Cambiar contraseña'
    });
  }

}
