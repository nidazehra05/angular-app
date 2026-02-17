import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

export interface TableColumn {
  key: string; // property name in data
  label: string; // header label
  sticky?: boolean; // optional sticky column
}

@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './material-table.html',
  styleUrls: ['./material-table.css'],
})
export class MaterialTable implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() pageSize = 10;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(c => c.key).concat(['actions']);
    }
    if (changes['data']) {
      this.dataSource.data = this.data || [];
      if (this.paginator) this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // ensure displayedColumns set if inputs provided later
    if (!this.displayedColumns.length && this.columns.length) {
      this.displayedColumns = this.columns.map(c => c.key).concat(['actions']);
    }
  }

  applyFilter(value: string) {
    this.dataSource.filter = (value || '').trim().toLowerCase();
  }

  onEdit(row: any) { this.edit.emit(row); }
  onDelete(row: any) { this.delete.emit(row); }
  onRowClick(row: any) { this.rowClick.emit(row); }

  getStatusClass(status: string) {
    const s = (status || '').toLowerCase();
    if (s === 'open') return 'status-open';
    if (s === 'done' || s === 'completed') return 'status-done';
    if (s === 'pending') return 'status-pending';
    if (s === 'rejected' || s === 'failed') return 'status-rejected';
    if (s === 'in progress' || s === 'in-progress') return 'status-inprogress';
    return '';
  }
}
