import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendFilter',
})
export class FriendFilterPipe implements PipeTransform {
  transform(friends: any[], searchText: string): any[] {
    if (!friends || !searchText) {
      return friends;
    }

    searchText = searchText.toLowerCase();

    return friends.filter((friend) => {
      return friend.username.toLowerCase().includes(searchText);
    });
  }
}
