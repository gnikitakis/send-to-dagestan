import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ImageAnalysis as ImageAnalysisModel } from '../models/image-analysis.model';

@Injectable({
  providedIn: 'root',
})
export class ImageAnalysisService {
  private readonly http = inject(HttpClient);

  analyze(image: File): Observable<ImageAnalysisModel> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<ImageAnalysisModel>(
      `${environment.backendUrl}/analyze`,
      formData,
    );
  }
}
