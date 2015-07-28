/**
 * Created by luketwyman on 23/02/2015.
 */

import Option = require("./Option");
import WaveForm = require("./OptionWave");
import Size = minerva.Size;
import ParametersPanel = require("./../OptionsPanel");
import OptionHandle = require("./OptionHandle");

class WaveRegion extends WaveForm{


    constructor(position: Point, size: Size, origin: number, value: number, min: number, max: number, quantised: boolean, name: string, setting: string, log: boolean, waveform: number[], handles: any, mode: boolean) {
        super(waveform);

        this.Type = "waveregion";
        this.Position = position;
        this.Size = size;
        this.Origin = origin;
        this.Value = value;
        this.Min = min;
        this.Max = max;
        this.Quantised = quantised;
        this.Name = name;
        this.Setting = setting;
        this.Log = log;
        this.Selected = false;
        this.Handles = handles;
        this.Mode = mode;

        this.HandleRoll = [];
    }


    Draw(ctx,units,i,panel) {
        super.Draw(ctx,units,i,panel);


        var y = this.Position.y;
        var height = this.Size.height;
        var origin = this.Origin;
        var dataType = Math.round(units*10);
        var headerType = Math.round(units*33);
        var xs = [this.Handles[0].Position.x,this.Handles[1].Position.x,this.Handles[2].Position.x,this.Handles[3].Position.x];
        var col = panel.SliderColours[i - (Math.floor(i/panel.SliderColours.length)*(panel.SliderColours.length))];

        if (!this.Waveform.length) {
            ctx.textAlign = "center";
            ctx.fillStyle = App.Palette[8];// WHITE
            ctx.font = App.Metrics.TxtMid;
            ctx.fillText("LOADING SAMPLE " + Math.round(panel.SelectedBlock.LoadProgress * 100) + "%", (panel.Range*0.5) + panel.Margin, y + (height * 0.5) + (dataType*0.45));
        }

        else {
            // LINES //
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1;

            ctx.fillStyle = ctx.strokeStyle = "#282b31";
            //panel.diagonalFill(xs[2] + panel.Margin,y,xs[3] - xs[2],height,9);

            /*ctx.fillStyle = ctx.strokeStyle = App.Palette[2];
            panel.diagonalFill(panel.Margin,y,xs[0],height,5);
            panel.diagonalFill(xs[1] + panel.Margin,y,panel.Range - xs[1],height,5);*/

            ctx.globalAlpha = 1;
            ctx.fillStyle = ctx.strokeStyle = App.Palette[8];// WHITE

            var x = xs[2];

            // TXT BOXES //
            /*ctx.beginPath();

            ctx.moveTo(xs[0] + panel.Margin,y);
            ctx.lineTo(xs[0] + panel.Margin + (25*units),y);
            ctx.lineTo(xs[0] + panel.Margin + (25*units),y + (dataType*1.5));
            ctx.lineTo(xs[0] + panel.Margin,y + (dataType*1.5));

            ctx.moveTo(xs[2] + panel.Margin,y);
            ctx.lineTo(xs[2] + panel.Margin + (27*units),y);
            ctx.lineTo(xs[2] + panel.Margin + (27*units),y + (dataType*1.5));
            ctx.lineTo(xs[2] + panel.Margin,y + (dataType*1.5));

            ctx.stroke();*/

            var sliderNo = 2;
            // LOOP LINES //

            if (this.Mode) {
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(xs[2] + panel.Margin,y);
                ctx.lineTo(xs[2] + panel.Margin,y + height);
                ctx.moveTo(xs[3] + panel.Margin,y);
                ctx.lineTo(xs[3] + panel.Margin,y + height);
                ctx.stroke();
                ctx.lineWidth = 1;

                sliderNo = 1;
            }




            // SLIDEBAR //

            var offset = 0;
            if (origin == panel.Margin) {
                offset = -units;
            }

            ctx.globalAlpha = 1;

            for (var j=0; j<sliderNo; j++) {
                ctx.fillStyle = ctx.strokeStyle = col;


                x = xs[j];
                ctx.fillRect(x + panel.Margin - (units), y, 2 * units, height);

                // GRAB TRIANGLES //
                var dragWidth = (height) * 0.16;
                ctx.beginPath();
                ctx.moveTo(x + panel.Margin - dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) - dragWidth);
                ctx.lineTo(x + panel.Margin + dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) + dragWidth);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = App.Palette[8];// WHITE
                ctx.beginPath();
                ctx.moveTo(x + panel.Margin - dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) - dragWidth);
                ctx.lineTo(x + panel.Margin + (dragWidth * 0.5), y + (height * 0.5) - (dragWidth * 0.5));
                ctx.lineTo(x + panel.Margin - (dragWidth * 0.5), y + (height * 0.5) + (dragWidth * 0.5));
                ctx.closePath();
                ctx.fill();
            }

            if (this.Mode) {
                for (var j=2; j<4; j++) {
                    ctx.fillStyle = App.Palette[8];// WHITE

                    x = xs[j];

                    // GRAB TRIANGLES //
                    var dragWidth = ((height) * 0.16);
                    ctx.beginPath();
                    ctx.moveTo(x + panel.Margin - (dragWidth*0.5), y + (height * 0.5));
                    ctx.lineTo(x + panel.Margin, y + (height * 0.5) - (dragWidth*0.5));
                    ctx.lineTo(x + panel.Margin + (dragWidth*0.5), y + (height * 0.5));
                    ctx.lineTo(x + panel.Margin, y + (height * 0.5) + (dragWidth*0.5));
                    ctx.closePath();
                    ctx.fill();
                }
            }




            ctx.fillStyle = App.Palette[8];// WHITE
            ctx.font = App.Metrics.TxtItalic;

            ctx.textAlign = "left";
            /*ctx.fillText("Play", xs[0] + panel.Margin + (dragWidth) + (5*units), y + (height * 0.5) + (dataType*0.35));
            ctx.fillText("Loop", xs[2] + panel.Margin + (dragWidth*0.5) + (5*units), y + (height * 0.5) + (dataType*0.35));*/

            ctx.fillText("Start", xs[0] + panel.Margin + (5*units), y + (dataType*0.8));
            if (this.Mode) {
                ctx.fillText("Loop", xs[2] + panel.Margin + (5*units), y + (height) - (dataType*0.4));
            } else {
                ctx.fillText("End", xs[1] + panel.Margin + (5*units), y + (height) - (dataType*0.4));
            }

        }




        // VALUE TOOLTIP //
        /*if (this.Selected) {
            ctx.textAlign = "left";
            ctx.font = panel.Sketch.TxtSlider;
            var string = panel.NumberWithCommas("" + (Math.round(this.Value * 100) / 100));
            ctx.fillText(string, rightSpread + (25 * units), y + (height * 0.5) + (headerType * 0.35));
        }*/
    }


}


export = WaveRegion;
