import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  role: string;
  form: FormGroup
  photo: any;
  photoName: any;
  submitted: boolean;
  loading: boolean = true;
  registerLoading: boolean;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role');
    this.createForm();
    this.loading = false;
  }

  createForm() {
    this.form = this.fb.group(
      {
        role: this.role,
        name: [null, Validators.required],
        lastname: [null, Validators.required],
        password: [null, Validators.required],
        email: new FormControl(null, [Validators.required, Validators.email]),
        file: this.photo,
        file_name: this.photoName
      }
    )
  }

  get f() {return this.form.controls}
  onSubmit() {
    this.registerLoading = true;
    this.submitted = true;    
    if (this.form.invalid) {
      this.registerLoading = false;
      return;
    }

    const data = this.prepareRegister(this.form.controls);
    this.service.register(data)
      .subscribe(res => {
        this.registerLoading = false;
      }, err => {
        this.error = err.error;
        this.registerLoading = false;
      })
  } 

  prepareRegister(controls) {
    return {
      name: controls['name'].value,
      lastname: controls['lastname'].value,
      email: controls['email'].value,
      password: controls['password'].value,
      role: controls['role'].value,
      file: this.photo[0],
      file_name: this.photoName[0]

    }
  }

	getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsBinaryString(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	onSelect(event) {
		const selectedFiles = <FileList>event.srcElement.files;
		const files = [];
		const names = [];
		for (let i = 0; i < selectedFiles.length; i++) {
			names.push(selectedFiles[i].name);
			this.getBase64(selectedFiles[i]).then(
				(data: string) => files.push(btoa(data))
			);
		}
    this.photo = files;    
    this.photoName = names;
    
    document.getElementById('fileLabel').innerText = this.photoName;
	}

}
