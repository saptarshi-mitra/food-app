import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FireService } from 'src/app/common/services/fire.service';

@Component({
  selector: 'app-fav-item',
  templateUrl: './fav-item.component.html',
  styleUrls: ['./fav-item.component.css']
})
export class FavItemComponent implements OnInit {

  @Input() recipe: any;
  @Output() deleted = new EventEmitter<string>();

  constructor(private fire: FireService, private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

  onDelete() {
    this.auth.user.subscribe(user => {
      this.fire.deleteFavorite(user.id,this.recipe.id,user.token).subscribe(resopnse=>{
        console.log(resopnse);
        this.deleted.emit("reload");
      })
    })
  }

}
