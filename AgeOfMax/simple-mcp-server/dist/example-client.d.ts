/**
 * Example MCP Client
 * Demonstrates how to interact with the Simple MCP Server
 */
interface McpRequest {
    jsonrpc: '2.0';
    id: number;
    method: string;
    params?: any;
}
interface McpResponse {
    jsonrpc: '2.0';
    id: number;
    result?: any;
    error?: {
        code: number;
        message: string;
    };
}
declare class SimpleMcpClient {
    private baseUrl;
    private requestId;
    constructor(baseUrl?: string);
    private sendRequest;
    initialize(): Promise<any>;
    listTools(): Promise<any>;
    callTool(name: string, arguments_: any): Promise<any>;
    listResources(): Promise<any>;
    readResource(uri: string): Promise<any>;
    listPrompts(): Promise<any>;
    getPrompt(name: string, arguments_?: any): Promise<any>;
}
declare function runExamples(): Promise<void>;
//# sourceMappingURL=example-client.d.ts.map