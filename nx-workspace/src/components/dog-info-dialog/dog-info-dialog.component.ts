import { Component, Inject } from '@angular/core';
import { Breed } from '../../models/dog.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dog-info-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dog-info-dialog.component.html',
  styleUrl: './dog-info-dialog.component.css'
})
export class DogInfoDialogComponent {

  public constructor(@Inject(MAT_DIALOG_DATA) public data: Breed) { }

}
