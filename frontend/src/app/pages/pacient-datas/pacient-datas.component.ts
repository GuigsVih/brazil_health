import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeService } from '../../services/me.service';
import { PacientService } from '../../services/pacient.service';

@Component({
  selector: 'app-pacient-datas',
  templateUrl: './pacient-datas.component.html',
  styleUrls: ['./pacient-datas.component.scss'],
})
export class PacientDatasComponent implements OnInit {

  user: any = {};
  form: FormGroup;
  cep: any;
  id: any;
  updateLoading: boolean;
  photo: any;
  photoName: any;

  constructor(
    private service: MeService,
    private fb: FormBuilder,
    private pacientService: PacientService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.createForm();
    this.service.getCurrentUser()
      .subscribe((user: any) => {
        this.user = user;
        this.id = user.id;
        this.createForm();
        this.ref.detectChanges();
      }
      );
  }

  createForm() {
    this.form = this.fb.group(
      {
        name: [this.user.name, Validators.required],
        lastname: [this.user.lastname, Validators.required],
        password: [this.user.password],
        email: [this.user.email, Validators.required],
        cpf: [this.user.cpf],
        cep: [this.user.cep],
        public_place: [this.user.public_place],
        neighborhood: [this.user.neighborhood],
        city: [this.user.city],
        state: [this.user.state],
        number: [this.user.number]
      }
    );
  }

  onSubmit() {
    this.updateLoading = true;
    const controls = this.form.controls;
    if (this.form.invalid) {
      return;
    }

    const data = this.prepareForm(controls);
    this.pacientService.updateData(data, this.id)
      .subscribe(res => {
        this.updateLoading = false;
        location.href = "/";
      }, err => {
        this.updateLoading = false;
        alert('Erro ao atualizar dados')
      }
      );
  }

  prepareForm(controls) {
    return {
      name: controls['name'].value,
      lastname: controls['lastname'].value,
      password: controls['password'].value,
      email: controls['email'].value,
      cpf: controls['cpf'].value,
      cep: controls['cep'].value,
      public_place: controls['public_place'].value,
      city: controls['city'].value,
      state: controls['state'].value,
      neighborhood: controls['neighborhood'].value,
      number: controls['number'].value,
      file: this.photo ? this.photo[0] : null,
      file_name: this.photoName ? this.photoName[0] : null
    }
  }
  getCEP(event) {
    if (this.cep.length == 8) {
      this.pacientService.getAddress(this.cep)
        .subscribe((res: any) => {
          this.form.get('city').patchValue(res.localidade);
          this.form.get('public_place').patchValue(res.logradouro);
          this.form.get('neighborhood').patchValue(res.bairro);
          this.form.get('state').patchValue(res.uf);
        })
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
