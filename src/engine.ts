export class Engine
{
    private static EMPTY : number = 0;

    protected static SIZE : number = 3;
    protected static COM_MARK : number = 1;
    protected static USER_MARK : number = 2;
    protected static turn : number = 0;

    public static board : Array<number> = new Array<number>(Engine.SIZE * Engine.SIZE);

    protected constructor() {
    }

    protected static isComputerTurn() : boolean
    {
        return (Engine.turn % 2 === 1);
    }

    public static init()
    {
        Engine.turn = 0;

        Engine.board.fill(this.EMPTY);
    }

    public static tryPlace(index : number) : boolean
    {
        if (!Engine.canPlace(index)) return false;

        Engine.board[index] = (Engine.isComputerTurn() ? Engine.COM_MARK : Engine.USER_MARK);
        Engine.turn++;
        
        return true;
    }

    public static canPlace(index : number)
    {
        return (0 <= index && Engine.SIZE * Engine.SIZE > index && Engine.board[index] === Engine.EMPTY);
    }

    /** deep copy */
    public static getCopyBoard() : Array<number>
    {
        let copy = new Array(Engine.SIZE * Engine.SIZE);

        for (let i = 0; i < Engine.SIZE * Engine.SIZE; ++i) {
            copy[i] = Engine.board[i];
        }

        return copy;
    }

    public findIndex() : number
    {
        return -1;
    }

    

    
}