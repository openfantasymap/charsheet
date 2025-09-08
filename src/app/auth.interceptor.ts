import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('zitadel:id_token')?.replaceAll('"',"");
  if(token){
  req = req.clone({
    setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
