import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WorkoutEntry {
  userName: string;
  workout: { type: string; minutes: number; };
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'userData';
  private data: WorkoutEntry[] = [];
  
  // Use BehaviorSubject to allow live updates
  private workoutsSubject = new BehaviorSubject<WorkoutEntry[]>([]);
  workouts$ = this.workoutsSubject.asObservable(); // Expose as Observable

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.data = JSON.parse(storedData);
    } else {
      // Initialize with default data
      this.data = [
        { userName: 'John Doe', workout: { type: 'Running', minutes: 30 } },
        { userName: 'Jane Smith', workout: { type: 'Swimming', minutes: 60 } },
        { userName: 'Mike Johnson', workout: { type: 'Yoga', minutes: 50 } }
      ];
    }
    this.workoutsSubject.next(this.data); // Push the initial data
  }

  private saveData(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  addWorkout(entry: WorkoutEntry): void {
    this.data.push(entry);
    this.saveData();
    this.workoutsSubject.next([...this.data]); // ✅ Instantly update subscribers
  }

  getAllWorkouts(): WorkoutEntry[] {
    return [...this.data];
  }
}
