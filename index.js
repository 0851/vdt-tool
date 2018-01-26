const vscode = require("vscode");
const completion = require("./scripts/completion");
vscode.languages.registerCompletionItemProvider("vdt", new completion());
