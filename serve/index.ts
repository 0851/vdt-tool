import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    TextDocumentSyncKind
} from "vscode-languageserver";

// Creates the LSP connection
const connection = createConnection(ProposedFeatures.all);
// Create a manager for open text documents
const documents = new TextDocuments();

// The workspace folder this server is operating on

documents.onDidOpen(event => {
    connection.console.log(
        `[Server(${process.pid}) Document opened: ${event.document.uri}`
    );
});
documents.listen(connection);

console.log("=========sadlkjl");

connection.onInitialize(params => {
    connection.console.log(
        `[Server(${process.pid}) Started and initialize received`
    );
    return {
        capabilities: {
            textDocumentSync: {
                openClose: true,
                change: TextDocumentSyncKind.None
            }
        }
    };
});
connection.listen();
