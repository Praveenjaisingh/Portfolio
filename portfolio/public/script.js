document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const year = new Date().getFullYear();

    try {
        const response = await fetch("/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });

        const data = await response.json();

        if (data.status) {
            window.location.href = "/Thankyou.html";
        } else {
            alert("❌ Failed to send message");
        }
    } catch (error) {
        console.error(error);
        alert("❌ Server error");
    }
});
