import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //A variável creds é responsável por armazenar as informações digitadas no input do formulário
  creds: Credenciais = {
    email: '',
    senha: ''
  }


  //Valida o email e senha
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  // logar() {
  //   this.service.authenticate(this.creds).subscribe(resposta => {
  //     this.toast.info(resposta.headers.get('Authorization'))
  //   })
  // }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
