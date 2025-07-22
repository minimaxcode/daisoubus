<?php
// 文件路径: /api/send_email.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // 允许跨域请求，在某些服务器配置下可能需要
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// 您的 Resend API Key，来自您提供的文件
$apiKey = 're_NA3SJhaa_4pPoKR5YjUwamc1UachcS46b';

$json_data = file_get_contents('php://input');
$form_data = json_decode($json_data, true);

// 完整地接收并清理所有字段
$name = htmlspecialchars($form_data['name'] ?? '未記入');
$email = filter_var($form_data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars($form_data['company'] ?? '未記入');
$phone = htmlspecialchars($form_data['phone'] ?? '未記入');
$message = nl2br(htmlspecialchars($form_data['message'] ?? ''));
$formType = htmlspecialchars($form_data['formType'] ?? '一般');
$date = htmlspecialchars($form_data['date'] ?? '未記入');
$participants = htmlspecialchars($form_data['participants'] ?? '未記入');
$destination = htmlspecialchars($form_data['destination'] ?? '未記入');


// 1. 更新邮件主题为正式版本
$subject = "【大爽観光バス 网站问询】新的 {$formType} 咨询 - 来自: {$name}";

// 2. 构建美化的HTML邮件内容
$htmlContent = "
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    h1 { color: #DA3E8A; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
    th { background-color: #f7f7f7; width: 150px; }
    .message-content { background-color: #fdfdfd; padding: 15px; border-radius: 4px; border: 1px solid #eee; white-space: pre-wrap; }
</style>
</head>
<body>
    <div class='container'>
        <h1>【大爽観光バス】网站新消息</h1>
        <p>您好，您收到一封来自官网联系表单的新消息。</p>
        <h2>客户信息</h2>
        <table>
            <tr><th>咨询类型</th><td>{$formType}</td></tr>
            <tr><th>姓名</th><td>{$name}</td></tr>
            <tr><th>公司名</th><td>{$company}</td></tr>
            <tr><th>电子邮件</th><td><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><th>电话号码</th><td>{$phone}</td></tr>
        </table>";

if ($formType === 'group') {
    $htmlContent .= "
        <h2>团体预约详情</h2>
        <table>
            <tr><th>希望使用日期</th><td>{$date}</td></tr>
            <tr><th>预计人数</th><td>{$participants}</td></tr>
            <tr><th>目的地或路线</th><td>{$destination}</td></tr>
        </table>";
}

$htmlContent .= "
        <h2>咨询内容</h2>
        <div class='message-content'>{$message}</div>
    </div>
</body>
</html>
";

// 3. 更新发件人、收件人并添加 reply_to
$resend_payload = [
    'from' => '大爽観光バス <contact@daisoubus.jp>',
    'to' => ['info@daisoubus.jp'],
    'reply_to' => $email, // 直接回复给客户
    'subject' => $subject,
    'html' => $htmlContent,
];

// cURL 发送部分，无需修改
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($resend_payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code >= 200 && $http_code < 300) {
    http_response_code(200);
    echo json_encode(['message' => 'Email sent successfully!']);
} else {
    http_response_code($http_code);
    echo json_encode(['error' => 'Failed to send email.', 'details' => json_decode($response)]);
}
?>