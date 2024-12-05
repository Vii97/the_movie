import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  visiblePages() {
    const pages: number[] = [];
    for (let i = Math.max(1, this.currentPage - 2); 
         i <= Math.min(this.totalPages, this.currentPage + 2); i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

}
