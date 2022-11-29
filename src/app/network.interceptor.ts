import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './services/Loading/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) { }

  totalRequests = 0;
  completedRequests = 0;


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    this.totalRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;
        if (this.completedRequests == this.totalRequests) {
          this.loader.hide();
          this.totalRequests = 0;
          this.completedRequests = 0;
        }
      })
    );
  }
}
