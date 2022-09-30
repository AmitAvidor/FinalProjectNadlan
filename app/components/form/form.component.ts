import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from 'src/app/services/buildings/building.service';

@Component({
  selector: 'appform',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  dataForm!: FormGroup;
  res!: string;
  constructor(private buildingService: BuildingService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dataForm = new FormGroup({
      building_floors: new FormControl('', Validators.required),
      building_year: new FormControl('', Validators.required),
      room_num: new FormControl('', Validators.required),
      floor_num: new FormControl('', Validators.required),
    });
  }

  get building_floors() {
    return this.dataForm.get('building_floors');
  }

  get building_year() {
    return this.dataForm.get('building_year');
  }

  get room_num() {
    return this.dataForm.get('room_num');
  }

  get floor_num() {
    return this.dataForm.get('floor_num');
  }

  submit() {
    var building_floors = this.dataForm.get('building_floors')?.value;
    var building_year = this.dataForm.get('building_year')?.value;
    var room_num = this.dataForm.get('room_num')?.value;
    var floor_num = this.dataForm.get('floor_num')?.value;
    this.buildingService
      .getPrice(building_floors, building_year, room_num, floor_num)
      .subscribe(
        (result) => {
          this.res = result;
        },
        (err) => {
          this.res = err.error;
        }
      );
  }
}
