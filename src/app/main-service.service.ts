import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject ,Observable,Subject} from 'rxjs';
import { user, userMainData } from './common.interface';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private userUrl = 'http://test.ultim8e.net/api/clients';
  private dataSubject = new Subject<userMainData[]>();

  private loginUrl = 'http://test.ultim8e.net/api/auth/login';

  mainData!:user[];

  constructor(private http: HttpClient) {
    this.fetchData();
  }
// for getting the data in comp 2
  fetchData() {
    //sending actual data | by removing the message and success status 
    this.http.get<user>(this.userUrl).subscribe((res) => {
      this.dataSubject.next(res.data)
    });
  }

  getData() {
    return this.dataSubject.asObservable();
  }
// comp two 2 here


// login comp" logic  

 login(email: string, password: string): Observable<any> {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    return this.http.post<any>(this.loginUrl, formData);
  }
// login comp" logic end here
}
