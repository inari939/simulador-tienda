
document.getElementById('formulario').addEventListener('submit', function(event){
event.preventDefault();

let validarUsuario = 'ProgramacionI';
let validarPassword = '123456';

let campoUsuario = document.getElementById('usuario').value;
let campoPassword = document.getElementById('password').value;

if(validarUsuario === campoUsuario && validarPassword === campoPassword){
    localStorage.setItem('logueado','iniciado')
    window.location.href = 'productos.html';
}else{ 
    Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Usuario o contraseña incorrecta!",
        color: "#fdfcfb",
        background: "#000",
        footer: '<a href="#">Olvidé mi contraseña</a>'
      });
    campoUsuario = '';
    campoPassword = '';
}
})