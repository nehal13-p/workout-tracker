import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, WorkoutEntry } from '../../services/workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-table.component.html',
  styleUrls: ['./workout-table.component.scss']
})
export class WorkoutTableComponent implements OnInit {
  workouts: WorkoutEntry[] = [];
  filteredWorkouts: WorkoutEntry[] = [];
  searchTerm = '';
  selectedWorkoutType = '';
  workoutTypes: string[] = [];
  private subscription!: Subscription; // To track the observable subscription

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.subscription = this.workoutService.workouts$.subscribe(data => {
      this.workouts = data;
      this.extractWorkoutTypes();
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // ✅ Prevent memory leaks
    }
  }

  extractWorkoutTypes(): void {
    const types = new Set(this.workouts.map(item => item.workout.type));
    this.workoutTypes = Array.from(types);
  }

  applyFilters(): void {
    this.filteredWorkouts = this.workouts.filter(item => {
      const matchesName = item.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedWorkoutType ? item.workout.type === this.selectedWorkoutType : true;
      return matchesName && matchesType;
    });
  }
}
