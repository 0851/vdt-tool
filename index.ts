import * as path from "path";

import { workspace, ExtensionContext } from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from "vscode-languageclient";

export function activate(context: ExtensionContext) {
    console.log(path.join("serve", "./out/index.js"));
    // 服务使用nodejs实现
    const serveModule = context.asAbsolutePath(
        path.join("serve", "./out/index.js")
    );
    console.log(serveModule,'=======');
    // 服务的调试选项
    const debugOptions = { execArgv: ["--nolazy", "--debug=6888"] };

    // 服务的调试选项将在插件以调试模式启动的情况下生效
    // 运行选项将在其他情况下生效
    const serverOptions: ServerOptions = {
        run: { module: serveModule, transport: TransportKind.ipc },
        debug: {
            module: serveModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    };

    // 控制语言客户端的选项
    const clientOptions: LanguageClientOptions = {
        // 为纯文本文档注册服务
        documentSelector: ["plaintext"],
        synchronize: {
            // 将'languageServerExample'选项同步到服务
            configurationSection: "languageServerExample",
            // 当工作空间中的'.clientrc'文件改变时通知服务
            fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
        }
    };

    // 创建一个语言客户端并启动这个客户端。
    const disposable = new LanguageClient(
        "vdt",
        serverOptions,
        clientOptions
    ).start();

    // 向context的订阅里插入一个disposable对象使的客户端可以在插件
    // 关闭的时候被销毁
    context.subscriptions.push(disposable);
}
