import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

//Y? this catch is an instace method available on Observable Object
// but throuw method is a static method that is accesable by the observable class
import 'rxjs/add/observable/throw';



@Injectable()
export class DataService {
  
  constructor(private url: string, private http: Http) { }

  getAll(){
    return this.http.get(this.url)
    .map( response => response.json())
    .catch(this.handleError);
  }

  create(resource){   
    //return Observable.throw(new AppError());  
    
      return this.http.post(this.url, JSON.stringify(resource))
      .map( response => response.json())
      .catch(this.handleError);    
  }

  update(resource){
    //this.http.put(this.url, JSON.stringify(post) ) 
    return this.http.patch(this.url+ '/'+resource.id, JSON.stringify({ isRead: true }))
        .map( response => response.json())
        .catch(this.handleError);
  }

  //Deleting Post with Handle application specifi
  delete(Yid){
    //return Observable.throw(new AppError());

        return this.http.delete(this.url + '/'+ Yid  )
        .map( response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response){
    if (error.status === 400 ){
      // here we pass an application specific error Object
      return Observable.throw(new BadInput(error.json));
    }
    if ( error.status === 404 )
        return Observable.throw(new NotFoundError());        
    else
        return Observable.throw(new AppError(error));       
  }

}
