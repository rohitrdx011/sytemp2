<?php

header('Content-Type: application/json');

// ===================================================================
// Set the default timezone to Indian Standard Time (IST)
date_default_timezone_set('Asia/Kolkata');
// ===================================================================


// Project Name
$projectName = "Test Project";



$leadName = filter_var($_POST['input_name'] ?? '', FILTER_SANITIZE_STRING);
$leadMobileNo = filter_var($_POST['input_phone_no'] ?? '', FILTER_SANITIZE_STRING);
$leadEmail = filter_var($_POST['input_email'] ?? '', FILTER_SANITIZE_EMAIL);
$leadFormName = ucwords(strtolower(filter_var($_POST['onclick'] ?? '', FILTER_SANITIZE_STRING)));
$leadComment = "";


if (isset($leadMobileNo) && trim($leadMobileNo) != '') {

    $refererURL = $_SERVER['HTTP_REFERER'] ?? '';

    if (trim($leadFormName) == '') {
        $leadFormName = "Open Form"; 
    }

    $submissionDate = date("d-m-Y");
    $submissionTime = date("h:i A");


    // 2. SEND DATA TO GOOGLE SHEET
    try {
        require_once __DIR__ . '/vendor/autoload.php';

        // Setup Google Client
        $client = new \Google_Client();
        $client->setApplicationName('My PHP App');
        $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
        $client->setAccessType('offline');
        $client->setAuthConfig(__DIR__ . '/server/credentials.json'); 
        
        $service = new \Google_Service_Sheets($client);
        
        $spreadsheetId = '1lEGkhfeVaDn1Z_W5Ga-n_qBvHzaq58YVSaj12y4wc3c';

        // Step 1: Create a request to insert a new blank row at row 2.
        $insertRowRequest = new \Google_Service_Sheets_Request([
            'insertDimension' => [
                'range' => [
                    'sheetId'   => 0,
                    'dimension' => 'ROWS',
                    'startIndex' => 1,
                    'endIndex'   => 2
                ]
            ]
        ]);
        $batchUpdateRequest = new \Google_Service_Sheets_BatchUpdateSpreadsheetRequest([
            'requests' => [$insertRowRequest]
        ]);
        $service->spreadsheets->batchUpdate($spreadsheetId, $batchUpdateRequest);
        
        // ===================================================================
        // ## AND CHANGE IS HERE ##
        // Prepare the row data using the new $refererURL variable
        $newRow = [
            $submissionDate,
            $submissionTime,
            $projectName,
            $leadName,
            $leadMobileNo,
            $leadEmail,
            $leadFormName,
            $refererURL
        ];
        // ===================================================================

        $values = [$newRow];
        $body = new \Google_Service_Sheets_ValueRange(['values' => $values]);
        $params = ['valueInputOption' => 'USER_ENTERED'];
        $range = 'Leads!A2';
        $result = $service->spreadsheets_values->update(
            $spreadsheetId,
            $range,
            $body,
            $params
        );

        if ($result->getUpdatedCells() > 0) {
            // Success
        } else {
            throw new Exception("Could not write to Google Sheet.");
        }

    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Sheet API Error: ' . $e->getMessage()]);
        exit();
    }


    // 3. SEND EMAIL
    require_once "./server/mailer.php";
    require_once "./server/mail.php";


    echo json_encode(['status' => 'success', 'message' => 'Data submitted successfully.']);
    // header("Location: /thank-you/");
    exit;


} else {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing.']);
    header("Location: /");
    exit;
}