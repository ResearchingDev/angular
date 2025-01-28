import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerolesService } from 'src/app/services/manageroles.service';
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
import { Language } from 'src/app/common/centerlized/language.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent {
  UserRoleForm!: FormGroup;
  submitted = false;
  href:any;
  public response:any;
  datas:any;
  action: string = 'add';
  button_type: string = 'Save';
  update_id:any;
  Language = Language; 
  userRole:any;
  constructor(private CommonService: CommonService,private toast: NgToastService,private ManagerolesService: ManagerolesService,private router: Router) {} 
  ngOnInit(): void {
    this.href = this.router.url;
    var id = this.href.substring(this.href.lastIndexOf('/') + 1); 
    if (id != 'add') {
      this.action='edit';
      this.button_type='Update';
      this.update_id=id;
      this.ManagerolesService.getRoleDetailById(id).subscribe((response:any)=>{
        this.datas = response.data.getUserRoleById;
        this.UserRoleForm.controls['vUserRole'].setValue(this.datas.vUserRole);
        this.UserRoleForm.controls['eStatus'].setValue(this.datas.eStatus);
      });
    }
    // Initialize the form
    this.UserRoleForm = new FormGroup({
      vUserRole: new FormControl('', [Validators.required]),
      eStatus: new FormControl('', [Validators.required]), 
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.UserRoleForm.controls;
  }
  onSubmit() {
    if (this.UserRoleForm.valid) {
      this.submitted=false;
      var url = (this.action == 'add')?'addRole':'editRole';
      this.UserRoleForm.value.update_id = this.update_id;
      this.ManagerolesService[url](this.UserRoleForm.value).subscribe((data: any) => {
        this.response=data;
        this.toast.success(this.response.message, Language.SUCCESS, 3000);
        this.router.navigate(['role/manage']);
      },(err: { error: {
        errors(errors: any): unknown; error: Array<{ msg: string }>  
      }; })=>{
        this.submitted=true;
        if(err.error.errors){
          this.response=err.error.errors[0];
          this.toast.danger(err.error.errors[0].msg, Language.ERROR, 3000);
          this.f[err.error.errors[0].path].setErrors({ 'incorrect': true });
        }else{
          this.response=err.error.error;
          var msg = this.CommonService.messageConvertor('Email',Language.ALREADY_EXIST,"{TYPE}");
          this.toast.danger(msg, Language.ERROR, 3000);
          this.f['email'].setErrors({ 'exist': true });
        }
      });
    }else{
      this.submitted=true;
      return;
    }
  }
}
