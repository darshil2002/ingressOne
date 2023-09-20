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
  private authToken;
  private loginUrl = 'http://test.ultim8e.net/api/auth/login';

  mainData!:user[];

  constructor(private http: HttpClient) {
    this.fetchData();
    this.authToken = localStorage.getItem('authToken');
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

// post method 
postEmployee(data:any):Observable<any>{
  // this.getNewArray()
  let myTempDate='1993-09-20'
  const formData = new FormData();

  // Append key-value pairs for each field in your data
  formData.append('name', data.name);
  formData.append('last_name', data.last_name);
  formData.append('address', data.address);
  formData.append('birth_date', myTempDate);
  formData.append('education', data.education);
  formData.append('email', data.email);
  formData.append('phone', data.phone);

  if(this.authToken){
    formData.append('token', this.authToken);
  }
  console.log('whole form '+ formData)
  return this.http.post(this.userUrl,formData);
}
updateData(){
 
  this.fetchData()
}
// post method finish
}
