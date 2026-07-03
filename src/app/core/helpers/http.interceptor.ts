import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    withCredentials: true,
  });

  return next(clonedReq);
};
