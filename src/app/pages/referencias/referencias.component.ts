import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Origen, ReferenciaFamiliar, Viajeros, Viajes } from 'src/app/interfaces/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  public displayCreate: boolean = false;
  public displayEdit: boolean = false;
  public displayShow: boolean = false;
  public referencias: ReferenciaFamiliar[] = [];
  public viajes: Viajes[] = [];
  public viajeros: Viajeros[] = [];
  public referencia!: ReferenciaFamiliar;

  public formCreate = this.fb.group({
    dni: ['', Validators.required],
    codigo_de_viaje: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    dni: ['', Validators.required],
    codigo_de_viaje: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
  })

  public formShow = this.fb.group({
    dni: [{ value: '', disabled: true }, Validators.required],
    codigo_de_viaje: [{ value: '', disabled: true }, Validators.required],
    nombre: [{ value: '', disabled: true }, Validators.required],
    apellido: [{ value: '', disabled: true }, Validators.required],
    direccion: [{ value: '', disabled: true }, Validators.required],
    telefono: [{ value: '', disabled: true }, Validators.required],
  })
  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getViajes();
    this.getViajeros();
    this.getReferencias();
  }
  getViajes() {
    this.mainService.get('viajes').subscribe(res => {
      this.viajes = res.viajes;
    })
  }
  getViajeros() {
    this.mainService.get('viajeros').subscribe(res => {
      this.viajeros = res.viajeros;
    })
  }
  getReferencias() {
    this.mainService.get('refs').subscribe(res => {
      this.referencias = res.referencias;
    })
  }
  handleCreate() {
    this.displayCreate = !this.displayCreate;
  }
  handleEdit(referencia: ReferenciaFamiliar) {
    this.referencia = referencia;
    this.formEdit.patchValue(referencia)
    this.displayEdit = !this.displayEdit;
  }
  handleShow(referencia: ReferenciaFamiliar) {
    this.formShow.patchValue(referencia)
    this.displayShow = !this.displayShow;
  }

  createViaje() {
    const body = {
      ... this.formCreate.value,
      dni: Number(this.formCreate.value.dni.dni),
      codigo_de_viaje: Number(this.formCreate.value.codigo_de_viaje.codigo_de_viaje),
    };
    this.mainService.post("refs", body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      this.getReferencias();
      this.formCreate.reset();
      this.displayCreate = !this.displayCreate;
    });
  }
  updateViaje() {
    const body = {
      ... this.formEdit.value,
      dni: Number(this.formEdit.value.dni.dni),
      codigo_de_viaje: Number(this.formEdit.value.codigo_de_viaje.codigo_de_viaje),
    };
    this.mainService.patch(`refs/${this.referencia.dni_familiar}`, body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      this.getReferencias();
      this.formEdit.reset();
      this.displayEdit = !this.displayEdit;
    });
  }

  confirm(event: Event, idReferencia: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas eliminar esta referencia familiar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.delete(`refs/${idReferencia}`).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Elimiando correctamente' });
          this.getReferencias();
        });

      },
      reject: () => {
      }
    });
  }
}

