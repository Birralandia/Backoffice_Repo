import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scancamera',
  templateUrl: './scancamera.component.html',
  styleUrls: ['./scancamera.component.scss']
})
export class ScancameraComponent implements OnInit {

  @ViewChild('scanner', {static:true})
  scanner: ZXingScannerComponent;


  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  isScan: boolean;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo = null;

  constructor(
    private Router: Router
  ) {
    this.isScan = false;
  }

  ngOnInit(): void {

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;
      if (devices.length === 1) {
      //  this.scanner.changeDevice(devices[0]);
        this.selectedDevice = devices[0];
      } else {

        for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
          //  this.scanner.changeDevice(device);
            this.selectedDevice = device;
            break;
          }
        }
      }
    });


    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  handleQrCodeResult(resultString: string) {
    alert(resultString);
    if(resultString.indexOf("|&|") === -1){
      this.Router.navigateByUrl("/backoffice/nueva-venta/"+resultString);
    }else{
      this.Router.navigateByUrl("/backoffice/nueva-venta-promocion/"+resultString);
    }
  }

  onDeviceSelectChange(selectedValue: string) {
    // alert('Selection changed: ' + selectedValue);
    // this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }

}
