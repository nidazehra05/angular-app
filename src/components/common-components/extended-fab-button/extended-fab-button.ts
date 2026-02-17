import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-extended-fab-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './extended-fab-button.html',
  styleUrls: ['./extended-fab-button.css'],
})
export class ExtendedFabButton {
  @Input() icon = 'add';
  @Input() label = 'Add';
  @Input() color: 'primary' | 'accent' | 'warn' | '' = 'primary';
  @Input() mini = false;
  @Output() click = new EventEmitter<void>();

  onClick(ev: MouseEvent) {
    ev.stopPropagation();
    this.click.emit();
  }
}
