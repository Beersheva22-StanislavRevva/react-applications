import { getRandomMatrix } from "../Util/random";

export default class LifeMatrix {
stoplist:number[][];
    constructor(private _numbers: number[][]) {
        this.stoplist = [];
    }
    get numbers() {
        return this._numbers;
    }
    next(): number[][] {
        const res = this._numbers.map((a,j) => a.map((e,i) => this.stoplist.includes([i,j]) 
            ? e : e = this.changeCell(i,j,e)));
        this._numbers = res;
            return this._numbers;
    }
    changeCell(i:number,j:number,element:number):number{
        return element = 1 ? element = this.isModifiedLiveCell(i, j) : element = this.isModifiedDeadCell(i, j);
    }
    isModifiedLiveCell(i:number,j:number):number {
       const res = this.calcLiveCell(i , j); 
       if (res === this._numbers[i][j]) {
        this.addToStoplist(i, j);
       }
       return res;
    }
    isModifiedDeadCell(i:number,j:number):number {
        const res = this.calcDeadCell(i , j); 
       if (res == this._numbers[i][j]) {
        this.addToStoplist(i, j);
       }
       return res;
    }
    addToStoplist(i:number,j:number):void{
        const index = [i, j];
        this.stoplist.push(index);
    }
    calcLiveCell(i:number,j:number):number {
    const sum = this.calcSum(i, j);
        return (sum - 1) < 2 || (sum - 1) > 3 ? 0 : 1;
    }
    private calcSum(j: number, i: number):number {
        let sum: number = 0;
        for (let j1 = (j - 1); j1 <= j + 1; j1++) {
          const col = this.checkIndex(j1);
            for (let i1 = (i - 1); i1 <= i + 1; i1++) {
                const row = this.checkIndex(i1);
                sum += this._numbers[row][col];
            }
        }
        return sum;
    }
    private checkIndex(index:number):number {
        let res = index < 0 ? this._numbers.length - 1 : index;
       res = res > this._numbers.length - 1 ? 0 : res;
        return res;
    }
    calcDeadCell(i:number,j:number):number {
        let sum: number;
        sum = this.calcSum(i, j);
        return sum == 3 ? 1 : 0;
    }
}