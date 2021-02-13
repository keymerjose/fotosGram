import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[] = [];
  habilitado = true;
  constructor(private postsservice: PostsService) {}

  ngOnInit(){
    this.siguientes();
    this.postsservice.nuevoPost.subscribe(
      post => {
        this.posts.unshift(post);
      }
    );
  }

  recargar( event ){
    this.siguientes(event, true);
    this.posts = [];
    this.habilitado = true;
  }

  siguientes( event?, pull: boolean = false ){
    this.postsservice.getPosts( pull ).subscribe(
      resp => {
        this.posts.push(...resp.posts);
        console.log(resp);

        if(event){
          event.target.complete();
          if(resp.posts.length === 0){
            // event.target.disabled = true;
            this.habilitado = false;
          }
        }
      }
    )
  }

}
