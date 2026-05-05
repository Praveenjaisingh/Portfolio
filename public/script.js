document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/api/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        const text = await response.text(); 

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Invalid JSON:", text);
            alert("❌ Server returned invalid response");
            return;
        }

        if (response.ok && data.status) {
            window.location.href = "/Thankyou.html";
        } else {
            alert(data.message || "❌ Failed to send message");
        }

    } catch (error) {
        console.error(error);
        alert("❌ Server error");
    }
});