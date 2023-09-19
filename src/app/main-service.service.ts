import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject ,Subject} from 'rxjs';
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

  fetchData() {
    //sending actual data | by removing the message and success status 
    this.http.get<user>(this.userUrl).subscribe((res) => {
      this.dataSubject.next(res.data)
    });
  }

  getData() {
    return this.dataSubject.asObservable();
  }

}
