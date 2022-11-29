import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/Commom/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  constructor(private dialog:MatDialog) { }

  openDialog(data: any): Observable<boolean> {

    return this.dialog.open(ConfirmationDialogComponent, {
      data,
      width: "400px",
      disableClose:true
    }).afterClosed();
  }
}
