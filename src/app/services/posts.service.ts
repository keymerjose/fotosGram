import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioservice: UsuarioService,
              private fileTransfer: FileTransfer) { }



  getPosts( pull:boolean = false){
    if(pull){
      this.paginaPosts = 0;
    }
    
    this.paginaPosts++;
    
    return this.http.get<RespuestaPosts>(`${url}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost(post){
    const headers = new HttpHeaders({
      'x-token': this.usuarioservice.token
    });


    return new Promise(resolve => {
      this.http.post(`${url}/posts/`, post, {headers}).subscribe(
        resp => {
          this.nuevoPost.emit(resp['post']);
          resolve(true);
          console.log(resp);
        }
      );
    });
  }

  subirImagen(img: string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioservice.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload( img, `${url}/posts/upload`, options ).then(
      data => {
        console.log(data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
}
