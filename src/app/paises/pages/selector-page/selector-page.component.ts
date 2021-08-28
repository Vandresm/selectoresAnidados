import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { Paises } from '../../interfaces/paises';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  
  regiones: string[]=[];
  paises: Paises[] = [];

  miFormulario: FormGroup = this.fb.group ({
    region: ['' , Validators.required],
    pais: ['' , Validators.required],
  })

  constructor(private fb: FormBuilder,
              private pS: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.pS.regiones;
    this.miFormulario.get('region')?.valueChanges.
         subscribe(
           region => {
             this.pS.getPaisesPorRegion(region).subscribe(
               paises => {
                this.paises = paises;
                //console.log(paises);
               }
             )
           }
         )
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}
