import Grid = require("../../Grid");
import BlocksSketch = require("../../BlocksSketch");
import Source = require("../Source");

class Microphone extends Source {


    Init(sketch?: Fayde.Drawing.SketchContext): void {
        super.Init(sketch);

        this.CreateSource();

        this.Sources.forEach((s: Tone.Microphone)=> {
            s.connect(this.EffectsChainInput);
            s.start();
        });

        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, -1),new Point(2, 0),new Point(1, 1),new Point(0, 1));
    }

    MouseDown() {
        super.MouseDown();
    }

    MouseUp() {
        super.MouseUp();
    }

    CreateSource(){
        this.Sources.push( new Tone.Microphone() );
        return super.CreateSource();
    }

    CreateEnvelope(){
        return super.CreateEnvelope();
    }

    TriggerAttack(){
        super.TriggerAttack();
    }

    TriggerRelease(){
        super.TriggerRelease();
    }

    TriggerAttackRelease(){

    }

    Update() {
        super.Update();
    }

    Draw() {
        super.Draw();
        (<BlocksSketch>this.Sketch).BlockSprites.Draw(this.Position,true,"microphone");
    }

    Dispose() {
        super.Dispose();

        this.Sources.forEach((s: Tone.Microphone)=> {
            s.dispose();
        });
    }
}

export = Microphone;