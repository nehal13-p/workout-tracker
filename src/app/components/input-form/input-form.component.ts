import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutService, WorkoutEntry } from '../../services/workout.service';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  userName = '';
  workoutType = '';
  workoutMinutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  onSubmit(): void {
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      const newEntry: WorkoutEntry = {
        userName: this.userName,
        workout: {
          type: this.workoutType,
          minutes: this.workoutMinutes
        }
      };
      this.workoutService.addWorkout(newEntry); // ✅ Instantly updates UI

      // Reset form fields
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}
