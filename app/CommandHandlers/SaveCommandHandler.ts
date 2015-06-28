import ICommandHandler = require("../Core/Commands/ICommandHandler");
import IOperation = require("../Core/Operations/IOperation");
import SaveOperation = require("../Operations/SaveOperation");

class SaveCommandHandler implements ICommandHandler {

    constructor() {

    }

    Execute(): Promise<any>{
        var compositionId = App.CompositionId;
        var sessionId = App.SessionId || localStorage.getItem(compositionId);

        var op:IOperation = new SaveOperation(App.Serialize(), compositionId, sessionId);
        return App.OperationManager.Do(op).then((result) => {
            App.CompositionId = result.Id;
            App.BlocksSketch.SharePanel.ReturnLink(result.Id);
            App.SessionId = result.SessionId;
            localStorage.setItem(App.CompositionId, App.SessionId);
            //console.log(result.Id, result.Message);
        });
    }
}

export = SaveCommandHandler;