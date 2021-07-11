import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import contact from '../../assets/text/contact.json'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formGroup;
  text;
  concern;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.text=contact;
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required], 
        email: ['', Validators.required],
        concern: ['', Validators.required],
        message: ['', Validators.required],
        terms: [false, Validators.required]
      });

      
     
  }

  ngOnInit(): void {
    this.concern=this.route.snapshot.queryParamMap.get('concern');
    this.formGroup.controls.concern.setValue(this.concern);
  }

  onSubmit(value) {
    if(value.terms==true) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.http.post<any>('https://submit-form.com/JR2hmhGc', JSON.stringify(value), {headers: headers}).subscribe(data => {
      });
      this.router.navigate(["thanks"])
    }
    
  }

}
