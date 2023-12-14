import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailServiceService {
  private emailValue: string = '';

  setEmailValue(email: string) {
    this.emailValue = email;
  }

  getEmailValue() {
    const emailValue = this.emailValue; // o cualquier lógica que tengas aquí
    console.log('Valor de email en getEmailValue:', emailValue);
    return emailValue;
  }
}
