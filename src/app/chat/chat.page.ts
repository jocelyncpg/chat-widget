import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  messages: { text: string; user: boolean }[] = [];
  userInput: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, user: true });
      this.http.post('http://127.0.0.1:8000/bot/chat/', { question: this.userInput })
        .subscribe((response: any) => {
          this.messages.push({ text: response.answer, user: false });
        });
      this.userInput = '';
    }
  }
}
