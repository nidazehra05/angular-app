import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ExtendedFabButton } from '../common-components/extended-fab-button/extended-fab-button';
import { MaterialTable } from '../common-components/material-table/material-table';

@Component({
  selector: 'app-my-tasks',
  imports: [CommonModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, ExtendedFabButton, MaterialTable],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks {
  tasks: { title: string; assignee: string; status: string }[] = [
    { title: 'Review PR #42', assignee: 'Alice', status: 'Open' },
    { title: 'Prepare demo slides', assignee: 'Bob', status: 'In Progress' },
    { title: 'Fix login bug', assignee: 'Carol', status: 'Done' },
    { title: 'Fix logout bug', assignee: 'Nida', status: 'Rejected' },
    { title: 'Fix menu bug', assignee: 'John', status: 'Pending' },
    { title: 'Review PR #421', assignee: 'Alice', status: 'Open' },
    { title: 'Prepare demo slides1', assignee: 'Bob', status: 'In Progress' },
    { title: 'Fix login bug1', assignee: 'Carol', status: 'Done' },
    { title: 'Fix logout bug1', assignee: 'Nida', status: 'Rejected' },
    { title: 'Fix menu bug1', assignee: 'John', status: 'Pending' },
  ];

  constructor() {}

  tableColumns = [
    { key: 'title', label: 'Task' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'status', label: 'Status' },
  ];

  edit(index: number) {
    console.log('Edit task', index, this.tasks[index]);
  }

  remove(index: number) {
    this.tasks.splice(index, 1);
  }

  getStatusClass(status: string) {
    const s = (status || '').toLowerCase();
    if (s === 'open') return 'status-open';
    if (s === 'done') return 'status-done';
    if (s === 'pending') return 'status-pending';
    if (s === 'rejected') return 'status-rejected';
    if (s === 'in progress' || s === 'in-progress') return 'status-inprogress';
    return '';
  }

  addTask() {
    const title = prompt('Enter task title');
    if (!title) return;
    this.tasks.unshift({ title: title.trim(), assignee: 'Unassigned', status: 'Open' });
  }

  onTableEdit(row: any) {
    const idx = this.tasks.indexOf(row);
    this.edit(idx);
  }

  onTableDelete(row: any) {
    const idx = this.tasks.indexOf(row);
    if (idx >= 0) this.remove(idx);
  }

  onRowClick(row: any) {
    console.log('row clicked', row);
  }
}
