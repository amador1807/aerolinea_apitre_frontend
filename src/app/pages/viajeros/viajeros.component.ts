import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Viajeros } from 'src/app/interfaces/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-viajeros',
  templateUrl: './viajeros.component.html',
  styleUrls: ['./viajeros.component.css']
})
export class ViajerosComponent implements OnInit {
  public displayCreate: boolean = false;
  public displayEdit: boolean = false;
  public viajeros: Viajeros[] = []
  public viajero!: Viajeros;

  public formCreate = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mainService: MainService) { }
  ngOnInit(): void {
    this.getViajeros();
  }
  getViajeros() {
    this.mainService.get("viajeros").subscribe(res => {
      this.viajeros = res.viajeros
      console.log(res.viajeros);

    });
  }
  updateViajero() {
    this.mainService.patch(`viajeros/${this.viajero.dni}`, this.formEdit.value).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      this.getViajeros();
      this.displayEdit = !this.displayEdit;
    });
  }
  createViajero() {
    this.mainService.post("viajeros", this.formCreate.value).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      this.getViajeros();
      this.formCreate.reset();
      this.displayCreate = !this.displayCreate;
    });
  }
  handleCreate() {
    this.displayCreate = !this.displayCreate;
  }
  handleEdit(viajero: any) {
    this.viajero = viajero;
    this.formEdit.patchValue(viajero);
    this.displayEdit = !this.displayEdit;
  }

  confirm(event: Event, idViajero: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas eliminar este viajero?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.delete(`viajeros/${idViajero}`).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Elimiando correctamente' });
          this.getViajeros();
        });
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
