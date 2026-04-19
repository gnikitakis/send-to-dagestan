import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ToughnessService } from '../../services/toughness';

const MAX_BYTES = 10 * 1024 * 1024;

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
})
export class Upload implements OnDestroy {
  private readonly router = inject(Router);
  private readonly toughness = inject(ToughnessService);

  readonly file = signal<File | null>(this.toughness.uploadedImage());
  readonly previewUrl = signal<string | null>(null);
  readonly isDragging = signal(false);
  readonly error = signal<string | null>(null);
  readonly canContinue = computed(() => this.file() !== null);

  constructor() {
    const existing = this.toughness.uploadedImage();
    if (existing) this.previewUrl.set(URL.createObjectURL(existing));
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) this.acceptFile(file);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.acceptFile(file);
    input.value = '';
  }

  clearFile(): void {
    this.revokePreview();
    this.file.set(null);
    this.previewUrl.set(null);
    this.error.set(null);
    this.toughness.uploadedImage.set(null);
  }

  continue(): void {
    if (!this.canContinue()) return;
    this.router.navigate(['/quiz']);
  }

  private acceptFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      this.error.set('That file is not an image. JPEG or PNG only.');
      return;
    }
    if (file.size > MAX_BYTES) {
      this.error.set('File is too large. Max 10 MB.');
      return;
    }
    this.revokePreview();
    this.file.set(file);
    this.previewUrl.set(URL.createObjectURL(file));
    this.error.set(null);
    this.toughness.uploadedImage.set(file);
  }

  private revokePreview(): void {
    const url = this.previewUrl();
    if (url) URL.revokeObjectURL(url);
  }
}
