import Grid = require("../../Grid");
import Source = require("../Source");
import Type = require("../BlockType");
import BlockType = Type.BlockType;

class Microphone extends Source {


    constructor(grid: Grid, position: Point) {
        this.BlockType = BlockType.Microphone;
        this.Source = new Tone.Microphone();

        super(grid, position);
        this.Source.start();
        this.Source.connect(this.EffectsChainInput);

        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, -1),new Point(2, 0),new Point(1, 1),new Point(0, 1));
    }

    MouseDown() {
        super.MouseDown();
    }

    MouseUp() {
        super.MouseUp();
    }

    Update() {
        super.Update();
    }

    Draw() {
        super.Draw();
        this.Grid.BlockSprites.Draw(this.Position,true,"microphone");
    }
}

export = Microphone;