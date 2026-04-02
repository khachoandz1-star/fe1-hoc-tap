import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangeDetectorRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-productadd',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './productadd.html',
  styleUrl: './productadd.css',
})
export class Productadd {
  productform = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(1000)])
  })
  message = inject(NzMessageService);
  route = inject(ActivatedRoute);
  router = inject(Router); 
  changdt = inject(ChangeDetectorRef);
  http = inject(HttpClient)
  onSubmit = () => {
    const productData = this.productform.value;

    this.http.post(`http://localhost:3000/products`, productData).subscribe({
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