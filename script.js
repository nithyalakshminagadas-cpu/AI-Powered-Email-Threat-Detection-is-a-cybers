function analyzeEmail() {

    let sender = document
        .getElementById("sender")
        .value
        .toLowerCase();

    let subject = document
        .getElementById("subject")
        .value
        .toLowerCase();

    let content = document
        .getElementById("emailContent")
        .value
        .toLowerCase();


    let score = 0;

    let reasons = [];


    // Combine all email information

    let emailText =
        sender + " " +
        subject + " " +
        content;


    // Suspicious keywords

    let suspiciousWords = [

        "urgent",

        "verify your account",

        "click here",

        "password",

        "bank account",

        "winner",

        "free money",

        "suspended",

        "limited time",

        "act now",

        "confirm your account"

    ];


    suspiciousWords.forEach(function(word) {

        if (emailText.includes(word)) {

            score += 10;

            reasons.push(
                "Suspicious keyword detected: " + word
            );

        }

    });


    // Detect links

    if (
        emailText.includes("http://") ||
        emailText.includes("https://")
    ) {

        score += 15;

        reasons.push(
            "Suspicious link detected"
        );

    }


    // Detect unusual sender

    if (
        sender.includes("support-security") ||
        sender.includes("bank-verify")
    ) {

        score += 20;

        reasons.push(
            "Suspicious sender address"
        );

    }


    // Maximum score 100

    if (score > 100) {

        score = 100;

    }


    // Display score

    document
        .getElementById("score")
        .innerText = score + "%";


    let status =
        document.getElementById("status");


    let reasonBox =
        document.getElementById("reasons");


    reasonBox.innerHTML = "";


    // Threat level

    if (score >= 60) {

        status.innerText =
            "🚨 HIGH RISK - Possible Phishing Email";

        status.style.color =
            "#dc2626";

    }

    else if (score >= 30) {

        status.innerText =
            "⚠️ MEDIUM RISK - Suspicious Email";

        status.style.color =
            "#f59e0b";

    }

    else {

        status.innerText =
            "✅ LOW RISK - Email Looks Safe";

        status.style.color =
            "#16a34a";

    }


    // Show reasons

    if (reasons.length === 0) {

        reasonBox.innerHTML =
            "<p>No major threats detected.</p>";

    }

    else {

        reasons.forEach(function(reason) {

            reasonBox.innerHTML +=
                "<p>⚠️ " + reason + "</p>";

        });

    }

}
