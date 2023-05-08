import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  imageUrl:any;
  constructor(private http:HttpClient) {  }

  userPreview(data:any) {
    this.http.post<any>(environment.previewurl, data).subscribe(
      (res) => {
        this.imageUrl = res.imageUrl;       
      });
    }

    userReg(data:any) {
      this.http.post<any>(environment.userRegisterUrl, data).subscribe(
       );
      }
}
