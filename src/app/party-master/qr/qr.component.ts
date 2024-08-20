import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
