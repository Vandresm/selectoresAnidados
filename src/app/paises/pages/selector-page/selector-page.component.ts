import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from "rxjs/operators";

import { PaisesService } from '../../services/paises.service';
import { Paises, PaisC } from '../../interfaces/paises';
import { of } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  
  regiones: string[]=[];
  paises: Paises[] = [];
  paisCod!: PaisC ;
  fronteras: Paises[] = [];
  cargando: boolean = false;

  miFormulario: FormGroup = this.fb.group ({
    region: ['' , Validators.required],
    pais: ['' , Validators.required],
    frontera: ['' , Validators.required],
  })

  constructor(private fb: FormBuilder,
              private pS: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.pS.regiones;
    console.log(this.miFormulario.controls.region.patchValue)
    // this.miFormulario.get('region')?.valueChanges.
    //      subscribe(
    //        region => {         
    //          this.pS.getPaisesPorRegion(region).subscribe(
    //            paises => {
    //             this.paises = paises;
    //             //console.log(paises);
    //            }
    //          )
    //        }
    //      )
    
    this.miFormulario.get('region')?.valueChanges.
        pipe(
          tap( (_) =>{ 
                    this.miFormulario.get('pais')?.reset('');
                    this.cargando = true;
                    this.paises = [];
                  }),
          switchMap(region => 
            this.miFormulario.controls.region.valid ? this.pS.getPaisesPorRegion(region) : of(null)  )
        )
        .subscribe(paises => {
          if (paises) {
            this.paises = paises;
            this.cargando = false;  
          }          
        })

       
       
          this.miFormulario.get('pais')?.valueChanges.pipe(
            tap(() => { 
                  this.miFormulario.get('frontera')?.reset('');
                  this.cargando = true;
                  this.fronteras = [];
                }),
            switchMap(
              codigo =>  this.miFormulario.controls.pais.valid ?  this.pS.getPaisPorCodigo(codigo) : of(null)
            ),
            switchMap(
              pais => this.pS.getPaisesPorCodigos(pais?.borders!)
            )
          )
          .subscribe(paises=>{
            console.log(paises);
            this.fronteras = paises;
            this.cargando = false;
          });  
           
        
      
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}
