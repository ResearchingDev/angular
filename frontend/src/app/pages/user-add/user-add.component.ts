import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageClientService } from 'src/app/services/Manageclient.service';
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
import { Language } from 'src/app/common/centerlized/language.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  ClientForm!: FormGroup;
  submitted = false;
  href:any;
  public response:any;
  datas:any;
  action: string = 'add';
  button_type: string = 'Save';
  update_id:any;
  Language = Language; 
  constructor(private CommonService: CommonService,private toast: NgToastService,private ManageClientService: ManageClientService,private router: Router) {} 
  ngOnInit(): void {
    this.href = this.router.url;
    var id = this.href.substring(this.href.lastIndexOf('/') + 1); 
    if (id != 'add') {
      this.action='edit';
      this.button_type='Update';
      this.update_id=id;
      this.ManageClientService.getClientDetailById(id).subscribe((response:any)=>{
        this.datas = response[0];
        this.ClientForm.controls['fname'].setValue(this.datas.fname);
        this.ClientForm.controls['lname'].setValue(this.datas.lname);
        this.ClientForm.controls['password'].setValue(this.datas.password);
        this.ClientForm.controls['username'].setValue(this.datas.username);
        this.ClientForm.controls['email'].setValue(this.datas.email);
        this.ClientForm.controls['userrole'].setValue(this.datas.userrole);
        this.ClientForm.controls['address'].setValue(this.datas.address);
      });
    }
    // Initialize the form
    this.ClientForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userrole: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ClientForm.controls;
  }
  onSubmit() {
    if (this.ClientForm.valid) {
      this.submitted=false;
      var url = (this.action == 'add')?'addClient':'editClient';
      this.ClientForm.value.update_id = this.update_id;
      this.ManageClientService[url](this.ClientForm.value).subscribe((data: any) => {
        this.response=data;
        this.toast.success(this.response.message, Language.SUCCESS, 3000);
        // this.router.navigate(['client']);
      },(err: { error: { error: any; }; })=>{
        this.response=err.error.error;
        this.submitted=true;
        if (this.response.detail.includes('email') && this.response.detail.includes('exists') ) {
          // this.toast.success(this.response.message, Language.SUCCESS, 3000);
          var msg = this.CommonService.messageConvertor('Email',Language.ALREADY_EXIST);
          this.toast.danger(msg, Language.ERROR, 3000);
          this.f['email'].setErrors({ 'exist': true });
        }
      });
    }else{
      this.submitted=true;

    }
  }
  showSuccess() {
    this.toast.success('Success Message', 'Title', 3000);
  }

  showError() {
    this.toast.danger('Error Message', 'Error', 3000);
  }

  showInfo() {
    this.toast.info('Info Message', 'Information', 3000);
  }

  showWarning() {
    this.toast.warning('Warning Message', 'Warning', 3000);
  }
}
