function toggleMenu() {
  var opcoesMenu = document.getElementById("opcoes-menu");
  if (opcoesMenu.style.display === "none" || opcoesMenu.style.display === "") {
    opcoesMenu.style.display = "block";
  } else {
    opcoesMenu.style.display = "none";
  }
}

function mask(o, f) {
  setTimeout(function () {
    var v = mtel(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mtel(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

function mcel(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

document.addEventListener("DOMContentLoaded", function () {
  var eye = document.getElementById("eye");
  var eyeSlash = document.getElementById("eyeSlash");
  var Senha = document.getElementById("Senha");

  Senha.type = "password";

  document
    .getElementById("togglePassword")
    .addEventListener("click", function () {
      if (Senha.type === "password") {
        Senha.type = "text";
        eye.style.display = "none";
        eyeSlash.style.display = "inline-block";
      } else {
        Senha.type = "password";
        eye.style.display = "inline-block";
        eyeSlash.style.display = "none";
      }
    });
});

/*
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnCab').addEventListener('click', function() {
        var barraLateral = document.getElementById('form-menu');
        barraLateral.classList.toggle('reduzida');
    });
});
*/

document.addEventListener("DOMContentLoaded", function () {
  var btnCancelar = document.querySelector(".btnCancelar");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", function () {
      location.reload();
    });
  }
});

function NovoCadastro() {
  const Principal = document.getElementById("TelaPrincipal");
  const Complementar = document.getElementById("TelaComp");
  const Botao = document.getElementById("btnNovoCad");

  if (Principal.style.display !== "none") {
    Principal.style.display = "none";
    Complementar.style.display = "block";
    Botao.style.display = "none";
  } else {
    Complementar.style.display = "none";
    Principal.style.display = "block";

    if (Formulario.style.display === "block") {
      Botao.style.display = "none";
    } else {
      Botao.style.display = "block";
    }
  }
}
