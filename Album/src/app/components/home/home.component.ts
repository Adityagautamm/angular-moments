import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Post, APIResponse } from 'src/app/models/post-model';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public postList!: Array<Post>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(private httpService: PostServiceService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.gameSub = this.httpService
      .getPostsList()
      .subscribe((postList: any) => {
        this.postList = postList.data;
        console.log('response' + postList);
      });
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
