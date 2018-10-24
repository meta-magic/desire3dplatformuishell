export class ChartBasic {
  height: string;
  width: string;
  stacked: boolean;
  barWidth: string;
  fallingColor: string;
  risingColor: string;
  maxColor: string;
  midColor: string;
  minColor: string;
  maxPostDepth: number;
  showScale: boolean;
  redColorFrom: number;
  redColorTo: number;
  yellowColorFrom: number;
  yellowColorTo: number;
  scaleValue: number;
  constructor() {
    this.height = '400px';
    this.width = '100%';
    this.stacked = false;
    this.barWidth = '100%';
    this.fallingColor = '#a52714';
    this.risingColor = '#0f9d58';
    this.maxColor = '#00DD00';
    this.midColor = '#DDDDDD';
    this.minColor = '#FF0000';
    this.maxPostDepth = 2;
    this.showScale = true;
    this.redColorFrom = 90;
    this.redColorTo = 100;
    this.yellowColorFrom = 75;
    this.yellowColorTo = 90;
    this.scaleValue = 5;
  }
}
