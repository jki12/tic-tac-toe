import { Engine } from "./engine";

export class EasyEngine extends Engine
{
    
    private instace : EasyEngine | null = null;

    public constructor()
    {
        super();
    }

    public findIndex(): number { // find next move.
        let index : number = -1;

        while (!Engine.canPlace(index)) {
            index = Math.random() * (Engine.SIZE * Engine.SIZE);
        }

        return index;
    }
}