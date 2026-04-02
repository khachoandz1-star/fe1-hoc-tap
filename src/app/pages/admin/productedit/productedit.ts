import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../interface/product';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-productedit',
  imports: [ReactiveFormsModule,NzFormModule,NzInputModule,NzButtonModule],
  templateUrl: './productedit.html',
  styleUrl: './productedit.css',
})
export class Productedit {
   productform=new FormGroup({
    name:new FormControl('',Validators.required),
    image:new FormControl(''),
    price:new FormControl(0,[Validators.required,Validators.min(1000)])
})
  message = inject(NzMessageService);
  route = inject(ActivatedRoute);
  router = inject(Router); 
  changdt = inject(ChangeDetectorRef);
  http = inject(HttpClient)
 id = this.route.snapshot.params['id']
 
 ngOnInit(){
    this.http.get<IProduct>(`http://localhost:3000/products/${this.id}`).subscribe({
      next:(data)=>{
        this.productform.setValue(data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
   
  }

  onSubmit = () => {
    const productData = this.productform.value;

    this.http.post('http://localhost:3000/products', productData).subscribe({
      next: (data) => {
        console.log(data);
        this.message.success("Thêm mới thành công");


        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.log(err);
        this.message.error("Thêm mới thất bại");
      }
    });
  }
}
