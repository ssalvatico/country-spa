import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styles: `
    :host {
      display: block;
    }

    .pagination .page-link {
      background: transparent;
      color: var(--accent);
      border: 1px solid var(--rule);
      border-radius: 0;
      font-family: var(--font-heading);
      min-width: 2.5rem;
      text-align: center;
    }

    .pagination .page-link:hover {
      background: rgba(122, 62, 18, 0.08);
      color: var(--accent-dark);
    }

    .pagination .page-link:focus {
      box-shadow: 0 0 0 2px var(--highlight);
    }

    .pagination .page-item.active .page-link {
      background: var(--highlight);
      border-color: var(--accent-dark);
      color: var(--ink);
      font-weight: bold;
    }

    .pagination .page-item.disabled .page-link {
      color: var(--ink-faded);
      opacity: 0.6;
    }

    .page-info {
      color: var(--ink-soft);
      font-style: italic;
    }
  `,
})
export class PaginationComponent {

  // Total de resultados (data.meta.total de la API)
  @Input()
  public total: number = 0;

  // Resultados por página
  @Input()
  public pageSize: number = 30;

  // Página actual, empezando en 1
  @Input()
  public currentPage: number = 1;

  // Emite el número de la página a la que se quiere ir
  @Output()
  public pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  // Muestra hasta 5 números de página alrededor de la actual
  get pages(): number[] {
    const windowSize = 5;
    const last = this.totalPages;
    let end = Math.min(last, this.currentPage + 2);
    let start = Math.max(1, end - windowSize + 1);
    end = Math.min(last, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  go(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }
}
