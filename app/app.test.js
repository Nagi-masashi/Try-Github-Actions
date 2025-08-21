// Node.jsの標準モジュールであるassertを読み込む
const assert = require('assert');

// サーバー起動テスト
const http = require('http');

// テスト用のポート
const testPort = 3001;

// テスト用のサーバーを起動
const testServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the Node.js application!');
});

testServer.listen(testPort, () => {
    // サーバーへのリクエストを送信
    http.get(`http://localhost:${testPort}`, (res) => {
        // HTTPステータスコードが200であることを確認
        assert.strictEqual(res.statusCode, 200, 'HTTP Status Code should be 200');

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            // レスポンス本文が正しいことを確認
            assert.strictEqual(data, 'Hello from the Node.js application!', 'Response body is incorrect');
            console.log('Test passed successfully!');

            // テスト終了後にサーバーを閉じる
            testServer.close();
        });
    });
});
