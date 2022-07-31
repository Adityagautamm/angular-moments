import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { Post } from 'src/app/models/post-model';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-create-memory',
  templateUrl: './create-memory.component.html',
  styleUrls: ['./create-memory.component.scss'],
})
export class CreateMemoryComponent implements OnInit {
  postForm!: FormGroup;
  files!: File;
  title: string = '';
  location: string = '';
  date!: Date;
  tags: string = '';
  description: string = '';
  post!: Post;

  constructor(
    private fb: FormBuilder,
    private postServiceService: PostServiceService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [''],
      location: [''],
      date: [''],
      tags: [''],
      description: [''],
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.files);
    // console.log(this.files);

    this.post = {
      title: this.postForm.controls['title']?.value,
      location: this.postForm.controls['location']?.value,
      createdAt: this.postForm.controls['date']?.value,

      tags: this.postForm.controls['tags']?.value,

      description: this.postForm.controls['description']?.value,

      selectedFiles: this.files ? this.files.name : '',
    };
    formData.append('post', JSON.stringify(this.post));

    this.postServiceService.createPost(formData).subscribe((post: any) => {
      alert(post.message);
    });
    this.postForm.reset();
  }

  storeFiles(event: any) {
    this.files = event.target.files[0];
    console.log(event.target.files[0].name);
    // for (let i = 0; i < this.files.length; i++) {
    //   const name = this.files[i].name;
    //   const type = this.files[i].type;
    //   console.log('Filename: ' + name + ' , Type: ' + type);
    // }
  }

  // base64Converter(event: any) {
  //   if (event.target.value) {
  //     const file = event.target.files[0];
  //     const type = file.type;
  //     this.changeFile(file).then((base64: any): any => {
  //       console.log(base64);
  //       // this.fileBlob = this.b64Blob([base64], type);
  //       // console.log(this.fileBlob);
  //     });
  //   } else alert('Nothing');
  // }

  changeFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
