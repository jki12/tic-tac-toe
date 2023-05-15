import { Engine } from "./engine";

export class NormalEngine extends Engine
{
    private foundBestPlace : boolean = false;

    public constructor()
    {
        super();
    }

    private backtracking(depth : number, copy : Array<number>, mark : number) : number
    {
        if (depth) {
            return -1; // 
        }

        return -1;
    }

    public findIndex(): number
    {
        const copy = Engine.getCopyBoard();

        // find winning place.
        // find losing place.

        // this.backtracking(1, copy, Engine.USER_MARK);

        return -1;
    }
}