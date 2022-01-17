import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import contact from '../../assets/text/contact.json'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formGroup;
  text;
  package;
  concern;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.text=contact;
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required], 
        email: ['', Validators.required],
        package: ['', Validators.required],
        concern: ['', Validators.required],
        message: ['', Validators.required],
        terms: [false, Validators.required]
      });

      
     
  }

  ngOnInit(): void {
    this.package=this.route.snapshot.queryParamMap.get('package');
    this.concern=this.route.snapshot.queryParamMap.get('concern');
    this.formGroup.controls.concern.setValue(this.concern);
    this.formGroup.controls.package.setValue(this.package);
  }

  onSubmit(value) {
    /*if(value.terms==true && this.formGroup.valid) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.http.post<any>('https://submit-form.com/JR2hmhGc', JSON.stringify(value), {headers: headers}).subscribe(data => {
      });
      this.router.navigate(["thanks"])
    }*/
    console.log("submit form")
    this.submitFeedback(value)
    this.router.navigate(["thanks"])
  }

  submitFeedback(value): Observable<any> {
    const entry = new HttpParams({ fromObject: {
      'form-name': 'contactFormNetlify',
      ...value,
    }});

    return this.submitEntry(entry);
  }

  private submitEntry(entry: HttpParams): Observable<any> {
    return this.http.post(
      '/',
      entry.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'text'
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';

    if (err.error instanceof ErrorEvent) {
      errMsg = `A client-side error occurred: ${err.error.message}`;
    } else {
      errMsg = `A server-side error occurred. Code: ${err.status}. Message: ${err.message}`;
    }

    console.log(errMsg);
  }

}
