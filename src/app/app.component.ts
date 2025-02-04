import { Component } from '@angular/core';
import { InputFormComponent } from './components/input-form/input-form.component';
import { WorkoutTableComponent } from './components/workout-table/workout-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputFormComponent, WorkoutTableComponent], // ✅ Import Standalone Components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
