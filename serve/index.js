const {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    TextDocumentSyncKind,
    CompletionItemKind
} = require("vscode-languageserver");

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

//文件内容改动 , 可做代码检测
documents.onDidChangeContent(change => {
    console.log(change);
});
//初始化设置
connection.onInitialize(params => {
    connection.console.log(
        `[Server(${process.pid}) Started and initialize received`
    );
    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: [".", ":", "<", '"', "/", "@", "*"]
            },
            signatureHelpProvider: { triggerCharacters: ["("] },
            documentFormattingProvider: true,
            hoverProvider: true,
            documentHighlightProvider: true,
            documentSymbolProvider: true,
            definitionProvider: true,
            referencesProvider: true,
            colorProvider: true
        }
    };
});
//智能感知部分开始
connection.onCompletion(TextDocumentPositionParams => {
    return [
        {
            label: "TypeScript",
            kind: CompletionItemKind.Text,
            data: 1
        },
        {
            label: "JavaScript",
            kind: CompletionItemKind.Text,
            data: 2
        }
    ];
});
connection.onCompletionResolve(item => {
    if (item.data === 1) {
        (item.detail = "TypeScript details"),
            (item.documentation = "TypeScript documentation");
    } else if (item.data === 2) {
        (item.detail = "JavaScript details"),
            (item.documentation = "JavaScript documentation");
    }
    return item;
});
//智能感知部分结束
connection.listen();
