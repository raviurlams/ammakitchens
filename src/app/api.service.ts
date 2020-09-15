import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
declare var TeleSignSDK: any;
export class Student {
  id: string;
  name: string;
  email: string;
  dob: number;
  fees: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpHeader = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT', 'Content-Type': 'application/json', "Accept": 'application/json', "Access-Control-Allow-Origin": "*" })
  };



  constructor(private http: HttpClient) { }

  sentOTP(phNumber, msg) {

  }
  addStudent(student: Student): Observable<any> {
    return this.http.post<Student>('api-goes-here/', student, this.httpHeader)
      .pipe(
        catchError(this.handleError<Student>('Add Student'))
      );
  }

  getStudent(id): Observable<Student[]> {
    return this.http.get<Student[]>('api-goes-here/' + id)
      .pipe(
        tap(_ => console.log(`Student fetched: ${id}`)),
        catchError(this.handleError<Student[]>(`Get student id=${id}`))
      );
  }

  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>('api-goes-here/')
      .pipe(
        tap(Student => console.log('Student fetched!')),
        catchError(this.handleError<Student[]>('Get student', []))
      );
  }

  updateStudent(id, student: Student): Observable<any> {
    return this.http.put('api-goes-here/' + id, student, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Student updated: ${id}`)),
        catchError(this.handleError<Student[]>('Update student'))
      );
  }

  deleteStudent(id): Observable<Student[]> {
    return this.http.delete<Student[]>('api-goes-here/' + id, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Student deleted: ${id}`)),
        catchError(this.handleError<Student[]>('Delete student'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
