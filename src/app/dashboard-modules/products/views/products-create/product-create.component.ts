import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { ProductsService } from '../../services/products.service';
import { ICreateUpdateProduct, ICreateProductRes, IGetProductRes, IProduct } from '../../interfaces/IProductSchema';

@Component({
    selector: 'app-product-create',
    standalone: true,
    imports: [PrimeNgModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css'],
    providers: [MessageService]
})
export class ProductCreateComponent implements OnInit {
    newProductForm: FormGroup; // Formulario de creación de Producto

    productId: string = ''; // Identificador del Producto
    productName: string = ''; // Nombre del Producto
    productDate: Date = new Date(); // Fecha de creación del Producto
    isEdit: boolean = false; // Indica si se trata de una edición

    docTypeOptions = [{ label: 'C.C', value: 'CC' }]; // Tipos de Documento

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private _products: ProductsService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.newProductForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            price: [0, Validators.required],
            stock: [0, Validators.required]
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id == '0') {
                this.isEdit = false;
                this.newProductForm.reset();
                return;
            }
            if (id) {
                this.productId = id;
                this.loadProductData(id);
            }
        });
    }

    loadProductData(id: string) {
        this._products.getProductById(id).subscribe({
            next: (res: IGetProductRes) => {
                if (!res.success) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el Producto' });
                    this.isEdit = false;
                    return;
                }

                this.productName = res.data.name;
                this.productDate = res.data.createdAt;
                this.isEdit = true;
                this.newProductForm.patchValue({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    stock: res.data.stock
                });

                this.newProductForm.controls['documentType'].disable();
                this.newProductForm.controls['productDoc'].disable();
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el Producto' });
                console.error(err);
            }
        });
    }


    createProduct() {
        this._products.createProduct(this.newProductForm.value).subscribe({
            next: (response: ICreateProductRes) => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto creado correctamente' });
                    this.newProductForm.reset();
                    return;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al crear el Producto'
                    });
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    updateProduct() {
        this._products.updateProduct(this.productId, this.newProductForm.value).subscribe({
            next: (response: ICreateProductRes) => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado correctamente' });
                    return;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al actualizar el Producto'
                    });
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
