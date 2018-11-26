import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkoutsApiService } from '../services/workouts-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workouts = [];
  public loading = false;

  constructor(private api: WorkoutsApiService) { }

  ngOnInit() {
    this.loading = true;
    this.api.getWorkouts().subscribe(data => {
        this.workouts = data;
        this.loading = false;
    });
  }

  deleteWorkout(id, deleteModal) {
    // Removes the { id: id } object  from the this.workouts array.
    // See https://lodash.com/
    this.api.deleteWorkout(id).subscribe(data => _.remove(this.workouts, { id: id }));
  }

}