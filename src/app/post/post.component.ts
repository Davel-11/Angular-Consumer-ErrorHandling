import { Component, OnInit } from '@angular/core';
//import { Http } from '@angular/http';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'post1',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit  {
  
  //variable que recibe los datos
  posts: any[];  

  //Begin
  ngOnInit(){    
    this.service.getAll()
      .subscribe(posts => this.posts = posts);
  }

  constructor(private service: PostService) { }   
    
  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    this.posts.splice(0, 0, post);

    input.value = '';      

    this.service.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost.id;
                    
    }, (error: AppError ) => { // Instead of working with response such as 400
     // we are going to work with specifi app error  
     this.posts.splice(0, 1);

     if( error instanceof BadInput){
         //this.form.setErrors(error.originalError); 
     }
     else throw error;              
    }); 
  }  


  updatePost(post)  {   
    this.service.update(post)
      .subscribe(updatedPost => { 
        console.log(Response);
      });
  }

  // delete post
  deletePost(postdata){ 
    let index = this.posts.indexOf(postdata);
    this.posts.splice(index, 1);       
    //delete post, json line is being received, it is expecting an ID
    this.service.delete(postdata.id)
    .subscribe( null, 
        (error: AppError ) => {
          this.posts.splice(index, 0, postdata);

          if(error instanceof NotFoundError ) {
            alert('This post has already been deleted.');
          }  
          else throw error;                 
        });
  }

 

    
}
