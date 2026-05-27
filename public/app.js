async function login(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try {

        const response =
        await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data =
        await response.json();

        if(response.ok){

            localStorage.setItem(
                "token",
                data.token
            );

            window.location.href =
            "dashboard.html";

        } else {

            document.getElementById(
                "message"
            ).innerText =
            data.message;
        }

    } catch(error){

        document.getElementById(
            "message"
        ).innerText =
        "Authentication System Offline";
    }
}